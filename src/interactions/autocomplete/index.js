const map = new Map([
  ['ergebnis_setzen', require('./ergebnis_setzen')],
]);

module.exports = {
  get: (name) => map.get(name),
};