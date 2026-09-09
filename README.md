# ⚽ Rumo ao Estrelato: Penalty Edition (GBC Version)

Um RPG Esportivo / Simulador Casual de Carreira no estilo clássico **Retro Game Boy Color (GBC)**, construído com React, Tailwind CSS e Canvas Pixel Art.

---

## 🚀 Como Rodar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse no navegador: `http://localhost:5173/`

---

## 🏆 Configuração do Ranking Global (Supabase)

O jogo possui suporte tanto para **Recordes Locais** (offline, via `localStorage`) quanto para **Ranking Global** em tempo real usando o Supabase.

### Passo 1: Criar o Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com) e crie um novo projeto gratuito.
2. No menu lateral esquerdo, vá em **SQL Editor**.
3. Copie o conteúdo do arquivo [`supabase_schema.sql`](./supabase_schema.sql) deste repositório, cole no editor e clique em **Run**.
   *(Isso criará a tabela `penalty_star_leaderboard`, o índice e as permissões públicas de leitura/inserção)*.

### Passo 2: Configurar as Variáveis de Ambiente
No menu lateral esquerdo do Supabase, vá em **Project Settings > API** e copie:
- **Project URL**
- **anon public key**

Crie um arquivo `.env` na raiz do projeto (com base no `.env.example`):
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica-aqui
```

Reinicie o servidor local (`npm run dev`) e o Ranking Global estará 100% ativo!

---

## 🌐 Publicação na Vercel (Domínio Gratuito `.vercel.app`)

O projeto já está pronto para deploy imediato na Vercel:

1. Suba o código para o seu repositório no GitHub.
2. Acesse [vercel.com](https://vercel.com) e faça login com seu GitHub.
3. Clique em **Add New... > Project** e selecione este repositório.
4. Na seção **Environment Variables**, adicione as mesmas chaves:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Clique em **Deploy**.
6. A Vercel fornecerá um domínio gratuito instantâneo (ex: `pixel-penalty-star.vercel.app`).
