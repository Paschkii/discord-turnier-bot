const { MessageFlags } = require('discord.js');
const { buildRulesEmbeds } = require('../../embeds/rules');

module.exports = {
  async execute(interaction, daten) {
    const embeds = buildRulesEmbeds(daten);
    // Öffentlich zeigen → flags weglassen; nur für den User → Ephemeral-Flag setzen:
    return interaction.reply({ embeds, flags: MessageFlags.Ephemeral });
  }
};