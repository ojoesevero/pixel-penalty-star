/* ============================================
   GAME STATE HOOK
   Central state management with useReducer
   ============================================ */

import { useReducer, useCallback, useEffect } from 'react';
import { getAge, isRetired } from '@/engine/career';
import { STARTING_AGE, GAMES_PER_SEASON, PENALTIES_PER_GAME } from '@/engine/constants';

const SAVE_KEY = 'penalty_star_save';

// --- Initial State ---
const INITIAL_STATE = {
  // Screen management
  screen: 'menu', // menu | create | seasonHub | match | seasonSummary | transfer | worldCup | training | leaderboard | retirement | howToPlay | gameOver

  // Player
  player: null, // { name, number, position, skinColor, hairColor, eyeColor, attributes: { defense, attack, passing, speed, resistance } }

  // Career
  currentClub: null,         // club object from constants
  seasonIndex: 0,            // 0-8 (9 seasons total)
  currentGame: 0,            // 0-2 (3 games per season)
  currentPenalty: 0,          // 0-2 (3 penalties per game)
  seasonGoals: 0,            // goals this season (max 9)
  gameGoals: 0,              // goals this game (max 3)
  totalGoals: 0,             // career total goals
  seasonsPlayed: 0,          // completed seasons

  // Awards
  titles: 0,                 // league titles
  topScorerAwards: 0,        // top scorer awards
  ballonDors: 0,             // Ballon d'Or awards
  worldCups: 0,              // World Cup titles

  // Tracking
  clubHistory: [],           // [{ clubId, clubName, seasonIndex, age }]
  achievements: [],          // unlocked achievement IDs
  bestGameGoals: 0,          // best goals in a single game
  bestSeasonGoals: 0,        // best goals in a single season
  calledUp: false,           // ever called up for national team
  perfectGameVsTier4: false,
  countriesPlayed: 0,

  // World Cup state (within a WC tournament)
  worldCupPhase: null,       // null | 'semi' | 'final' | 'won' | 'eliminated'
  worldCupGoals: 0,

  // Misc
  hasSave: false,
};

// --- Action Types ---
const ACTIONS = {
  NEW_GAME: 'NEW_GAME',
  LOAD_SAVE: 'LOAD_SAVE',
  SET_SCREEN: 'SET_SCREEN',
  SET_PLAYER: 'SET_PLAYER',
  SET_CLUB: 'SET_CLUB',
  START_MATCH: 'START_MATCH',
  RECORD_PENALTY: 'RECORD_PENALTY',
  END_GAME: 'END_GAME',
  END_SEASON: 'END_SEASON',
  AWARD_TITLE: 'AWARD_TITLE',
  AWARD_TOP_SCORER: 'AWARD_TOP_SCORER',
  AWARD_BALLON_DOR: 'AWARD_BALLON_DOR',
  START_WORLD_CUP: 'START_WORLD_CUP',
  WORLD_CUP_RESULT: 'WORLD_CUP_RESULT',
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
  ADVANCE_SEASON: 'ADVANCE_SEASON',
  GAME_OVER: 'GAME_OVER',
  RESET: 'RESET',
};

// --- Reducer ---
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.NEW_GAME:
      return {
        ...INITIAL_STATE,
        screen: 'create',
        hasSave: false,
      };

    case ACTIONS.LOAD_SAVE:
      return {
        ...action.payload,
        hasSave: true,
      };

    case ACTIONS.SET_SCREEN:
      return { ...state, screen: action.payload };

    case ACTIONS.SET_PLAYER:
      return { ...state, player: action.payload };

    case ACTIONS.SET_CLUB: {
      const club = action.payload;
      const countries = new Set(state.clubHistory.map(h => {
        const c = h.country;
        return c;
      }));
      countries.add(club.country);

      return {
        ...state,
        currentClub: club,
        clubHistory: [
          ...state.clubHistory,
          {
            clubId: club.id,
            clubName: club.name,
            country: club.country,
            seasonIndex: state.seasonIndex,
            age: getAge(state.seasonIndex),
          },
        ],
        countriesPlayed: countries.size,
      };
    }

    case ACTIONS.START_MATCH:
      return {
        ...state,
        screen: 'match',
        currentPenalty: 0,
        gameGoals: 0,
      };

    case ACTIONS.RECORD_PENALTY: {
      const isGoal = action.payload;
      const newGameGoals = state.gameGoals + (isGoal ? 1 : 0);
      const newTotalGoals = state.totalGoals + (isGoal ? 1 : 0);
      const newSeasonGoals = state.seasonGoals + (isGoal ? 1 : 0);
      const newBestGame = Math.max(state.bestGameGoals, newGameGoals);

      return {
        ...state,
        currentPenalty: state.currentPenalty + 1,
        gameGoals: newGameGoals,
        totalGoals: newTotalGoals,
        seasonGoals: newSeasonGoals,
        bestGameGoals: newBestGame,
        perfectGameVsTier4: state.perfectGameVsTier4 ||
          (newGameGoals === 3 && state.currentPenalty === 2 && state.currentClub?.tier === 4),
      };
    }

    case ACTIONS.END_GAME:
      return {
        ...state,
        currentGame: state.currentGame + 1,
        screen: 'seasonHub',
      };

    case ACTIONS.END_SEASON: {
      const newBestSeason = Math.max(state.bestSeasonGoals, state.seasonGoals);
      return {
        ...state,
        bestSeasonGoals: newBestSeason,
        seasonsPlayed: state.seasonsPlayed + 1,
        screen: 'seasonSummary',
      };
    }

    case ACTIONS.AWARD_TITLE:
      return { ...state, titles: state.titles + 1 };

    case ACTIONS.AWARD_TOP_SCORER:
      return { ...state, topScorerAwards: state.topScorerAwards + 1 };

    case ACTIONS.AWARD_BALLON_DOR:
      return { ...state, ballonDors: state.ballonDors + 1 };

    case ACTIONS.START_WORLD_CUP:
      return {
        ...state,
        screen: 'worldCup',
        worldCupPhase: 'semi',
        worldCupGoals: 0,
        calledUp: true,
      };

    case ACTIONS.WORLD_CUP_RESULT: {
      const { phase, goals, won } = action.payload;
      if (phase === 'semi' && won) {
        return {
          ...state,
          worldCupPhase: 'final',
          worldCupGoals: state.worldCupGoals + goals,
        };
      }
      if (phase === 'final' && won) {
        return {
          ...state,
          worldCupPhase: 'won',
          worldCups: state.worldCups + 1,
          worldCupGoals: state.worldCupGoals + goals,
        };
      }
      // Eliminated
      return {
        ...state,
        worldCupPhase: 'eliminated',
        worldCupGoals: state.worldCupGoals + goals,
      };
    }

    case ACTIONS.UNLOCK_ACHIEVEMENT:
      return {
        ...state,
        achievements: [...new Set([...state.achievements, ...action.payload])],
      };

    case ACTIONS.ADVANCE_SEASON:
      return {
        ...state,
        seasonIndex: state.seasonIndex + 1,
        currentGame: 0,
        seasonGoals: 0,
        worldCupPhase: null,
        worldCupGoals: 0,
      };

    case ACTIONS.GAME_OVER:
      return { ...state, screen: 'gameOver' };

    case ACTIONS.RESET:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

// --- Hook ---
export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE, (initial) => {
    // Try to detect if there's a save
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        return { ...initial, hasSave: true };
      }
    } catch { /* ignore */ }
    return initial;
  });

  // Auto-save on meaningful state changes
  useEffect(() => {
    if (state.player && state.screen !== 'menu' && state.screen !== 'create' && state.screen !== 'gameOver') {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      } catch { /* ignore */ }
    }
  }, [state]);

  // --- Actions ---
  const actions = {
    newGame: useCallback(() => dispatch({ type: ACTIONS.NEW_GAME }), []),
    loadSave: useCallback(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
        if (saved) dispatch({ type: ACTIONS.LOAD_SAVE, payload: saved });
      } catch { /* ignore */ }
    }, []),
    setScreen: useCallback((screen) => dispatch({ type: ACTIONS.SET_SCREEN, payload: screen }), []),
    setPlayer: useCallback((player) => dispatch({ type: ACTIONS.SET_PLAYER, payload: player }), []),
    setClub: useCallback((club) => dispatch({ type: ACTIONS.SET_CLUB, payload: club }), []),
    startMatch: useCallback(() => dispatch({ type: ACTIONS.START_MATCH }), []),
    recordPenalty: useCallback((isGoal) => dispatch({ type: ACTIONS.RECORD_PENALTY, payload: isGoal }), []),
    endGame: useCallback(() => dispatch({ type: ACTIONS.END_GAME }), []),
    endSeason: useCallback(() => dispatch({ type: ACTIONS.END_SEASON }), []),
    awardTitle: useCallback(() => dispatch({ type: ACTIONS.AWARD_TITLE }), []),
    awardTopScorer: useCallback(() => dispatch({ type: ACTIONS.AWARD_TOP_SCORER }), []),
    awardBallonDor: useCallback(() => dispatch({ type: ACTIONS.AWARD_BALLON_DOR }), []),
    startWorldCup: useCallback(() => dispatch({ type: ACTIONS.START_WORLD_CUP }), []),
    worldCupResult: useCallback((result) => dispatch({ type: ACTIONS.WORLD_CUP_RESULT, payload: result }), []),
    unlockAchievements: useCallback((ids) => dispatch({ type: ACTIONS.UNLOCK_ACHIEVEMENT, payload: ids }), []),
    advanceSeason: useCallback(() => dispatch({ type: ACTIONS.ADVANCE_SEASON }), []),
    gameOver: useCallback(() => dispatch({ type: ACTIONS.GAME_OVER }), []),
    reset: useCallback(() => {
      localStorage.removeItem(SAVE_KEY);
      dispatch({ type: ACTIONS.RESET });
    }, []),
    deleteSave: useCallback(() => {
      localStorage.removeItem(SAVE_KEY);
    }, []),
  };

  // --- Computed values ---
  const computed = {
    age: getAge(state.seasonIndex),
    retired: isRetired(state.seasonIndex + 1), // will retire AFTER current season
    careerAvg: state.seasonsPlayed > 0
      ? (state.totalGoals / state.seasonsPlayed).toFixed(1)
      : '0.0',
    gamesRemaining: GAMES_PER_SEASON - state.currentGame,
    penaltiesRemaining: PENALTIES_PER_GAME - state.currentPenalty,
  };

  return { state, actions, computed };
}
