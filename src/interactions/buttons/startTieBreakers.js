// === Imports ===
const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { speichereTurnier } = require('../../store/turniere');

// === Module-level Variables ===
// Tie-Breaker starten
async function run(interaction, daten) {
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '⛔ Nur Admins dürfen Tie-Breaker starten.', flags: MessageFlags.Ephemeral });
  }
  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: '❌ Diese Aktion ist nur innerhalb eines Servers möglich.', flags: MessageFlags.Ephemeral });
  }
  const list = Array.isArray(daten.pendingTieBreakers) ? daten.pendingTieBreakers : [];
  if (!list.length) return interaction.reply({ content: 'ℹ️ Keine ausstehenden Tie-Breaker.', flags: MessageFlags.Ephemeral });

    const created = [];
    for (const tb of list) {
      const g = (daten.groups || []).find(gr => gr.name === tb.groupName);
      const localId = (g?.matches?.length || 0) + 1;
      const [pA, pB] = tb.players;

    const ta = daten.teilnehmer[pA.id] || { name: pA.name };
    const tbp = daten.teilnehmer[pB.id] || { name: pB.name };

    const id = (Array.isArray(daten.kämpfe) && daten.kämpfe.length ? Math.max(...daten.kämpfe.map(x => x.id)) + 1 : 1);
    const fight = {
      id, phase: 'gruppen', groupName: tb.groupName, localId,
      playerA: { id: pA.id, name: pA.name, klasse: ta.klasse },
      playerB: { id: pB.id, name: pB.name, klasse: tbp.klasse },
      scoreA: 0, scoreB: 0, bestOf: 1, finished: false, timestamp: null, winnerId: null,
    };
    daten.kämpfe.push(fight);
    if (g) { g.matches = g.matches || []; g.matches.push({ ...fight }); }
    created.push(fight);
  }
  // Alle Tie-Breaker wurden erstellt
  daten.pendingTieBreakers = [];
  await speichereTurnier(guildId, daten);

  // Rückmeldung
  const desc = created
    .map(f => `⚠️ Tie-Breaker in ${f.groupName} nötig. Kampf ID: ${f.id}`)
    .join('\n');
  return interaction.reply({ content: desc || '—' });
}

// === Exports ===
module.exports = { run };