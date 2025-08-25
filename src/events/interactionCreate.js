// src/events/interactionCreate.js
const handleSlash        = require('../interactions/slash');
const handleButtons      = require('../interactions/buttons');
const handleModals       = require('../interactions/modals');
const handleSelects      = require('../interactions/selects');
const handleAutocomplete = require('../interactions/autocomplete');
const { ladeTurnier }    = require('../store/turniere');

async function onInteractionCreate(interaction) {
  // Nur relevante Typen durchlassen
  if (
    !interaction.isChatInputCommand() &&
    !interaction.isButton() &&
    !interaction.isStringSelectMenu() &&
    !interaction.isAutocomplete() &&
    !interaction.isModalSubmit()
  ) return;

  // Turnier-Snapshot einmal laden
  let daten = await ladeTurnier();
  if (!daten) {
    daten = {
      name: 'Turnier', status: 'offen', modus: '1v1',
      teilnehmer: {}, teams: [], kämpfe: [], groups: [],
      pendingTieBreakers: [], kampfLog: [], prize: null,
    };
  }

  try {
    if (interaction.isAutocomplete())     return handleAutocomplete(interaction, daten);
    if (interaction.isChatInputCommand()) return handleSlash(interaction, daten);
    if (interaction.isModalSubmit())      return handleModals(interaction, daten);
    if (interaction.isStringSelectMenu()) return handleSelects(interaction, daten);
    if (interaction.isButton())           return handleButtons(interaction, daten);
  } catch (err) {
    console.error('[interactionCreate]', err);
    const reply = { content: '❌ Unerwarteter Fehler bei der Interaktion.', ephemeral: true };
    return interaction.replied || interaction.deferred
      ? interaction.followUp(reply)
      : interaction.reply(reply);
  }
}

module.exports = { onInteractionCreate };
