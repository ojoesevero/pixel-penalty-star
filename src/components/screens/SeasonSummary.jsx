/* ============================================
   SEASON SUMMARY
   End-of-season awards and results
   ============================================ */

import React from 'react';
import PixelButton from '@/components/ui/PixelButton';
import { sfxVictory, sfxAchievement } from '@/audio/sfx';
import { useEffect } from 'react';

export default function SeasonSummary({
  seasonIndex,
  seasonGoals,
  isChampion,
  isTopScorer,
  isBallonDor,
  wonWorldCup,
  newAchievements = [],
  onContinue,
}) {
  useEffect(() => {
    if (isChampion || isBallonDor || wonWorldCup) {
      sfxVictory();
    }
    if (newAchievements.length > 0) {
      setTimeout(() => sfxAchievement(), 600);
    }
  }, []);

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-full animate-fade-in">
      <h2 className="font-pixel text-[10px] text-gbc-yellow mb-4">
        TEMPORADA {seasonIndex + 1} — RESUMO
      </h2>

      {/* Goals */}
      <div className="pixel-border bg-gbc-black/50 p-4 w-full max-w-[300px] mb-4">
        <div className="text-center">
          <span className="font-pixel text-[24px] text-gbc-yellow">{seasonGoals}</span>
          <p className="font-pixel text-[7px] text-gbc-gray mt-1">GOLS NA TEMPORADA</p>
        </div>
      </div>

      {/* Awards */}
      <div className="space-y-2 w-full max-w-[300px] mb-4">
        {isChampion && (
          <div className="pixel-border-gold bg-gbc-purple/30 p-3 text-center animate-bounce-in">
            <span className="text-2xl">🏆</span>
            <p className="font-pixel text-[8px] text-gbc-yellow mt-1">CAMPEÃO!</p>
          </div>
        )}

        {isTopScorer && (
          <div className="pixel-border-gold bg-gbc-purple/30 p-3 text-center animate-bounce-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-2xl">👟</span>
            <p className="font-pixel text-[8px] text-gbc-orange mt-1">ARTILHEIRO!</p>
          </div>
        )}

        {isBallonDor && (
          <div className="pixel-border-gold bg-gbc-purple/30 p-3 text-center animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <span className="text-2xl">🏅</span>
            <p className="font-pixel text-[8px] text-gbc-yellow mt-1">BOLA DE OURO!</p>
          </div>
        )}

        {wonWorldCup && (
          <div className="pixel-border-gold bg-gbc-purple/30 p-3 text-center animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            <span className="text-2xl">🌍</span>
            <p className="font-pixel text-[8px] text-gbc-green mt-1">CAMPEÃO DO MUNDO!</p>
          </div>
        )}

        {!isChampion && !isTopScorer && !isBallonDor && !wonWorldCup && (
          <div className="bg-gbc-black/30 p-3 text-center border border-gbc-navy">
            <p className="font-retro text-sm text-gbc-gray">Nenhum prêmio nesta temporada.</p>
            <p className="font-retro text-xs text-gbc-dark mt-1">Continue lutando! 💪</p>
          </div>
        )}
      </div>

      {/* New Achievements */}
      {newAchievements.length > 0 && (
        <div className="w-full max-w-[300px] mb-4">
          <p className="font-pixel text-[7px] text-gbc-cyan text-center mb-2">🎖️ CONQUISTAS DESBLOQUEADAS</p>
          <div className="space-y-1">
            {newAchievements.map(a => (
              <div key={a.id} className="bg-gbc-navy/50 px-3 py-1.5 flex items-center gap-2 border border-gbc-purple animate-slide-up">
                <span className="text-lg">{a.icon}</span>
                <div>
                  <p className="font-pixel text-[6px] text-gbc-yellow">{a.name}</p>
                  <p className="font-retro text-xs text-gbc-gray">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <PixelButton onClick={onContinue} variant="primary" fullWidth size="lg">
        ▶ CONTINUAR
      </PixelButton>
    </div>
  );
}
