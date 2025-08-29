// === Imports ===
const { pool } = require('../../datenbank');

// === Exports ===
module.exports = { speichereTurnier, insertNewTournamentRow, ladeTurnier, listFinishedTournaments, getLatestTournamentRow, closeAndClearLatestTournament, getNextTournamentNumber, deleteHoFByNumber };

// === Datenbank-Funktionen ===
// Speichert das aktuelle Turnier in der DB (aktualisiert die letzte Zeile oder fügt eine neue hinzu)
async function speichereTurnier(data) {
  try {
    const result = await pool.query('SELECT id FROM turniere ORDER BY created_at DESC LIMIT 1');
    const datenJSON = JSON.stringify(data);
    if (result.rows.length > 0) {
      await pool.query('UPDATE turniere SET status = $1, daten = $2, name = $3 WHERE id = $4', [
        data.status,
        datenJSON,
        data.name || 'Turnier',
        result.rows[0].id,
      ]);
    } else {
      await pool.query('INSERT INTO turniere (name, status, daten) VALUES ($1, $2, $3)', [
        data.name || 'Turnier',
        data.status || 'idle',
        datenJSON,
      ]);
    }
  } catch (err) {
    console.error('speichereTurnier error', err);
  }
}

// Fügt eine neue Turnier-Zeile in die DB ein
async function insertNewTournamentRow(data) {
  try {
    const datenJSON = JSON.stringify(data);
    await pool.query('INSERT INTO turniere (name, status, daten) VALUES ($1, $2, $3)', [
      data.name || 'Turnier',
      data.status || 'offen',
      datenJSON,
    ]);
  } catch (err) {
    console.error('insertNewTournamentRow error', err);
  }
}

// Lädt das aktuellste Turnier aus der DB
async function ladeTurnier() {
  try {
    const result = await pool.query('SELECT * FROM turniere ORDER BY created_at DESC LIMIT 1');
    const row = result.rows[0];
    if (!row) return null;
    const daten = row.daten || {};
    return {
      name: row.name || daten.name || 'Turnier',
      status: row.status || daten.status || 'offen',
      modus: daten.modus || '1v1',
      teilnehmer: daten.teilnehmer || {},
      teams: daten.teams || [],
      // Kämpfe können in älteren Turnieren noch unter "kaempfe" gespeichert sein
      kämpfe: daten.kämpfe || daten.kaempfe || [],
      // Archivierte Kämpfe ebenfalls robust laden
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

// Listet alle abgeschlossenen Turniere auf
async function listFinishedTournaments() {
  const res = await pool.query('SELECT * FROM turniere WHERE status = $1 ORDER BY created_at DESC', ['abgeschlossen']);
  return res.rows || [];
}

// Holt die neueste Turnier-Zeile (für Admin-Zwecke)
async function getLatestTournamentRow() {
  const r = await pool.query('SELECT * FROM turniere ORDER BY created_at DESC LIMIT 1');
  return r.rows[0] || null;
}

// Schließt und leert das aktuellste Turnier
async function closeAndClearLatestTournament() {
  const emptyPayload = {
    modus: '1v1',
    teilnehmer: {},
    teams: [],
    kämpfe: [],
    groups: [],
    kampfLog: []
  };
  await pool.query(`
    UPDATE turniere
    SET status = $1, daten = $2, name = $3
    WHERE id = (SELECT id FROM turniere ORDER BY created_at DESC LIMIT 1)
  `, ['geschlossen', JSON.stringify(emptyPayload), 'Turnier (geleert)']);
}

// Holt die nächste Turnier-Nummer (für automatische Benennung)
async function getNextTournamentNumber() {
  const res = await pool.query('SELECT name FROM turniere');
  let maxNum = 0;
  for (const r of res.rows) {
    const m = (r.name || '').match(/#(\d+)/);
    if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
  }
  return maxNum + 1;
}

// Löscht ein Turnier aus der Hall of Fame anhand seiner Nummer
async function deleteHoFByNumber(num) {
  const res = await pool.query('SELECT id, name, status FROM turniere WHERE status = $1', ['abgeschlossen']);
  const rows = res.rows || [];
  let target = null;
  for (const r of rows) {
    const m = (r.name || '').match(/#(\d+)/);
    if (m && parseInt(m[1], 10) === num) { target = r; break; }
  }
  if (!target) return { ok: false, reason: 'Nicht gefunden' };
  await pool.query('DELETE FROM turniere WHERE id = $1', [target.id]);
  return { ok: true };
}