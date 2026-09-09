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
    <div className="max-w-2xl mx-auto w-full p-4 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl animate-fade-in">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-3xl mb-1 block">⭐</span>
        <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-amber-400">
          Crie o seu Atleta • O Início da Jornada
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Dos campinhos de terra e da várzea rumo ao estrelato mundial.
        </p>
      </div>

      <form onSubmit={handleConfirm} className="space-y-5">
        {/* Name, Number & City */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              Nome do Jogador / Apelido
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-bold focus:border-amber-500 focus:outline-none"
              placeholder="Ex: Neymarzinho do Morro"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              Camisa
            </label>
            <input
              type="number"
              min="1"
              max="99"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-bold focus:border-amber-500 focus:outline-none text-center"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Cidade Natal / Onde Cresceu
          </label>
          <input
            type="text"
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-semibold focus:border-amber-500 focus:outline-none"
            placeholder="Ex: Araraquara (SP)"
          />
        </div>

        {/* Position Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
            Posição & Estilo de Jogo
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {POSITIONS.map((pos) => {
              const isSelected = selectedPosition.id === pos.id;
              return (
                <button
                  type="button"
                  key={pos.id}
                  onClick={() => setSelectedPosition(pos)}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    {pos.badge}
                  </span>
                  <div>
                    <p className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-slate-200'}`}>
                      {pos.name}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {pos.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Starting Grassroots Club */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
            Clube Formador (Onde Você Foi Revelado)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {startingClubs.map((club) => {
              const isSelected = selectedClub.id === club.id;
              return (
                <button
                  type="button"
                  key={club.id}
                  onClick={() => setSelectedClub(club)}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-500/15 border-blue-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{club.badge}</span>
                  <span className={`text-xs font-black truncate w-full ${isSelected ? 'text-blue-300' : 'text-slate-200'}`}>
                    {club.name}
                  </span>
                  <span className="text-[10px] text-slate-500">{club.city}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-3">
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <span>✍️</span> ASSINAR PRIMEIRO CONTRATO PROFISSIONAL
          </button>
        </div>
      </form>
    </div>
  );
}
