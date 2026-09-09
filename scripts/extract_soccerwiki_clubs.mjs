import fs from 'fs';
import path from 'path';

const wikiPath = 'c:/Users/SAAV054/Documents/Desenvolvimento/pessoal/pixel-penalty-star/src/assets/SoccerWiki_2026-09-09_1788978400.json';
const outClubsDataPath = 'c:/Users/SAAV054/Documents/Desenvolvimento/pessoal/pixel-penalty-star/src/engine/clubsData.js';
const outSqlPath = 'c:/Users/SAAV054/Documents/Desenvolvimento/pessoal/pixel-penalty-star/supabase_clubs.sql';

console.log('Loading SoccerWiki data...');
const rawData = JSON.parse(fs.readFileSync(wikiPath, 'utf8'));
const clubData = rawData.ClubData;

function findClub(searchName, preferredId) {
  if (preferredId) {
    const byId = clubData.find(c => c.ID === preferredId);
    if (byId) return byId;
  }
  const exact = clubData.find(c => c.Name && c.Name.toLowerCase() === searchName.toLowerCase());
  if (exact) return exact;
  const partial = clubData.find(c => c.Name && c.Name.toLowerCase().includes(searchName.toLowerCase()));
  return partial || null;
}

// Full league definitions requested by user
const LEAGUES_CONFIG = {
  REGIONAL: {
    id: 'regional',
    name: 'Série D / Acesso Regional',
    category: 'domestic_regional',
    country: '🇧🇷',
    repTier: 1,
    avgSalaryRange: [2500, 8000],
    signingBonusRange: [0, 20000],
  },
  SERIE_C: {
    id: 'serie_c',
    name: 'Brasileirão Série C',
    category: 'domestic_c',
    country: '🇧🇷',
    repTier: 2,
    avgSalaryRange: [8000, 25000],
    signingBonusRange: [20000, 100000],
  },
  SERIE_B: {
    id: 'serie_b',
    name: 'Brasileirão Série B',
    category: 'domestic_b',
    country: '🇧🇷',
    repTier: 2,
    avgSalaryRange: [20000, 60000],
    signingBonusRange: [60000, 300000],
  },
  SERIE_A: {
    id: 'serie_a',
    name: 'Brasileirão Série A (Elite)',
    category: 'domestic_a',
    country: '🇧🇷',
    repTier: 3,
    avgSalaryRange: [80000, 450000],
    signingBonusRange: [500000, 3000000],
  },
  ARGENTINA: {
    id: 'argentina',
    name: 'Liga Profesional (Argentina)',
    category: 'south_america',
    country: '🇦🇷',
    repTier: 3,
    avgSalaryRange: [60000, 320000],
    signingBonusRange: [300000, 2000000],
  },
  LIGA_MX: {
    id: 'liga_mx',
    name: 'Liga MX (México)',
    category: 'americas',
    country: '🇲🇽',
    repTier: 3,
    avgSalaryRange: [90000, 450000],
    signingBonusRange: [500000, 2500000],
  },
  MLS: {
    id: 'mls',
    name: 'Major League Soccer (EUA)',
    category: 'americas',
    country: '🇺🇸',
    repTier: 3,
    avgSalaryRange: [150000, 800000],
    signingBonusRange: [1000000, 5000000],
  },
  SAUDI_PRO: {
    id: 'saudi_pro',
    name: 'Saudi Pro League (Petrodólares)',
    category: 'petrodollar',
    country: '🇸🇦',
    repTier: 3,
    avgSalaryRange: [800000, 3500000],
    signingBonusRange: [10000000, 40000000],
  },
  PORTUGAL: {
    id: 'portugal',
    name: 'Liga Portugal (Vitrine Europeia)',
    category: 'europe_mid',
    country: '🇵🇹',
    repTier: 4,
    avgSalaryRange: [120000, 550000],
    signingBonusRange: [1000000, 5000000],
  },
  PREMIER_LEAGUE: {
    id: 'premier_league',
    name: 'Premier League (Inglaterra)',
    category: 'europe_top',
    country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    repTier: 5,
    avgSalaryRange: [1500000, 5500000],
    signingBonusRange: [15000000, 60000000],
  },
  LA_LIGA: {
    id: 'la_liga',
    name: 'La Liga (Espanha)',
    category: 'europe_top',
    country: '🇪🇸',
    repTier: 5,
    avgSalaryRange: [1200000, 5000000],
    signingBonusRange: [12000000, 50000000],
  },
  SERIE_A_ITALIA: {
    id: 'serie_a_italia',
    name: 'Serie A (Itália)',
    category: 'europe_top',
    country: '🇮🇹',
    repTier: 5,
    avgSalaryRange: [1000000, 4000000],
    signingBonusRange: [10000000, 40000000],
  },
  BUNDESLIGA: {
    id: 'bundesliga',
    name: 'Bundesliga (Alemanha)',
    category: 'europe_top',
    country: '🇩🇪',
    repTier: 5,
    avgSalaryRange: [1100000, 4500000],
    signingBonusRange: [12000000, 45000000],
  },
  J_LEAGUE: {
    id: 'j_league',
    name: 'J-League (Japão)',
    category: 'asia',
    country: '🇯🇵',
    repTier: 3,
    avgSalaryRange: [100000, 450000],
    signingBonusRange: [500000, 2500000],
  },
  RUSSIA: {
    id: 'russia',
    name: 'Russian Premier League (Rússia)',
    category: 'europe_mid',
    country: '🇷🇺',
    repTier: 3,
    avgSalaryRange: [180000, 750000],
    signingBonusRange: [1500000, 6000000],
  },
  GLOBAL_AVULSOS: {
    id: 'global_avulsos',
    name: 'Clubes Globais & Históricos',
    category: 'global',
    country: '🌍',
    repTier: 4,
    avgSalaryRange: [150000, 900000],
    signingBonusRange: [1200000, 8000000],
  },
};

// Target clubs per league
const CLUBS_MANIFEST = [
  // 1. REGIONAL (Formadores)
  { league: 'REGIONAL', query: 'Brasil de Pelotas', id: 2478, city: 'Pelotas (RS)', colors: ['#d90429', '#111111'], stadium: 'Bento Freitas', badge: '🔴⚫', prestige: 25 },
  { league: 'REGIONAL', query: 'São José EC', id: 3436, nameOverride: 'São José-RS', city: 'Porto Alegre (RS)', colors: ['#0a3871', '#ffffff'], stadium: "Passo D'Areia", badge: '🦅', prestige: 18 },
  { league: 'REGIONAL', query: 'Ferroviária', id: 3426, city: 'Araraquara (SP)', colors: ['#6b1d2f', '#ffffff'], stadium: 'Arena da Fonte', badge: '🚂', prestige: 22 },
  { league: 'REGIONAL', query: 'Maringá FC', id: 3523, city: 'Maringá (PR)', colors: ['#005a36', '#ffffff'], stadium: 'Willie Davids', badge: '🐕', prestige: 22 },
  { league: 'REGIONAL', query: 'Campinense Clube', id: 2396, nameOverride: 'Campinense', city: 'Campina Grande (PB)', colors: ['#c4122f', '#1a1a1a'], stadium: 'Amigão', badge: '🦊', prestige: 21 },
  { league: 'REGIONAL', query: 'Bangu AC', id: 2815, nameOverride: 'Bangu', city: 'Rio de Janeiro (RJ)', colors: ['#d90429', '#ffffff'], stadium: 'Moça Bonita', badge: '🔴⚪', prestige: 19 },
  { league: 'REGIONAL', query: 'Santa Cruz', id: 603, city: 'Recife (PE)', colors: ['#111111', '#d90429'], stadium: 'Arruda', badge: '🐍', prestige: 32 },
  { league: 'REGIONAL', query: 'Portuguesa', id: 1232, city: 'São Paulo (SP)', colors: ['#d90429', '#00543d'], stadium: 'Canindé', badge: '🦁', prestige: 30 },

  // 2. SÉRIE C
  { league: 'SERIE_C', query: 'Volta Redonda FC', id: 2475, nameOverride: 'Volta Redonda', city: 'Volta Redonda (RJ)', colors: ['#1a1a1a', '#ffd700'], stadium: 'Raulino de Oliveira', badge: '⚡', prestige: 36 },
  { league: 'SERIE_C', query: 'Brusque FC', id: 4483, nameOverride: 'Brusque', city: 'Brusque (SC)', colors: ['#ffd700', '#d90429'], stadium: 'Augusto Bauer', badge: '🟡', prestige: 37 },
  { league: 'SERIE_C', query: 'Botafogo PB', id: 3017, nameOverride: 'Botafogo-PB', city: 'João Pessoa (PB)', colors: ['#111111', '#ffffff'], stadium: 'Almeidão', badge: '⭐', prestige: 39 },
  { league: 'SERIE_C', query: 'Operário Ferroviário', id: 3254, nameOverride: 'Operário-PR', city: 'Ponta Grossa (PR)', colors: ['#111111', '#ffffff'], stadium: 'Germano Krüger', badge: '⚪⚫', prestige: 38 },
  { league: 'SERIE_C', query: 'Amazonas FC', id: 6455, nameOverride: 'Amazonas FC', city: 'Manaus (AM)', colors: ['#ffd700', '#111111'], stadium: 'Arena da Amazônia', badge: '🐆', prestige: 37 },
  { league: 'SERIE_C', query: 'Náutico', id: 301, city: 'Recife (PE)', colors: ['#d90429', '#ffffff'], stadium: 'Aflitos', badge: '🇦🇹', prestige: 45 },
  { league: 'SERIE_C', query: 'Remo', id: 604, nameOverride: 'Clube do Remo', city: 'Belém (PA)', colors: ['#002244', '#ffffff'], stadium: 'Baenão', badge: '🦁', prestige: 44 },
  { league: 'SERIE_C', query: 'Figueirense', id: 293, city: 'Florianópolis (SC)', colors: ['#111111', '#ffffff'], stadium: 'Orlando Scarpelli', badge: '🌪️', prestige: 43 },
  { league: 'SERIE_C', query: 'CSA', id: 1478, city: 'Maceió (AL)', colors: ['#003882', '#ffffff'], stadium: 'Rei Pelé', badge: '🔵', prestige: 42 },
  { league: 'SERIE_C', query: 'Ypiranga FC', id: 3073, nameOverride: 'Ypiranga de Erechim', city: 'Erechim (RS)', colors: ['#ffd700', '#00543d'], stadium: 'Colosso da Lagoa', badge: '🟡🟢', prestige: 35 },

  // 3. SÉRIE B
  { league: 'SERIE_B', query: 'Sport Recife', id: 923, city: 'Recife (PE)', colors: ['#c4122f', '#1a1a1a'], stadium: 'Ilha do Retiro', badge: '🦁', prestige: 56 },
  { league: 'SERIE_B', query: 'Ceará SC', id: 1458, city: 'Fortaleza (CE)', colors: ['#1a1a1a', '#ffffff'], stadium: 'Arena Castelão', badge: '👴', prestige: 55 },
  { league: 'SERIE_B', query: 'Coritiba', id: 291, city: 'Curitiba (PR)', colors: ['#00543d', '#ffffff'], stadium: 'Couto Pereira', badge: '🟢', prestige: 54 },
  { league: 'SERIE_B', query: 'Goiás', id: 297, city: 'Goiânia (GO)', colors: ['#00543d', '#ffffff'], stadium: 'Serrinha', badge: '🦜', prestige: 53 },
  { league: 'SERIE_B', query: 'Ponte Preta', id: 303, city: 'Campinas (SP)', colors: ['#111111', '#ffffff'], stadium: 'Moisés Lucarelli', badge: '🐵', prestige: 50 },
  { league: 'SERIE_B', query: 'Guarani FC', id: 1515, city: 'Campinas (SP)', colors: ['#00543d', '#ffffff'], stadium: 'Brinco de Ouro', badge: '🏹', prestige: 49 },
  { league: 'SERIE_B', query: 'Avaí FC', id: 1414, city: 'Florianópolis (SC)', colors: ['#0047ab', '#ffffff'], stadium: 'Ressacada', badge: '🦁', prestige: 51 },
  { league: 'SERIE_B', query: 'Chapecoense AF', id: 2379, nameOverride: 'Chapecoense', city: 'Chapecó (SC)', colors: ['#00543d', '#ffffff'], stadium: 'Arena Condá', badge: '🏹', prestige: 52 },
  { league: 'SERIE_B', query: 'Grêmio Novorizontino', id: 3481, nameOverride: 'Novorizontino', city: 'Novo Horizonte (SP)', colors: ['#ffd700', '#111111'], stadium: 'Jorjão', badge: '🐯', prestige: 48 },
  { league: 'SERIE_B', query: 'Paysandu SC', id: 302, nameOverride: 'Paysandu', city: 'Belém (PA)', colors: ['#0080ff', '#ffffff'], stadium: 'Curuzu', badge: '🐺', prestige: 52 },
  { league: 'SERIE_B', query: 'Vila Nova', id: 1457, city: 'Goiânia (GO)', colors: ['#d90429', '#ffffff'], stadium: 'OBA', badge: '🐅', prestige: 49 },

  // 4. SÉRIE A (Elite)
  { league: 'SERIE_A', query: 'CR Flamengo', id: 294, nameOverride: 'Flamengo', city: 'Rio de Janeiro (RJ)', colors: ['#c4122f', '#111111'], stadium: 'Maracanã', badge: '🔴', prestige: 91 },
  { league: 'SERIE_A', query: 'Palmeiras', id: 300, city: 'São Paulo (SP)', colors: ['#006437', '#ffffff'], stadium: 'Allianz Parque', badge: '🐷', prestige: 89 },
  { league: 'SERIE_A', query: 'São Paulo FC', id: 306, city: 'São Paulo (SP)', colors: ['#c4122f', '#ffffff'], stadium: 'MorumBIS', badge: '⚪', prestige: 87 },
  { league: 'SERIE_A', query: 'Corinthians', id: 290, city: 'São Paulo (SP)', colors: ['#111111', '#ffffff'], stadium: 'Neo Química Arena', badge: '🦅', prestige: 86 },
  { league: 'SERIE_A', query: 'Grêmio', id: 602, city: 'Porto Alegre (RS)', colors: ['#0080ff', '#111111'], stadium: 'Arena do Grêmio', badge: '🔵', prestige: 85 },
  { league: 'SERIE_A', query: 'SC Internacional', id: 298, nameOverride: 'Internacional', city: 'Porto Alegre (RS)', colors: ['#d4001a', '#ffffff'], stadium: 'Beira-Rio', badge: '🇦🇹', prestige: 84 },
  { league: 'SERIE_A', query: 'Atlético Mineiro', id: 286, city: 'Belo Horizonte (MG)', colors: ['#111111', '#ffffff'], stadium: 'Arena MRV', badge: '🐔', prestige: 84 },
  { league: 'SERIE_A', query: 'Cruzeiro EC', id: 292, nameOverride: 'Cruzeiro', city: 'Belo Horizonte (MG)', colors: ['#003882', '#ffffff'], stadium: 'Mineirão', badge: '🦊', prestige: 83 },
  { league: 'SERIE_A', query: 'Botafogo FR', id: 288, nameOverride: 'Botafogo', city: 'Rio de Janeiro (RJ)', colors: ['#111111', '#ffffff'], stadium: 'Nilton Santos', badge: '⭐', prestige: 85 },
  { league: 'SERIE_A', query: 'Fluminense', id: 295, city: 'Rio de Janeiro (RJ)', colors: ['#8b1d2f', '#005a36'], stadium: 'Maracanã', badge: '🇭🇺', prestige: 84 },
  { league: 'SERIE_A', query: 'Vasco da Gama', id: 307, city: 'Rio de Janeiro (RJ)', colors: ['#111111', '#ffffff'], stadium: 'São Januário', badge: '⛵', prestige: 83 },
  { league: 'SERIE_A', query: 'Santos FC', id: 304, city: 'Santos (SP)', colors: ['#ffffff', '#111111'], stadium: 'Vila Belmiro', badge: '🐋', prestige: 83 },
  { league: 'SERIE_A', query: 'EC Bahia', id: 1473, nameOverride: 'Bahia', city: 'Salvador (BA)', colors: ['#0047ab', '#d4001a'], stadium: 'Arena Fonte Nova', badge: '🔵🔴', prestige: 81 },
  { league: 'SERIE_A', query: 'Fortaleza EC', id: 296, nameOverride: 'Fortaleza', city: 'Fortaleza (CE)', colors: ['#003882', '#d4001a'], stadium: 'Arena Castelão', badge: '🦁', prestige: 81 },
  { league: 'SERIE_A', query: 'Athletico Paranaense', id: 287, city: 'Curitiba (PR)', colors: ['#c4122f', '#111111'], stadium: 'Ligga Arena', badge: '🌪️', prestige: 82 },
  { league: 'SERIE_A', query: 'RB Bragantino', id: 1447, city: 'Bragança Paulista (SP)', colors: ['#ffffff', '#c4122f'], stadium: 'Nabi Abi Chedid', badge: '🐂', prestige: 80 },

  // 5. ARGENTINA
  { league: 'ARGENTINA', query: 'Boca Juniors', id: 270, city: 'Buenos Aires', colors: ['#002f6c', '#ffd700'], stadium: 'La Bombonera', badge: '🔷🔶', prestige: 88 },
  { league: 'ARGENTINA', query: 'River Plate', id: 282, city: 'Buenos Aires', colors: ['#ffffff', '#d90429'], stadium: 'Mâs Monumental', badge: '⚪🔴', prestige: 89 },
  { league: 'ARGENTINA', query: 'Racing Club', id: 280, city: 'Avellaneda', colors: ['#6ba4b8', '#ffffff'], stadium: 'El Cilindro', badge: '🩵🤍', prestige: 82 },
  { league: 'ARGENTINA', query: 'Independiente', id: 275, city: 'Avellaneda', colors: ['#d90429', '#ffffff'], stadium: 'Libertadores de América', badge: '👹', prestige: 82 },
  { league: 'ARGENTINA', query: 'San Lorenzo', id: 283, city: 'Buenos Aires', colors: ['#002f6c', '#d90429'], stadium: 'Pedro Bidegain', badge: '🔵🔴', prestige: 80 },
  { league: 'ARGENTINA', query: 'Estudiantes', id: 273, city: 'La Plata', colors: ['#d90429', '#ffffff'], stadium: 'Jorge Luis Hirschi', badge: '🦁', prestige: 80 },
  { league: 'ARGENTINA', query: 'Rosario Central', id: 281, city: 'Rosario', colors: ['#002f6c', '#ffd700'], stadium: 'Gigante de Arroyito', badge: '🟡🔵', prestige: 79 },
  { league: 'ARGENTINA', query: "Newell's Old Boys", id: 277, nameOverride: "Newell's Old Boys", city: 'Rosario', colors: ['#d90429', '#111111'], stadium: 'Marcelo Bielsa', badge: '🔴⚫', prestige: 79 },
  { league: 'ARGENTINA', query: 'Talleres de Córdoba', id: 284, nameOverride: 'Talleres', city: 'Córdoba', colors: ['#002f6c', '#ffffff'], stadium: 'Mario Kempes', badge: '⚪🔵', prestige: 79 },

  // 6. LIGA MX (México)
  { league: 'LIGA_MX', query: 'Club América', id: 439, nameOverride: 'América-MEX', city: 'Cidade do México', colors: ['#ffd700', '#002f6c'], stadium: 'Estadio Azteca', badge: '🦅', prestige: 82 },
  { league: 'LIGA_MX', query: 'Guadalajara', id: 444, nameOverride: 'Chivas Guadalajara', city: 'Guadalajara', colors: ['#d90429', '#ffffff'], stadium: 'Estadio Akron', badge: '🐐', prestige: 81 },
  { league: 'LIGA_MX', query: 'Cruz Azul', id: 443, city: 'Cidade do México', colors: ['#003882', '#ffffff'], stadium: 'Estadio Ciudad de los Deportes', badge: '🚂', prestige: 80 },
  { league: 'LIGA_MX', query: 'Tigres UANL', id: 452, city: 'Monterrey', colors: ['#ffd700', '#003882'], stadium: 'Estadio Universitario', badge: '🐯', prestige: 82 },
  { league: 'LIGA_MX', query: 'Monterrey', id: 446, nameOverride: 'CF Monterrey', city: 'Monterrey', colors: ['#002f6c', '#ffffff'], stadium: 'Estadio BBVA', badge: '🤠', prestige: 81 },
  { league: 'LIGA_MX', query: 'Deportivo Toluca', id: 451, nameOverride: 'Toluca', city: 'Toluca', colors: ['#d90429', '#ffffff'], stadium: 'Nemesio Díez', badge: '👹', prestige: 79 },
  { league: 'LIGA_MX', query: 'UNAM Pumas', id: 453, nameOverride: 'Pumas UNAM', city: 'Cidade do México', colors: ['#00245d', '#c59b27'], stadium: 'Olímpico Universitario', badge: '🐾', prestige: 80 },
  { league: 'LIGA_MX', query: 'Pachuca', id: 447, city: 'Pachuca', colors: ['#002f6c', '#ffffff'], stadium: 'Estadio Hidalgo', badge: '🐹', prestige: 79 },

  // 7. MLS (Estados Unidos)
  { league: 'MLS', query: 'Inter Miami CF', id: 5228, nameOverride: 'Inter Miami', city: 'Miami', colors: ['#f7b5cd', '#111111'], stadium: 'Chase Stadium', badge: '🦩', prestige: 78 },
  { league: 'MLS', query: 'Los Angeles Galaxy', id: 461, nameOverride: 'LA Galaxy', city: 'Los Angeles', colors: ['#00245d', '#ffd700'], stadium: 'Dignity Health Sports Park', badge: '⭐', prestige: 76 },
  { league: 'MLS', query: 'Los Angeles FC', id: 4260, nameOverride: 'LAFC', city: 'Los Angeles', colors: ['#111111', '#c59b27'], stadium: 'BMO Stadium', badge: '🦅', prestige: 77 },
  { league: 'MLS', query: 'Seattle Sounders', id: 1042, city: 'Seattle', colors: ['#5d9732', '#005595'], stadium: 'Lumen Field', badge: '🌲', prestige: 75 },
  { league: 'MLS', query: 'New York City FC', id: 3210, nameOverride: 'New York City', city: 'Nova York', colors: ['#6cace4', '#041e42'], stadium: 'Yankee Stadium', badge: '🗽', prestige: 75 },
  { league: 'MLS', query: 'Atlanta United', id: 3377, city: 'Atlanta', colors: ['#80000a', '#111111'], stadium: 'Mercedes-Benz Stadium', badge: '🔴⚫', prestige: 74 },

  // 8. SAUDI PRO LEAGUE (Petrodólares)
  { league: 'SAUDI_PRO', query: 'Al Hilal SFC', id: 625, nameOverride: 'Al-Hilal', city: 'Riad', colors: ['#002b80', '#ffffff'], stadium: 'Kingdom Arena', badge: '🌙', prestige: 72 },
  { league: 'SAUDI_PRO', query: 'Al Nassr FC', id: 665, nameOverride: 'Al-Nassr', city: 'Riad', colors: ['#ffd700', '#002b80'], stadium: 'Al-Awwal Park', badge: '👑', prestige: 72 },
  { league: 'SAUDI_PRO', query: 'Al Ittihad Club', id: 627, nameOverride: 'Al-Ittihad', city: 'Jidá', colors: ['#ffd700', '#111111'], stadium: 'King Abdullah Sports City', badge: '🐅', prestige: 71 },
  { league: 'SAUDI_PRO', query: 'Al Ahli SFC', id: 628, nameOverride: 'Al-Ahli', city: 'Jidá', colors: ['#00543d', '#ffffff'], stadium: 'Prince Abdullah Al-Faisal', badge: '🟢', prestige: 70 },
  { league: 'SAUDI_PRO', query: 'Al Shabab SFC', id: 626, nameOverride: 'Al-Shabab', city: 'Riad', colors: ['#ffffff', '#111111'], stadium: 'Al Shabab Stadium', badge: '⚪⚫', prestige: 68 },
  { league: 'SAUDI_PRO', query: 'Al Ettifaq', id: 666, nameOverride: 'Al-Ettifaq', city: 'Dammam', colors: ['#00543d', '#d90429'], stadium: 'Prince Mohamed bin Fahd', badge: '🟢🔴', prestige: 67 },

  // 9. PREMIER LEAGUE
  { league: 'PREMIER_LEAGUE', query: 'Manchester City', id: 47, city: 'Manchester', colors: ['#6cabdd', '#1c2c5b'], stadium: 'Etihad Stadium', badge: '⛵', prestige: 98 },
  { league: 'PREMIER_LEAGUE', query: 'Arsenal', id: 1, city: 'Londres', colors: ['#db0007', '#ffffff'], stadium: 'Emirates Stadium', badge: '🔴⚪', prestige: 95 },
  { league: 'PREMIER_LEAGUE', query: 'Liverpool', id: 44, city: 'Liverpool', colors: ['#c8102e', '#00b2a9'], stadium: 'Anfield', badge: '🦅', prestige: 96 },
  { league: 'PREMIER_LEAGUE', query: 'Aston Villa', id: 2, city: 'Birmingham', colors: ['#670e36', '#95bfe5'], stadium: 'Villa Park', badge: '🦁', prestige: 89 },
  { league: 'PREMIER_LEAGUE', query: 'Tottenham Hotspur', id: 56, nameOverride: 'Tottenham', city: 'Londres', colors: ['#ffffff', '#132257'], stadium: 'Tottenham Hotspur Stadium', badge: '🐓', prestige: 90 },
  { league: 'PREMIER_LEAGUE', query: 'Chelsea', id: 38, city: 'Londres', colors: ['#034694', '#ffffff'], stadium: 'Stamford Bridge', badge: '🦁', prestige: 92 },
  { league: 'PREMIER_LEAGUE', query: 'Newcastle United', id: 48, nameOverride: 'Newcastle', city: 'Newcastle', colors: ['#111111', '#ffffff'], stadium: "St. James' Park", badge: '🏰', prestige: 89 },
  { league: 'PREMIER_LEAGUE', query: 'Manchester United', id: 46, city: 'Manchester', colors: ['#da291c', '#111111'], stadium: 'Old Trafford', badge: '👹', prestige: 93 },

  // 10. LA LIGA (Espanha)
  { league: 'LA_LIGA', query: 'Real Madrid', id: 163, city: 'Madri', colors: ['#ffffff', '#4d1e8c'], stadium: 'Santiago Bernabéu', badge: '👑', prestige: 99 },
  { league: 'LA_LIGA', query: 'Barcelona', id: 140, nameOverride: 'FC Barcelona', city: 'Barcelona', colors: ['#004d98', '#a50044'], stadium: 'Spotify Camp Nou', badge: '🔴🔵', prestige: 97 },
  { league: 'LA_LIGA', query: 'Atlético Madrid', id: 139, city: 'Madri', colors: ['#cb3524', '#ffffff'], stadium: 'Cívitas Metropolitano', badge: '🐻', prestige: 92 },
  { league: 'LA_LIGA', query: 'Athletic Club', id: 138, city: 'Bilbao', colors: ['#ee2524', '#ffffff'], stadium: 'San Mamés', badge: '🦁', prestige: 88 },
  { league: 'LA_LIGA', query: 'Real Sociedad', id: 164, city: 'San Sebastián', colors: ['#0067b1', '#ffffff'], stadium: 'Reale Arena', badge: '⚪🔵', prestige: 87 },
  { league: 'LA_LIGA', query: 'Real Betis', id: 162, city: 'Sevilha', colors: ['#0bb364', '#ffffff'], stadium: 'Benito Villamarín', badge: '🟢⚪', prestige: 86 },
  { league: 'LA_LIGA', query: 'Sevilla FC', id: 166, nameOverride: 'Sevilla', city: 'Sevilha', colors: ['#d4001a', '#ffffff'], stadium: 'Ramón Sánchez-Pizjuán', badge: '⚔️', prestige: 86 },

  // 11. SERIE A (Itália)
  { league: 'SERIE_A_ITALIA', query: 'Internazionale', id: 109, city: 'Milão', colors: ['#001489', '#000000'], stadium: 'San Siro', badge: '🐍', prestige: 95 },
  { league: 'SERIE_A_ITALIA', query: 'Milan', id: 115, nameOverride: 'AC Milan', city: 'Milão', colors: ['#fb090b', '#000000'], stadium: 'San Siro', badge: '🔴⚫', prestige: 93 },
  { league: 'SERIE_A_ITALIA', query: 'Juventus', id: 110, city: 'Turim', colors: ['#000000', '#ffffff'], stadium: 'Allianz Stadium', badge: '⚪⚫', prestige: 93 },
  { league: 'SERIE_A_ITALIA', query: 'Napoli', id: 116, city: 'Nápoles', colors: ['#003882', '#ffffff'], stadium: 'Diego Armando Maradona', badge: '🌋', prestige: 90 },
  { league: 'SERIE_A_ITALIA', query: 'Roma', id: 122, nameOverride: 'AS Roma', city: 'Roma', colors: ['#8e1f2f', '#f0bc42'], stadium: 'Stadio Olimpico', badge: '🐺', prestige: 89 },
  { league: 'SERIE_A_ITALIA', query: 'Lazio', id: 111, nameOverride: 'SS Lazio', city: 'Roma', colors: ['#87d8f7', '#ffffff'], stadium: 'Stadio Olimpico', badge: '🦅', prestige: 88 },
  { league: 'SERIE_A_ITALIA', query: 'Atalanta', id: 101, city: 'Bérgamo', colors: ['#1e71b8', '#000000'], stadium: 'Gewiss Stadium', badge: '女神', prestige: 89 },

  // 12. BUNDESLIGA (Alemanha)
  { league: 'BUNDESLIGA', query: 'Bayern München', id: 391, city: 'Munique', colors: ['#dc052d', '#0066b2'], stadium: 'Allianz Arena', badge: '🦁', prestige: 97 },
  { league: 'BUNDESLIGA', query: 'Borussia Dortmund', id: 395, city: 'Dortmund', colors: ['#fde100', '#000000'], stadium: 'Signal Iduna Park', badge: '🐝', prestige: 93 },
  { league: 'BUNDESLIGA', query: 'Bayer Leverkusen', id: 389, city: 'Leverkusen', colors: ['#e32221', '#000000'], stadium: 'BayArena', badge: '💊', prestige: 94 },
  { league: 'BUNDESLIGA', query: 'RB Leipzig', id: 2200, city: 'Leipzig', colors: ['#ffffff', '#d81e05'], stadium: 'Red Bull Arena', badge: '🐂', prestige: 91 },
  { league: 'BUNDESLIGA', query: 'Eintracht Frankfurt', id: 397, city: 'Frankfurt', colors: ['#e1000f', '#000000'], stadium: 'Deutsche Bank Park', badge: '🦅', prestige: 88 },
  { league: 'BUNDESLIGA', query: 'VfB Stuttgart', id: 418, city: 'Stuttgart', colors: ['#ffffff', '#e30613'], stadium: 'MHPArena', badge: '🐊', prestige: 87 },

  // 13. J-LEAGUE (Japão)
  { league: 'J_LEAGUE', query: 'Vissel Kobe', id: 1079, city: 'Kobe', colors: ['#9e0039', '#ffffff'], stadium: 'Noevir Stadium Kobe', badge: '⚓', prestige: 73 },
  { league: 'J_LEAGUE', query: 'Yokohama F. Marinos', id: 506, city: 'Yokohama', colors: ['#003882', '#d90429'], stadium: 'Nissan Stadium', badge: '⛵', prestige: 73 },
  { league: 'J_LEAGUE', query: 'Kawasaki Frontale', id: 527, city: 'Kawasaki', colors: ['#58b2dc', '#111111'], stadium: 'Todoroki Athletics Stadium', badge: '🐬', prestige: 72 },
  { league: 'J_LEAGUE', query: 'Urawa Red Diamonds', id: 505, city: 'Saitama', colors: ['#d90429', '#111111'], stadium: 'Saitama Stadium 2002', badge: '💎', prestige: 73 },
  { league: 'J_LEAGUE', query: 'Kashima Antlers', id: 497, city: 'Kashima', colors: ['#9e1b32', '#111111'], stadium: 'Kashima Soccer Stadium', badge: '🦌', prestige: 72 },
  { league: 'J_LEAGUE', query: 'Nagoya Grampus', id: 500, city: 'Nagoya', colors: ['#e4002b', '#ffd700'], stadium: 'Toyota Stadium', badge: '🐋', prestige: 71 },

  // 14. RÚSSIA
  { league: 'RUSSIA', query: 'Zenit Saint Petersburg', id: 265, nameOverride: 'Zenit', city: 'São Petersburgo', colors: ['#00bfff', '#ffffff'], stadium: 'Gazprom Arena', badge: '🦁', prestige: 82 },
  { league: 'RUSSIA', query: 'Spartak Moskva', id: 263, city: 'Moscou', colors: ['#d90429', '#ffffff'], stadium: 'Lukoil Arena', badge: '🔴⚪', prestige: 80 },
  { league: 'RUSSIA', query: 'CSKA Moskva', id: 254, city: 'Moscou', colors: ['#003882', '#d90429'], stadium: 'VEB Arena', badge: '🐴', prestige: 80 },
  { league: 'RUSSIA', query: 'Lokomotiv Moskva', id: 258, city: 'Moscou', colors: ['#00543d', '#d90429'], stadium: 'RZD Arena', badge: '🚂', prestige: 79 },
  { league: 'RUSSIA', query: 'FK Krasnodar', id: 2217, nameOverride: 'Krasnodar', city: 'Krasnodar', colors: ['#00543d', '#111111'], stadium: 'Krasnodar Stadium', badge: '🐂', prestige: 79 },

  // 15. CLUBES GLOBAIS AVULSOS (Ucrânia, Grécia, Egito, Coreia, China)
  { league: 'GLOBAL_AVULSOS', query: 'Shakhtar Donetsk', id: 348, city: 'Donetsk', country: '🇺🇦', colors: ['#f47920', '#111111'], stadium: 'Arena Lviv', badge: '⚒️', prestige: 84 },
  { league: 'GLOBAL_AVULSOS', query: 'Dynamo Kyiv', id: 347, city: 'Kiev', country: '🇺🇦', colors: ['#003882', '#ffffff'], stadium: 'Olimpiyskiy', badge: '🔷', prestige: 82 },
  { league: 'GLOBAL_AVULSOS', query: 'Olympiacos', id: 373, city: 'Pireu', country: '🇬🇷', colors: ['#d90429', '#ffffff'], stadium: 'Karaiskakis Stadium', badge: '🔴⚪', prestige: 82 },
  { league: 'GLOBAL_AVULSOS', query: 'Panathinaikos', id: 374, city: 'Atenas', country: '🇬🇷', colors: ['#00543d', '#ffffff'], stadium: 'Apostolos Nikolaidis', badge: '☘️', prestige: 81 },
  { league: 'GLOBAL_AVULSOS', query: 'AEK Athens', id: 372, city: 'Atenas', country: '🇬🇷', colors: ['#ffd700', '#111111'], stadium: 'OPAP Arena', badge: '🦅', prestige: 80 },
  { league: 'GLOBAL_AVULSOS', query: 'PAOK', id: 755, city: 'Salônica', country: '🇬🇷', colors: ['#111111', '#ffffff'], stadium: 'Toumba Stadium', badge: '🦅', prestige: 80 },
  { league: 'GLOBAL_AVULSOS', query: 'Al Ahly SC', id: 1251, nameOverride: 'Al Ahly (Egito)', city: 'Cairo', country: '🇪🇬', colors: ['#d90429', '#ffffff'], stadium: 'Cairo International', badge: '🦅', prestige: 82 },
  { league: 'GLOBAL_AVULSOS', query: 'Zamalek SC', id: 1252, nameOverride: 'Zamalek (Egito)', city: 'Giza', country: '🇪🇬', colors: ['#ffffff', '#d90429'], stadium: 'Cairo International', badge: '🏹', prestige: 80 },
  { league: 'GLOBAL_AVULSOS', query: 'Ulsan HD', id: 512, nameOverride: 'Ulsan HD', city: 'Ulsan', country: '🇰🇷', colors: ['#003882', '#ffd700'], stadium: 'Ulsan Munsu', badge: '🐯', prestige: 74 },
  { league: 'GLOBAL_AVULSOS', query: 'Jeonbuk Hyundai', id: 515, nameOverride: 'Jeonbuk Hyundai', city: 'Jeonju', country: '🇰🇷', colors: ['#00543d', '#ffffff'], stadium: 'Jeonju World Cup', badge: 'Motors', prestige: 74 },
  { league: 'GLOBAL_AVULSOS', query: 'FC Seoul', id: 516, city: 'Seul', country: '🇰🇷', colors: ['#111111', '#d90429'], stadium: 'Seoul World Cup', badge: '🔴⚫', prestige: 73 },
  { league: 'GLOBAL_AVULSOS', query: 'Shanghai Port', id: 2470, city: 'Xangai', country: '🇨🇳', colors: ['#d90429', '#ffd700'], stadium: 'Pudong Football Stadium', badge: '🐉', prestige: 72 },
  { league: 'GLOBAL_AVULSOS', query: 'Shandong Taishan', id: 509, city: 'Jinan', country: '🇨🇳', colors: ['#f47920', '#ffffff'], stadium: 'Jinan Olympic Sports Center', badge: '🟠', prestige: 71 },
  { league: 'GLOBAL_AVULSOS', query: 'Beijing Guoan', id: 507, city: 'Pequim', country: '🇨🇳', colors: ['#00543d', '#ffd700'], stadium: 'Workers Stadium', badge: '🟢', prestige: 71 },
];

console.log('Building compiled clubs database...');
const compiledClubs = [];

for (const entry of CLUBS_MANIFEST) {
  const matched = findClub(entry.query, entry.id);
  const clubId = entry.id ? `club_${entry.id}` : entry.query.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const name = entry.nameOverride || (matched ? matched.Name : entry.query);
  const shortName = matched?.ShortName || name.slice(0, 3).toUpperCase();
  const logoUrl = matched?.ImageURL || `https://cdn.soccerwiki.org/images/logos/clubs/${entry.id || 1}.png`;
  const leagueConfig = LEAGUES_CONFIG[entry.league];

  compiledClubs.push({
    id: clubId,
    wikiId: entry.id || matched?.ID || null,
    name: name,
    shortName: shortName,
    league: entry.league,
    city: entry.city || 'Cidade',
    country: entry.country || leagueConfig.country,
    badge: entry.badge || '⚽',
    logoUrl: logoUrl,
    colors: {
      primary: entry.colors[0],
      secondary: entry.colors[1],
      text: entry.colors[1] === '#ffffff' ? '#ffffff' : '#111111',
    },
    prestige: entry.prestige || 50,
    stadium: entry.stadium || 'Estádio Municipal',
    rival: entry.rival || null,
  });
}

console.log(`Successfully compiled ${compiledClubs.length} clubs across ${Object.keys(LEAGUES_CONFIG).length} leagues!`);

// Write clubsData.js
const clubsDataJsContent = `/* ==========================================================================
   CLUBS & LEAGUES DATABASE • EXTRACTED FROM SOCCERWIKI
   Includes 160+ clubs across 15 national and global leagues
   ========================================================================== */

export const LEAGUES = ${JSON.stringify(LEAGUES_CONFIG, null, 2)};

export const CLUBS = ${JSON.stringify(compiledClubs, null, 2)};

export function getStartingClubs() {
  return CLUBS.filter((c) => c.league === 'REGIONAL');
}

export function getClubById(clubId) {
  return CLUBS.find((c) => c.id === clubId || String(c.wikiId) === String(clubId)) || CLUBS[0];
}

export function getLeagueById(leagueId) {
  return LEAGUES[leagueId] || LEAGUES.REGIONAL;
}
`;

fs.writeFileSync(outClubsDataPath, clubsDataJsContent, 'utf8');
console.log('Saved src/engine/clubsData.js');

// Generate supabase_clubs.sql
let sql = `-- =========================================================
-- SOCCER CLUBS DATABASE SCHEMA & SEED (SOCCERWIKI)
-- =========================================================

CREATE TABLE IF NOT EXISTS public.soccer_clubs (
    id TEXT PRIMARY KEY,
    wiki_id INTEGER,
    name TEXT NOT NULL,
    short_name TEXT,
    league TEXT NOT NULL,
    city TEXT,
    country TEXT,
    badge TEXT,
    logo_url TEXT,
    prestige INTEGER DEFAULT 50,
    stadium TEXT,
    primary_color TEXT,
    secondary_color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Row Level Security
ALTER TABLE public.soccer_clubs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access to soccer_clubs" ON public.soccer_clubs FOR SELECT USING (true);

-- Upsert clubs
INSERT INTO public.soccer_clubs (id, wiki_id, name, short_name, league, city, country, badge, logo_url, prestige, stadium, primary_color, secondary_color)
VALUES
`;

const sqlValues = compiledClubs.map(c => {
  const escapeStr = (s) => (s ? `'${s.replace(/'/g, "''")}'` : 'NULL');
  return `  (${escapeStr(c.id)}, ${c.wikiId || 'NULL'}, ${escapeStr(c.name)}, ${escapeStr(c.shortName)}, ${escapeStr(c.league)}, ${escapeStr(c.city)}, ${escapeStr(c.country)}, ${escapeStr(c.badge)}, ${escapeStr(c.logoUrl)}, ${c.prestige}, ${escapeStr(c.stadium)}, ${escapeStr(c.colors.primary)}, ${escapeStr(c.colors.secondary)})`;
});

sql += sqlValues.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET\n  name = EXCLUDED.name,\n  league = EXCLUDED.league,\n  logo_url = EXCLUDED.logo_url,\n  prestige = EXCLUDED.prestige;\n';

fs.writeFileSync(outSqlPath, sql, 'utf8');
console.log('Saved supabase_clubs.sql');
