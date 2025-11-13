// datenbank.js — cleaned
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Helpful: catch unexpected idle client errors
pool.on('error', (err) => {
  console.error('Unexpected PG idle client error', err);
});

async function initDB() {
  try {
    // Tabelle anlegen (mit daten JSONB)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS turniere (
        id SERIAL PRIMARY KEY,
        guild_id TEXT NOT NULL,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        daten JSONB DEFAULT '{}'
      );
    `);
    
    // Sprachen Setting
    await pool.query(`
      CREATE TABLE IF NOT EXISTS guild_settings (
        id SERIAL PRIMARY KEY,
        guild_id TEXT NOT NULL UNIQUE,
        language TEXT NOT NULL DEFAULT 'en',
        guild_name TEXT,
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    // Jobs in Datenbank speichern
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_jobs (
        id SERIAL PRIMARY KEY,
        guild_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        job_id TEXT NOT NULL,
        level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 100),
        updated_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT user_jobs_unique UNIQUE (guild_id, user_id, job_id)
      );
    `);

    // Guild name hinzufügen, falls aus alten Deploys fehlt (idempotent)
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'guild_settings' AND column_name = 'guild_name'
        ) THEN
          ALTER TABLE guild_settings ADD COLUMN guild_name TEXT;
        END IF;
      END
      $$;
    `);

    // Falls "guild_id" aus alten Deploys fehlt (idempotent)
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'turniere' AND column_name = 'guild_id'
        ) THEN
          ALTER TABLE turniere ADD COLUMN guild_id TEXT NOT NULL DEFAULT '0';
        END IF;
      END
      $$;
    `);

    // Falls "daten" aus alten Deploys fehlen sollte (idempotent)
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'turniere' AND column_name = 'daten'
        ) THEN
          ALTER TABLE turniere ADD COLUMN daten JSONB DEFAULT '{}';
        END IF;
      END
      $$;
    `);

    // Defaults MERGEN (nicht überschreiben) – inkl. neuer Keys
    await pool.query(`
      UPDATE turniere
      SET daten = jsonb_strip_nulls(
        COALESCE(daten, '{}'::jsonb) ||
        jsonb_build_object(
          'modus', COALESCE(daten->>'modus', '1v1'),
          'teilnehmer', COALESCE(daten->'teilnehmer', '{}'::jsonb),
          'teams', COALESCE(daten->'teams', '[]'::jsonb),
          'kämpfe', COALESCE(daten->'kämpfe', '[]'::jsonb),
          'groups', COALESCE(daten->'groups', '[]'::jsonb),
          'kampfLog', COALESCE(daten->'kampfLog', '[]'::jsonb),
          'pendingTieBreakers', COALESCE(daten->'pendingTieBreakers', '[]'::jsonb),
          'podium', COALESCE(daten->'podium', 'null'::jsonb),
          'prize', COALESCE(daten->'prize', 'null'::jsonb)
        )
      )
      WHERE
           daten IS NULL
        OR daten->>'modus' IS NULL
        OR daten->'teilnehmer' IS NULL
        OR daten->'teams' IS NULL
        OR daten->'kämpfe' IS NULL
        OR daten->'groups' IS NULL
        OR daten->'kampfLog' IS NULL
        OR daten->'pendingTieBreakers' IS NULL
        OR daten->'podium' IS NULL
        OR daten->'prize' IS NULL;
    `);

    // Indizes
    await pool.query(`CREATE INDEX IF NOT EXISTS turniere_created_at_desc_idx ON turniere (created_at DESC);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS turniere_status_created_idx ON turniere (status, created_at DESC);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS turniere_guild_status_created_idx ON turniere (guild_id, status, created_at DESC);`);
    await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS guild_settings_guild_id_idx ON guild_settings (guild_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS user_jobs_guild_user_idx ON user_jobs (guild_id, user_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS user_jobs_guild_job_idx ON user_jobs (guild_id, job_id);`);

    console.log('✅ Datenbank-Initialisierung abgeschlossen');
  } catch (err) {
    console.error('❌ Fehler bei DB-Init:', err);
  }
}

module.exports = { pool, initDB };