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
  const level = boss.level != null ? String(boss.level) : '—';
  const region = getRegionName(boss.region, resolvedLocale) || '—';
  const family = getFamilyName(boss.family, resolvedLocale) || '—';
  const { guild } = interaction;

  if (guild && typeof guild.emojis?.fetch === 'function') {
    try {
      await guild.emojis.fetch();
    } catch (error) {
      // Ignorieren, wenn Emojis nicht geladen werden können
    }
  }
  
  const characteristics = formatCharacteristics(boss, resolvedLocale, {
    includeIcons: true,
    guild,
  });
  const resistances = formatResistances(boss, resolvedLocale, {
    includeIcons: true,
    guild,
  });

  const descriptionLines = [
    `**${resolvedMessages.description.level}:** ${level}`,
    `**${resolvedMessages.description.region}:** ${region}`,
    `**${resolvedMessages.description.family}:** ${family}`,
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

  const resistancesText = resistances.length ? resistances.join('\n') : '—';
  const characteristicsText = characteristics.length
    ? characteristics.join('\n')
    : '—';

   embed.addFields(
    {
      name: resolvedMessages.fields.resistances,
      value: resistancesText,
      inline: true,
    },
    {
      name: resolvedMessages.fields.characteristics,
      value: characteristicsText,
      inline: true,
    },
  );

  return interaction.editReply({
    embeds: [embed],
  });
}

module.exports = { execute };