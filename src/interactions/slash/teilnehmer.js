// src/interactions/slash/teilnehmer.js
const { MessageFlags } = require('discord.js');
const { KLASSE_LISTE } = require('../../config/constants');

const classEmoji = (klasse) => KLASSE_LISTE.find(k => k.name === klasse)?.emoji || '';
const tagEmoji   = (p) => p?.tag === 'Top' ? '⬆️' : (p?.tag === 'Low' ? '⬇️' : '');

async function execute(interaction, daten) {
  const teilnehmer = Object.entries(daten.teilnehmer || {})
    .map(([id, p]) => ({ id, ...p }))
    .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'de', { sensitivity: 'base' }));

  const lines = teilnehmer.map(p =>
    `${classEmoji(p.klasse)} ${p.name} ${tagEmoji(p)} — ${p.klasse}`
  );

  return interaction.reply({
    content: lines.join('\n') || '—',
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = { execute };