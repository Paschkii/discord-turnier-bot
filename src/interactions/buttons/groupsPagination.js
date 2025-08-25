const { buildPagedGroupReply } = require('../../embeds/groups');

module.exports = {
  async run(interaction, daten) {
    const [, , dir, n] = interaction.customId.split('_'); // pg_groups_prev_<n> / next
    const current = parseInt(n, 10) || 1;
    const nextPage = dir === 'prev' ? current - 1 : current + 1;
    const { embeds, components } = buildPagedGroupReply(daten, nextPage, 10);
    try { return interaction.update({ embeds, components }); }
    catch { return interaction.reply({ embeds, components, ephemeral: true }); }
  }
};
