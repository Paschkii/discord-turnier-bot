// === Imports ===
const { pool } = require('../../datenbank');

// Speichert das aktuelle Turnier (aktualisiert neueste Zeile der Guild oder fügt neu ein)
async function speichereTurnier(guildId, data) {
  try {
    const datenJSON = JSON.stringify(data);
    // neueste Zeile PRO GUILD
    const newest = await pool.query(
      'SELECT id FROM turniere WHERE guild_id = $1 ORDER BY created_at DESC LIMIT 1',
      [guildId]
    );

    if (newest.rows.length > 0) {
      await pool.query(
        'UPDATE turniere SET status = $1, daten = $2, name = $3 WHERE id = $4 AND guild_id = $5',
        [data.status, datenJSON, data.name || 'Turnier', newest.rows[0].id, guildId]
      );
    } else {
      await pool.query(
        'INSERT INTO turniere (guild_id, name, status, daten) VALUES ($1, $2, $3, $4)',
        [guildId, data.name || 'Turnier', data.status || 'idle', datenJSON]
      );
    }
  } catch (err) {
    console.error('speichereTurnier error', err);
  }
}

// Fügt eine neue Turnier-Zeile ein
async function insertNewTournamentRow(guildId, data) {
  try {
    const datenJSON = JSON.stringify(data);
    await pool.query(
      'INSERT INTO turniere (guild_id, name, status, daten) VALUES ($1, $2, $3, $4)',
      [guildId, data.name || 'Turnier', data.status || 'offen', datenJSON]
    );
  } catch (err) {
    console.error('insertNewTournamentRow error', err);
  }
}

// Lädt das aktuellste Turnier der Guild
async function ladeTurnier(guildId) {
  try {
    const result = await pool.query(
      'SELECT * FROM turniere WHERE guild_id = $1 ORDER BY created_at DESC LIMIT 1',
      [guildId]
    );
    const row = result.rows[0];
    if (!row || row.status === 'geschlossen' || row.status === 'abgeschlossen') return null;

    const daten = row.daten || {};
    return {
      name: row.name || daten.name || 'Turnier',
      status: row.status || daten.status || 'offen',
      modus: daten.modus || '1v1',
      teilnehmer: daten.teilnehmer || {},
      teams: daten.teams || [],
      kämpfe: daten.kämpfe || daten.kaempfe || [],
      kämpfeArchiv: daten.kämpfeArchiv || daten.kaempfeArchiv || [],
      groups: daten.groups || [],
      pendingTieBreakers: daten.pendingTieBreakers || [],
      kampfLog: daten.kampfLog || [],
      podium: daten.podium || null,
      prize: daten.prize || null,
    };
  } catch (err) {
    console.error('ladeTurnier error', err);
    return null;
  }
}

// Listet alle abgeschlossenen Turniere der Guild
async function listFinishedTournaments(guildId) {
  const res = await pool.query(
    'SELECT * FROM turniere WHERE guild_id = $1 AND status = $2 ORDER BY created_at DESC',
    [guildId, 'abgeschlossen']
  );
  return res.rows || [];
}

// Holt die neueste Turnier-Zeile (für Admin-Zwecke)
async function getLatestTournamentRow(guildId) {
  const r = await pool.query(
    'SELECT * FROM turniere WHERE guild_id = $1 ORDER BY created_at DESC LIMIT 1',
    [guildId]
  );
  return r.rows[0] || null;
}

// Schließt und leert das aktuellste Turnier der Guild
async function closeAndClearLatestTournament(guildId) {
  const emptyPayload = {
    modus: '1v1',
    teilnehmer: {},
    teams: [],
    kämpfe: [],
    groups: [],
    kampfLog: []
  };
  await pool.query(
    `UPDATE turniere
     SET status = $1, daten = $2, name = $3
     WHERE id = (
       SELECT id FROM turniere
       WHERE guild_id = $4
       ORDER BY created_at DESC
       LIMIT 1
     )`,
    ['geschlossen', JSON.stringify(emptyPayload), 'Turnier (geleert)', guildId]
  );
}

// Nächste Turnier-Nummer (nur abgeschlossene/geschlossene dieser Guild)
async function getNextTournamentNumber(guildId) {
  const res = await pool.query(
    'SELECT name FROM turniere WHERE guild_id = $1 AND (status = $2 OR status = $3)',
    [guildId, 'abgeschlossen', 'geschlossen']
  );
  let maxNum = 0;
  for (const r of res.rows) {
    const m = (r.name || '').match(/#(\d+)/);
    if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
  }
  return maxNum + 1;
}

// Löscht einen HoF-Eintrag anhand seiner Nummer (nur in dieser Guild)
async function deleteHoFByNumber(guildId, num) {
  const res = await pool.query(
    'SELECT id, name, status FROM turniere WHERE guild_id = $1',
    [guildId]
  );
  const rows = res.rows || [];
  let target = null;
  for (const r of rows) {
    const m = (r.name || '').match(/#(\d+)/);
    if (m && parseInt(m[1], 10) === num) { target = r; break; }
  }
  if (!target) return { ok: false, reason: 'Nicht gefunden' };
  await pool.query('DELETE FROM turniere WHERE id = $1 AND guild_id = $2', [target.id, guildId]);
  return { ok: true };
}

// === Exports ===
module.exports = {
  closeAndClearLatestTournament,
  deleteHoFByNumber,
  insertNewTournamentRow,
  getLatestTournamentRow,
  getNextTournamentNumber,
  listFinishedTournaments,
  ladeTurnier,
  speichereTurnier
};