const { resolveDiscordEmoji } = require('./shared');
const challenges = require('./challenges');

const normalizeChallengeId =
  (typeof challenges.normalizeChallengeId === 'function'
    ? challenges.normalizeChallengeId
    : typeof challenges.normalizeId === 'function'
      ? challenges.normalizeId
      : (id) => String(id || '').trim().toLowerCase().replace(/\s+/g, '_'));

// Configure challenge emojis here. Example:
// { id: 'duo', name: 'challenge_duo', assetPath: 'challenge-icons/duo.png' }
const CHALLENGE_EMOJIS = [
  // Add your challenge emoji configurations here.
];

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
  return name ? resolveDiscordEmoji(name) : '';
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