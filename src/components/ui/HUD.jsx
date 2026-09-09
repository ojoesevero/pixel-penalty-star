/* ============================================
   HUD
   Fixed top bar with career info and mute toggle
   ============================================ */

import React, { useState } from 'react';
import { isMuted, toggleMute } from '@/audio/sfx';

export default function HUD({ age, club, careerAvg, titles, ballonDors, worldCups }) {
  const [muted, setMuted] = useState(isMuted());

  const handleToggleMute = () => {
    const newState = toggleMute();
    setMuted(newState);
  };

  return (
    <div className="bg-hud-bg/90 backdrop-blur-sm px-3 py-1.5 flex items-center justify-between gap-2 border-b border-gbc-navy shrink-0">
      {/* Left: Age & Club */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-pixel text-[7px] text-gbc-yellow shrink-0">{age}a</span>
        {club && (
          <span className="font-pixel text-[6px] text-gbc-white truncate">
            {club.country} {club.name}
          </span>
        )}
      </div>

      {/* Center: Stats */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="font-pixel text-[6px] text-gbc-cyan" title="Média de Gols">
          ⚽{careerAvg}
        </span>
        {titles > 0 && (
          <span className="font-pixel text-[6px] text-gbc-yellow" title="Títulos">
            🏆{titles}
          </span>
        )}
        {ballonDors > 0 && (
          <span className="font-pixel text-[6px] text-gbc-orange" title="Bolas de Ouro">
            🏅{ballonDors}
          </span>
        )}
        {worldCups > 0 && (
          <span className="font-pixel text-[6px] text-gbc-green" title="Copas do Mundo">
            🌍{worldCups}
          </span>
        )}
      </div>

      {/* Right: Mute */}
      <button
        onClick={handleToggleMute}
        className="font-retro text-lg cursor-pointer hover:scale-110 transition-transform shrink-0"
        title={muted ? 'Ativar som' : 'Silenciar'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </div>
  );
}
