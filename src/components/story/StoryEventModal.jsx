import React, { useState } from 'react';
import { sfxWhistle, sfxSave } from '@/audio/sfx';

export default function StoryEventModal({ event, onResolveEvent }) {
  const [chosenOption, setChosenOption] = useState(null);

  const handlePick = (opt) => {
    setChosenOption(opt);
    sfxWhistle();
  };

  const handleContinue = () => {
    if (chosenOption) {
      onResolveEvent(chosenOption);
    }
  };

  // Helper to render effect pill
  const renderEffectPill = (key, val) => {
    if (!val) return null;
    let label = '';
    let colorClass = val > 0 ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40' : 'bg-red-950/80 text-red-400 border-red-500/40';
    const sign = val > 0 ? `+${val}` : `${val}`;

    switch (key) {
      case 'coachTrust':
        label = `${sign} Confiança`;
        break;
      case 'fanLove':
        label = `${sign} Torcida`;
        break;
      case 'mediaHype':
        label = `${sign} Mídia`;
        break;
      case 'energy':
        label = `${sign} Energia`;
        break;
      case 'composure':
        label = `${sign} Compostura`;
        break;
      case 'money':
        label = val > 0 ? `+R$ ${val.toLocaleString('pt-BR')}` : `-R$ ${Math.abs(val).toLocaleString('pt-BR')}`;
        colorClass = val > 0 ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' : 'bg-rose-950/80 text-rose-400 border-rose-500/40';
        break;
      default:
        label = `${key}: ${sign}`;
    }

    return (
      <span
        key={key}
        className={`text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full border ${colorClass}`}
      >
        {label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg max-h-[92dvh] bg-slate-900 border-2 border-amber-500/80 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.3)] flex flex-col overflow-hidden my-auto">
        
        {/* Newspaper / Dressing Room Header */}
        <div className="shrink-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 py-2 px-3 text-center border-b border-amber-400/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">📰</span>
            <h3 className="text-xs sm:text-sm font-black tracking-wider text-white uppercase drop-shadow">
              VESTIÁRIO & CRISES
            </h3>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-950 bg-amber-300 px-2.5 py-0.5 rounded-full shadow-sm">
            {event.tag || 'Dilema'}
          </span>
        </div>

        {/* Story Content Area */}
        <div className="p-3 sm:p-4 flex flex-col gap-3 overflow-y-auto flex-1 custom-scrollbar">
          {/* Situation Briefing */}
          <div className="bg-slate-950/90 p-3 sm:p-3.5 rounded-xl border border-amber-500/20 shadow-inner">
            <h4 className="text-xs sm:text-sm font-black text-amber-300 mb-1.5 flex items-center gap-1.5">
              {event.title}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed font-medium">
              {event.description}
            </p>
          </div>

          {!chosenOption ? (
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">
                ⚡ Escolha sua postura profissional:
              </p>

              {event.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handlePick(option)}
                  className="p-3 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 hover:border-amber-400 transition-all text-left flex flex-col gap-1.5 cursor-pointer active:scale-[0.99] shadow-sm group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition">
                      👉 {option.label}
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs text-slate-300 leading-snug">
                    {option.description}
                  </span>

                  {/* Effects Preview Pills */}
                  {option.effects && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {Object.entries(option.effects).map(([key, val]) =>
                        renderEffectPill(key, val)
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 animate-slide-up text-center py-1">
              <div className="bg-slate-950/95 p-3.5 sm:p-4 rounded-xl border-2 border-amber-500/50 shadow-xl">
                <span className="text-2xl mb-1 block">📢</span>
                <p className="text-[11px] font-black uppercase tracking-wider text-amber-400 mb-1.5">
                  Desfecho da Situação:
                </p>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-semibold italic">
                  "{chosenOption.resultText}"
                </p>

                {/* Effects Received Summary */}
                {chosenOption.effects && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-wrap justify-center gap-1.5">
                    {Object.entries(chosenOption.effects).map(([key, val]) =>
                      renderEffectPill(key, val)
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={handleContinue}
                className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
              >
                Continuar Carreira ❯
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
