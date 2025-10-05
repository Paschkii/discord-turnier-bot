// === Imports ===
const { EmbedBuilder, MessageFlags } = require('discord.js');
const {
  findDungeonById,
  findDungeonByName,
  formatDungeonChallenges,
  getDungeonBossEntries,
  getDungeonBossNames,
  getDungeonName,
} = require('../../utils/dungeons');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

const MESSAGES = {
  de: {
    missingName: '❌ Bitte wähle einen Dungeon aus.',
    notFound: '❌ Dieser Dungeon konnte nicht gefunden werden.',
    description: {
      level: 'Level',
    },
    fields: {
      boss: 'Boss',
      challenges: 'Herausforderungen',
    },
  },
  en: {
    missingName: '❌ Please choose a dungeon.',
    notFound: '❌ This dungeon could not be found.',
    description: {
      level: 'Level',
    },
    fields: {
      boss: 'Boss',
      challenges: 'Challenges',
    },
  },
  fr: {
    missingName: '❌ Veuillez choisir un donjon.',
    notFound: '❌ Ce donjon est introuvable.',
    description: {
      level: 'Niveau',
    },
    fields: {
      boss: 'Boss',
      challenges: 'Défis',
    },
  },
  es: {
    missingName: '❌ Selecciona un calabozo.',
    notFound: '❌ No se encontró este calabozo.',
    description: {
      level: 'Nivel',
    },
    fields: {
      boss: 'Jefe',
      challenges: 'Desafíos',
    },
  },
  it: {
    missingName: '❌ Seleziona un dungeon.',
    notFound: '❌ Questo dungeon non è stato trovato.',
    description: {
      level: 'Livello',
    },
    fields: {
      boss: 'Boss',
      challenges: 'Sfide',
    },
  },
  pt: {
    missingName: '❌ Escolha um calabouço.',
    notFound: '❌ Esse calabouço não foi encontrado.',
    description: {
      level: 'Nível',
    },
    fields: {
      boss: 'Chefe',
      challenges: 'Desafios',
    },
  },
};

function getMessages(locale) {
  return MESSAGES[locale] || MESSAGES.en || MESSAGES.de;
}

// Antwort für /dungeon erzeugen
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

  const dungeon = findDungeonById(rawValue) || findDungeonByName(rawValue, locale);

  if (!dungeon) {
    return interaction.reply({
      content: t.notFound,
      flags: MessageFlags.Ephemeral,
    });
  }

  await interaction.deferReply();

  const dungeonName = getDungeonName(dungeon, locale) || '—';
  const levelValue = dungeon.dungeonLevel ?? dungeon.level;
  const level = levelValue != null ? String(levelValue) : '—';

  const bossNames = getDungeonBossNames(dungeon, locale);
  const bossLines = bossNames.length ? bossNames.map((name) => `• ${name}`) : [];
  const challenges = formatDungeonChallenges(dungeon, locale);

  const descriptionLines = [`**${t.description.level}:** ${level}`];

  const embed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle(dungeonName)
    .setDescription(descriptionLines.join('\n'))
    .setTimestamp();

  const primaryBoss = getDungeonBossEntries(dungeon)[0]?.boss;
  if (primaryBoss?.imageUrl) {
    embed.setThumbnail(primaryBoss.imageUrl);
  } else if (primaryBoss?.icon) {
    embed.setThumbnail(primaryBoss.icon);
  }

  embed.addFields(
    {
      name: `**${t.fields.boss}**`,
      value: bossLines.length ? bossLines.join('\n') : '—',
      inline: false,
    },
    {
      name: `**${t.fields.challenges}**`,
      value: challenges.length ? challenges.join('\n') : '—',
      inline: false,
    }
  );

  return interaction.editReply({
    embeds: [embed],
  });
}

// === Exports ===
module.exports = { execute };