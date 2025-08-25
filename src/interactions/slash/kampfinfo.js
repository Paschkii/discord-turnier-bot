const { EmbedBuilder } = require('discord.js');

module.exports = {
  async execute(interaction, daten) {
    const phase = daten?.status || 'offen';
    const fights = (daten?.kämpfe || []).filter(f => (f.phase || '') === phase);
    if (!fights.length) return interaction.reply({ content: 'ℹ️ In dieser Phase gibt es keine Kämpfe.', ephemeral: true });

    const perPage = 15;
    const pages = Math.ceil(fights.length / perPage);
    const mk = (arr, idx) =>
      new EmbedBuilder().setColor(0x00aeff).setTitle(`🗂️ Kämpfe – ${phase} (Seite ${idx+1}/${pages})`)
        .setDescription(arr.map(f => `• ${f.playerA?.name ?? '—'} vs ${f.playerB?.name ?? '—'} — ${f.scoreA ?? 0}:${f.scoreB ?? 0}${f.finished ? ' ✅' : ''}`).join('\n'));

    const embeds = [];
    for (let i = 0; i < fights.length; i += perPage) embeds.push(mk(fights.slice(i, i + perPage), i / perPage));
    return interaction.reply({ embeds, ephemeral: true });
  }
};
