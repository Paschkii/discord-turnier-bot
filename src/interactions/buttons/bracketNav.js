const { buildBracketEmbed } = require('../../embeds/bracket');
const { MessageFlags } = require('discord.js');

function nextRound(k) { return k === 'QF' ? 'SF' : (k === 'SF' ? 'F' : 'QF'); }
function prevRound(k) { return k === 'F'  ? 'SF' : (k === 'SF' ? 'QF' : 'F'); }

module.exports = {
  canHandle(id) { return id.startsWith('brkt_'); },
  async run(interaction, daten) {
    const [ , action, bucket0, round0 ] = interaction.customId.split('_'); // brkt_<action>_<bucket>_<round>
    let bucket = bucket0, roundKey = round0;

    if (action === 'swap') bucket = (bucket0 === 'top') ? 'low' : 'top';
    if (action === 'next') roundKey = nextRound(round0);
    if (action === 'prev') roundKey = prevRound(round0);

    const view = buildBracketEmbed(daten, bucket, roundKey);
    try { return interaction.update(view); }
    catch { return interaction.reply({ ...view, flags: MessageFlags.Ephemeral }); }
  }
};