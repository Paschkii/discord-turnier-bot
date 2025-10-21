// === Imports ===
const { buildDashboard } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');
const { MessageFlags } = require('discord.js')
const { getLocalizedString } = require('../../config/messages');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

// === Functions ===
// Turnier-Phasenwahl
async function run(interaction) {
  const locale = await resolveInteractionLocale(interaction);
  const id = interaction.customId || '';
  if (!id.startsWith('tnav|phase|')) return;

  // tnav|phase|<tab>|<phaseOrRound>|x|x|<page>
  const [, , tab, _oldPhase, , , pageStr] = id.split('|');
  const newVal = interaction.values?.[0];
  const state  = { tab, phaseOrRound: newVal, page: 1 };

  const guildId = interaction.guildId;
  if (!guildId) {
    const message = getLocalizedString('messages.tournament.general.guildOnlyAction', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }
  const daten = await ladeTurnier(guildId);
  await interaction.deferUpdate();
  const view = await buildDashboard(interaction, daten, state);
  return interaction.editReply(view);
}

// === Exports ===
module.exports = { run };