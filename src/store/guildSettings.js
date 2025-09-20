// === Imports ===
const { pool } = require('../../datenbank');

const DEFAULT_LANGUAGE = 'de';

const SUPPORTED_LANGUAGES = new Set(['de', 'en', 'fr', 'es', 'it', 'pt']);

async function getGuildLanguage(guildId) {
  if (!guildId) return DEFAULT_LANGUAGE;
  try {
    const res = await pool.query(
      'SELECT language FROM guild_settings WHERE guild_id = $1 LIMIT 1',
      [guildId]
    );
    const lang = res.rows?.[0]?.language;
    if (typeof lang === 'string' && SUPPORTED_LANGUAGES.has(lang)) {
      return lang;
    }
  } catch (err) {
    console.error('[guildSettings] getGuildLanguage failed', err);
  }
  return DEFAULT_LANGUAGE;
}

async function setGuildLanguage(guildId, language) {
  if (!guildId) {
    throw new Error('guildId missing');
  }
  const normalized = String(language).toLowerCase();
  if (!SUPPORTED_LANGUAGES.has(normalized)) {
    throw new Error(`unsupported language: ${language}`);
  }
  await pool.query(
    `INSERT INTO guild_settings (guild_id, language, updated_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT (guild_id)
     DO UPDATE SET language = EXCLUDED.language, updated_at = NOW()`,
    [guildId, normalized]
  );
  return normalized;
}

module.exports = {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES: Array.from(SUPPORTED_LANGUAGES),
  getGuildLanguage,
  setGuildLanguage,
};