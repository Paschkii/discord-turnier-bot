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

  const bossName = getBossName(boss, locale) || '—';
  const level = boss.defaultLevel != null ? String(boss.defaultLevel) : '—';
  const region = getRegionName(boss.region, locale) || '—';
  const family = getFamilyName(boss.family, locale) || '—';
  const characteristics = formatCharacteristics(boss, locale);
  const resistances = formatResistances(boss, locale);

  const descriptionLines = [
    `**Level:** ${level}`,
    `**Region:** ${region}`,
    `**Familie:** ${family}`,
    '**Charakteristiken:**',
    characteristics.length ? characteristics.join('\n') : '—',
    '**Resistenzen:**',
    resistances.length ? resistances.join('\n') : '—',
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

  return interaction.reply({ embeds: [embed] });
}

module.exports = { execute };