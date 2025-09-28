// === Imports ===
const { pool } = require('../../datenbank');

// === Constants & Variables ===
const DEFAULT_LANGUAGE = 'de';
// Unterstützte Sprachen
const SUPPORTED_LANGUAGES = new Set(['de', 'en', 'fr', 'es', 'it', 'pt']);
// (in sync mit src/config/languages/*)

// === Funktionen ===
// Sprache der Gilde abfragen (mit Fallback)
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
// Sprache der Gilde setzen (oder aktualisieren)
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
// Benutzerdefinierten Guild-Namen abfragen (für automatische Turniernamen)
async function getGuildCustomName(guildId) {
  if (!guildId) return null;
  try {
    const res = await pool.query(
      'SELECT guild_name FROM guild_settings WHERE guild_id = $1 LIMIT 1',
      [guildId]
    );
    const stored = res.rows?.[0]?.guild_name;
    if (typeof stored === 'string') {
      const trimmed = stored.trim();
      return trimmed.length > 0 ? trimmed : null;
    }
  } catch (err) {
    console.error('[guildSettings] getGuildCustomName failed', err);
  }
  return null;
}
// Benutzerdefinierten Guild-Namen setzen (für automatische Turniernamen)
async function setGuildCustomName(guildId, name) {
  if (!guildId) {
    throw new Error('guildId missing');
  }
  const normalized = typeof name === 'string' ? name.trim() : '';
  const value = normalized.length > 0 ? normalized : null;
  await pool.query(
    `INSERT INTO guild_settings (guild_id, guild_name, updated_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT (guild_id)
     DO UPDATE SET guild_name = EXCLUDED.guild_name, updated_at = NOW()`,
    [guildId, value]
  );
  return value;
}

// === Exports ===
module.exports = {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES: Array.from(SUPPORTED_LANGUAGES),
  getGuildLanguage,
  setGuildLanguage,
  getGuildCustomName,
  setGuildCustomName,
};