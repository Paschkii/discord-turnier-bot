// === Imports ===
const { EmbedBuilder } = require('discord.js');
const { KLASSE_LISTE } = require('../config/constants');
const { formatMK } = require('../utils');

// sehr einfache Alive-Heuristik: alle Teilnehmer sind aktiv,
// Verlierer fertiger KO-Fights gelten als ausgeschieden. Ab der KO-Phase
// werden jedoch nur jene Spieler als „🟢“ markiert, die noch Teil der
// laufenden Brackets sind.
function computeAliveSet(daten = {}) {
  const teilnehmerIds = Object.keys(daten.teilnehmer || {});
  const fightsAktiv = Array.isArray(daten.kämpfe) ? daten.kämpfe : [];
  const fightsArchiv = Array.isArray(daten.kämpfeArchiv) ? daten.kämpfeArchiv : [];
  const relevantFights = [...fightsArchiv, ...fightsAktiv]
    .filter(f => f && (f.phase === 'ko' || f.phase === 'finale'));
  
  const gatherPlayers = (fights) => {
    const set = new Set();
    for (const f of fights) {
      if (!f || !(f.phase === 'ko' || f.phase === 'finale')) continue;
      if (f.playerA?.id != null) set.add(String(f.playerA.id));
      if (f.playerB?.id != null) set.add(String(f.playerB.id));
    }
    return set;
  };

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
    .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'de', { sensitivity: 'base' }));

  const alive = computeAliveSet(daten);

  const fields = [];

  // Phase & Teilnehmerzahl kompakt
  const phaseLabel = ({
    offen: 'Offen',
    quali: 'Qualifikation',
    gruppen: 'Gruppenphase',
    ko: 'K.O.-Phase',
    finale: 'Finale',
    abgeschlossen: 'Abgeschlossen',
  })[daten.status] || (daten.status || '—');

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
  const lines = teilnehmerArr.map(p => {
    const isTeam = Array.isArray(p.members) && p.members.length > 0;
    const cls = (!isTeam && p.klasse) ? ` - ${emojiMap[p.klasse] || ''} ${p.klasse}` : '';
    const members = isTeam
      ? ` (${p.members.map(m => m.name).join(', ')})`
      : '';
    return `${alive.has(p.id) ? '🟢' : '🔴'} ${p.name}${cls}${members}`;
  });

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

  const embed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle(title)
    .addFields(fields)
    .setTimestamp();

  return [embed];
}

// === Exports ===
module.exports = { buildTournamentInfoEmbeds };