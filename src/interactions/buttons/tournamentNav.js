const { MessageFlags } = require('discord.js');
const { buildDashboard, defaultStateFromData } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');

// Hilfsparser für alle tnav-IDs (tab | page | phase)
function parseStateFromId(parts, interaction) {
  const kind = parts[1];

  if (kind === 'tab') {
    // tnav|tab|<tab>|<phase>|x|x|<page>
    const tab         = parts[2];
    const phaseOrRound= parts[3];
    return { tab, phaseOrRound, page: 1 }; // beim Tabwechsel immer Seite 1
  }

  if (kind === 'page') {
    // Lang:  tnav|page|prev|<tab>|<phase>|x|x|<p>
    // Kurz:  tnav|page|prev|<tab>|<phase>|<p>
    const dir          = parts[2];                            // prev|next|noop
    const tab          = parts[3];
    const phaseOrRound = parts[4];
    const pStr         = parts[7] || parts[5];                // lang ODER kurz
    const curr         = parseInt(pStr, 10) || 1;
    const page         = dir === 'next' ? curr + 1 : dir === 'prev' ? curr - 1 : curr;
    return { tab, phaseOrRound, page: Math.max(1, page) };
  }

  if (kind === 'phase') {
    // tnav|phase|<tab>|<currentPhase>|...|...|<page>
    const tab          = parts[2] || 'g';
    // Bei Select-Menüs kommt der neue Wert über interaction.values[0]
    const selected     = (interaction.values && interaction.values[0]) || parts[3] || 'gr';
    return { tab, phaseOrRound: selected, page: 1 }; // Phasenwechsel -> Seite 1
  }

  return null; // Unbekannter Typ
}

module.exports = {
  canHandle: (id) => typeof id === 'string' && id.startsWith('tnav|'),

  async run(interaction) {
    const id    = interaction.customId || '';
    if (!id.startsWith('tnav|')) return;

    const parts = id.split('|');
    const state = parseStateFromId(parts, interaction);
    if (!state) return; // noop

    const daten = await ladeTurnier();
    if (!daten) {
      return interaction.reply({ content: '❌ Kein aktives Turnier.', flags: MessageFlags.Ephemeral });
    }

    const finalState = state || defaultStateFromData(daten, 'g');
    await interaction.deferUpdate();
    const view = await buildDashboard(interaction, daten, state, finalState);
    return interaction.editReply(view);
  }
};