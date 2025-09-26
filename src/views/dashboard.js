// === Imports ===
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { KLASSE_LISTE } = require('../config/constants');

// ===== Helpers für Steuer-Elemente =====
function rowTabs(tab, phase, page, daten) {
  const mk = (key, label) => {
    const def = defaultStateFromData(daten, key).phaseOrRound;
    return new ButtonBuilder()
      .setCustomId(`tnav|tab|${key}|${def}|${page}`)
      .setLabel(label)
      .setStyle(tab === key ? ButtonStyle.Primary : ButtonStyle.Secondary);
  };
  return new ActionRowBuilder().addComponents(
    mk('g','Gruppen'),
    mk('m','Kämpfe'),
    mk('b','Bracket'),
  );
}

// Matcht Fight → Gruppe robust (DisplayName/Name/mit/ohne "— …")
function fightBelongsToGroup(f, g) {
  const fg = (f.groupName || '').trim();
  const gn = (g.displayName || g.name || '').trim();
  if (!fg || !gn) return false;
  if (fg === gn) return true;

  // vor dem Gedankenstrich normalisieren ("Astrub ⬆️ — Viertelfinale")
  const fgBase = fg.split('—')[0].trim();
  const gnBase = gn.split('—')[0].trim();
  if (fgBase === gnBase) return true;

  // letzte Sicherheitsnetze (vorsichtig, aber praktisch)
  if (fg.includes(gn) || gn.includes(fg)) return true;

  return false;
}

function detectBracketRound(d) {
  const fights = [ ...(d.kämpfeArchiv || []), ...(d.kämpfe || []) ];
  if (fights.some(f => f.phase === 'finale')) return 'F';
  const ko = fights.filter(f => f.phase === 'ko');
  if (ko.some(f => /(Halbfinale)/i.test(f.groupName || ''))) return 'SF';
  if (ko.length > 0) return 'QF';
  if (fights.some(f => f.phase === 'gruppen')) return 'gr';
  if (fights.some(f => f.phase === 'quali')) return 'q';
  return 'gr';
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

function withPhaseSuffix(title, label) {
  const base = (title || '').trim();
  const suffix = (label || '').trim();
  if (!suffix) return base;
  const normalizedBase = base.toLowerCase();
  const normalizedLabel = suffix.toLowerCase();
  if (normalizedBase.includes(normalizedLabel)) return base;
  return `${base} — ${suffix}`;
}

// Gruppennamen robust vergleichen (ignoriert ⬆️/⬇️-Suffixe)
function matchGroupName(fGroupName, groupObj) {
  const strip = (s) => (s || '').trim().replace(/\s*[⬆⬇]\uFE0F?\s*$/,'');
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
    const raw = g.displayName || g.name || '';
    const base = raw.replace(/\s*[⬆⬇]\uFE0F?\s*$/, '');
    const prefix = g.bucket === 'top' ? '⬆️ ' : g.bucket === 'low' ? '⬇️ ' : '';
    const title = withPhaseSuffix(`${prefix}${base}`.trim(), phaseLabel(phaseOrRound));
    return new EmbedBuilder()
      .setColor(0x00AEFF)
      .setTitle(title)
      .setDescription(lines.join('\n') || '—')
      .setTimestamp();
  });
  return { embeds, totalPages: 1 };
}

// Alle Kämpfe für eine Phase/Runde
function fightsForPhase(daten, phaseOrRound) {
  const active = Array.isArray(daten.kämpfe) ? daten.kämpfe : [];
  const archive = Array.isArray(daten.kämpfeArchiv) ? daten.kämpfeArchiv : [];
  const all = [...archive, ...active];
  if (phaseOrRound === 'q')  return all.filter(f => f.phase === 'quali');
  if (phaseOrRound === 'gr') return all.filter(f => f.phase === 'gruppen');
  if (phaseOrRound === 'ko') {
    const current = active.filter(f => f.phase === 'ko');
    return current.length ? current : all.filter(f => f.phase === 'ko');
  }
  if (phaseOrRound === 'F') {
    const current = active.filter(f => f.phase === 'finale');
    return current.length ? current : all.filter(f => f.phase === 'finale');
  }
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
    let gf = pool.filter(f => fightBelongsToGroup(f, g));
    if (openOnly) gf = gf.filter(f => !f.finished);

    const desc = gf.map(fmtFight2L).join('\n') || '—';

    const raw = g.displayName || g.name || '';
    const base = raw.replace(/\s*[⬆⬇]\uFE0F?\s*$/, '');
    const prefix = g.bucket === 'top' ? '⬆️ ' : g.bucket === 'low' ? '⬇️ ' : '';
    const title = withPhaseSuffix(`${prefix}${base}`.trim(), phaseLabel(phaseOrRound));

    return new EmbedBuilder()
      .setColor(openOnly ? 0xFFAA00 : 0x5865F2)
      .setTitle(title)
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
  const roundLabel =
    phaseOrRound === 'q'  ? 'Qualifikation' :
    phaseOrRound === 'gr' ? 'Gruppenphase' :
    phaseOrRound === 'QF' ? 'Viertelfinale' :
    phaseOrRound === 'SF' ? 'Halbfinale' :
    phaseOrRound === 'F'  ? 'Finale' : phaseOrRound;

  if (['q','gr','QF','SF','F'].includes(phaseOrRound)) {
    const phaseKey =
      phaseOrRound === 'q'  ? 'quali' :
      phaseOrRound === 'F'  ? 'finale' :
      phaseOrRound === 'gr' ? 'gruppen' : 'ko';
    const pool = (daten.kämpfe || []).filter(f => f.phase === phaseKey);
    const lines = (daten.groups || []).map(g => {
      const gf = pool.filter(f => fightBelongsToGroup(f, g));
      const done = gf.filter(f => f.finished).length;
      const total = gf.length;
      const base = (g.displayName || g.name || '').replace(/\s*[⬆⬇]\uFE0F?\s*$/, '');
      const prefix = g.bucket === 'top' ? '⬆️ ' : g.bucket === 'low' ? '⬇️ ' : '';
      return `${prefix}${base} - ${done}/${total} Kämpfe`;
    });
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(`Kämpfe — ${roundLabel}`)
      .setDescription(lines.join('\n') || '—')
      .setTimestamp();
    return { embeds: [embed], totalPages: 1 };
  }

  // Fallback: simple Auflistung
  const fights = fightsForPhase(daten, phaseOrRound);
  const entries = fights.map(fmtFight2L);

  const MAX_EMBEDS = 10;
  const DESC_LIMIT = 3900; // etwas Sicherheitsabstand zu Discords 4096-Grenze

  const chunks = [];
  let current = '';
  const pushCurrent = () => {
    if (current) {
      chunks.push(current);
      current = '';
    }
  };

  const tryAppend = (base, addition) => {
    return base ? `${base}\n\n${addition}` : addition;
  };

  entries.forEach((entry) => {
    let candidate = tryAppend(current, entry);
    if (candidate.length > DESC_LIMIT && current) {
      pushCurrent();
      candidate = tryAppend(current, entry);
    }
    if (candidate.length > DESC_LIMIT) {
      chunks.push(entry.slice(0, DESC_LIMIT - 30) + '\n\n… Kampf gekürzt …');
      current = '';
    } else {
      current = candidate;
    }
  });
  pushCurrent();

  if (chunks.length === 0) {
    chunks.push('—');
  }

  if (chunks.length > MAX_EMBEDS) {
    const head = chunks.slice(0, MAX_EMBEDS - 1);
    const tailCombined = chunks.slice(MAX_EMBEDS - 1).join('\n\n');
    const final =
      tailCombined.length > DESC_LIMIT
        ? tailCombined.slice(0, DESC_LIMIT - 30) + '\n\n… weitere Kämpfe gekürzt …'
        : tailCombined;
    chunks.length = 0;
    chunks.push(...head, final);
  }

  const totalPages = chunks.length;
  const embeds = chunks.map((desc, ix) => {
    const titleBase = `🏛️ Übersicht — ${roundLabel}`;
    const title =
      totalPages > 1
        ? `${titleBase} (Seite ${ix + 1}/${totalPages})`
        : titleBase;
    return new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(title)
      .setDescription(desc)
      .setTimestamp();
  });

  return { embeds, totalPages };
}

// ===== Default-State + Builder =====
function defaultStateFromData(daten, fallbackTab = 'g') {
  const st = (daten.status || 'offen');
  const phase =
    st === 'quali'   ? 'q'  :
    st === 'gruppen' ? 'gr' :
    st === 'ko'      ? 'ko' :
    st === 'finale'  ? 'F'  : 'gr';

  const phaseOrRound = (fallbackTab === 'b')
    ? detectBracketRound(daten)
    : phase;

  return { tab: fallbackTab, phaseOrRound, bucket: 'top', groupIx: 0, page: 1 };
}

// === Haupt-Builder ===
async function buildDashboard(_interaction, daten, state) {
  const { tab, phaseOrRound, bucket = 'top', groupIx = 0, page = 1 } = state || defaultStateFromData(daten, 'g');

  if (tab === 'g') {
    view = buildTabGroups(daten, { phaseOrRound, groupIx });
  } else if (tab === 'm') {
    view = buildTabMatches(daten, { phaseOrRound }, false);
  } else {
    view = buildTabBracket(daten, { phaseOrRound, bucket });
  }

  const rows = [];
  rows.push(rowTabs(tab, phaseOrRound, page, daten));

  if (tab === 'm' && (view.totalPages > 1)) {
    rows.push(rowPager(tab, phaseOrRound, page, view.totalPages));
  }

  if (Array.isArray(view.components)) rows.push(...view.components);

  return { embeds: view.embeds || [], components: rows };
}

// ===== Export =====
module.exports = {
  buildDashboard,
  buildTabMatches,
  defaultStateFromData,
};