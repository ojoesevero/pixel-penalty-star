/* ============================================
   SEASON HUB
   Central dashboard for the current season
   ============================================ */

import React from 'react';
import PixelButton from '@/components/ui/PixelButton';
import { GAMES_PER_SEASON, PENALTIES_PER_GAME } from '@/engine/constants';

export default function SeasonHub({
  age,
  club,
  seasonIndex,
  currentGame,
  seasonGoals,
  onStartMatch,
  onExitToMenu,
}) {
  const gamesPlayed = currentGame;
  const gamesRemaining = GAMES_PER_SEASON - currentGame;
  const seasonComplete = gamesRemaining === 0;

  return (
    <div className="p-4 animate-slide-up">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-pixel text-[10px] text-gbc-yellow">TEMPORADA {seasonIndex + 1}</h2>
        <div className="mt-1 w-24 h-[2px] bg-gbc-purple mx-auto" />
      </div>

      {/* Club Card */}
      <div
        className="pixel-border p-3 mb-4 text-center"
        style={{ backgroundColor: club.colors.primary + '20' }}
      >
        <span className="text-2xl">{club.country}</span>
        <h3 className="font-pixel text-[9px] text-gbc-white mt-1">{club.name}</h3>
        <p className="font-retro text-sm text-gbc-gray mt-1">
          Nível {club.tier} • {age} anos
        </p>
      </div>

      {/* Season Progress */}
      <div className="bg-gbc-black/50 border border-gbc-navy p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-pixel text-[7px] text-gbc-gray">JOGOS</span>
          <span className="font-pixel text-[8px] text-gbc-cyan">
            {gamesPlayed}/{GAMES_PER_SEASON}
          </span>
        </div>

        {/* Game indicators */}
        <div className="flex gap-2 justify-center mb-3">
          {Array.from({ length: GAMES_PER_SEASON }, (_, i) => (
            <div
              key={i}
              className={`w-8 h-8 border-2 flex items-center justify-center font-pixel text-[8px]
                ${i < gamesPlayed
                  ? 'border-gbc-teal bg-gbc-teal/20 text-gbc-green'
                  : i === gamesPlayed
                    ? 'border-gbc-yellow bg-gbc-yellow/10 text-gbc-yellow animate-blink'
                    : 'border-gbc-navy text-gbc-dark'
                }
              `}
            >
              {i < gamesPlayed ? '✓' : i + 1}
            </div>
          ))}
        </div>

        {/* Goals */}
        <div className="flex justify-between items-center">
          <span className="font-pixel text-[7px] text-gbc-gray">GOLS NA TEMPORADA</span>
          <span className="font-pixel text-[10px] text-gbc-yellow">{seasonGoals}</span>
        </div>

        {/* Goals bar */}
        <div className="w-full h-3 bg-gbc-black border border-gbc-navy mt-1.5">
          <div
            className="h-full bg-gradient-to-r from-gbc-teal to-gbc-green transition-all duration-500"
            style={{ width: `${(seasonGoals / 9) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-0.5">
          <span className="font-pixel text-[5px] text-gbc-dark">0</span>
          <span className="font-pixel text-[5px] text-gbc-dark">9</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {!seasonComplete ? (
          <PixelButton onClick={onStartMatch} variant="success" fullWidth size="lg">
            ⚽ JOGO {currentGame + 1} — JOGAR
          </PixelButton>
        ) : (
          <PixelButton onClick={onStartMatch} variant="gold" fullWidth size="lg">
            📊 VER RESULTADO
          </PixelButton>
        )}

        <PixelButton onClick={onExitToMenu} variant="ghost" fullWidth size="sm">
          🚪 SAIR AO MENU
        </PixelButton>
      </div>

      {/* Season tip */}
      {!seasonComplete && (
        <div className="mt-3 text-center">
          <p className="font-retro text-xs text-gbc-gray">
            Cada jogo tem {PENALTIES_PER_GAME} cobranças de pênalti.
          </p>
          <p className="font-retro text-xs text-gbc-gray">
            Faça 8+ gols para ser campeão! 🏆
          </p>
        </div>
      )}
    </div>
  );
}
