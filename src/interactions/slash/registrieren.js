// === Imports ===
const {
  ActionRowBuilder,
  MessageFlags,
  StringSelectMenuBuilder
} = require('discord.js');
const { KLASSE_LISTE } = require('../../config/constants');

// Anmeldung zum Turnier
async function execute(interaction, daten) {
  // kein DB-Call hier – wir vertrauen auf den Snapshot aus dem Router
  if (!daten || daten.status !== 'offen') {
    return interaction.reply({ content: '❌ Keine Anmeldung möglich (Turnier nicht offen).', flags: MessageFlags.Ephemeral });
  }
  if (daten.teilnehmer && daten.teilnehmer[interaction.user.id]) {
    return interaction.reply({ content: '⚠️ Du bist bereits angemeldet.', flags: MessageFlags.Ephemeral });
  }

  // Auswahlmenü mit Klassen
  const select = new StringSelectMenuBuilder()
    .setCustomId(`klasse_auswahl_${interaction.user.id}`)
    .setPlaceholder('Wähle deine Klasse...')
    .addOptions((KLASSE_LISTE || []).slice(0, 25).map(k => ({
      label: k.name, value: k.name, emoji: k.emoji
    })));

  // Menü in eine ActionRow packen
  const row = new ActionRowBuilder().addComponents(select);
  return interaction.reply({ content: 'Bitte wähle deine Klasse:', components: [row], flags: MessageFlags.Ephemeral });
}

// === Exports ===
module.exports = { execute };