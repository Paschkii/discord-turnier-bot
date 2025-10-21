// === Imports ===
const { EmbedBuilder } = require('discord.js');
const { KLASSE_LISTE } = require('../config/constants');
const { formatMK } = require('../utils');

// sehr einfache Alive-Heuristik: alle Teilnehmer sind aktiv,
// Verlierer fertiger KO-Fights gelten als ausgeschieden. Ab der KO-Phase
// werden jedoch nur jene Spieler als „🟢“ markiert, die noch Teil der
// laufenden Brackets sind.
// Bei Gruppen mit Mitgliedern (Teams) wird der Status des Teams
// angezeigt, nicht der einzelnen Mitglieder.
function computeAliveSet(daten = {}) {
  const teilnehmerIds = Object.keys(daten.teilnehmer || {});
  const fightsAktiv = Array.isArray(daten.kämpfe) ? daten.kämpfe : [];
  const fightsArchiv = Array.isArray(daten.kämpfeArchiv) ? daten.kämpfeArchiv : [];
  const relevantFights = [...fightsArchiv, ...fightsAktiv]
    .filter(f => f && (f.phase === 'ko' || f.phase === 'finale'));
  // Hilfsfunktion: Spieler aus einer Liste von Kämpfen sammeln
  const gatherPlayers = (fights) => {
    const set = new Set();
    for (const f of fights) {
      if (!f || !(f.phase === 'ko' || f.phase === 'finale')) continue;
      if (f.playerA?.id != null) set.add(String(f.playerA.id));
      if (f.playerB?.id != null) set.add(String(f.playerB.id));
    }
    return set;
  };
  // Alive-Logik
  let alive;
  if (['ko', 'finale', 'abgeschlossen'].includes(daten.status)) {
    const currentKOPlayers = gatherPlayers(fightsAktiv.filter(f => f && (f.phase === 'ko' || f.phase === 'finale')));
    if (currentKOPlayers.size > 0) {
      alive = currentKOPlayers;
    } else {
      // Fallback: wenn keine aktiven Kämpfe vorhanden sind, Mitglieder der
      // aktuellen Gruppen verwenden (z. B. Bronze-/Final-Gruppen) oder als
      // letzte Option alle Teilnehmer.
      const groupSet = new Set();
      for (const g of daten.groups || []) {
        for (const m of g.members || []) {
          if (m?.id != null) groupSet.add(String(m.id));
        }
      }
      alive = groupSet.size > 0 ? groupSet : new Set(teilnehmerIds);
    }
    // Verlierer fertiger Kämpfe entfernen
    for (const f of relevantFights) {
      if (!f.finished || !f.playerA || !f.playerB) continue;
      const winnerId = f.winnerId
        || ((Number.isInteger(f.scoreA) && Number.isInteger(f.scoreB))
          ? (f.scoreA > f.scoreB ? f.playerA.id : f.playerB.id)
          : null);
      const loserId = (winnerId === f.playerA.id) ? f.playerB.id
                    : (winnerId === f.playerB.id) ? f.playerA.id
                    : null;
      if (loserId != null) alive.delete(String(loserId));
    }
  } else {
    alive = new Set(teilnehmerIds);
  }
  return alive;
}

// Hilfsfunktion: Array in Chunks aufteilen
function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

// Baut die Turnier-Info-Embeds
function buildTournamentInfoEmbeds(daten = {}) {
  const title = `🏆 ${daten.name || 'Turnier'}`;
  const teilnehmerArr = Object.entries(daten.teilnehmer || {})
    .map(([id, p]) => ({ id, ...p }))
    .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'en', { sensitivity: 'base' }));
  // Alive-Set berechnen
  const alive = computeAliveSet(daten);
  // Felder bauen
  const fields = [];

  // Phase & Teilnehmerzahl kompakt
  const phaseLabel = ({
    offen: 'Anmeldung Offen',
    quali: 'Qualifikation',
    gruppen: 'Gruppenphase',
    ko: 'K.O.-Phase',
    finale: 'Finale',
    abgeschlossen: 'Abgeschlossen',
  })[daten.status] || (daten.status || '—');
  // Baut die Felder zusammen
  fields.push({ name: '📟 Phase', value: phaseLabel, inline: false });
  fields.push({ name: '📝 Anmeldungen', value: String(teilnehmerArr.length), inline: false });

  // 💰 Pott-Block (🥇🥈🥉 untereinander)
  const p = daten.prize || null;
  const prizeLine = (emoji, textValue, numericValue) => {
    if (typeof textValue === 'string' && textValue.trim()) return `${emoji} ${textValue.trim()}`;
    if (typeof numericValue === 'number' && Number.isFinite(numericValue)) {
      return `${emoji} ${formatMK(numericValue)}`;
    }
    return `${emoji} -`;
  };
  fields.push({
    name: '💰 Pott',
    value: [
      prizeLine('🥇', p?.text?.first, p?.firstMK),
      prizeLine('🥈', p?.text?.second, p?.secondMK),
      prizeLine('🥉', p?.text?.third, p?.thirdMK),
    ].join('\n'),
    inline: false,
  });

  // 👤 Teilnehmerliste (immer alphabetisch, mit Klassen-Emoji + Alive/Out)
  const emojiMap = Object.fromEntries(KLASSE_LISTE.map(k => [k.name, k.emoji]));
  const formatParticipant = (participant) => {
    const prefix = `${alive.has(participant.id) ? '🟢' : '🔴'} ${participant.name || '—'}`;
    if (Array.isArray(participant.members) && participant.members.length > 0) {
      const memberLines = participant.members.map(member => {
        const cls = member.klasse ? ` - ${emojiMap[member.klasse] || ''} ${member.klasse}` : '';
        return `   • ${member.name}${cls}`;
      });
      return [prefix, ...memberLines].join('\n');
    }
    const cls = participant.klasse ? ` - ${emojiMap[participant.klasse] || ''} ${participant.klasse}` : '';
    return `${prefix}${cls}`;
  };
  // Baut die Gruppen-Felder, falls vorhanden
  const buildGroupFields = () => {
    const groups = Array.isArray(daten.groups) ? daten.groups.filter(g => Array.isArray(g?.members) && g.members.length > 0) : [];
    if (groups.length === 0) return false;
    // Hilfsfunktion: Text in 1024-Zeichen-Chunks aufteilen
    const splitValue = (value) => {
      const max = 1024;
      if (value.length <= max) return [value];
      const lines = value.split('\n');
      const chunks = [];
      let current = '';
      const flush = () => {
        if (current) {
          chunks.push(current);
          current = '';
        }
      };
      // Zeilenweise aufteilen
      for (const line of lines) {
        const needsNewline = current.length > 0;
        const tentativeLength = current.length + (needsNewline ? 1 : 0) + line.length;
        // Zeile passt noch rein
        if (tentativeLength <= max) {
          current = needsNewline ? `${current}\n${line}` : line;
          continue;
        }
        // Zeile passt nicht mehr rein, also aktuellen Chunk
        flush();
        if (line.length <= max) {
          current = line;
        } else {
          for (let i = 0; i < line.length; i += max) {
            chunks.push(line.slice(i, i + max));
          }
        }
      }
      // Letzten Chunk noch flushen
      flush();
      return chunks;
    };
    // Gruppen-Felder bauen
    for (const group of groups) {
      const label = group.displayName || group.name || 'Gruppe';
      const participants = group.members.map(formatParticipant);
      const value = participants.length ? participants.join('\n') : '—';
      const parts = splitValue(value);
      parts.forEach((part, idx) => {
        fields.push({
          name: idx === 0 ? label : `${label} (Fortsetzung)`,
          value: part,
          inline: false,
        });
      });
      }

    return true;
  };
  // Versucht, Gruppen-Felder zu bauen
  const hasGroupFields = buildGroupFields();
  // Falls keine Gruppen-Felder, dann ein Teilnehmer-Feld
  if (!hasGroupFields) {
    const lines = teilnehmerArr.map(formatParticipant);
    if (lines.length) {
      const chunks = chunk(lines, 20); // Discord-Feldgröße im Blick behalten
      chunks.forEach((c, idx) => {
        fields.push({
          name: idx === 0 ? '👥 Teilnehmer (🟢 / 🔴)' : ' ',
          value: c.join('\n'),
          inline: false,
        });
      });
    } else {
      fields.push({ name: '👤 Teilnehmer', value: '—', inline: false });
    }
  }
  // Embed bauen
  const embed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle(title)
    .addFields(fields)
    .setTimestamp();

  return [embed];
}

// === Exports ===
module.exports = { buildTournamentInfoEmbeds };