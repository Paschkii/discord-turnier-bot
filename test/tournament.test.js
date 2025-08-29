const test = require('node:test');
const assert = require('node:assert/strict');
const { createGroupsPhaseTopLow, computeGroupStandings, determineQualifiedTopLow } = require('../src/services/tournament');

test('computeGroupStandings handles legacy displayName group names', () => {
  const teilnehmer = {
    a:{ name:'Alice', klasse:'A', tag:'Top' },
    b:{ name:'Bob',   klasse:'B', tag:'Top' },
    c:{ name:'Carl',  klasse:'C', tag:'Top' },
    d:{ name:'Dan',   klasse:'D', tag:'Top' },
    e:{ name:'Eve',   klasse:'E', tag:'Low' },
    f:{ name:'Fay',   klasse:'F', tag:'Low' },
    g:{ name:'Gus',   klasse:'G', tag:'Low' },
    h:{ name:'Han',   klasse:'H', tag:'Low' }
  };

  const { groups, fights } = createGroupsPhaseTopLow(teilnehmer);
  for (const f of fights) {
    const grp = groups.find(g => g.name === f.groupName);
    f.groupName = grp.displayName; // simulate legacy stored name
    f.scoreA = 2; f.scoreB = 1;
    f.finished = true;
  }

  const standings = computeGroupStandings(fights, groups);
  const { topSeeds, lowSeeds } = determineQualifiedTopLow(standings, groups, 2);
  const count = (obj) => Object.values(obj).reduce((n, arr) => n + arr.length, 0);
  assert.equal(count(topSeeds), 4);
  assert.equal(count(lowSeeds), 4);
});