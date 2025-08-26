const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { deleteHoFByNumber } = require('../../store/turniere');

module.exports = {
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '⛔ Nur Admins.', flags: MessageFlags.Ephemeral });
    }
    const nr = interaction.options.getInteger('nummer', true);
    const ok = await deleteHoFByNumber(nr);
    return interaction.reply({ content: ok ? `🗑️ HoF-Eintrag #${nr} gelöscht.` : `❌ Eintrag #${nr} nicht gefunden.` });
  }
};