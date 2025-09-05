// === Imports ===
const klassenwahl = require('./klassenwahl');
const tournamentGroup = require('./tournamentGroup');

// === Functions ===
// Handle Select Menus
async function handleSelects(interaction, daten) {
  const id = interaction.customId || '';
  if (id.startsWith('klasse_auswahl_')) return klassenwahl.run(interaction, daten); // deine Klassenwahl
  if (id.startsWith('tnav|group|')) return tournamentGroup.run(interaction); // Turnier-Gruppenwahl
}

// === Exports ===
module.exports = { handleSelects };