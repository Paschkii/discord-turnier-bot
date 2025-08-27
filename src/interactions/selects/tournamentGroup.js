const { buildDashboard } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');

module.exports = {
  async run(interaction) {
    const id = interaction.customId || '';
    if (!id.startsWith('tnav|group|')) return;

    // tnav|group|<tab>|<phase>|<bucket>|<groupIx>|<page>
    const [, , tab, phase, bucket, _oldIx, _page] = id.split('|');
    const newIx = interaction.values?.[0] ?? '0';
    const state = { tab, phaseOrRound: phase, bucket, groupIx: newIx, page: 1 };

    const daten = await ladeTurnier();
    await interaction.deferUpdate();
    const view = await buildDashboard(interaction, daten, state);
    return interaction.editReply(view);
  }
};