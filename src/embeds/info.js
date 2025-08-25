// === Imports ===
const { EmbedBuilder } = require('discord.js');
const { KLASSE_LISTE } = require('../config/constants');
const { formatMK } = require('../utils');

// Wer ist noch "im Rennen"?
function computeAliveSet(daten) {
  const alive = new Set();
  const fights = Array.isArray(daten.kämpfe) ? daten.kämpfe : [];

  switch (daten.status) {
    case 'ko': {
      for (const f of fights.filter(x => x.phase === 'ko')) {
        if (f.finished) {
          const winnerId = f.winnerId ?? ((f.scoreA > f.scoreB) ? f.playerA.id : f.playerB.id);
          if (winnerId) alive.add(winnerId);
        } else {
          if (f.playerA?.id) alive.add(f.playerA.id);
          if (f.playerB?.id) alive.add(f.playerB.id);
        }
      }
      break;
    }
    case 'finale': {
      const finals = fights.filter(x => x.phase === 'finale');
      if (finals.length) {
        for (const f of finals) {
          if (!f.finished) {
            if (f.playerA?.id) alive.add(f.playerA.id);
            if (f.playerB?.id) alive.add(f.playerB.id);
          }
        }
      } else {
        // falls "finale" aber keine finale fights (Edge), alle Teilnehmer als dabei
        Object.keys(daten.teilnehmer || {}).forEach(id => alive.add(id));
      }
      break;
    }
    case 'abgeschlossen': {
      // Turnier vorbei → niemand mehr "dabei"
      break;
    }
    default: {
      // 'offen', 'quali', 'gruppen' → alle sind noch dabei
      Object.keys(daten.teilnehmer || {}).forEach(id => alive.add(id));
    }
  }
  return alive;
}
// Übersichtsembed bauen (mit Pott & Teilnehmerstatus)
function buildTournamentInfoEmbeds(daten) {
  const title = `🏆 ${daten.name || 'Turnier'} — Übersicht`;
  const teilnehmerArr = Object.entries(daten.teilnehmer || {}).map(([id, p]) => ({ id, ...p }));
  const alive = computeAliveSet(daten);

  // Pott
  const p = daten.prize || null;
  const potLine = p
    ? `Gesamtpott: **${p.text?.total ?? formatMK(p.totalMK)}**\nAufteilung: 🥇 **${p.text?.first ?? formatMK(p.firstMK)}** · 🥈 **${p.text?.second ?? formatMK(p.secondMK)}** · 🥉 **${p.text?.third ?? formatMK(p.thirdMK)}**`
    : 'Gesamtpott: **—**\nAufteilung: **—**';

  // Teilnehmerliste (in mehrere Felder splitten, max. ~25/Liste)
  // Klasse-Emoji-Mapping
  const emojiMap = Object.fromEntries(KLASSE_LISTE.map(k => [k.name, k.emoji]));

  const lines = teilnehmerArr
    .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
    .map(p => {
      const cls = p.klasse ? ` - ${emojiMap[p.klasse] || ''} ${p.klasse}` : '';
      return `${alive.has(p.id) ? '🟢' : '🔴'} ${p.name}${cls}`;
    });

  const chunk = (arr, n) => {
    const out = [];
    for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
    return out;
  };
  const chunks = chunk(lines, 20);

  const embed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle(title)
    .setDescription([
      `👥 **${teilnehmerArr.length}** Teilnehmer`,
      `🧭 Phase: **${({offen:'Offen',quali:'Qualifikation',gruppen:'Gruppenphase',ko:'K.O.-Phase',finale:'Finale',abgeschlossen:'Abgeschlossen'})[daten.status] || daten.status}**`,
      '',
      `💰 **Preisgeld**\n${potLine}`,
    ].join('\n'))
    .setTimestamp();

  if (lines.length) {
    chunks.forEach((c, idx) => {
      embed.addFields({
        name: idx === 0 ? '👤 Teilnehmer (🟢 dabei / 🔴 ausgeschieden)' : ' ',
        value: c.join('\n'),
      });
    });
  } else {
    embed.addFields({ name: '👤 Teilnehmer', value: '—' });
  }

  return [embed];
}

module.exports = { buildTournamentInfoEmbeds };