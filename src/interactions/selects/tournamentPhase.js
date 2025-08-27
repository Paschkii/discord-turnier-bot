const { buildDashboard } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');

module.exports = {
  async run(interaction) {
    const id = interaction.customId || '';
    if (!id.startsWith('tnav|phase|')) return;

    // tnav|phase|<tab>|<phaseOrRound>|<bucket>|<groupIx>|<page>
    const [, , tab, _oldPhase, bucket, groupIx, _page] = id.split('|');
    const newVal = interaction.values?.[0];
    const state = { tab, phaseOrRound: newVal, bucket, groupIx, page: 1 };

    const daten = await ladeTurnier();
    await interaction.deferUpdate();
    const view = await buildDashboard(interaction, daten, state);
    return interaction.editReply(view);
  }
};