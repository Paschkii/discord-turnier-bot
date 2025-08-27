const { buildDashboard, decode, encode } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');

async function run(interaction) {
  const id = interaction.customId || '';
  const [head, kind, tab, phase, bucket, groupIx, pageStr] = id.split('|');
  if (head !== 'tnav') return;

  const daten = await ladeTurnier();
  let state = { tab, phaseOrRound: phase, bucket, groupIx, page: parseInt(pageStr, 10) || 1 };

  if (kind === 'tab') {
    // Tab-Wechsel → Page zurücksetzen, ggf. defaults pro Tab
    state.page = 1;
    if (state.tab === 'b' && !['QF','SF','F'].includes(state.phaseOrRound)) state.phaseOrRound = 'QF';
    if (state.tab !== 'b' && ['QF','SF','F'].includes(state.phaseOrRound)) state.phaseOrRound = 'gr';
  }

  if (kind === 'page') {
    const dir = tab; // hier missbrauchen wir das Feld "tab" als 'prev'/'next' wegen ID-Layout
    state.tab = phase;
    state.phaseOrRound = bucket;
    state.bucket = groupIx;
    state.groupIx = pageStr;
    const current = parseInt(interaction.customId.split('|')[6], 10) || 1;
    state.page = Math.max(1, current + (dir === 'next' ? 1 : dir === 'prev' ? -1 : 0));
  }

  const view = await buildDashboard(interaction, daten, state);
  await interaction.deferUpdate();
  return interaction.editReply(view);
}

module.exports = { run };