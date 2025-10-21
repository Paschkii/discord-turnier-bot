const test = require('node:test');
const assert = require('node:assert/strict');
const { resolveDiscordEmoji } = require('../src/config/constants/shared');
const {
  __pushEmojiSnapshotOverride,
  __popEmojiSnapshotOverride,
} = require('../src/config/constants/emojiSnapshot');

const ORIGINAL_ENV = { ...process.env };

function resetEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL_ENV)) delete process.env[key];
  }
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    process.env[key] = value;
  }
}

test('resolveDiscordEmoji falls back to colon-wrapped name when unset', (t) => {
  const token = __pushEmojiSnapshotOverride({});
  t.after(() => __popEmojiSnapshotOverride(token));

  delete process.env.EMOJI_NEUTRAL;
  t.after(resetEnv);

  assert.equal(resolveDiscordEmoji('neutral'), ':neutral:');
});

test('resolveDiscordEmoji respects explicit fallback value', (t) => {
  const token = __pushEmojiSnapshotOverride({});
  t.after(() => __popEmojiSnapshotOverride(token));

  delete process.env.EMOJI_CRA;
  t.after(resetEnv);

  assert.equal(resolveDiscordEmoji('cra', '🏹'), '🏹');
});

test('resolveDiscordEmoji prefers snapshot entries over fallbacks', (t) => {
  const token = __pushEmojiSnapshotOverride({
    emojis: {
      neutral: { mention: '<:snapshot_neutral:123>' },
    },
  });
  t.after(() => __popEmojiSnapshotOverride(token));

  assert.equal(resolveDiscordEmoji('neutral'), '<:snapshot_neutral:123>');
});

test('resolveDiscordEmoji trims env values and builds full emoji syntax from numeric id', (t) => {
  const token = __pushEmojiSnapshotOverride({});
  t.after(() => __popEmojiSnapshotOverride(token));
  
  process.env.EMOJI_SRAM = ' 1234567890 ';
  t.after(resetEnv);

  assert.equal(resolveDiscordEmoji('sram'), '<:sram:1234567890>');
});