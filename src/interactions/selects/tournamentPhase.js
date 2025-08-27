// === Phase/Runden - Auswahl (Select Menu) ===
const { buildDashboard } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');

async function run(interaction) {
  const id = interaction.customId || '';
  const [head, kind, tab, phase, bucket, groupIx, pageStr] = id.split('|');
  const newVal = interaction.values?.[0];

  let state = { tab, phaseOrRound: newVal, bucket, groupIx, page: parseInt(pageStr, 10) || 1 };

  // Phase-Wechsel → Page reset, Gruppe auf 0 (falls vorhanden)
  state.page = 1;
  if (state.tab !== 'b') state.groupIx = 0;

  const daten = await ladeTurnier();
  const view = await buildDashboard(interaction, daten, state);
  await interaction.deferUpdate();
  return interaction.editReply(view);
}

module.exports = { run };