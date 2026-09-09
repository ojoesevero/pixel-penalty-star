/* ============================================
   GAME CONSTANTS
   Clubs, tiers, World Cup ages, scoring rules
   ============================================ */

// --- Club Tiers ---
export const TIERS = {
  1: { name: 'Estadual/Base', keeperAccuracy: 0.35 },
  2: { name: 'Elite Nacional', keeperAccuracy: 0.50 },
  3: { name: 'Europa Média', keeperAccuracy: 0.62 },
  4: { name: 'Gigantes Europeus', keeperAccuracy: 0.75 },
};

export const CLUBS = [
  // Tier 1 — Estadual/Base
  { id: 'sao-jose',   name: 'São José-RS',   tier: 1, colors: { primary: '#d95763', secondary: '#f4f4f4' }, country: '🇧🇷' },
  { id: 'mirassol',   name: 'Mirassol',      tier: 1, colors: { primary: '#f9a31b', secondary: '#1a1c2c' }, country: '🇧🇷' },
  { id: 'criciuma',   name: 'Criciúma',      tier: 1, colors: { primary: '#ffcd75', secondary: '#1a1c2c' }, country: '🇧🇷' },
  { id: 'juventude',  name: 'Juventude',     tier: 1, colors: { primary: '#38b764', secondary: '#f4f4f4' }, country: '🇧🇷' },

  // Tier 2 — Elite Nacional
  { id: 'gremio',     name: 'Grêmio',        tier: 2, colors: { primary: '#41a6f6', secondary: '#1a1c2c' }, country: '🇧🇷' },
  { id: 'flamengo',   name: 'Flamengo',      tier: 2, colors: { primary: '#d95763', secondary: '#1a1c2c' }, country: '🇧🇷' },
  { id: 'palmeiras',  name: 'Palmeiras',     tier: 2, colors: { primary: '#38b764', secondary: '#1a1c2c' }, country: '🇧🇷' },
  { id: 'sao-paulo',  name: 'São Paulo',     tier: 2, colors: { primary: '#f4f4f4', secondary: '#d95763' }, country: '🇧🇷' },
  { id: 'boca',       name: 'Boca Juniors',  tier: 2, colors: { primary: '#3b5dc9', secondary: '#ffcd75' }, country: '🇦🇷' },
  { id: 'river',      name: 'River Plate',   tier: 2, colors: { primary: '#f4f4f4', secondary: '#d95763' }, country: '🇦🇷' },

  // Tier 3 — Europa Média
  { id: 'porto',      name: 'Porto',         tier: 3, colors: { primary: '#3b5dc9', secondary: '#f4f4f4' }, country: '🇵🇹' },
  { id: 'benfica',    name: 'Benfica',       tier: 3, colors: { primary: '#d95763', secondary: '#f4f4f4' }, country: '🇵🇹' },
  { id: 'sevilla',    name: 'Sevilla',       tier: 3, colors: { primary: '#f4f4f4', secondary: '#d95763' }, country: '🇪🇸' },
  { id: 'roma',       name: 'Roma',          tier: 3, colors: { primary: '#f9a31b', secondary: '#5d275d' }, country: '🇮🇹' },
  { id: 'aston-villa',name: 'Aston Villa',   tier: 3, colors: { primary: '#5d275d', secondary: '#41a6f6' }, country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },

  // Tier 4 — Gigantes Europeus
  { id: 'barcelona',  name: 'Barcelona',     tier: 4, colors: { primary: '#3b5dc9', secondary: '#b13e53' }, country: '🇪🇸' },
  { id: 'real-madrid',name: 'Real Madrid',   tier: 4, colors: { primary: '#f4f4f4', secondary: '#ffcd75' }, country: '🇪🇸' },
  { id: 'man-city',   name: 'Manchester City',tier: 4, colors: { primary: '#41a6f6', secondary: '#f4f4f4' }, country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'bayern',     name: 'Bayern München',tier: 4, colors: { primary: '#d95763', secondary: '#f4f4f4' }, country: '🇩🇪' },
];

// --- Career Config ---
export const STARTING_AGE = 17;
export const MAX_AGE = 35;
export const AGE_PER_SEASON = 2;
export const TOTAL_SEASONS = 9;
export const GAMES_PER_SEASON = 3;
export const PENALTIES_PER_GAME = 3;
export const MAX_SEASON_GOALS = GAMES_PER_SEASON * PENALTIES_PER_GAME; // 9

// --- World Cup ---
export const WORLD_CUP_AGES = [21, 25, 29, 33];
export const WORLD_CUP_MIN_TIER = 2;
export const WORLD_CUP_MIN_AVG = 6.5;           // relaxed from 8.0
export const WORLD_CUP_TIER1_MIN_AVG = 7.5;     // tier 1 exception
export const WORLD_CUP_PENALTIES = 3;            // per match (semi + final)

// --- Scoring Thresholds ---
export const TITLE_MIN_GOALS = 8;                // >= 8 goals = league champion
export const TOP_SCORER_GOALS = 9;               // exactly 9 = top scorer
export const BALLON_DOR_GOALS = 9;               // 9 goals in tier 4 or WC winner

// --- Transfer Offers by Points ---
export const TRANSFER_RULES = {
  9:     { superior: 2, same: 0, renew: 1, description: 'Temporada perfeita!' },
  '6-8': { superior: 1, same: 1, renew: 1, description: 'Boa temporada.' },
  '3-5': { superior: 0, same: 2, renew: 1, description: 'Temporada razoável.' },
  2:     { superior: 0, same: 0, renew: 1, description: 'Apenas renovação.' },
  '0-1': { superior: 0, same: 0, renew: 0, description: 'Game Over — Demissão!' },
};

// --- Positions & Attribute Bonuses ---
export const POSITIONS = [
  { id: 'zagueiro',  name: 'Zagueiro',  bonus: 'defense' },
  { id: 'lateral',   name: 'Lateral',   bonus: 'speed' },
  { id: 'meia',      name: 'Meia',      bonus: 'passing' },
  { id: 'atacante',  name: 'Atacante',  bonus: 'attack' },
];

export const ATTRIBUTES = [
  { id: 'defense',    name: 'Defesa',      icon: '🛡️', description: 'Multiplica a força efetiva do chute' },
  { id: 'attack',     name: 'Ataque',      icon: '⚔️', description: 'Reduz chance de isolar em chutes fortes e altos' },
  { id: 'passing',    name: 'Passe',       icon: '🎯', description: 'Aumenta chance de furar goleiro em chutes rasteiros' },
  { id: 'speed',      name: 'Velocidade',  icon: '⚡', description: 'Acelera o voo da bola' },
  { id: 'resistance', name: 'Resistência', icon: '💪', description: 'Reduz impactos de eventos negativos' },
];

export const FREE_ATTRIBUTE_POINTS = 5;
export const BONUS_ATTRIBUTE_POINTS = 1;
export const MAX_ATTRIBUTE = 5;
export const MIN_ATTRIBUTE = 1;

// --- Skin/Hair/Eye Color Options ---
export const SKIN_COLORS = [
  { id: 'light',   hex: '#ffd5b8' },
  { id: 'medium',  hex: '#c68642' },
  { id: 'tan',     hex: '#8d5524' },
  { id: 'dark',    hex: '#5c3317' },
  { id: 'deep',    hex: '#3b1f0b' },
];

export const HAIR_COLORS = [
  { id: 'black',   hex: '#1a1c2c' },
  { id: 'brown',   hex: '#5c3317' },
  { id: 'blonde',  hex: '#ffcd75' },
  { id: 'red',     hex: '#d95763' },
  { id: 'white',   hex: '#f4f4f4' },
  { id: 'blue',    hex: '#41a6f6' },
];

export const EYE_COLORS = [
  { id: 'brown',   hex: '#5c3317' },
  { id: 'green',   hex: '#38b764' },
  { id: 'blue',    hex: '#3b5dc9' },
  { id: 'black',   hex: '#1a1c2c' },
];
