// === Imports ===
const { buildDashboard } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');

// === Functions ===
// Turnier-Phasenwahl
async function run(interaction) {
  const id = interaction.customId || '';
  if (!id.startsWith('tnav|phase|')) return;

  // tnav|phase|<tab>|<phaseOrRound>|x|x|<page>
  const [, , tab, _oldPhase, , , pageStr] = id.split('|');
  const newVal = interaction.values?.[0];
  const state  = { tab, phaseOrRound: newVal, page: 1 };

  const daten = await ladeTurnier();
  await interaction.deferUpdate();
  const view = await buildDashboard(interaction, daten, state);
  return interaction.editReply(view);
}

// === Exports ===
module.exports = { run };