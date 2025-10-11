const { resolveDiscordEmoji } = require('./shared');
const achievements = require('./achievements');

const normalizeChallengeId =
  (typeof achievements.normalizeAchievementId === 'function'
    ? achievements.normalizeAchievementId
    : typeof achievements.normalizeId === 'function'
      ? achievements.normalizeId
      : (id) => String(id || '').trim().toLowerCase().replace(/\s+/g, '_'));

const getAchievementEmojiName =
  (typeof achievements.getAchievementEmojiName === 'function'
    ? achievements.getAchievementEmojiName
    : (id) => {
        const normalized = normalizeChallengeId(id);
        return normalized ? `achievement_${normalized}` : '';
      });

const getAchievementAssetPath =
  (typeof achievements.getAchievementAssetPath === 'function'
    ? achievements.getAchievementAssetPath
    : (id) => {
        const normalized = normalizeChallengeId(id);
        return normalized ? `achievement-icons/${normalized}.png` : '';
      });

// Configure challenge emojis here. Example:
// { id: 'duo', name: 'challenge_duo', assetPath: 'challenge-icons/duo.png' }
const CHALLENGE_EMOJIS = (() => {
  const entries = [];
  const seen = new Set();
  if (Array.isArray(achievements)) {
    for (const achievement of achievements) {
      if (!achievement || typeof achievement !== 'object') continue;
      const normalized = normalizeChallengeId(achievement.id);
      if (!normalized || seen.has(normalized)) continue;
      const name = achievement.emojiName || getAchievementEmojiName(achievement.id);
      const assetPath = achievement.assetPath || getAchievementAssetPath(achievement.id);
      if (!name || !assetPath) continue;
      entries.push({ id: achievement.id, name, assetPath });
      seen.add(normalized);
    }
  }
  return entries;
})();

function findChallengeEmojiEntry(id) {
  if (!id) return null;
  const normalized = normalizeChallengeId(id);
  return CHALLENGE_EMOJIS.find((entry) => normalizeChallengeId(entry.id) === normalized) || null;
}

function getChallengeEmojiName(id) {
  const entry = findChallengeEmojiEntry(id);
  return entry?.name || '';
}

function resolveChallengeEmoji(id) {
  const name = getChallengeEmojiName(id);
  return name ? resolveDiscordEmoji(name, `:${name}:`) : '';
}

function getChallengeEmojiInstallerDefinitions() {
  return CHALLENGE_EMOJIS
    .filter((entry) => entry?.name && entry?.assetPath)
    .map((entry) => ({ name: entry.name, path: entry.assetPath }));
}

module.exports = {
  CHALLENGE_EMOJIS,
  findChallengeEmojiEntry,
  getChallengeEmojiName,
  getChallengeEmojiInstallerDefinitions,
  resolveChallengeEmoji,
};