// === Imports ===
const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { addDungeon, getEvent } = require('../../store/pvm');
const {
  findDungeonById,
  findDungeonByName,
  getDungeonName,
} = require('../../utils/dungeons');
const {
  getInteractionLocaleHint,
  resolveInteractionLocale,
} = require('../../utils/interactionLocale');

// Dungeon setzen
async function execute(interaction) {
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '⛔ Nur Admins.', flags: MessageFlags.Ephemeral });
  }

// Dungeon Name
  const rawValue = interaction.options.getString('name', true);
  const localeHint = getInteractionLocaleHint(interaction);
  const localePromise = resolveInteractionLocale(interaction).catch(() => localeHint || 'en');

  let dungeon = findDungeonById(rawValue);
  if (!dungeon) {
    dungeon = findDungeonByName(rawValue, localeHint);
  }

  const locale = (await localePromise) || localeHint || 'en';
  if (!dungeon) {
    dungeon = findDungeonByName(rawValue, locale);
  }

  let name = rawValue;
  if (dungeon) {
    name =
      getDungeonName(dungeon, locale)
      || getDungeonName(dungeon, localeHint)
      || getDungeonName(dungeon, 'en')
      || rawValue;
  }

  if (typeof name === 'string') {
    name = name.trim() || rawValue;
  }
  
  if (!addDungeon(name)) {
    return interaction.reply({ content: '⚠️ Kein aktives PvM Event. Starte es mit /pvm_start.', flags: MessageFlags.Ephemeral });
  }
  const event = getEvent();
  return interaction.reply(`📝 Dungeon **${name}** hinzugefügt. Aktuelle Dungeons: ${event.dungeons.join(', ')}`);
}

// === Exports ===
module.exports = { execute };