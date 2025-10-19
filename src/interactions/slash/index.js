// === Imports ===
const { MessageFlags } = require('discord.js');
// Turnier-Befehle
const achievements        = require('./achievements');
const arena               = require('./arena');
const boss                = require('./boss');
const dungeon             = require('./dungeon');
const bracket             = require('./bracket');
const challenges          = require('./challenges');
const ergebnis_setzen     = require('./ergebnis_setzen');
const ergebnisse_wuerfeln = require('./ergebnisse_wuerfeln');
const fake_anmeldungen    = require('./fake_anmeldungen');
const hall_of_fame        = require('./hall_of_fame');
const hilfe               = require('./hilfe');
const language            = require('./language');
const guild_name          = require('./guild_name');
const hof_loeschen        = require('./hof_loeschen');
const pott_setzen         = require('./pott_setzen');
const pvp_info            = require('./pvp_info');
const pvp_next            = require('./pvp_next');
const pvp_start           = require('./pvp_start');
const pvp_stop            = require('./pvp_stop');
const regeln              = require('./regeln');
const registrieren        = require('./registrieren')
const teilnehmer_ersetzen = require('./teilnehmer_ersetzen');
// PvM-Befehle
const add_dungeon         = require('./add_dungeon');
const pvm_start           = require('./pvm_start');
const pvm_stop            = require('./pvm_stop');

// Map mit Handlern
const map = new Map([
  //Turnier-Befehle
  ['achievements', achievements],
  ['arena', arena],
  ['boss', boss],
  ['challenges', challenges],
  ['dungeon', dungeon],
  ['bracket', bracket],
  ['ergebnis_setzen', ergebnis_setzen],
  ['ergebnisse_wuerfeln', ergebnisse_wuerfeln],
  ['fake_anmeldungen', fake_anmeldungen],
  ['hall_of_fame', hall_of_fame],
  ['hilfe', hilfe],
  ['language', language],
  ['guild_name', guild_name],
  ['hof_loeschen', hof_loeschen],
  ['pott_setzen', pott_setzen],
  ['regeln', regeln],
  ['registrieren', registrieren],
  ['teilnehmer_ersetzen', teilnehmer_ersetzen],
  ['pvp_info', pvp_info],
  ['pvp_next', pvp_next],
  ['pvp_start', pvp_start],
  ['pvp_stop', pvp_stop],
  // PvM-Befehle
  ['add_dungeon', add_dungeon],
  ['pvm_start', pvm_start],
  ['pvm_stop', pvm_stop]
]);

// Slash-Command Handler
async function handleSlash(interaction, daten) {
  const h = map.get(interaction.commandName);
  if (!h || typeof h.execute !== 'function') {
    return interaction.reply({ content: `❌ Kein Handler für /${interaction.commandName} (noch nicht verdrahtet).`, flags: MessageFlags.Ephemeral });
  }
  try {
    return await h.execute(interaction, daten);
  } catch (err) {
    console.error('[slash]', interaction.commandName, err);
    const errorMsg = { content: '❌ Fehler beim Ausführen des Befehls.', flags: MessageFlags.Ephemeral };
    return interaction.replied || interaction.deferred
      ? interaction.followUp(errorMsg)
      : interaction.reply(errorMsg);
  }
};

// === Exports ===
module.exports = { handleSlash };