const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getAchievementEmoji,
  getAchievementEmojiName,
} = require('../src/config/constants/achievementUtils');
const { formatDungeonAchievements } = require('../src/utils/dungeons');

test('getAchievementEmoji respects category allow-list while keeping defaults', () => {
  const defaultEmoji = getAchievementEmoji('barbaric');
  assert.equal(defaultEmoji, '<:chall_barbaric:1427601736348073984>');

  const restrictedEmoji = getAchievementEmoji('barbaric', { categories: ['achievements'] });
  assert.equal(restrictedEmoji, '');
});

test('getAchievementEmojiName forwards options to emoji lookup', () => {
  const defaultName = getAchievementEmojiName('barbaric');
  assert.equal(defaultName, 'chall_barbaric');

  const restrictedName = getAchievementEmojiName('barbaric', { categories: ['achievements'] });
  assert.equal(restrictedName, '');
});

test('getAchievementEmoji returns configured fallback when nothing matches', () => {
  const fallbackEmoji = getAchievementEmoji('unknownEntry', {
    categories: ['achievements'],
    fallback: 'fallback-value',
  });
  assert.equal(fallbackEmoji, 'fallback-value');
});

test('formatDungeonAchievements falls back to question mark when no achievement emoji exists', () => {
  const dungeon = {
    achievements: [
      {
        id: 'barbaric',
        name: { de: 'Barbar' },
        description: { de: 'Besiege alle Feinde mit einer Waffe.' },
      },
    ],
  };

  const entries = formatDungeonAchievements(dungeon, 'de');
  assert.equal(entries.length, 1);
  assert.equal(entries[0], '❓ Barbarisch — Besiege alle Feinde.');
});