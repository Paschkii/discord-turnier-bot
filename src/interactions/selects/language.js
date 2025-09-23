// === Imports ===
const { MessageFlags, PermissionsBitField } = require('discord.js');
const { getGuildLanguage, setGuildLanguage } = require('../../store/guildSettings');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');
const {
  LANGUAGE_SELECT_CUSTOM_ID,
  MANUAL_LANGUAGE_VALUE,
  buildInlineLanguageList,
  buildLanguageView,
  buildManualModal,
  getErrorMessage,
  isSupportedLanguage,
  normalizeLanguage,
} = require('../language/helpers');

async function run(interaction) {
  const locale = await resolveInteractionLocale(interaction);

  if (!interaction.member?.permissions?.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: getErrorMessage(locale, 'notAdmin'), flags: MessageFlags.Ephemeral });
  }

  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: getErrorMessage(locale, 'guildOnly'), flags: MessageFlags.Ephemeral });
  }

  const selected = interaction.values?.[0];
  if (!selected) {
    const message = getErrorMessage(locale, 'noSelection');
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  if (selected === MANUAL_LANGUAGE_VALUE) {
    return interaction.showModal(buildManualModal(locale));
  }

  const requestedLanguage = normalizeLanguage(selected);
  if (!isSupportedLanguage(requestedLanguage)) {
    const message = getErrorMessage(locale, 'unknownLanguage', {
      languages: buildInlineLanguageList(locale),
    });
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  const currentLanguage = await getGuildLanguage(guildId);
  if (currentLanguage === requestedLanguage) {
    const view = buildLanguageView(locale, currentLanguage, 'unchanged');
    return interaction.update(view);
  }

  try {
    await setGuildLanguage(guildId, requestedLanguage);
  } catch (err) {
    console.error('[language/select] setGuildLanguage failed', err);
    const message = getErrorMessage(locale, 'setFailed');
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  const view = buildLanguageView(locale, requestedLanguage, 'success');
  return interaction.update(view);
}

module.exports = { LANGUAGE_SELECT_CUSTOM_ID, run };