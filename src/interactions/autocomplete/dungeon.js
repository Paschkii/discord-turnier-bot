// === Imports ===
const { buildDungeonChoices } = require('../../utils/dungeons');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

// Autocomplete für /dungeon
async function run(interaction) {
  const focused = interaction.options.getFocused(true);
  const locale = await resolveInteractionLocale(interaction);
  const query = (focused?.value ?? '').toString();

  const choices = buildDungeonChoices(locale, query);

  try {
    await interaction.respond(choices);
  } catch (err) {
    // Antwort bereits gesendet oder Interaction ungültig → ignorieren
  }
}

// === Exports ===
module.exports = { run };