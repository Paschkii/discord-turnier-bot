// === Imports ===
const { AttachmentBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const {
  findBossById,
  findBossByName,
  formatCharacteristics,
  formatResistances,
  getBossName,
  getFamilyName,
  getCharacteristicEntries,
  getRegionName,
  getResistanceEntries,
} = require('../../utils/bosses');

const ICON_CACHE = new Map();

async function fetchIcon(url) {
  if (!url) return null;
  if (!ICON_CACHE.has(url)) {
    const promise = loadImage(url).catch(() => null);
    ICON_CACHE.set(url, promise);
  }
  return ICON_CACHE.get(url);
}

async function buildStatsAttachment(boss, locale = 'de') {
  const characteristicEntries = getCharacteristicEntries(boss, locale).filter(Boolean);
  const resistanceEntries = getResistanceEntries(boss, locale).filter(Boolean);
  const sections = [];
  if (characteristicEntries.length) {
    sections.push({ title: 'Charakteristiken', entries: characteristicEntries });
  }
  if (resistanceEntries.length) {
    sections.push({ title: 'Resistenzen', entries: resistanceEntries });
  }
  if (!sections.length) return null;

  const paddingX = 28;
  const paddingY = 28;
  const iconSize = 40;
  const iconGap = 16;
  const lineHeight = 46;
  const titleHeight = 32;
  const sectionGap = 24;
  const minWidth = 420;
  const titleFont = 'bold 26px "Noto Sans", "Helvetica", "Arial"';
  const textFont = '22px "Noto Sans", "Helvetica", "Arial"';

  const measureCtx = createCanvas(1, 1).getContext('2d');
  let maxContentWidth = 0;
  for (const section of sections) {
    measureCtx.font = titleFont;
    maxContentWidth = Math.max(maxContentWidth, measureCtx.measureText(section.title).width);
    measureCtx.font = textFont;
    for (const entry of section.entries) {
      const text = `${entry.label}: ${entry.value}`;
      const width = measureCtx.measureText(text).width + (entry.icon ? iconSize + iconGap : 0);
      maxContentWidth = Math.max(maxContentWidth, width);
    }
  }

  const width = Math.ceil(Math.max(minWidth, paddingX * 2 + maxContentWidth));
  let height = paddingY * 2;
  for (const section of sections) {
    height += titleHeight + section.entries.length * lineHeight;
  }
  height += sectionGap * Math.max(0, sections.length - 1);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#232428';
  ctx.fillRect(0, 0, width, height);
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#ffffff';

  let y = paddingY;
  for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
    const section = sections[sectionIndex];
    ctx.font = titleFont;
    ctx.fillText(section.title, paddingX, y);
    y += titleHeight;

    ctx.font = textFont;
    for (const entry of section.entries) {
      const icon = entry.icon ? await fetchIcon(entry.icon) : null;
      const text = `${entry.label}: ${entry.value}`;
      let textX = paddingX;
      if (icon) {
        ctx.drawImage(icon, paddingX, y - 4, iconSize, iconSize);
        textX += iconSize + iconGap;
      }
      ctx.fillText(text, textX, y + 4);
      y += lineHeight;
    }

    if (sectionIndex < sections.length - 1) {
      y += sectionGap;
    }
  }

  return new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'boss-stats.png' });
}

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
  const characteristics = formatCharacteristics(boss, locale, { includeIcons: false });
  const resistances = formatResistances(boss, locale, { includeIcons: false });

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

  const statsAttachment = await buildStatsAttachment(boss, locale);
  if (statsAttachment) {
    embed.setImage('attachment://boss-stats.png');
  }

  return interaction.reply({
    embeds: [embed],
    files: statsAttachment ? [statsAttachment] : undefined,
  });
}

module.exports = { execute };