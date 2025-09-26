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
  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: '❌ Dieser Befehl kann nur in einem Server verwendet werden.', flags: MessageFlags.Ephemeral });
  }

  const latest = await getLatestTournamentRow(guildId);
  if (!latest || latest.status === 'geschlossen' || latest.status === 'abgeschlossen') {
    return interaction.reply({ content: '❌ Kein laufendes Turnier gefunden.', flags: MessageFlags.Ephemeral });
  }
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '❌ Nur Admins können das Turnier beenden.', flags: MessageFlags.Ephemeral });
  }
  try {
    const rawDaten = latest.daten ? (() => { try { return JSON.parse(latest.daten); } catch { return {}; } })() : {};
    const turnierName = latest.name || rawDaten.name || 'Turnier';
    await closeAndClearLatestTournament(guildId);
    const check = await ladeTurnier(guildId);
    
    const ok = !check || check.status === 'geschlossen';
    const suffix = ok ? '' : ' (Bitte Bot neu starten, falls weiterhin „aktiv“ angezeigt wird.)';
    return interaction.reply({ content: `🏆 ${turnierName} wurde beendet${suffix}` });
  } catch (err) {
    console.error(err);
    return interaction.reply({ content: '❌ Fehler beim Beenden.', flags: MessageFlags.Ephemeral });
  }
}

// === Exports ===
module.exports = { execute };