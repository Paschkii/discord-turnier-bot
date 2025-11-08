const test = require('node:test');
const assert = require('node:assert/strict');

const {
  calculateSpellDamage,
  applyStatScaling,
  applyResistances,
} = require('../src/utils/spellDamage');

test('applyStatScaling uses primary stat and power', () => {
  const scaling = applyStatScaling({ min: 10, max: 12 }, { primaryStat: 200, power: 50 });
  assert.equal(scaling.factor, (100 + 200 + 50) / 100);
  assert.equal(scaling.min, 10 * scaling.factor);
  assert.equal(scaling.max, 12 * scaling.factor);
});

test('standard damage calculation with resistances and critical bonuses', () => {
  const spell = {
    damage: { min: 10, max: 14 },
    element: 'fire',
    primaryStat: 'intelligence',
    powerStat: 'power',
  };
  const stats = {
    intelligence: 300,
    power: 100,
    elementalDamage: { fire: 20 },
    generalDamage: 10,
    criticalDamage: 25,
    criticalDamageBonus: 5,
  };
  const target = {
    resistances: {
      fixed: { fire: 10 },
      percent: { fire: 20 },
    },
  };

  const result = calculateSpellDamage({ spell, stats, target });

  assert.equal(result.normal.min, 56);
  assert.equal(result.normal.max, 72);
  assert.equal(result.critical.min, 75);
  assert.equal(result.critical.max, 96);

  assert.equal(result.helpers.scalingFactor, 5);
  assert.equal(result.helpers.flatDamage.total, 30);
  assert.equal(result.normal.breakdown.resistances.fixed, 10);
  assert.equal(result.normal.breakdown.resistances.percent, 20);
  assert.equal(result.critical.breakdown.criticalMultiplier, 1.3);
});

test('healing spells ignore resistances but still floor results', () => {
  const spell = {
    damage: { min: 20, max: 24 },
    element: 'water',
    primaryStat: 'intelligence',
    powerStat: 'power',
    type: 'healing',
    flatDamageKeys: ['healingBonus'],
  };
  const stats = {
    intelligence: 200,
    power: 80,
    healingBonus: 15,
  };
  const target = {
    resistances: {
      fixed: { water: 999 },
      percent: { water: 99 },
    },
  };

  const result = calculateSpellDamage({ spell, stats, target });

  assert.equal(result.normal.min, 91);
  assert.equal(result.normal.max, 106);
  assert.ok(result.normal.breakdown.resistances.skipped);
  assert.equal(result.normal.breakdown.beforeResistances.min, 91);
  assert.equal(Math.round(result.normal.breakdown.beforeResistances.max * 10) / 10, 106.2);
});

test('pushback damage uses pushback stats and resistances', () => {
  const spell = {
    damage: { min: 4, max: 6 },
    element: 'pushback',
    type: 'pushback',
    primaryStat: 'pushbackStat',
    powerStat: 'pushbackPower',
    flatDamageKeys: ['pushbackDamage'],
  };
  const stats = {
    pushbackStat: 80,
    pushbackPower: 40,
    pushbackDamage: 10,
  };
  const target = {
    resistances: {
      fixed: { pushback: 5 },
      percent: { pushback: 10 },
    },
  };

  const result = calculateSpellDamage({ spell, stats, target });

  assert.equal(result.normal.min, 12);
  assert.equal(result.normal.max, 16);
  assert.equal(result.normal.breakdown.resistances.fixed, 5);
  assert.equal(result.normal.breakdown.resistances.percent, 10);
});

test('resistances cannot push damage below zero', () => {
  const spell = {
    damage: { min: 5, max: 5 },
    element: 'earth',
    primaryStat: 'strength',
    powerStat: 'power',
  };
  const stats = {
    strength: 0,
    power: 0,
  };
  const target = {
    resistances: {
      fixed: { all: 10 },
      percent: { all: 50 },
    },
  };

  const result = calculateSpellDamage({ spell, stats, target });

  assert.equal(result.normal.min, 0);
  assert.equal(result.normal.max, 0);

  const res = applyResistances({ min: 3, max: 7 }, { element: 'earth', target });
  assert.equal(res.min, 0);
  assert.equal(res.max, 0);
});