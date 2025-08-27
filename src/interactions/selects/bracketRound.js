const { buildBracketEmbed } = require('../../embeds/bracket');

async function run(interaction, daten) {
  // customId: brkt_round_<bucket>_<currentRoundKey>
  const [, , bucket] = (interaction.customId || '').split('_');
  const newRoundKey = interaction.values?.[0] || 'QF';

  const view = buildBracketEmbed(daten, bucket, newRoundKey);
  await interaction.deferUpdate();
  return interaction.editReply(view);
}

module.exports = { run };