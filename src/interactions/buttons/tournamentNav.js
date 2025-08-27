const { buildDashboard } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');

module.exports = {
  async run(interaction) {
    const id = interaction.customId || '';
    if (!id.startsWith('tnav|')) return;

    // Struktur: tnav|<kind>|...
    const parts = id.split('|');
    const kind = parts[1];

    let state = null;

    if (kind === 'tab') {
      // tnav|tab|<tab>|<phase>|<bucket>|<groupIx>|<page>
      const [, , tab, phase, bucket, groupIx, pageStr] = parts;
      state = { tab, phaseOrRound: phase, bucket, groupIx, page: parseInt(pageStr, 10) || 1 };
      // Defaults anpassen
      if (tab === 'b' && !['QF','SF','F'].includes(state.phaseOrRound)) state.phaseOrRound = 'QF';
      if (tab !== 'b' && ['QF','SF','F'].includes(state.phaseOrRound)) state.phaseOrRound = 'gr';
      state.page = 1;
    }

    if (kind === 'page') {
      // tnav|page|prev|<tab>|<phase>|<bucket>|<groupIx>|<page>
      const [, , dir, tab, phase, bucket, groupIx, pageStr] = parts;
      const current = parseInt(pageStr, 10) || 1;
      state = {
        tab, phaseOrRound: phase, bucket, groupIx,
        page: Math.max(1, current + (dir === 'next' ? 1 : dir === 'prev' ? -1 : 0))
      };
    }

    if (kind === 'bucket') {
      // tnav|bucket|<t|l>|b|<round>|<t|l>|<groupIx>|<page>
      const [, , b, _tab, round, _dupB, groupIx, pageStr] = parts;
      state = { tab: 'b', phaseOrRound: round, bucket: b, groupIx, page: parseInt(pageStr, 10) || 1 };
    }

    if (!state) return; // noop (z.B. page|noop)

    const daten = await ladeTurnier();
    await interaction.deferUpdate();
    const view = await buildDashboard(interaction, daten, state);
    return interaction.editReply(view);
  }
};