// === Imports ===
const { EmbedBuilder, MessageFlags } = require('discord.js');

// Zeigt Dofusbook Sets als Embed an
async function execute(interaction) {
  const url = interaction.options.getString('link');
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) {
      return interaction.reply({ content: '❌ Konnte Seite nicht abrufen.', flags: MessageFlags.Ephemeral });
    }
    const html = await res.text();
    const titleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
    const descMatch = html.match(/<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const setName = titleMatch ? titleMatch[1] : 'Unbekanntes Set';
    const description = descMatch ? descMatch[1] : '';
    const embed = new EmbedBuilder()
      .setTitle(setName)
      .setURL(url)
      .setColor(0x00AEFF)
      .setTimestamp();
    if (description) embed.setDescription(description);
    return interaction.reply({ embeds: [embed] });
  } catch (err) {
    console.error('[set]', err);
    return interaction.reply({ content: '❌ Fehler beim Verarbeiten des Links.', flags: MessageFlags.Ephemeral });
  }
}

// === Exports ===
module.exports = { execute };