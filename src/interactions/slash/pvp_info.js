// === Imports ===
const { ladeTurnier } = require('../../store/turniere');
const { buildTournamentInfoEmbeds } = require('../../embeds/info');
const { MessageFlags } = require('discord.js');

// Turnier-Info anzeigen
async function execute(interaction) {
  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: '❌ Dieses Kommando steht nur auf Servern zur Verfügung.', flags: MessageFlags.Ephemeral });
  }
  const daten = await ladeTurnier(guildId);
  if (!daten) return interaction.reply({ content: '❌ Kein aktives Turnier.', flags: MessageFlags.Ephemeral });
  const embeds = buildTournamentInfoEmbeds(daten);
  return interaction.reply({ embeds, flags: MessageFlags.Ephemeral });
}

// === Exports ===
module.exports = { execute };