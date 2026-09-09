import React from 'react';

export default function ClubBadge({ club, className = 'w-6 h-6', textClassName = 'text-xl' }) {
  if (!club) return null;

  return (
    <span className="inline-flex items-center justify-center shrink-0">
      {club.logoUrl ? (
        <img
          src={club.logoUrl}
          alt={club.name}
          className={`${className} object-contain`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.parentElement?.querySelector('.club-fallback-badge');
            if (fallback) fallback.classList.remove('hidden');
          }}
        />
      ) : null}
      <span className={`club-fallback-badge ${textClassName} ${club.logoUrl ? 'hidden' : 'inline'}`}>
        {club.badge || '⚽'}
      </span>
    </span>
  );
}
