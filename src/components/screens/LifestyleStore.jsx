import React from 'react';
import { LIFESTYLE_CATALOG, formatCurrency } from '@/engine/rpgSystem';
import { sfxVictory } from '@/audio/sfx';

export default function LifestyleStore({ player, onBuyItem, onBack }) {
  const ownedIds = player.lifestyleItems || [];

  const handleBuy = (item) => {
    if (player.bankBalance < item.cost) {
      alert('Saldo insuficiente na conta bancária!');
      return;
    }
    sfxVictory();
    onBuyItem(item);
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-base sm:text-lg font-black text-amber-400 uppercase tracking-wide flex items-center gap-2">
            <span>🛍️</span> Gestão de Patrimônio & Estilo de Vida
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Invista no seu corpo, ajude quem esteve com você desde a base ou desfrute da vida boa.
          </p>
        </div>

        <div className="bg-emerald-950/80 border border-emerald-500/50 px-4 py-2 rounded-xl text-right">
          <p className="text-[10px] uppercase font-bold text-emerald-400">Saldo Disponível em Conta</p>
          <p className="text-base sm:text-lg font-black text-emerald-300">
            {formatCurrency(player.bankBalance || 0)}
          </p>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {LIFESTYLE_CATALOG.map((item) => {
          const isOwned = ownedIds.includes(item.id);
          const canAfford = player.bankBalance >= item.cost;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                isOwned
                  ? 'bg-emerald-950/20 border-emerald-500/40 opacity-90'
                  : canAfford
                  ? 'bg-slate-900/80 border-slate-700 hover:border-amber-500/60 shadow-md'
                  : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-lg bg-slate-800 border border-slate-700">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">{item.name}</h3>
                      <span className={`text-[10px] font-semibold uppercase ${
                        item.category === 'career' ? 'text-blue-400' : item.category === 'family' ? 'text-amber-400' : 'text-purple-400'
                      }`}>
                        {item.category === 'career' ? 'Carreira & Saúde' : item.category === 'family' ? 'Família & Raízes' : 'Luxo & Status'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Investimento</p>
                  <p className="text-xs sm:text-sm font-black text-amber-400">
                    {formatCurrency(item.cost)}
                  </p>
                </div>

                {isOwned ? (
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center gap-1">
                    ✓ Adquirido
                  </span>
                ) : (
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      canAfford
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    Comprar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Back to Hub Button */}
      <div className="pt-2">
        <button
          onClick={onBack}
          className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition cursor-pointer border border-slate-700"
        >
          ◀ Voltar para o Centro de Treinamento
        </button>
      </div>
    </div>
  );
}
