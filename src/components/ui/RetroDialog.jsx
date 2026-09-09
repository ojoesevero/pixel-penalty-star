/* ============================================
   RETRO DIALOG
   GBC-style modal popup
   ============================================ */

import React from 'react';
import PixelButton from './PixelButton';

export default function RetroDialog({ title, children, onClose, closeLabel = 'FECHAR' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-[380px] pixel-border bg-gbc-dark p-4 animate-bounce-in">
        {/* Title bar */}
        {title && (
          <div className="bg-gbc-navy px-3 py-1.5 -mx-4 -mt-4 mb-3 border-b-2 border-gbc-purple">
            <h2 className="font-pixel text-[10px] text-gbc-yellow text-center">{title}</h2>
          </div>
        )}

        {/* Content */}
        <div className="font-retro text-gbc-white text-lg leading-relaxed max-h-[60vh] overflow-y-auto">
          {children}
        </div>

        {/* Close button */}
        {onClose && (
          <div className="mt-4 flex justify-center">
            <PixelButton onClick={onClose} variant="ghost" size="sm">
              {closeLabel}
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  );
}
