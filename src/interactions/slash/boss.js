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
  const level = boss.defaultLevel != null ? String(boss.defaultLevel) : '—';
  const region = getRegionName(boss.region, locale) || '—';
  const family = getFamilyName(boss.family, locale) || '—';
  const characteristics = formatCharacteristics(boss, locale, { includeIcons: true });
  const resistances = formatResistances(boss, locale, { includeIcons: true });

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

  embed.addFields(
    {
      name: `**${t.fields.characteristics}**`,
      value: characteristics.length ? characteristics.join('\n') : '—',
      inline: false,
    },
    {
      name: `**${t.fields.resistances}**`,
      value: resistances.length ? resistances.join('\n') : '—',
      inline: false,
    }
  );

  return interaction.editReply({
    embeds: [embed],
  });
}

module.exports = { execute };