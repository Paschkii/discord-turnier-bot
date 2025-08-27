const klassenwahl = require('./klassenwahl');
const bracketRound = require('./bracketRound');
const tournamentPhase = require('./tournamentPhase');
const tournamentGroup = require('./tournamentGroup');

module.exports = async function handleSelects(interaction, daten) {
  const id = interaction.customId || '';
  if (id.startsWith('klasse_auswahl_')) return klassenwahl.run(interaction, daten); // deine Klassenwahl
  if (id.startsWith('brkt_round_')) return bracketRound.run(interaction, daten); // Bracket-Rundenwahl
  if (id.startsWith('tnav_phase|')) return tournamentPhase.run(interaction); // Tournament Dashboard Phase-Auswahl
  if (id.startsWith('tnav_group|')) return tournamentGroup.run(interaction); // Tournament Dashboard Gruppen-Auswahl
};
