const path = require('node:path');

const { SUPPORTED_LOCALES } = require('../../config/constants');

const DEFAULT_LOCALES = Array.isArray(SUPPORTED_LOCALES) && SUPPORTED_LOCALES.length
  ? Array.from(new Set([...SUPPORTED_LOCALES, 'en']))
  : ['en'];

const DESCRIPTION_CACHE = new Map();

function safeRequire(modulePath) {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require(modulePath);
  } catch (error) {
    return null;
  }
}

function loadDescriptions(locale) {
  if (DESCRIPTION_CACHE.has(locale)) {
    return DESCRIPTION_CACHE.get(locale);
  }

  const filePath = path.join(__dirname, '../../config/languages', locale, 'descriptions');
  const data = safeRequire(filePath) || {};
  DESCRIPTION_CACHE.set(locale, data);
  return data;
}

function getLocalizedEntry(category, key, locale) {
  const descriptions = loadDescriptions(locale);
  if (!descriptions || typeof descriptions !== 'object') return null;
  const categoryEntries = descriptions[category];
  if (!categoryEntries || typeof categoryEntries !== 'object') return null;
  const entry = categoryEntries[key];
  if (!entry || typeof entry !== 'object') return null;
  return entry;
}

function humanizeKey(key) {
  return String(key || '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function ensureEmoji(emoji) {
  if (typeof emoji === 'string' && emoji.trim()) {
    return emoji.trim();
  }
  return '❓';
}

function buildLocalizedFields(category, key) {
  const englishEntry = getLocalizedEntry(category, key, 'en') || {};
  const fallbackName = typeof englishEntry.name === 'string' && englishEntry.name.trim()
    ? englishEntry.name.trim()
    : humanizeKey(key);
  const fallbackDescription = englishEntry.description;

  const names = {};
  const descriptions = {};

  DEFAULT_LOCALES.forEach((locale) => {
    const localeEntry = getLocalizedEntry(category, key, locale) || {};
    const rawName = typeof localeEntry.name === 'string' && localeEntry.name.trim()
      ? localeEntry.name.trim()
      : undefined;
    const rawDescription = localeEntry.description;

    const resolvedName = rawName || fallbackName;
    const resolvedDescription = rawDescription !== undefined && rawDescription !== null && rawDescription !== ''
      ? rawDescription
      : fallbackDescription;

    if (resolvedName) {
      names[locale] = resolvedName;
    }
    if (resolvedDescription !== undefined && resolvedDescription !== null) {
      descriptions[locale] = resolvedDescription;
    }
  });

  if (!Object.keys(names).length && fallbackName) {
    names.en = fallbackName;
  }

  if (!Object.keys(descriptions).length && fallbackDescription !== undefined) {
    descriptions.en = fallbackDescription;
  }

  return { names, descriptions };
}

function buildEntries(keys, category, emojiMap = {}) {
  if (!Array.isArray(keys) || !keys.length) return [];

  return keys
    .map((key) => {
      const normalizedKey = String(key);
      if (!normalizedKey) return null;

      const { names, descriptions } = buildLocalizedFields(category, normalizedKey);
      if (!Object.keys(names).length) return null;

      const emoji = ensureEmoji(emojiMap[normalizedKey]);
      const localizedNamesWithEmoji = {};
      for (const [locale, value] of Object.entries(names)) {
        localizedNamesWithEmoji[locale] = `${emoji} ${value}`.trim();
      }

      return {
        id: normalizedKey,
        name: localizedNamesWithEmoji,
        description: descriptions,
      };
    })
    .filter(Boolean);
}

module.exports = { buildEntries };