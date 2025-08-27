// src/views/dashboard.js
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  MessageFlags
} = require('discord.js');

const { KLASSE_LISTE } = require('../config/constants');
const { buildBracketEmbed } = require('../embeds/bracket');

// === State-Codec ============================================================
function encode(tab, phaseOrRound, bucket, groupIx, page) {
  return `tnav|${tab}|${phaseOrRound}|${bucket}|${groupIx}|${page}`;
}
function decode(id) {
  const [_t, tab, phase, bucket, groupIx, page] = (id || '').split('|');
  return { tab, phaseOrRound: phase, bucket, groupIx, page: parseInt(page, 10) || 1 };
}
function defaultStateFromData(daten, fallbackTab = 'g') {
  const st = (daten.status || 'offen');
  const phase =
    st === 'quali'    ? 'q'  :
    st === 'gruppen'  ? 'gr' :
    st === 'ko'       ? 'ko' :
    st === 'finale'   ? 'F'  : 'gr';
  // Bracket braucht RoundKey (QF/SF/F); für finale -> F, sonst QF default
  const phaseOrRound = (fallbackTab === 'b')
    ? (phase === 'F' ? 'F' : 'QF')
    : phase;
  return { tab: fallbackTab, phaseOrRound, bucket: 't', groupIx: 0, page: 1 };
}

// === Helpers ================================================================
const classEmoji = (klasse) => KLASSE_LISTE.find(k => k.name === klasse)?.emoji || '';
const tagEmoji   = (p) => p?.tag === 'Top' ? '⬆️' : (p?.tag === 'Low' ? '⬇️' : '');
const phaseLabel = (x) => x === 'q' ? 'Qualifikation' : x === 'gr' ? 'Gruppenphase' : x === 'ko' ? 'K.O.-Phase' : x === 'F' ? 'Finale' : x;

function fightsForPhase(daten, phaseOrRound) {
  const all = Array.isArray(daten.kämpfe) ? daten.kämpfe : [];
  if (phaseOrRound === 'q')  return all.filter(f => f.phase === 'quali');
  if (phaseOrRound === 'gr') return all.filter(f => f.phase === 'gruppen');
  if (phaseOrRound === 'ko') return all.filter(f => f.phase === 'ko');
  if (phaseOrRound === 'F')  return all.filter(f => f.phase === 'finale');
  return all;
}

// Kompaktes 2-Zeilen-Fight-Format (handyfreundlich)
function formatFight2L(f) {
  const A = f.playerA || {}, B = f.playerB || {};
  const aE = A.klasse ? ` ${classEmoji(A.klasse)}` : '';
  const bE = B.klasse ? ` ${classEmoji(B.klasse)}` : '';
  const sA = Number.isInteger(f.scoreA) ? f.scoreA : 0;
  const sB = Number.isInteger(f.scoreB) ? f.scoreB : 0;
  const done = f.finished ? '✅' : '⏳';
  const line1 = `• **${A.name || '—'}**${aE} vs **${B.name || '—'}**${bE}`;
  const line2 = `  Ergebnis: ${sA}:${sB} ${done}`;
  return `${line1}\n${line2}`;
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

// === Components =============================================================
function rowTabs(tab, phase, bucket, groupIx, page) {
  const mk = (key, label) => new ButtonBuilder()
    .setCustomId(`tnav_tab|${key}|${phase}|${bucket}|${groupIx}|${page}`)
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
    // Bracket: Round Select (QF/SF/F)
    const sel = new StringSelectMenuBuilder()
      .setCustomId(`tnav_phase|${tab}|${phaseOrRound}|${bucket}|${groupIx}|${page}`)
      .setPlaceholder('Runde wählen')
      .addOptions(
        new StringSelectMenuOptionBuilder().setLabel('Viertelfinale').setValue('QF').setDefault(phaseOrRound === 'QF'),
        new StringSelectMenuOptionBuilder().setLabel('Halbfinale').setValue('SF').setDefault(phaseOrRound === 'SF'),
        new StringSelectMenuOptionBuilder().setLabel('Finale').setValue('F').setDefault(phaseOrRound === 'F'),
      )
      .setMinValues(1).setMaxValues(1);
    return new ActionRowBuilder().addComponents(sel);
  }
  // Andere Tabs: Phase Select (q/gr/ko)
  const sel = new StringSelectMenuBuilder()
    .setCustomId(`tnav_phase|${tab}|${phaseOrRound}|${bucket}|${groupIx}|${page}`)
    .setPlaceholder('Phase wählen')
    .addOptions(
      new StringSelectMenuOptionBuilder().setLabel('Qualifikation').setValue('q').setDefault(phaseOrRound === 'q'),
      new StringSelectMenuOptionBuilder().setLabel('Gruppenphase').setValue('gr').setDefault(phaseOrRound === 'gr'),
      new StringSelectMenuOptionBuilder().setLabel('K.O.-Phase').setValue('ko').setDefault(phaseOrRound === 'ko'),
    )
    .setMinValues(1).setMaxValues(1);
  return new ActionRowBuilder().addComponents(sel);
}

// Für Tabs g/m/o: Gruppenauswahl (index-basiert). Für KO können es 2 Gruppen (Top/Low) sein.
function rowGroupSelect(daten, tab, phaseOrRound, bucket, groupIx, page) {
  if (tab === 'b') return null; // Bracket nutzt eigenes UI
  // Gruppenquelle: daten.groups bereits passend zur aktuellen Phase befüllt.
  const groups = Array.isArray(daten.groups) ? daten.groups : [];
  if (!groups.length) return null;

  const sel = new StringSelectMenuBuilder()
    .setCustomId(`tnav_group|${tab}|${phaseOrRound}|${bucket}|${groupIx}|${page}`)
    .setPlaceholder('Gruppe wählen')
    .addOptions(...groups.map((g, i) =>
      new StringSelectMenuOptionBuilder().setLabel(g.displayName || g.name || `Gruppe ${i+1}`).setValue(String(i)).setDefault(i === Number(groupIx))
    ))
    .setMinValues(1).setMaxValues(1);

  return new ActionRowBuilder().addComponents(sel);
}

function rowPager(tab, phaseOrRound, bucket, groupIx, page, totalPages) {
  const p = Math.min(Math.max(1, page || 1), Math.max(1, totalPages || 1));
  const prev = new ButtonBuilder()
    .setCustomId(`tnav_page|prev|${tab}|${phaseOrRound}|${bucket}|${groupIx}|${p}`)
    .setLabel('◀')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(p <= 1);
  const mid = new ButtonBuilder()
    .setCustomId('tnav_page|noop|x|x|x|x|x')
    .setLabel(`Seite ${p}/${Math.max(1, totalPages || 1)}`)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);
  const next = new ButtonBuilder()
    .setCustomId(`tnav_page|next|${tab}|${phaseOrRound}|${bucket}|${groupIx}|${p}`)
    .setLabel('▶')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(p >= (totalPages || 1));
  return new ActionRowBuilder().addComponents(prev, mid, next);
}

// === Builder pro Tab ========================================================
function buildTabGroups(daten, state) {
  const { phaseOrRound, groupIx = 0 } = state;
  const g = (Array.isArray(daten.groups) ? daten.groups : [])[Number(groupIx)] || null;

  const title = `📜 ${g?.displayName || g?.name || 'Gruppe'} — ${phaseLabel(phaseOrRound)}`;
  const members = (g?.members || []).map(m =>
    `• **${m.name}** ${tagEmoji(daten.teilnehmer?.[m.id])}  ${classEmoji(m.klasse)} ${m.klasse}`
  );
  // Kämpfe dieser Gruppe/Phase
  const fights = (g?.matches || []).filter(f => {
    if (phaseOrRound === 'q')  return f.phase === 'quali';
    if (phaseOrRound === 'gr') return f.phase === 'gruppen';
    if (phaseOrRound === 'ko') return f.phase === 'ko';
    if (phaseOrRound === 'F')  return f.phase === 'finale';
    return true;
  });

  const body = []
    .concat(members.length ? ['— Mitglieder —', ...members] : [])
    .concat(fights.length ? ['','— Kämpfe —', ...fights.map(formatFight2L)] : []);

  const embed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle(title)
    .setDescription(body.join('\n') || '—')
    .setTimestamp();

  return { embeds: [embed], totalPages: 1 }; // Gruppen selbst paginieren wir hier nicht, Auswahl via Select
}

function buildTabMatches(daten, state, openOnly = false) {
  const { phaseOrRound, groupIx = '-', page = 1 } = state;
  const all = fightsForPhase(daten, phaseOrRound);
  // optional per Gruppe filtern
  let pool = all;
  const gi = Number.isInteger(Number(groupIx)) ? Number(groupIx) : -1;
  const gName = (Array.isArray(daten.groups) && gi >= 0 && daten.groups[gi]) ? (daten.groups[gi].name || daten.groups[gi].displayName) : null;
  if (gName) pool = pool.filter(f => f.groupName === gName);
  if (openOnly) pool = pool.filter(f => !f.finished);

  const perPage = 10;
  const pages = Math.max(1, Math.ceil(pool.length / perPage));
  const p = Math.min(Math.max(1, page || 1), pages);
  const slice = pool.slice((p - 1) * perPage, p * perPage);

  const lines = slice.map(formatFight2L);
  const title = `${openOnly ? '⏳ Offene Kämpfe' : '🗂️ Kämpfe'} — ${phaseLabel(phaseOrRound)}` + (gName ? ` · ${gName}` : '');

  const embed = new EmbedBuilder()
    .setColor(openOnly ? 0xFFAA00 : 0x5865F2)
    .setTitle(title)
    .setDescription(lines.join('\n\n') || '—')
    .setTimestamp();

  return { embeds: [embed], totalPages: pages };
}

function buildTabBracket(daten, state) {
  const { bucket = 't', phaseOrRound = 'QF' } = state;
  // map bucket code to text
  const b = bucket === 'l' ? 'low' : 'top';
  const view = buildBracketEmbed(daten, b, phaseOrRound); // liefert {embeds, components}
  return view;
}

// === Public: buildDashboard ==================================================
async function buildDashboard(interaction, daten, initialState) {
  const s = initialState || defaultStateFromData(daten, 'g'); // default Tab = Gruppen
  const { tab, phaseOrRound, bucket = 't', groupIx = 0, page = 1 } = s;

  let view, totalPages = 1;
  if (tab === 'g') {
    view = buildTabGroups(daten, { phaseOrRound, groupIx });
  } else if (tab === 'm') {
    view = buildTabMatches(daten, { phaseOrRound, groupIx, page }, false);
    totalPages = view.totalPages;
  } else if (tab === 'o') {
    view = buildTabMatches(daten, { phaseOrRound, groupIx, page }, true);
    totalPages = view.totalPages;
  } else { // 'b'
    view = buildTabBracket(daten, { phaseOrRound, bucket });
  }

  // Komponenten zusammenbauen
  const rows = [];
  rows.push(rowTabs(tab, phaseOrRound, bucket, groupIx, page));
  rows.push(rowPhaseOrRound(tab, phaseOrRound, bucket, groupIx, page));
  const groupRow = rowGroupSelect(daten, tab, phaseOrRound, bucket, groupIx, page);
  if (groupRow) rows.push(groupRow);

  // Bracket bringt eigene Komponenten (Round select, Switch/Next/Prev etc.)
  // → diese hängen wir nach unseren Tabs/Phase/Group Rows dran:
  if (tab === 'b' && Array.isArray(view.components)) {
    rows.push(...view.components);
  } else {
    // Nur m/o brauchen Pagination
    if (tab === 'm' || tab === 'o') {
      rows.push(rowPager(tab, phaseOrRound, bucket, groupIx, page, totalPages));
    }
  }

  return {
    embeds: view.embeds || [],
    components: rows
  };
}

module.exports = { buildDashboard, encode, decode, defaultStateFromData };