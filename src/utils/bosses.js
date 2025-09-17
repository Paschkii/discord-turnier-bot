// === Boss Utilities ===
const {
  BOSSE_LISTE,
  CHARACTERISTIC_TYPES,
  FAMILY_LISTE,
  REGION_LISTE,
  RESISTANCE_TYPES,
} = require('../config/constants');

const SUPPORTED_LOCALES = ['de', 'en', 'fr', 'es'];

// Sucht den besten passenden Locale-Key ("de", "en" …)
function resolveLocale(inputLocale) {
  const raw = typeof inputLocale === 'string' ? inputLocale.toLowerCase() : '';
  if (!raw) return 'de';
  for (const loc of SUPPORTED_LOCALES) {
    if (raw === loc || raw.startsWith(`${loc}-`)) return loc;
  }
  return 'de';
}

// Normalisiert Strings für Such-/Vergleichszwecke (ohne Akzente, Kleinbuchstaben)
function normalize(str, locale = 'de') {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/ß/g, 'ss')
    .toLocaleLowerCase(locale === 'de' ? 'de-DE' : locale);
}

// Holt einen lokalisierten Text (oder fällt auf andere Sprachen zurück)
function getLocalized(entry, locale = 'de') {
  if (!entry) return '';
  if (typeof entry === 'string') return entry;
  if (typeof entry === 'object') {
    const loc = resolveLocale(locale);
    return (
      entry[loc] ||
      entry.de ||
      entry.en ||
      entry.fr ||
      entry.es ||
      Object.values(entry).find(Boolean) ||
      ''
    );
  }
  return '';
}

// Lokalisierten Bossnamen ermitteln
function getBossName(boss, locale = 'de') {
  return getLocalized(boss?.name, locale) || '';
}

// Boss anhand ID (case-insensitive) finden
function findBossById(id) {
  if (!id) return null;
  const target = String(id).toLowerCase();
  return BOSSE_LISTE.find((b) => String(b.id).toLowerCase() === target) || null;
}

// Boss anhand Namen (lokalisiert) finden
function findBossByName(name, locale = 'de') {
  if (!name) return null;
  const target = normalize(name, locale);
  return (
    BOSSE_LISTE.find((boss) => normalize(getBossName(boss, locale), locale) === target) || null
  );
}

// Region anhand ID lokalisieren
function getRegionName(regionId, locale = 'de') {
  if (!regionId) return '';
  const entry = REGION_LISTE.find((r) => r.id === regionId);
  return getLocalized(entry?.name, locale);
}

// Familie anhand ID lokalisieren
function getFamilyName(familyId, locale = 'de') {
  if (!familyId) return '';
  const entry = Array.isArray(FAMILY_LISTE)
    ? FAMILY_LISTE.find((f) => f.id === familyId)
    : null;
  return getLocalized(entry?.name, locale);
}

// Nur Emojis zurückgeben (Custom-Emoji oder Unicode).
// Keine URL-Links mehr, weil Discord die in Feldern nicht als Bild rendert.
function createInlineIcon(meta) {
  if (!meta) return '';
  return meta.emoji || '';
}

function getCharacteristicEntries(boss, locale = 'de') {
  const data = boss?.characteristics;
  if (!data || typeof data !== 'object') return [];
  const loc = resolveLocale(locale);
  const order = ['vitality', 'actionPoints', 'movementPoints'];
  const handled = new Set();

  const buildEntry = (type, value) => {
    const meta = CHARACTERISTIC_TYPES[type] || {};
    const label = getLocalized(meta.name, loc) || type;
    return {
      type,
      label,
      value: String(value),
      icon: meta.icon,
      emoji: meta.emoji,
    };
  };

  const entries = [];
  for (const key of order) {
    if (data[key] !== undefined && data[key] !== null) {
      entries.push(buildEntry(key, data[key]));
      handled.add(key);
    }
  }

  for (const [type, value] of Object.entries(data)) {
    if (handled.has(type) || value === undefined || value === null) continue;
    entries.push(buildEntry(type, value));
  }

  return entries;
}

function getResistanceEntries(boss, locale = 'de') {
  const data = boss?.resistances;
  if (!data || typeof data !== 'object') return [];
  const loc = resolveLocale(locale);

  return Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([type, value]) => {
      const meta = RESISTANCE_TYPES[type] || {};
      const label = getLocalized(meta.name, loc) || type;
      const display = typeof value === 'number' ? `${value}%` : String(value);
      return {
        type,
        label,
        value: display,
        icon: meta.icon,
        emoji: meta.emoji,
      };
    });
}

// Formatiert die Resistenz-Zeilen
function formatResistances(boss, locale = 'de', options = {}) {
  const { includeIcons = true } = options;
  return getResistanceEntries(boss, locale).map((entry) => {
    const iconLink = includeIcons ? createInlineIcon(entry) : '';
    const prefix = iconLink ? `${iconLink} ` : '';
    return `${prefix}${entry.label}: ${entry.value}`.trim();
  });
}

// Formatiert die Charakteristik-Zeilen
function formatCharacteristics(boss, locale = 'de', options = {}) {
  const { includeIcons = true } = options;
  return getCharacteristicEntries(boss, locale).map((entry) => {
    const iconLink = includeIcons ? createInlineIcon(entry) : '';
    const prefix = iconLink ? `${iconLink} ` : '';
    return `${prefix}${entry.label}: ${entry.value}`.trim();
  });
}

// Baut die Liste für Autocomplete (max. 25 Einträge)
function buildBossChoices(locale = 'de', query = '') {
  const loc = resolveLocale(locale);
  const normalizedQuery = normalize(query, loc);
  const bosses = BOSSE_LISTE
    .map((boss) => ({
      id: boss.id,
      name: getBossName(boss, loc),
    }))
    .filter((b) => b.id && b.name)
    .sort((a, b) => a.name.localeCompare(b.name, loc, { sensitivity: 'base' }));

  const filtered = normalizedQuery
    ? bosses.filter((b) => normalize(b.name, loc).startsWith(normalizedQuery))
    : bosses;

  return filtered.slice(0, 25).map((b) => ({ name: b.name, value: String(b.id) }));
}

module.exports = {
  buildBossChoices,
  findBossById,
  findBossByName,
  formatCharacteristics,
  formatResistances,
  getCharacteristicEntries,
  getBossName,
  getFamilyName,
  getRegionName,
  getResistanceEntries,
  resolveLocale,
};