import React, { useState } from 'react';
import { POSITIONS } from '@/engine/rpgSystem';
import { getStartingClubs } from '@/engine/clubsData';
import { sfxWhistle } from '@/audio/sfx';

export default function NewCharacterCreate({ onStartCareer }) {
  const startingClubs = getStartingClubs();

  const [name, setName] = useState('Gabriel "Raio" Silva');
  const [number, setNumber] = useState(10);
  const [hometown, setHometown] = useState('Porto Alegre (RS)');
  const [selectedPosition, setSelectedPosition] = useState(POSITIONS[0]);
  const [selectedClub, setSelectedClub] = useState(startingClubs[0]);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    sfxWhistle();

    const initialPlayer = {
      name: name.trim(),
      number: Number(number) || 10,
      hometown: hometown.trim() || 'Brasil',
      age: 17,
      positionId: selectedPosition.id,
      positionName: selectedPosition.name,
      stats: { ...selectedPosition.baseStats },
      energy: 100,
      coachTrust: 75,
      fanLove: 70,
      mediaHype: 35,
      bankBalance: 3500, // Primeiro pé de meia da base
      monthlySalary: 3000,
      lifestyleItems: [],
      careerHistory: [
        {
          clubId: selectedClub.id,
          clubName: selectedClub.name,
          age: 17,
          league: selectedClub.league,
        },
      ],
    };

    onStartCareer(initialPlayer, selectedClub);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2.5 sm:p-4 bg-slate-900/95 border border-slate-800 rounded-xl shadow-2xl animate-fade-in my-auto flex flex-col justify-center">
      {/* Compact Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xl">⭐</span>
          <div>
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400">
              Criação de Atleta • Início da Carreira
            </h2>
            <p className="text-[10px] text-slate-400">
              Da várzea e campeonatos regionais rumo à consagração mundial.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
          Idade: 17 anos
        </span>
      </div>

      <form onSubmit={handleConfirm} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
        {/* Left Column: Player Identity & Position Archetype */}
        <div className="space-y-2.5">
          {/* Name & Number */}
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-3">
              <label className="block text-[10px] font-bold text-slate-300 uppercase mb-0.5">
                Nome do Jogador / Apelido
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold focus:border-amber-500 focus:outline-none"
                placeholder="Ex: Neymarzinho do Morro"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-300 uppercase mb-0.5 text-center">
                Camisa
              </label>
              <input
                type="number"
                min="1"
                max="99"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white font-bold focus:border-amber-500 focus:outline-none text-center"
              />
            </div>
          </div>

          {/* Hometown */}
          <div>
            <label className="block text-[10px] font-bold text-slate-300 uppercase mb-0.5">
              Cidade Natal / Origem
            </label>
            <input
              type="text"
              value={hometown}
              onChange={(e) => setHometown(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-medium focus:border-amber-500 focus:outline-none"
              placeholder="Ex: Porto Alegre (RS)"
            />
          </div>

          {/* Position Selection (2x2 Grid) */}
          <div>
            <label className="block text-[10px] font-bold text-slate-300 uppercase mb-1">
              Posição & Estilo de Jogo
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {POSITIONS.map((pos) => {
                const isSelected = selectedPosition.id === pos.id;
                return (
                  <button
                    type="button"
                    key={pos.id}
                    onClick={() => setSelectedPosition(pos)}
                    className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg shrink-0">{pos.badge}</span>
                    <div className="min-w-0">
                      <p className={`text-[11px] font-bold truncate ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                        {pos.name}
                      </p>
                      <p className="text-[9px] text-slate-500 truncate">
                        {pos.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Grassroots Club + Submit CTA */}
        <div className="space-y-2.5 flex flex-col justify-between h-full">
          <div>
            <label className="block text-[10px] font-bold text-slate-300 uppercase mb-1">
              Clube Formador (Onde Você Foi Revelado)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {startingClubs.map((club) => {
                const isSelected = selectedClub.id === club.id;
                return (
                  <button
                    type="button"
                    key={club.id}
                    onClick={() => setSelectedClub(club)}
                    className={`p-2 rounded-lg border text-center flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-500/20 border-blue-400 text-white shadow-sm'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xl">{club.badge}</span>
                    <span className={`text-[11px] font-black truncate w-full ${isSelected ? 'text-blue-300' : 'text-slate-200'}`}>
                      {club.name}
                    </span>
                    <span className="text-[9px] text-slate-500 truncate w-full">{club.city}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
            >
              <span>✍️</span> ASSINAR PRIMEIRO CONTRATO PROFISSIONAL
            </button>
            <p className="text-[9px] text-slate-500 text-center mt-1">
              Salário inicial: R$ 3.000/mês + Luvas da base: R$ 3.500
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
