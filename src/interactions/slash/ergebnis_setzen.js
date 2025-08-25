const { PermissionsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '⛔ Nur Admins.', ephemeral: true });
    }
    const kampfId = interaction.options.getString('kampf', true); // aus Autocomplete
    const modal = new ModalBuilder().setCustomId(`setscore_${kampfId}`).setTitle(`Ergebnis setzen (#${kampfId})`);
    const a = new TextInputBuilder().setCustomId('score_a').setLabel('Score A').setPlaceholder('z. B. 2').setStyle(TextInputStyle.Short).setRequired(true);
    const b = new TextInputBuilder().setCustomId('score_b').setLabel('Score B').setPlaceholder('z. B. 1').setStyle(TextInputStyle.Short).setRequired(true);
    modal.addComponents(new ActionRowBuilder().addComponents(a), new ActionRowBuilder().addComponents(b));
    return interaction.showModal(modal);
  }
};
