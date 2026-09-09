import React, { useState } from 'react';
import { resolveDuelOutcome } from '@/engine/tsubasaMatch';
import { sfxKick, sfxGoal, sfxSave, sfxCrowd } from '@/audio/sfx';
import ClubBadge from '@/components/common/ClubBadge';

export default function TsubasaDuelModal({ duel, player, currentClub, opponentClub, onDuelComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [outcome, setOutcome] = useState(null);

  const handleChooseAction = (option) => {
    setSelectedOption(option);
    sfxKick();

    // Calculate result
    const result = resolveDuelOutcome(duel, option.id, player.stats, opponentClub);
    setOutcome(result);

    if (result.isGoal) {
      sfxGoal();
      sfxCrowd();
    } else if (!result.success) {
      sfxSave();
    }
  };

  const handleFinish = () => {
    if (outcome) {
      onDuelComplete(outcome);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[95vh] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/80 rounded-xl shadow-[0_0_40px_rgba(245,158,11,0.25)] flex flex-col overflow-hidden my-auto">
        
        {/* Dynamic Anime Speed Lines Banner */}
        <div className="shrink-0 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 py-1.5 px-3 text-center border-b border-amber-400/40">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-base animate-pulse">⚡</span>
            <h2 className="text-xs sm:text-sm font-black tracking-widest text-white uppercase drop-shadow-md">
              MOMENTO DECISIVO • {duel.minute}' MINUTO
            </h2>
            <span className="text-base animate-pulse">⚡</span>
          </div>
        </div>

        {/* Confrontation Visual Stage */}
        <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-2.5 overflow-y-auto flex-1">
          
          {/* Confrontation Face-off Cards */}
          <div className="grid grid-cols-2 gap-2 items-center bg-slate-950/70 p-2 sm:p-2.5 rounded-lg border border-slate-800">
            {/* Player Side */}
            <div className="flex items-center gap-2">
              <div 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-sm font-black shadow-md border border-white/20 shrink-0"
                style={{ backgroundColor: currentClub.colors?.primary || '#3b82f6', color: currentClub.colors?.text || '#fff' }}
              >
                #{player.number}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-bold text-white truncate">{player.name}</p>
                <p className="text-[9px] text-amber-400 font-semibold truncate">{player.positionName}</p>
                <p className="text-[9px] text-slate-400">Fôlego: {player.energy}%</p>
              </div>
            </div>

            {/* VS Badge & Opponent */}
            <div className="flex items-center justify-end gap-2 text-right">
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-bold text-white truncate">{opponentClub.name}</p>
                <p className="text-[9px] text-slate-400 font-semibold truncate">Defesa Nível {opponentClub.prestige}</p>
                <p className="text-[9px] text-rose-400 font-medium truncate">{opponentClub.stadium}</p>
              </div>
              <div 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-md border border-white/20 shrink-0 overflow-hidden"
                style={{ backgroundColor: opponentClub.colors?.primary || '#ef4444', color: opponentClub.colors?.text || '#fff' }}
              >
                <ClubBadge club={opponentClub} className="w-7 h-7" textClassName="text-xl" />
              </div>
            </div>
          </div>

          {/* Dramatic Narrative Prompt */}
          {!outcome ? (
            <>
              <div className="bg-slate-800/60 border-l-4 border-amber-500 p-2 sm:p-2.5 rounded-r-lg">
                <h3 className="text-xs sm:text-sm font-bold text-amber-300">{duel.title}</h3>
                <p className="text-[11px] sm:text-xs text-slate-200 leading-snug font-medium mt-0.5">
                  "{duel.narrative}"
                </p>
              </div>

              {/* Action Decision Cards — 3 KPI Square Buttons */}
              <div className="flex flex-col gap-1.5 mt-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                  Escolha o seu comando de confronto:
                </p>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {duel.options.map((option) => {
                    const playerStat = player.stats?.[option.statRequired] || 50;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleChooseAction(option)}
                        className="group flex flex-col justify-between items-center text-center p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-slate-800/95 to-slate-900 border-2 border-slate-700 hover:border-amber-400 hover:from-slate-750 hover:to-slate-850 transition-all cursor-pointer active:scale-95 shadow-lg hover:shadow-amber-500/20"
                      >
                        {/* Title & Energy Cost */}
                        <div className="w-full flex flex-col items-center">
                          <span className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition line-clamp-1 leading-tight">
                            {option.title}
                          </span>
                          <span className="text-[9px] mt-1 px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-slate-700 font-semibold">
                            ⚡ -{option.energyCost}% Fôlego
                          </span>
                        </div>

                        {/* Center KPI Box */}
                        <div className="my-2 bg-slate-950/90 w-full py-1.5 px-1 rounded-lg border border-slate-800 group-hover:border-amber-500/50 transition">
                          <p className="text-[8px] text-slate-400 uppercase font-bold tracking-wider">
                            {option.statRequired}
                          </p>
                          <p className="text-xl sm:text-2xl font-black text-amber-400 leading-none my-0.5">
                            {playerStat}
                          </p>
                          <p className="text-[8px] text-slate-500">
                            {playerStat >= 65 ? '⭐ Forte' : '⚡ Médio'}
                          </p>
                        </div>

                        {/* Action CTA */}
                        <span className="w-full py-1 rounded-md bg-amber-500/10 group-hover:bg-amber-500 text-amber-300 group-hover:text-slate-950 font-black text-[10px] uppercase tracking-wider transition">
                          Executar ❯
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Outcome Reveal Screen */
            <div className="flex flex-col items-center text-center py-4 animate-scale-up">
              <div className="text-5xl mb-2">
                {outcome.isGoal ? '⚽' : outcome.isAssist ? '👟' : outcome.success ? '🎩' : '🧤'}
              </div>
              
              <h3 className={`text-lg sm:text-xl font-black tracking-wide uppercase mb-2 ${
                outcome.isGoal ? 'text-amber-400 animate-pulse' : outcome.success ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {outcome.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-200 max-w-md bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 leading-relaxed font-medium mb-5">
                {outcome.narrative}
              </p>

              <button
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
              >
                Continuar a Partida ❯
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
