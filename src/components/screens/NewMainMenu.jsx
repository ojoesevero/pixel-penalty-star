export default function NewMainMenu({
  hasSavedGame,
  viewMode = 'pc',
  onChangeViewMode,
  onNewGame,
  onContinue,
  onLeaderboard,
}) {
  return (
    <div className="max-w-lg mx-auto w-full p-3 sm:p-5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl flex flex-col items-center text-center animate-fade-in my-auto">
      
      {/* Anime Crest Badge */}
      <div className="relative mb-2">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center text-2xl sm:text-3xl shadow-xl shadow-amber-500/25 border-2 border-amber-300/40 transform -rotate-2 hover:rotate-0 transition-transform">
          ⚽
        </div>
        <div className="absolute -bottom-1.5 -right-1.5 bg-slate-950 border border-amber-500/50 text-amber-300 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest shadow-md">
          RPG
        </div>
      </div>

      {/* Hero Title */}
      <h1 className="text-lg sm:text-2xl font-black uppercase tracking-wider bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent drop-shadow-md">
        Rumo ao Estrelato
      </h1>
      <p className="text-[10px] sm:text-xs text-slate-300 font-semibold tracking-wide uppercase mt-0.5 mb-2.5">
        Carreira de Futebol • Estilo Capitão Tsubasa
      </p>

      {/* Layout Selection: PC vs Mobile */}
      {onChangeViewMode && (
        <div className="mb-3 w-full max-w-xs bg-slate-950/90 p-1 rounded-xl border border-slate-800 flex items-center justify-between gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => onChangeViewMode('pc')}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
              viewMode === 'pc'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            💻 Modo PC (Wide)
          </button>
          <button
            type="button"
            onClick={() => onChangeViewMode('mobile')}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
              viewMode === 'mobile'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📱 Mobile (Vertical)
          </button>
        </div>
      )}

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-1 mb-3 text-[9px] font-medium text-slate-400">
        <span className="px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-800">
          🌱 Várzea & Série D
        </span>
        <span className="px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-800">
          ⚡ Duelos Anime
        </span>
        <span className="px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-800">
          💰 Salários Reais & Luvas
        </span>
        <span className="px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-800">
          🏆 Supabase Global
        </span>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2">
        {hasSavedGame && (
          <button
            onClick={onContinue}
            className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-emerald-500/20 transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
          >
            <span>▶</span> CONTINUAR CARREIRA SALVA
          </button>
        )}

        <button
          onClick={onNewGame}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
        >
          <span>⭐</span> INICIAR NOVA CARREIRA
        </button>

        <button
          onClick={onLeaderboard}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-400 font-bold text-[11px] sm:text-xs uppercase tracking-wider border border-slate-700 transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
        >
          <span>🏆</span> HALL DA FAMA (RANKING GLOBAL)
        </button>
      </div>

      <p className="mt-3 text-[10px] text-slate-500 font-medium">
        Comece do zero no interior, viva os dilemas do vestiário e conquiste o mundo.
      </p>
    </div>
  );
}
