// === Imports ===
const { shuffleArray, themedGroupNames } = require('../utils');
const { ALLOWED_KO_SIZES } = require('../config/constants');

// Emojis für Top/Low-Tag (nur Pfeile)
const GROUP_EMOJI = { top: '⬆️', low: '⬇️' };

// Balanced Split in k Gruppen (±1 Differenz)
function splitIntoGroups(arr, k) {
  const base = Math.floor(arr.length / k);
  const extra = arr.length % k; // so viele Gruppen bekommen +1
  const groups = [];
  let i = 0;
  for (let g = 0; g < k; g++) {
    const size = base + (g < extra ? 1 : 0);
    groups.push(arr.slice(i, i + size));
    i += size;
  }
  return groups;
}

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

// === Gruppenphase Top/Low mit alten Namen + Pfeil am Ende ===
// Erwartung: nach der Quali steht in teilnehmerMap[id].tag 'Top' oder 'Low' (alles andere = Low)
function createGroupsPhaseTopLow(teilnehmerMap) {
  const names = themedGroupNames(4); // vorhandene Gruppennamen beibehalten

  const top = [];
  const low = [];
  for (const [id, p] of Object.entries(teilnehmerMap || {})) {
    const entry = { id, name: p.name, klasse: p.klasse };
    (p.tag === 'Top' ? top : low).push(entry);
  }

  // deterministisch sortieren
  const byName = (a, b) => (a.name || '').localeCompare(b.name || '', 'de', { sensitivity: 'base' });
  top.sort(byName);
  low.sort(byName);

  // in 2 Buckets splitten (Überlauf automatisch verteilt)
  const splitInto = (arr, k) =>
    arr.reduce((acc, cur, i) => { acc[i % k].push(cur); return acc; }, Array.from({ length: k }, () => []));

  const [topA, topB] = splitInto(top, 2);
  const [lowA, lowB] = splitInto(low, 2);

  // Gruppen bauen
  let order = 0;
  const groups = [];

  const makeGroup = (members, baseName, bucket) => {
    const displayName = `${baseName} ${bucket === 'top' ? '⬆️' : '⬇️'}`;
    // Round-Robin Matches
    const matches = [];
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        matches.push({
          // id/localId vergeben wir nachher
          phase: 'gruppen',
          groupName: baseName, // muss mit g.name übereinstimmen
          localId: 0,
          playerA: members[i],
          playerB: members[j],
          scoreA: 0, scoreB: 0,
          bestOf: 3,
          finished: false,
          timestamp: null,
          winnerId: null,
          bucket
        });
      }
    }

    order += 1;
    groups.push({
      name: baseName,
      displayName,
      bucket,
      order,
      members: members.slice(),
      matches
    });
  };

  makeGroup(topA, names[0], 'top');
  makeGroup(topB, names[1], 'top');
  makeGroup(lowA, names[2], 'low');
  makeGroup(lowB, names[3], 'low');

  // globale Fight-IDs plus lokale Nummern je Gruppe
  const fights = [];
  let nextId = 1;
  for (const g of groups) {
    g.matches.forEach((m, idx) => {
      m.id = nextId++;
      m.localId = idx + 1;
      fights.push(m);
    });
  }

  return { groups, fights };
}

// === Legacy: Zufällige Gruppenbildung (bleibt für Rückwärtskompatibilität) ===
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
  const nameMap = {};
  for (const g of groups || []) {
    nameMap[g.name] = g.name;
    if (g.displayName) nameMap[g.displayName] = g.name;
  }

  const table = new Map();
  for (const f of groupFights) {
    if (!f.finished) continue;
    const norm = nameMap[f.groupName] || f.groupName;
    const a = f.playerA, b = f.playerB;
    if (!table.has(a.id)) table.set(a.id, { id: a.id, name: a.name, groupName: norm, points: 0 });
    if (!table.has(b.id)) table.set(b.id, { id: b.id, name: b.name, groupName: norm, points: 0 });
    table.get(a.id).points += f.scoreA;
    table.get(b.id).points += f.scoreB;
  }
  // Spieler ohne Spiele mit 0 Punkten ergänzen
  for (const g of groups) {
    for (const p of g.members) {
      if (!table.has(p.id)) table.set(p.id, { id: p.id, name: p.name, groupName: g.name, points: 0 });
    }
  }
  // nach Gruppen aufteilen und sortieren
  const byGroup = {};
  for (const row of table.values()) {
    const key = nameMap[row.groupName] || row.groupName;
    byGroup[key] = byGroup[key] || [];
    byGroup[key].push(row);
  }
  for (const g in byGroup) byGroup[g].sort((x, y) => y.points - x.points);
  return byGroup;
}

// --- Top/Low: Qualified je Gruppe (Top 2) + TieBreaker-Erkennung ---
//   NEU: seeds enthalten wieder .klasse (aus den Gruppenmembers übernommen)
function determineQualifiedTopLow(standingsByGroup, groups, takePerGroup = 2) {
  const topGroups = groups.filter(g => g.bucket === 'top').map(g => g.name);
  const lowGroups = groups.filter(g => g.bucket === 'low').map(g => g.name);

  const groupMembersByName = Object.fromEntries(groups.map(g => [g.name, g.members || []]));
  const findKlasse = (gname, id) => (groupMembersByName[gname].find(p => p.id === id)?.klasse) || undefined;

  const getTopN = (gname) =>
    (standingsByGroup[gname] || [])
      .slice(0, takePerGroup)
      .map((p, i) => ({
        id: p.id,
        name: p.name,
        klasse: findKlasse(gname, p.id), // ← Klasse wiederhergestellt
        groupName: gname,
        rank: i + 1
      }));

  const topSeeds = Object.fromEntries(topGroups.map(n => [n, getTopN(n)]));
  const lowSeeds = Object.fromEntries(lowGroups.map(n => [n, getTopN(n)]));

  const tieBreakers = [];
  for (const g of groups) {
    const rows = (standingsByGroup[g.name] || []);
    const cut = takePerGroup - 1;
    if (rows[cut] && rows[cut + 1] && rows[cut].points === rows[cut + 1].points) {
      tieBreakers.push({ groupName: g.name, players: [rows[cut], rows[cut + 1]] });
    }
  }

  return { topSeeds, lowSeeds, tieBreakers, takePerGroup };
}

// --- Viertelfinale innerhalb der Buckets: T1#1 vs T2#2, T2#1 vs T1#2 (analog Low) ---
function createTopLowQuarterfinals(topSeeds, lowSeeds, startId = 1) {
  const fights = [];
  let id = startId;

  // Seeds liegen als Arrays pro Gruppenname vor (mit klasse)
  const pairBucket = (A, B, bucketLabel, bucket) => {
    const a1 = A?.[0], a2 = A?.[1], b1 = B?.[0], b2 = B?.[1];
    if (a1 && b2) fights.push(mkKO(id++, a1, b2, `${bucketLabel} — Viertelfinale`, bucket));
    if (b1 && a2) fights.push(mkKO(id++, b1, a2, `${bucketLabel} — Viertelfinale`, bucket));
  };

  // Ermittle die zwei Top- und zwei Low-Gruppennamen deterministisch
  const topNames = Object.keys(topSeeds).sort();
  const lowNames = Object.keys(lowSeeds).sort();

  pairBucket(topSeeds[topNames[0]] || [], topNames[1] ? topSeeds[topNames[1]] : [], `KO ${GROUP_EMOJI.top}`, 'top');
  pairBucket(lowSeeds[lowNames[0]] || [], lowNames[1] ? lowSeeds[lowNames[1]] : [], `KO ${GROUP_EMOJI.low}`, 'low');

  return fights;
}

// Hilfsbauer für KO-Fights (mit bucket + groupName)
//   NEU: übergibt klasse, falls im Seed vorhanden
function mkKO(id, qa, qb, groupName, bucket, bestOf = 3) {
  return {
    id,
    phase: 'ko',
    groupName,
    localId: id, // wird später pro Anzeige-Gruppe ggf. neu vergeben
    playerA: { id: qa.id, name: qa.name, klasse: qa.klasse },
    playerB: { id: qb.id, name: qb.name, klasse: qb.klasse },
    scoreA: 0, scoreB: 0, bestOf,
    finished: false, timestamp: null, winnerId: null,
    bucket, // 'top' | 'low'
  };
}

// === Legacy-/Allgemeinhelfer (belassen für Kompatibilität) ===

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

// KO-Baum mit Setzliste (nur 4 Gruppen, 1, 2 oder 4 pro Gruppe)
function createKOSeeded(qualified, groups, takePerGroup) {
  const qByGroup = new Map();
  for (const g of groups) qByGroup.set(g.name, []);
  for (const q of qualified) {
    if (!qByGroup.has(q.groupName)) qByGroup.set(q.groupName, []);
    qByGroup.get(q.groupName).push(q);
  }
  for (const g of qByGroup.keys()) qByGroup.get(g).sort((a, b) => a.rank - b.rank);

  const groupOrder = groups.map(g => g.name);
  const pairs = [[0,1],[2,3]]; // (A vs B), (C vs D)

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

// Wähle die größte erlaubte KO-Größe ≤ n (min. 2)
function chooseKOSize(n) {
  for (const s of ALLOWED_KO_SIZES) if (s <= n) return s;
  return 2;
}

// KO-Baum aus Teilnehmern (randomisiert, falls keine Setzliste vorhanden)
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

// === Exports ===
module.exports = {
  GROUP_EMOJI,
  createQualificationFromTeilnehmerMap,
  createGroupsPhaseTopLow,
  createGroupsPhase,
  createTopLowQuarterfinals,
  createKOSeeded,
  createKOFightsFromParticipants,
  chooseKOSize,
  computeGroupStandings,
  determineQualifiedTopLow,
  determineQualifiedAdvanced,
};