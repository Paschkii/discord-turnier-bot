// === Boss Utilities ===
const {
  BOSSE_LISTE,
  CHARACTERISTIC_TYPES,
  FAMILY_LISTE,
  REGION_LISTE,
  RESISTANCE_TYPES,
  getLocalizedText,
  resolveLocaleKey,
} = require('../config/constants');
const { bossEmojis } = require('../config/constants/bossEmojis');

// Sucht den besten passenden Locale-Key ("de", "en" …)
function resolveLocale(inputLocale) {
  return resolveLocaleKey(inputLocale);
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

function tokenizeNormalized(str) {
  return String(str)
    .split(/[\s/|_,.-]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

// Holt einen lokalisierten Text (oder fällt auf andere Sprachen zurück)
function getLocalized(entry, locale = 'de') {
  return getLocalizedText(entry, locale);
}

function getBossIdentifier(boss) {
  if (!boss || typeof boss !== 'object') return '';
  return boss.bossID || boss.id || '';
}

function getBossEmoji(ref) {
  const identifier = (() => {
    if (!ref) return '';
    if (typeof ref === 'string') return ref;
    if (typeof ref === 'object') {
      return (
        ref.bossID
        || ref.id
        || ref.homeDungeonBossID
        || ref.home_dungeon_boss_id
        || ''
      );
    }
    return '';
  })();

  const normalized = String(identifier || '')
    .trim()
    .toLowerCase();

  if (!normalized) return '';

  return bossEmojis[normalized] || '';
}

// Lokalisierten Bossnamen ermitteln
function getBossName(boss, locale = 'de') {
  return getLocalized(boss?.name, locale) || '';
}

// Boss anhand ID (case-insensitive) finden
function findBossById(id) {
  if (!id) return null;
  const target = String(id).toLowerCase();
  return (
    BOSSE_LISTE.find((b) => String(getBossIdentifier(b)).toLowerCase() === target)
    || null
  );
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

// Hilfsfunktion um eine Emoji-ID aus einem Custom-Emoji-String zu extrahieren
function extractCustomEmojiId(raw = '') {
  const text = String(raw).trim();
  if (!text) return '';

  const directMatch = text.match(/^(?:<a?:\w{2,}:)?(\d+)>?$/);
  if (directMatch) return directMatch[1];

  const trailingDigits = text.match(/:([0-9]{5,})>?$/);
  if (trailingDigits) return trailingDigits[1];

  if (/^\d+$/.test(text)) return text;

  return '';
}

// Versucht das Emoji aus dem lokalen Server (Guild) zu holen.
// Fällt bei Bedarf auf die gespeicherte Emoji-Definition zurück.
function createInlineIcon(entry, guild) {
  if (!entry) return '';

  const guildEmojis = guild?.emojis?.cache;
  if (guildEmojis) {
    const emojiKey = entry.emojiName || entry.type;

    if (emojiKey) {
      const byId = guildEmojis.get(emojiKey);
      if (byId) return byId.toString();

      const byName = guildEmojis.find((emoji) => emoji.name === emojiKey);
      if (byName) return byName.toString();

      return `:${emojiKey}:`;
    }

    const fallbackId = extractCustomEmojiId(entry.emoji);
    if (fallbackId) {
      const byFallbackId = guildEmojis.get(fallbackId);
      if (byFallbackId) return byFallbackId.toString();
    }
  }

  if (entry.emojiName || entry.type) {
    const key = entry.emojiName || entry.type;
    return `:${key}:`;
  }
  
  return entry.emoji || '';
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
      emojiName: meta.emojiName || meta.emojiKey || null,
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
        emojiName: meta.emojiName || meta.emojiKey || null,
      };
    });
}

// Formatiert die Resistenz-Zeilen
function formatResistances(boss, locale = 'de', options = {}) {
  const { includeIcons = true, guild = null } = options;
  return getResistanceEntries(boss, locale).map((entry) => {
    const iconLink = includeIcons ? createInlineIcon(entry, guild) : '';
    const prefix = iconLink ? `${iconLink} ` : '';
    const label = iconLink ? entry.value : `${entry.label}: ${entry.value}`;
    return `${prefix}${label}`.trim();
  });
}

// Formatiert die Charakteristik-Zeilen
function formatCharacteristics(boss, locale = 'de', options = {}) {
  const { includeIcons = true, guild = null } = options;
  return getCharacteristicEntries(boss, locale).map((entry) => {
    const iconLink = includeIcons ? createInlineIcon(entry, guild) : '';
    const prefix = iconLink ? `${iconLink} ` : '';
    return `${prefix}${entry.label}: ${entry.value}`.trim();
  });
}

// Baut die Liste für Autocomplete (max. 25 Einträge)
function buildBossChoices(locale = 'de', query = '') {
  const loc = resolveLocale(locale);
  const normalizedQuery = normalize(query, loc);
  const tokens = tokenizeNormalized(normalizedQuery);

  const bosses = BOSSE_LISTE
    .map((boss) => {
      const name = getBossName(boss, loc);
      const normalizedName = normalize(name, loc);
      const identifier = getBossIdentifier(boss);
      return {
        id: identifier,
        name,
        normalizedName,
        nameWords: tokenizeNormalized(normalizedName),
      };
    })
    .filter((b) => b.id && b.name)
    .sort((a, b) => a.name.localeCompare(b.name, loc, { sensitivity: 'base' }));

  if (!tokens.length) {
    return bosses.slice(0, 25).map((b) => ({ name: b.name, value: String(b.id) }));
  }

  const computeMatchScore = (entry) => {
    const searchTargets = [
      { str: entry.normalizedName, weight: 0 },
      ...entry.nameWords.map((word) => ({ str: word, weight: 1 })),
    ];

    let total = 0;

    for (const token of tokens) {
      let best = Number.POSITIVE_INFINITY;

      for (const target of searchTargets) {
        const text = target.str;
        if (!text) continue;

        if (text.startsWith(token)) {
          if (target.weight < best) best = target.weight;
          continue;
        }

        if (text.includes(token)) {
          const score = target.weight + 5;
          if (score < best) best = score;
        }
      }

      if (!Number.isFinite(best)) {
        return null;
      }

      total += best;
    }

    return total;
  };

  const matched = bosses
    .map((entry) => ({ ...entry, score: computeMatchScore(entry) }))
    .filter((entry) => entry.score !== null)
    .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name, loc, { sensitivity: 'base' }));


  return matched.slice(0, 25).map((b) => ({ name: b.name, value: String(b.id) }));
}

module.exports = {
  buildBossChoices,
  findBossById,
  findBossByName,
  formatCharacteristics,
  formatResistances,
  getCharacteristicEntries,
  getBossEmoji,
  getBossName,
  getFamilyName,
  getRegionName,
  getResistanceEntries,
  resolveLocale,
};