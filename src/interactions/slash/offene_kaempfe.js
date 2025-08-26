const {
  MessageFlags,
  EmbedBuilder
} = require('discord.js');

module.exports = {
  async execute(interaction, daten) {
    const filter = (interaction.options.getString('filter') || '').toLowerCase();
    const open = (daten.kämpfe || []).filter(f => !f.finished);
    if (!open.length) return interaction.reply({ content: '🎉 Keine offenen Kämpfe in der aktuellen Phase.', flags: MessageFlags.Ephemeral });

    const fmt = (f) => {
      const a = f.playerA?.name ?? '—';
      const b = f.playerB?.name ?? '—';
      const sA = Number.isInteger(f.scoreA) ? f.scoreA : 0;
      const sB = Number.isInteger(f.scoreB) ? f.scoreB : 0;
      const status = f.finished ? '✅' : '⏳';
      return `• Kampf: ${a} vs ${b} — ${sA}:${sB} ${status}`;
    };

    const filtered = filter
      ? open.filter(f => {
          const a = (f.playerA?.name || '').toLowerCase();
          const b = (f.playerB?.name || '').toLowerCase();
          return a.includes(filter) || b.includes(filter);
        })
      : open;

    if (!filtered.length) return interaction.reply({ content: `ℹ️ Keine offenen Kämpfe passend zum Filter „${filter}“.`, flags: MessageFlags.Ephemeral });

    const pages = Math.ceil(filtered.length / 20);
    const chunks = [];
    for (let i=0;i<filtered.length;i+=20) chunks.push(filtered.slice(i,i+20));
    const embeds = chunks.map((chunk, idx) =>
      new EmbedBuilder()
        .setColor(0x00aeff)
        .setTitle(`⏳ Offene Kämpfe${pages>1?` (Seite ${idx+1}/${pages})`:''}`)
        .setDescription(chunk.map(fmt).join('\n'))
    );
    return interaction.reply({ embeds, flags: MessageFlags.Ephemeral });
  }
};
