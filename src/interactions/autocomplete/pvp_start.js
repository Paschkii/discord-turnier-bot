// Moduse für Turnierstart
const MODES = ['1v1', '2v2', '3v3', '4v4'];
// === Handler ===
// Handhabt Autocomplete-Interaktionen für den Turniermodus
async function run(interaction) {
  const focused = interaction.options.getFocused(true);
  if (!focused || focused.name !== 'modus') {
    try { await interaction.respond([]); } catch {}
    return;
  }
  // Eingabe abgleichen
  const query = (focused.value ?? '').toString().toLowerCase();
  // Mögliche Werte filtern und zurückgeben
  const choices = MODES
    .filter(mode => mode.toLowerCase().includes(query))
    .slice(0, 25)
    .map(mode => ({ name: mode, value: mode }));
  // Antwort senden
  try {
    await interaction.respond(choices);
  } catch (err) {
    // Antwort wurde möglicherweise schon gesendet – ignorieren
  }
}

// === Export ===
module.exports = { run };