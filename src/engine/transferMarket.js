/* ==========================================================================
   TRANSFER MARKET ENGINE • 2 WINDOWS (JANUARY & JULY)
   Generates authentic contract offers with Money vs Glory vs Loyalty dilemmas
   ========================================================================== */

import { CLUBS, LEAGUES } from './clubsData';

/**
 * Generate contrasting transfer offers depending on the window (January vs July)
 * @param {Object} currentClub Current player's club
 * @param {Object} playerStats Player RPG stats
 * @param {number} seasonGoals Goals in current season
 * @param {number} currentSalary Monthly salary
 * @param {'january'|'july'} windowType Window moment
 */
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
    // ❄️ JANELA DE JANEIRO (Mercado Nacional & Sul-Americano)
    // =======================================================================

    // 1. Oferta de Grande Clube Brasileiro da Série A (ou Série B se jogador estiver na Várzea)
    let nationalTargetLeague = 'SERIE_A';
    if (currentClub.league === 'REGIONAL') {
      nationalTargetLeague = seasonGoals >= 5 ? 'SERIE_A' : 'SERIE_B';
    }
    const nationalClubs = CLUBS.filter(
      (c) => c.league === nationalTargetLeague && c.id !== currentClub.id
    );
    const nationalClub =
      nationalClubs[Math.floor(Math.random() * nationalClubs.length)] || CLUBS[0];

    const natSalary =
      nationalTargetLeague === 'SERIE_A'
        ? Math.round(Math.max(75000, currentSalary * 3 + seasonGoals * 10000) / 5000) * 5000
        : Math.round(Math.max(25000, currentSalary * 2 + seasonGoals * 5000) / 2000) * 2000;

    offers.push({
      id: 'offer_national_step',
      type: 'glory',
      window: 'january',
      club: nationalClub,
      tag: '🇧🇷 SALTO NACIONAL • SÉRIE A',
      headline: `O ${nationalClub.name} quer você para disputar os títulos nacionais!`,
      salary: natSalary,
      signingBonus: Math.round(natSalary * 2.5),
      contractYears: 3,
      statusRole: seasonGoals >= 6 ? 'Titular em Potencial' : 'Disputa de Elenco',
      pros: [
        'Transmissão ao vivo em TV aberta e streaming',
        'Disputa de Copa do Brasil e Brasileirão',
        'Passo fundamental para a consolidação profissional',
      ],
      cons: [
        'Pressão pesada da torcida e cobrança imediata',
        'Concorrência interna com atletas experientes',
      ],
    });

    // 2. Oferta da América do Sul / Conmebol Libertadores (Boca, River, Peñarol, etc.)
    const continentalClubs = CLUBS.filter((c) => c.league === 'LIBERTADORES');
    const continentalClub =
      continentalClubs[Math.floor(Math.random() * continentalClubs.length)];

    const contSalary = Math.round(Math.max(85000, currentSalary * 2.8 + seasonGoals * 8000) / 5000) * 5000;

    offers.push({
      id: 'offer_south_america',
      type: 'international',
      window: 'january',
      club: continentalClub,
      tag: '🌎 TRADIÇÃO SUL-AMERICANA',
      headline: `A mística da Libertadores! ${continentalClub.name} abriu as portas em ${continentalClub.city}.`,
      salary: contSalary,
      signingBonus: Math.round(contSalary * 3),
      contractYears: 3,
      statusRole: 'Contratação Internacional',
      pros: [
        'Clima de guerra esportiva e estádios lendários',
        'Vitrine para a Europa e seleção',
        'Experiência internacional em outra cultura do futebol',
      ],
      cons: [
        'Adaptação ao idioma e estilo truncado sul-americano',
        'Distância da família e raízes no Brasil',
      ],
    });

    // 3. Renovação com o Clube Atual
    const renewSalary = Math.round((currentSalary * 1.5 + seasonGoals * 3000) / 1000) * 1000;
    offers.push({
      id: 'offer_renewal',
      type: 'loyalty',
      window: 'january',
      club: currentClub,
      tag: '❤️ FICAR PARA O 2º TURNO',
      headline: `O técnico e a diretoria do ${currentClub.name} pedem sua permanência como líder.`,
      salary: renewSalary,
      signingBonus: Math.round(renewSalary * 1.2),
      contractYears: 2,
      statusRole: 'Líder do Vestiário',
      pros: [
        'Ambiente familiar e vaga assegurada no time',
        'Foco total para terminar o campeonato no topo',
      ],
      cons: [
        'Salário inferior aos gigantes que procuraram',
        'Risco de esfriar o interesse do mercado',
      ],
    });
  } else {
    // =======================================================================
    // ☀️ JANELA DE JULHO (Mercado Europeu & Petrodólares)
    // =======================================================================

    // 1. Proposta Astronômica: Petrodólares (Arábia / MLS / Ásia)
    const moneyClubs = CLUBS.filter((c) => c.league === 'MONEY_LEAGUE');
    const moneyClub = moneyClubs[Math.floor(Math.random() * moneyClubs.length)];

    const moneySalary =
      Math.round(Math.max(750000, currentSalary * 7 + seasonGoals * 60000) / 10000) * 10000;
    const moneyBonus =
      Math.round((moneySalary * 10 + 6000000) / 100000) * 100000;

    offers.push({
      id: 'offer_money',
      type: 'money',
      window: 'july',
      club: moneyClub,
      tag: '💰 CONTRATO MILIONÁRIO • PETRODÓLAR',
      headline: 'Fortuna para mudar a vida da família inteira por gerações!',
      salary: moneySalary,
      signingBonus: moneyBonus,
      contractYears: 3,
      statusRole: 'Estrela Global Franquia',
      pros: [
        'Salário multimilionário pago rigorosamente em dia',
        'Mansão, carros de luxo e luvas astronômicas na assinatura',
        'Pressão midiática muito menor que a Europa',
      ],
      cons: [
        'Praticamente fora do radar da Seleção Brasileira',
        'Menor prestígio esportivo na história do futebol',
      ],
    });

    // 2. Proposta de Elite: Europa (Premier League, La Liga, Serie A, Champions ou Portugal Vitrine)
    let euroClubs;
    if (seasonGoals >= 7 || currentSalary >= 80000) {
      euroClubs = CLUBS.filter((c) =>
        ['PREMIER_LEAGUE', 'LA_LIGA', 'SERIE_A_ITALIA', 'BUNDESLIGA', 'LIGUE_1'].includes(c.league)
      );
    } else {
      euroClubs = CLUBS.filter((c) => c.league === 'PORTUGAL');
    }
    const euroClub = euroClubs[Math.floor(Math.random() * euroClubs.length)] || CLUBS.find(c => c.id === 'benfica');

    const euroSalary =
      Math.round(Math.max(250000, currentSalary * 3.5 + seasonGoals * 25000) / 10000) * 10000;
    const euroBonus = Math.round((euroSalary * 3) / 10000) * 10000;

    offers.push({
      id: 'offer_europe',
      type: 'glory',
      window: 'july',
      club: euroClub,
      tag: '🇪🇺 O SONHO EUROPEU • CHAMPIONS LEAGUE',
      headline: `A elite mundial chama! ${euroClub.name} quer o futebol arte brasileiro.`,
      salary: euroSalary,
      signingBonus: euroBonus,
      contractYears: 4,
      statusRole: seasonGoals >= 8 ? 'Titular em Ascensão' : 'Reforço de Ouro',
      pros: [
        'Disputa dos maiores torneios do planeta (Champions / Premier League)',
        'Caminho mais curto para a Seleção Brasileira e Bola de Ouro',
        'Idolatria mundial e patrocínios globais',
      ],
      cons: [
        'Cobrança tática impiedosa e imprensa europeia rigorosa',
        'Salário bem menor que a proposta árabe',
      ],
    });

    // 3. Proposta de Renovação no Clube Atual com Valorização
    const renewSalary = Math.round((currentSalary * 2.0 + seasonGoals * 12000) / 1000) * 1000;
    offers.push({
      id: 'offer_renewal',
      type: 'loyalty',
      window: 'july',
      club: currentClub,
      tag: '❤️ RENOVAÇÃO & PROJETO DE ÍDOLO',
      headline: `O ${currentClub.name} quer construir um projeto vitorioso em volta de você.`,
      salary: renewSalary,
      signingBonus: Math.round(renewSalary * 2),
      contractYears: 3,
      statusRole: 'Capitão e Símbolo',
      pros: [
        'Idolatria garantida e faixa de capitão no peito',
        'Estabilidade emocional perto de casa',
      ],
      cons: [
        'Perde a oportunidade de ouro de ir para o exterior',
        'Teto financeiro nacional muito mais restrito',
      ],
    });
  }

  return offers;
}
