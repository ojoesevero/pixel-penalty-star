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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-lg max-h-[95vh] bg-slate-900 border-2 border-amber-500/80 rounded-xl shadow-[0_0_40px_rgba(245,158,11,0.25)] flex flex-col overflow-hidden my-auto">
        
        {/* Newspaper Style Header */}
        <div className="shrink-0 bg-gradient-to-r from-amber-600 to-orange-600 py-1.5 px-3 text-center border-b border-amber-400/40">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-950 bg-amber-300 px-2 py-0.5 rounded-full">
              {event.tag}
            </span>
            <h3 className="text-xs sm:text-sm font-black tracking-wide text-white uppercase drop-shadow">
              DILEMA DO VESTIÁRIO
            </h3>
          </div>
        </div>

        {/* Story Content */}
        <div className="p-3 sm:p-4 flex flex-col gap-2.5 overflow-y-auto flex-1">
          <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-lg border border-slate-800">
            <h4 className="text-xs sm:text-sm font-black text-amber-300 mb-1">{event.title}</h4>
            <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed font-medium">
              {event.description}
            </p>
          </div>

          {!chosenOption ? (
            <div className="flex flex-col gap-2.5">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Qual será a sua postura?
              </p>

              {event.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handlePick(option)}
                  className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 hover:border-amber-500/80 transition-all text-left flex flex-col gap-1 cursor-pointer active:scale-[0.99] shadow-sm"
                >
                  <span className="text-xs sm:text-sm font-bold text-white hover:text-amber-300 transition">
                    👉 {option.label}
                  </span>
                  <span className="text-xs text-slate-400">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 animate-slide-up text-center py-2">
              <div className="bg-slate-950/90 p-4 rounded-xl border border-amber-500/40">
                <p className="text-xs font-bold uppercase text-amber-400 mb-1">Desfecho da Situação:</p>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  "{chosenOption.resultText}"
                </p>
              </div>

              <button
                onClick={handleContinue}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
              >
                Seguir em Frente ❯
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
