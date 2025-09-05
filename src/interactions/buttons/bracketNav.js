// === Imports ===
const { buildDashboard } = require('../../views/dashboard');

// === Hilfsfunktionen ===
// Nächste bzw. vorherige Runde im Bracket
function nextRound(k) { return k === 'QF' ? 'SF' : (k === 'SF' ? 'F' : 'QF'); }
function prevRound(k) { return k === 'F'  ? 'SF' : (k === 'SF' ? 'QF' : 'F'); }

// === Button-Handler ===
// Bracket-Navigation
async function run(interaction, daten) {
  const [ , action, bucket0, round0 ] = (interaction.customId || '').split('_');
  let bucket = bucket0, roundKey = round0;

  if (action === 'swap') bucket = (bucket0 === 'top') ? 'low' : 'top';
  if (action === 'next') roundKey = nextRound(round0);
  if (action === 'prev') roundKey = prevRound(round0);

  const state = { tab: 'b', phaseOrRound: roundKey, bucket, groupIx: 0, page: 1 };
  const view = await buildDashboard(interaction, daten, state);

  await interaction.deferUpdate();
  return interaction.editReply(view);
}

// Prüfen, ob der gegebene CustomId-String von diesem Handler verarbeitet werden kann
function canHandle(id) {
  return id.startsWith('brkt_');
}

// === Exports ===
module.exports = { run, canHandle };