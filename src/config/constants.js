const {
  ICON_BASE,
  SUPPORTED_LOCALES,
  getLocalizedText,
  resolveDiscordEmoji,
  resolveLocaleKey,
} = require('./constants/shared');
const { KLASSE_LISTE } = require('./constants/classes');
const { REGION_LISTE } = require('./constants/regions');
const { FAMILY_LISTE } = require('./constants/families');
const { RESISTANCE_TYPES } = require('./constants/resistances');
const { CHARACTERISTIC_TYPES } = require('./constants/characteristics');
const { BOSSE_LISTE } = require('./constants/bosses');
const { DUNGEON_LISTE, DUNGEON_KATEGORIEN } = require('./constants/dungeons');
const { HELP_COMMANDS } = require('./constants/helpCommands');
const { arenaData } = require('./constants/arena');
const { ALLOWED_KO_SIZES } = require('./constants/tournament');
const { PHASE_LABEL } = require('./constants/phases');

function getPhaseLabel(phase, locale = 'de') {
  const entry = PHASE_LABEL[phase];
  if (!entry) return '';
  return getLocalizedText(entry, locale) || phase;
}

module.exports = {
  ALLOWED_KO_SIZES,
  arenaData,
  BOSSE_LISTE,
  CHARACTERISTIC_TYPES,
  DUNGEON_KATEGORIEN,
  DUNGEON_LISTE,
  FAMILY_LISTE,
  getLocalizedText,
  getPhaseLabel,
  HELP_COMMANDS,
  ICON_BASE,
  KLASSE_LISTE,
  SUPPORTED_LOCALES,
  PHASE_LABEL,
  REGION_LISTE,
  RESISTANCE_TYPES,
  resolveDiscordEmoji,
  resolveLocaleKey,
};