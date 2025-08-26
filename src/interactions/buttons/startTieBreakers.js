const {
  EmbedBuilder,
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { speichereTurnier } = require('../../store/turniere');

module.exports = {
  async run(interaction, daten) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '⛔ Nur Admins dürfen Tie-Breaker starten.', flags: MessageFlags.Ephemeral });
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
    daten.pendingTieBreakers = [];
    await speichereTurnier(daten);

    const desc = created.map(f => `• Kampf: ${f.playerA.name} vs ${f.playerB.name} — ${f.scoreA}:${f.scoreB} ⏳ (Bo1)`).join('\n');
    const embed = new EmbedBuilder().setColor(0xff5555).setTitle('🧮 Tie-Breaker erstellt').setDescription(desc || '—');
    return interaction.reply({ embeds: [embed] });
  }
};