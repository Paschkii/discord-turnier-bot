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

// Antwort für /boss erzeugen
async function execute(interaction) {
  const rawValue = interaction.options.getString('name');
  if (!rawValue) {
    return interaction.reply({
      content: '❌ Bitte wähle ein Bossmonster aus.',
      flags: MessageFlags.Ephemeral,
    });
  }

  const locale = 'de'; // aktuell nur deutsche Ausgabe unterstützt
  const boss = findBossById(rawValue) || findBossByName(rawValue, locale);

  if (!boss) {
    return interaction.reply({
      content: '❌ Dieses Bossmonster konnte nicht gefunden werden.',
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
    `**Level:** ${level}`,
    `**Region:** ${region}`,
    `**Familie:** ${family}`
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
      name: `**Charakteristiken**`,
      value: characteristics.length ? characteristics.join('\n') : '—',
      inline: false,
    },
    {
      name: `**Resistenzen**`,
      value: resistances.length ? resistances.join('\n') : '—',
      inline: false,
    }
  );

  return interaction.editReply({
    embeds: [embed],
  });
}

module.exports = { execute };