const { ladeTurnier } = require('../../store/turniere');
const { buildDashboard, defaultStateFromData } = require('../../views/dashboard');

async function execute(interaction) {
  const daten = await ladeTurnier();
  // Standardmäßig die Gruppenansicht anzeigen
  const s = defaultStateFromData(daten, 'g');
  const view = await buildDashboard(interaction, daten, s);
  return interaction.reply({ ...view });
}
module.exports = { execute };