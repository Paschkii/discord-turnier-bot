const spellTexts = require('../../languages/spells');
const { getLocalizedText } = require('../shared');

function withSpellLocalization(classId, spellId, rawSpell) {
  const nameMap = {};
  const descriptionMap = {};
  const localizedEffects = (rawSpell.effects || []).map((effect) => ({
    ...effect,
    descriptionLocalized: {},
  }));

  for (const [locale, classes] of Object.entries(spellTexts)) {
    const entry = classes[classId]?.[spellId];
    if (!entry) continue;

    if (entry.name) nameMap[locale] = entry.name;
    if (entry.description) descriptionMap[locale] = entry.description;

    if (entry.effects) {
      for (const effect of localizedEffects) {
        const text = entry.effects?.[effect.trigger];
        if (text) {
          effect.descriptionLocalized[locale] = text;
          effect.description = effect.description || text;
        }
      }
    }
  }

  return {
    ...rawSpell,
    effects: localizedEffects,
    name: rawSpell.name || getLocalizedText(nameMap, 'en'),
    nameLocalized: Object.keys(nameMap).length ? nameMap : undefined,
    description: rawSpell.description || getLocalizedText(descriptionMap, 'en'),
    descriptionLocalized: Object.keys(descriptionMap).length ? descriptionMap : undefined,
  };
}

module.exports = { withSpellLocalization };