const { EmbedBuilder, MessageFlags } = require('discord.js');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');
const {
  formatJobLabel,
  getJobName,
  getSortedJobs,
  isValidJobId,
  normalizeJobId,
} = require('../../utils/jobs');
const {
  MAX_LEVEL,
  MIN_LEVEL,
  getUserJobs,
  getUsersForJob,
  setJobLevel,
} = require('../../store/jobs');

const EMBED_COLOR = 0x5865f2;

const JOB_LIST_SORT_CHOICES = new Set(['alphabet', 'type', 'group']);

const TEXT = {
  de: {
    helpDescription: [
      '`/job list` – Zeigt alle Berufe.',
      '`/job set` – Trage deinen Beruf und dein Level ein.',
      '`/job user` – Zeigt die eingetragenen Berufe eines Mitglieds.',
      '`/job profession` – Listet Mitglieder eines Berufs auf.',
      '`/job help` – Zeigt diese Hilfe.',
    ].join('\n'),
    helpFooter: 'Level liegen zwischen 1 und 100. Du kannst nur dein eigenes Level eintragen.',
    helpTitle: 'So nutzt du /job',
    invalidJob: '❌ Bitte wähle einen Beruf aus der Liste.',
    invalidLevel: '❌ Das Level muss zwischen 1 und 100 liegen.',
    listDescription: 'Vollständige Liste aller verfügbaren Berufe.',
    listFooter: 'Nutze die Autovervollständigung bei der Berufsauswahl.',
    listTitle: 'Berufe',
    professionEmpty: ({ jobName }) => `ℹ️ Für **${jobName}** ist noch niemand eingetragen.`,
    professionError: '❌ Fehler beim Laden des Berufs.',
    professionFooter: 'Eingetragene Mitglieder',
    setError: '❌ Fehler beim Speichern des Berufs.',
    setDescription: 'Du kannst dein Level jederzeit ändern.',
    setSuccess: ({ jobName, level }) => `✅ **${jobName}** wurde mit Level **${level}** eingetragen.`,
    guildOnly: '❌ Dieser Befehl ist nur in Servern verfügbar.',
    userError: '❌ Fehler beim Laden der Berufe.',
    userEmpty: ({ userMention }) => `ℹ️ ${userMention} hat noch keine Berufe eingetragen.`,
    userTitle: ({ displayName }) => `Berufe von ${displayName}`,
  },
  en: {
    helpDescription: [
      '`/job list` – Show all professions.',
      '`/job set` – Register a profession and level for yourself.',
      '`/job user` – Show a member\'s registered professions.',
      '`/job profession` – List members registered for a profession.',
      '`/job help` – Display this help message.',
    ].join('\n'),
    helpFooter: 'Levels range from 1 to 100. You can only set your own level.',
    helpTitle: 'How to use /job',
    invalidJob: '❌ Please choose a profession from the list.',
    invalidLevel: '❌ Level must be between 1 and 100.',
    listDescription: 'Complete list of available professions.',
    listFooter: 'Use the autocomplete when selecting a profession.',
    listTitle: 'Professions',
    professionEmpty: ({ jobName }) => `ℹ️ Nobody has registered **${jobName}** yet.`,
    professionError: '❌ Failed to load the profession data.',
    professionFooter: 'Registered members',
    setError: '❌ Failed to save the profession.',
    setDescription: 'You can update your level at any time.',
    setSuccess: ({ jobName, level }) => `✅ Registered **${jobName}** at level **${level}**.`,
    guildOnly: '❌ This command is only available inside servers.',
    userError: '❌ Failed to load the professions.',
    userEmpty: ({ userMention }) => `ℹ️ ${userMention} has not registered any professions yet.`,
    userTitle: ({ displayName }) => `Professions of ${displayName}`,
  },
};

function resolveTextLocale(locale) {
  if (locale && TEXT[locale]) return locale;
  return 'en';
}

function t(locale, key, params = {}) {
  const textLocale = resolveTextLocale(locale);
  const fallbackLocale = 'en';
  const table = TEXT[textLocale] || TEXT[fallbackLocale];
  const fallbackTable = TEXT[fallbackLocale];
  const value = table?.[key] ?? fallbackTable?.[key];
  if (typeof value === 'function') {
    return value(params);
  }
  return value ?? '';
}

function buildListEmbed(locale, sortBy) {
  const jobs = getSortedJobs(locale, sortBy);
  const entries = jobs.map(({ id }) => formatJobLabel(id, locale));
  const listFields = [];
  if (!entries.length) {
    listFields.push('—');
  } else {
    let current = '';
    for (const entry of entries) {
      const nextValue = current ? `${current}\n${entry}` : entry;
      if (nextValue.length > 1024) {
        if (current) {
          listFields.push(current);
        }
        current = entry;
      } else {
        current = nextValue;
      }
    }
    if (current) {
      listFields.push(current);
    }
  }

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLOR)
    .setTitle(t(locale, 'listTitle'))
    .setDescription(t(locale, 'listDescription'))
    .addFields(listFields.map((value) => ({ name: '\u200B', value, inline: false })));

  const footer = t(locale, 'listFooter');
  if (footer) {
    embed.setFooter({ text: footer });
  }

  return embed;
}

function sortUserJobs(entries, locale) {
  const order = new Map(getSortedJobs(locale).map(({ id }, index) => [normalizeJobId(id), index]));
  return [...entries].sort((a, b) => {
    const indexA = order.get(normalizeJobId(a.jobId)) ?? Number.POSITIVE_INFINITY;
    const indexB = order.get(normalizeJobId(b.jobId)) ?? Number.POSITIVE_INFINITY;
    if (indexA !== indexB) return indexA - indexB;
    return a.jobId.localeCompare(b.jobId);
  });
}

async function handleList(interaction, locale) {
  const sortByOption = interaction.options.getString('sort_by') || 'alphabet';
  const sortBy = JOB_LIST_SORT_CHOICES.has(sortByOption) ? sortByOption : 'alphabet';

  const embed = buildListEmbed(locale, sortBy);
  return interaction.reply({ embeds: [embed] });
}

async function handleHelp(interaction, locale) {
  const embed = new EmbedBuilder()
    .setColor(EMBED_COLOR)
    .setTitle(t(locale, 'helpTitle'))
    .setDescription(t(locale, 'helpDescription'));

  const footer = t(locale, 'helpFooter');
  if (footer) {
    embed.setFooter({ text: footer });
  }

  return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
}

async function handleSet(interaction, locale) {
  if (!interaction.guildId) {
    return interaction.reply({ content: t(locale, 'guildOnly'), flags: MessageFlags.Ephemeral });
  }
  const jobIdRaw = interaction.options.getString('profession', true);
  const jobId = normalizeJobId(jobIdRaw);

  if (!isValidJobId(jobId)) {
    return interaction.reply({ content: t(locale, 'invalidJob'), flags: MessageFlags.Ephemeral });
  }

  const requestedLevel = interaction.options.getInteger('level', true);
  if (requestedLevel < MIN_LEVEL || requestedLevel > MAX_LEVEL) {
    return interaction.reply({ content: t(locale, 'invalidLevel'), flags: MessageFlags.Ephemeral });
  }

  let stored;
  try {
    stored = await setJobLevel(interaction.guildId, interaction.user.id, jobId, requestedLevel);
  } catch (err) {
    if (err && err.message === 'INVALID_JOB') {
      return interaction.reply({ content: t(locale, 'invalidJob'), flags: MessageFlags.Ephemeral });
    }
    if (err && err.message === 'GUILD_ID_REQUIRED') {
      return interaction.reply({ content: t(locale, 'guildOnly'), flags: MessageFlags.Ephemeral });
    }
    console.error('[job] setJobLevel failed', err);
    return interaction.reply({ content: t(locale, 'setError'), flags: MessageFlags.Ephemeral });
  }

  const jobName = getJobName(jobId, locale);
  const embed = new EmbedBuilder()
    .setColor(EMBED_COLOR)
    .setTitle(t(locale, 'setSuccess', { jobName, level: stored.level }))
    .setDescription(t(locale, 'setDescription'));

  return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
}

async function handleUser(interaction, locale) {
  if (!interaction.guildId) {
    return interaction.reply({ content: t(locale, 'guildOnly'), flags: MessageFlags.Ephemeral });
  }
  const user = interaction.options.getUser('target') ?? interaction.user;
  let jobs;
  try {
    jobs = sortUserJobs(await getUserJobs(interaction.guildId, user.id), locale);
  } catch (err) {
    console.error('[job] getUserJobs failed', err);
    return interaction.reply({ content: t(locale, 'userError'), flags: MessageFlags.Ephemeral });
  }

  if (!jobs.length) {
    return interaction.reply({ content: t(locale, 'userEmpty', { userMention: user.toString() }), flags: MessageFlags.Ephemeral });
  }

  const description = jobs
    .map(({ jobId, level }) => `• ${formatJobLabel(jobId, locale)} — Lv. ${level}`)
    .join('\n');

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLOR)
    .setTitle(t(locale, 'userTitle', { displayName: user.globalName || user.username }))
    .setDescription(description);

  return interaction.reply({ embeds: [embed] });
}

async function handleProfession(interaction, locale) {
  if (!interaction.guildId) {
    return interaction.reply({ content: t(locale, 'guildOnly'), flags: MessageFlags.Ephemeral });
  }

  const jobIdRaw = interaction.options.getString('profession', true);
  const jobId = normalizeJobId(jobIdRaw);

  if (!isValidJobId(jobId)) {
    return interaction.reply({ content: t(locale, 'invalidJob'), flags: MessageFlags.Ephemeral });
  }

  let entries;
  try {
    entries = await getUsersForJob(interaction.guildId, jobId);
  } catch (err) {
    if (err && err.message === 'INVALID_JOB') {
      return interaction.reply({ content: t(locale, 'invalidJob'), flags: MessageFlags.Ephemeral });
    }
    if (err && err.message === 'GUILD_ID_REQUIRED') {
      return interaction.reply({ content: t(locale, 'guildOnly'), flags: MessageFlags.Ephemeral });
    }
    console.error('[job] getUsersForJob failed', err);
    return interaction.reply({ content: t(locale, 'professionError'), flags: MessageFlags.Ephemeral });
  }

  if (!entries.length) {
    const jobName = getJobName(jobId, locale);
    return interaction.reply({ content: t(locale, 'professionEmpty', { jobName }), flags: MessageFlags.Ephemeral });
  }

  const jobName = getJobName(jobId, locale);
  const jobLabel = formatJobLabel(jobId, locale);
  const description = entries
    .sort((a, b) => {
      if (b.level !== a.level) return b.level - a.level;
      return a.userId.localeCompare(b.userId);
    })
    .map(({ userId, level }) => `• <@${userId}> — Lv. ${level}`)
    .join('\n');

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLOR)
    .setTitle(jobLabel)
    .setDescription(description);

  const professionFooter = t(locale, 'professionFooter', { jobName });
  if (professionFooter) {
    embed.setFooter({ text: professionFooter });
  }

  return interaction.reply({ embeds: [embed] });
}

async function execute(interaction) {
  const locale = await resolveInteractionLocale(interaction);

  let subcommand;
  try {
    subcommand = interaction.options.getSubcommand();
  } catch (err) {
    subcommand = 'help';
  }

  switch (subcommand) {
    case 'list':
      return handleList(interaction, locale);
    case 'set':
      return handleSet(interaction, locale);
    case 'user':
      return handleUser(interaction, locale);
    case 'profession':
      return handleProfession(interaction, locale);
    case 'help':
    default:
      return handleHelp(interaction, locale);
  }
}

module.exports = { execute };