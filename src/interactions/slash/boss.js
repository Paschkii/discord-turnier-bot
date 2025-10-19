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
    .join(' ');
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
    result = `${signPrefix}${numberValue}`;
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
  return isEmojiLabel(label) ? '' : ' ';
}

function formatLabelValue(label, value) {
  if (!label) {
    return formatNumber(value);
  }
  const formatted = formatNumber(value);
  return `${label}${getLabelValueSeparator(label)}${formatted}`;
}

function appendSeparator(label) {
  return label && label.endsWith(':') ? label : `${label}:`;
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

function buildElementLine({
  resistances = {},
  elementLabels,
  elementEmojis,
  label,
  keySuffix = '',
  keySuffixes,
  suffix = '',
}) {
  let hasValue = false;
  const suffixList = Array.isArray(keySuffixes) && keySuffixes.length
    ? keySuffixes.slice()
    : (keySuffix ? [keySuffix] : []);

  if (!suffixList.includes('')) {
    suffixList.push('');
  }

  const parts = ELEMENT_KEYS.map((key) => {
    const candidateKeys = suffixList.map((suffixKey) => (
      suffixKey ? `${key}_${suffixKey}` : key
    ));

    let rawValue;
    for (const candidate of candidateKeys) {
      const candidateValue = resistances ? resistances[candidate] : undefined;
      if (candidateValue !== undefined && candidateValue !== null && candidateValue !== '') {
        rawValue = candidateValue;
        hasValue = true;
        break;
      }
    }

    const formatted = formatNumber(rawValue, { suffix });
    const emojiLabel = elementEmojis?.get(key);
    const elementLabel = emojiLabel || elementLabels.get(key) || capitalize(key);
    return `${elementLabel}${getLabelValueSeparator(elementLabel)}${formatted}`;
  });

  const valueText = hasValue ? parts.join(' ') : '—';
  if (!label) {
    return valueText;
  }

  const prefix = appendSeparator(label);
  return `${prefix}${getLabelValueSeparator(prefix)}${valueText}`;
}

function buildDescription({ boss, dungeonNames, labels, level, locale }) {
  const characteristics = boss?.characteristics || {};
  const resistances = boss?.resistances || {};
  const elementLabels = getElementLabels(locale);
  const flatElementEmojis = EMOJI_LABELS.flatElements;
  const percentElementEmojis = EMOJI_LABELS.percentElements;

  const dungeonText = dungeonNames.length ? dungeonNames.join(' ') : '—';
  const line1 = `**${labels.dungeon}:** ${dungeonText}`;

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
  ].join(' ');

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

  const defensesLine = [
    formatLabeledStat(EMOJI_LABELS.defenses.apParry, apParryValue, { includeSeparator: false }),
    formatLabeledStat(EMOJI_LABELS.defenses.mpParry, mpParryValue, { includeSeparator: false }),
    formatLabeledStat(
      EMOJI_LABELS.defenses.lock,
      coalesce(characteristics.lock, characteristics.block),
      { includeSeparator: false },
    ),
    formatLabeledStat(
      EMOJI_LABELS.defenses.criticalResistance,
      coalesce(
        characteristics.criticalResistance,
        characteristics.critical_resistance,
        characteristics.krit,
        characteristics.crit,
        characteristics.critical,
        characteristics.criticalHit,
      ),
      { includeSeparator: false },
    ),
    formatLabeledStat(
      EMOJI_LABELS.defenses.pushbackResistance,
      coalesce(
        characteristics.pushbackResistance,
        characteristics.pushback_resistance,
        characteristics.pushback,
        characteristics.pushback_resist,
      ),
      { includeSeparator: false },
    ),
  ].join(' ');

  const flatLine = buildElementLine({
    resistances,
    elementLabels,
    elementEmojis: flatElementEmojis,
    label: null,
    keySuffixes: ['fixed', 'flat'],
  });

  const percentLine = buildElementLine({
    resistances,
    elementLabels,
    elementEmojis: percentElementEmojis,
    label: null,
    keySuffixes: ['percent'],
    suffix: '%',
  });

  return [line1, baseStatsLine, defensesLine, flatLine, percentLine];
}

// Antwort für /boss erzeugen
async function execute(interaction) {
  const rawValue = interaction.options.getString('name');
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

  const bossName = getBossName(boss, resolvedLocale) || '—';
  const level = boss.level != null ? String(boss.level) : null;
  const homeDungeonReference = coalesce(
    boss.homeDungeonID,
    boss.homeDungeonBossID,
    boss.homeDungeonId,
    boss.homeDungeon,
    boss.home_dungeon_id,
  );
  const homeDungeonIds = extractHomeDungeonIds(homeDungeonReference);
  const dungeonNames = resolveDungeonNames(homeDungeonIds, resolvedLocale);
  const labels = resolvedMessages.labels;

  const descriptionLines = buildDescription({
    boss,
    dungeonNames,
    labels,
    level,
    locale: resolvedLocale,
  });

  const displayName = materializeGuildEmojiShortcodes(bossName, guild) || bossName;
  const rawDescription = descriptionLines.join('\n');
  const description = materializeGuildEmojiShortcodes(rawDescription, guild) || rawDescription;

  const embed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle(displayName)
    .setDescription(description)
    .setTimestamp();

  if (boss.imageUrl) {
    embed.setThumbnail(boss.imageUrl);
  } else if (boss.icon) {
    embed.setThumbnail(boss.icon);
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