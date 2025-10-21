const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getEmojiByKey,
  __pushEmojiSnapshotOverride,
  __popEmojiSnapshotOverride,
} = require('../src/config/constants/emojiSnapshot');

test('normalizeSnapshot reads entries nested inside keyed maps', (t) => {
  const token = __pushEmojiSnapshotOverride({
    version: 1,
    updatedAt: '2024-01-01T00:00:00.000Z',
    total: 1,
    byKey: {
      vitality: {
        id: '1234567890',
        name: 'vitality',
        mention: '<:vitality:1234567890>',
      },
    },
    byName: {
      vitality: {
        id: '1234567890',
        key: 'vitality',
        mention: '<:vitality:1234567890>',
      },
    },
  });

  t.after(() => __popEmojiSnapshotOverride(token));

  const entry = getEmojiByKey('vitality');

  assert.ok(entry, 'entry should exist');
  assert.equal(entry.id, '1234567890');
  assert.equal(entry.mention, '<:vitality:1234567890>');
  assert.equal(entry.name, 'vitality');
});