// === Imports ===
const klassenwahl = require('./klassenwahl');
const tournamentGroup = require('./tournamentGroup');
const { LANGUAGE_SELECT_CUSTOM_ID, run: runLanguageSelect } = require('./language');

// === Functions ===
// Handle Select Menus
async function handleSelects(interaction, daten) {
  const id = interaction.customId || '';
  if (id.startsWith('klasse_auswahl_')) return klassenwahl.run(interaction, daten); // deine Klassenwahl
  if (id.startsWith('tnav|group|')) return tournamentGroup.run(interaction); // Turnier-Gruppenwahl
  if (id === LANGUAGE_SELECT_CUSTOM_ID) return runLanguageSelect(interaction); // /language Auswahl
}

// === Exports ===
module.exports = { handleSelects };