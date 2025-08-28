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
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`tnav|page|prev|${tab}|${phaseOrRound}|${p}`)
      .setLabel('◀')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(p <= 1),

    new ButtonBuilder()
      .setCustomId('tnav|page|noop|x|x|x') // kürzer, konsistent mit Parser
      .setLabel(`Seite ${p}/${Math.max(1, totalPages || 1)}`)
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true),

    new ButtonBuilder()
      .setCustomId(`tnav|page|next|${tab}|${phaseOrRound}|${p}`)
      .setLabel('▶')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(p >= (totalPages || 1)),
  );
}

// ===== Helpers für Inhalt =====
const classEmoji = (k) =>
  KLASSE_LISTE.find(x =>
    x.name === k)?.emoji || '';
const phaseLabel = (v) =>
  v === 'q' ? 'Qualifikation' :
  v === 'gr' ? 'Gruppenphase' :
  v === 'ko' ? 'K.O.-Phase' :
  v === 'F' ? 'Finale' : v;

  // Gruppennamen robust vergleichen (ignoriert ⬆️/⬇️-Suffixe)
function matchGroupName(fGroupName, groupObj) {
  const strip = (s) => (s || '').trim().replace(/\s*[⬆️⬇️]\s*$/,'');
  const fg  = strip(fGroupName);
  const g1  = strip(groupObj.displayName || '');
  const g2  = strip(groupObj.name || '');
  return fg && (fg === g1 || fg === g2);
}

// ===== Tab-Renderer =====
function buildTabGroups(daten, state) {
  const { phaseOrRound } = state;

  const groupsAll = (daten.groups || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const embeds = groupsAll.map(g => {
    const lines = (g.members || []).map(m =>
      `• **${m.name}** ${classEmoji(m.klasse)} ${m.klasse}`
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
  const { phaseOrRound } = state;

  // stabile Gruppen-Reihenfolge
  const groupsAll = (daten.groups || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Kämpfe der gewählten Phase (inkl. Archiv)
  const pool = fightsForPhase(daten, phaseOrRound);

  const embeds = groupsAll.map(g => {
    // robustes Matching (DisplayName/Name/Subset) – nutzt fightBelongsToGroup()
    let gf = pool.filter(f => fightBelongsToGroup(f, g));
    if (openOnly) gf = gf.filter(f => !f.finished);

    const desc = gf.map(fmtFight2L).join('\n\n') || '—';

    return new EmbedBuilder()
      .setColor(openOnly ? 0xFFAA00 : 0x5865F2)
      .setTitle(`📜 ${g.displayName || g.name} — ${phaseLabel(phaseOrRound)}`)
      .setDescription(desc)
      .setTimestamp();
  });

  // keine Pagination mehr
  return { embeds, totalPages: 1 };
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

  if (tab === 'g') {
    view = buildTabGroups(daten, { phaseOrRound, groupIx });
  } else if (tab === 'm') {
    view = buildTabMatches(daten, { phaseOrRound }, false);
  } else if (tab === 'o') {
    view = buildTabMatches(daten, { phaseOrRound }, true);
  } else {
    view = buildTabBracket(daten, { phaseOrRound, bucket });
  }

  const rows = [];
  rows.push(rowTabs(tab, phaseOrRound, page));
  rows.push(rowPhaseOrRound(tab, phaseOrRound, undefined, undefined, page, daten));

  if ((tab === 'm' || tab === 'o') && (view.totalPages > 1)) {
    rows.push(rowPager(tab, phaseOrRound, page, view.totalPages));
  }

  return { embeds: view.embeds || [], components: rows };
}

// ===== Export =====
module.exports = { buildDashboard, defaultStateFromData };