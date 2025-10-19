const { EMOJI_LIST } = require('./emojis');
const { CATEGORIES } = require('./achievementsChallenges');

const DEFAULT_LOCALES = ['de', 'en', 'fr', 'es', 'it', 'pt'];

function simplifyKey(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, '');
}

const CANONICAL_KEY_BY_SIMPLE = new Map();
const CATEGORY_BY_CANONICAL_KEY = new Map();

for (const [category, keys] of Object.entries(CATEGORIES)) {
  if (!Array.isArray(keys)) continue;
  for (const key of keys) {
    if (!key) continue;
    const canonical = String(key);
    CATEGORY_BY_CANONICAL_KEY.set(canonical, category);
    const normalized = simplifyKey(canonical);
    if (!normalized) continue;
    if (!CANONICAL_KEY_BY_SIMPLE.has(normalized)) {
      CANONICAL_KEY_BY_SIMPLE.set(normalized, canonical);
    }
  }
}

function normalizeAchievementKey(value) {
  const simplified = simplifyKey(value);
  if (!simplified) return '';
  return CANONICAL_KEY_BY_SIMPLE.get(simplified) || simplified;
}

function getAchievementCategory(value) {
  const canonical = normalizeAchievementKey(value);
  if (!canonical) return null;
  return CATEGORY_BY_CANONICAL_KEY.get(canonical) || null;
}

function extractEmojiName(emoji) {
  if (typeof emoji !== 'string') return '';
  const match = emoji.match(/^<a?:(?<name>[^:>]+):\d+>$/);
  return match?.groups?.name || '';
}

function getAchievementEmoji(value, options = {}) {
  const { categories, fallback = '' } = options || {};
  const canonical = normalizeAchievementKey(value);
  if (!canonical) return fallback || '';

  const category = getAchievementCategory(canonical);

  const normalizedAllowList = Array.isArray(categories) && categories.length
    ? categories
        .map((entry) => String(entry || '').trim())
        .filter(Boolean)
    : ['achievements', 'challenges'];

  const categoriesToTry = [];
  const seen = new Set();

  const addCategory = (entry) => {
    const normalized = String(entry || '').trim();
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    categoriesToTry.push(normalized);
  };

  if (category && normalizedAllowList.includes(category)) {
    addCategory(category);
  }

  for (const entry of normalizedAllowList) {
    addCategory(entry);
  }

  for (const entry of categoriesToTry) {
    const emoji = EMOJI_LIST?.[entry]?.[canonical];
    if (emoji) return emoji;
  }
  return fallback || '';
}

function getAchievementEmojiName(value, options) {
  const emoji = getAchievementEmoji(value, options);
  if (!emoji) return '';
  return extractEmojiName(emoji);
}

function buildLocalizedLabel(value) {
  const canonical = normalizeAchievementKey(value);
  if (!canonical) return null;
  const label = String(canonical)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/(^|\s)([a-z])/g, (_, prefix, letter) => `${prefix}${letter.toUpperCase()}`);

  if (!label) return null;
  const map = {};
  for (const locale of DEFAULT_LOCALES) {
    map[locale] = label;
  }
  return map;
}

module.exports = {
  buildLocalizedLabel,
  extractEmojiName,
  getAchievementCategory,
  getAchievementEmoji,
  getAchievementEmojiName,
  normalizeAchievementKey,
};