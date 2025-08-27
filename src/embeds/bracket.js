// Kompakter Bracket-View als Embed mit Codeblock
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder
} = require('discord.js');
const { GROUP_EMOJI } = require('../services/tournament');

const ROUND_LABELS = { QF: 'Viertelfinale', SF: 'Halbfinale', F: 'Finale' };

function pickFights(daten, bucket, roundKey) {
  const fights = Array.isArray(daten.kämpfe) ? daten.kämpfe : [];

  if (roundKey === 'F') {
    // Finale & Bronze liegen unter phase 'finale'
    return fights.filter(f => f.phase === 'finale');
  }

  // Robuster Filter: erst über f.bucket, dann Fallback über groupName-Strings
  const byBucket = (f) =>
    (typeof f.bucket === 'string' && f.bucket === bucket) ||
    (typeof f.groupName === 'string' && (
      (bucket === 'top' && (f.groupName.includes('Top') || f.groupName.includes('⬆️'))) ||
      (bucket === 'low' && (f.groupName.includes('Low') || f.groupName.includes('⬇️')))
    ));

  const roundLabel = ROUND_LABELS[roundKey];
  return fights
    .filter(f => f.phase === 'ko' && byBucket(f) && typeof f.groupName === 'string' && f.groupName.includes(roundLabel))
    .sort((a, b) => (a.localId || a.id || 0) - (b.localId || b.id || 0));
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
    .addOptions(
      new StringSelectMenuOptionBuilder().setLabel('Viertelfinale').setValue('QF').setEmoji('4️⃣').setDefault(roundKey === 'QF'),
      new StringSelectMenuOptionBuilder().setLabel('Halbfinale').setValue('SF').setEmoji('2️⃣').setDefault(roundKey === 'SF'),
      new StringSelectMenuOptionBuilder().setLabel('Finale').setValue('F').setEmoji('🏁').setDefault(roundKey === 'F'),
    )
    .setMinValues(1)
    .setMaxValues(1);

  const row2 = new ActionRowBuilder().addComponents(roundSelect);
  return roundKey === 'F' ? [row1, row2] : [row1, row2];
}

function titleOf(bucket, roundKey) {
  const bucketText = roundKey === 'F' ? '' : (bucket === 'low' ? ' ⬇️ Low' : ' ⬆️ Top');
  const roundText = ROUND_LABELS[roundKey] || roundKey;
  return `🏟️ Bracket — ${roundText}${bucketText}`;
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
    body += list.map((f, i) => {
      const label = roundKey === 'QF' ? `QF${i + 1}` : `SF${i + 1}`;
      return `${label}: ${fmtFight(f)}`;
    }).join('\n');
  }

  const embed = new EmbedBuilder()
    .setColor(0x5865F2)
    .setTitle(titleOf(bucket, roundKey))
    .setDescription('```' + (body || '—') + '```');

  const components = makeControls(bucket, roundKey);
  return { embeds: [embed], components };
}

module.exports = { buildBracketEmbed };