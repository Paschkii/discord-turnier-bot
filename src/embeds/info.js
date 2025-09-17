// === Imports ===
const { EmbedBuilder } = require('discord.js');
const { KLASSE_LISTE } = require('../config/constants');
const { formatMK } = require('../utils');

// sehr einfache Alive-Heuristik: alle Teilnehmer sind aktiv,
// Verlierer fertiger KO-Fights gelten als ausgeschieden
function computeAliveSet(daten = {}) {
  const alive = new Set(Object.keys(daten.teilnehmer || {}));
  const fights = Array.isArray(daten.kämpfe) ? daten.kämpfe : [];
  if (['ko', 'finale', 'abgeschlossen'].includes(daten.status)) {
    for (const f of fights) {
      if (!f.finished || !f.playerA || !f.playerB) continue;
      const loserId = (f.winnerId === f.playerA.id) ? f.playerB.id
                    : (f.winnerId === f.playerB.id) ? f.playerA.id
                    : null;
      if (loserId) alive.delete(loserId);
    }
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
  const title = `🏆 ${daten.name || 'Turnier'} — Übersicht`;
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

  // 💰 Pott-Block (mehrzeilig)
  const p = daten.prize;
  const potValue = p
    ? [
        '**Gesamtpott:**',
        `💰 ${p.text?.total ?? formatMK(p.totalMK)}`,
        '',
        '**Aufteilung:**',
        `🥇 ${p.text?.first  ?? formatMK(p.firstMK)}`,
        `🥈 ${p.text?.second ?? formatMK(p.secondMK)}`,
        `🥉 ${p.text?.third  ?? formatMK(p.thirdMK)}`
      ].join('\n')
    : '**Gesamtpott:**\n—\n**Aufteilung:**\n—';

  // 👤 Teilnehmerliste (immer alphabetisch, mit Klassen-Emoji + Alive/Out)
  const emojiMap = Object.fromEntries(KLASSE_LISTE.map(k => [k.name, k.emoji]));
  const lines = teilnehmerArr.map(p => {
    const cls = p.klasse ? ` - ${emojiMap[p.klasse] || ''} ${p.klasse}` : '';
    return `${alive.has(p.id) ? '🟢' : '🔴'} ${p.name}${cls}`;
  });

  if (lines.length) {
    const chunks = chunk(lines, 20); // Discord-Feldgröße im Blick behalten
    chunks.forEach((c, idx) => {
      fields.push({
        name: idx === 0 ? '👥 Teilnehmer (🟢 dabei / 🔴 ausgeschieden)' : ' ',
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