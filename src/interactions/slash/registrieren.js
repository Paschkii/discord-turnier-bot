// === Imports ===
const {
  ActionRowBuilder,
  MessageFlags,
  StringSelectMenuBuilder
} = require('discord.js');
const { KLASSE_LISTE } = require('../../config/constants');
const { getLocalizedString } = require('../../config/messages');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

// Anmeldung zum Turnier
async function execute(interaction, daten) {
  const locale = await resolveInteractionLocale(interaction);
  if (!daten || daten.status !== 'offen') {
    const message = getLocalizedString('messages.tournament.general.registrationClosed', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }
  if (daten.teilnehmer && daten.teilnehmer[interaction.user.id]) {
    const message = getLocalizedString('messages.tournament.general.alreadyRegistered', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  // Auswahlmenü mit Klassen
  const placeholder = getLocalizedString('messages.tournament.registration.selectPlaceholder', locale);
  const select = new StringSelectMenuBuilder()
    .setCustomId(`klasse_auswahl_${interaction.user.id}`)
    .setPlaceholder(placeholder || 'Choose your class…')
    .addOptions((KLASSE_LISTE || []).slice(0, 25).map(k => ({
      label: k.name, value: k.name, emoji: k.emoji
    })));

  // Menü in eine ActionRow packen
  const row = new ActionRowBuilder().addComponents(select);
  const prompt = getLocalizedString('messages.tournament.registration.selectPrompt', locale);
  return interaction.reply({ content: prompt || 'Please choose your class:', components: [row], flags: MessageFlags.Ephemeral });
}

// === Exports ===
module.exports = { execute };