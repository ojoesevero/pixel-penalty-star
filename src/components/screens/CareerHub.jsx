import React from 'react';
import { formatCurrency } from '@/engine/rpgSystem';
import ClubBadge from '@/components/common/ClubBadge';

export default function CareerHub({
  player,
  currentClub,
  seasonIndex,
  gameInSeason,
  totalGamesInSeason = 10,
  seasonGoals = 0,
  seasonAssists = 0,
  nextOpponent,
  transferOffersAvailable,
  onStartMatch,
  onOpenStore,
  onTriggerEvent,
  onOpenTransfers,
}) {
  const coachTrust = player.coachTrust || 70;
  const fanLove = player.fanLove || 65;
  const mediaHype = player.mediaHype || 40;
  const energy = player.energy || 100;

  // Window status text
  const windowStatus =
    gameInSeason < 5
      ? `❄️ Janela de Janeiro na Rodada 5 (${5 - gameInSeason} jogos)`
      : `☀️ Janela de Julho / Europa na Rodada 10 (${10 - gameInSeason} jogos)`;

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 animate-fade-in">
      
      {/* Top Athlete Profile Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-2.5">
        {/* Profile Card */}
        <div className="bg-slate-900/90 border border-slate-800 p-2.5 sm:p-3 rounded-xl flex items-center gap-3 shadow-md">
          <div 
            className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black shadow-inner border border-white/20 shrink-0 relative"
            style={{ backgroundColor: currentClub.colors?.primary || '#3b82f6', color: currentClub.colors?.text || '#fff' }}
          >
            #{player.number}
            <div className="absolute -bottom-1 -right-1">
              <ClubBadge club={currentClub} className="w-5 h-5 drop-shadow" textClassName="text-xs" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-base font-black text-white truncate">{player.name}</h2>
            <p className="text-[11px] text-amber-400 font-bold">{player.positionName}</p>
            <p className="text-[10px] text-slate-400">
              {player.hometown} • {player.age} anos
            </p>
          </div>
        </div>

        {/* Contract & Earnings Card */}
        <div className="bg-slate-900/90 border border-slate-800 p-2.5 sm:p-3 rounded-xl flex flex-col justify-between shadow-md">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-400 font-bold uppercase">Contrato Vigente</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ClubBadge club={currentClub} className="w-3.5 h-3.5" textClassName="text-xs" />
              {currentClub.name}
            </span>
          </div>
          <div>
            <p className="text-[9px] text-slate-400 uppercase font-semibold">Salário Mensal</p>
            <p className="text-sm sm:text-base font-black text-emerald-400 leading-tight">
              {formatCurrency(player.monthlySalary || 5000)} <span className="text-[10px] text-slate-400 font-normal">/ mês</span>
            </p>
          </div>
          <p className="text-[9px] text-slate-500">
            Patrimônio: <strong className="text-slate-300">{formatCurrency(player.bankBalance || 0)}</strong>
          </p>
        </div>

        {/* Season Progress */}
        <div className="bg-slate-900/90 border border-slate-800 p-2.5 sm:p-3 rounded-xl flex flex-col justify-between shadow-md">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-400 font-bold uppercase">Temporada {seasonIndex + 1}</span>
            <span className="text-amber-400 font-bold">Mês {gameInSeason + 1} de {totalGamesInSeason}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center py-0.5">
            <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800">
              <span className="text-base font-black text-white">{seasonGoals}</span>
              <p className="text-[8px] uppercase font-bold text-slate-400">Gols</p>
            </div>
            <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800">
              <span className="text-base font-black text-cyan-400">{seasonAssists}</span>
              <p className="text-[8px] uppercase font-bold text-slate-400">Assistências</p>
            </div>
          </div>
          <p className="text-[9px] text-amber-300/90 font-semibold truncate text-center">
            {windowStatus}
          </p>
        </div>
      </div>

      {/* RPG Reputation & Morale Gauges */}
      <div className="bg-slate-900/80 p-2.5 sm:p-3 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* Coach Trust */}
        <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center text-[10px] mb-1">
            <span className="font-bold text-slate-400 uppercase">Técnico</span>
            <span className={`font-black ${coachTrust >= 70 ? 'text-emerald-400' : coachTrust >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
              {coachTrust}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${coachTrust >= 70 ? 'bg-emerald-400' : coachTrust >= 40 ? 'bg-amber-400' : 'bg-rose-400'}`}
              style={{ width: `${coachTrust}%` }}
            />
          </div>
          <p className="text-[9px] text-slate-400 mt-0.5 font-semibold truncate">
            {coachTrust >= 75 ? '⭐ Titular' : coachTrust >= 50 ? '🔄 Disputa' : '🪑 Banco'}
          </p>
        </div>

        {/* Fan Love */}
        <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center text-[10px] mb-1">
            <span className="font-bold text-slate-400 uppercase">Torcida</span>
            <span className={`font-black ${fanLove >= 70 ? 'text-emerald-400' : fanLove >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
              {fanLove}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${fanLove >= 70 ? 'bg-emerald-400' : fanLove >= 40 ? 'bg-amber-400' : 'bg-rose-400'}`}
              style={{ width: `${fanLove}%` }}
            />
          </div>
          <p className="text-[9px] text-slate-400 mt-0.5 font-semibold truncate">
            {fanLove >= 80 ? '🔥 Ídolo' : fanLove >= 50 ? '👏 Querido' : '😡 Cobrado'}
          </p>
        </div>

        {/* Media Hype */}
        <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center text-[10px] mb-1">
            <span className="font-bold text-slate-400 uppercase">Mídia</span>
            <span className="font-black text-amber-400">{mediaHype}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-500"
              style={{ width: `${mediaHype}%` }}
            />
          </div>
          <p className="text-[9px] text-slate-400 mt-0.5 font-semibold truncate">
            {mediaHype >= 75 ? '📺 Destaque' : mediaHype >= 40 ? '🗞️ Notado' : '🔇 Fora do Radar'}
          </p>
        </div>

        {/* Energy */}
        <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center text-[10px] mb-1">
            <span className="font-bold text-slate-400 uppercase">Fôlego</span>
            <span className="font-black text-cyan-400">{energy}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-400 transition-all duration-500"
              style={{ width: `${energy}%` }}
            />
          </div>
          <p className="text-[9px] text-slate-400 mt-0.5 font-semibold truncate">
            {energy >= 80 ? '⚡ 100%' : energy >= 50 ? '🏃 Normal' : '⚠️ Cansado'}
          </p>
        </div>
      </div>

      {/* Next Match Confrontation Preview */}
      {nextOpponent && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 p-3 sm:p-4 rounded-xl border border-slate-800 flex flex-row items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center shadow-md shrink-0">
              <ClubBadge club={nextOpponent} className="w-8 h-8" textClassName="text-2xl" />
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 block">
                Próximo Confronto • {nextOpponent.league}
              </span>
              <h3 className="text-xs sm:text-sm font-black text-white">
                {currentClub.name} <span className="text-slate-500 font-normal">vs</span> {nextOpponent.name}
              </h3>
              <p className="text-[10px] text-slate-400">
                🏟️ {currentClub.stadium} • Nível {nextOpponent.prestige}
              </p>
            </div>
          </div>

          <button
            onClick={onStartMatch}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>⚽</span> ENTRAR EM CAMPO
          </button>
        </div>
      )}

      {/* Secondary Actions Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Lifestyle Store */}
        <button
          onClick={onOpenStore}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition flex items-center gap-2.5 text-left cursor-pointer active:scale-[0.99]"
        >
          <span className="text-lg p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">🛍️</span>
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase">Patrimônio & Vida</h4>
            <p className="text-[10px] text-slate-400">Chuteiras, carros, família</p>
          </div>
        </button>

        {/* Story Dilemma Event */}
        <button
          onClick={onTriggerEvent}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition flex items-center gap-2.5 text-left cursor-pointer active:scale-[0.99]"
        >
          <span className="text-lg p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">🗞️</span>
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase">Vestiário & Crises</h4>
            <p className="text-[10px] text-slate-400">Dilemas morais e imprensa</p>
          </div>
        </button>

        {/* Transfer Window */}
        <button
          onClick={onOpenTransfers}
          className={`p-2.5 rounded-xl border transition flex items-center gap-2.5 text-left cursor-pointer active:scale-[0.99] ${
            transferOffersAvailable
              ? 'bg-amber-500/10 border-amber-500/80 text-amber-300 animate-pulse'
              : 'bg-slate-900/90 hover:bg-slate-850 border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-lg p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30">💼</span>
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase">
              {transferOffersAvailable ? '🚨 PROPOSTAS NA MESA!' : 'Transferências'}
            </h4>
            <p className="text-[10px] text-slate-400">
              {gameInSeason < 5 ? '❄️ Janela de Janeiro' : '☀️ Janela de Julho'}
            </p>
          </div>
        </button>
      </div>

    </div>
  );
}
