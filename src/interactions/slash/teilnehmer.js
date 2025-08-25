const { EmbedBuilder } = require('discord.js');
const { KLASSE_LISTE } = require('../../config/constants');

module.exports = {
  async execute(interaction, daten) {
    const entries = Object.entries(daten.teilnehmer || {});
    if (!entries.length) return interaction.reply({ content: 'Noch keine Anmeldungen.', ephemeral: true });

    const byClass = new Map();
    for (const [id, p] of entries) {
      const key = p.klasse || 'ohne Klasse';
      if (!byClass.has(key)) byClass.set(key, []);
      byClass.get(key).push(p.name || id);
    }

    const list = [...byClass.entries()]
      .sort((a,b) => a[0].localeCompare(b[0]))
      .map(([k, arr]) => {
        const em = (KLASSE_LISTE.find(x => x.name === k)?.emoji) || '•';
        return { name: `${em} ${k} (${arr.length})`, value: arr.map(n => `– ${n}`).join('\n').slice(0, 1024) || '—' };
      });

    const embed = new EmbedBuilder().setColor(0x00aeff).setTitle('👥 Teilnehmer').addFields(list).setFooter({ text: `${entries.length} Teilnehmer` });
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
