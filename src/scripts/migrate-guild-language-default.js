#!/usr/bin/env node

// This script normalizes guild_settings.language entries so that rows without an
// explicit language selection fall back to the new default.

const { pool } = require('../../datenbank');
const { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } = require('../store/guildSettings');

async function migrateDefaultLanguage() {
  console.log('🔄 Updating guild_settings.language defaults to "%s" …', DEFAULT_LANGUAGE);
  const result = await pool.query(
    `UPDATE guild_settings
       SET language = $1,
           updated_at = NOW()
     WHERE language IS NULL
        OR COALESCE(BTRIM(language), '') = ''
        OR NOT (language = ANY($2))`,
    [DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES]
  );
  console.log('✅ Updated %d guild(s).', result.rowCount);
}

migrateDefaultLanguage()
  .catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());