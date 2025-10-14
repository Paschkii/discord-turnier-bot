const { PermissionsBitField } = require('discord.js');
const { installGuildEmojis } = require('../services/emojiInstaller');

const ROLE_NAME = 'Bot of Twelve';
const REQUIRED_PERMISSIONS = new PermissionsBitField([
  PermissionsBitField.Flags.ViewChannel,
  PermissionsBitField.Flags.SendMessages,
]);

async function ensureBotRole(guild) {
  try {
    const me = guild.members.me ?? (await guild.members.fetchMe());
    if (!me) {
      console.error('[guildCreate] Failed to resolve bot member for role assignment');
      return;
    }

    let role = guild.roles.cache.find((guildRole) => guildRole.name === ROLE_NAME);

    if (!role) {
      role = await guild.roles.create({
        name: ROLE_NAME,
        permissions: REQUIRED_PERMISSIONS,
        reason: 'Standardrolle für den Turnier-Bot',
      });
    } else {
      const updatedPermissions = role.permissions.bitfield | REQUIRED_PERMISSIONS.bitfield;
      if (role.permissions.bitfield !== updatedPermissions) {
        await role.setPermissions(
          updatedPermissions,
          'Sorge für die notwendigen Standardberechtigungen des Turnier-Bots',
        );
      }
    }

    if (!me.roles.cache.has(role.id)) {
      await me.roles.add(role, 'Standardrolle für den Turnier-Bot setzen');
    }
  } catch (error) {
    console.error('[guildCreate] Fehler beim Einrichten der Bot-Rolle:', error);
  }
}

async function onGuildCreate(guild) {
  await ensureBotRole(guild);
  await installGuildEmojis(guild);
}

module.exports = { onGuildCreate };