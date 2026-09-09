-- ================================================================
-- TABELA DO RANKING GLOBAL: Rumo ao Estrelato: Penalty Edition
-- Cole e execute este script no SQL Editor do seu projeto Supabase
-- ================================================================

-- 1. Criação da tabela
CREATE TABLE IF NOT EXISTS public.penalty_star_leaderboard (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    player_name TEXT NOT NULL,
    score INTEGER NOT NULL,
    goals INTEGER DEFAULT 0,
    titles INTEGER DEFAULT 0,
    top_scorer_awards INTEGER DEFAULT 0,
    ballon_dors INTEGER DEFAULT 0,
    world_cups INTEGER DEFAULT 0,
    achievements INTEGER DEFAULT 0,
    nationality TEXT DEFAULT '🇧🇷',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Índice para consultas rápidas de classificação por pontuação
CREATE INDEX IF NOT EXISTS idx_leaderboard_score 
ON public.penalty_star_leaderboard (score DESC);

-- 3. Habilita Row Level Security (RLS)
ALTER TABLE public.penalty_star_leaderboard ENABLE ROW LEVEL SECURITY;

-- 4. Política: Qualquer usuário (público/anônimo) pode visualizar o ranking
CREATE POLICY "Permitir leitura pública do ranking" 
ON public.penalty_star_leaderboard
FOR SELECT 
USING (true);

-- 5. Política: Qualquer jogador pode enviar sua pontuação
CREATE POLICY "Permitir inserção pública de pontuação" 
ON public.penalty_star_leaderboard
FOR INSERT 
WITH CHECK (true);
