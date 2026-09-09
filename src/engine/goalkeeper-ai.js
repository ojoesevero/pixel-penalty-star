/* ============================================
   GOALKEEPER AI
   Accuracy scaling, center rule, save logic
   ============================================ */

import { TIERS } from './constants';

/**
 * Get the goalkeeper accuracy for a given club tier (0.0 to 1.0)
 * Tier 1: 35%, Tier 2: 50%, Tier 3: 62%, Tier 4: 75%
 * World Cup keepers use Tier 4 accuracy
 */
export function getKeeperAccuracy(tier, isWorldCup = false) {
  if (isWorldCup) return TIERS[4].keeperAccuracy;
  return TIERS[tier]?.keeperAccuracy ?? 0.35;
}

/**
 * Determine where the keeper dives and if the shot is saved
 *
 * @param {Object} shot - { direction: 'left'|'center'|'right', height: 'low'|'high', force: 0-10 }
 * @param {Object} playerAttrs - { defense, attack, passing, speed, resistance } (1-5 each)
 * @param {number} tier - club tier (1-4)
 * @param {boolean} isWorldCup - whether this is a World Cup match
 * @returns {Object} - { saved, isolated, keeperDive, reason }
 */
export function resolveShot(shot, playerAttrs, tier, isWorldCup = false) {
  const accuracy = getKeeperAccuracy(tier, isWorldCup);
  const { direction, height, force } = shot;
  const { defense = 1, attack = 1, passing = 1, speed = 1 } = playerAttrs;

  // --- Step 1: Check if the ball is isolated (missed the goal) ---
  // High + strong shots (force >= 8) have a chance to go over
  // Attack attribute reduces this chance
  if (height === 'high' && force >= 8) {
    const isolateChance = Math.max(0.05, 0.35 - (attack * 0.06));
    if (Math.random() < isolateChance) {
      return {
        saved: false,
        isolated: true,
        keeperDive: 'none',
        reason: 'Bola isolada! Chute forte demais por cima do gol.',
      };
    }
  }

  // --- Step 2: Calculate effective force ---
  // Defense attribute multiplies effective force
  const effectiveForce = force * (0.7 + (defense * 0.1));

  // --- Step 3: Keeper decides where to dive ---
  let keeperDive;
  const guessRoll = Math.random();

  // Center rule: if shot is center + force < 7, keeper stays put more often
  if (direction === 'center' && force < 7) {
    // Keeper has high chance to stay center
    keeperDive = guessRoll < 0.75 ? 'center' : (guessRoll < 0.875 ? 'left' : 'right');
  } else {
    // Normal AI: keeper guesses the correct side based on accuracy
    if (guessRoll < accuracy) {
      keeperDive = direction; // Correct guess!
    } else {
      // Wrong guess - pick a random other direction
      const otherDirs = ['left', 'center', 'right'].filter(d => d !== direction);
      keeperDive = otherDirs[Math.floor(Math.random() * otherDirs.length)];
    }
  }

  // --- Step 4: Determine if the save is made ---
  if (keeperDive !== direction) {
    // Keeper dived wrong way → GOAL
    return {
      saved: false,
      isolated: false,
      keeperDive,
      reason: 'Goleiro caiu pro lado errado!',
    };
  }

  // Keeper guessed the correct side — now check if the shot beats them anyway

  // Low shots: Passing attribute gives chance to slip through
  if (height === 'low') {
    const slipChance = passing * 0.08; // up to 40% with passing=5
    if (Math.random() < slipChance) {
      return {
        saved: false,
        isolated: false,
        keeperDive,
        reason: 'A bola passou rasteira por baixo do goleiro!',
      };
    }
  }

  // High shots with high force: harder to hold
  if (height === 'high' && effectiveForce >= 8) {
    const powerGoalChance = 0.25 + (attack * 0.05);
    if (Math.random() < powerGoalChance) {
      return {
        saved: false,
        isolated: false,
        keeperDive,
        reason: 'Chute forte demais! O goleiro não segurou!',
      };
    }
  }

  // Center shots with high force: can beat the keeper even centered
  if (direction === 'center' && effectiveForce >= 9) {
    const blastChance = 0.15 + (attack * 0.05);
    if (Math.random() < blastChance) {
      return {
        saved: false,
        isolated: false,
        keeperDive,
        reason: 'Bomba no meio do gol! Goleiro não conseguiu!',
      };
    }
  }

  // --- Shot is saved ---
  return {
    saved: true,
    isolated: false,
    keeperDive,
    reason: direction === 'center'
      ? 'O goleiro ficou parado e defendeu fácil!'
      : 'Goleiro voou no canto certo e fez a defesa!',
  };
}
