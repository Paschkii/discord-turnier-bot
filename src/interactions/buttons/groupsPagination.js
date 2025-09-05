// === Imports ===
const { buildPagedGroupReply } = require('../../embeds/groups');
const { MessageFlags } = require('discord.js');

// === Module-level Variables ===
async function run(interaction, daten) {
  // customId: pg_groups_prev_<n> / pg_groups_next_<n>
  const [, , dir, n] = (interaction.customId || '').split('_');
  const current = parseInt(n, 10) || 1;
  const nextPage = dir === 'prev' ? current - 1 : current + 1;

  const { embeds, components } = buildPagedGroupReply(daten, nextPage, 10);

  try {
    // wichtig: erst deferren, dann DIESELBE Nachricht updaten
    await interaction.deferUpdate();
    return interaction.editReply({ embeds, components });
  } catch (err) {
    // Fallback: neue (ephemere) Antwort – nur hier sind Flags relevant
    try {
      return interaction.followUp({ embeds, components, flags: MessageFlags.Ephemeral });
    } catch (_) {
      // finaler Fallback: nichts tun
    }
  }
}

// === Exports ===
module.exports = { run };