// === Imports ===
const { buildBossChoices } = require('../../utils/bosses');

// Autocomplete für /boss
async function run(interaction) {
  const focused = interaction.options.getFocused(true);
  const locale = 'de'; // aktuell nur deutsche Ausgabe unterstützt
  const query = (focused?.value ?? '').toString();

  const choices = buildBossChoices(locale, query);

  try {
    await interaction.respond(choices);
  } catch (err) {
    // Antwort bereits gesendet oder Interaction ungültig → ignorieren
  }
}

module.exports = { run };