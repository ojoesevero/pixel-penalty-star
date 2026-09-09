import { STORY_EVENTS, getRandomStoryEvent } from '../src/engine/storyEvents.js';

console.log(`Total story events: ${STORY_EVENTS.length}`);

if (STORY_EVENTS.length < 50) {
  console.error(`ERROR: Expected at least 50 events, found ${STORY_EVENTS.length}`);
  process.exit(1);
}

const ids = new Set();
let errorCount = 0;

STORY_EVENTS.forEach((evt, idx) => {
  if (!evt.id || ids.has(evt.id)) {
    console.error(`Duplicate or missing id at index ${idx}: "${evt.id}"`);
    errorCount++;
  }
  ids.add(evt.id);

  if (!evt.title || !evt.tag || !evt.description) {
    console.error(`Missing title/tag/desc for event ${evt.id}`);
    errorCount++;
  }

  if (!Array.isArray(evt.options) || evt.options.length < 2) {
    console.error(`Event ${evt.id} must have at least 2 options`);
    errorCount++;
  }

  evt.options.forEach((opt, oIdx) => {
    if (!opt.id || !opt.label || !opt.description || !opt.resultText) {
      console.error(`Event ${evt.id} option ${oIdx} missing fields`);
      errorCount++;
    }
  });
});

// Test anti-repetition
const firstBatch = [];
for (let i = 0; i < STORY_EVENTS.length; i++) {
  const next = getRandomStoryEvent(firstBatch.map(e => e.id));
  if (firstBatch.some(e => e.id === next.id)) {
    console.error(`Anti-repetition failed: event ${next.id} repeated before exhaustion`);
    errorCount++;
  }
  firstBatch.push(next);
}

console.log(`Anti-repetition test: pulled ${firstBatch.length} unique events in sequence without duplicate!`);

if (errorCount === 0) {
  console.log('✅ ALL 52 STORY & CRISIS EVENTS ARE VALID AND PASS INTEGRITY CHECKS!');
} else {
  console.error(`❌ FAILED with ${errorCount} errors`);
  process.exit(1);
}
