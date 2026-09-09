import React from 'react';
import { formatCurrency } from '@/engine/rpgSystem';

export default function GameContainer({
  player,
  currentClub,
  viewMode = 'pc',
  onToggleViewMode,
  onRankingClick,
  onResetGame,
  children,
}) {
  const isMobileView = viewMode === 'mobile';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start py-1.5 sm:py-2.5 px-2 sm:px-3 font-sans selection:bg-amber-500 selection:text-black">
      {/* Background Subtle Gradient & Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 -z-10" />

      {/* Main Console Container */}
      <div
        className={`bg-slate-900/95 transition-all duration-300 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col ${
          isMobileView
            ? 'w-full max-w-[420px] rounded-3xl border-2 border-amber-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] my-auto min-h-[620px]'
            : 'w-full max-w-5xl rounded-xl border border-slate-800/80'
        }`}
      >
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
                {isMobileView ? 'Modo Mobile Vertical' : 'Modo PC Widescreen'}
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
              </div>

              {/* Bank Balance */}
              <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold shadow-sm text-[11px]">
                💰 {formatCurrency(player.bankBalance || 0)}
              </div>
            </div>
          )}

          {/* Top Actions: View Mode Switcher + Ranking + Reset */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            {onToggleViewMode && (
              <div className="flex bg-slate-900 border border-slate-700/80 rounded-lg p-0.5 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => onToggleViewMode('pc')}
                  className={`px-2 py-1 rounded flex items-center gap-1 transition cursor-pointer ${
                    !isMobileView
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Modo PC (Widescreen)"
                >
                  💻 PC
                </button>
                <button
                  type="button"
                  onClick={() => onToggleViewMode('mobile')}
                  className={`px-2 py-1 rounded flex items-center gap-1 transition cursor-pointer ${
                    isMobileView
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Modo Mobile (Vertical)"
                >
                  📱 Mobile
                </button>
              </div>
            )}

            {onRankingClick && (
              <button
                type="button"
                onClick={onRankingClick}
                className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-300 hover:bg-amber-500/20 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                title="Hall da Fama"
              >
                🏆
              </button>
            )}
            {onResetGame && (
              <button
                type="button"
                onClick={onResetGame}
                className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium transition cursor-pointer"
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
