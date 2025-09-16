
// === Imports ===
// Handhabt Autocomplete-Interaktionen
const map = new Map([
  ['boss', require('./boss')],
  ['ergebnis_setzen', require('./ergebnis_setzen')],
]);
// === Getter ===
// Holt den Handler für den gegebenen Befehl
function get(name) {
  return map.get(name);
}

// === Exports ===
module.exports = { get };