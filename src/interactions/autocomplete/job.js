const { buildJobChoices } = require('../../utils/jobs');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

async function run(interaction) {
  const focused = interaction.options.getFocused(true);
  const locale = await resolveInteractionLocale(interaction);
  const query = (focused?.value ?? '').toString();

  const choices = buildJobChoices(locale, query);

  try {
    await interaction.respond(choices);
  } catch (err) {
    // Interaction already answered or invalid
  }
}

module.exports = { run };