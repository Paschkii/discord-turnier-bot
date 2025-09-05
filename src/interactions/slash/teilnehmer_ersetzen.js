// === Imports ===
const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { ladeTurnier, speichereTurnier } = require('../../store/turniere');

// Teilnehmer ersetzen/aktualisieren
async function execute(interaction) {
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '⛔ Nur Admins.', flags: MessageFlags.Ephemeral });
  }
  const oldId = interaction.options.getString('alte_id', true);
  const newId = interaction.options.getString('neue_id', false);
  const newName = interaction.options.getString('name', false);
  const newClass = interaction.options.getString('klasse', false);

  const daten = await ladeTurnier();
  if (!daten?.teilnehmer?.[oldId]) return interaction.reply({ content: '❌ Alter Teilnehmer nicht gefunden.', flags: MessageFlags.Ephemeral });

  const t = daten.teilnehmer[oldId];
  if (newId && newId !== oldId) {
    daten.teilnehmer[newId] = { ...t };
    delete daten.teilnehmer[oldId];
  }
  const id = newId || oldId;
  if (newName) daten.teilnehmer[id].name = newName;
  if (newClass) daten.teilnehmer[id].klasse = newClass;

  // Optional: Kämpfe mappen, wenn ID geändert wurde
  if (newId && newId !== oldId) {
    for (const f of daten.kämpfe || []) {
      if (f.playerA?.id === oldId) f.playerA.id = newId;
      if (f.playerB?.id === oldId) f.playerB.id = newId;
    }
  }

  await speichereTurnier(daten);
  return interaction.reply({ content: '✏️ Teilnehmer aktualisiert.' });
}

// === Exports ===
module.exports = { execute };