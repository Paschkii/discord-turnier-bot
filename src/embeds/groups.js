// === Imports ===
const {
  KLASSE_LISTE,
  getPhaseLabel
} = require('../config/constants');
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require('discord.js');
const { computeGroupStandings } = require('../services/tournament');
const classEmoji = (k) => KLASSE_LISTE.find(x => x.name === k)?.emoji || '';

// Gruppen-Embeds für Discord
function buildGroupPointsMap(daten) {
  if (daten.status !== 'gruppen') return {};
  const standings = computeGroupStandings(daten.kämpfe.filter(f => f.phase === 'gruppen'), daten.groups);
  const map = {};
  for (const gName of Object.keys(standings)) {
    for (const row of standings[gName]) map[row.id] = row.points || 0;
  }
  return map;
}
// Baut die Gruppen-Embeds
function buildGroupEmbeds(daten) {
  const pointsMap = buildGroupPointsMap(daten);
  
  const phaseName = getPhaseLabel(daten.status) || daten.status || '—';

  const phaseKey = ['quali', 'gruppen', 'ko', 'finale'].includes(daten.status) ? daten.status : null;
  const allFights = Array.isArray(daten.kämpfe) ? daten.kämpfe : [];

  const embeds = [];
  for (const g of daten.groups || []) {
    const linesMembers = (g.members || []).map(m => {
      const tag = daten.status === 'quali' ? (daten.teilnehmer?.[m.id]?.tag || null) : null;
      const pts = Number.isInteger(pointsMap[m.id]) ? pointsMap[m.id] : null;
      const extras = [];
      if (tag) extras.push(tag);
      if (pts !== null) extras.push(`${pts} Punkte`);
      return `- **${m.name}** ${classEmoji(m.klasse)} ${m.klasse || '—'}${extras.length ? ` · ${extras.join(' / ')}` : ''}`;
    });

    const groupMatches = phaseKey
      ? (daten.status === 'gruppen'
          ? allFights.filter(f => f.phase === 'gruppen' && f.groupName === g.name)
          : allFights.filter(f => f.phase === phaseKey))
      : [];

    const linesMatches = groupMatches.map(f => {
      const pA = f.playerA || {};
      const pB = f.playerB || {};
      const a = pA.name ?? '—';
      const b = pB.name ?? '—';
      const sA = Number.isInteger(f.scoreA) ? f.scoreA : 0;
      const sB = Number.isInteger(f.scoreB) ? f.scoreB : 0;
      const status = f.finished ? '✅' : '⏳';
      return `  • **${a}** ${classEmoji(pA.klasse)} vs **${b}** ${classEmoji(pB.klasse)} — ${sA}:${sB} ${status}`;
    });

    const descParts = [];
    if (linesMembers.length) descParts.push(linesMembers.join('\n'));
    if (linesMatches.length) descParts.push(linesMatches.join('\n'));

    const raw = g.displayName || g.name || '';
    const base = raw.replace(/\s*[⬆⬇]\uFE0F?\s*$/, '');
    const prefix = g.bucket === 'top' ? '⬆️ ' : g.bucket === 'low' ? '⬇️ ' : '';
    const title = `${prefix}${base} — ${phaseName}`;

    const embed = new EmbedBuilder()
      .setColor(0x00aeff)
      .setTitle(title)
      .setDescription(descParts.join('\n') || '—')
      .setTimestamp();

    embeds.push(embed);
  }

  if (!embeds.length && allFights.length) {
    const members = [];
    const seen = new Set();
    for (const f of allFights) {
      [f.playerA, f.playerB].forEach(p => { if (p && !seen.has(p.id)) { seen.add(p.id); members.push(p); } });
    }
    const pseudo = { name: 'Kolossium', members };
    return buildGroupEmbeds({ ...daten, groups: [pseudo] });
  }
  return embeds;
}
// Baut eine paginierte Gruppen-Antwort
function buildPagedGroupReply(daten, page = 1, perPage = 10) {
  const embeds = buildGroupEmbeds(daten);
  const total = embeds.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const p = Math.min(Math.max(1, page), pages);
  const slice = embeds.slice((p - 1) * perPage, p * perPage);

  const components = [];
  if (pages > 1) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`pg_groups_prev_${p}`).setLabel('◀️').setStyle(ButtonStyle.Secondary).setDisabled(p === 1),
      new ButtonBuilder().setCustomId(`pg_groups_next_${p}`).setLabel('▶️').setStyle(ButtonStyle.Secondary).setDisabled(p === pages)
    );
    components.push(row);
  }
  return { embeds: slice, components };
}

// === Exports ===
module.exports = {
  buildPagedGroupReply,
  buildGroupEmbeds
};