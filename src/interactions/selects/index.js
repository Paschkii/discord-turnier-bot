const klassenwahl = require('./klassenwahl');
const bracketRound = require('./bracketRound');

module.exports = async function handleSelects(interaction, daten) {
  const id = interaction.customId || '';
  if (id.startsWith('klasse_auswahl_')) return klassenwahl.run(interaction, daten); // deine Klassenwahl
  if (id.startsWith('brkt_round_')) return bracketRound.run(interaction, daten); // Bracket-Rundenwahl
};
