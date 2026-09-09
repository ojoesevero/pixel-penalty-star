/* ============================================
   RETIREMENT
   Career end screen with trophy gallery & timeline
   ============================================ */

import React from 'react';
import PixelButton from '@/components/ui/PixelButton';
import { ACHIEVEMENTS } from '@/engine/achievements';
import { calculateFinalScore, getAge } from '@/engine/career';
import { sfxVictory } from '@/audio/sfx';
import { useEffect } from 'react';

export default function Retirement({
  player,
  totalGoals,
  titles,
  topScorerAwards,
  ballonDors,
  worldCups,
  seasonsPlayed,
  achievements = [],
  clubHistory = [],
  onLeaderboard,
  onNewGame,
}) {
  const score = calculateFinalScore({
    totalGoals,
    titles,
    ballonDors,
    worldCups,
    topScorerAwards,
    achievements: achievements.length,
    seasonsPlayed,
  });

  useEffect(() => {
    sfxVictory();
  }, []);

  return (
    <div className="p-4 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="text-3xl mb-2">🎬</div>
        <h2 className="font-pixel text-[10px] text-gbc-yellow">APOSENTADORIA</h2>
        <p className="font-retro text-sm text-gbc-gray mt-1">
          {player.name} #{player.number} encerra a carreira!
        </p>
      </div>

      {/* Score */}
      <div className="pixel-border-gold bg-gbc-purple/30 p-4 text-center mb-4">
        <span className="font-pixel text-[28px] text-gbc-yellow animate-pulse-glow">{score}</span>
        <p className="font-pixel text-[7px] text-gbc-gray mt-1">SCORE FINAL</p>
      </div>

      {/* Career Stats */}
      <div className="bg-gbc-black/50 border border-gbc-navy p-3 mb-4">
        <h3 className="font-pixel text-[7px] text-gbc-cyan mb-2 text-center">ESTATÍSTICAS</h3>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <span className="font-pixel text-[14px] text-gbc-white">{totalGoals}</span>
            <p className="font-pixel text-[5px] text-gbc-gray">GOLS</p>
          </div>
          <div>
            <span className="font-pixel text-[14px] text-gbc-white">{seasonsPlayed}</span>
            <p className="font-pixel text-[5px] text-gbc-gray">TEMPORADAS</p>
          </div>
        </div>
      </div>

      {/* Trophy Gallery */}
      <div className="bg-gbc-black/50 border border-gbc-navy p-3 mb-4">
        <h3 className="font-pixel text-[7px] text-gbc-cyan mb-2 text-center">🏆 TROFÉUS</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center p-2 bg-gbc-navy/30 border border-gbc-navy">
            <span className="text-xl">🏆</span>
            <p className="font-pixel text-[10px] text-gbc-yellow">{titles}</p>
            <p className="font-pixel text-[5px] text-gbc-gray">TÍTULOS</p>
          </div>
          <div className="text-center p-2 bg-gbc-navy/30 border border-gbc-navy">
            <span className="text-xl">👟</span>
            <p className="font-pixel text-[10px] text-gbc-orange">{topScorerAwards}</p>
            <p className="font-pixel text-[5px] text-gbc-gray">ARTILHEIRO</p>
          </div>
          <div className="text-center p-2 bg-gbc-navy/30 border border-gbc-navy">
            <span className="text-xl">🏅</span>
            <p className="font-pixel text-[10px] text-gbc-yellow">{ballonDors}</p>
            <p className="font-pixel text-[5px] text-gbc-gray">BOLA DE OURO</p>
          </div>
          <div className="text-center p-2 bg-gbc-navy/30 border border-gbc-navy">
            <span className="text-xl">🌍</span>
            <p className="font-pixel text-[10px] text-gbc-green">{worldCups}</p>
            <p className="font-pixel text-[5px] text-gbc-gray">COPAS</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="bg-gbc-black/50 border border-gbc-navy p-3 mb-4">
          <h3 className="font-pixel text-[7px] text-gbc-cyan mb-2 text-center">🎖️ CONQUISTAS</h3>
          <div className="grid grid-cols-5 gap-1">
            {ACHIEVEMENTS.map(a => {
              const unlocked = achievements.includes(a.id);
              return (
                <div
                  key={a.id}
                  className={`text-center p-1.5 border ${unlocked ? 'border-gbc-yellow bg-gbc-yellow/10' : 'border-gbc-navy opacity-30'}`}
                  title={`${a.name}: ${a.description}`}
                >
                  <span className="text-lg">{a.icon}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Club Timeline */}
      {clubHistory.length > 0 && (
        <div className="bg-gbc-black/50 border border-gbc-navy p-3 mb-4">
          <h3 className="font-pixel text-[7px] text-gbc-cyan mb-2 text-center">📅 CARREIRA</h3>
          <div className="space-y-1">
            {clubHistory.map((entry, i) => {
              const nextEntry = clubHistory[i + 1];
              const endAge = nextEntry ? nextEntry.age : 35;
              return (
                <div key={i} className="flex items-center gap-2 font-retro text-sm text-gbc-gray">
                  <span className="text-gbc-yellow font-pixel text-[6px] w-16 shrink-0">
                    {entry.age}-{endAge}a
                  </span>
                  <span>{entry.country}</span>
                  <span className="text-gbc-white">{entry.clubName}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2">
        <PixelButton onClick={() => onLeaderboard(score)} variant="gold" fullWidth>
          🏆 VER RANKING
        </PixelButton>
        <PixelButton onClick={onNewGame} variant="primary" fullWidth>
          🎮 NOVO JOGO
        </PixelButton>
      </div>
    </div>
  );
}
