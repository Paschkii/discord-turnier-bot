// === Imports ===
const { MessageFlags } = require('discord.js');
const { buildDashboard, defaultStateFromData } = require('../../views/dashboard');
const { ladeTurnier } = require('../../store/turniere');

// Hilfsparser für alle tnav-IDs (tab | page)
function parseStateFromId(parts) {
  const kind = parts[1];

  if (kind === 'tab') {
    // tnav|tab|<tab>|<phase>|x|x|<page>
    const tab         = parts[2];
    const phaseOrRound= parts[3];
    return { tab, phaseOrRound, page: 1 }; // beim Tabwechsel immer Seite 1
  }

  if (kind === 'page') {
  // Kurzform: tnav|page|prev|<tab>|<phase>|<p>
  // (Optional weiterhin kompatibel mit der alten Langform)
    const dir   = parts[2];              // prev|next|noop
    const tab   = parts[3];
    const phase = parts[4];
    const pStr  = parts[5] ?? parts[7];  // kurz bevorzugt, sonst lang
    const curr  = parseInt(pStr, 10) || 1;

    return {
      tab,
      phaseOrRound: phase,
      page: Math.max(1, curr + (dir === 'next' ? 1 : dir === 'prev' ? -1 : 0)),
    };
  }

  return null; // Unbekannter Typ
}

// Prüft, ob die Interaktion von diesem Handler verarbeitet werden kann.
function canHandle(id) {
  return typeof id === 'string' && id.startsWith('tnav|');
}

// Haupt-Handler für Turnier-Navigation
async function run(interaction) {
  const id    = interaction.customId || '';
  if (!id.startsWith('tnav|')) return;

  const parts = id.split('|');
  const state = parseStateFromId(parts);
  if (!state) return; // unbekannter Typ

  // Interaktion sofort bestätigen, um den "Lade..."-Status zu entfernen.
  try {
    await interaction.deferUpdate();
  } catch (err) {
    // Ignoriere Fehler, wenn die Interaktion bereits beantwortet wurde.
    if (err?.code === 10062) return;
    throw err;
  }

  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: '❌ Aktion nur innerhalb eines Servers möglich.', flags: MessageFlags.Ephemeral });
  }
  const daten = await ladeTurnier(guildId);
  if (!daten) {
    return interaction.followUp({ content: '❌ Kein aktives Turnier.', flags: MessageFlags.Ephemeral });
  }

// State mit Daten füllen
const finalState = state || defaultStateFromData(daten, 'g');
  const view = await buildDashboard(interaction, daten, finalState);
  return interaction.editReply(view);
}

// === Exports ===
module.exports = { canHandle, run };