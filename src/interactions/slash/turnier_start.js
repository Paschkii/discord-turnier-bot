// === Imports ===
const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const {
  getLatestTournamentRow,
  getNextTournamentNumber,
  insertNewTournamentRow
} = require('../../store/turniere');
const { buildRulesEmbeds } = require('../../embeds/rules');

// Turnier starten
async function execute(interaction) {
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    await interaction.reply({ content: '⛔ Nur Admins können das Turnier starten.', flags: MessageFlags.Ephemeral });
    return;
  }
  // Interaktion bestätigen, damit Discord die Anfrage nicht verwirft
  await interaction.deferReply({ ephemeral: true });

  // Prüfen, ob bereits ein Turnier läuft
  const latest = await getLatestTournamentRow();
  if (latest && ['offen','quali','gruppen','ko','finale'].includes(latest.status)) {
    await interaction.editReply({ content: '⚠️ Es läuft bereits ein Turnier.', flags: MessageFlags.Ephemeral });
    return;
  }
  // Neues Turnier anlegen
  const modus = '1v1'; // Derzeit nur 1v1 unterstützt
  const num = await getNextTournamentNumber();
  const name = `Nemesis Turnier #${num}`; // Zukünftig evtl. anpassbar machen
  const neuesTurnier = { name, status: 'offen', modus, teilnehmer: {}, teams: [], kämpfe: [], groups: [], kampfLog: [] };

  await insertNewTournamentRow(neuesTurnier);

  // Rückmeldung
  await interaction.editReply({ content: `✅ Neues Turnier gestartet: **${name}** (Modus **${modus}**)` });
  const embeds = buildRulesEmbeds(neuesTurnier);
  await interaction.followUp({ embeds });
}

// === Exports ===
module.exports = { execute };