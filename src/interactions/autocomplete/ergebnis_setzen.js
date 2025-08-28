const { ladeTurnier } = require('../../store/turniere');

module.exports = {
  async run(interaction) {
    const focused = interaction.options.getFocused(true);
    const data = (await ladeTurnier()) || {};
    const fights = Array.isArray(data.kämpfe) ? data.kämpfe : [];
    const groups = Array.isArray(data.groups) ? data.groups : [];
    const q = (focused?.value || '').toString().toLowerCase().trim();

    const labelFight = (f) => {
      const a = f.playerA?.name ?? '—';
      const b = f.playerB?.name ?? '—';
      return `${a} vs ${b} (#${f.id})`;
    };

    if (focused?.name === 'gruppe') {
      const list = groups
        .map(g => g.name || g.displayName)
        .filter(Boolean)
        .filter(n => n.toLowerCase().includes(q))
        .slice(0, 25)
        .map(n => ({ name: n, value: n }));
      try { await interaction.respond(list); } catch {}
      return;
    }

    if (focused?.name === 'kampf') {
      const selectedGroup = interaction.options.getString('gruppe') || groups[0]?.name || null;

      let pool = fights.filter(f => {
        if (f.groupName) return selectedGroup ? f.groupName === selectedGroup : true;
        const phaseNow = data.status || 'quali';
        return f.phase === phaseNow;
      });

      if (q) {
        const idMatch = q.replace('#','').match(/^\d+$/);
        if (idMatch) {
          pool = pool.filter(f => String(f.id).includes(idMatch[0]));
        } else {
          pool = pool.filter(f => (labelFight(f) + ' ' + f.id).toLowerCase().includes(q));
        }
      }

      // offene zuerst, dann lokale Match-Nr., dann ID
      pool.sort((x, y) => {
        if (x.finished !== y.finished) return x.finished ? 1 : -1;
        const lx = x.localId || 0, ly = y.localId || 0;
        if (lx !== ly) return lx - ly;
        return (x.id || 0) - (y.id || 0);
      });

      const choices = pool.slice(0, 25).map(f => ({ name: labelFight(f), value: String(f.id) }));
      try { await interaction.respond(choices); } catch {}
      return;
    }

    // falls kein passendes Feld gefocused ist
    try { await interaction.respond([]); } catch {}
  }
};