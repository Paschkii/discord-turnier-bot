// === Imports ===
const { EmbedBuilder, MessageFlags } = require('discord.js');
const {
  findBossById,
  findBossByName,
  getBossName,
} = require('../../utils/bosses');
const { findDungeonById, getDungeonName: getDungeonDisplayName } = require('../../utils/dungeons');
const { getLocalizedText, RESISTANCE_TYPES } = require('../../config/constants');
const { EMOJI_LIST } = require('../../config/constants/emojis');
const {
  resolveInteractionLocale,
  getInteractionLocaleHint,
} = require('../../utils/interactionLocale');
const { materializeGuildEmojiShortcodes } = require('../../helpers/emoji');
const { safeDeferReply } = require('../../helpers/interactions');
const languages = require('../../config/languages');

const DEFAULT_LOCALE = 'en';

const DEFAULT_MESSAGES =
  languages?.[DEFAULT_LOCALE]?.characteristics?.boss
  || languages?.de?.characteristics?.boss
  || {
    missingName: '❌ Please choose a boss monster.',
    notFound: '❌ This boss monster could not be found.',
    labels: {
      dungeon: 'Dungeon',
      homeDungeon: 'Home Dungeon',
      alternateDungeon: 'Alternate Dungeon',
      alsoIn: 'Also Found In',
      baseStats: {
        level: 'Level',
        healthPoints: 'HP',
        actionPoints: 'AP',
        movementPoints: 'MP',
      },
      defenses: {
        apParry: 'AP Parry',
        mpParry: 'MP Parry',
        lock: 'Lock',
        criticalResistance: 'Critical Resist',
        pushbackResistance: 'Pushback Resist',
      },
      flats: 'Flat Resistances',
      percents: 'Resistances',
      additionalResistances: 'Other Resistances',
    },
  };

function getMessages(locale) {
  const normalized = typeof locale === 'string' ? locale.toLowerCase() : DEFAULT_LOCALE;
  const base = normalized.includes('-') ? normalized.split('-')[0] : normalized;
  const pack = languages?.[normalized] || languages?.[base];
  const messages = pack?.characteristics?.boss;

  if (!messages) {
    return DEFAULT_MESSAGES;
  }

  return {
    ...DEFAULT_MESSAGES,
    ...messages,
  
    labels: {
      ...DEFAULT_MESSAGES.labels,
      ...messages.labels,
      baseStats: {
        ...DEFAULT_MESSAGES.labels.baseStats,
        ...(messages.labels?.baseStats || {}),
      },
      defenses: {
        ...DEFAULT_MESSAGES.labels.defenses,
        ...(messages.labels?.defenses || {}),
      },
    },
  };
}

const ELEMENT_KEYS = ['neutral', 'earth', 'fire', 'water', 'air'];

function toShortcode(emoji, fallback) {
  if (typeof emoji === 'string' && /^<a?:[a-zA-Z0-9_]+:\d+>$/.test(emoji.trim())) {
    const match = emoji.match(/^<a?:([a-zA-Z0-9_]+):\d+>$/);
    if (match) {
      return `:${match[1]}:`;
    }
  }
  return fallback || '';
}

const PRIMARY_EMOJIS = EMOJI_LIST?.primaryStats || {};
const SECONDARY_EMOJIS = EMOJI_LIST?.secondaryStats || {};
const RESISTANCE_EMOJIS = EMOJI_LIST?.resistanceStats || {};

// Figure space (U+2007) aligns numeric columns while remaining invisible in Discord embeds
const FIGURE_SPACE = '\u2007';

const EMOJI_LABELS = {
  baseStats: {
    level: PRIMARY_EMOJIS.level || ':level:',
    healthPoints: PRIMARY_EMOJIS.healthPoints || ':vitality:',
    actionPoints: PRIMARY_EMOJIS.actionPoints || ':ap:',
    movementPoints: PRIMARY_EMOJIS.movementPoints || ':mp:',
  },
  defenses: {
    apParry: SECONDARY_EMOJIS.apParry || ':apparry:',
    mpParry: SECONDARY_EMOJIS.mpParry || ':mpparry:',
    lock: SECONDARY_EMOJIS.lock || ':lock:',
    criticalResistance: RESISTANCE_EMOJIS.criticalResistance || ':criticalresistance:',
    pushbackResistance: RESISTANCE_EMOJIS.pushbackResistance || ':pushbackresistance:',
  },
  percentElements: new Map(
    ELEMENT_KEYS.map((key) => [
      key,
      RESISTANCE_EMOJIS[`${key}_percent`]
        || toShortcode(RESISTANCE_TYPES[key]?.emoji, `:${key}:`),
    ]),
  ),
  flatElements: new Map(
    ELEMENT_KEYS.map((key) => [
      key,
      RESISTANCE_EMOJIS[`${key}_fixed`]
        || RESISTANCE_EMOJIS[`${key}_percent`]
        || toShortcode(RESISTANCE_TYPES[key]?.emoji, `:${key}:`),
    ]),
  ),
};

function extractHomeDungeonIds(ref) {
  if (!ref) return [];
  if (Array.isArray(ref)) {
    return ref.flatMap((value) => extractHomeDungeonIds(value)).filter(Boolean);
  }
  if (typeof ref === 'object') {
    return Object.values(ref)
      .flatMap((value) => extractHomeDungeonIds(value))
      .filter(Boolean);
  }
  const text = String(ref).trim();
  return text ? [text] : [];
}

function extractAlsoInDungeonIds(ref) {
  if (!ref) return [];
  if (Array.isArray(ref)) {
    return ref.flatMap((value) => extractAlsoInDungeonIds(value)).filter(Boolean);
  }
  if (typeof ref === 'object') {
    const candidateKeys = [
      ref.dungeonBossID,
      ref.dungeonbossID,
      ref.dungeonId,
      ref.dungeonID,
      ref.id,
      ref.value,
    ];

    for (const candidate of candidateKeys) {
      if (candidate !== undefined && candidate !== null && candidate !== '') {
        return extractAlsoInDungeonIds(candidate);
      }
    }

    return Object.values(ref)
      .flatMap((value) => extractAlsoInDungeonIds(value))
      .filter(Boolean);
  }

  const text = String(ref).trim();
  return text ? [text] : [];
}

function mergeDeep(base = {}, overrides = {}) {
  const result = { ...base };

  if (!overrides || typeof overrides !== 'object') {
    return result;
  }

  for (const [key, value] of Object.entries(overrides)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const baseValue = base[key];
      const nestedBase = baseValue && typeof baseValue === 'object' && !Array.isArray(baseValue)
        ? baseValue
        : {};
      result[key] = mergeDeep(nestedBase, value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

function applyBossOverrides(boss, overrides) {
  if (!boss || typeof boss !== 'object') return boss;
  if (!overrides || typeof overrides !== 'object') return boss;

  const baseCharacteristics = boss.characteristics && typeof boss.characteristics === 'object'
    ? mergeDeep({}, boss.characteristics)
    : {};
  const baseResistances = boss.resistances && typeof boss.resistances === 'object'
    ? mergeDeep({}, boss.resistances)
    : {};

  const mergedCharacteristics = mergeDeep(baseCharacteristics, overrides.characteristics || {});
  const mergedResistances = mergeDeep(baseResistances, overrides.resistances || {});

  const defaultCharacteristicKeys = new Set([
    'level',
    'healthPoints',
    'actionPoints',
    'movementPoints',
    'apParry',
    'mpParry',
    'lock',
    'criticalResistance',
    'pushbackResistance',
  ]);

  for (const [key, value] of Object.entries(overrides)) {
    if (key === 'characteristics' || key === 'resistances') continue;

    const isResistanceKey = (key in baseResistances) || /_(percent|fixed)$/i.test(key);
    const isCharacteristicKey = (key in baseCharacteristics) || defaultCharacteristicKeys.has(key);

    if (isResistanceKey) {
      mergedResistances[key] = value;
    } else if (isCharacteristicKey || !(value && typeof value === 'object')) {
      mergedCharacteristics[key] = value;
    }
  }

  return {
    ...boss,
    characteristics: mergedCharacteristics,
    resistances: mergedResistances,
  };
}

function findAlsoInEntryByDungeonId(reference, targetId) {
  if (!reference || !targetId) return null;

  const stack = Array.isArray(reference) ? reference.slice() : [reference];

  while (stack.length) {
    const current = stack.shift();
    if (!current) continue;

    if (Array.isArray(current)) {
      stack.push(...current);
      continue;
    }

    if (typeof current === 'object') {
      const ids = extractAlsoInDungeonIds(current);
      if (ids.includes(targetId)) {
        return current;
      }

      for (const [key, value] of Object.entries(current)) {
        if (key === 'overrides') continue;
        stack.push(value);
      }
    }
  }

  return null;
}

function uniqueStrings(values = []) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    const text = String(value ?? '').trim();
    if (!text || seen.has(text)) continue;
    seen.add(text);
    result.push(text);
  }

  return result;
}

function resolveDungeonNames(ids, locale) {
  if (!Array.isArray(ids) || !ids.length) return [];
  const seen = new Set();
  const names = [];

  for (const rawId of ids) {
    const id = String(rawId || '').trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);

    const dungeon = findDungeonById(id);
    if (dungeon) {
      const name = getDungeonDisplayName(dungeon, locale);
      if (name) {
        names.push(name);
        continue;
      }
    }

    names.push(humanizeIdentifier(id));
  }

  return names;
}

function humanizeIdentifier(id) {
  return String(id || '')
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getElementLabels(locale) {
  const labels = new Map();
  for (const key of ELEMENT_KEYS) {
    const meta = RESISTANCE_TYPES[key];
    const localized = getLocalizedText(meta?.name, locale) || capitalize(key);
    labels.set(key, localized);
  }
  return labels;
}

function formatNumber(value, { suffix = '', showSign = false } = {}) {
  if (value === undefined || value === null || value === '') return '—';

  const numeric = Number(value);
  const isNumeric = typeof value === 'number' || (!Number.isNaN(numeric) && value !== true && value !== false);
  let result;

  if (isNumeric) {
    const numberValue = typeof value === 'number' ? value : numeric;
    const signPrefix = showSign && numberValue > 0 ? '+' : '';
    const baseValue = `${signPrefix}${numberValue}`;
    result = `${baseValue}`;
  } else {
    result = String(value);
  }

  return suffix ? `${result}${suffix}` : result;
}

function coalesce(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return undefined;
}

function isEmojiLabel(label) {
  if (typeof label !== 'string') {
    return false;
  }

  const trimmed = label.trim();
  if (!trimmed) {
    return false;
  }

  if (/^<a?:[a-zA-Z0-9_]+:\d+>$/.test(trimmed)) {
    return true;
  }

  if (/^:[^:\s]+:$/.test(trimmed)) {
    return true;
  }

  return /\p{Extended_Pictographic}/u.test(trimmed);
}

function getLabelValueSeparator(label) {
  return isEmojiLabel(label) ? '' : FIGURE_SPACE;
}

function formatLabelValue(label, value) {
  if (!label) {
    return formatNumber(value);
  }
  const formatted = formatNumber(value);
  return `${label}${getLabelValueSeparator(label)}${formatted}`;
}

function formatLabeledStat(label, value, options = {}) {
  if (!label) {
    return formatNumber(value, options);
  }

  const { includeSeparator = true, separator = ':', ...formatOptions } = options;
  const formattedValue = formatNumber(value, formatOptions);

  if (!includeSeparator || separator === null || separator === '') {
    return `${label}${getLabelValueSeparator(label)}${formattedValue}`;
  }

  const effectiveSeparator = typeof separator === 'string' ? separator : ':';
  const prefix = label.endsWith(effectiveSeparator) ? label : `${label}${effectiveSeparator}`;

  return `${prefix}${getLabelValueSeparator(prefix)}${formattedValue}`;
}

function collectElementValues({
  resistances = {},
  elementLabels,
  elementEmojis,
  keySuffix = '',
  keySuffixes,
  suffix = '',
}) {
  const suffixList = Array.isArray(keySuffixes) && keySuffixes.length
    ? keySuffixes.slice()
    : (keySuffix ? [keySuffix] : []);

  if (!suffixList.includes('')) {
    suffixList.push('');
  }

  return ELEMENT_KEYS.map((key) => {
    const candidateKeys = suffixList.map((suffixKey) => (
      suffixKey ? `${key}_${suffixKey}` : key
    ));

    let rawValue;
    for (const candidate of candidateKeys) {
      const candidateValue = resistances ? resistances[candidate] : undefined;
      if (candidateValue !== undefined && candidateValue !== null && candidateValue !== '') {
        rawValue = candidateValue;
        break;
      }
    }

    const formatted = formatNumber(rawValue, { suffix });
    if (formatted === '—') {
      return '';
    }

    const emojiLabel = elementEmojis?.get(key);
    const elementLabel = emojiLabel || elementLabels.get(key) || capitalize(key);
    return `${elementLabel}${getLabelValueSeparator(elementLabel)}${formatted}`;
  });
}

function buildDescription({ boss, dungeonLabel, dungeonNames, labels, level, locale }) {
  const characteristics = boss?.characteristics || {};
  const resistances = boss?.resistances || {};
  const elementLabels = getElementLabels(locale);
  const flatElementEmojis = EMOJI_LABELS.flatElements;
  const percentElementEmojis = EMOJI_LABELS.percentElements;

  const dungeonLines = dungeonNames.length
    ? dungeonNames.map((name) => `- ${name}`)
    : [];
  const dungeonText = dungeonLines.length ? dungeonLines.join('\n') : '—';
  const label = dungeonLabel || labels.dungeon;
  const line1 = `${label}:\n${dungeonText}`;

  const baseStatsLine = [
    formatLabelValue(EMOJI_LABELS.baseStats.level, level),
    formatLabelValue(
      EMOJI_LABELS.baseStats.healthPoints,
      coalesce(characteristics.healthPoints, characteristics.vitality),
    ),
    formatLabelValue(
      EMOJI_LABELS.baseStats.actionPoints,
      coalesce(characteristics.actionPoints, characteristics.ap),
    ),
    formatLabelValue(
      EMOJI_LABELS.baseStats.movementPoints,
      coalesce(characteristics.movementPoints, characteristics.mp),
    ),
  ].join(FIGURE_SPACE);

  const apParryValue = coalesce(
    characteristics.apParry,
    characteristics.ap_parry,
    characteristics.apResist,
    characteristics.ap_resist,
    characteristics.apResistance,
    characteristics.ap_resistance,
  );

  const mpParryValue = coalesce(
    characteristics.mpParry,
    characteristics.mp_parry,
    characteristics.mpResist,
    characteristics.mp_resist,
    characteristics.bpResist,
    characteristics.bp_resist,
    characteristics.mpResistance,
    characteristics.mp_resistance,
    characteristics.bpResistance,
    characteristics.bp_resistance,
  );

  const defenseStats = [
    { label: EMOJI_LABELS.defenses.apParry, value: apParryValue },
    { label: EMOJI_LABELS.defenses.mpParry, value: mpParryValue },
    {
      label: EMOJI_LABELS.defenses.lock,
      value: coalesce(characteristics.lock, characteristics.block),
    },
    {
      label: EMOJI_LABELS.defenses.criticalResistance,
      value: coalesce(
        characteristics.criticalResistance,
        characteristics.critical_resistance,
        characteristics.krit,
        characteristics.crit,
        characteristics.critical,
        characteristics.criticalHit,
      ),
    },
    {
      label: EMOJI_LABELS.defenses.pushbackResistance,
      value: coalesce(
        characteristics.pushbackResistance,
        characteristics.pushback_resistance,
        characteristics.pushback,
        characteristics.pushback_resist,
      ),
      },
  ];

  const formattedDefenses = defenseStats.map(({ label, value }) => (
    formatLabeledStat(label, value, { includeSeparator: false })
  ));

  const flatValues = collectElementValues({
    resistances,
    elementLabels,
    elementEmojis: flatElementEmojis,
    keySuffixes: ['fixed', 'flat'],
  });

  const percentValues = collectElementValues({
    resistances,
    elementLabels,
    elementEmojis: percentElementEmojis,
    keySuffixes: ['percent'],
    suffix: '%',
  });

  const combinedLines = ELEMENT_KEYS.map((_, index) => {
    const defense = formattedDefenses[index] || '';
    const percent = percentValues[index] || '';
    const flat = flatValues[index] || '';

    const parts = [defense, percent, flat].reduce((acc, part) => {
      if (typeof part !== 'string') {
        return acc;
      }

      const trimmed = part.trim();
      if (trimmed) {
        acc.push(part);
      }

      return acc;
    }, []);

    return parts.length ? parts.join('') : null;
  }).filter(Boolean);

  return {
    headerLines: [line1, baseStatsLine, ...combinedLines],
  };
}

// Antwort für /boss erzeugen
async function execute(interaction) {
  const rawValue = interaction.options.getString('name');
  const locationPreference = interaction.options.getString('location');
  const localeHint = getInteractionLocaleHint(interaction);
  const localePromise = resolveInteractionLocale(interaction).catch(() => localeHint || 'en');
  
  if (!rawValue) {
    const t = getMessages(localeHint);
    return interaction.reply({
      content: t.missingName,
      flags: MessageFlags.Ephemeral,
    });
  }

  const deferred = await safeDeferReply(interaction);
  if (!deferred) {
    return;
  }

  const resolvedLocale = await localePromise || 'en';
  const resolvedMessages = getMessages(resolvedLocale);
  const bossById = findBossById(rawValue);
  const boss = bossById || findBossByName(rawValue, resolvedLocale);

  if (!boss) {
    try {
      return await interaction.editReply({
        content: resolvedMessages.notFound,
      });
    } catch (error) {
      console.error('[slash] editReply failed:', error);
      return undefined;
    }
  }

  const { guild } = interaction;
  if (guild && typeof guild.emojis?.fetch === 'function') {
    try {
      const emojis = await guild.emojis.fetch();
      if (!emojis.size) {
        console.warn(`[emoji] Kein Emoji in Guild ${guild.id}`);
      } else {
        console.log('[emoji] Gefunden:', emojis.map((emoji) => emoji.name).join(', '));
      }
    } catch (error) {
      console.warn('[emoji] fetch() fehlgeschlagen:', error);
    }
  }

  const homeDungeonReference = coalesce(
    boss.homeDungeonID,
    boss.homeDungeonBossID,
    boss.homeDungeonId,
    boss.homeDungeon,
    boss.home_dungeon_id,
  );
  const homeDungeonIds = uniqueStrings(extractHomeDungeonIds(homeDungeonReference));
  const alternateDungeonIds = uniqueStrings(extractAlsoInDungeonIds(boss?.alsoIn));

  const homeDungeonNames = uniqueStrings(resolveDungeonNames(homeDungeonIds, resolvedLocale));
  const alternateDungeonNames = uniqueStrings(resolveDungeonNames(alternateDungeonIds, resolvedLocale));

  let useAlternate = false;
  if (alternateDungeonNames.length) {
    if (locationPreference === 'alternate') {
      useAlternate = true;
    } else if (!homeDungeonNames.length) {
      useAlternate = true;
    }
  }

  let dungeonNames = useAlternate ? alternateDungeonNames : homeDungeonNames;

  if (!dungeonNames.length && alternateDungeonNames.length) {
    dungeonNames = alternateDungeonNames;
    useAlternate = true;
  } else if (!dungeonNames.length && homeDungeonNames.length) {
    dungeonNames = homeDungeonNames;
    useAlternate = false;
  }

  if (!useAlternate && alternateDungeonNames.length) {
    dungeonNames = uniqueStrings([
      ...dungeonNames,
      ...alternateDungeonNames,
    ]);
  }

  const labels = resolvedMessages.labels;

  const dungeonLabel = useAlternate
    ? (labels.alternateDungeon || labels.dungeon)
    : (labels.homeDungeon || labels.dungeon);

  const activeDungeonIds = useAlternate ? alternateDungeonIds : homeDungeonIds;
  const activeDungeonId = activeDungeonIds.length ? activeDungeonIds[0] : null;

  let displayBoss = boss;
  if (useAlternate && activeDungeonId) {
    const alsoInEntry = findAlsoInEntryByDungeonId(boss?.alsoIn, activeDungeonId);
    if (alsoInEntry?.overrides) {
      displayBoss = applyBossOverrides(boss, alsoInEntry.overrides);
    }
  }

  const bossName = getBossName(displayBoss, resolvedLocale) || '—';
  const level = displayBoss.level != null ? String(displayBoss.level) : null;

  const descriptionParts = buildDescription({
    boss: displayBoss,
    dungeonLabel,
    dungeonNames,
    labels,
    level,
    locale: resolvedLocale,
  });

  const displayName = materializeGuildEmojiShortcodes(bossName, guild) || bossName;
  const headerLines = descriptionParts.headerLines || [];
  const rawDescription = headerLines.join('\n');
  const description = materializeGuildEmojiShortcodes(rawDescription, guild) || rawDescription;

  const embed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle(displayName)
    .setDescription(description)
    .setTimestamp();

  if (displayBoss.imageUrl) {
    embed.setThumbnail(displayBoss.imageUrl);
  } else if (displayBoss.icon) {
    embed.setThumbnail(displayBoss.icon);
  }
  
  try {
    return await interaction.editReply({
      embeds: [embed],
    });
  } catch (error) {
    console.error('[slash] editReply failed:', error);
    return undefined;
  }
}

module.exports = { execute };