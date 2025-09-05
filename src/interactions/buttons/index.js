// === Imports ===
const bracketNav        = require('./bracketNav');
const groupsPagination  = require('./groupsPagination');
const hofPagination     = require('./hofPagination');
const startTieBreakers  = require('./startTieBreakers');
const tournamentNav     = require('./tournamentNav');

// Handhabt Button-Interaktionen
async function handleButtons(interaction, daten) {
  const id = interaction.customId || '';
  if (/^pg_groups_/.test(id))   return groupsPagination.run(interaction, daten); // Gruppen-Seiten
  if (/^pg_hof_/.test(id))      return hofPagination.run(interaction, daten);    // HoF-Seiten
  if (id === 'start_tiebreakers') return startTieBreakers.run(interaction, daten); // Button zum Erstellen TB-Kämpfe
  if (bracketNav.canHandle(id)) return bracketNav.run(interaction, daten); // Bracket-Navigation
  if ((interaction.customId || '').startsWith('tnav|')) return tournamentNav.run(interaction); // Tournament Dashboard Navigation
}

// === Exports ===
module.exports = { handleButtons };