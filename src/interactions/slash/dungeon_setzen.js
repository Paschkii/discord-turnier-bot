const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { addDungeon, getEvent } = require('../../store/pvm');

module.exports = {
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '⛔ Nur Admins.', flags: MessageFlags.Ephemeral });
    }
    const name = interaction.options.getString('name');
    if (!addDungeon(name)) {
      return interaction.reply({ content: '⚠️ Kein aktives PvM Event. Starte es mit /pvm_start.', flags: MessageFlags.Ephemeral });
    }
    const event = getEvent();
    return interaction.reply(`➕ Dungeon **${name}** hinzugefügt. Aktuelle Dungeons: ${event.dungeons.join(', ')}`);
  }
};