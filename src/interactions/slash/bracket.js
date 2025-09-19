// === Imports ===
const { ladeTurnier } = require('../../store/turniere');
const { buildDashboard, defaultStateFromData } = require('../../views/dashboard');
const { MessageFlags } = require('discord.js')

// Dashboard anzeigen
async function execute(interaction) {
  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: '❌ Dieses Kommando steht nur auf Servern zur Verfügung.', flags: MessageFlags.Ephemeral });
  }
  const daten = await ladeTurnier(guildId);
  // Standardmäßig die Gruppenansicht anzeigen
  const s = defaultStateFromData(daten, 'g');
  const view = await buildDashboard(interaction, daten, s);
  return interaction.reply({ ...view });
}

// === Exports ===
module.exports = { execute };