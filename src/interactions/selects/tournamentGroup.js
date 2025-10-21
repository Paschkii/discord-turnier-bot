// === Imports ===
const { buildDashboard } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');
const { MessageFlags } = require('discord.js')
const { getLocalizedString } = require('../../config/messages');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

// === Functions ===
// Turnier-Gruppenwahl
async function run(interaction) {
  const locale = await resolveInteractionLocale(interaction);
  const id = interaction.customId || '';
  if (!id.startsWith('tnav|group|')) return;

  // tnav|group|<tab>|<phase>|<bucket>|<groupIx>|<page>
  const [, , tab, phase, bucket, _oldIx, _page] = id.split('|');
  const newIx = interaction.values?.[0] ?? '0';
  const state = { tab, phaseOrRound: phase, bucket, groupIx: newIx, page: 1 };

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