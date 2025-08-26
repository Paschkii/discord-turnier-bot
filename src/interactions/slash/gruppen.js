const { buildPagedGroupReply } = require('../../embeds/groups');
const { MessageFlags } = require('discord.js');

module.exports = {
  async execute(interaction, daten) {
    if (!daten || (daten.groups || []).length === 0) {
      return interaction.reply({ content: '❌ Keine Gruppen aktiv.', flags: MessageFlags.Ephemeral });
    }
    const { embeds, components } = buildPagedGroupReply(daten, 1, 10);
    return interaction.reply({ embeds, components, flags: MessageFlags.Ephemeral });
  }
};