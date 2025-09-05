// === Imports ===
const { ladeTurnier } = require('../../store/turniere');
const { buildTournamentInfoEmbeds } = require('../../embeds/info');
const { MessageFlags } = require('discord.js');

// Turnier-Info anzeigen
async function execute(interaction) {
  const daten = await ladeTurnier();
  if (!daten) return interaction.reply({ content: '❌ Kein aktives Turnier.', flags: MessageFlags.Ephemeral });
  const embeds = buildTournamentInfoEmbeds(daten);
  return interaction.reply({ embeds, flags: MessageFlags.Ephemeral });
}

// === Exports ===
module.exports = { execute };