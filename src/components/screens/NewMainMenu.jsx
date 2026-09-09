import React from 'react';

export default function NewMainMenu({ hasSavedGame, onNewGame, onContinue, onLeaderboard }) {
  return (
    <div className="max-w-xl mx-auto w-full p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col items-center text-center animate-fade-in my-auto">
      
      {/* Anime Crest Badge */}
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center text-4xl shadow-2xl shadow-amber-500/30 border-2 border-amber-300/40 transform -rotate-3 hover:rotate-0 transition-transform">
          ⚽
        </div>
        <div className="absolute -bottom-2 -right-2 bg-slate-950 border border-amber-500/50 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-md">
          RPG
        </div>
      </div>

      {/* Hero Title */}
      <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-wider bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent drop-shadow-md">
        Rumo ao Estrelato
      </h1>
      <p className="text-xs sm:text-sm text-slate-300 font-semibold tracking-wide uppercase mt-1 mb-6">
        Carreira de Futebol • Estilo Capitão Tsubasa
      </p>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 text-[11px] font-medium text-slate-400">
        <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800">
          🌱 Várzea & Série D
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800">
          ⚡ Duelos Anime
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800">
          💰 Salários Reais & Luvas
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800">
          🏆 Supabase Global
        </span>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3">
        {hasSavedGame && (
          <button
            onClick={onContinue}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
          >
            <span>▶</span> CONTINUAR CARREIRA SALVA
          </button>
        )}

        <button
          onClick={onNewGame}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
        >
          <span>⭐</span> INICIAR NOVA CARREIRA
        </button>

        <button
          onClick={onLeaderboard}
          className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-amber-400 font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
        >
          <span>🏆</span> HALL DA FAMA (RANKING GLOBAL)
        </button>
      </div>

      <p className="mt-8 text-[11px] text-slate-500 font-medium">
        Comece do zero no interior, viva os dilemas do vestiário e conquiste o mundo.
      </p>
    </div>
  );
}
