// === Imports ===
const { MessageFlags } = require('discord.js');
const { buildRulesEmbeds } = require('../../embeds/rules');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

// Regeln anzeigen
async function execute(interaction, daten) {
  const locale = await resolveInteractionLocale(interaction);
  const embeds = buildRulesEmbeds(daten, locale);
  return interaction.reply({ embeds, flags: MessageFlags.Ephemeral });
}

// === Exports ===
module.exports = { execute };