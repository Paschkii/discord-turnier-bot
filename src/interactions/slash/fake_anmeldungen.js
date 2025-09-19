// === Imports ===
const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { ladeTurnier, speichereTurnier } = require('../../store/turniere');
const { KLASSE_LISTE } = require('../../config/constants');

// Fake-Anmeldungen hinzufügen
async function execute(interaction) {
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '⛔ Nur Admins.', flags: MessageFlags.Ephemeral });
  }
  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: '❌ Dieser Befehl kann nur in einem Server verwendet werden.', flags: MessageFlags.Ephemeral });
  }
  const n = interaction.options.getInteger('anzahl') || 0;
  if (n <= 0) return interaction.reply({ content: 'Bitte eine Anzahl > 0 angeben.', flags: MessageFlags.Ephemeral });

  const daten = await ladeTurnier(guildId);
  if (!daten || daten.status !== 'offen') return interaction.reply({ content: '❌ Anmeldung aktuell nicht offen.', flags: MessageFlags.Ephemeral });

  daten.teilnehmer = daten.teilnehmer || {};
  for (let i = 0; i < n; i++) {
    const id = `fake_${Date.now()}_${i}`;
    const klasse = KLASSE_LISTE[Math.floor(Math.random() * KLASSE_LISTE.length)]?.name;
    daten.teilnehmer[id] = { name: `Fake${i+1}`, klasse };
  }
  await speichereTurnier(guildId, daten);
  return interaction.reply({ content: `✅ ${n} Fake-Teilnehmer hinzugefügt.` });
}

// === Exports ===
module.exports = { execute };