const { ladeTurnier } = require('../../store/turniere');

module.exports = {
  // keine .execute; hier heißt es z. B. .run
  async run(interaction) {
    const data = (await ladeTurnier()) || {};
    const fights = Array.isArray(data.kämpfe) ? data.kämpfe : [];
    const groups = Array.isArray(data.groups) ? data.groups : [];
    const focused = interaction.options.getFocused(true);
    const qRaw = (focused?.value || '').toString().toLowerCase().trim();

    const labelFight = (f) => {
      const a = f.playerA?.name ?? '—';
      const b = f.playerB?.name ?? '—';
      const grp = f.groupName ? ` (${f.groupName}${f.localId ? ` #${f.localId}` : ''})` : '';
      return `${a} vs ${b}${grp} [ID ${f.id}]`;
    };

    if (focused?.name === 'gruppe') {
      const list = groups.map(g => g.name).filter(n => n && n.toLowerCase().includes(qRaw))
        .slice(0, 25).map(n => ({ name: n, value: n }));
      try { await interaction.respond(list); } catch {}
      return;
    }

    if (focused?.name === 'kampf') {
      const selectedGroup = interaction.options.getString('gruppe') || groups[0]?.name || null;
      let pool = fights.filter(f => f.groupName ? (selectedGroup ? f.groupName === selectedGroup : true)
                                               : (f.phase === (data.status || 'quali')));
      if (qRaw) {
        const idMatch = qRaw.replace('#','').match(/^\d+$/);
        pool = idMatch ? pool.filter(f => String(f.id).includes(idMatch[0]))
                       : pool.filter(f => (labelFight(f) + ' ' + f.id).toLowerCase().includes(qRaw));
      }
      pool.sort((x, y) => (x.finished === y.finished ? ((x.localId||0)-(y.localId||0) || (x.id||0)-(y.id||0)) : x.finished ? 1 : -1));
      const choices = pool.slice(0, 25).map(f => ({ name: labelFight(f), value: String(f.id) }));
      try { await interaction.respond(choices); } catch {}
    }
  }
};
