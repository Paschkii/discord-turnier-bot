// === Imports ===
const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { getEvent, stopEvent } = require('../../store/pvm');

// PvM Event stoppen
async function execute(interaction) {
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '⛔ Nur Admins.', flags: MessageFlags.Ephemeral });
  }

  const event = getEvent();
  if (!event.active) {
    return interaction.reply({ content: '⚠️ Kein aktives PvM Event zum Stoppen.', flags: MessageFlags.Ephemeral });
  }

  stopEvent();
  return interaction.reply('🛑 PvM Event gestoppt und entfernt.');
}

// === Exports ===
module.exports = { execute };