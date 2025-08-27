// === Gruppen - Auswahl (Select Menu) ===
const { buildDashboard } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');

async function run(interaction) {
  const id = interaction.customId || '';
  const [head, kind, tab, phase, bucket, groupIx, pageStr] = id.split('|');
  const newIx = interaction.values?.[0] ?? groupIx;

  const daten = await ladeTurnier();
  const state = { tab, phaseOrRound: phase, bucket, groupIx: newIx, page: 1 };

  const view = await buildDashboard(interaction, daten, state);
  await interaction.deferUpdate();
  return interaction.editReply(view);
}

module.exports = { run };