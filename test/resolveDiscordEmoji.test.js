const test = require('node:test');
const assert = require('node:assert/strict');

const { resolveDiscordEmoji } = require('../src/config/constants/shared');

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
  delete process.env.EMOJI_NEUTRAL;
  t.after(resetEnv);

  assert.equal(resolveDiscordEmoji('neutral'), ':neutral:');
});

test('resolveDiscordEmoji respects explicit fallback value', (t) => {
  delete process.env.EMOJI_CRA;
  t.after(resetEnv);

  assert.equal(resolveDiscordEmoji('cra', '🏹'), '🏹');
});

test('resolveDiscordEmoji trims env values and builds full emoji syntax from numeric id', (t) => {
  process.env.EMOJI_SRAM = ' 1234567890 ';
  t.after(resetEnv);

  assert.equal(resolveDiscordEmoji('sram'), '<:sram:1234567890>');
});