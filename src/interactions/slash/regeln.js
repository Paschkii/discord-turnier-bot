// === Imports ===
const { MessageFlags } = require('discord.js');
const { buildRulesEmbeds } = require('../../embeds/rules');

// Regeln anzeigen
async function execute(interaction, daten) {
  const embeds = buildRulesEmbeds(daten);
  // Öffentlich zeigen → flags weglassen; nur für den User → Ephemeral-Flag setzen:
  return interaction.reply({ embeds, flags: MessageFlags.Ephemeral });
}

// === Exports ===
module.exports = { execute };