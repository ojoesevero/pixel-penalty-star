/* ============================================
   CHARACTER CREATION
   Player customization + attribute distribution
   ============================================ */

import React, { useState, useMemo } from 'react';
import PixelButton from '@/components/ui/PixelButton';
import StarRating from '@/components/ui/StarRating';
import {
  POSITIONS, ATTRIBUTES, FREE_ATTRIBUTE_POINTS,
  SKIN_COLORS, HAIR_COLORS, EYE_COLORS, MAX_ATTRIBUTE, MIN_ATTRIBUTE,
} from '@/engine/constants';
import { getStartingClubs } from '@/engine/career';

export default function CharacterCreate({ onComplete, onBack }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(10);
  const [position, setPosition] = useState(POSITIONS[3]); // Atacante default
  const [skinColor, setSkinColor] = useState(SKIN_COLORS[1]);
  const [hairColor, setHairColor] = useState(HAIR_COLORS[0]);
  const [eyeColor, setEyeColor] = useState(EYE_COLORS[0]);

  // Attributes start at 1
  const [attrs, setAttrs] = useState({
    defense: 1,
    attack: 1,
    passing: 1,
    speed: 1,
    resistance: 1,
  });

  // Calculate spent points (minus the 5 base points at 1 each)
  const spentPoints = Object.values(attrs).reduce((sum, v) => sum + (v - MIN_ATTRIBUTE), 0);
  const remainingPoints = FREE_ATTRIBUTE_POINTS - spentPoints;

  // Apply position bonus
  const finalAttrs = useMemo(() => {
    const result = { ...attrs };
    if (position?.bonus && result[position.bonus] < MAX_ATTRIBUTE) {
      result[position.bonus] = Math.min(MAX_ATTRIBUTE, result[position.bonus] + 1);
    }
    return result;
  }, [attrs, position]);

  const handleAttrChange = (attrId, newValue) => {
    const currentValue = attrs[attrId];
    const diff = newValue - currentValue;

    // Can't go below 1
    if (newValue < MIN_ATTRIBUTE) return;
    // Can't go above 5
    if (newValue > MAX_ATTRIBUTE) return;
    // Can't spend more than remaining
    if (diff > 0 && diff > remainingPoints) return;

    setAttrs(prev => ({ ...prev, [attrId]: newValue }));
  };

  const startingClubs = useMemo(() => getStartingClubs(), []);
  const [selectedClub, setSelectedClub] = useState(startingClubs[0]);

  const canStart = name.trim().length >= 2 && remainingPoints === 0;

  const handleStart = () => {
    if (!canStart) return;
    onComplete({
      player: {
        name: name.trim(),
        number,
        position: position.id,
        positionName: position.name,
        skinColor: skinColor.hex,
        hairColor: hairColor.hex,
        eyeColor: eyeColor.hex,
        attributes: finalAttrs,
      },
      club: selectedClub,
    });
  };

  return (
    <div className="p-4 animate-slide-up">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-pixel text-[10px] text-gbc-yellow">CRIAR JOGADOR</h2>
        <div className="mt-1 w-24 h-[2px] bg-gbc-purple mx-auto" />
      </div>

      {/* Name & Number */}
      <div className="space-y-3 mb-4">
        <div>
          <label className="font-pixel text-[7px] text-gbc-gray block mb-1">NOME</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={16}
            placeholder="Seu nome..."
            className="w-full bg-gbc-black border-2 border-gbc-navy text-gbc-white font-retro text-lg px-3 py-1.5 focus:border-gbc-cyan outline-none"
          />
        </div>

        <div>
          <label className="font-pixel text-[7px] text-gbc-gray block mb-1">CAMISA Nº</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(Math.min(99, Math.max(1, parseInt(e.target.value) || 1)))}
            min={1}
            max={99}
            className="w-24 bg-gbc-black border-2 border-gbc-navy text-gbc-yellow font-pixel text-[12px] px-3 py-1.5 focus:border-gbc-cyan outline-none text-center"
          />
        </div>
      </div>

      {/* Position */}
      <div className="mb-4">
        <label className="font-pixel text-[7px] text-gbc-gray block mb-2">POSIÇÃO</label>
        <div className="grid grid-cols-2 gap-2">
          {POSITIONS.map(pos => (
            <button
              key={pos.id}
              onClick={() => setPosition(pos)}
              className={`
                font-pixel text-[7px] px-2 py-1.5 border-2 cursor-pointer transition-all
                ${position.id === pos.id
                  ? 'bg-gbc-blue border-gbc-cyan text-gbc-white'
                  : 'bg-gbc-black border-gbc-navy text-gbc-gray hover:border-gbc-dark'
                }
              `}
            >
              {pos.name}
            </button>
          ))}
        </div>
        <p className="font-retro text-xs text-gbc-teal mt-1">
          Bônus: +1 {ATTRIBUTES.find(a => a.id === position.bonus)?.name}
        </p>
      </div>

      {/* Appearance */}
      <div className="mb-4">
        <label className="font-pixel text-[7px] text-gbc-gray block mb-2">APARÊNCIA</label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[6px] text-gbc-gray w-12">Pele</span>
            <div className="flex gap-1">
              {SKIN_COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSkinColor(c)}
                  className={`w-6 h-6 rounded-sm border-2 cursor-pointer transition-all ${skinColor.id === c.id ? 'border-gbc-yellow scale-110' : 'border-gbc-navy'}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[6px] text-gbc-gray w-12">Cabelo</span>
            <div className="flex gap-1">
              {HAIR_COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setHairColor(c)}
                  className={`w-6 h-6 rounded-sm border-2 cursor-pointer transition-all ${hairColor.id === c.id ? 'border-gbc-yellow scale-110' : 'border-gbc-navy'}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[6px] text-gbc-gray w-12">Olhos</span>
            <div className="flex gap-1">
              {EYE_COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setEyeColor(c)}
                  className={`w-6 h-6 rounded-sm border-2 cursor-pointer transition-all ${eyeColor.id === c.id ? 'border-gbc-yellow scale-110' : 'border-gbc-navy'}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Attributes */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="font-pixel text-[7px] text-gbc-gray">ATRIBUTOS</label>
          <span className={`font-pixel text-[8px] ${remainingPoints > 0 ? 'text-gbc-orange animate-blink' : 'text-gbc-teal'}`}>
            {remainingPoints} pts
          </span>
        </div>
        <div className="space-y-1.5 bg-gbc-black/50 p-3 border border-gbc-navy">
          {ATTRIBUTES.map(attr => {
            const isBonus = position.bonus === attr.id;
            const baseVal = attrs[attr.id];
            const finalVal = finalAttrs[attr.id];

            return (
              <div key={attr.id} className="flex items-center gap-1">
                <span className="text-sm w-5">{attr.icon}</span>
                <span className="font-pixel text-[6px] text-gbc-gray w-20 shrink-0">
                  {attr.name}
                </span>
                <StarRating
                  value={baseVal}
                  onChange={(v) => handleAttrChange(attr.id, v)}
                />
                {isBonus && (
                  <span className="font-pixel text-[6px] text-gbc-teal ml-1">+1</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Starting Club */}
      <div className="mb-5">
        <label className="font-pixel text-[7px] text-gbc-gray block mb-2">CLUBE INICIAL</label>
        <div className="grid grid-cols-2 gap-2">
          {startingClubs.map(club => (
            <button
              key={club.id}
              onClick={() => setSelectedClub(club)}
              className={`
                font-pixel text-[6px] px-2 py-2 border-2 cursor-pointer transition-all text-center
                ${selectedClub.id === club.id
                  ? 'border-gbc-yellow text-gbc-white'
                  : 'border-gbc-navy text-gbc-gray hover:border-gbc-dark'
                }
              `}
              style={{
                backgroundColor: selectedClub.id === club.id ? club.colors.primary + '40' : 'transparent',
              }}
            >
              {club.country} {club.name}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <PixelButton onClick={onBack} variant="ghost" size="sm">
          ◀ VOLTAR
        </PixelButton>
        <PixelButton
          onClick={handleStart}
          variant="success"
          disabled={!canStart}
          fullWidth
        >
          ⚽ INICIAR CARREIRA
        </PixelButton>
      </div>

      {!canStart && name.trim().length >= 2 && (
        <p className="font-pixel text-[6px] text-gbc-orange text-center mt-2 animate-blink">
          Distribua todos os {FREE_ATTRIBUTE_POINTS} pontos!
        </p>
      )}
    </div>
  );
}
