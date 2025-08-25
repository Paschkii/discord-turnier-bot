const klassenwahl = require('./klassenwahl');

module.exports = async function handleSelects(interaction, daten) {
  const id = interaction.customId || '';
  if (id.startsWith('klasse_auswahl_')) return klassenwahl.run(interaction, daten); // deine Klassenwahl :contentReference[oaicite:16]{index=16}
};
