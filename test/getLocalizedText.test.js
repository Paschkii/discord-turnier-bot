const test = require('node:test');
const assert = require('node:assert/strict');
const { getLocalizedText } = require('../src/config/constants/shared');

test('getLocalizedText falls back to English when locale entry empty', () => {
  const entry = {
    de: 'Deutsch',
    en: 'English',
    fr: '',
  };

  assert.equal(getLocalizedText(entry, 'fr'), 'English');
});

test('getLocalizedText prefers locale specific text when available', () => {
  const entry = {
    en: 'English',
    fr: 'Français',
  };

  assert.equal(getLocalizedText(entry, 'fr'), 'Français');
});