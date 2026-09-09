/* ============================================
   CAREER ENGINE
   Age progression, transfers, World Cup eligibility
   ============================================ */

import {
  CLUBS, TIERS, STARTING_AGE, AGE_PER_SEASON, MAX_AGE,
  WORLD_CUP_AGES, WORLD_CUP_MIN_TIER, WORLD_CUP_MIN_AVG, WORLD_CUP_TIER1_MIN_AVG,
  TITLE_MIN_GOALS, TOP_SCORER_GOALS, BALLON_DOR_GOALS,
} from './constants';

/**
 * Get the player's age for a given season index (0-based)
 */
export function getAge(seasonIndex) {
  return STARTING_AGE + (seasonIndex * AGE_PER_SEASON);
}

/**
 * Check if the career is over (age > MAX_AGE)
 */
export function isRetired(seasonIndex) {
  return getAge(seasonIndex) > MAX_AGE;
}

/**
 * Get starting clubs (Tier 1 options)
 */
export function getStartingClubs() {
  return CLUBS.filter(c => c.tier === 1);
}

/**
 * Get a random subset of clubs from a given tier
 */
function getRandomClubs(tier, count, excludeId = null) {
  const pool = CLUBS.filter(c => c.tier === tier && c.id !== excludeId);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Calculate transfer offers based on season goals
 * Returns array of { club, type: 'superior'|'same'|'renewal' }
 */
export function getTransferOffers(seasonGoals, currentClub) {
  const currentTier = currentClub.tier;
  const offers = [];

  let rule;
  if (seasonGoals === 9)      rule = { superior: 2, same: 0, renew: 1 };
  else if (seasonGoals >= 6)  rule = { superior: 1, same: 1, renew: 1 };
  else if (seasonGoals >= 3)  rule = { superior: 0, same: 2, renew: 1 };
  else if (seasonGoals === 2) rule = { superior: 0, same: 0, renew: 1 };
  else                        rule = { superior: 0, same: 0, renew: 0 };

  // Superior tier offers (cap at tier 4)
  if (rule.superior > 0 && currentTier < 4) {
    const superiorClubs = getRandomClubs(currentTier + 1, rule.superior, currentClub.id);
    superiorClubs.forEach(club => {
      offers.push({ club, type: 'superior' });
    });
  }

  // Same tier offers
  if (rule.same > 0) {
    const sameClubs = getRandomClubs(currentTier, rule.same, currentClub.id);
    sameClubs.forEach(club => {
      offers.push({ club, type: 'same' });
    });
  }

  // Renewal offer
  if (rule.renew > 0) {
    offers.push({ club: currentClub, type: 'renewal' });
  }

  return offers;
}

/**
 * Check if the season results in a Game Over (0-1 goals)
 */
export function isGameOver(seasonGoals) {
  return seasonGoals <= 1;
}

/**
 * Check if the player qualifies for World Cup at the given age
 */
export function isWorldCupYear(age) {
  return WORLD_CUP_AGES.includes(age);
}

/**
 * Check if the player meets World Cup call-up requirements
 */
export function canBeCalledUp(clubTier, careerAvg) {
  // Tier 2+ with avg >= 6.5
  if (clubTier >= WORLD_CUP_MIN_TIER && careerAvg >= WORLD_CUP_MIN_AVG) return true;
  // Tier 1 with avg >= 7.5 (exceptional talent exception)
  if (clubTier === 1 && careerAvg >= WORLD_CUP_TIER1_MIN_AVG) return true;
  return false;
}

/**
 * Calculate career average goals per season
 */
export function getCareerAverage(totalGoals, seasonsPlayed) {
  if (seasonsPlayed === 0) return 0;
  return totalGoals / seasonsPlayed;
}

/**
 * Check if the player wins the league title this season
 */
export function isLeagueChampion(seasonGoals) {
  return seasonGoals >= TITLE_MIN_GOALS;
}

/**
 * Check if the player is top scorer this season
 */
export function isTopScorer(seasonGoals) {
  return seasonGoals >= TOP_SCORER_GOALS;
}

/**
 * Check if the player wins the Ballon d'Or
 * Conditions: 9 goals in Tier 4 club OR World Cup winner with 9 total goals
 */
export function isBallonDor(seasonGoals, clubTier, wonWorldCup = false) {
  if (seasonGoals >= BALLON_DOR_GOALS && clubTier === 4) return true;
  if (wonWorldCup && seasonGoals >= BALLON_DOR_GOALS) return true;
  return false;
}

/**
 * Get the transfer rule description for a given number of season goals
 */
export function getTransferDescription(seasonGoals) {
  if (seasonGoals === 9)      return 'Temporada perfeita! 🌟';
  if (seasonGoals >= 6)       return 'Boa temporada! 👏';
  if (seasonGoals >= 3)       return 'Temporada razoável. 😐';
  if (seasonGoals === 2)      return 'Temporada fraca... Apenas renovação. 😬';
  return '💀 Demissão — Game Over!';
}

/**
 * Calculate the final retirement score
 */
export function calculateFinalScore({
  totalGoals,
  titles,
  ballonDors,
  worldCups,
  topScorerAwards,
  achievements,
  seasonsPlayed,
}) {
  let score = 0;

  score += totalGoals * 10;               // 10 pts per goal
  score += titles * 50;                    // 50 pts per league title
  score += topScorerAwards * 30;          // 30 pts per top scorer
  score += ballonDors * 100;              // 100 pts per Ballon d'Or
  score += worldCups * 150;               // 150 pts per World Cup
  score += (achievements || 0) * 5;       // 5 pts per achievement medal
  score += seasonsPlayed * 5;             // 5 pts per season survived

  return score;
}
