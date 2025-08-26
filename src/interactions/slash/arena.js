const { MessageFlags, EmbedBuilder } = require('discord.js');
const { arenaData } = require('../../config/constants');

// Normalisiert arenaData → Array<string>
function getArenaNames() {
  if (Array.isArray(arenaData)) return arenaData.slice();
  if (arenaData && typeof arenaData === 'object') {
    // Legacy: Kategorien-Objekt -> zu Liste flatten
    return Object.values(arenaData).flat().map(String);
  }
  return [];
}

// eindeutige Einträge aus Array ziehen
function sampleUnique(arr, k) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  const n = Math.max(1, Math.min(k, a.length));
  return a.slice(0, n);
}

async function execute(interaction) {
  const n = interaction.options.getInteger('anzahl') ?? 1;
  const names = getArenaNames();

  if (!names.length) {
    return interaction.reply({
      content: '❌ Keine Arenen konfiguriert (`arenaData` ist leer).',
      flags: MessageFlags.Ephemeral,
    });
  }

  const picked = sampleUnique(names, n);
  const embed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle('🎲 Ausgewürfelte Arenen')
    .setDescription(picked.map(nm => `• **${nm}**`).join('\n'))
    .setTimestamp();

  return interaction.reply({
    embeds: [embed],
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = { execute };