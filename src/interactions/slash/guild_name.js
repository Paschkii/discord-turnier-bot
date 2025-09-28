// === Imports ===
const { MessageFlags, PermissionsBitField } = require('discord.js');
const { getGuildCustomName, setGuildCustomName } = require('../../store/guildSettings');

// Benutzerdefinierten Guild-Namen setzen (für automatische Turniernamen)
async function execute(interaction) {
  const guildId = interaction.guildId;
  if (!guildId) {
    await interaction.reply({ content: '❌ Dieser Befehl kann nur in einem Server verwendet werden.', flags: MessageFlags.Ephemeral });
    return;
  }
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    await interaction.reply({ content: '⛔ Nur Admins können den Gilden-Namen setzen.', flags: MessageFlags.Ephemeral });
    return;
  }

  const requested = interaction.options.getString('name');
  const trimmed = typeof requested === 'string' ? requested.trim() : '';

  if (!trimmed) {
    const previous = await getGuildCustomName(guildId);
    await setGuildCustomName(guildId, null);
    const message = previous
      ? '♻️ Der benutzerdefinierte Gildenname wurde entfernt. Es wird wieder der Servername verwendet.'
      : 'ℹ️ Es war kein benutzerdefinierter Gildenname gesetzt. Es wird weiterhin der Servername verwendet.';
    await interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
    return;
  }

  if (trimmed.length > 100) {
    await interaction.reply({ content: '❌ Der Name darf höchstens 100 Zeichen lang sein.', flags: MessageFlags.Ephemeral });
    return;
  }

  await setGuildCustomName(guildId, trimmed);
  await interaction.reply({ content: `✅ Gildenname für automatische Turniere gesetzt: **${trimmed}**`, flags: MessageFlags.Ephemeral });
}

// === Exports ===
module.exports = { execute };