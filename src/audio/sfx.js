/* ============================================
   CHIPTUNE SFX ENGINE
   Procedural 8-bit audio via Web Audio API
   ============================================ */

let audioCtx = null;
let muted = false;

/**
 * Initialize or get the AudioContext (lazy, on user gesture)
 */
function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Set mute state
 */
export function setMuted(value) {
  muted = value;
  localStorage.setItem('penalty_muted', value ? '1' : '0');
}

/**
 * Get mute state
 */
export function isMuted() {
  if (muted) return true;
  return localStorage.getItem('penalty_muted') === '1';
}

/**
 * Toggle mute
 */
export function toggleMute() {
  const newState = !isMuted();
  setMuted(newState);
  return newState;
}

// --- Internal helpers ---

function playTone(freq, duration, type = 'square', volume = 0.15) {
  if (isMuted()) return;
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function playNoise(duration, volume = 0.08) {
  if (isMuted()) return;
  const ctx = getCtx();
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  noise.connect(gain);
  gain.connect(ctx.destination);
  noise.start(ctx.currentTime);
}

function playSweep(startFreq, endFreq, duration, type = 'square', volume = 0.12) {
  if (isMuted()) return;
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

// --- Public SFX functions ---

/** Menu click / button press */
export function sfxClick() {
  playTone(880, 0.06, 'square', 0.08);
}

/** Whistle + kick sound */
export function sfxKick() {
  playSweep(600, 200, 0.15, 'sawtooth', 0.1);
  playNoise(0.08, 0.06);
}

/** GOL! — ascending arpeggio fanfare */
export function sfxGoal() {
  if (isMuted()) return;
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, 'square', 0.12), i * 100);
  });
  setTimeout(() => playNoise(0.15, 0.04), 400);
}

/** Save / defense — descending buzz */
export function sfxSave() {
  playSweep(400, 120, 0.3, 'square', 0.1);
  playNoise(0.1, 0.05);
}

/** Ball isolated — deep thud */
export function sfxIsolated() {
  playTone(80, 0.4, 'sine', 0.15);
  playNoise(0.15, 0.03);
}

/** Victory fanfare — longer celebratory melody */
export function sfxVictory() {
  if (isMuted()) return;
  const melody = [523, 587, 659, 784, 880, 1047];
  melody.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.25, 'square', 0.1), i * 120);
  });
}

/** Achievement unlocked — sparkle sound */
export function sfxAchievement() {
  if (isMuted()) return;
  const sparkle = [1047, 1319, 1568, 2093];
  sparkle.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.1, 'square', 0.08), i * 60);
  });
}

/** Crowd cheer — filtered noise burst */
export function sfxCrowd() {
  if (isMuted()) return;
  const ctx = getCtx();
  const duration = 0.8;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, ctx.currentTime);
  filter.Q.setValueAtTime(0.5, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.setValueAtTime(0.1, ctx.currentTime + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(ctx.currentTime);
}

/** Game Over — sad descending tones */
export function sfxGameOver() {
  if (isMuted()) return;
  const sad = [440, 392, 349, 262];
  sad.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.3, 'triangle', 0.1), i * 200);
  });
}
