// === Imports ===
const { buildDashboard } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');
const { MessageFlags } = require('discord.js')

// === Functions ===
// Turnier-Gruppenwahl
async function run(interaction) {
  const id = interaction.customId || '';
  if (!id.startsWith('tnav|group|')) return;

  // tnav|group|<tab>|<phase>|<bucket>|<groupIx>|<page>
  const [, , tab, phase, bucket, _oldIx, _page] = id.split('|');
  const newIx = interaction.values?.[0] ?? '0';
  const state = { tab, phaseOrRound: phase, bucket, groupIx: newIx, page: 1 };

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