/* ==========================================================================
   RUMO AO ESTRELATO: FOOTBALL CAREER RPG
   Captain Tsubasa Edition • 16-Bit Modern Web Engine
   ========================================================================== */

import React, { useState, useEffect, useCallback } from 'react';
import GameContainer from '@/components/layout/GameContainer';
import NewMainMenu from '@/components/screens/NewMainMenu';
import NewCharacterCreate from '@/components/screens/NewCharacterCreate';
import CareerHub from '@/components/screens/CareerHub';
import MatchScreen from '@/components/screens/MatchScreen';
import LifestyleStore from '@/components/screens/LifestyleStore';
import TransferOffersModal from '@/components/screens/TransferOffersModal';
import StoryEventModal from '@/components/story/StoryEventModal';
import NewRetirement from '@/components/screens/NewRetirement';
import Leaderboard, { submitScore } from '@/components/screens/Leaderboard';

import { CLUBS, getClubById } from '@/engine/clubsData';
import { generateTransferOffers } from '@/engine/transferMarket';
import { getRandomStoryEvent } from '@/engine/storyEvents';

const SAVE_KEY = 'rumo_ao_estrelato_career_save';
const TOTAL_GAMES_PER_SEASON = 5;

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem('rumo_view_mode') || 'pc';
    } catch {
      return 'pc';
    }
  });
  const [player, setPlayer] = useState(null);
  const [currentClub, setCurrentClub] = useState(null);
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [gameInSeason, setGameInSeason] = useState(0);
  const [seasonGoals, setSeasonGoals] = useState(0);
  const [seasonAssists, setSeasonAssists] = useState(0);
  const [totalGoals, setTotalGoals] = useState(0);
  const [totalAssists, setTotalAssists] = useState(0);
  const [titlesWon, setTitlesWon] = useState(0);
  const [activeStoryEvent, setActiveStoryEvent] = useState(null);
  const [transferOffers, setTransferOffers] = useState(null);
  const [highlightScore, setHighlightScore] = useState(null);
  const [hasSavedGame, setHasSavedGame] = useState(false);

  const handleToggleViewMode = (mode) => {
    setViewMode(mode);
    try {
      localStorage.setItem('rumo_view_mode', mode);
    } catch { /* ignore */ }
  };

  // Check saved game on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        setHasSavedGame(true);
      }
    } catch { /* ignore */ }
  }, []);

  // Save game state
  const saveGame = useCallback((overrideData = {}) => {
    if (!player || !currentClub) return;
    try {
      const data = {
        player,
        currentClubId: currentClub.id,
        seasonIndex,
        gameInSeason,
        seasonGoals,
        seasonAssists,
        totalGoals,
        totalAssists,
        titlesWon,
        ...overrideData,
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
      setHasSavedGame(true);
    } catch { /* ignore */ }
  }, [player, currentClub, seasonIndex, gameInSeason, seasonGoals, seasonAssists, totalGoals, totalAssists, titlesWon]);

  // Load saved game
  const handleContinue = () => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setPlayer(data.player);
        setCurrentClub(getClubById(data.currentClubId));
        setSeasonIndex(data.seasonIndex || 0);
        setGameInSeason(data.gameInSeason || 0);
        setSeasonGoals(data.seasonGoals || 0);
        setSeasonAssists(data.seasonAssists || 0);
        setTotalGoals(data.totalGoals || 0);
        setTotalAssists(data.totalAssists || 0);
        setTitlesWon(data.titlesWon || 0);
        setScreen('hub');
      }
    } catch (e) {
      console.error('Falha ao carregar jogo salvo:', e);
    }
  };

  // Start new career
  const handleStartCareer = (newPlayer, startingClub) => {
    setPlayer(newPlayer);
    setCurrentClub(startingClub);
    setSeasonIndex(0);
    setGameInSeason(0);
    setSeasonGoals(0);
    setSeasonAssists(0);
    setTotalGoals(0);
    setTotalAssists(0);
    setTitlesWon(0);
    setScreen('hub');

    try {
      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({
          player: newPlayer,
          currentClubId: startingClub.id,
          seasonIndex: 0,
          gameInSeason: 0,
          seasonGoals: 0,
          seasonAssists: 0,
          totalGoals: 0,
          totalAssists: 0,
          titlesWon: 0,
        })
      );
      setHasSavedGame(true);
    } catch { /* ignore */ }
  };

  // Generate next opponent
  const getNextOpponent = () => {
    if (!currentClub) return CLUBS[1];
    const sameLeague = CLUBS.filter((c) => c.league === currentClub.league && c.id !== currentClub.id);
    if (sameLeague.length > 0) {
      return sameLeague[gameInSeason % sameLeague.length];
    }
    return CLUBS.find((c) => c.id !== currentClub.id) || CLUBS[0];
  };

  // Match finished
  const handleMatchComplete = ({ playerGoals: g, playerAssists: a, won }) => {
    const updatedGoals = seasonGoals + g;
    const updatedAssists = seasonAssists + a;
    const updatedTotalGoals = totalGoals + g;
    const updatedTotalAssists = totalAssists + a;

    // Monthly match salary payout + goal bonuses
    const matchPay = Math.round((player.monthlySalary || 5000) / 4);
    const bonusPay = g * 1500 + a * 800;
    const newBalance = (player.bankBalance || 0) + matchPay + bonusPay;

    // Coach and fan morale changes
    const coachDelta = won ? 6 : g > 0 ? 3 : -4;
    const fanDelta = g > 0 ? 8 : won ? 4 : -5;
    const newCoachTrust = Math.min(100, Math.max(10, (player.coachTrust || 70) + coachDelta));
    const newFanLove = Math.min(100, Math.max(10, (player.fanLove || 65) + fanDelta));
    const newMediaHype = Math.min(100, Math.max(10, (player.mediaHype || 40) + g * 5));

    const updatedPlayer = {
      ...player,
      bankBalance: newBalance,
      coachTrust: newCoachTrust,
      fanLove: newFanLove,
      mediaHype: newMediaHype,
      energy: Math.max(30, (player.energy || 100) - 20),
    };

    setPlayer(updatedPlayer);
    setSeasonGoals(updatedGoals);
    setSeasonAssists(updatedAssists);
    setTotalGoals(updatedTotalGoals);
    setTotalAssists(updatedTotalAssists);

    const nextGame = gameInSeason + 1;

    // Check if season is finished
    if (nextGame >= TOTAL_GAMES_PER_SEASON) {
      // Season End!
      const isChampion = updatedGoals >= 6;
      const newTitles = titlesWon + (isChampion ? 1 : 0);
      setTitlesWon(newTitles);

      // Advance age (1 season = 2 years)
      const nextAge = updatedPlayer.age + 2;
      const agedPlayer = { ...updatedPlayer, age: nextAge, energy: 100 };
      setPlayer(agedPlayer);

      // Check retirement at 36
      if (nextAge >= 36) {
        const finalScore = updatedTotalGoals * 15 + newTitles * 80 + Math.floor(newBalance / 50000);
        submitScore({
          playerName: agedPlayer.name,
          score: finalScore,
          goals: updatedTotalGoals,
          titles: newTitles,
          nationality: '🇧🇷',
        });
        setHighlightScore(finalScore);
        setScreen('retirement');
        return;
      }

      // Generate Transfer Window Offers! (The core immersion: China $800k vs Série A $75k)
      const offers = generateTransferOffers(
        currentClub,
        agedPlayer.stats,
        updatedGoals,
        agedPlayer.monthlySalary
      );
      setTransferOffers(offers);

      // Reset season counters
      setSeasonIndex((s) => s + 1);
      setGameInSeason(0);
      setSeasonGoals(0);
      setSeasonAssists(0);

      setScreen('transfers');
    } else {
      setGameInSeason(nextGame);
      setScreen('hub');
    }

    saveGame();
  };

  // Accept a contract proposal
  const handleAcceptTransfer = (offer) => {
    const updatedHistory = [
      ...(player.careerHistory || []),
      {
        clubId: offer.club.id,
        clubName: offer.club.name,
        age: player.age,
        league: offer.club.league,
      },
    ];

    const updatedPlayer = {
      ...player,
      monthlySalary: offer.salary,
      bankBalance: (player.bankBalance || 0) + (offer.signingBonus || 0),
      careerHistory: updatedHistory,
      coachTrust: 75,
      fanLove: 70,
    };

    setPlayer(updatedPlayer);
    setCurrentClub(offer.club);
    setTransferOffers(null);
    setScreen('hub');

    saveGame({
      player: updatedPlayer,
      currentClubId: offer.club.id,
    });
  };

  // Lifestyle item purchase
  const handleBuyLifestyleItem = (item) => {
    const newBalance = player.bankBalance - item.cost;
    const newOwned = [...(player.lifestyleItems || []), item.id];

    // Apply stat boosts if any
    const updatedStats = { ...player.stats };
    if (item.statBoost) {
      Object.keys(item.statBoost).forEach((statKey) => {
        updatedStats[statKey] = (updatedStats[statKey] || 50) + item.statBoost[statKey];
      });
    }

    const updatedPlayer = {
      ...player,
      bankBalance: newBalance,
      lifestyleItems: newOwned,
      stats: updatedStats,
    };

    setPlayer(updatedPlayer);
    saveGame({ player: updatedPlayer });
  };

  // Story event resolution
  const handleResolveStoryEvent = (chosenOption) => {
    const effects = chosenOption.effects || {};
    const updatedPlayer = {
      ...player,
      energy: Math.min(100, Math.max(10, (player.energy || 100) + (effects.energy || 0))),
      coachTrust: Math.min(100, Math.max(10, (player.coachTrust || 70) + (effects.coachTrust || 0))),
      fanLove: Math.min(100, Math.max(10, (player.fanLove || 65) + (effects.fanLove || 0))),
      mediaHype: Math.min(100, Math.max(10, (player.mediaHype || 40) + (effects.mediaHype || 0))),
      bankBalance: Math.max(0, (player.bankBalance || 0) + (effects.money || 0)),
    };

    setPlayer(updatedPlayer);
    setActiveStoryEvent(null);
    saveGame({ player: updatedPlayer });
  };

  const calculateFinalCareerScore = () => {
    if (!player) return 0;
    return totalGoals * 15 + titlesWon * 80 + Math.floor((player.bankBalance || 0) / 50000);
  };

  return (
    <GameContainer
      player={player}
      currentClub={currentClub}
      viewMode={viewMode}
      onToggleViewMode={handleToggleViewMode}
      onRankingClick={() => setScreen('leaderboard')}
      onResetGame={() => {
        if (confirm('Deseja realmente voltar ao menu inicial? Seu progresso está salvo.')) {
          setScreen('menu');
        }
      }}
    >
      {/* 1. Main Menu */}
      {screen === 'menu' && (
        <NewMainMenu
          hasSavedGame={hasSavedGame}
          viewMode={viewMode}
          onChangeViewMode={handleToggleViewMode}
          onNewGame={() => setScreen('create')}
          onContinue={handleContinue}
          onLeaderboard={() => setScreen('leaderboard')}
        />
      )}

      {/* 2. Character Creation */}
      {screen === 'create' && (
        <NewCharacterCreate onStartCareer={handleStartCareer} />
      )}

      {/* 3. Career Hub */}
      {screen === 'hub' && player && currentClub && (
        <CareerHub
          player={player}
          currentClub={currentClub}
          seasonIndex={seasonIndex}
          gameInSeason={gameInSeason}
          totalGamesInSeason={TOTAL_GAMES_PER_SEASON}
          seasonGoals={seasonGoals}
          seasonAssists={seasonAssists}
          nextOpponent={getNextOpponent()}
          transferOffersAvailable={Boolean(transferOffers)}
          onStartMatch={() => setScreen('match')}
          onOpenStore={() => setScreen('store')}
          onTriggerEvent={() => setActiveStoryEvent(getRandomStoryEvent())}
          onOpenTransfers={() => {
            if (!transferOffers) {
              const offers = generateTransferOffers(currentClub, player.stats, seasonGoals, player.monthlySalary);
              setTransferOffers(offers);
            }
            setScreen('transfers');
          }}
        />
      )}

      {/* 4. Match Screen (Captain Tsubasa Duel Mode) */}
      {screen === 'match' && player && currentClub && (
        <MatchScreen
          player={player}
          currentClub={currentClub}
          opponentClub={getNextOpponent()}
          onMatchComplete={handleMatchComplete}
        />
      )}

      {/* 5. Lifestyle Store */}
      {screen === 'store' && player && (
        <LifestyleStore
          player={player}
          onBuyItem={handleBuyLifestyleItem}
          onBack={() => setScreen('hub')}
        />
      )}

      {/* 6. Transfer Offers Modal */}
      {screen === 'transfers' && transferOffers && player && (
        <TransferOffersModal
          offers={transferOffers}
          player={player}
          onAcceptOffer={handleAcceptTransfer}
        />
      )}

      {/* 7. Story Event Dilemma Modal */}
      {activeStoryEvent && (
        <StoryEventModal
          event={activeStoryEvent}
          onResolveEvent={handleResolveStoryEvent}
        />
      )}

      {/* 8. Retirement / End of Career */}
      {screen === 'retirement' && player && (
        <NewRetirement
          player={player}
          totalGoals={totalGoals}
          totalAssists={totalAssists}
          titles={titlesWon}
          seasonsPlayed={seasonIndex + 1}
          finalScore={calculateFinalCareerScore()}
          onViewLeaderboard={() => setScreen('leaderboard')}
          onRestart={() => setScreen('menu')}
        />
      )}

      {/* 9. Hall da Fama / Leaderboard */}
      {screen === 'leaderboard' && (
        <Leaderboard
          onBack={() => setScreen(player ? 'hub' : 'menu')}
          highlightScore={highlightScore}
        />
      )}
    </GameContainer>
  );
}
