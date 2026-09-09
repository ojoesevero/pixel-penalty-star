/* ==========================================================================
   TRANSFER MARKET ENGINE • ALL 16 LEAGUES FROM SOCCERWIKI
   January Window (Americas & Domestic) vs July Window (Europe, Petrodollar, Asia)
   ========================================================================== */

import { CLUBS, LEAGUES } from './clubsData';

export function generateTransferOffers(
  currentClub,
  playerStats,
  seasonGoals,
  currentSalary = 5000,
  windowType = 'july'
) {
  const offers = [];

  if (windowType === 'january') {
    // =======================================================================
    // ❄️ JANELA DE JANEIRO (Séries A/B/C, Argentina, México)
    // =======================================================================

    // 1. Salto de Divisão ou Elite Nacional (Série A ou B)
    let domesticTargetLeague = 'SERIE_A';
    if (currentClub.league === 'REGIONAL') {
      domesticTargetLeague = seasonGoals >= 4 ? 'SERIE_B' : 'SERIE_C';
    } else if (currentClub.league === 'SERIE_C') {
      domesticTargetLeague = seasonGoals >= 5 ? 'SERIE_A' : 'SERIE_B';
    } else if (currentClub.league === 'SERIE_B') {
      domesticTargetLeague = 'SERIE_A';
    }

    const domesticClubs = CLUBS.filter(
      (c) => c.league === domesticTargetLeague && c.id !== currentClub.id
    );
    const domesticClub =
      domesticClubs[Math.floor(Math.random() * domesticClubs.length)] || CLUBS[0];

    const natSalary =
      domesticTargetLeague === 'SERIE_A'
        ? Math.round(Math.max(75000, currentSalary * 3 + seasonGoals * 10000) / 5000) * 5000
        : domesticTargetLeague === 'SERIE_B'
        ? Math.round(Math.max(28000, currentSalary * 2 + seasonGoals * 6000) / 2000) * 2000
        : Math.round(Math.max(12000, currentSalary * 1.6 + seasonGoals * 2000) / 1000) * 1000;

    offers.push({
      id: 'offer_domestic',
      type: 'glory',
      window: 'january',
      club: domesticClub,
      tag: `🇧🇷 ${LEAGUES[domesticTargetLeague]?.name || 'BRASIL'}`,
      headline: `O ${domesticClub.name} apresentou uma proposta oficial para a sequência da temporada!`,
      salary: natSalary,
      signingBonus: Math.round(natSalary * 2.5),
      contractYears: 3,
      statusRole: seasonGoals >= 6 ? 'Titular em Potencial' : 'Disputa de Elenco',
      pros: [
        'Visibilidade em grandes estádios e mídia esportiva',
        'Chance real de título e projeção de carreira',
      ],
      cons: [
        'Cobrança imediata de resultados pela torcida',
      ],
    });

    // 2. Conmebol & Américas (Argentina ou Liga MX)
    const americasLeagues = ['ARGENTINA', 'LIGA_MX'];
    const selectedAmericasLeague = americasLeagues[Math.floor(Math.random() * americasLeagues.length)];
    const continentalClubs = CLUBS.filter((c) => c.league === selectedAmericasLeague);
    const continentalClub =
      continentalClubs[Math.floor(Math.random() * continentalClubs.length)] || CLUBS.find(c => c.league === 'ARGENTINA');

    const contSalary = Math.round(Math.max(90000, currentSalary * 2.8 + seasonGoals * 10000) / 5000) * 5000;

    offers.push({
      id: 'offer_americas',
      type: 'international',
      window: 'january',
      club: continentalClub,
      tag: `${continentalClub.country} ${LEAGUES[selectedAmericasLeague]?.name}`,
      headline: `Proposta internacional do ${continentalClub.name} (${continentalClub.city})!`,
      salary: contSalary,
      signingBonus: Math.round(contSalary * 3),
      contractYears: 3,
      statusRole: 'Reforço Estrangeiro',
      pros: [
        'Salário dolarizado e experiência internacional',
        'Torcidas apaixonadas e jogos de altíssima intensidade',
      ],
      cons: [
        'Adaptação ao estilo de jogo estrangeiro e idioma',
      ],
    });

    // 3. Ficar no Clube Atual (Renovação / Fidelidade)
    const renewSalary = Math.round((currentSalary * 1.5 + seasonGoals * 3000) / 1000) * 1000;
    offers.push({
      id: 'offer_renewal',
      type: 'loyalty',
      window: 'january',
      club: currentClub,
      tag: '❤️ FICAR NO CLUBE ATUAL',
      headline: `A torcida do ${currentClub.name} quer que você continue liderando o time.`,
      salary: renewSalary,
      signingBonus: Math.round(renewSalary * 1.2),
      contractYears: 2,
      statusRole: 'Líder do Vestiário',
      pros: ['Vaga assegurada e carinho incondicional'],
      cons: ['Evolução financeira mais contida'],
    });
  } else {
    // =======================================================================
    // ☀️ JANELA DE JULHO (Premier League, La Liga, Serie A, Arábia, MLS, Japão, etc.)
    // =======================================================================

    // 1. Proposta Petrodólar ou Alternativa (Saudi Pro, MLS, J-League, Rússia, China)
    const altLeagues = ['SAUDI_PRO', 'MLS', 'J_LEAGUE', 'RUSSIA', 'GLOBAL_AVULSOS'];
    const chosenAltLeague = altLeagues[Math.floor(Math.random() * altLeagues.length)];
    const altClubs = CLUBS.filter((c) => c.league === chosenAltLeague);
    const altClub = altClubs[Math.floor(Math.random() * altClubs.length)] || CLUBS.find(c => c.league === 'SAUDI_PRO');

    const isPetro = chosenAltLeague === 'SAUDI_PRO';
    const moneySalary = Math.round(
      Math.max(isPetro ? 850000 : 250000, currentSalary * (isPetro ? 7 : 3.5) + seasonGoals * 50000) / 10000
    ) * 10000;
    const moneyBonus = Math.round((moneySalary * (isPetro ? 10 : 4) + 2000000) / 100000) * 100000;

    offers.push({
      id: 'offer_money_alt',
      type: 'money',
      window: 'july',
      club: altClub,
      tag: `${altClub.country} ${LEAGUES[chosenAltLeague]?.name}`,
      headline: `O ${altClub.name} quer pagar fortuna para ter o seu talento em ${altClub.city}!`,
      salary: moneySalary,
      signingBonus: moneyBonus,
      contractYears: 3,
      statusRole: 'Estrela Franquia',
      pros: [
        'Salário astronômico e luvas na assinatura de cair o queixo',
        'Qualidade de vida impecável e segurança',
      ],
      cons: [
        'Menor holofote da Seleção Brasileira',
      ],
    });

    // 2. Proposta Europa Top (Premier League, La Liga, Serie A Calcio, Bundesliga)
    const euroLeagues = ['PREMIER_LEAGUE', 'LA_LIGA', 'SERIE_A_ITALIA', 'BUNDESLIGA', 'GLOBAL_AVULSOS'];
    const chosenEuroLeague = euroLeagues[Math.floor(Math.random() * euroLeagues.length)];
    const euroClubs = CLUBS.filter((c) => c.league === chosenEuroLeague);
    const euroClub = euroClubs[Math.floor(Math.random() * euroClubs.length)] || CLUBS.find(c => c.league === 'PREMIER_LEAGUE');

    const euroSalary = Math.round(
      Math.max(350000, currentSalary * 4 + seasonGoals * 30000) / 10000
    ) * 10000;
    const euroBonus = Math.round((euroSalary * 3.5) / 10000) * 10000;

    offers.push({
      id: 'offer_europe_top',
      type: 'glory',
      window: 'july',
      club: euroClub,
      tag: `🇪🇺 ${LEAGUES[chosenEuroLeague]?.name} • ELITE`,
      headline: `O sonho dos grandes palcos! O ${euroClub.name} quer você na Champions League.`,
      salary: euroSalary,
      signingBonus: euroBonus,
      contractYears: 4,
      statusRole: seasonGoals >= 8 ? 'Titular em Ascensão' : 'Reforço de Impacto',
      pros: [
        'Disputa dos maiores troféus do futebol mundial',
        'Caminho mais rápido para a Seleção e Bola de Ouro',
      ],
      cons: [
        'Cobrança tática rigorosa e concorrência implacável',
      ],
    });

    // 3. Proposta de Renovação no Clube Atual com Valorização
    const renewSalary = Math.round((currentSalary * 2.0 + seasonGoals * 12000) / 1000) * 1000;
    offers.push({
      id: 'offer_renewal',
      type: 'loyalty',
      window: 'july',
      club: currentClub,
      tag: '❤️ RENOVAÇÃO & STATUS DE ÍDOLO',
      headline: `O ${currentClub.name} preparou um novo contrato para manter você como símbolo.`,
      salary: renewSalary,
      signingBonus: Math.round(renewSalary * 2),
      contractYears: 3,
      statusRole: 'Capitão e Símbolo',
      pros: ['Idolatria máxima e segurança em casa'],
      cons: ['Teto financeiro menor que o mercado exterior'],
    });
  }

  return offers;
}
