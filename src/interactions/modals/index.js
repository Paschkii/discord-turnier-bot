// === Imports ===
const setscore = require('./setscore');
const setprize = require('./setprize');

async function handleModals(interaction, daten) {
  const cid = interaction.customId || '';
  if (cid.startsWith('setscore_')) return setscore.run(interaction, daten);  // Admin setzt Ergebnis :contentReference[oaicite:6]{index=6}
  if (cid === 'setprize')          return setprize.run(interaction, daten);  // Pott setzen :contentReference[oaicite:7]{index=7}
}

// === Exports ===
module.exports = { handleModals };