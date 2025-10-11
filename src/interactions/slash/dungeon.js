// === Imports ===
const { EmbedBuilder, MessageFlags } = require('discord.js');
const {
  findDungeonById,
  findDungeonByName,
  formatDungeonAchievements,
  getDungeonBossEntries,
  getDungeonBossNames,
  getDungeonName,
} = require('../../utils/dungeons');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

const ACHIEVEMENT_NAMES = {
  de: 'Erfolge',
  en: 'Achievements',
  fr: 'Succès',
  es: 'Logros',
  it: 'Imprese',
  pt: 'Conquistas',
};

function buildAchievementFieldLabel(locale) {
  const primary = ACHIEVEMENT_NAMES[locale] || ACHIEVEMENT_NAMES.en;
  const others = Object.entries(ACHIEVEMENT_NAMES)
    .filter(([loc]) => loc !== locale)
    .map(([, name]) => name)
    .join(', ');
  return others ? `${primary} (${others})` : primary;
}

const MESSAGES = {
  de: {
    missingName: '❌ Bitte wähle einen Dungeon aus.',
    notFound: '❌ Dieser Dungeon konnte nicht gefunden werden.',
    description: {
      level: 'Level',
    },
    fields: {
      boss: 'Boss',
      achievements: buildAchievementFieldLabel('de'),
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
      achievements: buildAchievementFieldLabel('en'),
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
      achievements: buildAchievementFieldLabel('fr'),
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
      achievements: buildAchievementFieldLabel('es'),
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
      achievements: buildAchievementFieldLabel('it'),
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
      achievements: buildAchievementFieldLabel('pt'),
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
  const achievements = formatDungeonAchievements(dungeon, locale);

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
      name: `**${t.fields.achievements}**`,
      value: achievements.length ? achievements.join('\n') : '—',
      inline: false,
    }
  );

  return interaction.editReply({
    embeds: [embed],
  });
}

// === Exports ===
module.exports = { execute };