// === Interaction Locale Helper ===
const {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  getGuildLanguage,
} = require('../store/guildSettings');

const SUPPORTED_LANGUAGE_SET = new Set(SUPPORTED_LANGUAGES);

function normalizeLocale(locale) {
  if (!locale) return null;
  const lower = String(locale).toLowerCase();
  if (SUPPORTED_LANGUAGE_SET.has(lower)) {
    return lower;
  }
  const [base] = lower.split('-');
  if (SUPPORTED_LANGUAGE_SET.has(base)) {
    return base;
  }
  return null;
}

async function resolveInteractionLocale(interaction) {
  const candidates = [];

  if (interaction?.guildId) {
    try {
      const stored = await getGuildLanguage(interaction.guildId);
      if (stored) {
        candidates.push(stored);
      }
    } catch (err) {
      // ignore and fall back to interaction locales
    }
  }

  candidates.push(
    interaction?.locale,
    interaction?.guildLocale,
    interaction?.user?.locale,
  );

  for (const candidate of candidates) {
    const normalized = normalizeLocale(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return DEFAULT_LANGUAGE;
}

module.exports = { resolveInteractionLocale };