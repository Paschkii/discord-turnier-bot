const { buildPagedGroupReply } = require('../../embeds/groups');

module.exports = {
  async execute(interaction, daten) {
    if (!daten || (daten.groups || []).length === 0) {
      return interaction.reply({ content: '❌ Keine Gruppen aktiv.', ephemeral: true });
    }
    const { embeds, components } = buildPagedGroupReply(daten, 1, 10);
    return interaction.reply({ embeds, components, ephemeral: true });
  }
};