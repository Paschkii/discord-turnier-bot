const { PermissionsBitField, Colors } = require('discord.js');

const ROLE_NAME = 'Bot of Twelve';
const REQUIRED_PERMISSIONS = new PermissionsBitField([
  PermissionsBitField.Flags.AddReactions,
  PermissionsBitField.Flags.AttachFiles,
  PermissionsBitField.Flags.EmbedLinks,
  PermissionsBitField.Flags.ManageRoles,
  PermissionsBitField.Flags.SendMessages,
  PermissionsBitField.Flags.UseExternalEmojis,
  PermissionsBitField.Flags.UseApplicationCommands,
  PermissionsBitField.Flags.ViewChannel,
]);

async function ensureBotRole(guild) {
  try {
    const me = guild.members.me ?? (await guild.members.fetchMe());
    if (!me) {
      console.error('[guildCreate] Failed to resolve bot member for role assignment');
      return;
    }

    let role = guild.roles.cache.find((guildRole) => guildRole.name === 'Bot of Twelve');

    if (!role) {
      role = await guild.roles.create({
        name: 'Bot of Twelve',
        color: Colors.Red,
        permissions: REQUIRED_PERMISSIONS,
        reason: 'Automatisch vom Bot erstellt',
      });
    } else {
      const updatedPermissions = role.permissions.bitfield | REQUIRED_PERMISSIONS.bitfield;
      if (role.permissions.bitfield !== updatedPermissions) {
        await role.setPermissions(
          updatedPermissions,
          'Sorge für die notwendigen Standardberechtigungen des Bots',
        );
      }
    }

    if (!me.roles.cache.has(role.id)) {
      await me.roles.add(role, 'Standardrolle für den Bot setzen');
    }
  } catch (error) {
    console.error('[guildCreate] Fehler beim Einrichten der Bot-Rolle:', error);
  }
}

async function onGuildCreate(guild) {
  await ensureBotRole(guild);
}

module.exports = { onGuildCreate, ensureBotRole };