const { MessageFlags } = require('discord.js');
const { ladeTurnier } = require('../../store/turniere');
const { buildDashboard, defaultStateFromData } = require('../../views/dashboard');

async function execute(interaction) {
  const daten = await ladeTurnier();
  const s = defaultStateFromData(daten, 'b'); // Tab Bracket (QF/SF/F)
  const view = await buildDashboard(interaction, daten, s);
  return interaction.reply({ ...view, flags: MessageFlags.Ephemeral });
}
module.exports = { execute };