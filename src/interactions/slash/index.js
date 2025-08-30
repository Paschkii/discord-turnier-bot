const { MessageFlags } = require('discord.js');

const anmelden            = require('./anmelden');
const arena               = require('./arena');
const bracket             = require('./bracket');
const ergebnis_setzen     = require('./ergebnis_setzen');
const ergebnisse_wuerfeln = require('./ergebnisse_wuerfeln');
const fake_anmeldungen    = require('./fake_anmeldungen');
const hall_of_fame        = require('./hall_of_fame');
const hilfe               = require('./hilfe');
const hof_loeschen        = require('./hof_loeschen');
const pott_setzen         = require('./pott_setzen');
const regeln              = require('./regeln');
const teilnehmer_ersetzen = require('./teilnehmer_ersetzen');
const turnier_advance     = require('./turnier_advance');
const turnier_info        = require('./turnier_info');
const turnier_start       = require('./turnier_start');
const turnier_stop        = require('./turnier_stop');

const map = new Map([
  ['anmelden', anmelden],
  ['arena', arena],
  ['bracket', bracket],
  ['ergebnis_setzen', ergebnis_setzen],
  ['ergebnisse_wuerfeln', ergebnisse_wuerfeln],
  ['fake_anmeldungen', fake_anmeldungen],
  ['hall_of_fame', hall_of_fame],
  ['hilfe', hilfe],
  ['hof_loeschen', hof_loeschen],
  ['pott_setzen', pott_setzen],
  ['regeln', regeln],
  ['teilnehmer_ersetzen', teilnehmer_ersetzen],
  ['turnier_advance', turnier_advance],
  ['turnier_info', turnier_info],
  ['turnier_start', turnier_start],
  ['turnier_stop', turnier_stop],
]);

module.exports = async function handleSlash(interaction, daten) {
  const h = map.get(interaction.commandName);
  if (!h || typeof h.execute !== 'function') {
    return interaction.reply({ content: `❌ Kein Handler für /${interaction.commandName} (noch nicht verdrahtet).`, flags: MessageFlags.Ephemeral });
  }
  try {
    return await h.execute(interaction, daten);
  } catch (err) {
    console.error('[slash]', interaction.commandName, err);
    return interaction.reply({ content: '❌ Fehler beim Ausführen des Befehls.', flags: MessageFlags.Ephemeral });
  }
};