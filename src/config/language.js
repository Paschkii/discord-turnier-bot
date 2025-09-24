const languages = require('./languages');

const LOCALE_ALIASES = {
  de: ['de'],
  en: ['en', 'en-US', 'en-GB'],
  fr: ['fr', 'fr-FR'],
  es: ['es', 'es-ES'],
  it: ['it', 'it-IT'],
  pt: ['pt', 'pt-BR'],
};

const languageConfig = {};

for (const [key, config] of Object.entries(languages)) {
  languageConfig[key] = config;
}

for (const [base, aliases] of Object.entries(LOCALE_ALIASES)) {
  const config = languages[base];
  if (!config) continue;
  for (const locale of aliases) {
    languageConfig[locale] = config;
  }
}

module.exports = languageConfig;