// === Imports ===
const { buildDashboard } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');
const { MessageFlags } = require('discord.js')

// === Functions ===
// Turnier-Phasenwahl
async function run(interaction) {
  const id = interaction.customId || '';
  if (!id.startsWith('tnav|phase|')) return;

  // tnav|phase|<tab>|<phaseOrRound>|x|x|<page>
  const [, , tab, _oldPhase, , , pageStr] = id.split('|');
  const newVal = interaction.values?.[0];
  const state  = { tab, phaseOrRound: newVal, page: 1 };

  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: '❌ Aktion nur innerhalb eines Servers möglich.', flags: MessageFlags.Ephemeral });
  }
  const daten = await ladeTurnier(guildId);
  await interaction.deferUpdate();
  const view = await buildDashboard(interaction, daten, state);
  return interaction.editReply(view);
}

// === Exports ===
module.exports = { run };