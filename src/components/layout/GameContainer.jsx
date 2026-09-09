import React from 'react';
import { formatCurrency } from '@/engine/rpgSystem';

export default function GameContainer({ player, currentClub, onRankingClick, onResetGame, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start py-1.5 sm:py-2.5 px-2 sm:px-3 font-sans selection:bg-amber-500 selection:text-black">
      {/* Background Subtle Gradient & Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 -z-10" />

      {/* Main Console Container */}
      <div className="w-full max-w-4xl bg-slate-900/95 border border-slate-800/80 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden flex flex-col">
        
        {/* Top Professional Header */}
        <header className="bg-slate-950/90 border-b border-slate-800/80 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
          {/* Brand / Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-base shadow-md shadow-amber-500/20">
              ⚽
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-black tracking-wider uppercase bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                Rumo ao Estrelato
              </h1>
              <span className="text-[9px] text-slate-400 font-semibold tracking-widest uppercase block -mt-0.5">
                Football Career RPG • 16-Bit Edition
              </span>
            </div>
          </div>

          {/* Quick HUD status if in-game */}
          {player && currentClub && (
            <div className="flex items-center flex-wrap gap-2 text-xs">
              {/* Club Badge & Name */}
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-700/60 font-semibold shadow-inner"
                style={{ backgroundColor: `${currentClub.colors?.primary || '#1e293b'}25` }}
              >
                <span>{currentClub.badge}</span>
                <span className="text-white font-bold">{currentClub.name}</span>
                <span className="text-slate-400 text-[10px]">({currentClub.league})</span>
              </div>

              {/* Age & Position */}
              <div className="bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60 text-slate-300 font-medium">
                <span className="text-amber-400 font-bold">{player.age} anos</span> • {player.number}
              </div>

              {/* Bank Balance */}
              <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-full font-bold shadow-sm">
                💰 {formatCurrency(player.bankBalance || 0)}
              </div>
            </div>
          )}

          {/* Top Actions */}
          <div className="flex items-center gap-2">
            {onRankingClick && (
              <button
                onClick={onRankingClick}
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-300 hover:bg-amber-500/20 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                🏆 <span>Hall da Fama</span>
              </button>
            )}
            {onResetGame && (
              <button
                onClick={onResetGame}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium transition cursor-pointer"
                title="Novo Jogo / Reiniciar"
              >
                🔄
              </button>
            )}
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 flex flex-col p-2 sm:p-3.5 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Footer Info */}
      <footer className="mt-1.5 text-[10px] text-slate-500 text-center font-medium">
        Desenvolvido com paixão pelo futebol brasileiro • Supabase Global Sync • Vercel Cloud
      </footer>
    </div>
  );
}
