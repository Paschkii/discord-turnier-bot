// === Dungeon Utilities ===
// === Imports ===
const {
  DUNGEON_LISTE,
  getLocalizedText,
  resolveLocaleKey,
} = require('../config/constants');
const { findBossById, getBossName } = require('./bosses');

function resolveLocale(locale) {
  return resolveLocaleKey(locale);
}

function normalize(str, locale = 'de') {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/ß/g, 'ss')
    .toLocaleLowerCase(locale === 'de' ? 'de-DE' : locale);
}

function getDungeonName(dungeon, locale = 'de') {
  return getLocalizedText(dungeon?.dungeonname, locale) || '';
}

function flattenBossIds(ref) {
  if (!ref) return [];
  if (Array.isArray(ref)) {
    return ref.flatMap((item) => flattenBossIds(item)).filter(Boolean);
  }
  if (typeof ref === 'object') {
    return Object.values(ref)
      .flatMap((item) => flattenBossIds(item))
      .filter(Boolean);
  }
  return [String(ref)];
}

function unique(values) {
  return Array.from(new Set(values));
}

function humanizeIdentifier(id) {
  return String(id || '')
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getDungeonBossEntries(dungeon) {
  const ids = unique(flattenBossIds(dungeon?.bossid));
  return ids.map((id) => ({ id, boss: findBossById(id) }));
}

function getDungeonBossNames(dungeon, locale = 'de') {
  const loc = resolveLocale(locale);
  return getDungeonBossEntries(dungeon)
    .map(({ id, boss }) => getBossName(boss, loc) || humanizeIdentifier(id))
    .filter(Boolean);
}

function findDungeonById(id) {
  if (!id) return null;
  const target = String(id).toLowerCase();
  return DUNGEON_LISTE.find((d) => String(d.dungeonID).toLowerCase() === target) || null;
}

function findDungeonByName(name, locale = 'de') {
  if (!name) return null;
  const loc = resolveLocale(locale);
  const target = normalize(name, loc);
  return (
    DUNGEON_LISTE.find((dungeon) => normalize(getDungeonName(dungeon, loc), loc) === target) || null
  );
}

function resolveChallengeText(entry, locale = 'de', params = {}) {
  if (!entry) return '';
  if (typeof entry === 'function') {
    return entry(params) || '';
  }
  if (typeof entry === 'object') {
    const loc = resolveLocale(locale);
    const orderedKeys = [loc, 'de', 'en', 'fr', 'es', 'it', 'pt'];
    for (const key of orderedKeys) {
      const value = entry[key];
      if (value === undefined || value === null || value === '') continue;
      if (typeof value === 'function') return value(params) || '';
      return String(value);
    }
    for (const value of Object.values(entry)) {
      if (value === undefined || value === null || value === '') continue;
      if (typeof value === 'function') return value(params) || '';
      return String(value);
    }
    return '';
  }
  return String(entry);
}

function formatDungeonChallenges(dungeon, locale = 'de', options = {}) {
  const { includeDescriptions = true } = options;
  const loc = resolveLocale(locale);
  const challenges = Array.isArray(dungeon?.challenges) ? dungeon.challenges : [];

  return challenges
    .map((challenge) => {
      const name = getLocalizedText(challenge?.name, loc) || challenge?.raw || challenge?.id;
      const description = includeDescriptions
        ? resolveChallengeText(challenge?.description, loc, challenge?.params)
        : '';
      if (description) {
        return `• ${name} — ${description}`;
      }
      return `• ${name}`;
    })
    .filter(Boolean);
}

function buildDungeonChoices(locale = 'de', query = '') {
  const loc = resolveLocale(locale);
  const normalizedQuery = normalize(query, loc);

  const dungeons = DUNGEON_LISTE
    .map((dungeon) => ({
      id: dungeon.dungeonID,
      name: getDungeonName(dungeon, loc),
    }))
    .filter((d) => d.id && d.name)
    .sort((a, b) => a.name.localeCompare(b.name, loc, { sensitivity: 'base' }));

  const filtered = normalizedQuery
    ? dungeons.filter((d) => normalize(d.name, loc).startsWith(normalizedQuery))
    : dungeons;

  return filtered.slice(0, 25).map((d) => ({ name: d.name, value: String(d.id) }));
}

// === Exports ===
module.exports = {
  buildDungeonChoices,
  findDungeonById,
  findDungeonByName,
  formatDungeonChallenges,
  getDungeonBossEntries,
  getDungeonBossNames,
  getDungeonName,
};