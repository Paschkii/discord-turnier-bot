const { CATEGORIES } = require('./achievementsChallenges');
const { EMOJI_DETAILS, EMOJI_LIST } = require('./emojis');
const {
  extractEmojiName,
  getAchievementEmoji,
  getAchievementEmojiName,
  normalizeAchievementKey,
  normalizeEmojiEntry,
} = require('./achievementUtils');

const CHALLENGE_EMOJIS = (() => {
  const entries = [];
  const seen = new Set();

  for (const [category, keys] of Object.entries(CATEGORIES)) {
    const emojiGroup = EMOJI_LIST?.[category];
    const detailGroup = EMOJI_DETAILS?.[category];
    if (!emojiGroup || !Array.isArray(keys)) continue;

    for (const key of keys) {
      if (!key) continue;
      const normalized = normalizeAchievementKey(key);
      if (!normalized || seen.has(normalized)) continue;

      const emoji = normalizeEmojiEntry(emojiGroup[normalized]) || getAchievementEmoji(normalized);
      if (!emoji) continue;

      const name = extractEmojiName(emoji) || getAchievementEmojiName(normalized);
      const variants = {};
      const detailEntry = detailGroup?.[normalized];
      if (detailEntry && typeof detailEntry === 'object') {
        for (const [variantName, variantDetail] of Object.entries(detailEntry.variants || {})) {
          const mention = normalizeEmojiEntry(variantDetail);
          if (mention) {
            variants[variantName] = mention;
          }
        }
      }

      entries.push({ id: normalized, name, emoji, variants });
      seen.add(normalized);
    }
  }

  return entries;
})();

const EMOJI_BY_KEY = new Map(CHALLENGE_EMOJIS.map((entry) => [entry.id, entry.emoji]));
const NAME_BY_KEY = new Map(CHALLENGE_EMOJIS.map((entry) => [entry.id, entry.name]));

function findChallengeEmojiEntry(id) {
  if (!id) return null;
  const normalized = normalizeAchievementKey(id);
  return CHALLENGE_EMOJIS.find((entry) => entry.id === normalized) || null;
}

function getChallengeEmojiName(id) {
  if (!id) return '';
  const normalized = normalizeAchievementKey(id);
  return NAME_BY_KEY.get(normalized) || '';
}

function resolveChallengeEmoji(id) {
  if (!id) return '';
  const normalized = normalizeAchievementKey(id);
  return EMOJI_BY_KEY.get(normalized) || '';
}

function getChallengeEmojiInstallerDefinitions() {
  return [];
}

module.exports = {
  CHALLENGE_EMOJIS,
  findChallengeEmojiEntry,
  getChallengeEmojiName,
  getChallengeEmojiInstallerDefinitions,
  resolveChallengeEmoji,
};