// === Imports ===
const setscore = require('./setscore');
const setprize = require('./setprize');
const languageModal = require('./language');
const { LANGUAGE_MODAL_CUSTOM_ID } = require('../language/helpers');

async function handleModals(interaction, daten) {
  const cid = interaction.customId || '';
  if (cid.startsWith('setscore_')) return setscore.run(interaction, daten);  // Admin setzt Ergebnis
  if (cid === 'setprize')          return setprize.run(interaction, daten);  // Pott setzen
  if (cid === LANGUAGE_MODAL_CUSTOM_ID) return languageModal.run(interaction); // /language Modal
}

// === Exports ===
module.exports = { handleModals };