/* ==========================================================================
   CAPTAIN TSUBASA-STYLE MATCH SIMULATOR
   High-drama match timeline with freeze-frame anime duel decisions
   ========================================================================== */

export const DUEL_TYPES = {
  ONE_ON_ONE: 'one_on_one',
  FACE_TO_GOAL: 'face_to_goal',
  CLUTCH_SETPIECE: 'clutch_setpiece',
  HEADER_CROSS: 'header_cross',
};

/**
 * Generate a set of dramatic duel scenarios for a match
 */
export function generateMatchDuels(opponentClub, playerPosition = 'atacante') {
  const duels = [];

  // Lance 1: Primeiro Tempo (25-35 min)
  duels.push({
    id: 'duel_1',
    minute: Math.floor(Math.random() * 10) + 25,
    type: DUEL_TYPES.ONE_ON_ONE,
    title: '🔥 MANO A MANO NA ENTRADA DA ÁREA!',
    narrative: `Você recebe na intermediária, corta para o meio e o zagueiro titular do ${opponentClub.name} vem babando no desarme!`,
    options: [
      {
        id: 'dribble',
        title: '🌪️ Drible Elástico',
        statRequired: 'dribbling',
        difficulty: 60,
        risk: 'medium',
        energyCost: 10,
        description: 'Tentar desconsertar o defensor com finta rápida de corpo.',
      },
      {
        id: 'power_blast',
        title: '⚡ Canhão de Longe',
        statRequired: 'finishing',
        difficulty: 65,
        risk: 'high',
        energyCost: 15,
        description: 'Bater de primeira no susto para pegar o goleiro adiantado.',
      },
      {
        id: 'one_two',
        title: '🤝 Tabela de Primeira',
        statRequired: 'passing',
        difficulty: 55,
        risk: 'low',
        energyCost: 8,
        description: 'Tocar no ponta e disparar para receber de volta livre.',
      },
    ],
  });

  // Lance 2: Segundo Tempo (60-75 min)
  duels.push({
    id: 'duel_2',
    minute: Math.floor(Math.random() * 15) + 60,
    type: DUEL_TYPES.FACE_TO_GOAL,
    title: '⚡ CARA A CARA COM O GOLEIRO!',
    narrative: `Lançamento primoroso nas costas da zaga! Você domina adiantando na corrida e o goleiro do ${opponentClub.name} sai desesperado fechando o ângulo!`,
    options: [
      {
        id: 'placed_shot',
        title: '🎯 Chute Colocado no Canto',
        statRequired: 'composure',
        difficulty: 58,
        risk: 'low',
        energyCost: 12,
        description: 'Manter a calma e chapar com categoria na bochecha da rede.',
      },
      {
        id: 'chip_shot',
        title: '🪄 Cavadinha por Cima',
        statRequired: 'dribbling',
        difficulty: 75,
        risk: 'high',
        energyCost: 10,
        description: 'Gesto de pura audácia! Tentar encobrir o goleiro caído.',
      },
      {
        id: 'power_roof',
        title: '💣 Estufar a Gaveta',
        statRequired: 'finishing',
        difficulty: 62,
        risk: 'medium',
        energyCost: 18,
        description: 'Soltar a bomba com o peito do pé no teto da rede.',
      },
    ],
  });

  // Lance 3: Reta Final (85-92 min)
  duels.push({
    id: 'duel_3',
    minute: Math.floor(Math.random() * 5) + 86,
    type: DUEL_TYPES.CLUTCH_SETPIECE,
    title: '⏱️ PRESSÃO TOTAL NOS ACRÉSCIMOS!',
    narrative: `Último suspiro de jogo no estádio lotado! Falta perigosa a dois passos da grande área sob ensurdecedora vaia da torcida adversária!`,
    options: [
      {
        id: 'curve_shot',
        title: '✨ Cobrança por Fora da Barreira',
        statRequired: 'finishing',
        difficulty: 68,
        risk: 'medium',
        energyCost: 14,
        description: 'Bater com efeito contornando a barreira em direção ao poste.',
      },
      {
        id: 'low_under_wall',
        title: '🎯 Chute Rasteiro por Baixo da Barreira',
        statRequired: 'composure',
        difficulty: 64,
        risk: 'medium',
        energyCost: 12,
        description: 'Aproveitar o pulo da barreira e mandar rasteira rente à trave.',
      },
      {
        id: 'cross_box',
        title: '📡 Cruzamento Milimétrico na Cabeça',
        statRequired: 'passing',
        difficulty: 55,
        risk: 'low',
        energyCost: 10,
        description: 'Alçar a bola no segundo pau para a chegada do zagueirão.',
      },
    ],
  });

  return duels;
}

/**
 * Resolve the outcome of a player's decision
 */
export function resolveDuelOutcome(duel, optionId, playerStats, opponentClub) {
  const chosenOption = duel.options.find((o) => o.id === optionId);
  if (!chosenOption) return { success: false, isGoal: false, narrative: 'Lance perdido.' };

  const playerStatValue = playerStats[chosenOption.statRequired] || 50;
  const opponentDefensePower = Math.min(85, Math.floor(opponentClub.prestige * 0.7) + 20);

  // Success roll formula
  // Base chance from player's attribute, scaled against opponent difficulty
  const baseChance = (playerStatValue / (playerStatValue + opponentDefensePower)) * 100;
  const modifier = 50 - (chosenOption.difficulty - 50); // Harder options give lower base success
  const finalSuccessProbability = Math.max(15, Math.min(88, baseChance + modifier));

  const roll = Math.random() * 100;
  const isSuccess = roll <= finalSuccessProbability;

  // Generate result commentary
  if (isSuccess) {
    if (chosenOption.id === 'placed_shot' || chosenOption.id === 'chip_shot' || chosenOption.id === 'power_roof' || chosenOption.id === 'power_blast' || chosenOption.id === 'curve_shot' || chosenOption.id === 'low_under_wall') {
      return {
        success: true,
        isGoal: true,
        isAssist: false,
        energySpent: chosenOption.energyCost,
        title: '⚽ GOOOOOOOOOOL MONUMENTAL!',
        narrative: `GOLAÇO! A finalização foi perfeita, sem chances para o goleiro do ${opponentClub.name}! O estádio explode em festa!`,
      };
    }
    if (chosenOption.id === 'cross_box' || chosenOption.id === 'one_two') {
      return {
        success: true,
        isGoal: false,
        isAssist: true,
        energySpent: chosenOption.energyCost,
        title: '👟 ASSISTÊNCIA DE GÊNIO!',
        narrative: `Que visão de jogo extraordinária! Você achou o companheiro livre como quem enfia linha na agulha, e ele só escorou pro fundo da rede!`,
      };
    }
    return {
      success: true,
      isGoal: false,
      isAssist: false,
      energySpent: chosenOption.energyCost,
      title: '🎩 DRIBLE DESCONCERTANTE!',
      narrative: `Que drible espetacular! O zagueiro adversário ficou no chão procurando a bola enquanto você avançou sob aplausos!`,
    };
  }

  // Failure
  return {
    success: false,
    isGoal: false,
    isAssist: false,
    energySpent: chosenOption.energyCost,
    title: '❌ LANCE DESPERDIÇADO!',
    narrative: `A marcação do ${opponentClub.name} antecipou a jogada e cortou com precisão no último instante!`,
  };
}
