// === Imports ===
const { EmbedBuilder, MessageFlags } = require('discord.js');
const {
  findDungeonById,
  findDungeonByName,
  formatDungeonAchievements,
  getDungeonBossDisplayEntries,
  getDungeonName,
} = require('../../utils/dungeons');
const {
  resolveInteractionLocale,
  getInteractionLocaleHint,
} = require('../../utils/interactionLocale');
const { materializeGuildEmojiShortcodes } = require('../../helpers/emoji');
const { safeDeferReply } = require('../../helpers/interactions');

const ACHIEVEMENT_NAMES = {
  de: 'Erfolge',
  en: 'Achievements',
  fr: 'Succès',
  es: 'Logros',
  it: 'Imprese',
  pt: 'Conquistas',
};

function buildAchievementFieldLabel(locale) {
  return ACHIEVEMENT_NAMES[locale] || ACHIEVEMENT_NAMES.en;
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
  const localeHint = getInteractionLocaleHint(interaction);
  const localePromise = resolveInteractionLocale(interaction).catch(() => localeHint || 'en');

  if (!rawValue) {
    const t = getMessages(localeHint);
    return interaction.reply({
      content: t.missingName,
      flags: MessageFlags.Ephemeral,
    });
  }

  let dungeon = findDungeonById(rawValue);

  if (!dungeon) {
    dungeon = findDungeonByName(rawValue, localeHint);
  }

  const deferred = await safeDeferReply(interaction);
  if (!deferred) {
    return;
  }

  const locale = (await localePromise) || 'en';
  if (!dungeon) {
    dungeon = findDungeonByName(rawValue, locale);

    if (!dungeon) {
      const t = getMessages(locale);
      try {
        return await interaction.editReply({
          content: t.notFound,
        });
      } catch (error) {
        console.error('[slash] editReply failed:', error);
        return undefined;
      }
    }
  }
  const t = getMessages(locale);

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

  const dungeonName = getDungeonName(dungeon, locale) || '—';
  const levelValue = dungeon.dungeonLevel ?? dungeon.level;
  const level = levelValue != null ? String(levelValue) : '—';

  const bossDisplayEntries = getDungeonBossDisplayEntries(dungeon, locale);
  const bossLines = bossDisplayEntries.length
    ? bossDisplayEntries.map(({ name, emoji }) => `• ${name}${emoji ? ` ${emoji}` : ''}`)
    : [];
  const achievements = formatDungeonAchievements(dungeon, locale, { guild });
  const achievementLines = achievements
    .map((line) => (typeof line === 'string' ? line.trim() : ''))
    .filter(Boolean)
    .map((line) => (line.startsWith('•') ? line : `• ${line}`));

  const achievementText = achievementLines.length
    ? materializeGuildEmojiShortcodes(achievementLines.join('\n'), guild)
    : '';

  const descriptionLines = [`**${t.description.level}:** ${level}`];

  const embed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle(dungeonName)
    .setDescription(descriptionLines.join('\n'))
    .setTimestamp();

  const achievementField = {
    name: `**${t.fields.achievements}**`,
    value: achievementText || '—',
    inline: false,
  };

  const bossField = {
    name: `**${t.fields.boss}**`,
    value: bossLines.length ? bossLines.join('\n') : '—',
    inline: false,
  };

  embed.addFields(
    bossField,
    achievementField,
  );

  try {
    return await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    console.error('[slash] editReply failed:', error);
    return undefined;
  }
}

// === Exports ===
module.exports = { execute };