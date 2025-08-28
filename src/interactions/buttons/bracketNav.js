const { buildBracketEmbed } = require('../../embeds/bracket');

function nextRound(k) { return k === 'QF' ? 'SF' : (k === 'SF' ? 'F' : 'QF'); }
function prevRound(k) { return k === 'F'  ? 'SF' : (k === 'SF' ? 'QF' : 'F'); }

async function run(interaction, daten) {
  const [ , action, bucket0, round0 ] = (interaction.customId || '').split('_');
  let bucket = bucket0, roundKey = round0;

  if (action === 'swap') bucket = (bucket0 === 'top') ? 'low' : 'top';
  if (action === 'next') roundKey = nextRound(round0);
  if (action === 'prev') roundKey = prevRound(round0);

  const view = buildBracketEmbed(daten, bucket, roundKey);
  await interaction.deferUpdate();
  return interaction.editReply(view);
}

module.exports = { run, canHandle: (id) => id.startsWith('brkt_') };