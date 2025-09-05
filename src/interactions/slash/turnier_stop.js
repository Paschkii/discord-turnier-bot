// === Imports ===
const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const {
  closeAndClearLatestTournament,
  getLatestTournamentRow,
  ladeTurnier
} = require('../../store/turniere');

// Turnier stoppen
async function execute(interaction) {
  const latest = await getLatestTournamentRow();
  if (!latest) return interaction.reply({ content: '❌ Kein aktives Turnier gefunden.', flags: MessageFlags.Ephemeral });
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '❌ Nur Admins können das Turnier beenden.', flags: MessageFlags.Ephemeral });
  }
  try {
    await closeAndClearLatestTournament();
    const check = await ladeTurnier();
    const ok = check && check.status !== 'offen' && Object.keys(check.teilnehmer || {}).length === 0;
    return interaction.reply({
      content: ok
        ? '🛑 Turnierdaten wurden **sauber beendet** (Status geschlossen, alle Teilnehmer/Kämpfe gelöscht).'
        : 'ℹ️ Turnier wurde beendet. Falls weiterhin „aktiv“ angezeigt wird, bitte Bot neu starten.',
    });
  } catch (err) {
    console.error(err);
    return interaction.reply({ content: '❌ Fehler beim Beenden.', flags: MessageFlags.Ephemeral });
  }
}

// === Exports ===
module.exports = { execute };