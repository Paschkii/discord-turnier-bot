const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder
} = require('discord.js');
const { KLASSE_LISTE } = require('../config/constants');

const ROUND_LABELS = { QF: 'Viertelfinale', SF: 'Halbfinale', F: 'Finale' };
const emojiOf = Object.fromEntries(KLASSE_LISTE.map(k => [k.name, k.emoji]));

// Holt aktuelle + archivierte Kämpfe zusammen
function getAllFights(daten) {
  const now = Array.isArray(daten.kämpfe) ? daten.kämpfe : [];
  const old = Array.isArray(daten.kämpfeArchiv) ? daten.kämpfeArchiv : [];
  return [...old, ...now];
}

// Fights je Auswahl bestimmen (robust gegen Labels)
function pickFights(daten, bucket, roundKey) {
  const fights = getAllFights(daten);

  if (roundKey === 'F') {
    // Finale & Bronze liegen unter phase 'finale'
    return fights.filter(f => f.phase === 'finale');
  }

  const byBucket = (f) =>
    (typeof f.bucket === 'string' && f.bucket === bucket) ||
    (typeof f.groupName === 'string' && (
      (bucket === 'top' && (f.groupName.includes('Top') || f.groupName.includes('⬆️'))) ||
      (bucket === 'low' && (f.groupName.includes('Low') || f.groupName.includes('⬇️')))
    ));

  const label = ROUND_LABELS[roundKey];
  return fights
    .filter(f => f.phase === 'ko' && byBucket(f) && typeof f.groupName === 'string' && f.groupName.includes(label))
    .sort((a, b) => (a.localId || a.id || 0) - (b.localId || b.id || 0));
}

// Kürzere, handyfreundliche Ausgabe
function fmtFight(f) {
  const A = f.playerA || {}, B = f.playerB || {};
  const aE = A.klasse ? ` ${emojiOf[A.klasse] || ''}` : '';
  const bE = B.klasse ? ` ${emojiOf[B.klasse] || ''}` : '';
  const sA = Number.isInteger(f.scoreA) ? f.scoreA : 0;
  const sB = Number.isInteger(f.scoreB) ? f.scoreB : 0;
  const title = `• **${A.name || '—'}**${aE} vs **${B.name || '—'}**${bE}`;
  const score = `  Ergebnis: ${sA}:${sB}`;
  return `${title}\n${score}`;
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
  return roundKey === 'F' ? [row2] : [row1, row2];
}

function titleOf(bucket, roundKey) {
  const bucketText = roundKey === 'F' ? '' : (bucket === 'low' ? ' ⬇️ Low' : ' ⬆️ Top');
  const roundText = ROUND_LABELS[roundKey] || roundKey;
  return `🏛️ ${roundText}${bucketText}`;
}

function buildBracketEmbed(daten, bucket = 'top', roundKey = 'QF') {
  const fights = pickFights(daten, bucket, roundKey);
  let body = '';

  if (roundKey === 'F') {
    // Erwartet: [Finale, Bronze] mit localId 1/2 (fallback, falls anders)
    const list = fights.slice().sort((a, b) => (a.localId || a.id || 0) - (b.localId || b.id || 0));
    const final  = list[0];
    const bronze = list[1];
    body += '**Finale**\n' + (final ? fmtFight(final) : '—') + '\n\n';
    body += '**Bronze**\n' + (bronze ? fmtFight(bronze) : '—');
  } else {
    body = fights.map(fmtFight).join('\n\n');
  }

  const embed = new EmbedBuilder()
    .setColor(0x5865F2)
    .setTitle(titleOf(bucket, roundKey))
    .setDescription(body || '—')
    .setTimestamp();

  const components = makeControls(bucket, roundKey);
  return { embeds: [embed], components };
}

module.exports = { buildBracketEmbed };