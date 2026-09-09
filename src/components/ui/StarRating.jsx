/* ============================================
   STAR RATING
   Attribute selector / display (1-5 stars)
   ============================================ */

import React from 'react';

export default function StarRating({
  value = 0,
  max = 5,
  onChange,
  readonly = false,
  size = 'md',
  label = '',
}) {
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="font-pixel text-[8px] text-gbc-gray w-20 shrink-0">{label}</span>
      )}
      <div className={`flex gap-0.5 ${sizeClass}`}>
        {Array.from({ length: max }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => !readonly && onChange?.(i + 1)}
            disabled={readonly}
            className={`
              transition-all duration-100 cursor-pointer disabled:cursor-default
              ${i < value ? 'text-gbc-yellow drop-shadow-[0_0_4px_rgba(255,205,117,0.5)]' : 'text-gbc-dark'}
              ${!readonly ? 'hover:scale-110' : ''}
            `}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}
