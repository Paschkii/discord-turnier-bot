// === Imports ===
const { EmbedBuilder } = require('discord.js');
const cheerio = require('cheerio');

function extractItemsFromObject(obj) {
    const items = [];
    const visit = (val) => {
        if (!val || typeof val !== 'object') return;
        if (Array.isArray(val)) {
            val.forEach(visit);
            return;
        }
        if (val.name && (val.stats || val.effects)) {
            const statsArr = val.stats || val.effects || [];
            const stats = Array.isArray(statsArr)
            ? statsArr
                .map((s) => {
                    if (typeof s === 'string') return s;
                    const parts = [];
                    if (s.name) parts.push(s.name);
                    if (s.effect) parts.push(s.effect);
                    if (s.value !== undefined) parts.push(s.value);
                    if (s.min !== undefined && s.max !== undefined) parts.push(`${s.min}-${s.max}`);
                    return parts.join(' ');
                })
                .join('\n')
            : typeof statsArr === 'string'
            ? statsArr
            : '';
            items.push({ name: val.name, stats, icon: val.icon || val.img || val.image });
        }
        for (const key of Object.keys(val)) visit(val[key]);
    };
    visit(obj);
    return items;
}

// Zeigt Dofusbook Sets als Embed an
async function execute(interaction) {
    await interaction.deferReply();
    const url = interaction.options.getString('link');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
        const res = await fetch(url, {
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/html' },
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
        try {
            const $ = cheerio.load(html);
            let items = [];
            $('.item, .db-item').each((_, el) => {
                const name = $(el).find('.name, .item-name, h2').first().text().trim();
                const stats = $(el)
                .find('.stats, .item-stats, .db-item-stats')
                .text()
                .trim()
                .replace(/\n\s+/g, '\n');
                const icon = $(el).find('img').first().attr('src');
                if (name) items.push({ name, stats, icon });
            });

            if (!items.length) {
                const nuxtMatch = html.match(/window\.__NUXT__=(.+?);<\/script>/);
                if (nuxtMatch) {
                    try {
                        const data = JSON.parse(nuxtMatch[1]);
                        items = extractItemsFromObject(data);
                    } catch (e) {
                        console.error('JSON parse error', e);
                    }
                }
            }

            if (items.length) {
                embed.addFields(
                items.slice(0, 25).map((it) => ({
                    name: it.name,
                    value: (it.stats ? it.stats : 'Keine Werte') + (it.icon ? `\n[Icon](${it.icon})` : ''),
                }))
                );
                if (items[0].icon) embed.setThumbnail(items[0].icon);
            }
        } catch (e) {
            console.error('Dofusbook parse failed', e);
        }
        return interaction.editReply({ embeds: [embed] });
    } catch (err) {
        console.error(err);
        const message = err.name === 'AbortError'
        ? '❌ Anfrage abgebrochen (Timeout).'
        : '❌ Fehler beim Verarbeiten des Links.';
        return interaction.editReply({ content: message });
    }
}

// === Exports ===
module.exports = { execute };