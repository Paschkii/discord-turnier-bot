// src/interactions/slash/teilnehmer.js
const { MessageFlags, EmbedBuilder } = require('discord.js');
const { KLASSE_LISTE } = require('../../config/constants');

const classEmoji = (klasse) => KLASSE_LISTE.find(k => k.name === klasse)?.emoji || '';
const tagEmoji   = (p) => p?.tag === 'Top' ? '⬆️' : (p?.tag === 'Low' ? '⬇️' : '');

async function execute(interaction, daten) {
  const teilnehmer = Object.entries(daten.teilnehmer || {})
    .map(([id, p]) => ({ id, ...p }))
    .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'de', { sensitivity: 'base' }));

  // Format: Name [Tag] Emoji Klassenname
  const lines = teilnehmer.map(p =>
    `• **${p.name}** ${tagEmoji(p)} ${classEmoji(p.klasse)} ${p.klasse || '—'}`
  );

  const embed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle(`👤 Teilnehmer (${teilnehmer.length})`)
    .setDescription(lines.join('\n') || '—')
    .setTimestamp();

  return interaction.reply({
    embeds: [embed],
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = { execute };