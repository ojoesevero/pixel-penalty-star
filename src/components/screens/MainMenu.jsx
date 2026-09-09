/* ============================================
   MAIN MENU
   Title screen with game options
   ============================================ */

import React, { useState } from 'react';
import PixelButton from '@/components/ui/PixelButton';
import RetroDialog from '@/components/ui/RetroDialog';

export default function MainMenu({ onNewGame, onContinue, onTraining, onLeaderboard, hasSave }) {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 animate-fade-in">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">⚽</div>
        <h1 className="font-pixel text-[14px] text-gbc-yellow leading-relaxed animate-pulse-glow">
          RUMO AO
        </h1>
        <h1 className="font-pixel text-[14px] text-gbc-yellow leading-relaxed animate-pulse-glow mb-1">
          ESTRELATO
        </h1>
        <p className="font-pixel text-[8px] text-gbc-cyan mt-2 tracking-widest">
          PENALTY EDITION
        </p>
        <div className="mt-3 w-32 h-[2px] bg-gradient-to-r from-transparent via-gbc-purple to-transparent mx-auto" />
      </div>

      {/* Menu Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-[250px]">
        <PixelButton onClick={onNewGame} variant="success" fullWidth>
          🎮 Novo Jogo
        </PixelButton>

        {hasSave && (
          <PixelButton onClick={onContinue} variant="primary" fullWidth>
            ▶️ Continuar
          </PixelButton>
        )}

        <PixelButton onClick={onTraining} variant="gold" fullWidth>
          🎯 Treino Livre
        </PixelButton>

        <PixelButton onClick={onLeaderboard} variant="primary" fullWidth>
          🏆 Ranking
        </PixelButton>

        <PixelButton onClick={() => setShowRules(true)} variant="ghost" fullWidth>
          📖 Como Jogar
        </PixelButton>
      </div>

      {/* Version */}
      <p className="font-pixel text-[6px] text-gbc-dark mt-8">v1.0</p>

      {/* Rules Dialog */}
      {showRules && (
        <RetroDialog title="COMO JOGAR & REGRAS" onClose={() => setShowRules(false)}>
          <div className="space-y-3 text-sm">
            <p>🎯 <strong>Objetivo:</strong> Guie seu jogador dos 17 aos 35 anos conquistando títulos, Bolas de Ouro e a Copa do Mundo!</p>

            <p>⚽ <strong>Temporada:</strong> 3 jogos × 3 pênaltis = máx. 9 gols por temporada.</p>

            <p>🏆 <strong>Título:</strong> 8+ gols na temporada = Campeão do campeonato.</p>
            <p>👟 <strong>Artilheiro:</strong> 9 gols = Prêmio de artilheiro.</p>
            <p>🏅 <strong>Bola de Ouro:</strong> 9 gols em clube Nível 4 OU vencer a Copa.</p>

            <p>📋 <strong>Transferências:</strong></p>
            <ul className="ml-4 list-disc space-y-1">
              <li>9 pts → 2 ofertas superiores</li>
              <li>6-8 pts → 1 superior + 1 mesmo nível</li>
              <li>3-5 pts → 2 do mesmo nível</li>
              <li>2 pts → Apenas renovação</li>
              <li>0-1 pt → Game Over!</li>
            </ul>

            <p>🌍 <strong>Copa do Mundo:</strong> Idades 21, 25, 29 e 33. Exige clube Nível 2+ e média ≥ 6.5.</p>

            <p>🎮 <strong>Controles:</strong> Escolha direção (Esq/Centro/Dir), altura (Rasteiro/Alto) e pare a barra de força no momento certo!</p>
          </div>
        </RetroDialog>
      )}
    </div>
  );
}
