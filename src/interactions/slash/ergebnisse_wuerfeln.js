const { PermissionsBitField } = require('discord.js');
const { speichereTurnier } = require('../../store/turniere');
const { buildPagedGroupReply } = require('../../embeds/groups');

module.exports = {
  async execute(interaction, daten) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '⛔ Nur Admins dürfen das.', ephemeral: true });
    }

    const fights = Array.isArray(daten.kämpfe) ? daten.kämpfe : [];
    if (!fights.length) {
      return interaction.reply({ content: 'ℹ️ Keine Kämpfe in der aktuellen Phase.', ephemeral: true });
    }

    const nurOffene = interaction.options.getBoolean('nur_offene');
    const bestOfForPhase = (f) => f.bestOf || (daten.status === 'quali' ? 1 : 3);

    let changed = 0;
    for (const f of fights) {
      if (nurOffene !== false && f.finished) continue;

      const bo = bestOfForPhase(f);
      let pairs = [];
      if (bo === 1) pairs = [[1, 0], [0, 1]];
      else if (bo === 3) pairs = [[2, 1], [1, 2], [2, 0], [0, 2]];
      else {
        for (let a = 0; a <= bo; a++) {
          const b = bo - a;
          if (a !== b) pairs.push([a, b]);
        }
      }

      const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
      f.scoreA = a; f.scoreB = b; f.finished = true;
      f.winnerId = a > b ? f.playerA.id : f.playerB.id;
      f.timestamp = new Date().toISOString();
      changed++;
    }

    await speichereTurnier(daten);
    const { embeds, components } = buildPagedGroupReply(daten, 1, 10);
    return interaction.reply({
      content: `🎲 Zufalls-Ergebnisse gesetzt: **${changed}** Kampf/Kämpfe aktualisiert.`,
      embeds, components, ephemeral: false
    });
  }
};