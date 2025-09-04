const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { startEvent } = require('../../store/pvm');

module.exports = {
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '⛔ Nur Admins.', flags: MessageFlags.Ephemeral });
    }
    startEvent();
    return interaction.reply('🏁 PvM Event gestartet! Nutze /dungeon_setzen um Dungeons hinzuzufügen.');
  }
};