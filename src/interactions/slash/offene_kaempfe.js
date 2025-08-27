const { MessageFlags } = require('discord.js');
const { ladeTurnier } = require('../../store/turniere');
const { buildDashboard, defaultStateFromData } = require('../../views/dashboard');

async function execute(interaction) {
  const daten = await ladeTurnier();
  const s = defaultStateFromData(daten, 'o'); // Tab Offene
  const view = await buildDashboard(interaction, daten, s);
  return interaction.reply({ ...view, flags: MessageFlags.Ephemeral });
}
module.exports = { execute };