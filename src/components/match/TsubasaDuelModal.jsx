import React, { useState } from 'react';
import { resolveDuelOutcome } from '@/engine/tsubasaMatch';
import { sfxKick, sfxGoal, sfxSave, sfxCrowd } from '@/audio/sfx';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/80 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden">
        
        {/* Dynamic Anime Speed Lines Banner */}
        <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 py-2.5 px-4 text-center border-b border-amber-400/40">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl animate-pulse">⚡</span>
            <h2 className="text-sm sm:text-base font-black tracking-widest text-white uppercase drop-shadow-md">
              MOMENTO DECISIVO • {duel.minute}' MINUTO
            </h2>
            <span className="text-xl animate-pulse">⚡</span>
          </div>
        </div>

        {/* Confrontation Visual Stage */}
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          
          {/* Confrontation Face-off Cards */}
          <div className="grid grid-cols-2 gap-3 items-center bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            {/* Player Side */}
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black shadow-lg border border-white/20"
                style={{ backgroundColor: currentClub.colors?.primary || '#3b82f6', color: currentClub.colors?.text || '#fff' }}
              >
                #{player.number}
              </div>
              <div>
                <p className="text-xs font-bold text-white truncate">{player.name}</p>
                <p className="text-[10px] text-amber-400 font-semibold">{player.positionName}</p>
                <p className="text-[10px] text-slate-400">Energia: {player.energy}%</p>
              </div>
            </div>

            {/* VS Badge & Opponent */}
            <div className="flex items-center justify-end gap-3 text-right">
              <div>
                <p className="text-xs font-bold text-white truncate">{opponentClub.name}</p>
                <p className="text-[10px] text-slate-400 font-semibold">Defesa Nível {opponentClub.prestige}</p>
                <p className="text-[10px] text-rose-400 font-medium">{opponentClub.stadium}</p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg border border-white/20"
                style={{ backgroundColor: opponentClub.colors?.primary || '#ef4444', color: opponentClub.colors?.text || '#fff' }}
              >
                {opponentClub.badge}
              </div>
            </div>
          </div>

          {/* Dramatic Narrative Prompt */}
          {!outcome ? (
            <>
              <div className="bg-slate-800/60 border-l-4 border-amber-500 p-3 rounded-r-lg">
                <h3 className="text-sm font-bold text-amber-300 mb-1">{duel.title}</h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  "{duel.narrative}"
                </p>
              </div>

              {/* Action Decision Cards */}
              <div className="flex flex-col gap-2.5 mt-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Escolha o seu movimento (Capitão Tsubasa Style):
                </p>

                {duel.options.map((option) => {
                  const playerStat = player.stats?.[option.statRequired] || 50;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleChooseAction(option)}
                      className="group p-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 hover:border-amber-500/80 transition-all text-left flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99] shadow-md hover:shadow-amber-500/10"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                            {option.title}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                            Gasta {option.energyCost}% Fôlego
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                          {option.description}
                        </p>
                      </div>

                      {/* Stat indicator badge */}
                      <div className="text-right shrink-0 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700">
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">{option.statRequired}</p>
                        <p className="text-sm font-black text-amber-400">{playerStat}</p>
                      </div>
                    </button>
                  );
                })}
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
