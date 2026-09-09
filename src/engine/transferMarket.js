/* ==========================================================================
   TRANSFER MARKET ENGINE
   Generates authentic contract offers with the core Money vs Glory dilemma
   ========================================================================== */

import { CLUBS, LEAGUES } from './clubsData';

/**
 * Generate 2 to 3 contrasting transfer offers based on performance and prestige
 */
export function generateTransferOffers(currentClub, playerStats, seasonGoals, currentSalary = 5000) {
  const offers = [];

  // 1. Proposta MILIONÁRIA (Arábia / China) - "O Contrato da Independência Financeira"
  const moneyClubs = CLUBS.filter((c) => c.league === 'MONEY_LEAGUE');
  const moneyClub = moneyClubs[Math.floor(Math.random() * moneyClubs.length)];

  const moneySalary = Math.round((Math.max(600000, currentSalary * 8 + seasonGoals * 50000)) / 10000) * 10000;
  const moneyBonus = Math.round((moneySalary * 12 + 5000000) / 100000) * 100000;

  offers.push({
    id: 'offer_money',
    type: 'money',
    club: moneyClub,
    tag: '💰 CONTRATO MILIONÁRIO',
    headline: 'O Petrodólar chamou! Fortuna garantida para gerações.',
    salary: moneySalary,
    signingBonus: moneyBonus,
    contractYears: 3,
    statusRole: 'Estrela Estrangeira',
    pros: ['Salário astronômico', 'Luvas imediatas de cair o queixo', 'Sem cobrança de pressão tóxica'],
    cons: ['Longe do radar da Seleção Brasileira', 'Baixo prestígio esportivo internacional'],
  });

  // 2. Proposta de GLÓRIA ESPORTIVA (Série A ou Europa Vitrine)
  let gloryClubs;
  if (currentClub.league === 'REGIONAL' || currentClub.league === 'SERIE_B') {
    gloryClubs = CLUBS.filter((c) => c.league === 'SERIE_A');
  } else {
    gloryClubs = CLUBS.filter((c) => c.league === 'EUROPA_MEDIA' || c.league === 'GIGANTES_EUROPA');
  }
  const gloryClub = gloryClubs[Math.floor(Math.random() * gloryClubs.length)];

  const glorySalary = Math.round((Math.max(65000, currentSalary * 2.5 + seasonGoals * 15000)) / 5000) * 5000;
  const gloryBonus = Math.round((glorySalary * 2) / 10000) * 10000;

  offers.push({
    id: 'offer_glory',
    type: 'glory',
    club: gloryClub,
    tag: '🏆 PROJETO ESPORTIVO & SELEÇÃO',
    headline: 'A vitrine dos sonhos! Olheiros da Europa e Seleção em todos os jogos.',
    salary: glorySalary,
    signingBonus: gloryBonus,
    contractYears: 4,
    statusRole: seasonGoals >= 8 ? 'Titular Imediato' : 'Disputa por Vaga',
    pros: ['Vitrine máxima para a Seleção Brasileira', 'Disputa de títulos de peso (Libertadores/Champions)', 'Idolatria em massa'],
    cons: ['Salário muito inferior ao mundo árabe', 'Pressão gigantesca da torcida e mídia'],
  });

  // 3. Proposta de RENOVAÇÃO / FIDELIDADE com o Clube Atual
  const renewSalary = Math.round((currentSalary * 1.8 + seasonGoals * 10000) / 1000) * 1000;
  offers.push({
    id: 'offer_renewal',
    type: 'loyalty',
    club: currentClub,
    tag: '❤️ RENOVAÇÃO & IDOLATRIA',
    headline: `Ficar em casa! Você já conhece o vestiário e tem a faixa de capitão.`,
    salary: renewSalary,
    signingBonus: Math.round(renewSalary * 1.5),
    contractYears: 2,
    statusRole: 'Capitão e Líder',
    pros: ['Segurança e titularidade absoluta', 'Caminho para virar estátua no clube', 'Carinho incondicional da torcida'],
    cons: ['Evolução financeira mais lenta', 'Risco de estagnação de carreira'],
  });

  return offers;
}
