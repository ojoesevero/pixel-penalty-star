/* ============================================
   ACHIEVEMENTS SYSTEM
   Unlockable medals with tracking
   ============================================ */

export const ACHIEVEMENTS = [
  {
    id: 'first_goal',
    name: 'Primeiro Gol',
    icon: '⚽',
    description: 'Marque seu primeiro gol na carreira.',
    check: (stats) => stats.totalGoals >= 1,
  },
  {
    id: 'hat_trick',
    name: 'Hat-Trick',
    icon: '🎩',
    description: 'Faça 3 gols em um único jogo.',
    check: (stats) => stats.bestGameGoals >= 3,
  },
  {
    id: 'perfect_season',
    name: 'Temporada Perfeita',
    icon: '💎',
    description: 'Faça 9 gols em uma temporada.',
    check: (stats) => stats.bestSeasonGoals >= 9,
  },
  {
    id: 'top_scorer',
    name: 'Artilheiro',
    icon: '👟',
    description: 'Conquiste o prêmio de artilheiro da temporada.',
    check: (stats) => stats.topScorerAwards >= 1,
  },
  {
    id: 'ballon_dor',
    name: 'Bola de Ouro',
    icon: '🏆',
    description: 'Conquiste a Bola de Ouro.',
    check: (stats) => stats.ballonDors >= 1,
  },
  {
    id: 'world_champion',
    name: 'Campeão do Mundo',
    icon: '🌍',
    description: 'Vença a Copa do Mundo com a Seleção.',
    check: (stats) => stats.worldCups >= 1,
  },
  {
    id: 'called_up',
    name: 'Convocado',
    icon: '🇧🇷',
    description: 'Seja convocado para a Seleção Nacional.',
    check: (stats) => stats.calledUp === true,
  },
  {
    id: 'iron_man',
    name: 'Homem de Ferro',
    icon: '🦾',
    description: 'Complete todas as 9 temporadas sem Game Over.',
    check: (stats) => stats.seasonsPlayed >= 9,
  },
  {
    id: 'giant_killer',
    name: 'Matador de Gigantes',
    icon: '🗡️',
    description: 'Faça 3 gols contra um time de Nível 4.',
    check: (stats) => stats.perfectGameVsTier4 === true,
  },
  {
    id: 'globe_trotter',
    name: 'Trotamundos',
    icon: '✈️',
    description: 'Jogue em clubes de 3 países diferentes.',
    check: (stats) => (stats.countriesPlayed || 0) >= 3,
  },
];

/**
 * Check all achievements and return newly unlocked ones
 * @param {Object} stats - current career stats
 * @param {string[]} alreadyUnlocked - IDs of previously unlocked achievements
 * @returns {Object[]} - newly unlocked achievement objects
 */
export function checkAchievements(stats, alreadyUnlocked = []) {
  return ACHIEVEMENTS.filter(
    a => !alreadyUnlocked.includes(a.id) && a.check(stats)
  );
}

/**
 * Get achievement by ID
 */
export function getAchievement(id) {
  return ACHIEVEMENTS.find(a => a.id === id);
}

/**
 * Calculate bonus score from achievements
 */
export function getAchievementBonusScore(unlockedIds) {
  return unlockedIds.length * 5;
}
