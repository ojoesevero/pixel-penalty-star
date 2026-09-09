import React, { useState, useEffect, useRef } from 'react';
import { generateMatchDuels } from '@/engine/tsubasaMatch';
import TsubasaDuelModal from '@/components/match/TsubasaDuelModal';
import { sfxCrowd, sfxVictory, sfxWhistle } from '@/audio/sfx';
import ClubBadge from '@/components/common/ClubBadge';

export default function MatchScreen({
  player,
  currentClub,
  opponentClub,
  onMatchComplete,
}) {
  const [minute, setMinute] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [playerGoals, setPlayerGoals] = useState(0);
  const [playerAssists, setPlayerAssists] = useState(0);
  const [eventsFeed, setEventsFeed] = useState([]);
  const [activeDuel, setActiveDuel] = useState(null);
  const [matchEnded, setMatchEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const duelsRef = useRef(generateMatchDuels(opponentClub, player.positionId));
  const resolvedDuelsRef = useRef(new Set());

  // Match loop clock
  useEffect(() => {
    if (!isPlaying || matchEnded || activeDuel) return;

    const interval = setInterval(() => {
      setMinute((prev) => {
        const nextMin = prev + 1;

        // Check if any duel is scheduled for this minute
        const nextDuel = duelsRef.current.find(
          (d) => d.minute === nextMin && !resolvedDuelsRef.current.has(d.id)
        );

        if (nextDuel) {
          resolvedDuelsRef.current.add(nextDuel.id);
          setActiveDuel(nextDuel);
          return nextMin;
        }

        // Random background match commentary
        if (nextMin % 15 === 0 && nextMin < 90) {
          const comments = [
            `Equipe do ${currentClub.name} troca passes e constrói jogada no meio-campo.`,
            `${opponentClub.name} aperta a saída de bola com marcação alta!`,
            `Gira a bola! A torcida canta alto nas arquibancadas do ${currentClub.stadium}!`,
            `Falta tática no círculo central. O árbitro adverte verbalmente.`,
          ];
          const comment = comments[Math.floor(Math.random() * comments.length)];
          setEventsFeed((f) => [`${nextMin}' — ${comment}`, ...f.slice(0, 5)]);
        }

        // Random opponent goal chance
        if (nextMin === 42 && Math.random() < 0.35) {
          setAwayScore((s) => s + 1);
          setEventsFeed((f) => [
            `⚽ 42' — GOL do ${opponentClub.name}! Contra-ataque fulminante pelo lado direito!`,
            ...f.slice(0, 5),
          ]);
        }

        if (nextMin >= 90) {
          clearInterval(interval);
          setMatchEnded(true);
          sfxWhistle();
          sfxVictory();
          return 90;
        }

        return nextMin;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, matchEnded, activeDuel, currentClub, opponentClub]);

  const handleDuelComplete = (outcome) => {
    setActiveDuel(null);

    if (outcome.isGoal) {
      setHomeScore((s) => s + 1);
      setPlayerGoals((g) => g + 1);
      setEventsFeed((f) => [
        `⚽ ${minute}' — GOOOOOOOL DO ${currentClub.name}! ${player.name} com um golaço antológico!`,
        ...f.slice(0, 5),
      ]);
    } else if (outcome.isAssist) {
      setHomeScore((s) => s + 1);
      setPlayerAssists((a) => a + 1);
      setEventsFeed((f) => [
        `👟 ${minute}' — GOOOOOL! Passe cirúrgico de ${player.name} para o companheiro estufar as redes!`,
        ...f.slice(0, 5),
      ]);
    } else if (outcome.success) {
      setEventsFeed((f) => [
        `✨ ${minute}' — Pintura de jogada! ${player.name} desconserta a zaga do ${opponentClub.name}!`,
        ...f.slice(0, 5),
      ]);
    } else {
      setEventsFeed((f) => [
        `❌ ${minute}' — O lance foi bloqueado no último instante pela zaga adversária!`,
        ...f.slice(0, 5),
      ]);
    }
  };

  const handleWrapUpMatch = () => {
    // Calculate performance rating
    const rating = Math.min(10, Math.max(6.0, 6.5 + playerGoals * 1.5 + playerAssists * 1.0));
    const won = homeScore > awayScore;
    const draw = homeScore === awayScore;

    onMatchComplete({
      homeScore,
      awayScore,
      playerGoals,
      playerAssists,
      rating: Number(rating.toFixed(1)),
      won,
      draw,
    });
  };

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 animate-fade-in">
      {/* Stadium Header & Scoreboard */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-2.5 sm:p-3 rounded-xl border border-slate-800 shadow-md">
        <div className="flex justify-between items-center text-[10px] sm:text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">
          <span>🏟️ {currentClub.stadium}</span>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full font-bold text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            {matchEnded ? 'FIM DE JOGO' : `${minute}' MIN`}
          </span>
          <span>{currentClub.league}</span>
        </div>

        {/* Big Scoreboard */}
        <div className="grid grid-cols-3 items-center text-center py-1">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-0.5">
            <ClubBadge club={currentClub} className="w-8 h-8" textClassName="text-2xl" />
            <span className="text-xs sm:text-sm font-black text-white">{currentClub.name}</span>
            <span className="text-[9px] text-emerald-400 font-bold">MANDANTE</span>
          </div>

          {/* Placar */}
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-4xl font-black tracking-widest text-amber-400 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700 shadow-inner">
              {homeScore} <span className="text-slate-600">x</span> {awayScore}
            </div>
            <span className="text-[10px] text-slate-400 font-bold mt-0.5">Tempo Regulamentar</span>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-0.5">
            <ClubBadge club={opponentClub} className="w-8 h-8" textClassName="text-2xl" />
            <span className="text-xs sm:text-sm font-black text-white">{opponentClub.name}</span>
            <span className="text-[9px] text-slate-400 font-bold">VISITANTE</span>
          </div>
        </div>
      </div>

      {/* Real-time Field Radar & Action Ticker */}
      <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-xl border border-slate-800 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span>📻</span> Narração ao Vivo da Partida
          </h4>
          <span className="text-[9px] text-slate-500 font-medium">Rádio Esportiva Retrô</span>
        </div>

        {/* Live Commentary Feed */}
        <div className="space-y-1.5 min-h-[75px] max-h-[105px] overflow-y-auto pr-1">
          {eventsFeed.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-4 text-center">
              A bola está rolando! Concentração máxima nos lances do jogo...
            </p>
          ) : (
            eventsFeed.map((eventText, i) => (
              <div
                key={i}
                className={`text-[11px] p-1.5 sm:p-2 rounded-md border leading-tight ${
                  eventText.includes('GOL')
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-200 font-bold'
                    : 'bg-slate-900/70 border-slate-800/80 text-slate-300'
                }`}
              >
                {eventText}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Post-Match Summary Card if ended */}
      {matchEnded && (
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/50 p-3 sm:p-3.5 rounded-xl flex flex-row items-center justify-between gap-3 animate-slide-up shadow-xl">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🏅</div>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-white uppercase">
                {homeScore > awayScore ? 'Vitória Consagradora!' : homeScore === awayScore ? 'Empate Lutado!' : 'Derrota Amarga!'}
              </h3>
              <p className="text-[11px] text-slate-300">
                Você marcou <strong className="text-amber-400">{playerGoals} gols</strong> e deu <strong className="text-cyan-400">{playerAssists} assistências</strong>.
              </p>
              <p className="text-[10px] text-emerald-400 font-bold">
                Nota da atuação: {Math.min(10, Math.max(6.0, 6.5 + playerGoals * 1.5 + playerAssists * 1.0)).toFixed(1)} / 10
              </p>
            </div>
          </div>

          <button
            onClick={handleWrapUpMatch}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
          >
            Vestiário ❯
          </button>
        </div>
      )}

      {/* Duel Modal triggered dynamically */}
      {activeDuel && (
        <TsubasaDuelModal
          duel={activeDuel}
          player={player}
          currentClub={currentClub}
          opponentClub={opponentClub}
          onDuelComplete={handleDuelComplete}
        />
      )}
    </div>
  );
}
