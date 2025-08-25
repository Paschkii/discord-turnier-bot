// === Imports ===
const { shuffleArray, themedGroupNames } = require('../utils');
const { ALLOWED_KO_SIZES } = require('../config/constants');

// === Turnier-Core ===
// Qualifikation (Bo1)
function createQualificationFromTeilnehmerMap(teilnehmerMap) {
  const teilnehmerArr = Object.entries(teilnehmerMap).map(([id, p]) => ({ id, name: p.name, klasse: p.klasse }));
  if (teilnehmerArr.length % 2 !== 0) throw new Error('Teilnehmerzahl muss gerade sein!');
  const shuffled = shuffleArray(teilnehmerArr);
  const matches = [];
  let id = 1;
  for (let i = 0; i < shuffled.length; i += 2) {
    matches.push({
      id: id++,
      phase: 'quali',
      playerA: shuffled[i],
      playerB: shuffled[i + 1],
      scoreA: 0, scoreB: 0,
      bestOf: 1,
      finished: false,
      timestamp: null,
      winnerId: null,
    });
  }
  return matches;
}

// Gruppenaufteilung
function createGroupsPhase(teilnehmerMap, gruppenAnzahl = 4) {
  const teilnehmerArr = Object.entries(teilnehmerMap).map(([id, p]) => ({ id, name: p.name, klasse: p.klasse }));
  const shuffled = shuffleArray(teilnehmerArr);
  const baseSize = Math.floor(shuffled.length / gruppenAnzahl);
  const remainder = shuffled.length % gruppenAnzahl;

  const groups = [];
  let idx = 0;
  const names = themedGroupNames(gruppenAnzahl);
  for (let g = 0; g < gruppenAnzahl; g++) {
    const size = baseSize + (g === 0 ? remainder : 0);
    const members = shuffled.slice(idx, idx + size);
    idx += size;
    groups.push({ name: names[g], members, matches: [] });
  }

  // Round-Robin Matches je Gruppe (Bo3)
  const fights = [];
  let globalId = 1;
  for (const group of groups) {
    let localId = 1;
    for (let i = 0; i < group.members.length; i++) {
      for (let j = i + 1; j < group.members.length; j++) {
        const m = {
          id: globalId++,
          phase: 'gruppen',
          groupName: group.name,
          localId,
          playerA: group.members[i],
          playerB: group.members[j],
          scoreA: 0, scoreB: 0,
          bestOf: 3,
          finished: false,
          timestamp: null,
          winnerId: null,
        };
        group.matches.push({ ...m });
        fights.push(m);
        localId++;
      }
    }
  }
  return { groups, fights };
}

// Standings (Punkte = gewonnene Maps)
function computeGroupStandings(groupFights, groups) {
  const table = new Map();
  for (const f of groupFights) {
    if (!f.finished) continue;
    const a = f.playerA, b = f.playerB;
    if (!table.has(a.id)) table.set(a.id, { id: a.id, name: a.name, groupName: f.groupName, points: 0 });
    if (!table.has(b.id)) table.set(b.id, { id: b.id, name: b.name, groupName: f.groupName, points: 0 });
    table.get(a.id).points += f.scoreA;
    table.get(b.id).points += f.scoreB;
  }
  for (const g of groups) {
    for (const p of g.members) {
      if (!table.has(p.id)) table.set(p.id, { id: p.id, name: p.name, groupName: g.name, points: 0 });
    }
  }
  const byGroup = {};
  for (const row of table.values()) {
    byGroup[row.groupName] = byGroup[row.groupName] || [];
    byGroup[row.groupName].push(row);
  }
  for (const g in byGroup) byGroup[g].sort((x, y) => y.points - x.points);
  return byGroup;
}

// Qualifizierte bestimmen (dynamisch)
function determineQualifiedAdvanced(standingsByGroup, groups, totalParticipants) {
  let takePerGroup = 2;
  if (totalParticipants <= 10) takePerGroup = 1;
  else if (totalParticipants >= 12 && totalParticipants <= 22) takePerGroup = 2;
  else if (totalParticipants >= 24) takePerGroup = 4;

  const qualified = [];
  const tieBreakers = [];

  for (const g of groups) {
    const rows = (standingsByGroup[g.name] || []).slice();
    for (let i = 0; i < Math.min(takePerGroup, rows.length); i++) {
      qualified.push({ id: rows[i].id, name: rows[i].name, points: rows[i].points, groupName: g.name, rank: i + 1 });
    }
    const cut = takePerGroup - 1;
    if (rows[cut] && rows[cut + 1] && rows[cut].points === rows[cut + 1].points) {
      tieBreakers.push({ groupName: g.name, players: [rows[cut], rows[cut + 1]] });
    }
  }
  return { qualified, tieBreakers, takePerGroup };
}

// Erstellt einen KO-Kampf
function mkFight(id, qa, qb, bestOf = 3) {
  return {
    id,
    phase: 'ko',
    playerA: { id: qa.id, name: qa.name },
    playerB: { id: qb.id, name: qb.name },
    scoreA: 0, scoreB: 0,
    bestOf,
    finished: false,
    timestamp: null,
    winnerId: null,
  };
}

// Erstellt KO-Kämpfe aus qualifizierten Spielern (gesetzt)
function createKOSeeded(qualified, groups, takePerGroup) {
  const qByGroup = new Map();
  for (const g of groups) qByGroup.set(g.name, []);
  for (const q of qualified) {
    if (!qByGroup.has(q.groupName)) qByGroup.set(q.groupName, []);
    qByGroup.get(q.groupName).push(q);
  }
  for (const g of qByGroup.keys()) qByGroup.get(g).sort((a, b) => a.rank - b.rank);

  const groupOrder = groups.map(g => g.name);
  const pairs = [[0,1],[2,3]];

  const fights = [];
  let id = 1;
  const bestOf = 3;

  if (takePerGroup === 1) {
    const A = qByGroup.get(groupOrder[0]) || [];
    const B = qByGroup.get(groupOrder[1]) || [];
    const C = qByGroup.get(groupOrder[2]) || [];
    const D = qByGroup.get(groupOrder[3]) || [];
    if (A[0] && D[0]) fights.push(mkFight(id++, A[0], D[0], bestOf));
    if (B[0] && C[0]) fights.push(mkFight(id++, B[0], C[0], bestOf));
    return fights;
  }

  if (takePerGroup === 2) {
    for (const [i,j] of pairs) {
      const Gi = qByGroup.get(groupOrder[i]) || [];
      const Gj = qByGroup.get(groupOrder[j]) || [];
      if (Gi[0] && Gj[1]) fights.push(mkFight(id++, Gi[0], Gj[1], bestOf));
      if (Gj[0] && Gi[1]) fights.push(mkFight(id++, Gj[0], Gi[1], bestOf));
    }
    return fights;
  }

  if (takePerGroup === 4) {
    for (const [i,j] of pairs) {
      const Gi = qByGroup.get(groupOrder[i]) || [];
      const Gj = qByGroup.get(groupOrder[j]) || [];
      const safe = (arr, k) => arr[k] || null;
      const M = [
        [safe(Gi,0), safe(Gj,3)],
        [safe(Gi,1), safe(Gj,2)],
        [safe(Gj,0), safe(Gi,3)],
        [safe(Gj,1), safe(Gi,2)],
      ];
      for (const [a,b] of M) if (a && b) fights.push(mkFight(id++, a, b, bestOf));
    }
    return fights;
  }

  const flat = qualified.map(q => ({ id: q.id, name: q.name }));
  return createKOFightsFromParticipants(flat);
}

function chooseKOSize(n) {
  for (const s of ALLOWED_KO_SIZES) if (s <= n) return s;
  return 2;
}

// Erstellt KO-Kämpfe aus Teilnehmerliste (ungerade Teilnehmerzahl nicht erlaubt)
function createKOFightsFromParticipants(participants) {
  const n = participants.length;
  if (!ALLOWED_KO_SIZES.includes(n)) throw new Error('Ungültige Teilnehmerzahl für KO: ' + n);
  const shuffled = shuffleArray(participants);
  const fights = [];
  let id = 1;
  for (let i = 0; i < shuffled.length; i += 2) {
    fights.push({
      id: id++,
      phase: 'ko',
      playerA: shuffled[i],
      playerB: shuffled[i + 1],
      scoreA: 0, scoreB: 0,
      bestOf: 3,
      finished: false,
      timestamp: null,
      winnerId: null,
    });
  }
  return fights;
}

module.exports = {
  createQualificationFromTeilnehmerMap,
  createGroupsPhase,
  computeGroupStandings,
  determineQualifiedAdvanced,
  createKOSeeded,
  createKOFightsFromParticipants,
  chooseKOSize,
};