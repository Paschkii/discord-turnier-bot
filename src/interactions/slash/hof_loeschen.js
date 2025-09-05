// === Imports ===
const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { deleteHoFByNumber } = require('../../store/turniere');

// Hall of Fame-Eintrag löschen
async function execute(interaction) {
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '⛔ Nur Admins.', flags: MessageFlags.Ephemeral });
  }
  const nr = interaction.options.getInteger('nummer', true);
  const { ok, reason } = await deleteHoFByNumber(nr);
  return interaction.reply({
    content: ok
      ? `🗑️ HoF-Eintrag #${nr} gelöscht.`
      : `❌ Eintrag #${nr} nicht gefunden${reason ? `: ${reason}` : ''}.`
  });
}

// === Exports ===
module.exports = { execute };