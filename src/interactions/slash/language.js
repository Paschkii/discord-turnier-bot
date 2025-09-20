// === Imports ===
const { MessageFlags, PermissionsBitField } = require('discord.js');
const {
  getGuildLanguage,
  setGuildLanguage,
  SUPPORTED_LANGUAGES,
} = require('../../store/guildSettings');

const LANGUAGE_NAMES = {
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português (Brasil)',
};

const SUPPORTED_LANGUAGE_SET = new Set(SUPPORTED_LANGUAGES);

function formatLanguage(language) {
  return `${LANGUAGE_NAMES[language] || language} (${language})`;
}

function supportedLanguageList() {
  return SUPPORTED_LANGUAGES.map(formatLanguage).join(', ');
}

// Sprache für den Bot setzen
async function execute(interaction) {
  if (!interaction.member?.permissions?.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '⛔ Nur Admins dürfen die Bot-Sprache ändern.', flags: MessageFlags.Ephemeral });
  }

  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: '❌ Dieser Befehl kann nur auf einem Server verwendet werden.', flags: MessageFlags.Ephemeral });
  }

  const requestedLanguage = interaction.options.getString('language');
  if (!requestedLanguage) {
    const current = await getGuildLanguage(guildId);
    return interaction.reply({
      content: `ℹ️ Aktuelle Bot-Sprache: ${formatLanguage(current)}.`,
      flags: MessageFlags.Ephemeral,
    });
  }

  if (!SUPPORTED_LANGUAGE_SET.has(requestedLanguage)) {
    return interaction.reply({
      content: `❌ Unbekannte Sprache. Unterstützt werden: ${supportedLanguageList()}.`,
      flags: MessageFlags.Ephemeral,
    });
  }

  const currentLanguage = await getGuildLanguage(guildId);
  if (currentLanguage === requestedLanguage) {
    return interaction.reply({
      content: `ℹ️ Die Bot-Sprache ist bereits ${formatLanguage(currentLanguage)}.`,
      flags: MessageFlags.Ephemeral,
    });
  }

  try {
    await setGuildLanguage(guildId, requestedLanguage);
  } catch (err) {
    console.error('[language] setGuildLanguage failed', err);
    return interaction.reply({ content: '❌ Konnte die Sprache nicht speichern. Bitte später erneut versuchen.', flags: MessageFlags.Ephemeral });
  }

  return interaction.reply({
    content: `✅ Bot-Sprache für diesen Server wurde auf ${formatLanguage(requestedLanguage)} gesetzt.`,
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = { execute };