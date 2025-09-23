// === Imports ===
const setscore = require('./setscore');
const setprize = require('./setprize');

async function handleModals(interaction, daten) {
  const cid = interaction.customId || '';
  if (cid.startsWith('setscore_')) return setscore.run(interaction, daten);  // Admin setzt Ergebnis
  if (cid === 'setprize')          return setprize.run(interaction, daten);  // Pott setzen
}

// === Exports ===
module.exports = { handleModals };