const { PermissionsBitField } = require('discord.js');
const { getLatestTournamentRow, closeAndClearLatestTournament, ladeTurnier } = require('../../store/turniere');

module.exports = {
  async execute(interaction) {
    const latest = await getLatestTournamentRow();
    if (!latest) return interaction.reply({ content: '❌ Kein aktives Turnier gefunden.', ephemeral: true });
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '❌ Nur Admins können das Turnier beenden.', ephemeral: true });
    }
    try {
      await closeAndClearLatestTournament();
      const check = await ladeTurnier();
      const ok = check && check.status !== 'offen' && Object.keys(check.teilnehmer || {}).length === 0;
      return interaction.reply({
        content: ok
          ? '🛑 Turnierdaten wurden **sauber beendet** (Status geschlossen, alle Teilnehmer/Kämpfe gelöscht).'
          : 'ℹ️ Turnier wurde beendet. Falls weiterhin „aktiv“ angezeigt wird, bitte Bot neu starten.',
        ephemeral: false
      });
    } catch (err) {
      console.error(err);
      return interaction.reply({ content: '❌ Fehler beim Beenden.', ephemeral: true });
    }
  }
};
