const {
  getEmojiById,
  getEmojiByKey,
  getEmojiByName,
} = require('./emojiSnapshot');

// Gemeinsame Hilfsfunktionen und Konstanten
function resolveDiscordEmoji(name, fallback = '') {
  const normalizedName = typeof name === 'string' ? name.trim() : '';
  const fallbackString = fallback == null ? '' : String(fallback);
  const fallbackTrimmed = fallbackString.trim();

  if (!normalizedName) {
    return fallbackTrimmed || '';
  }

  const lookupEntry =
    getEmojiByKey(normalizedName)
    || getEmojiByName(normalizedName)
    || (Number.isInteger(Number(normalizedName)) ? getEmojiById(normalizedName) : null);

  if (lookupEntry?.mention) {
    return lookupEntry.mention;
  }

  const normalizedFallback = fallbackTrimmed || `:${normalizedName}:`;

  const envKey = `EMOJI_${normalizedName.toUpperCase()}`;
  const raw = process.env[envKey];
  if (!raw) return normalizedFallback;

  const trimmed = String(raw).trim();
  if (!trimmed) return normalizedFallback;

  if (/^<a?:\w{2,}:\d+>$/.test(trimmed)) return trimmed;

  const idOnly = trimmed.match(/^(\d+)$/);
  if (idOnly) return `<:${normalizedName}:${idOnly[1]}>`;

  const tuple = trimmed.match(/^:?([a-zA-Z0-9_]{2,}):(\d+)>?$/);
  if (tuple) return `<:${tuple[1]}:${tuple[2]}>`;

  return trimmed;
}

const SUPPORTED_LOCALES = ['de', 'en', 'fr', 'es', 'it', 'pt'];

function resolveLocaleKey(locale = 'de') {
  const raw = typeof locale === 'string' ? locale.toLowerCase() : '';
  if (!raw) return 'de';
  for (const loc of SUPPORTED_LOCALES) {
    if (raw === loc || raw.startsWith(`${loc}-`)) return loc;
  }
  return 'de';
}

function getLocalizedText(entry, locale = 'de') {
  if (!entry) return '';
  if (typeof entry === 'string') return entry;
  if (typeof entry === 'object') {
    const key = resolveLocaleKey(locale);
    return (
      entry[key] ||
      entry.de ||
      entry.en ||
      entry.fr ||
      entry.es ||
      entry.it ||
      entry.pt ||
      Object.values(entry).find(Boolean) ||
      ''
    );
  }
  return '';
}

const ICON_BASE = 'https://paschkii.github.io/dofus-touch-icons/';

module.exports = {
  ICON_BASE,
  SUPPORTED_LOCALES,
  getLocalizedText,
  resolveDiscordEmoji,
  resolveLocaleKey,
};