const { MessageFlags } = require('discord.js');
const { arenaData } = require('../../config/constants');

const ALL_ARENAS = Object.keys(arenaData); // passe an, falls deine Arenen anders definiert sind

function sampleUnique(arr, k) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.max(1, Math.min(k, a.length)));
}

async function execute(interaction) {
  const n = interaction.options.getInteger('anzahl') ?? 1;
  const picked = sampleUnique(ALL_ARENAS, n);
  return interaction.reply({
    content: `🎲 Arenen:\n• ${picked.join('\n• ')}`,
    flags: MessageFlags.Ephemeral
  });
}

module.exports = { execute };