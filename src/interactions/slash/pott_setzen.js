const { PermissionsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '⛔ Nur Admins.', ephemeral: true });
    }
    const modal = new ModalBuilder()
      .setCustomId('setprize')
      .setTitle('Pott & Aufteilung (Top 3)');
    const total  = new TextInputBuilder()
      .setCustomId('total_pot')
      .setLabel('Gesamtpott (z. B. 15mk)')
      .setPlaceholder('z. B. 15mk oder 15000000')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
    const first  = new TextInputBuilder()
      .setCustomId('prize_first')
      .setLabel('🥇 (optional)')
      .setStyle(TextInputStyle.Short)
      .setRequired(false);
    const second = new TextInputBuilder()
      .setCustomId('prize_second')
      .setLabel('🥈 (optional)')
      .setStyle(TextInputStyle.Short)
      .setRequired(false);
    const third  = new TextInputBuilder()
      .setCustomId('prize_third')
      .setLabel('🥉 (optional)')
      .setStyle(TextInputStyle.Short)
      .setRequired(false);
    modal.addComponents(
      new ActionRowBuilder().addComponents(total),
      new ActionRowBuilder().addComponents(first),
      new ActionRowBuilder().addComponents(second),
      new ActionRowBuilder().addComponents(third)
    );
    return interaction.showModal(modal);
  }
};
