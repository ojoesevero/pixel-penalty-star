/* ============================================
   TRANSFER MARKET
   End-of-season contract offers
   ============================================ */

import React from 'react';
import PixelButton from '@/components/ui/PixelButton';
import { TIERS } from '@/engine/constants';

export default function TransferMarket({ offers, currentClub, seasonGoals, onAccept }) {
  return (
    <div className="p-4 animate-slide-up">
      <div className="text-center mb-4">
        <h2 className="font-pixel text-[10px] text-gbc-yellow">TRANSFERÊNCIAS</h2>
        <div className="mt-1 w-24 h-[2px] bg-gbc-purple mx-auto" />
        <p className="font-retro text-sm text-gbc-gray mt-2">
          {seasonGoals} gols na temporada
        </p>
      </div>

      <div className="space-y-3">
        {offers.map((offer, index) => {
          const isUpgrade = offer.club.tier > currentClub.tier;
          const isRenewal = offer.type === 'renewal';

          return (
            <div
              key={index}
              className={`pixel-border p-3 ${isUpgrade ? 'border-gbc-yellow' : ''}`}
              style={{ backgroundColor: offer.club.colors.primary + '15' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{offer.club.country}</span>
                  <div>
                    <h3 className="font-pixel text-[8px] text-gbc-white">{offer.club.name}</h3>
                    <p className="font-retro text-xs text-gbc-gray">
                      Nível {offer.club.tier} — {TIERS[offer.club.tier].name}
                    </p>
                  </div>
                </div>

                {isUpgrade && (
                  <span className="font-pixel text-[6px] text-gbc-green bg-gbc-green/20 px-2 py-0.5 border border-gbc-green/30">
                    ⬆ PROMOÇÃO
                  </span>
                )}
                {isRenewal && (
                  <span className="font-pixel text-[6px] text-gbc-cyan bg-gbc-cyan/20 px-2 py-0.5 border border-gbc-cyan/30">
                    🔄 RENOVAR
                  </span>
                )}
              </div>

              {/* Club tier indicator */}
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4].map(t => (
                  <div
                    key={t}
                    className={`w-3 h-3 border ${t <= offer.club.tier ? 'bg-gbc-yellow border-gbc-orange' : 'bg-gbc-black border-gbc-navy'}`}
                  />
                ))}
              </div>

              <PixelButton
                onClick={() => onAccept(offer.club)}
                variant={isUpgrade ? 'gold' : isRenewal ? 'primary' : 'success'}
                fullWidth
                size="sm"
              >
                {isRenewal ? '🔄 RENOVAR' : '✍️ ASSINAR'}
              </PixelButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}
