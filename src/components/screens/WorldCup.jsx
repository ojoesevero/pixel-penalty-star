/* ============================================
   WORLD CUP
   Semi-final and Final penalty shootouts
   ============================================ */

import React, { useState } from 'react';
import PixelButton from '@/components/ui/PixelButton';
import PenaltyMatch from './PenaltyMatch';
import { WORLD_CUP_PENALTIES } from '@/engine/constants';

export default function WorldCup({
  phase,       // 'semi' | 'final'
  playerAttributes,
  playerSkinColor,
  playerNumber,
  onResult,    // (phase, goals, won)
  onSkip,      // if not called up
}) {
  const [playing, setPlaying] = useState(false);
  const [goals, setGoals] = useState(0);
  const [penaltyIndex, setPenaltyIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const phaseLabel = phase === 'semi' ? 'SEMIFINAL' : 'FINAL';
  const required = WORLD_CUP_PENALTIES; // Must score all 3

  const handlePenaltyResult = (isGoal) => {
    const newGoals = goals + (isGoal ? 1 : 0);
    const newIndex = penaltyIndex + 1;
    setGoals(newGoals);
    setPenaltyIndex(newIndex);

    if (newIndex >= WORLD_CUP_PENALTIES) {
      const won = newGoals >= required;
      setFinished(true);
      setTimeout(() => onResult(phase, newGoals, won), 100);
    }
  };

  if (playing && !finished) {
    return (
      <PenaltyMatch
        penaltyIndex={penaltyIndex}
        totalPenalties={WORLD_CUP_PENALTIES}
        playerAttributes={playerAttributes}
        clubTier={4} // World Cup keepers are tier 4 difficulty
        clubColors={{ primary: '#ffcd75', secondary: '#38b764' }}
        playerSkinColor={playerSkinColor}
        playerNumber={playerNumber}
        isWorldCup={true}
        onResult={handlePenaltyResult}
      />
    );
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-full animate-fade-in">
      <div className="text-4xl mb-3">🌍</div>
      <h2 className="font-pixel text-[12px] text-gbc-yellow mb-1">COPA DO MUNDO</h2>
      <h3 className="font-pixel text-[9px] text-gbc-cyan mb-4">{phaseLabel}</h3>

      <div className="pixel-border bg-gbc-black/50 p-4 w-full max-w-[300px] mb-4 text-center">
        <p className="font-retro text-lg text-gbc-white">
          🇧🇷 Brasil vs Adversário 🏴
        </p>
        <p className="font-retro text-sm text-gbc-gray mt-2">
          Disputa de Pênaltis — {WORLD_CUP_PENALTIES} cobranças
        </p>
        <p className="font-pixel text-[7px] text-gbc-orange mt-2">
          Faça {required}/{WORLD_CUP_PENALTIES} para avançar!
        </p>
      </div>

      <PixelButton onClick={() => setPlaying(true)} variant="gold" size="lg">
        ⚽ JOGAR {phaseLabel}
      </PixelButton>
    </div>
  );
}
