// === Language interaction helpers ===
const {
  ActionRowBuilder,
  EmbedBuilder,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
const languageConfig = require('../../config/language');
const { SUPPORTED_LANGUAGES } = require('../../store/guildSettings');

const DEFAULT_LOCALE = 'de';
const LANGUAGE_SELECT_CUSTOM_ID = 'language|select';
const LANGUAGE_MODAL_CUSTOM_ID = 'language|modal';
const LANGUAGE_MODAL_FIELD_ID = 'language|modal|code';
const MANUAL_LANGUAGE_VALUE = 'manual';

const STATUS_COLORS = {
  overview: 0x5865F2,
  success: 0x57F287,
  unchanged: 0xFEE75C,
};

const SUPPORTED_LANGUAGE_SET = new Set(SUPPORTED_LANGUAGES);

function getLocaleConfig(locale) {
  return languageConfig[locale] || languageConfig[DEFAULT_LOCALE];
}

function resolveLocalizedEntry(locale, path) {
  const keys = Array.isArray(path) ? path : [path];
  let current = getLocaleConfig(locale);
  for (const key of keys) {
    if (current && Object.prototype.hasOwnProperty.call(current, key)) {
      current = current[key];
    } else {
      current = undefined;
      break;
    }
  }
  if (current !== undefined) return current;
  if (locale === DEFAULT_LOCALE) return undefined;
  return resolveLocalizedEntry(DEFAULT_LOCALE, keys);
}

function formatTemplate(template, replacements = {}) {
  if (!template || typeof template !== 'string') return template || '';
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const replacement = replacements[key];
    return replacement !== undefined ? replacement : `{${key}}`;
  });
}

function normalizeLanguage(value) {
  if (!value) return '';
  return String(value).trim().toLowerCase();
}

function isSupportedLanguage(value) {
  return SUPPORTED_LANGUAGE_SET.has(value);
}

function getOptionInfo(locale, code) {
  return (
    resolveLocalizedEntry(locale, ['selects', 'language', 'options', code]) ||
    resolveLocalizedEntry(DEFAULT_LOCALE, ['selects', 'language', 'options', code]) ||
    {}
  );
}

function formatLanguageLabel(locale, code) {
  const option = getOptionInfo(locale, code);
  if (option.label) {
    return `${option.label} (${code})`;
  }
  return code;
}

function buildLanguageList(locale) {
  return SUPPORTED_LANGUAGES.map(code => `• ${formatLanguageLabel(locale, code)}`).join('\n');
}

function buildInlineLanguageList(locale) {
  return SUPPORTED_LANGUAGES.map(code => formatLanguageLabel(locale, code)).join(', ');
}

function buildLanguageSelect(locale, currentLanguage) {
  const placeholder = resolveLocalizedEntry(locale, ['selects', 'language', 'placeholder']) || '';
  const manualOption = resolveLocalizedEntry(locale, ['selects', 'language', 'manualOption']);
  const menu = new StringSelectMenuBuilder()
    .setCustomId(LANGUAGE_SELECT_CUSTOM_ID)
    .setPlaceholder(placeholder)
    .setMinValues(1)
    .setMaxValues(1);

  for (const code of SUPPORTED_LANGUAGES) {
    const option = getOptionInfo(locale, code);
    const description = option.description
      ? formatTemplate(option.description, { language: formatLanguageLabel(locale, code) })
      : undefined;
    menu.addOptions({
      label: option.label || formatLanguageLabel(DEFAULT_LOCALE, code),
      value: code,
      description,
      default: currentLanguage === code,
    });
  }

  if (manualOption?.label) {
    const manualDescription = manualOption.description
      ? formatTemplate(manualOption.description)
      : undefined;
    menu.addOptions({
      label: manualOption.label,
      value: MANUAL_LANGUAGE_VALUE,
      description: manualDescription,
    });
  }

  return new ActionRowBuilder().addComponents(menu);
}

function buildLanguageEmbed(locale, key, language) {
  const template = resolveLocalizedEntry(locale, ['embeds', 'language', key]) || {};
  const replacements = {
    language: formatLanguageLabel(locale, language),
    languages: buildInlineLanguageList(locale),
  };
  const color = STATUS_COLORS[key] || STATUS_COLORS.overview;
  const embed = new EmbedBuilder().setColor(color);

  if (template.title) {
    embed.setTitle(formatTemplate(template.title, replacements));
  }
  if (template.description) {
    embed.setDescription(formatTemplate(template.description, replacements));
  }
  if (template.footer) {
    embed.setFooter({ text: formatTemplate(template.footer, replacements) });
  }

  const listLabel = resolveLocalizedEntry(locale, ['embeds', 'language', 'listLabel']);
  const listValue = buildLanguageList(locale);
  if (listLabel && listValue) {
    embed.addFields({ name: listLabel, value: listValue });
  }

  return embed;
}

function buildLanguageView(locale, currentLanguage, key) {
  return {
    embeds: [buildLanguageEmbed(locale, key, currentLanguage)],
    components: [buildLanguageSelect(locale, currentLanguage)],
  };
}

function buildManualModal(locale) {
  const modalCopy =
    resolveLocalizedEntry(locale, ['modals', 'language', 'manual']) ||
    resolveLocalizedEntry(DEFAULT_LOCALE, ['modals', 'language', 'manual']) ||
    {};
  const modal = new ModalBuilder()
    .setCustomId(LANGUAGE_MODAL_CUSTOM_ID)
    .setTitle(modalCopy.title || 'Language code');

  const input = new TextInputBuilder()
    .setCustomId(LANGUAGE_MODAL_FIELD_ID)
    .setLabel(modalCopy.label || 'Language code')
    .setPlaceholder(modalCopy.placeholder || '')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setMaxLength(16);

  modal.addComponents(new ActionRowBuilder().addComponents(input));
  return modal;
}

function getErrorMessage(locale, key, replacements = {}) {
  const template = resolveLocalizedEntry(locale, ['errors', 'language', key]);
  if (!template) return '';
  return formatTemplate(template, replacements);
}

module.exports = {
  DEFAULT_LOCALE,
  LANGUAGE_SELECT_CUSTOM_ID,
  LANGUAGE_MODAL_CUSTOM_ID,
  LANGUAGE_MODAL_FIELD_ID,
  MANUAL_LANGUAGE_VALUE,
  buildInlineLanguageList,
  buildLanguageEmbed,
  buildLanguageList,
  buildLanguageSelect,
  buildLanguageView,
  buildManualModal,
  formatLanguageLabel,
  getErrorMessage,
  isSupportedLanguage,
  normalizeLanguage,
};