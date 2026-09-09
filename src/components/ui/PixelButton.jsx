/* ============================================
   PIXEL BUTTON
   Retro styled button with sound and variants
   ============================================ */

import React from 'react';
import { sfxClick } from '@/audio/sfx';

const VARIANTS = {
  primary: 'bg-gbc-blue hover:bg-gbc-cyan text-gbc-white border-gbc-navy',
  success: 'bg-gbc-teal hover:bg-gbc-green text-gbc-black border-field-dark',
  danger: 'bg-gbc-red hover:bg-gbc-pink text-gbc-white border-gbc-magenta',
  gold: 'bg-gbc-orange hover:bg-gbc-yellow text-gbc-black border-gbc-purple',
  ghost: 'bg-transparent hover:bg-gbc-dark text-gbc-gray border-gbc-dark hover:border-gbc-gray',
};

const SIZES = {
  sm: 'text-[8px] px-3 py-1.5',
  md: 'text-[10px] px-4 py-2',
  lg: 'text-[12px] px-6 py-3',
};

export default function PixelButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    sfxClick();
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        font-pixel uppercase tracking-wider
        border-2 cursor-pointer
        transition-all duration-100
        active:translate-y-[2px] active:shadow-none
        disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0
        shadow-[2px_2px_0_rgba(0,0,0,0.5)]
        ${VARIANTS[variant] || VARIANTS.primary}
        ${SIZES[size] || SIZES.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
