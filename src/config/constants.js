const {
  getLocalizedText,
  ICON_BASE,
  SUPPORTED_LOCALES,
  resolveDiscordEmoji,
  resolveLocaleKey,
} = require('./constants/shared');
const { ALLOWED_KO_SIZES } = require('./constants/tournament');
const { arenaData } = require('./constants/arena');
const { BOSSE_LISTE } = require('./constants/bosses');
const { CHARACTERISTIC_TYPES } = require('./constants/characteristics');
const { DUNGEON_LISTE, DUNGEON_KATEGORIEN } = require('./constants/dungeons');
const { FAMILY_LISTE } = require('./constants/families');
const { HELP_COMMANDS } = require('./constants/helpCommands');
const { KLASSE_LISTE } = require('./constants/classes');
const { PHASE_LABEL } = require('./constants/phases');
const { REGION_LISTE } = require('./constants/regions');
const { RESISTANCE_TYPES } = require('./constants/resistances');

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