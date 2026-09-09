import React from 'react';
import { formatCurrency } from '@/engine/rpgSystem';
import { sfxVictory, sfxCrowd } from '@/audio/sfx';
import ClubBadge from '@/components/common/ClubBadge';

export default function TransferOffersModal({ offers, player, onAcceptOffer, onDecline }) {
  const isJanuary = offers?.[0]?.window === 'january';

  const handleSign = (offer) => {
    sfxVictory();
    sfxCrowd();
    onAcceptOffer(offer);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-4xl max-h-[95vh] bg-slate-900 border-2 border-amber-500/80 rounded-2xl shadow-[0_0_60px_rgba(245,158,11,0.2)] overflow-hidden my-auto flex flex-col">
        
        {/* Header */}
        <div className={`p-3 sm:p-4 text-center text-slate-950 shrink-0 ${
          isJanuary
            ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-white'
            : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950'
        }`}>
          <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl mb-0.5">
            <span>{isJanuary ? '❄️' : '☀️'}</span>
            <h2 className="text-sm sm:text-base font-black tracking-wider uppercase drop-shadow-sm">
              {isJanuary
                ? 'JANELA DE JANEIRO: MERCADO NACIONAL & AMÉRICA DO SUL'
                : 'JANELA DE JULHO: MERCADO EUROPEU & PETRODÓLARES'}
            </h2>
            <span>✍️</span>
          </div>
          <p className="text-[11px] sm:text-xs font-bold opacity-90">
            {isJanuary
              ? 'Meio de temporada! Clubes da Série A e da Libertadores colocaram propostas na mesa.'
              : 'Fim de temporada europeia! Propostas milionárias e gigantes mundiais chamam.'}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-3 gap-3 overflow-y-auto flex-1">
          {offers.map((offer) => {
            const isMoney = offer.type === 'money';
            const isGlory = offer.type === 'glory';

            return (
              <div
                key={offer.id}
                className={`flex flex-col justify-between p-3 sm:p-3.5 rounded-xl border-2 transition-all shadow-md ${
                  isMoney
                    ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/80 shadow-amber-500/10'
                    : isGlory
                    ? 'bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-950 border-blue-500/80 shadow-blue-500/10'
                    : 'bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/80'
                }`}
              >
                {/* Offer Category Tag */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isMoney
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : isGlory
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {offer.tag}
                    </span>
                    <ClubBadge club={offer.club} className="w-8 h-8" textClassName="text-2xl" />
                  </div>

                  {/* Club info */}
                  <h3 className="text-sm sm:text-base font-black text-white leading-tight">{offer.club.name}</h3>
                  <p className="text-[10px] text-slate-400 mb-2">{offer.club.city} • {offer.club.country}</p>

                  <p className="text-[11px] text-slate-300 italic mb-2.5 border-l-2 border-slate-700 pl-2 leading-tight">
                    "{offer.headline}"
                  </p>

                  {/* Financial Package */}
                  <div className="bg-slate-950/90 p-2 sm:p-2.5 rounded-lg border border-slate-800 mb-2.5 space-y-1.5">
                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-400">Salário Mensal</p>
                      <p className={`text-sm sm:text-base font-black ${isMoney ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {formatCurrency(offer.salary)} <span className="text-[9px] text-slate-400 font-normal">/ mês</span>
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-400">Luvas de Assinatura (Na Conta)</p>
                      <p className="text-xs sm:text-sm font-black text-white">
                        {offer.signingBonus > 0 ? formatCurrency(offer.signingBonus) : 'Sem luvas (R$ 0)'}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-400">Status no Elenco</p>
                      <p className="text-[11px] font-bold text-slate-300">{offer.statusRole}</p>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="space-y-1.5 mb-2.5 text-[10px]">
                    <div>
                      <p className="font-bold text-emerald-400 uppercase text-[9px]">Vantagens:</p>
                      <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                        {offer.pros.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-rose-400 uppercase text-[9px]">Preço a pagar:</p>
                      <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                        {offer.cons.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Accept Button */}
                <button
                  onClick={() => handleSign(offer)}
                  className={`w-full py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-md ${
                    isMoney
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                      : isGlory
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                  }`}
                >
                  Assinar Contrato ✍️
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer with Decline / Stay Button */}
        {onDecline && (
          <div className="p-2 sm:p-2.5 bg-slate-950/90 border-t border-slate-800 text-center shrink-0">
            <button
              onClick={onDecline}
              className="text-xs text-slate-400 hover:text-white font-bold transition underline cursor-pointer"
            >
              Recusar todas as propostas e continuar no clube atual ❯
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
