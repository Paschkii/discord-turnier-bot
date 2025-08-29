const { ladeTurnier } = require('../../store/turniere');

// kleine Helfer
const norm = (s) => (s || '')
  .toLowerCase()
  .replace(/[⬆️⬇️]/g, '')
  .replace(/\s+—\s+(viertelfinale|halbfinale|finale)/g, '') // Suffixe weg
  .trim();

function findGroupByLabel(data, label) {
  if (!label) return null;
  const target = norm(label);
  return (data.groups || []).find(g => {
    const n1 = norm(g.name);
    const n2 = norm(g.displayName);
    return (n1 && n1 === target) || (n2 && n2 === target);
  }) || null;
}

function fightBelongsToGroup(f, g) {
  if (!g) return true; // wenn keine Gruppe gewählt, nicht filtern
  const fg = norm(f.groupName);
  return fg && (fg === norm(g.name) || fg === norm(g.displayName));
}

function labelFightShort(f) {
  const a = f.playerA?.name ?? '—';
  const b = f.playerB?.name ?? '—';
  return `${a} vs ${b} (#${f.id})`;
}

module.exports = {
  async run(interaction) {
    const focused = interaction.options.getFocused(true);
    const data = (await ladeTurnier()) || {};
    const fightsNow  = Array.isArray(data.kämpfe) ? data.kämpfe : [];
    const fightsOld  = Array.isArray(data.kämpfeArchiv) ? data.kämpfeArchiv : [];
    const fights     = [...fightsOld, ...fightsNow]; // ⬅️ auch archivierte Kämpfe einbeziehen
    const groups     = Array.isArray(data.groups) ? data.groups : [];

    const q = (focused?.value || '').toString().toLowerCase().trim();

    // === Vorschläge für das Feld "gruppe"
    if (focused?.name === 'gruppe') {
      const list = groups
        .map(g => g.displayName || g.name)
        .filter(Boolean)
        .filter(n => n.toLowerCase().includes(q))
        .slice(0, 25)
        .map(n => ({ name: n, value: n }));
      try { await interaction.respond(list); } catch {}
      return;
    }

    // === Vorschläge für das Feld "kampf"
    if (focused?.name === 'kampf') {
      // gewählte Gruppe (falls gesetzt)
      const selectedGroupLabel = interaction.options.getString('gruppe') || null;
      const grp = findGroupByLabel(data, selectedGroupLabel);

      // Kandidaten poolen: gleiche Gruppe ODER (wenn keine Gruppe gewählt) aktuelle Phase
      let pool;
      if (grp) {
        pool = fights.filter(f => fightBelongsToGroup(f, grp));
      } else {
        const phaseNow = data.status || 'quali';
        pool = fights.filter(f => f.phase === phaseNow);
      }

      // freitext- oder ID-Filter
      if (q) {
        const idMatch = q.replace('#', '').match(/^\d+$/);
        if (idMatch) {
          pool = pool.filter(f => String(f.id).includes(idMatch[0]));
        } else {
          pool = pool.filter(f => (labelFightShort(f) + ' ' + f.id).toLowerCase().includes(q));
        }
      }

      // offene zuerst, dann lokale Nummer, dann ID
      pool.sort((x, y) => {
        if (x.finished !== y.finished) return x.finished ? 1 : -1;
        const lx = x.localId || 0, ly = y.localId || 0;
        if (lx !== ly) return lx - ly;
        return (x.id || 0) - (y.id || 0);
      });

      const choices = pool.slice(0, 25).map(f => ({
        name: labelFightShort(f),
        value: String(f.id),
      }));

      try { await interaction.respond(choices); } catch {}
      return;
    }

    // Fallback: leere Liste
    try { await interaction.respond([]); } catch {}
  }
};