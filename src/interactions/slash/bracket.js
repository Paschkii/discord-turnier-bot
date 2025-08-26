const { buildBracketEmbed } = require('../../embeds/bracket');

module.exports = {
  async execute(interaction, daten) {
    // Bestimme sinnvolle Defaults anhand des Status
    const isFinal = (daten.status === 'finale');
    const roundKey = isFinal ? 'F'
                   : (daten.groups?.[0]?.name || '').includes('Halbfinale') ? 'SF'
                   : 'QF';
    const bucket = (roundKey === 'F') ? 'top' : 'top'; // Start auf Top; per Button tauschbar
    const view = buildBracketEmbed(daten, bucket, roundKey);
    return interaction.reply({ ...view });
  }
};