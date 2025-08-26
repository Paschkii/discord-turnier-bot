// src/interactions/slash/ergebnis_setzen.js
const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { ladeTurnier } = require('../../store/turniere');
const setscore = require('../modals/setscore');

async function execute(interaction) {
  // Admin-Guard
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '⛔ Nur Admins.', flags: MessageFlags.Ephemeral });
  }

  // Kampf-ID aus Autocomplete übernehmen
  const kampfIdStr = interaction.options.getString('kampf', true);
  const kampfId = parseInt(kampfIdStr, 10);
  if (!Number.isInteger(kampfId)) {
    return interaction.reply({ content: '❌ Ungültige Kampf-ID.', flags: MessageFlags.Ephemeral });
  }

  // Fight laden, um die Spielernamen als Labels zu setzen
  const daten = await ladeTurnier();
  const fight = (daten?.kämpfe || []).find(f => f.id === kampfId);
  if (!fight) {
    return interaction.reply({ content: `❌ Kampf #${kampfId} nicht gefunden.`, flags: MessageFlags.Ephemeral });
  }

  // Modal mit Spielernamen anzeigen
  return setscore.open(interaction, fight);
}

module.exports = { execute };