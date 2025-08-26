// Kompakter Bracket-View als Embed mit Codeblock
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  StringSelectMenuBuilder
} = require('discord.js');
const { GROUP_EMOJI } = require('../services/tournament');

const ROUND_LABELS = {
  QF: 'Viertelfinale',
  SF: 'Halbfinale',
  F:  'Finale',
};

function pickFights(daten, bucket, roundKey) {
  const fights = Array.isArray(daten.kämpfe) ? daten.kämpfe : [];
  if (roundKey === 'F') {
    // Finale & Bronze liegen bei dir unter phase 'finale'
    return fights.filter(f => f.phase === 'finale');
  }
  const roundLabel = ROUND_LABELS[roundKey];
  const bucketWord = bucket === 'top' ? 'Top' : 'Low';
  return fights.filter(f =>
    f.phase === 'ko' &&
    typeof f.groupName === 'string' &&
    f.groupName.includes(bucketWord) &&
    f.groupName.includes(roundLabel)
  ).sort((a,b) => (a.localId||a.id||0) - (b.localId||b.id||0));
}

function fmtFight(f) {
  const a = f.playerA?.name ?? '—';
  const b = f.playerB?.name ?? '—';
  const done = f.finished ? '✅' : '⏳';
  const sa = Number.isInteger(f.scoreA) ? f.scoreA : '–';
  const sb = Number.isInteger(f.scoreB) ? f.scoreB : '–';
  const bo = f.bestOf ? ` (Bo${f.bestOf})` : '';
  return `${a}  vs  ${b}   [${sa}:${sb} ${done}]${bo}`;
}

function makeControls(bucket, roundKey) {
  const next = new ButtonBuilder()
    .setCustomId(`brkt_next_${bucket}_${roundKey}`)
    .setLabel('▶')
    .setStyle(ButtonStyle.Secondary);

  const prev = new ButtonBuilder()
    .setCustomId(`brkt_prev_${bucket}_${roundKey}`)
    .setLabel('◀')
    .setStyle(ButtonStyle.Secondary);

  const switchBtn = new ButtonBuilder()
    .setCustomId(`brkt_swap_${bucket}_${roundKey}`)
    .setLabel(bucket === 'top' ? '🔽 Low' : '🔼 Top')
    .setStyle(ButtonStyle.Primary);

  const row1 = new ActionRowBuilder().addComponents(prev, switchBtn, next);

  const roundSelect = new StringSelectMenuBuilder()
    .setCustomId(`brkt_round_${bucket}_${roundKey}`)
    .setPlaceholder('Runde wählen')
    .addOptions([
      { label: 'Viertelfinale', value: 'QF', emoji: '4️⃣' },
      { label: 'Halbfinale',    value: 'SF', emoji: '2️⃣' },
      { label: 'Finale',        value: 'F',  emoji: '🏁' },
    ])
    .setMinValues(1).setMaxValues(1).setDefaultValues([roundKey]);

  const row2 = new ActionRowBuilder().addComponents(roundSelect);
  return [row1, row2];
}

function buildBracketEmbed(daten, bucket = 'top', roundKey = 'QF') {
  const emoji = bucket === 'top' ? GROUP_EMOJI.top : GROUP_EMOJI.low;
  const title = `Turnierbaum — ${emoji} ${bucket === 'top' ? 'Top' : 'Low'} — ${ROUND_LABELS[roundKey]}`;

  const list = pickFights(daten, bucket, roundKey);
  let body = '';
  if (roundKey === 'F') {
    const final = list.find(f => f.localId === 1) || list[0];
    const bronze = list.find(f => f.localId === 2) || list[1];
    body += 'Finale:\n';
    body += final ? `  • ${fmtFight(final)}\n` : '  • —\n';
    body += '\nBronze:\n';
    body += bronze ? `  • ${fmtFight(bronze)}\n` : '  • —\n';
  } else {
    // QF / SF kompakt in monospaced Codeblock
    body += list.map((f, i) => {
      const label = roundKey === 'QF' ? `QF${i+1}` : `SF${i+1}`;
      return `${label}: ${fmtFight(f)}`;
    }).join('\n');
  }

  const embed = new EmbedBuilder()
    .setColor(0x5865F2)
    .setTitle(title)
    .setDescription('```' + (body || '—') + '```');

  const components = makeControls(bucket, roundKey);
  return { embeds: [embed], components };
}

module.exports = { buildBracketEmbed };