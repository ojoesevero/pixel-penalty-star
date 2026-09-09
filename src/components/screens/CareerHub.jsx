import React from 'react';
import { formatCurrency } from '@/engine/rpgSystem';

export default function CareerHub({
  player,
  currentClub,
  seasonIndex,
  gameInSeason,
  totalGamesInSeason = 5,
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

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      
      {/* Top Athlete Profile Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Profile Card */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-3.5 shadow-lg">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shadow-inner border border-white/20"
            style={{ backgroundColor: currentClub.colors?.primary || '#3b82f6', color: currentClub.colors?.text || '#fff' }}
          >
            #{player.number}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-black text-white truncate">{player.name}</h2>
            <p className="text-xs text-amber-400 font-bold">{player.positionName}</p>
            <p className="text-[11px] text-slate-400">
              {player.hometown} • {player.age} anos
            </p>
          </div>
        </div>

        {/* Contract & Earnings Card */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between shadow-lg">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Contrato Vigente</span>
            <span className="text-emerald-400 font-bold">{currentClub.name}</span>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Salário na Carteira</p>
            <p className="text-base font-black text-emerald-400">
              {formatCurrency(player.monthlySalary || 5000)} <span className="text-xs text-slate-400 font-normal">/ mês</span>
            </p>
          </div>
          <p className="text-[10px] text-slate-500">
            Patrimônio Total: <strong className="text-slate-300">{formatCurrency(player.bankBalance || 0)}</strong>
          </p>
        </div>

        {/* Season Progress */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between shadow-lg">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Temporada {seasonIndex + 1}</span>
            <span className="text-amber-400 font-bold">Rodada {gameInSeason + 1} de {totalGamesInSeason}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center py-1">
            <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
              <span className="text-lg font-black text-white">{seasonGoals}</span>
              <p className="text-[9px] uppercase font-bold text-slate-400">Gols Feitos</p>
            </div>
            <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
              <span className="text-lg font-black text-cyan-400">{seasonAssists}</span>
              <p className="text-[9px] uppercase font-bold text-slate-400">Assistências</p>
            </div>
          </div>
        </div>
      </div>

      {/* RPG Reputation & Morale Gauges */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Coach Trust */}
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Técnico</span>
            <span className={`text-xs font-black ${coachTrust >= 70 ? 'text-emerald-400' : coachTrust >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
              {coachTrust}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${coachTrust >= 70 ? 'bg-emerald-400' : coachTrust >= 40 ? 'bg-amber-400' : 'bg-rose-400'}`}
              style={{ width: `${coachTrust}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-semibold truncate">
            {coachTrust >= 75 ? '⭐ Titular Absoluto' : coachTrust >= 50 ? '🔄 Na Disputa' : '🪑 Banco de Reservas'}
          </p>
        </div>

        {/* Fan Love */}
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Torcida</span>
            <span className={`text-xs font-black ${fanLove >= 70 ? 'text-emerald-400' : fanLove >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
              {fanLove}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${fanLove >= 70 ? 'bg-emerald-400' : fanLove >= 40 ? 'bg-amber-400' : 'bg-rose-400'}`}
              style={{ width: `${fanLove}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-semibold truncate">
            {fanLove >= 80 ? '🔥 Ídolo das Massas' : fanLove >= 50 ? '👏 Querido' : '😡 Na Mira da Torcida'}
          </p>
        </div>

        {/* Media Hype */}
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Mídia & Fama</span>
            <span className="text-xs font-black text-amber-400">{mediaHype}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-500"
              style={{ width: `${mediaHype}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-semibold truncate">
            {mediaHype >= 75 ? '📺 Craque do Fantástico' : mediaHype >= 40 ? '🗞️ Cotado no Mercado' : '🔇 Fora do Radar'}
          </p>
        </div>

        {/* Energy */}
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Fôlego & Vigor</span>
            <span className="text-xs font-black text-cyan-400">{energy}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-400 transition-all duration-500"
              style={{ width: `${energy}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-semibold truncate">
            {energy >= 80 ? '⚡ 100% Voando' : energy >= 50 ? '🏃 Cansaço Leve' : '⚠️ Exausto'}
          </p>
        </div>
      </div>

      {/* Next Match Confrontation Preview */}
      {nextOpponent && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-3xl shadow-lg">
              {nextOpponent.badge}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Próximo Confronto • {currentClub.league}
              </span>
              <h3 className="text-lg font-black text-white">
                {currentClub.name} <span className="text-slate-500 font-normal">vs</span> {nextOpponent.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                🏟️ Estádio: {currentClub.stadium} • Força do Adversário: Nível {nextOpponent.prestige}
              </p>
            </div>
          </div>

          <button
            onClick={onStartMatch}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <span>⚽</span> ENTRAR EM CAMPO (DUELO TSUBASA)
          </button>
        </div>
      )}

      {/* Secondary Actions Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Lifestyle Store */}
        <button
          onClick={onOpenStore}
          className="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition flex items-center gap-3 text-left cursor-pointer active:scale-[0.99]"
        >
          <span className="text-2xl p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">🛍️</span>
          <div>
            <h4 className="text-xs font-bold text-white uppercase">Patrimônio & Vida</h4>
            <p className="text-[11px] text-slate-400">Chuteiras, carros, mansões e família</p>
          </div>
        </button>

        {/* Story Dilemma Event */}
        <button
          onClick={onTriggerEvent}
          className="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition flex items-center gap-3 text-left cursor-pointer active:scale-[0.99]"
        >
          <span className="text-2xl p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">🗞️</span>
          <div>
            <h4 className="text-xs font-bold text-white uppercase">Vestiário & Crises</h4>
            <p className="text-[11px] text-slate-400">Dilemas morais, baladas e imprensa</p>
          </div>
        </button>

        {/* Transfer Window (if available or manual check) */}
        <button
          onClick={onOpenTransfers}
          className={`p-3.5 rounded-xl border transition flex items-center gap-3 text-left cursor-pointer active:scale-[0.99] ${
            transferOffersAvailable
              ? 'bg-amber-500/10 border-amber-500/80 text-amber-300 animate-pulse'
              : 'bg-slate-900/90 hover:bg-slate-850 border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-2xl p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">💼</span>
          <div>
            <h4 className="text-xs font-bold text-white uppercase">
              {transferOffersAvailable ? '🚨 PROPOSTAS NA MESA!' : 'Janela de Transferências'}
            </h4>
            <p className="text-[11px] text-slate-400">
              {transferOffersAvailable ? 'China $800k vs Série A $75k' : 'Negociar com outros clubes'}
            </p>
          </div>
        </button>
      </div>

    </div>
  );
}
