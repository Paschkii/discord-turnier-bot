const { ICON_BASE } = require('./shared');
const challenges = require('./challenges');

const normalizeChallengeId =
  (typeof challenges.normalizeChallengeId === 'function'
    ? challenges.normalizeChallengeId
    : typeof challenges.normalizeId === 'function'
      ? challenges.normalizeId
      : (id) => String(id || '').trim().toLowerCase().replace(/\s+/g, '_'));

function normalizeAchievementId(id) {
  return normalizeChallengeId(id);
}

const ACHIEVEMENT_ICON_PATH_PREFIX = 'achievement-icons';
const ACHIEVEMENT_ICON_BASE_URL = `${ICON_BASE}${ACHIEVEMENT_ICON_PATH_PREFIX}/`;

function cloneLocalizedMap(map) {
  if (!map || typeof map !== 'object') return undefined;
  const clone = {};
  for (const [locale, value] of Object.entries(map)) {
    clone[locale] = value;
  }
  return clone;
}

function cloneChallengeDefinition(definition) {
  if (!definition || typeof definition !== 'object') return undefined;
  const clone = {};
  for (const [key, value] of Object.entries(definition)) {
    if (key === 'name' || key === 'description') {
      clone[key] = cloneLocalizedMap(value);
      continue;
    }
    if (key === 'defaults' && value && typeof value === 'object' && !Array.isArray(value)) {
      clone[key] = { ...value };
      continue;
    }
    clone[key] = value;
  }
  return clone;
}

function buildAchievementIconFileName(id) {
  const normalized = normalizeAchievementId(id);
  return normalized ? `${normalized}.png` : '';
}

function buildAchievementAssetPath(id) {
  const file = buildAchievementIconFileName(id);
  return file ? `${ACHIEVEMENT_ICON_PATH_PREFIX}/${file}` : '';
}

function buildAchievementIconUrl(id) {
  const file = buildAchievementIconFileName(id);
  return file ? `${ACHIEVEMENT_ICON_BASE_URL}${file}` : '';
}

function buildAchievementEmojiName(id) {
  const normalized = normalizeAchievementId(id);
  return normalized || '';
}

function cloneAchievementEntry(entry) {
  if (!entry || typeof entry !== 'object') return undefined;
  const clone = cloneChallengeDefinition(entry);
  if (!clone) return undefined;
  clone.iconFile = entry.iconFile;
  clone.assetPath = entry.assetPath;
  clone.icon = entry.icon;
  clone.emojiName = entry.emojiName;
  return clone;
}

const ACHIEVEMENTS = [];
const ACHIEVEMENT_MAP = new Map();

if (Array.isArray(challenges)) {
  for (const challenge of challenges) {
    if (!challenge || typeof challenge !== 'object') continue;
    const entry = cloneChallengeDefinition(challenge);
    if (!entry || !entry.id) continue;
    const normalizedId = normalizeAchievementId(entry.id);
    entry.iconFile = buildAchievementIconFileName(entry.id);
    entry.assetPath = buildAchievementAssetPath(entry.id);
    entry.icon = buildAchievementIconUrl(entry.id);
    entry.emojiName = buildAchievementEmojiName(entry.id);
    ACHIEVEMENTS.push(entry);
    ACHIEVEMENT_MAP.set(entry.id, entry);
    if (normalizedId) {
      ACHIEVEMENT_MAP.set(normalizedId, entry);
    }
  }
}

function getAchievementDefinition(id) {
  if (!id) return undefined;
  const entry = ACHIEVEMENT_MAP.get(normalizeAchievementId(id));
  return entry ? cloneAchievementEntry(entry) : undefined;
}

function createAchievement(id, overrides = {}, context = {}) {
  if (typeof challenges.createChallenge !== 'function') return null;
  const challenge = challenges.createChallenge(id, overrides, context);
  if (!challenge) return null;
  const baseId = challenge.id || id;
  return {
    ...challenge,
    iconFile: buildAchievementIconFileName(baseId),
    assetPath: buildAchievementAssetPath(baseId),
    icon: buildAchievementIconUrl(baseId),
    emojiName: buildAchievementEmojiName(baseId),
  };
}

function getAchievementAssetPath(id) {
  const entry = ACHIEVEMENT_MAP.get(normalizeAchievementId(id));
  if (entry?.assetPath) return entry.assetPath;
  return buildAchievementAssetPath(id);
}

function getAchievementIconUrl(id) {
  const entry = ACHIEVEMENT_MAP.get(normalizeAchievementId(id));
  if (entry?.icon) return entry.icon;
  return buildAchievementIconUrl(id);
}

function getAchievementEmojiName(id) {
  const entry = ACHIEVEMENT_MAP.get(normalizeAchievementId(id));
  if (entry?.emojiName) return entry.emojiName;
  return buildAchievementEmojiName(id);
}

ACHIEVEMENTS.normalizeId = normalizeAchievementId;
ACHIEVEMENTS.normalizeAchievementId = normalizeAchievementId;
ACHIEVEMENTS.get = getAchievementDefinition;
ACHIEVEMENTS.create = createAchievement;
ACHIEVEMENTS.achievement = createAchievement;
ACHIEVEMENTS.map = ACHIEVEMENT_MAP;

module.exports = ACHIEVEMENTS;
module.exports.normalizeAchievementId = normalizeAchievementId;
module.exports.getAchievementDefinition = getAchievementDefinition;
module.exports.createAchievement = createAchievement;
module.exports.getAchievementAssetPath = getAchievementAssetPath;
module.exports.getAchievementIconUrl = getAchievementIconUrl;
module.exports.getAchievementEmojiName = getAchievementEmojiName;
module.exports.ACHIEVEMENT_ICON_PATH_PREFIX = ACHIEVEMENT_ICON_PATH_PREFIX;