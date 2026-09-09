import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch top entries from Supabase
 */
export async function fetchGlobalLeaderboard(limit = 50) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: [], error: 'Supabase não configurado' };
  }

  try {
    const { data, error } = await supabase
      .from('penalty_star_leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('Erro ao carregar ranking global:', error.message);
      return { data: [], error: error.message };
    }

    // Map table fields to game format
    const mapped = (data || []).map((row) => ({
      id: row.id,
      playerName: row.player_name,
      score: row.score,
      goals: row.goals || 0,
      titles: row.titles || 0,
      topScorerAwards: row.top_scorer_awards || 0,
      ballonDors: row.ballon_dors || 0,
      worldCups: row.world_cups || 0,
      achievements: row.achievements || 0,
      nationality: row.nationality || '🇧🇷',
      date: row.created_at ? new Date(row.created_at).toLocaleDateString('pt-BR') : '',
    }));

    return { data: mapped, error: null };
  } catch (err) {
    console.error('Erro na requisição do Supabase:', err);
    return { data: [], error: err.message };
  }
}

/**
 * Submit score to global leaderboard in Supabase
 */
export async function submitGlobalScore(entry) {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, error: 'Supabase não configurado' };
  }

  try {
    const { data, error } = await supabase
      .from('penalty_star_leaderboard')
      .insert([
        {
          player_name: entry.playerName || 'Anônimo',
          score: Number(entry.score) || 0,
          goals: Number(entry.goals) || 0,
          titles: Number(entry.titles) || 0,
          top_scorer_awards: Number(entry.topScorerAwards) || 0,
          ballon_dors: Number(entry.ballonDors) || 0,
          world_cups: Number(entry.worldCups) || 0,
          achievements: Number(entry.achievements) || 0,
          nationality: entry.nationality || '🇧🇷',
        },
      ])
      .select();

    if (error) {
      console.warn('Erro ao registrar score global:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Erro ao enviar score para o Supabase:', err);
    return { success: false, error: err.message };
  }
}
