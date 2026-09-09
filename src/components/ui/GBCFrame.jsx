/* ============================================
   GBC FRAME
   Game Boy Color visual wrapper
   ============================================ */

import React from 'react';

export default function GBCFrame({ children }) {
  return (
    <div className="w-full max-w-[420px] mx-auto min-h-[100dvh] md:min-h-0 md:h-[720px] flex flex-col bg-gbc-black relative">
      {/* Top bezel */}
      <div className="bg-gbc-purple px-3 py-2 flex items-center justify-center shrink-0">
        <h1 className="font-pixel text-[8px] text-gbc-yellow tracking-wider uppercase">
          ⚽ Penalty Edition
        </h1>
      </div>

      {/* Screen area */}
      <div className="flex-1 relative overflow-hidden bg-gbc-dark scanlines crt-glow">
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>

      {/* Bottom bezel */}
      <div className="bg-gbc-purple px-3 py-1 flex items-center justify-center shrink-0">
        <span className="font-pixel text-[6px] text-gbc-gray opacity-60 tracking-widest">
          RUMO AO ESTRELATO
        </span>
      </div>
    </div>
  );
}
