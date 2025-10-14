
// === Imports ===
// Handhabt Autocomplete-Interaktionen
const map = new Map([
  ['add_dungeon', require('./dungeon')],
  ['boss', require('./boss')],
  ['dungeon', require('./dungeon')],
  ['ergebnis_setzen', require('./ergebnis_setzen')],
  ['pvp_start', require('./pvp_start')],
]);
// === Getter ===
// Holt den Handler für den gegebenen Befehl
function get(name) {
  return map.get(name);
}

// === Exports ===
module.exports = { get };