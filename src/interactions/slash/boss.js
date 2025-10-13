// === Imports ===
const { EmbedBuilder, MessageFlags } = require('discord.js');
const {
  findBossById,
  findBossByName,
  getBossName,
} = require('../../utils/bosses');
const { findDungeonById, getDungeonName: getDungeonDisplayName } = require('../../utils/dungeons');
const { getLocalizedText, RESISTANCE_TYPES } = require('../../config/constants');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

const MESSAGES = {
  de: {
    missingName: '❌ Bitte wähle ein Bossmonster aus.',
    notFound: '❌ Dieses Bossmonster konnte nicht gefunden werden.',
    labels: {
      dungeon: 'Dungeon',
      baseStats: {
        level: 'Level',
        vitality: 'LP',
        actionPoints: 'AP',
        movementPoints: 'BP',
      },
      defenses: {
        apResist: 'AP-Resist',
        bpResist: 'BP-Resist',
        block: 'Block',
        crit: 'Krit',
        pushback: 'Rückstoß',
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
        vitality: 'HP',
        actionPoints: 'AP',
        movementPoints: 'MP',
      },
      defenses: {
        apResist: 'AP Resistance',
        bpResist: 'MP Resistance',
        block: 'Block',
        crit: 'Crit',
        pushback: 'Pushback',
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
        vitality: 'PV',
        actionPoints: 'PA',
        movementPoints: 'PM',
      },
      defenses: {
        apResist: 'Résistance PA',
        bpResist: 'Résistance PM',
        block: 'Blocage',
        crit: 'Critique',
        pushback: 'Poussée',
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
        vitality: 'PV',
        actionPoints: 'PA',
        movementPoints: 'PM',
      },
      defenses: {
        apResist: 'Resistencia PA',
        bpResist: 'Resistencia PM',
        block: 'Placaje',
        crit: 'Crítico',
        pushback: 'Empuje',
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
        vitality: 'PF',
        actionPoints: 'PA',
        movementPoints: 'PM',
      },
      defenses: {
        apResist: 'Resistenza PA',
        bpResist: 'Resistenza PM',
        block: 'Blocco',
        crit: 'Critico',
        pushback: 'Spinta',
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
        vitality: 'PV',
        actionPoints: 'PA',
        movementPoints: 'PM',
      },
      defenses: {
        apResist: 'Resistência PA',
        bpResist: 'Resistência PM',
        block: 'Bloqueio',
        crit: 'Crítico',
        pushback: 'Empurrão',
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

const EMOJI_LABELS = {
  baseStats: {
    vitality: ':vitality:',
    actionPoints: ':AP:',
    movementPoints: ':MP:',
  },
  defenses: {
    apResist: ':AP-Resist:',
    bpResist: ':BP-Resist:',
    block: ':Block:',
    crit: ':Krit:',
    pushback: ':Rückstoß:',
  },
  elements: {
    neutral: ':neutral:',
    earth: ':strength:',
    fire: ':intelligence:',
    water: ':chance:',
    air: ':agility:',
  },
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

function formatLabelValue(label, value) {
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

  const valueText = hasValue ? parts.join(' • ') : '—';
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
  const elementEmojis = new Map(Object.entries(EMOJI_LABELS.elements));

  const dungeonText = dungeonNames.length ? dungeonNames.join(' • ') : '—';
  const line1 = `**${labels.dungeon}:** ${dungeonText}`;

  const baseStatsLine = [
    formatLabelValue(labels.baseStats.level, level),
    formatLabelValue(EMOJI_LABELS.baseStats.vitality, characteristics.vitality),
    formatLabelValue(EMOJI_LABELS.baseStats.actionPoints, characteristics.actionPoints),
    formatLabelValue(EMOJI_LABELS.baseStats.movementPoints, characteristics.movementPoints),
  ].join(' • ');

  const defensesLine = [
    formatLabeledStat(EMOJI_LABELS.defenses.apResist, characteristics.ap_resist, { suffix: '%' }),
    formatLabeledStat(
      EMOJI_LABELS.defenses.bpResist,
      characteristics.mp_resist ?? characteristics.bp_resist,
      { suffix: '%' },
    ),
    formatLabeledStat(EMOJI_LABELS.defenses.block, characteristics.block),
    formatLabeledStat(
      EMOJI_LABELS.defenses.crit,
      characteristics.krit ?? characteristics.crit ?? characteristics.critical ?? characteristics.criticalHit,
      { suffix: '%' },
    ),
    formatLabeledStat(
      EMOJI_LABELS.defenses.pushback,
      characteristics.pushback ?? characteristics.pushback_resist,
      { suffix: '%' },
    ),
  ].join(' • ');

  const flatLine = buildElementLine({
    resistances,
    elementLabels,
    elementEmojis,
    keySuffix: 'flat',
  });

  const percentLine = buildElementLine({
    resistances,
    elementLabels,
    elementEmojis,
    suffix: '%',
  });

  return [line1, baseStatsLine, defensesLine, flatLine, percentLine];
}

// Antwort für /boss erzeugen
async function execute(interaction) {
  const rawValue = interaction.options.getString('name');
  const localePromise = resolveInteractionLocale(interaction);
  let locale;

  const resolveLocale = async () => {
    if (locale) return locale;
    try {
      locale = await localePromise;
    } catch (error) {
      locale = 'en';
    }
    return locale;
  };

  const getMessagesForLocale = async () => getMessages(await resolveLocale());

  if (!rawValue) {
    const t = await getMessagesForLocale();
    return interaction.reply({
      content: t.missingName,
      flags: MessageFlags.Ephemeral,
    });
  }

  const bossById = findBossById(rawValue);

  await interaction.deferReply();

  const resolvedLocale = await resolveLocale();
  const resolvedMessages = getMessages(resolvedLocale);
  const boss = bossById || findBossByName(rawValue, resolvedLocale);

  if (!boss) {
    return interaction.editReply({
      content: resolvedMessages.notFound,
    });
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

  const embed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle(bossName)
    .setDescription(descriptionLines.join('\n'))
    .setTimestamp();

  if (boss.imageUrl) {
    embed.setThumbnail(boss.imageUrl);
  } else if (boss.icon) {
    embed.setThumbnail(boss.icon);
  }

  return interaction.editReply({
    embeds: [embed],
  });
}

module.exports = { execute };