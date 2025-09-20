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
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

// Turnier starten
async function execute(interaction) {
  const guildId = interaction.guildId;
  if (!guildId) {
    await interaction.reply({ content: '❌ Dieser Befehl kann nur in einem Server verwendet werden.', flags: MessageFlags.Ephemeral });
    return;
  }
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    await interaction.reply({ content: '⛔ Nur Admins können das Turnier starten.', flags: MessageFlags.Ephemeral });
    return;
  }
  // Interaktion bestätigen, damit Discord die Anfrage nicht verwirft
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  // Prüfen, ob bereits ein Turnier läuft
  const latest = await getLatestTournamentRow(guildId);
  if (latest && ['offen','quali','gruppen','ko','finale'].includes(latest.status)) {
    await interaction.editReply({ content: '⚠️ Es läuft bereits ein Turnier.', flags: MessageFlags.Ephemeral });
    return;
  }
  // Neues Turnier anlegen
  const modus = '1v1'; // Derzeit nur 1v1 unterstützt
  const num = await getNextTournamentNumber(guildId);
  const name = `Nemesis Turnier #${num}`; // Zukünftig evtl. anpassbar machen
  const neuesTurnier = { name, status: 'offen', modus, teilnehmer: {}, teams: [], kämpfe: [], groups: [], kampfLog: [] };

  await insertNewTournamentRow(guildId, neuesTurnier);

  // Rückmeldung
  await interaction.editReply({ content: `✅ Neues Turnier gestartet: **${name}** (Modus **${modus}**)` });
  const locale = await resolveInteractionLocale(interaction);
  const embeds = buildRulesEmbeds(neuesTurnier, locale);
  await interaction.followUp({ embeds });
}

// === Exports ===
module.exports = { execute };