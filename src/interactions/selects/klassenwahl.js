// === Imports ===
const { KLASSE_LISTE } = require('../../config/constants');
const { ladeTurnier, speichereTurnier } = require('../../store/turniere');
const { MessageFlags } = require('discord.js');

// === Functions ===
// deine Klassenwahl
async function run(interaction) {
  const userId = interaction.customId.split('_').pop();
  if (interaction.user.id !== userId) {
    return interaction.reply({ content: '⛔ Nur du darfst deine Klasse auswählen!', flags: MessageFlags.Ephemeral });
  }
  await interaction.deferUpdate();
  const selectedClass = interaction.values?.[0];

  const db2 = await ladeTurnier();
  if (!db2) return interaction.followUp({ content: '❌ Kein aktives Turnier gefunden.', flags: MessageFlags.Ephemeral });
  if (db2.status !== 'offen') return interaction.followUp({ content: '❌ Das Turnier ist nicht mehr offen.', flags: MessageFlags.Ephemeral });
  if (db2.teilnehmer?.[interaction.user.id]) {
    return interaction.followUp({ content: '⚠️ Du bist bereits angemeldet.', flags: MessageFlags.Ephemeral });
  }
  const valid = KLASSE_LISTE.some((k) => k.name === selectedClass);
  if (!valid) return interaction.followUp({ content: '❌ Ungültige Klasse ausgewählt.', flags: MessageFlags.Ephemeral });

  const member = await interaction.guild.members.fetch(interaction.user.id).catch(() => null);
  const nickname = member?.nickname || interaction.user.globalName || interaction.user.username;

  db2.teilnehmer = db2.teilnehmer || {};
  db2.teilnehmer[interaction.user.id] = { name: nickname, klasse: selectedClass };
  await speichereTurnier(db2);

  return interaction.followUp({ content: `✅ ${nickname} wurde als **${selectedClass}** erfolgreich angemeldet!` });
}

// === Exports ===
module.exports = { run };