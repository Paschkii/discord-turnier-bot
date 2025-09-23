// === Imports ===
const { MessageFlags, PermissionsBitField } = require('discord.js');
const { getGuildLanguage, setGuildLanguage } = require('../../store/guildSettings');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');
const {
  LANGUAGE_MODAL_FIELD_ID,
  buildInlineLanguageList,
  buildLanguageEmbed,
  buildLanguageView,
  getErrorMessage,
  isSupportedLanguage,
  normalizeLanguage,
} = require('../language/helpers');

async function updateOriginalMessage(interaction, payload) {
  if (!interaction.message) return;
  try {
    await interaction.message.edit(payload);
  } catch (err) {
    console.error('[language/modal] failed to update original message', err);
  }
}

async function run(interaction) {
  const locale = await resolveInteractionLocale(interaction);

  if (!interaction.member?.permissions?.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: getErrorMessage(locale, 'notAdmin'), flags: MessageFlags.Ephemeral });
  }

  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: getErrorMessage(locale, 'guildOnly'), flags: MessageFlags.Ephemeral });
  }

  const rawValue = interaction.fields.getTextInputValue(LANGUAGE_MODAL_FIELD_ID) || '';
  const requestedLanguage = normalizeLanguage(rawValue);

  if (!requestedLanguage) {
    const message = getErrorMessage(locale, 'modalNoInput');
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  if (!isSupportedLanguage(requestedLanguage)) {
    const message = getErrorMessage(locale, 'unknownLanguage', {
      languages: buildInlineLanguageList(locale),
    });
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  const currentLanguage = await getGuildLanguage(guildId);
  if (currentLanguage === requestedLanguage) {
    const view = buildLanguageView(locale, currentLanguage, 'unchanged');
    await updateOriginalMessage(interaction, view);
    const embed = buildLanguageEmbed(locale, 'unchanged', currentLanguage);
    return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  }

  try {
    await setGuildLanguage(guildId, requestedLanguage);
  } catch (err) {
    console.error('[language/modal] setGuildLanguage failed', err);
    const message = getErrorMessage(locale, 'setFailed');
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  const view = buildLanguageView(locale, requestedLanguage, 'success');
  await updateOriginalMessage(interaction, view);
  const embed = buildLanguageEmbed(locale, 'success', requestedLanguage);
  return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
}

module.exports = { run };