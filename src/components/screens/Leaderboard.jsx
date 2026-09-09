/* ==========================================================================
   HALL DA FAMA (LEADERBOARD)
   Global Supabase & Local records with 16-bit modern polish
   ========================================================================== */

import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchGlobalLeaderboard,
  submitGlobalScore,
  isSupabaseConfigured,
} from '@/lib/supabase';

const LEADERBOARD_KEY = 'penalty_star_leaderboard';

export function getLeaderboard() {
  try {
    const data = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]');
    return data.sort((a, b) => b.score - a.score).slice(0, 50);
  } catch {
    return [];
  }
}

export async function submitScore(entry) {
  try {
    const data = getLeaderboard();
    data.push({
      ...entry,
      date: new Date().toLocaleDateString('pt-BR'),
    });
    data.sort((a, b) => b.score - a.score);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(data.slice(0, 50)));
  } catch { /* ignore */ }

  if (isSupabaseConfigured()) {
    try {
      await submitGlobalScore(entry);
    } catch (err) {
      console.warn('Não foi possível sincronizar score com Supabase:', err);
    }
  }
}

export default function Leaderboard({ onBack, highlightScore }) {
  const [tab, setTab] = useState(isSupabaseConfigured() ? 'global' : 'local');
  const [localEntries, setLocalEntries] = useState([]);
  const [globalEntries, setGlobalEntries] = useState([]);
  const [loadingGlobal, setLoadingGlobal] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const loadLocal = useCallback(() => {
    setLocalEntries(getLeaderboard());
  }, []);

  const loadGlobal = useCallback(async () => {
    if (!isSupabaseConfigured()) return;
    setLoadingGlobal(true);
    setGlobalError(null);
    const { data, error } = await fetchGlobalLeaderboard(50);
    if (error) {
      setGlobalError(error);
    } else {
      setGlobalEntries(data || []);
    }
    setLoadingGlobal(false);
  }, []);

  useEffect(() => {
    loadLocal();
    if (isSupabaseConfigured()) {
      loadGlobal();
    }
  }, [loadLocal, loadGlobal]);

  const activeEntries = tab === 'global' ? globalEntries : localEntries;

  return (
    <div className="max-w-2xl mx-auto w-full p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl animate-fade-in flex flex-col gap-4">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-lg sm:text-xl font-black text-amber-400 uppercase tracking-wider flex items-center justify-center gap-2">
          <span>🏆</span> HALL DA FAMA MUNDIAL
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          As maiores carreiras e lendas do futebol consagradas na história.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => {
            setTab('global');
            if (isSupabaseConfigured() && globalEntries.length === 0) loadGlobal();
          }}
          className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer ${
            tab === 'global'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🌐 Global (Supabase)
        </button>
        <button
          onClick={() => {
            setTab('local');
            loadLocal();
          }}
          className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer ${
            tab === 'local'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          💾 Meus Recordes
        </button>
      </div>

      {/* Supabase unconfigured notice */}
      {tab === 'global' && !isSupabaseConfigured() && (
        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 text-center space-y-2">
          <p className="text-xs font-bold text-amber-400">SUPABASE NÃO CONFIGURADO</p>
          <p className="text-xs text-slate-300">
            Adicione <code className="text-cyan-400">VITE_SUPABASE_URL</code> e <code className="text-cyan-400">VITE_SUPABASE_ANON_KEY</code> no arquivo <code className="text-amber-300">.env</code> para conectar ao Ranking Global!
          </p>
          <button
            onClick={() => setTab('local')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition"
          >
            Ver Meus Recordes Locais
          </button>
        </div>
      )}

      {/* Loading state */}
      {tab === 'global' && isSupabaseConfigured() && loadingGlobal && (
        <div className="text-center py-12">
          <div className="text-xs font-black tracking-widest text-cyan-400 animate-pulse uppercase">
            Sincronizando com o Supabase Cloud...
          </div>
        </div>
      )}

      {/* Error state */}
      {tab === 'global' && isSupabaseConfigured() && !loadingGlobal && globalError && (
        <div className="bg-rose-950/40 border border-rose-500/40 p-4 rounded-xl text-center space-y-2">
          <p className="text-xs font-bold text-rose-400 uppercase">Falha na conexão</p>
          <p className="text-xs text-slate-300">{globalError}</p>
          <button
            onClick={loadGlobal}
            className="px-4 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-bold cursor-pointer"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Table list */}
      {(!loadingGlobal || tab === 'local') &&
        !(tab === 'global' && !isSupabaseConfigured()) &&
        !globalError && (
          <>
            {activeEntries.length === 0 ? (
              <div className="text-center py-10">
                <span className="text-3xl block mb-2">📭</span>
                <p className="text-sm font-bold text-slate-300">Nenhuma carreira registrada ainda.</p>
                <p className="text-xs text-slate-500 mt-1">
                  Complete uma carreira para cravar seu nome na história!
                </p>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                {activeEntries.map((entry, i) => {
                  const isHighlight = highlightScore && entry.score === highlightScore;
                  const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null;

                  return (
                    <div
                      key={entry.id || i}
                      className={`flex items-center justify-between p-3 rounded-xl border transition ${
                        isHighlight
                          ? 'bg-amber-500/20 border-amber-500 shadow-md shadow-amber-500/10'
                          : i < 3
                          ? 'bg-slate-950/80 border-slate-800'
                          : 'bg-slate-950/40 border-slate-850'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 text-center font-black text-sm text-amber-400">
                          {medal || `#${i + 1}`}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">
                            {entry.playerName}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {entry.date || 'Lenda do Futebol'} • {entry.nationality || '🇧🇷'}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-black text-amber-400">
                          {entry.score} pts
                        </span>
                        <div className="flex items-center justify-end gap-2 text-[10px] text-slate-400">
                          <span>⚽ {entry.goals || 0}</span>
                          <span>🏆 {entry.titles || 0}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

      {/* Footer buttons */}
      <div className="flex gap-2 pt-2">
        {tab === 'global' && isSupabaseConfigured() && (
          <button
            onClick={loadGlobal}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
          >
            🔄 Atualizar
          </button>
        )}
        <button
          onClick={onBack}
          className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition cursor-pointer border border-slate-700"
        >
          ◀ Voltar
        </button>
      </div>
    </div>
  );
}
