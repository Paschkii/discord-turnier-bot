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

const MESSAGES = {
  de: {
    missingName: '❌ Bitte wähle ein Bossmonster aus.',
    notFound: '❌ Dieses Bossmonster konnte nicht gefunden werden.',
    labels: {
      dungeon: 'Dungeon',
      baseStats: {
        level: 'Level',
        healthPoints: 'LP',
        actionPoints: 'AP',
        movementPoints: 'BP',
      },
      defenses: {
        apParry: 'AP-Resist',
        mpParry: 'BP-Resist',
        lock: 'Blocken',
        criticalResistance: 'Krit-Resist',
        pushbackResistance: 'Schubs-Resist',
      },
      flats: 'Flat-Resistenzen',
      percents: 'Resistenzen',
    },
  },
  en: {
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
  },
  fr: {
    missingName: '❌ Veuillez choisir un boss.',
    notFound: '❌ Ce boss est introuvable.',
    labels: {
      dungeon: 'Donjon',
      baseStats: {
        level: 'Niveau',
        healthPoints: 'PV',
        actionPoints: 'PA',
        movementPoints: 'PM',
      },
      defenses: {
        apParry: 'Parade PA',
        mpParry: 'Parade PM',
        lock: 'Tacle',
        criticalResistance: 'Résist. Critique',
        pushbackResistance: 'Résist. Poussée',
      },
      flats: 'Résistances fixes',
      percents: 'Résistances',
    },
  },
  es: {
    missingName: '❌ Selecciona un boss.',
    notFound: '❌ No se encontró este boss.',
    labels: {
      dungeon: 'Mazmorra',
      baseStats: {
        level: 'Nivel',
        healthPoints: 'PV',
        actionPoints: 'PA',
        movementPoints: 'PM',
      },
      defenses: {
        apParry: 'Parada PA',
        mpParry: 'Parada PM',
        lock: 'Placaje',
        criticalResistance: 'Resist. Crítica',
        pushbackResistance: 'Resist. Empuje',
      },
      flats: 'Resistencias fijas',
      percents: 'Resistencias',
    },
  },
  it: {
    missingName: '❌ Seleziona un boss.',
    notFound: '❌ Questo boss non è stato trovato.',
    labels: {
      dungeon: 'Dungeon',
      baseStats: {
        level: 'Livello',
        healthPoints: 'PF',
        actionPoints: 'PA',
        movementPoints: 'PM',
      },
      defenses: {
        apParry: 'Parata PA',
        mpParry: 'Parata PM',
        lock: 'Blocco',
        criticalResistance: 'Resist. Critica',
        pushbackResistance: 'Resist. Spinta',
      },
      flats: 'Resistenze fisse',
      percents: 'Resistenze',
    },
  },
  pt: {
    missingName: '❌ Escolha um boss.',
    notFound: '❌ Esse boss não foi encontrado.',
    labels: {
      dungeon: 'Masmorra',
      baseStats: {
        level: 'Nível',
        healthPoints: 'PV',
        actionPoints: 'PA',
        movementPoints: 'PM',
      },
      defenses: {
        apParry: 'Parada PA',
        mpParry: 'Parada PM',
        lock: 'Bloqueio',
        criticalResistance: 'Resist. Crítica',
        pushbackResistance: 'Resist. Empurrão',
      },
      flats: 'Resistências fixas',
      percents: 'Resistências',
    },
  },
};

function getMessages(locale) {
  return MESSAGES[locale] || MESSAGES.en || MESSAGES.de;
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

function formatLabelValue(label, value) {
  if (!label) {
    return formatNumber(value);
  }
  return `${label} ${formatNumber(value)}`;
}

function appendSeparator(label) {
  return label && label.endsWith(':') ? label : `${label}:`;
}

function formatLabeledStat(label, value, options = {}) {
  if (!label) {
    return formatNumber(value, options);
  }

  const prefix = appendSeparator(label);
  return `${prefix} ${formatNumber(value, options)}`;
}

function buildElementLine({
  resistances = {},
  elementLabels,
  elementEmojis,
  label,
  keySuffix = '',
  suffix = '',
}) {
  let hasValue = false;
  const parts = ELEMENT_KEYS.map((key) => {
    const valueKey = keySuffix ? `${key}_${keySuffix}` : key;
    const rawValue = resistances ? resistances[valueKey] : undefined;
    if (rawValue !== undefined && rawValue !== null && rawValue !== '') {
      hasValue = true;
    }
    const formatted = formatNumber(rawValue, { suffix });
    const emojiLabel = elementEmojis?.get(key);
    const elementLabel = emojiLabel || elementLabels.get(key) || capitalize(key);
    return `${elementLabel} ${formatted}`;
  });

  const valueText = hasValue ? parts.join(' ') : '—';
  if (!label) {
    return valueText;
  }

  const prefix = appendSeparator(label);
  return `${prefix} ${valueText}`;
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
    formatLabeledStat(EMOJI_LABELS.defenses.apParry, apParryValue),
    formatLabeledStat(EMOJI_LABELS.defenses.mpParry, mpParryValue),
    formatLabeledStat(
      EMOJI_LABELS.defenses.lock,
      coalesce(characteristics.lock, characteristics.block),
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
    ),
    formatLabeledStat(
      EMOJI_LABELS.defenses.pushbackResistance,
      coalesce(
        characteristics.pushbackResistance,
        characteristics.pushback_resistance,
        characteristics.pushback,
        characteristics.pushback_resist,
      ),
    ),
  ].join(' ');

  const flatLine = buildElementLine({
    resistances,
    elementLabels,
    elementEmojis: flatElementEmojis,
    label: labels.flats,
    keySuffix: 'flat',
  });

  const percentLine = buildElementLine({
    resistances,
    elementLabels,
    elementEmojis: percentElementEmojis,
    label: labels.percents,
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
  const homeDungeonIds = extractHomeDungeonIds(boss.homeDungeonID);
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