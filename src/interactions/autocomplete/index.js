const ergebnisSetzen = require('./ergebnis_setzen');

module.exports = async function handleAutocomplete(interaction, daten) {
  if (interaction.commandName === 'ergebnis_setzen') {
    return ergebnisSetzen.run(interaction, daten);
  }
};
