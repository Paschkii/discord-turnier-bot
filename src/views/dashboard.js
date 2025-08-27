const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { KLASSE_LISTE } = require('../config/constants');
const { buildBracketEmbed } = require('../embeds/bracket');

function rowTabs(tab, phase, bucket, groupIx, page) {
  const mk = (key, label) => new ButtonBuilder()
    .setCustomId(`tnav|tab|${key}|${phase}|${bucket}|${groupIx}|${page}`)
    .setLabel(label)
    .setStyle(tab === key ? ButtonStyle.Primary : ButtonStyle.Secondary);
  return new ActionRowBuilder().addComponents(
    mk('g','Gruppen'),
    mk('m','Kämpfe'),
    mk('o','Offene'),
    mk('b','Bracket'),
  );
}

function rowPhaseOrRound(tab, phaseOrRound, bucket, groupIx, page) {
  if (tab === 'b') {
    const sel = new StringSelectMenuBuilder()
      .setCustomId(`tnav|phase|${tab}|${phaseOrRound}|${bucket}|${groupIx}|${page}`)
      .setPlaceholder('Runde wählen')
      .addOptions(
        new StringSelectMenuOptionBuilder().setLabel('Viertelfinale').setValue('QF').setDefault(phaseOrRound === 'QF'),
        new StringSelectMenuOptionBuilder().setLabel('Halbfinale').setValue('SF').setDefault(phaseOrRound === 'SF'),
        new StringSelectMenuOptionBuilder().setLabel('Finale').setValue('F').setDefault(phaseOrRound === 'F'),
      )
      .setMinValues(1).setMaxValues(1);
    return new ActionRowBuilder().addComponents(sel);
  }
  const sel = new StringSelectMenuBuilder()
    .setCustomId(`tnav|phase|${tab}|${phaseOrRound}|${bucket}|${groupIx}|${page}`)
    .setPlaceholder('Phase wählen')
    .addOptions(
      new StringSelectMenuOptionBuilder().setLabel('Qualifikation').setValue('q').setDefault(phaseOrRound === 'q'),
      new StringSelectMenuOptionBuilder().setLabel('Gruppenphase').setValue('gr').setDefault(phaseOrRound === 'gr'),
      new StringSelectMenuOptionBuilder().setLabel('K.O.-Phase').setValue('ko').setDefault(phaseOrRound === 'ko'),
    )
    .setMinValues(1).setMaxValues(1);
  return new ActionRowBuilder().addComponents(sel);
}

function rowGroupSelect(daten, tab, phaseOrRound, bucket, groupIx, page) {
  if (tab === 'b') return null;
  const groups = Array.isArray(daten.groups) ? daten.groups : [];
  if (!groups.length) return null;

  const sel = new StringSelectMenuBuilder()
    .setCustomId(`tnav|group|${tab}|${phaseOrRound}|${bucket}|${groupIx}|${page}`)
    .setPlaceholder('Gruppe wählen')
    .addOptions(...groups.map((g, i) =>
      new StringSelectMenuOptionBuilder().setLabel(g.displayName || g.name || `Gruppe ${i+1}`).setValue(String(i)).setDefault(i === Number(groupIx))
    ))
    .setMinValues(1).setMaxValues(1);

  return new ActionRowBuilder().addComponents(sel);
}

function rowBucket(phaseOrRound, bucket, groupIx, page) {
  const mk = (b, label) => new ButtonBuilder()
    .setCustomId(`tnav|bucket|${b}|b|${phaseOrRound}|${b}|${groupIx}|${page}`)
    .setLabel(label)
    .setStyle((bucket === b) ? ButtonStyle.Primary : ButtonStyle.Secondary);
  return new ActionRowBuilder().addComponents(
    mk('t', 'Top ⬆️'),
    mk('l', 'Low ⬇️')
  );
}

function rowPager(tab, phaseOrRound, bucket, groupIx, page, totalPages) {
  const p = Math.min(Math.max(1, page || 1), Math.max(1, totalPages || 1));
  const prev = new ButtonBuilder()
    .setCustomId(`tnav|page|prev|${tab}|${phaseOrRound}|${bucket}|${groupIx}|${p}`)
    .setLabel('◀')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(p <= 1);
  const mid = new ButtonBuilder()
    .setCustomId('tnav|page|noop|x|x|x|x|x')
    .setLabel(`Seite ${p}/${Math.max(1, totalPages || 1)}`)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);
  const next = new ButtonBuilder()
    .setCustomId(`tnav|page|next|${tab}|${phaseOrRound}|${bucket}|${groupIx}|${p}`)
    .setLabel('▶')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(p >= (totalPages || 1));
  return new ActionRowBuilder().addComponents(prev, mid, next);
}

// ===== Helpers für Inhalt =====
const classEmoji = (k) => KLASSE_LISTE.find(x => x.name === k)?.emoji || '';
const tagEmoji   = (p) => p?.tag === 'Top' ? '⬆️' : (p?.tag === 'Low' ? '⬇️' : '');

function phaseLabel(x) {
  return x === 'q' ? 'Qualifikation' : x === 'gr' ? 'Gruppenphase' : x === 'ko' ? 'K.O.-Phase' : x === 'F' ? 'Finale' : x;
}

function fightsForPhase(daten, phaseOrRound) {
  const all = Array.isArray(daten.kämpfe) ? daten.kämpfe : [];
  if (phaseOrRound === 'q')  return all.filter(f => f.phase === 'quali');
  if (phaseOrRound === 'gr') return all.filter(f => f.phase === 'gruppen');
  if (phaseOrRound === 'ko') return all.filter(f => f.phase === 'ko');
  if (phaseOrRound === 'F')  return all.filter(f => f.phase === 'finale');
  return all;
}

function formatFight2L(f) {
  const A = f.playerA || {}, B = f.playerB || {};
  const aE = A.klasse ? ` ${classEmoji(A.klasse)}` : '';
  const bE = B.klasse ? ` ${classEmoji(B.klasse)}` : '';
  const sA = Number.isInteger(f.scoreA) ? f.scoreA : 0;
  const sB = Number.isInteger(f.scoreB) ? f.scoreB : 0;
  const done = f.finished ? '✅' : '⏳';
  return `• **${A.name || '—'}**${aE} vs **${B.name || '—'}**${bE}\n  Ergebnis: ${sA}:${sB} ${done}`;
}

// ===== Tab-Renderer =====
function buildTabGroups(daten, state) {
  const { phaseOrRound, groupIx = 0 } = state;
  const g = (Array.isArray(daten.groups) ? daten.groups : [])[Number(groupIx)] || null;

  const title = `📜 ${g?.displayName || g?.name || 'Gruppe'} — ${phaseLabel(phaseOrRound)}`;
  const members = (g?.members || []).map(m =>
    `• **${m.name}** ${tagEmoji(daten.teilnehmer?.[m.id])}  ${classEmoji(m.klasse)} ${m.klasse}`
  );

  const fights = (g?.matches || []).filter(f => {
    if (phaseOrRound === 'q')  return f.phase === 'quali';
    if (phaseOrRound === 'gr') return f.phase === 'gruppen';
    if (phaseOrRound === 'ko') return f.phase === 'ko';
    if (phaseOrRound === 'F')  return f.phase === 'finale';
    return true;
  });

  const body = []
    .concat(members.length ? ['— Mitglieder —', ...members] : [])
    .concat(fights.length   ? ['','— Kämpfe —', ...fights.map(formatFight2L)] : []);

  const embed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle(title)
    .setDescription(body.join('\n') || '—')
    .setTimestamp();

  return { embeds: [embed], totalPages: 1 };
}

function buildTabMatches(daten, state, openOnly = false) {
  const { phaseOrRound, groupIx = '-', page = 1 } = state;
  let pool = fightsForPhase(daten, phaseOrRound);

  // optional nach Gruppe filtern
  const gi = Number.isInteger(Number(groupIx)) ? Number(groupIx) : -1;
  const gName = (Array.isArray(daten.groups) && gi >= 0 && daten.groups[gi])
    ? (daten.groups[gi].name || daten.groups[gi].displayName)
    : null;
  if (gName) pool = pool.filter(f => f.groupName === gName);
  if (openOnly) pool = pool.filter(f => !f.finished);

  const perPage = 10;
  const pages = Math.max(1, Math.ceil(pool.length / perPage));
  const p = Math.min(Math.max(1, page || 1), pages);
  const slice = pool.slice((p - 1) * perPage, p * perPage);

  const embed = new EmbedBuilder()
    .setColor(openOnly ? 0xFFAA00 : 0x5865F2)
    .setTitle(`${openOnly ? '⏳ Offene Kämpfe' : '🗂️ Kämpfe'} — ${phaseLabel(phaseOrRound)}${gName ? ` · ${gName}` : ''}`)
    .setDescription(slice.map(formatFight2L).join('\n\n') || '—')
    .setTimestamp();

  return { embeds: [embed], totalPages: pages };
}

function buildTabBracket(daten, state) {
  const { bucket = 't', phaseOrRound = 'QF' } = state;
  const b = bucket === 'l' ? 'low' : 'top';
  // Tipp: in embeds/bracket.js die components leer lassen, wir zeichnen die Controls hier
  return buildBracketEmbed(daten, b, phaseOrRound); // { embeds, components?: [] }
}

// ===== Default-State + Builder =====
function defaultStateFromData(daten, fallbackTab = 'g') {
  const st = (daten.status || 'offen');
  const phase =
    st === 'quali'    ? 'q'  :
    st === 'gruppen'  ? 'gr' :
    st === 'ko'       ? 'ko' :
    st === 'finale'   ? 'F'  : 'gr';
  const phaseOrRound = (fallbackTab === 'b') ? (phase === 'F' ? 'F' : 'QF') : phase;
  return { tab: fallbackTab, phaseOrRound, bucket: 't', groupIx: 0, page: 1 };
}

async function buildDashboard(_interaction, daten, state) {
  const { tab, phaseOrRound, bucket = 't', groupIx = 0, page = 1 } = state || defaultStateFromData(daten, 'g');

  let view = { embeds: [] }, totalPages = 1;
  if (tab === 'g') {
    view = buildTabGroups(daten, { phaseOrRound, groupIx });
  } else if (tab === 'm') {
    view = buildTabMatches(daten, { phaseOrRound, groupIx, page }, false);
    totalPages = view.totalPages;
  } else if (tab === 'o') {
    view = buildTabMatches(daten, { phaseOrRound, groupIx, page }, true);
    totalPages = view.totalPages;
  } else {
    view = buildTabBracket(daten, { phaseOrRound, bucket });
  }

  const rows = [];
  rows.push(rowTabs(tab, phaseOrRound, bucket, groupIx, page));

  if (tab === 'b') {
    rows.push(rowBucket(phaseOrRound, bucket, groupIx, page));
    rows.push(rowPhaseOrRound(tab, phaseOrRound, bucket, groupIx, page));
  } else {
    rows.push(rowPhaseOrRound(tab, phaseOrRound, bucket, groupIx, page));
    const groupRow = rowGroupSelect(daten, tab, phaseOrRound, bucket, groupIx, page);
    if (groupRow) rows.push(groupRow);
  }

  if (tab === 'm' || tab === 'o') {
    rows.push(rowPager(tab, phaseOrRound, bucket, groupIx, page, totalPages));
  }

  return { embeds: view.embeds || [], components: rows };
}

// ===== Export =====
module.exports = { buildDashboard, defaultStateFromData };
