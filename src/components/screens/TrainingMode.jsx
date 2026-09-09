/* ============================================
   TRAINING MODE
   Free practice with unlimited penalties
   ============================================ */

import React, { useState } from 'react';
import PenaltyMatch from './PenaltyMatch';
import PixelButton from '@/components/ui/PixelButton';

export default function TrainingMode({ onExit }) {
  const [penaltyIndex, setPenaltyIndex] = useState(0);
  const [goals, setGoals] = useState(0);
  const [total, setTotal] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const handleResult = (isGoal) => {
    setGoals(prev => prev + (isGoal ? 1 : 0));
    setTotal(prev => prev + 1);
    const nextPenalty = (penaltyIndex + 1) % 3;
    setPenaltyIndex(nextPenalty);

    if (nextPenalty === 0) {
      setShowStats(true);
    }
  };

  if (showStats) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-full animate-fade-in">
        <div className="text-3xl mb-3">🎯</div>
        <h2 className="font-pixel text-[10px] text-gbc-yellow mb-4">TREINO LIVRE</h2>

        <div className="pixel-border bg-gbc-black/50 p-4 w-full max-w-[280px] mb-4 text-center">
          <p className="font-pixel text-[7px] text-gbc-gray mb-2">SESSÃO DE TREINO</p>
          <div className="flex justify-center gap-6">
            <div>
              <span className="font-pixel text-[18px] text-gbc-green">{goals}</span>
              <p className="font-pixel text-[6px] text-gbc-gray">GOLS</p>
            </div>
            <div>
              <span className="font-pixel text-[18px] text-gbc-white">{total}</span>
              <p className="font-pixel text-[6px] text-gbc-gray">TOTAL</p>
            </div>
          </div>
          <p className="font-retro text-sm text-gbc-yellow mt-2">
            {total > 0 ? `${Math.round((goals / total) * 100)}% aproveitamento` : ''}
          </p>
        </div>

        <div className="space-y-2 w-full max-w-[280px]">
          <PixelButton onClick={() => setShowStats(false)} variant="success" fullWidth>
            ⚽ CONTINUAR TREINO
          </PixelButton>
          <PixelButton onClick={onExit} variant="ghost" fullWidth>
            🚪 SAIR DO TREINO
          </PixelButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Training header */}
      <div className="bg-gbc-orange/20 px-3 py-1 flex items-center justify-between shrink-0">
        <span className="font-pixel text-[7px] text-gbc-orange">🎯 TREINO LIVRE</span>
        <span className="font-pixel text-[7px] text-gbc-gray">
          ⚽ {goals}/{total}
        </span>
      </div>

      <div className="flex-1">
        <PenaltyMatch
          penaltyIndex={penaltyIndex}
          totalPenalties={3}
          playerAttributes={{ defense: 3, attack: 3, passing: 3, speed: 3, resistance: 3 }}
          clubTier={2}
          clubColors={{ primary: '#f9a31b', secondary: '#1a1c2c' }}
          playerSkinColor="#ffd5b8"
          playerNumber={99}
          onResult={handleResult}
        />
      </div>
    </div>
  );
}
