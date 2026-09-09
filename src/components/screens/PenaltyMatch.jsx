/* ============================================
   PENALTY MATCH
   Full penalty kick experience with Canvas
   ============================================ */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import PixelButton from '@/components/ui/PixelButton';
import { resolveShot } from '@/engine/goalkeeper-ai';
import { PENALTIES_PER_GAME } from '@/engine/constants';
import { sfxKick, sfxGoal, sfxSave, sfxIsolated, sfxCrowd } from '@/audio/sfx';

// --- Canvas Drawing Helpers ---

function drawField(ctx, w, h) {
  // Sky
  ctx.fillStyle = '#29366f';
  ctx.fillRect(0, 0, w, h * 0.35);

  // Grass
  ctx.fillStyle = '#2d6b32';
  ctx.fillRect(0, h * 0.35, w, h * 0.65);

  // Grass stripes
  ctx.fillStyle = '#3a8a42';
  for (let i = 0; i < 6; i++) {
    if (i % 2 === 0) {
      ctx.fillRect(0, h * 0.35 + i * (h * 0.65 / 6), w, h * 0.65 / 6);
    }
  }

  // Penalty spot
  ctx.fillStyle = '#f4f4f4';
  ctx.fillRect(w / 2 - 2, h * 0.68, 4, 4);
}

function drawGoal(ctx, w, h) {
  const goalW = w * 0.6;
  const goalH = h * 0.22;
  const goalX = (w - goalW) / 2;
  const goalY = h * 0.15;

  // Net (grid lines)
  ctx.strokeStyle = '#94b0c2';
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.3;
  for (let x = goalX; x <= goalX + goalW; x += 8) {
    ctx.beginPath();
    ctx.moveTo(x, goalY);
    ctx.lineTo(x, goalY + goalH);
    ctx.stroke();
  }
  for (let y = goalY; y <= goalY + goalH; y += 8) {
    ctx.beginPath();
    ctx.moveTo(goalX, y);
    ctx.lineTo(goalX + goalW, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Posts
  ctx.fillStyle = '#f4f4f4';
  ctx.fillRect(goalX - 3, goalY, 6, goalH + 4);          // Left post
  ctx.fillRect(goalX + goalW - 3, goalY, 6, goalH + 4);  // Right post
  ctx.fillRect(goalX - 3, goalY - 3, goalW + 6, 6);      // Crossbar
}

function drawKeeper(ctx, w, h, dive = 'center', animProgress = 0) {
  const goalW = w * 0.6;
  const goalX = (w - goalW) / 2;
  const goalCenterX = w / 2;
  const goalBottom = h * 0.15 + h * 0.22;

  let kx = goalCenterX;
  let ky = goalBottom - 20;

  if (animProgress > 0) {
    const t = Math.min(animProgress, 1);
    if (dive === 'left') {
      kx = goalCenterX - (goalW * 0.35) * t;
      ky = goalBottom - 20 + 6 * t;
    } else if (dive === 'right') {
      kx = goalCenterX + (goalW * 0.35) * t;
      ky = goalBottom - 20 + 6 * t;
    }
  }

  // Body
  ctx.fillStyle = '#f9a31b';
  ctx.fillRect(kx - 6, ky - 12, 12, 16);

  // Head
  ctx.fillStyle = '#ffd5b8';
  ctx.fillRect(kx - 4, ky - 18, 8, 8);

  // Arms
  ctx.fillStyle = '#f9a31b';
  if (dive === 'left' && animProgress > 0) {
    ctx.fillRect(kx - 16, ky - 10, 12, 4);
  } else if (dive === 'right' && animProgress > 0) {
    ctx.fillRect(kx + 4, ky - 10, 12, 4);
  } else {
    ctx.fillRect(kx - 14, ky - 10, 10, 4);
    ctx.fillRect(kx + 4, ky - 10, 10, 4);
  }

  // Legs
  ctx.fillStyle = '#1a1c2c';
  ctx.fillRect(kx - 4, ky + 4, 4, 8);
  ctx.fillRect(kx, ky + 4, 4, 8);
}

function drawBall(ctx, x, y, size = 6) {
  ctx.fillStyle = '#f4f4f4';
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#1a1c2c';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Pentagon pattern
  ctx.fillStyle = '#1a1c2c';
  ctx.fillRect(x - 2, y - 2, 4, 4);
}

function drawPlayer(ctx, w, h, colors = { primary: '#3b5dc9', secondary: '#f4f4f4' }, skinColor = '#ffd5b8', number = 10) {
  const px = w / 2;
  const py = h * 0.78;

  // Body (jersey)
  ctx.fillStyle = colors.primary;
  ctx.fillRect(px - 8, py - 16, 16, 20);

  // Stripe
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(px - 8, py - 8, 16, 4);

  // Head
  ctx.fillStyle = skinColor;
  ctx.fillRect(px - 5, py - 24, 10, 10);

  // Hair
  ctx.fillStyle = '#1a1c2c';
  ctx.fillRect(px - 5, py - 26, 10, 4);

  // Shorts
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(px - 6, py + 4, 12, 8);

  // Legs
  ctx.fillStyle = skinColor;
  ctx.fillRect(px - 5, py + 12, 4, 8);
  ctx.fillRect(px + 1, py + 12, 4, 8);

  // Boots
  ctx.fillStyle = '#1a1c2c';
  ctx.fillRect(px - 6, py + 20, 5, 4);
  ctx.fillRect(px + 1, py + 20, 5, 4);

  // Number
  ctx.fillStyle = colors.secondary;
  ctx.font = '6px "Press Start 2P"';
  ctx.textAlign = 'center';
  ctx.fillText(String(number), px, py - 2);
}

// --- Ball Animation ---
function getBallTarget(direction, height, w, h) {
  const goalW = w * 0.6;
  const goalX = (w - goalW) / 2;
  const goalTop = h * 0.15;
  const goalBottom = goalTop + h * 0.22;

  let tx, ty;
  if (direction === 'left') tx = goalX + goalW * 0.15;
  else if (direction === 'right') tx = goalX + goalW * 0.85;
  else tx = w / 2;

  ty = height === 'high' ? goalTop + 15 : goalBottom - 8;

  return { tx, ty };
}

// --- Component ---
export default function PenaltyMatch({
  penaltyIndex,
  totalPenalties = PENALTIES_PER_GAME,
  playerAttributes,
  clubTier,
  clubColors,
  playerSkinColor,
  playerNumber,
  isWorldCup = false,
  onResult,
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const [phase, setPhase] = useState('aim');       // aim | power | kicking | result
  const [direction, setDirection] = useState(null); // left | center | right
  const [height, setHeight] = useState(null);       // low | high
  const [force, setForce] = useState(0);
  const [powerDir, setPowerDir] = useState(1);
  const [result, setResult] = useState(null);
  const [keeperAnim, setKeeperAnim] = useState(0);
  const [ballAnim, setBallAnim] = useState(0);
  const [shaking, setShaking] = useState(false);

  // Power bar oscillation
  useEffect(() => {
    if (phase !== 'power') return;
    const interval = setInterval(() => {
      setForce(prev => {
        let next = prev + powerDir * 0.3;
        if (next >= 10) { next = 10; setPowerDir(-1); }
        if (next <= 0) { next = 0; setPowerDir(1); }
        return Math.round(next * 10) / 10;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [phase, powerDir]);

  // Draw canvas
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    drawField(ctx, w, h);
    drawGoal(ctx, w, h);
    drawKeeper(ctx, w, h, result?.keeperDive || 'center', keeperAnim);
    drawPlayer(ctx, w, h, clubColors, playerSkinColor, playerNumber);

    // Ball
    if (phase === 'kicking' || phase === 'result') {
      const startX = w / 2;
      const startY = h * 0.75;
      const { tx, ty } = getBallTarget(direction, height, w, h);

      if (result?.isolated) {
        // Ball goes over the bar
        const t = Math.min(ballAnim, 1);
        const bx = startX + (tx - startX) * t;
        const by = startY + (h * 0.05 - startY) * t - 40 * Math.sin(Math.PI * t);
        drawBall(ctx, bx, by, 4 + 2 * (1 - t));
      } else {
        const t = Math.min(ballAnim, 1);
        // Curve effect for side shots with high passing/attack
        const hasCurve = (direction !== 'center') &&
          (playerAttributes.passing >= 4 || playerAttributes.attack >= 4);
        const curveOffset = hasCurve ? Math.sin(Math.PI * t) * 15 * (direction === 'left' ? 1 : -1) : 0;

        const bx = startX + (tx - startX) * t + curveOffset;
        const by = startY + (ty - startY) * t;
        const size = 6 - 2 * t; // Ball gets smaller as it goes far
        drawBall(ctx, bx, by, Math.max(2, size));
      }
    } else {
      // Ball at feet
      drawBall(ctx, w / 2 + 8, h * 0.78 + 16, 5);
    }

    // Result text
    if (phase === 'result' && result) {
      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = '14px "Press Start 2P"';

      if (result.isolated) {
        ctx.fillStyle = '#d95763';
        ctx.fillText('ISOLOU!', w / 2, h * 0.55);
      } else if (result.saved) {
        ctx.fillStyle = '#d95763';
        ctx.fillText('DEFESA!', w / 2, h * 0.55);
      } else {
        ctx.fillStyle = '#73ef61';
        ctx.fillText('⚽ GOL!', w / 2, h * 0.55);
      }

      // Reason
      ctx.font = '8px "VT323"';
      ctx.fillStyle = '#94b0c2';
      ctx.fillText(result.reason, w / 2, h * 0.60);

      ctx.restore();
    }

    animRef.current = requestAnimationFrame(draw);
  }, [phase, result, keeperAnim, ballAnim, direction, height, clubColors, playerSkinColor, playerNumber, playerAttributes]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  // Kick animation
  const executeKick = useCallback(() => {
    sfxKick();
    setPhase('kicking');

    const shotResult = resolveShot(
      { direction, height, force },
      playerAttributes,
      clubTier,
      isWorldCup
    );
    setResult(shotResult);

    // Animate ball and keeper
    let frame = 0;
    const maxFrames = 40;
    const kickInterval = setInterval(() => {
      frame++;
      const progress = frame / maxFrames;
      setBallAnim(progress);
      setKeeperAnim(Math.min(progress * 2, 1));

      if (frame >= maxFrames) {
        clearInterval(kickInterval);
        setPhase('result');

        // Play sound effect
        if (shotResult.isolated) {
          sfxIsolated();
        } else if (shotResult.saved) {
          sfxSave();
        } else {
          sfxGoal();
          sfxCrowd();
          setShaking(true);
          setTimeout(() => setShaking(false), 400);
        }
      }
    }, 25);
  }, [direction, height, force, playerAttributes, clubTier, isWorldCup]);

  // Handle power bar stop
  const handlePowerStop = () => {
    if (phase === 'power') {
      executeKick();
    }
  };

  // Handle continue to next penalty
  const handleContinue = () => {
    const isGoal = result && !result.saved && !result.isolated;
    onResult(isGoal);

    // Reset for next penalty
    setPhase('aim');
    setDirection(null);
    setHeight(null);
    setForce(0);
    setPowerDir(1);
    setResult(null);
    setKeeperAnim(0);
    setBallAnim(0);
  };

  const canShoot = direction && height;

  return (
    <div className={`flex flex-col h-full ${shaking ? 'animate-screen-shake' : ''}`}>
      {/* Penalty counter */}
      <div className="bg-gbc-black/70 px-3 py-1.5 flex items-center justify-between shrink-0">
        <span className="font-pixel text-[7px] text-gbc-gray">
          PÊNALTI {penaltyIndex + 1}/{totalPenalties}
        </span>
        {isWorldCup && (
          <span className="font-pixel text-[7px] text-gbc-yellow">🌍 COPA</span>
        )}
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center bg-gbc-black p-2">
        <canvas
          ref={canvasRef}
          width={360}
          height={280}
          className="w-full max-w-[360px] border-2 border-gbc-navy"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Controls */}
      <div className="bg-gbc-black/90 p-3 shrink-0">
        {phase === 'aim' && (
          <div className="space-y-3 animate-slide-up">
            {/* Direction */}
            <div>
              <p className="font-pixel text-[7px] text-gbc-gray text-center mb-1.5">DIREÇÃO</p>
              <div className="flex gap-2 justify-center">
                {['left', 'center', 'right'].map(dir => (
                  <button
                    key={dir}
                    onClick={() => setDirection(dir)}
                    className={`
                      font-pixel text-[8px] px-4 py-2 border-2 cursor-pointer transition-all
                      ${direction === dir
                        ? 'bg-gbc-blue border-gbc-cyan text-gbc-white'
                        : 'bg-gbc-dark border-gbc-navy text-gbc-gray hover:border-gbc-dark'
                      }
                    `}
                  >
                    {dir === 'left' ? '◀ ESQ' : dir === 'right' ? 'DIR ▶' : '▲ CEN'}
                  </button>
                ))}
              </div>
            </div>

            {/* Height */}
            <div>
              <p className="font-pixel text-[7px] text-gbc-gray text-center mb-1.5">ALTURA</p>
              <div className="flex gap-2 justify-center">
                {['low', 'high'].map(h => (
                  <button
                    key={h}
                    onClick={() => setHeight(h)}
                    className={`
                      font-pixel text-[8px] px-6 py-2 border-2 cursor-pointer transition-all
                      ${height === h
                        ? 'bg-gbc-teal border-gbc-green text-gbc-white'
                        : 'bg-gbc-dark border-gbc-navy text-gbc-gray hover:border-gbc-dark'
                      }
                    `}
                  >
                    {h === 'low' ? '⬇ RASTEIRO' : '⬆ ALTO'}
                  </button>
                ))}
              </div>
            </div>

            {/* Shoot button */}
            <PixelButton
              onClick={() => canShoot && setPhase('power')}
              variant="success"
              fullWidth
              disabled={!canShoot}
              size="lg"
            >
              ⚽ PREPARAR CHUTE
            </PixelButton>
          </div>
        )}

        {phase === 'power' && (
          <div className="space-y-3 animate-slide-up">
            <p className="font-pixel text-[7px] text-gbc-yellow text-center animate-blink">
              PARE A BARRA NO MOMENTO CERTO!
            </p>

            {/* Power bar */}
            <div className="relative w-full h-6 bg-gbc-black border-2 border-gbc-navy">
              <div
                className="absolute top-0 left-0 h-full transition-none"
                style={{
                  width: `${(force / 10) * 100}%`,
                  backgroundColor: force < 4 ? '#38b764' : force < 7 ? '#ffcd75' : force < 9 ? '#f9a31b' : '#d95763',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-pixel text-[8px] text-gbc-white drop-shadow-[1px_1px_0_black]">
                  {force.toFixed(1)}
                </span>
              </div>
            </div>

            <PixelButton onClick={handlePowerStop} variant="danger" fullWidth size="lg">
              💥 CHUTAR!
            </PixelButton>
          </div>
        )}

        {phase === 'kicking' && (
          <div className="text-center py-4">
            <p className="font-pixel text-[8px] text-gbc-yellow animate-blink">
              ⚽ CHUTANDO...
            </p>
          </div>
        )}

        {phase === 'result' && (
          <div className="space-y-2 animate-slide-up">
            <div className="text-center">
              <p className={`font-pixel text-[10px] ${result.saved || result.isolated ? 'text-gbc-red' : 'text-gbc-green'}`}>
                {result.isolated ? '💨 ISOLOU!' : result.saved ? '🧤 DEFESA!' : '⚽ GOOOL!'}
              </p>
              <p className="font-retro text-sm text-gbc-gray mt-1">{result.reason}</p>
            </div>

            <PixelButton onClick={handleContinue} variant="primary" fullWidth>
              ▶ CONTINUAR
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  );
}
