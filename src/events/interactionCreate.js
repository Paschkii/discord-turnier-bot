const handleSlash         = require('../interactions/slash');
const handleButtons       = require('../interactions/buttons');
const handleModals        = require('../interactions/modals');
const handleSelects       = require('../interactions/selects');
const autocomplete        = require('../interactions/autocomplete');
const { ladeTurnier }     = require('../store/turniere');
const { MessageFlags }    = require('discord.js');

async function onInteractionCreate(interaction) {
  if (
    !interaction.isChatInputCommand() &&
    !interaction.isButton() &&
    !interaction.isStringSelectMenu() &&
    !interaction.isAutocomplete() &&
    !interaction.isModalSubmit()
  ) return;

  try {
    // DB laden – aber Ausfälle abfangen!
    let daten = null;
    try {
      daten = await ladeTurnier();
    } catch (e) {
      console.error('[ladeTurnier] failed:', e?.message || e);
    }
    if (!daten) {
      daten = {
        name: 'Turnier', status: 'offen', modus: '1v1',
        teilnehmer: {}, teams: [], kämpfe: [], groups: [],
        pendingTieBreakers: [], kampfLog: [], prize: null,
      };
    }

    if (interaction.isAutocomplete()) {
      const h = autocomplete.get(interaction.commandName);
      if (h && typeof h.run === 'function') return h.run(interaction);
      // Fallback: leere Liste zurückgeben, damit Discord zufrieden ist
      try { return interaction.respond([]); } catch {}
      return;
    }
    if (interaction.isChatInputCommand()) {
      console.log('[slash] cmd =', interaction.commandName);
      return handleSlash(interaction, daten);
    }
    if (interaction.isModalSubmit())      return handleModals(interaction, daten);
    if (interaction.isStringSelectMenu()) return handleSelects(interaction, daten);
    if (interaction.isButton())           return handleButtons(interaction, daten);

  } catch (err) {
    console.error('[interactionCreate]', err);
    const reply = { content: '❌ Unerwarteter Fehler bei der Interaktion.', flags: MessageFlags.Ephemeral };
    return interaction.replied || interaction.deferred
      ? interaction.followUp(reply)
      : interaction.reply(reply);
  }
}

module.exports = { onInteractionCreate };