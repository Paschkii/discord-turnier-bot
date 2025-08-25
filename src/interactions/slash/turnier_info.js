const { ladeTurnier } = require('../../store/turniere');
const { buildTournamentInfoEmbeds } = require('../../embeds/info');

module.exports = {
  async execute(interaction) {
    const daten = await ladeTurnier();
    if (!daten) return interaction.reply({ content: '❌ Kein aktives Turnier.', ephemeral: true });
    const embeds = buildTournamentInfoEmbeds(daten);
    return interaction.reply({ embeds, ephemeral: true });
  }
};
