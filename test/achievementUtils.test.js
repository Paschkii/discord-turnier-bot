const test = require('node:test');
const assert = require('node:assert/strict');

const {
  __pushEmojiSnapshotOverride,
  __popEmojiSnapshotOverride,
} = require('../src/config/constants/emojiSnapshot');

const MODULES_TO_RESET = [
  '../src/config/constants/achievementUtils',
  '../src/config/constants/emojis',
  '../src/utils/dungeons',
  '../src/config/constants/dungeons',
];

function loadAchievementContext(t, snapshotData) {
  const token = __pushEmojiSnapshotOverride(snapshotData);
  const modulePaths = MODULES_TO_RESET.map((moduleId) => require.resolve(moduleId));
  for (const modulePath of modulePaths) {
    delete require.cache[modulePath];
  }

  let achievementUtils;
  let dungeonUtils;
  let dungeonConstants;
  try {
    achievementUtils = require('../src/config/constants/achievementUtils');
    dungeonUtils = require('../src/utils/dungeons');
    dungeonConstants = require('../src/config/constants/dungeons');
  } catch (error) {
    for (const modulePath of modulePaths) {
      delete require.cache[modulePath];
    }
    __popEmojiSnapshotOverride(token);
    throw error;
  }

  t.after(() => {
    for (const modulePath of modulePaths) {
      delete require.cache[modulePath];
    }
    __popEmojiSnapshotOverride(token);
  });

  return {
    getAchievementEmoji: achievementUtils.getAchievementEmoji,
    getAchievementEmojiName: achievementUtils.getAchievementEmojiName,
    formatDungeonAchievements: dungeonUtils.formatDungeonAchievements,
    DUNGEON_LISTE: dungeonConstants.DUNGEON_LISTE,
  };
}

test('achievement emoji helpers', async (t) => {
  await t.test('getAchievementEmoji respects category allow-list while keeping defaults', (t) => {
    const { getAchievementEmoji } = loadAchievementContext(t, {
      emojis: {
        chall_barbaric: { mention: '<:chall_barbaric:4242>' },
      },
    });

    const defaultEmoji = getAchievementEmoji('barbaric');
    assert.equal(defaultEmoji, '<:chall_barbaric:4242>');

    const restrictedEmoji = getAchievementEmoji('barbaric', { categories: ['achievements'] });
    assert.equal(restrictedEmoji, '');
  });

  await t.test('getAchievementEmojiName forwards options to emoji lookup', (t) => {
    const { getAchievementEmojiName } = loadAchievementContext(t, {
      emojis: {
        chall_barbaric: { mention: '<:chall_barbaric:4242>' },
      },
    });

    const defaultName = getAchievementEmojiName('barbaric');
    assert.equal(defaultName, 'chall_barbaric');

    const restrictedName = getAchievementEmojiName('barbaric', { categories: ['achievements'] });
    assert.equal(restrictedName, '');
  });

  await t.test('getAchievementEmoji returns configured fallback when nothing matches', (t) => {
    const { getAchievementEmoji } = loadAchievementContext(t, {});

    const fallbackEmoji = getAchievementEmoji('unknownEntry', {
      categories: ['achievements'],
      fallback: 'fallback-value',
    });
    assert.equal(fallbackEmoji, 'fallback-value');
  });

  await t.test('formatDungeonAchievements falls back to question mark when no achievement emoji exists', (t) => {
    const { formatDungeonAchievements } = loadAchievementContext(t, {});

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
    assert.equal(entries[0], '❓ Barbar — Besiege alle Feinde mit einer Waffe.');
  });

  await t.test('dungeon achievements do not reuse challenge emoji fallbacks', (t) => {
    const { DUNGEON_LISTE } = loadAchievementContext(t, {});

    const dungeon = DUNGEON_LISTE.find((entry) =>
      Array.isArray(entry?.achievements)
        && entry.achievements.some((achievement) => achievement.id === 'barbaric'),
    );

    assert.ok(dungeon, 'expected dungeon with barbaric achievement');

    const barbaricAchievement = dungeon.achievements.find((achievement) => achievement.id === 'barbaric');

    assert.ok(barbaricAchievement, 'expected barbaric achievement entry');
      assert.equal(barbaricAchievement.emoji, undefined);
      assert.equal(barbaricAchievement.emojiName, undefined);
  });
});