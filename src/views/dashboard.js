const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { KLASSE_LISTE } = require('../config/constants');

// ===== Helpers für Steuer-Elemente =====
function rowTabs(tab, phase, page) {
  const mk = (key, label) => new ButtonBuilder()
    .setCustomId(`tnav|tab|${key}|${phase}|${page}`)
    .setLabel(label)
    .setStyle(tab === key ? ButtonStyle.Primary : ButtonStyle.Secondary);
  return new ActionRowBuilder().addComponents(
    mk('g','Gruppen'),
    mk('m','Kämpfe'),
    mk('o','Offene'),
    mk('b','Bracket'),
  );
}

// Welche Phasen/Runden sind im Turnier überhaupt vertreten?
function phasesPresent(d) {
  const fights = [ ...(d.kämpfeArchiv || []), ...(d.kämpfe || []) ];
  const set = new Set();
  if (fights.some(f => f.phase === 'quali'))   set.add('q');
  if (fights.some(f => f.phase === 'gruppen')) set.add('gr');
  if (fights.some(f => f.phase === 'ko'))      set.add('ko');
  if (fights.some(f => f.phase === 'finale'))  set.add('F');
  if (!set.size) {
    // Fallback: nimm aktuellen Status
    const s = d.status;
    if (s === 'quali') set.add('q');
    else if (s === 'gruppen') set.add('gr');
    else if (s === 'ko') set.add('ko');
    else if (s === 'finale') set.add('F');
  }
  return Array.from(set);
}

// ein Select – zeigt nur Phasen/Runden, die es wirklich gibt
function rowPhaseOrRound(tab, phaseOrRound, _bucket, _groupIx, page, daten) {
  const present = phasesPresent(daten);
  const label = (v) => v === 'q' ? 'Qualifikation' : v === 'gr' ? 'Gruppenphase' : v === 'ko' ? 'K.O.-Phase' : v === 'F' ? 'Finale' : v;

  const sel = new StringSelectMenuBuilder()
    .setCustomId(`tnav|phase|${tab}|${phaseOrRound}|x|x|${page}`)
    .setPlaceholder('Phase wählen')
    .addOptions(...present.map(v =>
      new StringSelectMenuOptionBuilder().setLabel(label(v)).setValue(v).setDefault(v === phaseOrRound)
    ))
    .setMinValues(1).setMaxValues(1);

  return new ActionRowBuilder().addComponents(sel);
}

function rowPager(tab, phaseOrRound, page, totalPages) {
  const p = Math.min(Math.max(1, page || 1), Math.max(1, totalPages || 1));
  const prev = new ButtonBuilder()
    .setCustomId(`tnav|page|prev|${tab}|${phaseOrRound}|${p}`)
    .setLabel('◀')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(p <= 1);
  const mid = new ButtonBuilder()
    .setCustomId('tnav|page|noop|x|x|x|x|x')
    .setLabel(`Seite ${p}/${Math.max(1, totalPages || 1)}`)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);
  const next = new ButtonBuilder()
    .setCustomId(`tnav|page|next|${tab}|${phaseOrRound}|${p}`)
    .setLabel('▶')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(p >= (totalPages || 1));
  return new ActionRowBuilder().addComponents(prev, mid, next);
}

// ===== Helpers für Inhalt =====
const classEmoji = (k) =>
  KLASSE_LISTE.find(x =>
    x.name === k)?.emoji || '';
const tagEmoji   = (p) =>
  p?.tag === 'Top' ? '⬆️' :
  (p?.tag === 'Low' ? '⬇️' : '');
const phaseLabel = (v) =>
  v === 'q' ? 'Qualifikation' :
  v === 'gr' ? 'Gruppenphase' :
  v === 'ko' ? 'K.O.-Phase' :
  v === 'F' ? 'Finale' : v;

// ===== Tab-Renderer =====
function buildTabGroups(daten, state) {
  const { phaseOrRound } = state;

  const embeds = (daten.groups || []).map(g => {
    const lines = (g.members || []).map(m =>
      `• **${m.name}** ${classEmoji(m.klasse)} ${m.klasse}` // <-- kein tagEmoji mehr
    );
    return new EmbedBuilder()
      .setColor(0x00AEFF)
      .setTitle(`📜 ${g.displayName || g.name} — ${phaseLabel(phaseOrRound)}`)
      .setDescription(lines.join('\n') || '—')
      .setTimestamp();
  });

  return { embeds, totalPages: 1 };
}

// Alle Kämpfe für eine Phase/Runde
function fightsForPhase(daten, phaseOrRound) {
  const all = [ ...(daten.kämpfeArchiv || []), ...(daten.kämpfe || []) ];
  if (phaseOrRound === 'q')  return all.filter(f => f.phase === 'quali');
  if (phaseOrRound === 'gr') return all.filter(f => f.phase === 'gruppen');
  if (phaseOrRound === 'ko') return all.filter(f => f.phase === 'ko');
  if (phaseOrRound === 'F')  return all.filter(f => f.phase === 'finale');
  return all;
}

// Kürzere, handyfreundliche Ausgabe (2 Zeilen)
function fmtFight2L(f) {
  const A = f.playerA || {}, B = f.playerB || {};
  const aE = A.klasse ? ` ${classEmoji(A.klasse)}` : '';
  const bE = B.klasse ? ` ${classEmoji(B.klasse)}` : '';
  const sA = Number.isInteger(f.scoreA) ? f.scoreA : 0;
  const sB = Number.isInteger(f.scoreB) ? f.scoreB : 0;
  const done = f.finished ? '✅' : '⏳';
  return `• **${A.name || '—'}**${aE} vs **${B.name || '—'}**${bE}\nErgebnis: ${sA}:${sB} ${done}`;
}

// Kämpfe je Gruppe (oder alle offenen)
function buildTabMatches(daten, state, openOnly = false) {
  const { phaseOrRound, page = 1 } = state;

  // 1) Pool = alle Kämpfe der gewählten Phase (inkl. Archiv)
  const pool = fightsForPhase(daten, phaseOrRound);

  // 2) Map: groupName -> fights[]
  const byGroup = new Map();
  for (const f of pool) {
    const gName = (f.groupName && String(f.groupName).trim()) || 'Kolossium';
    if (openOnly && f.finished) continue; // nur offene
    if (!byGroup.has(gName)) byGroup.set(gName, []);
    byGroup.get(gName).push(f);
  }

  // 3) Stabile Reihenfolge (alphabetisch nach GroupName)
  const groupNames = Array.from(byGroup.keys()).sort((a,b) => a.localeCompare(b, 'de', { sensitivity: 'base' }));

  // 4) Pagination: 2 Gruppen pro Seite
  const perPageGroups = 2;
  const pages = Math.max(1, Math.ceil(groupNames.length / perPageGroups));
  const p = Math.min(Math.max(1, page || 1), pages);
  const slice = groupNames.slice((p - 1) * perPageGroups, p * perPageGroups);

  // 5) Embeds bauen
  const embeds = slice.map(name => {
    const gf = (byGroup.get(name) || []).slice().sort((a,b) => (a.localId||a.id||0) - (b.localId||b.id||0));
    const desc = gf.map(fmtFight2L).join('\n\n') || '—';
    return new EmbedBuilder()
      .setColor(openOnly ? 0xFFAA00 : 0x5865F2)
      .setTitle(`📜 ${name} — ${phaseLabel(phaseOrRound)}`)
      .setDescription(desc)
      .setTimestamp();
  });

  return { embeds, totalPages: pages };
}

// K.O.-Bracket (Top/Low/Finale)
function buildTabBracket(daten, state) {
  const { phaseOrRound } = state;

  // Gruppenphase → Fortschritt je Gruppe
  if (phaseOrRound === 'gr') {
    const lines = (daten.groups || []).map(g => {
      const m = g.matches || [];
      const done = m.filter(f => f.finished).length;
      const status = (done === m.length && m.length > 0) ? '✅' : '⏳';
      return `${g.displayName || g.name}: ${done}/${m.length} Kämpfe ${status}`;
    });
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(`📜 Kämpfe — ${phaseLabel(phaseOrRound)}`)
      .setDescription(lines.join('\n') || '—')
      .setTimestamp();
    return { embeds: [embed], totalPages: 1 };
  }

  // K.O.-Phase → zwei Blöcke (Top/Low)
  if (phaseOrRound === 'ko') {
    const fights = fightsForPhase(daten, 'ko');
    const topF = fights.filter(f => (f.bucket === 'top') || /Top|⬆️/.test(f.groupName || ''));
    const lowF = fights.filter(f => (f.bucket === 'low') || /Low|⬇️/.test(f.groupName || ''));
    const eTop = new EmbedBuilder().setColor(0x5865F2).setTitle('🏛️ K.O. — Top ⬆️').setDescription(topF.map(fmtFight2L).join('\n\n') || '—').setTimestamp();
    const eLow = new EmbedBuilder().setColor(0x5865F2).setTitle('🏛️ K.O. — Low ⬇️').setDescription(lowF.map(fmtFight2L).join('\n\n') || '—').setTimestamp();
    return { embeds: [eTop, eLow], totalPages: 1 };
  }

  // Finale → Finale + Bronze
  if (phaseOrRound === 'F') {
    const fights = fightsForPhase(daten, 'F').slice().sort((a,b)=>(a.localId||a.id||0)-(b.localId||b.id||0));
    const final  = fights[0], bronze = fights[1];
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('🏁 Finale')
      .setDescription([
        '**Finale**',
        final  ? fmtFight2L(final)  : '—',
        '',
        '**Bronze**',
        bronze ? fmtFight2L(bronze) : '—'
      ].join('\n'))
      .setTimestamp();
    return { embeds: [embed], totalPages: 1 };
  }

  // Quali / sonst: simple Auflistung
  const fights = fightsForPhase(daten, phaseOrRound);
  const embed = new EmbedBuilder()
    .setColor(0x5865F2)
    .setTitle(`🏛️ Übersicht — ${phaseLabel(phaseOrRound)}`)
    .setDescription(fights.map(fmtFight2L).join('\n\n') || '—')
    .setTimestamp();
  return { embeds: [embed], totalPages: 1 };
}

// ===== Default-State + Builder =====
function defaultStateFromData(daten, fallbackTab = 'g') {
  const st = (daten.status || 'offen');
  const phase =
    st === 'quali'   ? 'q'  :
    st === 'gruppen' ? 'gr' :
    st === 'ko'      ? 'ko' :
    st === 'finale'  ? 'F'  : 'gr';

  const phaseOrRound =
    (fallbackTab === 'b')
      ? (phase === 'F' ? 'F' : (phase === 'ko' ? 'ko' : 'gr'))
      : phase;

  return { tab: fallbackTab, phaseOrRound, bucket: 't', groupIx: 0, page: 1 };
}

// === Haupt-Builder ===
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
  rows.push(rowTabs(tab, phaseOrRound, 'x', 0, page));
  rows.push(rowPhaseOrRound(tab, phaseOrRound, 'x', 0, page, daten)); // << immer anzeigen!

  if (tab === 'm' || tab === 'o') {
    rows.push(rowPager(tab, phaseOrRound, 'x', 0, page, totalPages));
  }

  return { embeds: view.embeds || [], components: rows };
}

// ===== Export =====
module.exports = { buildDashboard, defaultStateFromData };