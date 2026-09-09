/* ==========================================================================
   RPG SYSTEM & PLAYER STATS
   Progression, energy, relationships and economy
   ========================================================================== */

export const POSITIONS = [
  {
    id: 'atacante',
    name: 'Centroavante Matador',
    badge: '⚽',
    description: 'Faro de gol implacável. Vive de empurrar a bola pra rede.',
    baseStats: { finishing: 65, dribbling: 50, passing: 45, physical: 60, speed: 55, composure: 60 },
  },
  {
    id: 'ponta',
    name: 'Ponta Veloz / Driblador',
    badge: '⚡',
    description: 'Velocidade absurda e finta desconcertante na linha de fundo.',
    baseStats: { finishing: 55, dribbling: 68, passing: 52, physical: 45, speed: 70, composure: 50 },
  },
  {
    id: 'meia',
    name: 'Meia Clássico / Camisa 10',
    badge: '🎯',
    description: 'Visão de jogo periférica, passes açucarados e liderança.',
    baseStats: { finishing: 55, dribbling: 60, passing: 70, physical: 50, speed: 52, composure: 65 },
  },
  {
    id: 'volante',
    name: 'Volante Box-to-Box',
    badge: '🛡️',
    description: 'Raça, força física nos desarmes e chegada surpresa no ataque.',
    baseStats: { finishing: 48, dribbling: 45, passing: 60, physical: 72, speed: 58, composure: 58 },
  },
];

export const LIFESTYLE_CATALOG = [
  // --- Investimentos na Carreira ---
  {
    id: 'chuteira_pro',
    category: 'career',
    name: 'Chuteira Profissional Sob Medida',
    cost: 3500,
    monthlyUpkeep: 0,
    icon: '👟',
    description: '+4 Finalização e +3 Drible em campo.',
    statBoost: { finishing: 4, dribbling: 3 },
  },
  {
    id: 'personal_trainer',
    category: 'career',
    name: 'Personal Trainer & Fisioterapeuta Exclusivo',
    cost: 12000,
    monthlyUpkeep: 4000,
    icon: '🏋️',
    description: '+6 Físico e recuperação de energia acelerada.',
    statBoost: { physical: 6 },
  },
  {
    id: 'assessoria_imprensa',
    category: 'career',
    name: 'Assessoria de Imprensa & Gestão de Imagem',
    cost: 25000,
    monthlyUpkeep: 8000,
    icon: '🎙️',
    description: '+15 Hype na Mídia e proteção contra escândalos.',
    effect: { mediaBoost: 15 },
  },

  // --- Família & Origens ---
  {
    id: 'ajudar_pais',
    category: 'family',
    name: 'Comprar Casa Própria para a Mãe',
    cost: 350000,
    monthlyUpkeep: 0,
    icon: '🏡',
    description: 'O maior sonho de todo moleque da várzea. +20 Frieza e Respeito.',
    statBoost: { composure: 10 },
  },
  {
    id: 'escolinha_bairro',
    category: 'family',
    name: 'Fundar Escolinha de Futebol no Bairro',
    cost: 150000,
    monthlyUpkeep: 2500,
    icon: '🧒',
    description: 'Devolver à comunidade onde você cresceu. +15 Amor da Torcida.',
    effect: { fanBoost: 15 },
  },

  // --- Luxo & Fama ---
  {
    id: 'carro_popular',
    category: 'luxury',
    name: 'Carro Sedan Confortável',
    cost: 80000,
    monthlyUpkeep: 1500,
    icon: '🚗',
    description: 'Chegar aos treinos com dignidade sem pegar condução.',
    effect: { energySave: 5 },
  },
  {
    id: 'carro_esportivo',
    category: 'luxury',
    name: 'Porsche 911 Turbo',
    cost: 950000,
    monthlyUpkeep: 15000,
    icon: '🏎️',
    description: 'Desfilar na porta do CT. +20 Hype, mas a torcida cobra mais!',
    effect: { mediaBoost: 20 },
  },
  {
    id: 'mansao_praia',
    category: 'luxury',
    name: 'Mansão de Praia com Campo Privativo',
    cost: 8000000,
    monthlyUpkeep: 45000,
    icon: '🏰',
    description: 'O ápice do sucesso. Churrasco com os parças e status supremo.',
    effect: { mediaBoost: 30, composure: 5 },
  },
];

export function formatCurrency(amount) {
  if (amount >= 1000000) {
    const millions = (amount / 1000000).toFixed(1).replace('.0', '');
    return `R$ ${millions} milhões`;
  }
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(amount);
}
