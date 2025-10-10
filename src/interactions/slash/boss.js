// === Imports ===
const { EmbedBuilder, MessageFlags } = require('discord.js');
const {
  findBossById,
  findBossByName,
  formatCharacteristics,
  formatResistances,
  getBossName,
  getFamilyName,
  getRegionName,
} = require('../../utils/bosses');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

const MESSAGES = {
  de: {
    missingName: '❌ Bitte wähle ein Bossmonster aus.',
    notFound: '❌ Dieses Bossmonster konnte nicht gefunden werden.',
    description: {
      level: 'Level',
      region: 'Region',
      family: 'Familie',
    },
    fields: {
      characteristics: 'Charakteristiken',
      resistances: 'Resistenzen',
    },
  },
  en: {
    missingName: '❌ Please choose a boss monster.',
    notFound: '❌ This boss monster could not be found.',
    description: {
      level: 'Level',
      region: 'Region',
      family: 'Family',
    },
    fields: {
      characteristics: 'Characteristics',
      resistances: 'Resistances',
    },
  },
  fr: {
    missingName: '❌ Veuillez choisir un boss.',
    notFound: '❌ Ce boss est introuvable.',
    description: {
      level: 'Niveau',
      region: 'Région',
      family: 'Famille',
    },
    fields: {
      characteristics: 'Caractéristiques',
      resistances: 'Résistances',
    },
  },
  es: {
    missingName: '❌ Selecciona un boss.',
    notFound: '❌ No se encontró este boss.',
    description: {
      level: 'Nivel',
      region: 'Región',
      family: 'Familia',
    },
    fields: {
      characteristics: 'Características',
      resistances: 'Resistencias',
    },
  },
  it: {
    missingName: '❌ Seleziona un boss.',
    notFound: '❌ Questo boss non è stato trovato.',
    description: {
      level: 'Livello',
      region: 'Regione',
      family: 'Famiglia',
    },
    fields: {
      characteristics: 'Caratteristiche',
      resistances: 'Resistenze',
    },
  },
  pt: {
    missingName: '❌ Escolha um boss.',
    notFound: '❌ Esse boss não foi encontrado.',
    description: {
      level: 'Nível',
      region: 'Região',
      family: 'Família',
    },
    fields: {
      characteristics: 'Características',
      resistances: 'Resistências',
    },
  },
};

function getMessages(locale) {
  return MESSAGES[locale] || MESSAGES.en || MESSAGES.de;
}

function getCodePointLength(text = '') {
  return Array.from(text ?? '').length;
}

function padToWidth(text, width) {
  const normalized = text ?? '';
  const length = getCodePointLength(normalized);
  if (length >= width) return normalized;
  return `${normalized}${' '.repeat(width - length)}`;
}

function buildTwoColumnTable(leftTitle, leftValues, rightTitle, rightValues) {
  const leftColumn = [
    leftTitle || '',
    ...(leftValues && leftValues.length ? leftValues : ['—']),
  ];
  const rightColumn = [
    rightTitle || '',
    ...(rightValues && rightValues.length ? rightValues : ['—']),
  ];

  const rows = Math.max(leftColumn.length, rightColumn.length);
  const leftWidth = Math.max(...leftColumn.map(getCodePointLength));
  const paddedLeft = leftColumn.map((value) => padToWidth(value, leftWidth));

  const lines = [];
  for (let i = 0; i < rows; i += 1) {
    const leftCell = paddedLeft[i] ?? padToWidth('', leftWidth);
    const rightRaw = rightColumn[i];
    const rightCell =
      rightRaw ?? (i === 0 ? '' : '—');
    const line = `${leftCell}   ${rightCell || (i === 0 ? '' : '—')}`.trimEnd();
    lines.push(line);
  }

  return ['```md', ...lines, '```'].join('\n');
}

// Antwort für /boss erzeugen
async function execute(interaction) {
  const rawValue = interaction.options.getString('name');
  const locale = await resolveInteractionLocale(interaction);
  const t = getMessages(locale);

  if (!rawValue) {
    return interaction.reply({
      content: t.missingName,
      flags: MessageFlags.Ephemeral,
    });
  }

  const boss = findBossById(rawValue) || findBossByName(rawValue, locale);

  if (!boss) {
    return interaction.reply({
      content: t.notFound,
      flags: MessageFlags.Ephemeral,
    });
  }

  await interaction.deferReply();

  const bossName = getBossName(boss, locale) || '—';
  const level = boss.level != null ? String(boss.level) : '—';
  const region = getRegionName(boss.region, locale) || '—';
  const family = getFamilyName(boss.family, locale) || '—';
  const { guild } = interaction;

  if (guild && typeof guild.emojis?.fetch === 'function') {
    try {
      await guild.emojis.fetch();
    } catch (error) {
      // Ignorieren, wenn Emojis nicht geladen werden können
    }
  }
  
  const characteristics = formatCharacteristics(boss, locale, {
    includeIcons: true,
    guild,
  });
  const resistances = formatResistances(boss, locale, {
    includeIcons: true,
    guild,
  });

  const descriptionLines = [
    `**${t.description.level}:** ${level}`,
    `**${t.description.region}:** ${region}`,
    `**${t.description.family}:** ${family}`,
  ];

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

  const detailsTable = buildTwoColumnTable(
    t.fields.resistances,
    resistances,
    t.fields.characteristics,
    characteristics,
  );

  embed.addFields({
    name: '\u200B',
    value: detailsTable,
  });

  return interaction.editReply({
    embeds: [embed],
  });
}

module.exports = { execute };