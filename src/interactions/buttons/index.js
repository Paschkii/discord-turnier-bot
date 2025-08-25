const groupsPagination = require('./groupsPagination');
const hofPagination    = require('./hofPagination');
const startTieBreakers = require('./startTieBreakers');

module.exports = async function handleButtons(interaction, daten) {
  const id = interaction.customId || '';
  if (/^pg_groups_/.test(id))   return groupsPagination.run(interaction, daten); // Gruppen-Seiten :contentReference[oaicite:10]{index=10}
  if (/^pg_hof_/.test(id))      return hofPagination.run(interaction, daten);    // HoF-Seiten :contentReference[oaicite:11]{index=11}
  if (id === 'start_tiebreakers') return startTieBreakers.run(interaction, daten); // Button zum Erstellen TB-Kämpfe :contentReference[oaicite:12]{index=12}
};
