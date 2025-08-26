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

module.exports = {
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      await interaction.reply({ content: '⛔ Nur Admins können das Turnier starten.', flags: MessageFlags.Ephemeral });
      return;
    }

    const latest = await getLatestTournamentRow();
    if (latest && ['offen','quali','gruppen','ko','finale'].includes(latest.status)) {
      await interaction.reply({ content: '⚠️ Es läuft bereits ein Turnier.', flags: MessageFlags.Ephemeral });
      return;
    }

    const modus = '1v1';
    const num = await getNextTournamentNumber();
    const name = `Nemesis Turnier #${num}`;
    const neuesTurnier = { name, status: 'offen', modus, teilnehmer: {}, teams: [], kämpfe: [], groups: [], kampfLog: [] };

    await insertNewTournamentRow(neuesTurnier);

    await interaction.reply({ content: `✅ Neues Turnier gestartet: **${name}** (Modus **${modus}**)` });
    const embeds = buildRulesEmbeds(neuesTurnier);
    await interaction.followUp({ embeds });
  }
};