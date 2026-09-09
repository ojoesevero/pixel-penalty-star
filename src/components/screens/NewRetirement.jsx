import React, { useEffect } from 'react';
import { formatCurrency } from '@/engine/rpgSystem';
import { sfxVictory, sfxCrowd } from '@/audio/sfx';

export default function NewRetirement({
  player,
  totalGoals,
  totalAssists,
  titles,
  seasonsPlayed,
  finalScore,
  onViewLeaderboard,
  onRestart,
}) {
  useEffect(() => {
    sfxVictory();
    sfxCrowd();
  }, []);

  return (
    <div className="max-w-2xl mx-auto w-full p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-center animate-fade-in">
      {/* Header */}
      <div className="text-4xl mb-2">🎬</div>
      <h2 className="text-lg sm:text-xl font-black text-amber-400 uppercase tracking-widest">
        FIM DE CARREIRA: O LEGADO DE UM CRAQUE
      </h2>
      <p className="text-xs text-slate-400 mt-1">
        {player.name} pendura as chuteiras aos {player.age} anos de idade.
      </p>

      {/* Big Score Card */}
      <div className="my-6 p-6 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-950 to-slate-950 border-2 border-amber-500/80 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pontuação Histórica no Hall da Fama</span>
        <div className="text-4xl sm:text-6xl font-black text-amber-400 my-1 animate-pulse">
          {finalScore}
        </div>
        <p className="text-xs text-emerald-400 font-bold">
          💰 Fortuna Final Acumulada: {formatCurrency(player.bankBalance || 0)}
        </p>
      </div>

      {/* Career Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <p className="text-2xl font-black text-white">{totalGoals}</p>
          <p className="text-[10px] uppercase font-bold text-slate-400">Gols na Carreira</p>
        </div>
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <p className="text-2xl font-black text-cyan-400">{totalAssists}</p>
          <p className="text-[10px] uppercase font-bold text-slate-400">Assistências</p>
        </div>
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <p className="text-2xl font-black text-amber-400">{titles}</p>
          <p className="text-[10px] uppercase font-bold text-slate-400">Títulos Conquistados</p>
        </div>
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <p className="text-2xl font-black text-emerald-400">{seasonsPlayed}</p>
          <p className="text-[10px] uppercase font-bold text-slate-400">Temporadas no Topo</p>
        </div>
      </div>

      {/* Clubs Timeline */}
      {player.careerHistory && player.careerHistory.length > 0 && (
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-left mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
            Trajetória de Clubes
          </h4>
          <div className="space-y-1.5">
            {player.careerHistory.map((step, i) => (
              <div key={i} className="flex justify-between items-center text-xs text-slate-300 py-1 border-b border-slate-800/60">
                <span className="font-bold text-amber-400">{step.age} anos</span>
                <span className="font-semibold text-white">{step.clubName}</span>
                <span className="text-[10px] text-slate-500 uppercase">{step.league}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onViewLeaderboard}
          className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition cursor-pointer"
        >
          🏆 Ver Hall da Fama Global
        </button>
        <button
          onClick={onRestart}
          className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer border border-slate-700"
        >
          🎮 Iniciar Nova Carreira
        </button>
      </div>
    </div>
  );
}
