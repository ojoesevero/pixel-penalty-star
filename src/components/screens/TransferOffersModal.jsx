import React, { useState } from 'react';
import { formatCurrency } from '@/engine/rpgSystem';
import { sfxVictory, sfxCrowd } from '@/audio/sfx';

export default function TransferOffersModal({ offers, player, onAcceptOffer }) {
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleSign = (offer) => {
    sfxVictory();
    sfxCrowd();
    onAcceptOffer(offer);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-4xl bg-slate-900 border-2 border-amber-500/80 rounded-2xl shadow-[0_0_60px_rgba(245,158,11,0.2)] overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 p-4 text-center text-slate-950">
          <div className="flex items-center justify-center gap-2 text-2xl mb-1">
            <span>💼</span>
            <h2 className="text-base sm:text-lg font-black tracking-wider uppercase">
              MERCADO DA BOLA: HORA DE DECIDIR O SEU FUTURO
            </h2>
            <span>✍️</span>
          </div>
          <p className="text-xs font-bold text-slate-900">
            Seu empresário colocou as propostas oficiais na mesa. Qual rumo você dará para a sua vida?
          </p>
        </div>

        {/* Offers Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {offers.map((offer) => {
            const isMoney = offer.type === 'money';
            const isGlory = offer.type === 'glory';

            return (
              <div
                key={offer.id}
                className={`flex flex-col justify-between p-4 rounded-xl border-2 transition-all shadow-lg ${
                  isMoney
                    ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/80 shadow-amber-500/10'
                    : isGlory
                    ? 'bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-950 border-blue-500/80 shadow-blue-500/10'
                    : 'bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/80'
                }`}
              >
                {/* Offer Category Tag */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      isMoney
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : isGlory
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {offer.tag}
                    </span>
                    <span className="text-2xl">{offer.club.badge}</span>
                  </div>

                  {/* Club info */}
                  <h3 className="text-base font-black text-white">{offer.club.name}</h3>
                  <p className="text-xs text-slate-400 mb-3">{offer.club.city} • {offer.club.country}</p>

                  <p className="text-xs text-slate-300 italic mb-4 border-l-2 border-slate-700 pl-2">
                    "{offer.headline}"
                  </p>

                  {/* Financial Package */}
                  <div className="bg-slate-950/90 p-3 rounded-lg border border-slate-800 mb-4 space-y-2">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Salário Mensal</p>
                      <p className={`text-base font-black ${isMoney ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {formatCurrency(offer.salary)} / mês
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Luvas de Assinatura (Na Conta)</p>
                      <p className="text-sm font-black text-white">
                        {offer.signingBonus > 0 ? formatCurrency(offer.signingBonus) : 'Sem luvas (R$ 0)'}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Status no Elenco</p>
                      <p className="text-xs font-bold text-slate-300">{offer.statusRole}</p>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="space-y-2 mb-4 text-xs">
                    <div>
                      <p className="text-[10px] font-bold text-emerald-400 uppercase">Vantagens:</p>
                      <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5">
                        {offer.pros.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-rose-400 uppercase">Preço a pagar:</p>
                      <ul className="list-disc list-inside text-slate-400 text-[11px] space-y-0.5">
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
                  className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-md ${
                    isMoney
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                      : isGlory
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                  }`}
                >
                  Assinar com o {offer.club.name} ✍️
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
