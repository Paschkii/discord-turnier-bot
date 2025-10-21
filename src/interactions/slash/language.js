// === Imports ===
const { MessageFlags, PermissionsBitField } = require('discord.js');
const { getGuildLanguage, setGuildLanguage } = require('../../store/guildSettings');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');
const {
  buildInlineLanguageList,
  buildLanguageView,
  getErrorMessage,
  isSupportedLanguage,
  normalizeLanguage,
} = require('../language/helpers');

// Sprache für den Bot setzen
async function execute(interaction) {
  const locale = await resolveInteractionLocale(interaction);

  if (!interaction.memberPermissions?.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: getErrorMessage(locale, 'notAdmin'), flags: MessageFlags.Ephemeral });
  }

  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: getErrorMessage(locale, 'guildOnly'), flags: MessageFlags.Ephemeral });
  }

  const requestedLanguage = normalizeLanguage(interaction.options.getString('language'));
  const currentLanguage = await getGuildLanguage(guildId);

  if (!requestedLanguage) {
    const view = buildLanguageView(locale, currentLanguage, 'overview');
    return interaction.reply({ ...view, flags: MessageFlags.Ephemeral });
  }

  if (!isSupportedLanguage(requestedLanguage)) {
    const message = getErrorMessage(locale, 'unknownLanguage', {
      languages: buildInlineLanguageList(locale),
    });
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  if (currentLanguage === requestedLanguage) {
    const view = buildLanguageView(locale, currentLanguage, 'unchanged');
    return interaction.reply({ ...view, flags: MessageFlags.Ephemeral });
  }

  try {
    await setGuildLanguage(guildId, requestedLanguage);
  } catch (err) {
    console.error('[language] setGuildLanguage failed', err);
    const message = getErrorMessage(locale, 'setFailed');
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  const view = buildLanguageView(locale, requestedLanguage, 'success');
  return interaction.reply({ ...view, flags: MessageFlags.Ephemeral });
}

module.exports = { execute };