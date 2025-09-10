// === Imports ===
const { EmbedBuilder } = require('discord.js');

// Zeigt Dofusbook Sets als Embed an
async function execute(interaction) {
    await interaction.deferReply();
    const url = interaction.options.getString('link');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
        const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!res.ok) {
        return interaction.editReply({ content: `❌ Konnte Seite nicht abrufen (Status: ${res.status}).` });
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
        return interaction.editReply({ embeds: [embed] });
    } catch (err) {
        console.error('[set]', err);
        const message = err.name === 'AbortError'
        ? '❌ Anfrage abgebrochen (Timeout).'
        : '❌ Fehler beim Verarbeiten des Links.';
        return interaction.editReply({ content: message });
    }
}

// === Exports ===
module.exports = { execute };