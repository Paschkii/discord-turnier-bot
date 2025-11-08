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
  if (fallbackValue && typeof fallbackValue === 'object') {
    const configuredKey = typeof fallbackValue.key === 'string' ? fallbackValue.key.trim() : '';
    if (configuredKey) {
      return configuredKey;
    }
    if (typeof fallbackValue.fallback === 'string') {
      return extractKeyFromFallback(propertyKey, fallbackValue.fallback);
    }
  }

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

function isLeafDefinition(value) {
  return (
    value
    && typeof value === 'object'
    && !Array.isArray(value)
    && ('fallback' in value || 'key' in value || 'variants' in value)
  );
}

function normalizeLeafDefinition(propertyKey, value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const fallback = typeof value.fallback === 'string' ? value.fallback : '';
    const normalizedVariants = {};
    if (value.variants && typeof value.variants === 'object' && !Array.isArray(value.variants)) {
      for (const [variantName, variantValue] of Object.entries(value.variants)) {
        normalizedVariants[variantName] = normalizeLeafDefinition(variantName, variantValue);
      }
    }

    return {
      key: extractKeyFromFallback(propertyKey, value),
      fallback,
      variants: normalizedVariants,
    };
  }

  const fallback = typeof value === 'string' ? value : '';
  return {
    key: extractKeyFromFallback(propertyKey, fallback),
    fallback,
    variants: {},
  };
}

function resolveLeaf(definition, path) {
  const mention = resolveMentionForKey(definition.key, definition.fallback, path);
  const detail = {
    key: definition.key,
    fallback: definition.fallback,
    mention,
    variants: {},
  };
  const keyEntry = { key: definition.key };

  const variantEntries = Object.entries(definition.variants || {});
  if (variantEntries.length) {
    keyEntry.variants = {};
  }

  for (const [variantName, variantDefinition] of variantEntries) {
    const variantPath = [...path, 'variants', variantName];
    const variantResolved = resolveLeaf(variantDefinition, variantPath);
    detail.variants[variantName] = variantResolved.detail;
    keyEntry.variants[variantName] = variantResolved.keyEntry;
  }

  return { mention, detail, keyEntry };
}

function buildEmojiStructure(source, path = [], keyReferenceTarget = null, detailReferenceTarget = null) {
  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    return {};
  }

  const result = {};
  for (const [property, value] of Object.entries(source)) {
    const nextPath = [...path, property];

    if (typeof value === 'string' || isLeafDefinition(value)) {
      const normalized = normalizeLeafDefinition(property, value);
      const resolved = resolveLeaf(normalized, nextPath);
      result[property] = resolved.mention;
      if (keyReferenceTarget) keyReferenceTarget[property] = resolved.keyEntry;
      if (detailReferenceTarget) detailReferenceTarget[property] = resolved.detail;
      continue;
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const nestedKeyReference = keyReferenceTarget ? (keyReferenceTarget[property] = {}) : null;
      const nestedDetailReference = detailReferenceTarget
        ? (detailReferenceTarget[property] = {})
        : null;
      result[property] = buildEmojiStructure(
        value,
        nextPath,
        nestedKeyReference,
        nestedDetailReference,
      );
    }
  }

  return result;
}

const EMOJI_KEYS = {};
const EMOJI_DETAILS = {};
const EMOJI_LIST = buildEmojiStructure(FALLBACK_EMOJIS, [], EMOJI_KEYS, EMOJI_DETAILS);

module.exports = {
  EMOJI_DETAILS,
  EMOJI_KEYS,
  EMOJI_LIST,
  FALLBACK_EMOJIS,
};