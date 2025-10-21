// === Imports ===
const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { ladeTurnier } = require('../../store/turniere');
const setscore = require('../modals/setscore');
const { getLocalizedString } = require('../../config/messages');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

// Ergebnis eines Kampfes setzen
async function execute(interaction) {
  // Admin-Guard
  const locale = await resolveInteractionLocale(interaction);
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '⛔ Nur Admins.', flags: MessageFlags.Ephemeral });
  }
  const guildId = interaction.guildId;
  if (!guildId) {
    const message = getLocalizedString('messages.tournament.score.adminOnly', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral});
  }

  // Kampf-ID aus Autocomplete übernehmen
  const kampfIdStr = interaction.options.getString('kampf', true);
  const kampfId = parseInt(kampfIdStr, 10);
  if (!Number.isInteger(kampfId)) {
    const message = getLocalizedString('messages.tournament.general.guildOnlyCommand', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral});
  }

  // Fight laden, um die Spielernamen als Labels zu setzen
  const daten = await ladeTurnier(guildId);
  const fight = (daten?.kämpfe || []).find(f => f.id === kampfId);
  if (!fight) {
    const message = getLocalizedString('messages.tournament.score.invalidMatchId', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  // Modal mit Spielernamen anzeigen
  return setscore.open(interaction, fight);
}

// === Exports ===
module.exports = { execute };