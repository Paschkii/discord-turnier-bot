const {
  resolveDiscordEmoji,
} = require('./shared');
const {
  getEmojiByKey,
  getEmojiByName,
} = require('./emojiSnapshot');
const FALLBACK_EMOJIS = require('./emoji-fallback.json');

const missingSnapshotKeys = new Set();

function extractKeyFromFallback(propertyKey, fallbackValue) {
  if (typeof fallbackValue === 'string') {
    const trimmed = fallbackValue.trim();
    const match = trimmed.match(/^<a?:([^:>]+):\d+>$/);
    if (match) return match[1];
  }
  return propertyKey;
}

function formatPath(path) {
  return path.length ? path.join('.') : '';
}

function resolveMentionForKey(key, fallbackValue, path) {
  const snapshotEntry = getEmojiByKey(key) || getEmojiByName(key);
  if (snapshotEntry?.mention) {
    return snapshotEntry.mention;
  }

    const fallbackString = fallbackValue == null ? '' : String(fallbackValue);
    const resolved = resolveDiscordEmoji(key, fallbackString);

    if (!missingSnapshotKeys.has(key)) {
        missingSnapshotKeys.add(key);
        const location = formatPath(path);
        const locationSuffix = location ? ` (${location})` : '';
        let explanation = 'Using default colon fallback.';
        if (resolved && resolved !== `:${key}:`) {
        if (fallbackString && resolved === fallbackString) {
            explanation = `Using configured fallback "${fallbackString}".`;
        } else if (resolved !== fallbackString && fallbackString) {
            explanation = `Using environment override over fallback "${fallbackString}".`;
        } else if (fallbackString) {
            explanation = `Using configured fallback "${fallbackString}".`;
        } else {
            explanation = 'Using environment override.';
        }
        } else if (fallbackString) {
        explanation = `Using configured fallback "${fallbackString}".`;
        }
        console.warn(`[emoji] Missing snapshot entry for key "${key}"${locationSuffix}. ${explanation}`);
    }

    return resolved;
}

function buildEmojiStructure(source, path = [], keyReferenceTarget = null) {
  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    return {};
  }

  const result = {};
  for (const [property, value] of Object.entries(source)) {
    const nextPath = [...path, property];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const nestedReference = keyReferenceTarget ? (keyReferenceTarget[property] = {}) : null;
      result[property] = buildEmojiStructure(value, nextPath, nestedReference);
    } else {
      const fallbackValue = typeof value === 'string' ? value : '';
      const key = extractKeyFromFallback(property, fallbackValue);
      if (keyReferenceTarget) keyReferenceTarget[property] = key;
      result[property] = resolveMentionForKey(key, fallbackValue, nextPath);
    }
  }

  return result;
}

const EMOJI_KEYS = {};
const EMOJI_LIST = buildEmojiStructure(FALLBACK_EMOJIS, [], EMOJI_KEYS);

module.exports = {
  EMOJI_KEYS,
  EMOJI_LIST,
  FALLBACK_EMOJIS,
};