/* ============================================
   APP — Game Orchestrator
   Routes between all screens and manages flow
   ============================================ */

import React, { useState, useCallback } from 'react';
import { useGameState } from '@/hooks/useGameState';
import GBCFrame from '@/components/ui/GBCFrame';
import HUD from '@/components/ui/HUD';
import MainMenu from '@/components/screens/MainMenu';
import CharacterCreate from '@/components/screens/CharacterCreate';
import SeasonHub from '@/components/screens/SeasonHub';
import PenaltyMatch from '@/components/screens/PenaltyMatch';
import SeasonSummary from '@/components/screens/SeasonSummary';
import TransferMarket from '@/components/screens/TransferMarket';
import WorldCup from '@/components/screens/WorldCup';
import TrainingMode from '@/components/screens/TrainingMode';
import Leaderboard, { submitScore } from '@/components/screens/Leaderboard';
import Retirement from '@/components/screens/Retirement';
import PixelButton from '@/components/ui/PixelButton';

import { GAMES_PER_SEASON, PENALTIES_PER_GAME } from '@/engine/constants';
import {
  getTransferOffers, isGameOver, isWorldCupYear,
  canBeCalledUp, getCareerAverage,
  isLeagueChampion, isTopScorer, isBallonDor, isRetired, getAge,
} from '@/engine/career';
import { checkAchievements } from '@/engine/achievements';
import { sfxGameOver } from '@/audio/sfx';

export default function App() {
  const { state, actions, computed } = useGameState();
  const [transferOffers, setTransferOffers] = useState([]);
  const [seasonAwards, setSeasonAwards] = useState({});
  const [newAchievements, setNewAchievements] = useState([]);
  const [highlightScore, setHighlightScore] = useState(null);

  // --- Screen: Character Creation Complete ---
  const handleCreateComplete = useCallback(({ player, club }) => {
    actions.setPlayer(player);
    actions.setClub(club);
    actions.setScreen('seasonHub');
  }, [actions]);

  // --- Screen: Penalty Result ---
  const handlePenaltyResult = useCallback((isGoal) => {
    actions.recordPenalty(isGoal);

    // Check if the game (3 penalties) is over
    const nextPenalty = state.currentPenalty + 1;
    if (nextPenalty >= PENALTIES_PER_GAME) {
      // Game finished — check if season is over
      const nextGame = state.currentGame + 1;
      if (nextGame >= GAMES_PER_SEASON) {
        // Season finished — process end-of-season
        setTimeout(() => processEndOfSeason(isGoal), 300);
      } else {
        actions.endGame();
      }
    }
  }, [state, actions]);

  // --- Process End of Season ---
  const processEndOfSeason = useCallback((lastPenaltyIsGoal) => {
    const finalSeasonGoals = state.seasonGoals + (lastPenaltyIsGoal ? 1 : 0);
    const finalTotalGoals = state.totalGoals + (lastPenaltyIsGoal ? 1 : 0);

    // Check for Game Over
    if (isGameOver(finalSeasonGoals)) {
      sfxGameOver();
      actions.endGame();
      actions.endSeason();
      actions.setScreen('gameOver');
      return;
    }

    // Calculate awards
    const champion = isLeagueChampion(finalSeasonGoals);
    const topScorer = isTopScorer(finalSeasonGoals);

    // Check World Cup
    const age = computed.age;
    const isWCYear = isWorldCupYear(age);
    const careerAvg = (finalTotalGoals / (state.seasonsPlayed + 1));
    const calledUp = isWCYear && canBeCalledUp(state.currentClub.tier, careerAvg);

    if (champion) actions.awardTitle();
    if (topScorer) actions.awardTopScorer();

    // Store awards for summary screen
    setSeasonAwards({
      champion,
      topScorer,
      ballonDor: false, // Checked after WC
      wonWorldCup: false,
      calledUp,
      isWCYear,
    });

    // Check achievements
    const stats = {
      totalGoals: finalTotalGoals,
      bestGameGoals: Math.max(state.bestGameGoals, state.gameGoals + (lastPenaltyIsGoal ? 1 : 0)),
      bestSeasonGoals: Math.max(state.bestSeasonGoals, finalSeasonGoals),
      topScorerAwards: state.topScorerAwards + (topScorer ? 1 : 0),
      ballonDors: state.ballonDors,
      worldCups: state.worldCups,
      calledUp: state.calledUp || calledUp,
      seasonsPlayed: state.seasonsPlayed + 1,
      perfectGameVsTier4: state.perfectGameVsTier4,
      countriesPlayed: state.countriesPlayed,
    };
    const newAch = checkAchievements(stats, state.achievements);
    if (newAch.length > 0) {
      actions.unlockAchievements(newAch.map(a => a.id));
    }
    setNewAchievements(newAch);

    actions.endGame();
    actions.endSeason();

    // If World Cup year and called up, go to WC before summary
    if (calledUp) {
      actions.startWorldCup();
    }
  }, [state, computed, actions]);

  // --- World Cup Result ---
  const handleWorldCupResult = useCallback((phase, goals, won) => {
    actions.worldCupResult({ phase, goals, won });

    if (phase === 'semi' && won) {
      // Proceed to final — screen stays on worldCup with phase='final'
      return;
    }

    // Tournament over (won final or eliminated)
    const wonWC = phase === 'final' && won;

    // Check Ballon d'Or (9 season goals + WC win)
    const ballonDor = isBallonDor(state.seasonGoals, state.currentClub.tier, wonWC);
    if (ballonDor) actions.awardBallonDor();

    setSeasonAwards(prev => ({
      ...prev,
      wonWorldCup: wonWC,
      ballonDor,
    }));

    actions.setScreen('seasonSummary');
  }, [state, actions]);

  // --- Season Summary Continue ---
  const handleSeasonSummaryContinue = useCallback(() => {
    // Check if retired
    if (isRetired(state.seasonIndex + 1)) {
      actions.setScreen('retirement');
      return;
    }

    // Generate transfer offers
    const offers = getTransferOffers(state.seasonGoals || state.bestSeasonGoals, state.currentClub);
    if (offers.length === 0) {
      // No offers = game over (shouldn't happen if season goals >= 2)
      actions.setScreen('gameOver');
      return;
    }
    setTransferOffers(offers);
    actions.setScreen('transfer');
  }, [state, actions]);

  // --- Transfer Accept ---
  const handleTransferAccept = useCallback((club) => {
    actions.setClub(club);
    actions.advanceSeason();
    actions.setScreen('seasonHub');
  }, [actions]);

  // --- Retirement / Leaderboard ---
  const handleRetirementLeaderboard = useCallback((score) => {
    submitScore({
      playerName: state.player.name,
      score,
      titles: state.titles,
      topScorerAwards: state.topScorerAwards,
      ballonDors: state.ballonDors,
      worldCups: state.worldCups,
      goals: state.totalGoals,
      achievements: state.achievements.length,
      nationality: state.player?.nationality || '🇧🇷',
    });
    setHighlightScore(score);
    actions.setScreen('leaderboard');
  }, [state, actions]);

  // --- Determine if HUD should show ---
  const showHUD = !['menu', 'create', 'training', 'leaderboard', 'gameOver'].includes(state.screen);

  return (
    <GBCFrame>
      <div className="flex flex-col h-full">
        {/* HUD */}
        {showHUD && state.currentClub && (
          <HUD
            age={computed.age}
            club={state.currentClub}
            careerAvg={computed.careerAvg}
            titles={state.titles}
            ballonDors={state.ballonDors}
            worldCups={state.worldCups}
          />
        )}

        {/* Screen Router */}
        <div className="flex-1 overflow-y-auto">
          {state.screen === 'menu' && (
            <MainMenu
              hasSave={state.hasSave}
              onNewGame={actions.newGame}
              onContinue={actions.loadSave}
              onTraining={() => actions.setScreen('training')}
              onLeaderboard={() => { setHighlightScore(null); actions.setScreen('leaderboard'); }}
            />
          )}

          {state.screen === 'create' && (
            <CharacterCreate
              onComplete={handleCreateComplete}
              onBack={() => actions.setScreen('menu')}
            />
          )}

          {state.screen === 'seasonHub' && state.currentClub && (
            <SeasonHub
              age={computed.age}
              club={state.currentClub}
              seasonIndex={state.seasonIndex}
              currentGame={state.currentGame}
              seasonGoals={state.seasonGoals}
              onStartMatch={() => {
                if (state.currentGame >= GAMES_PER_SEASON) {
                  // Season already complete, go to summary
                  processEndOfSeason(false);
                } else {
                  actions.startMatch();
                }
              }}
              onExitToMenu={() => actions.setScreen('menu')}
            />
          )}

          {state.screen === 'match' && state.currentClub && state.player && (
            <PenaltyMatch
              penaltyIndex={state.currentPenalty}
              playerAttributes={state.player.attributes}
              clubTier={state.currentClub.tier}
              clubColors={state.currentClub.colors}
              playerSkinColor={state.player.skinColor}
              playerNumber={state.player.number}
              onResult={handlePenaltyResult}
            />
          )}

          {state.screen === 'seasonSummary' && (
            <SeasonSummary
              seasonIndex={state.seasonIndex}
              seasonGoals={state.bestSeasonGoals}
              isChampion={seasonAwards.champion}
              isTopScorer={seasonAwards.topScorer}
              isBallonDor={seasonAwards.ballonDor}
              wonWorldCup={seasonAwards.wonWorldCup}
              newAchievements={newAchievements}
              onContinue={handleSeasonSummaryContinue}
            />
          )}

          {state.screen === 'transfer' && (
            <TransferMarket
              offers={transferOffers}
              currentClub={state.currentClub}
              seasonGoals={state.bestSeasonGoals}
              onAccept={handleTransferAccept}
            />
          )}

          {state.screen === 'worldCup' && state.player && (
            <WorldCup
              phase={state.worldCupPhase}
              playerAttributes={state.player.attributes}
              playerSkinColor={state.player.skinColor}
              playerNumber={state.player.number}
              onResult={handleWorldCupResult}
            />
          )}

          {state.screen === 'training' && (
            <TrainingMode onExit={() => actions.setScreen('menu')} />
          )}

          {state.screen === 'leaderboard' && (
            <Leaderboard
              onBack={() => actions.setScreen('menu')}
              highlightScore={highlightScore}
            />
          )}

          {state.screen === 'retirement' && state.player && (
            <Retirement
              player={state.player}
              totalGoals={state.totalGoals}
              titles={state.titles}
              topScorerAwards={state.topScorerAwards}
              ballonDors={state.ballonDors}
              worldCups={state.worldCups}
              seasonsPlayed={state.seasonsPlayed}
              achievements={state.achievements}
              clubHistory={state.clubHistory}
              onLeaderboard={handleRetirementLeaderboard}
              onNewGame={() => { actions.deleteSave(); actions.newGame(); }}
            />
          )}

          {state.screen === 'gameOver' && (
            <div className="p-6 flex flex-col items-center justify-center min-h-full animate-fade-in">
              <div className="text-4xl mb-4">💀</div>
              <h2 className="font-pixel text-[12px] text-gbc-red mb-2">GAME OVER</h2>
              <p className="font-retro text-lg text-gbc-gray text-center mb-1">
                Nenhum clube quis renovar seu contrato.
              </p>
              <p className="font-retro text-sm text-gbc-dark text-center mb-6">
                Sua carreira chegou ao fim prematuramente.
              </p>

              <div className="bg-gbc-black/50 border border-gbc-navy p-3 w-full max-w-[250px] mb-6 text-center">
                <p className="font-pixel text-[7px] text-gbc-gray">GOLS NA CARREIRA</p>
                <span className="font-pixel text-[20px] text-gbc-red">{state.totalGoals}</span>
              </div>

              <div className="space-y-2 w-full max-w-[250px]">
                <PixelButton onClick={() => { actions.deleteSave(); actions.newGame(); }} variant="primary" fullWidth>
                  🎮 TENTAR NOVAMENTE
                </PixelButton>
                <PixelButton onClick={() => actions.setScreen('menu')} variant="ghost" fullWidth>
                  ◀ MENU
                </PixelButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </GBCFrame>
  );
}
