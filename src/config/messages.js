const languages = require('./languages');
const { getLocalizedText, SUPPORTED_LOCALES } = require('./constants');

function getNestedValue(base, segments) {
  return segments.reduce((current, segment) => {
    if (current == null) return undefined;
    return current[segment];
  }, base);
}

function buildBundle(segments) {
  const bundle = {};
  for (const locale of SUPPORTED_LOCALES) {
    const value = getNestedValue(languages?.[locale], segments);
    if (typeof value === 'string' && value.length > 0) {
      bundle[locale] = value;
    }
  }
  return bundle;
}

function applyReplacements(text, replacements) {
  if (!text || !replacements) return text || '';
  let result = text;
  for (const [key, value] of Object.entries(replacements)) {
    const pattern = new RegExp(`\\{${key}\\}`, 'g');
    result = result.replace(pattern, value == null ? '' : String(value));
  }
  return result;
}

function getLocalizedString(path, locale, replacements = {}, defaultValue = '') {
  const segments = Array.isArray(path) ? path : String(path).split('.');
  const bundle = buildBundle(segments);
  const resolved = getLocalizedText(bundle, locale) || defaultValue || '';
  return applyReplacements(resolved, replacements);
}

module.exports = { getLocalizedString };