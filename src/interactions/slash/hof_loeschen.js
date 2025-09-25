// === Imports ===
const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { deleteHoFEntry } = require('../../store/turniere');

// Hall of Fame-Eintrag löschen
async function execute(interaction) {
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '⛔ Nur Admins.', flags: MessageFlags.Ephemeral });
  }
  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: '❌ Dieser Befehl kann nur in einem Server verwendet werden.', flags: MessageFlags.Ephemeral });
  }
  const nr = interaction.options.getInteger('nummer');
  const name = interaction.options.getString('name');

  if (nr == null && (!name || !name.trim())) {
    return interaction.reply({
      content: '❌ Bitte gib entweder eine Nummer oder einen exakten Namen an.',
      flags: MessageFlags.Ephemeral
    });
  }

  const { ok, reason, deleted } = await deleteHoFEntry(guildId, { number: nr ?? undefined, name: name ?? undefined });
  const identifier = deleted?.name || (name ? `„${name}“` : `#${nr}`);
  return interaction.reply({
    content: ok
      ? `🗑️ HoF-Eintrag ${identifier ? `(${identifier}) ` : ''}gelöscht.`
      : `❌ Eintrag ${identifier} nicht gefunden${reason ? `: ${reason}` : ''}.`
  });
}

// === Exports ===
module.exports = { execute };