/* ============================================
   LEADERBOARD
   Ranking with Supabase Global & Local modes
   ============================================ */

import React, { useState, useEffect, useCallback } from 'react';
import PixelButton from '@/components/ui/PixelButton';
import {
  fetchGlobalLeaderboard,
  submitGlobalScore,
  isSupabaseConfigured,
} from '@/lib/supabase';

const LEADERBOARD_KEY = 'penalty_star_leaderboard';

/**
 * Get leaderboard from localStorage
 */
export function getLeaderboard() {
  try {
    const data = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]');
    return data.sort((a, b) => b.score - a.score).slice(0, 50);
  } catch {
    return [];
  }
}

/**
 * Submit a score to both local storage and Supabase (if configured)
 */
export async function submitScore(entry) {
  // 1. Always save locally
  try {
    const data = getLeaderboard();
    data.push({
      ...entry,
      date: new Date().toLocaleDateString('pt-BR'),
    });
    data.sort((a, b) => b.score - a.score);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(data.slice(0, 50)));
  } catch {
    /* ignore local error */
  }

  // 2. Submit to Supabase if configured
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

  // Load local leaderboard
  const loadLocal = useCallback(() => {
    setLocalEntries(getLeaderboard());
  }, []);

  // Load global leaderboard
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
    <div className="p-4 animate-slide-up">
      {/* Title */}
      <div className="text-center mb-3">
        <h2 className="font-pixel text-[10px] text-gbc-yellow">🏆 HALL DA FAMA</h2>
        <div className="mt-1 w-24 h-[2px] bg-gbc-purple mx-auto" />
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => {
            setTab('global');
            if (isSupabaseConfigured() && globalEntries.length === 0) {
              loadGlobal();
            }
          }}
          className={`flex-1 py-1.5 font-pixel text-[7px] text-center border transition-all ${
            tab === 'global'
              ? 'border-gbc-yellow bg-gbc-yellow/20 text-gbc-yellow'
              : 'border-gbc-navy bg-gbc-black/40 text-gbc-gray hover:text-gbc-white'
          }`}
        >
          🌐 GLOBAL (SUPABASE)
        </button>
        <button
          type="button"
          onClick={() => {
            setTab('local');
            loadLocal();
          }}
          className={`flex-1 py-1.5 font-pixel text-[7px] text-center border transition-all ${
            tab === 'local'
              ? 'border-gbc-yellow bg-gbc-yellow/20 text-gbc-yellow'
              : 'border-gbc-navy bg-gbc-black/40 text-gbc-gray hover:text-gbc-white'
          }`}
        >
          💾 MEUS RECORDES
        </button>
      </div>

      {/* Global Tab Content - Supabase Not Configured */}
      {tab === 'global' && !isSupabaseConfigured() && (
        <div className="bg-gbc-navy/30 border border-gbc-navy p-3 text-center my-4 rounded-none">
          <span className="text-2xl mb-1 block">☁️</span>
          <p className="font-pixel text-[7px] text-gbc-yellow mb-2">SUPABASE NÃO CONFIGURADO</p>
          <p className="font-retro text-sm text-gbc-gray leading-tight mb-3">
            Para ativar o Ranking Global com outros jogadores, crie seu projeto no Supabase e configure as variáveis no arquivo <code className="text-gbc-cyan">.env</code>:
          </p>
          <div className="bg-gbc-black/70 p-2 font-mono text-[10px] text-left text-gbc-green border border-gbc-navy/60 select-all mb-3 overflow-x-auto">
            VITE_SUPABASE_URL=...<br />
            VITE_SUPABASE_ANON_KEY=...
          </div>
          <p className="font-retro text-xs text-gbc-dark mb-3">
            Veja o arquivo <code className="text-gbc-yellow">supabase_schema.sql</code> para criar a tabela com 1 clique!
          </p>
          <PixelButton onClick={() => setTab('local')} variant="secondary" fullWidth>
            VER RANKING LOCAL
          </PixelButton>
        </div>
      )}

      {/* Global Tab - Loading State */}
      {tab === 'global' && isSupabaseConfigured() && loadingGlobal && (
        <div className="text-center py-8">
          <div className="font-pixel text-[8px] text-gbc-cyan animate-pulse">
            CARREGANDO RANKING...
          </div>
        </div>
      )}

      {/* Global Tab - Error State */}
      {tab === 'global' && isSupabaseConfigured() && !loadingGlobal && globalError && (
        <div className="bg-gbc-red/20 border border-gbc-red p-3 text-center my-3">
          <p className="font-pixel text-[7px] text-gbc-red mb-1">ERRO DE CONEXÃO</p>
          <p className="font-retro text-xs text-gbc-gray mb-2">{globalError}</p>
          <PixelButton onClick={loadGlobal} variant="primary" size="sm">
            TENTAR NOVAMENTE
          </PixelButton>
        </div>
      )}

      {/* Records Table */}
      {(!loadingGlobal || tab === 'local') &&
        !(tab === 'global' && !isSupabaseConfigured()) &&
        !globalError && (
          <>
            {activeEntries.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-3xl">📭</span>
                <p className="font-retro text-lg text-gbc-gray mt-3">
                  Nenhum score registrado ainda.
                </p>
                <p className="font-retro text-sm text-gbc-dark mt-1">
                  Complete uma carreira para aparecer aqui!
                </p>
              </div>
            ) : (
              <div className="space-y-1 mb-4 max-h-[300px] overflow-y-auto pr-1">
                {/* Header */}
                <div className="flex items-center gap-2 px-2 py-1 border-b border-gbc-navy sticky top-0 bg-gbc-black z-10">
                  <span className="font-pixel text-[6px] text-gbc-gray w-6">#</span>
                  <span className="font-pixel text-[6px] text-gbc-gray flex-1">NOME</span>
                  <span className="font-pixel text-[6px] text-gbc-gray w-12 text-right">SCORE</span>
                  <span className="font-pixel text-[6px] text-gbc-gray w-8 text-center" title="Títulos">🏆</span>
                  <span className="font-pixel text-[6px] text-gbc-gray w-8 text-center" title="Copas do Mundo">🌍</span>
                </div>

                {activeEntries.map((entry, i) => {
                  const isHighlight = highlightScore && entry.score === highlightScore;
                  const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';

                  return (
                    <div
                      key={entry.id || i}
                      className={`flex items-center gap-2 px-2 py-1.5 border-b border-gbc-black/30 
                        ${isHighlight ? 'bg-gbc-yellow/10 border-gbc-yellow animate-pulse-glow' : ''}
                        ${i < 3 ? 'bg-gbc-navy/20' : ''}`}
                    >
                      <span className="font-pixel text-[7px] text-gbc-gray w-6">
                        {medal || i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="font-pixel text-[7px] text-gbc-white truncate block">
                          {entry.playerName}
                        </span>
                        {entry.date && (
                          <span className="font-retro text-xs text-gbc-dark">{entry.date}</span>
                        )}
                      </div>
                      <span className="font-pixel text-[8px] text-gbc-yellow w-12 text-right">
                        {entry.score}
                      </span>
                      <span className="font-pixel text-[6px] text-gbc-orange w-8 text-center">
                        {entry.titles || 0}
                      </span>
                      <span className="font-pixel text-[6px] text-gbc-green w-8 text-center">
                        {entry.worldCups || 0}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

      {/* Bottom Controls */}
      <div className="space-y-2 mt-2">
        {tab === 'global' && isSupabaseConfigured() && (
          <PixelButton onClick={loadGlobal} variant="secondary" fullWidth>
            🔄 ATUALIZAR
          </PixelButton>
        )}
        <PixelButton onClick={onBack} variant="ghost" fullWidth>
          ◀ VOLTAR
        </PixelButton>
      </div>
    </div>
  );
}
