const test = require('node:test');
const assert = require('node:assert/strict');
const { validateFormat } = require('../src/services/planner/validation');

test('validateFormat accepts valid totals for each format', () => {
  assert.deepEqual(validateFormat(2, '1v1'), { ok: true });
  assert.deepEqual(validateFormat(4, '2v2'), { ok: true });
  assert.deepEqual(validateFormat(12, '3v3'), { ok: true });
  assert.deepEqual(validateFormat(16, '4v4'), { ok: true });
});

test('validateFormat rejects invalid participant counts', () => {
  assert.equal(validateFormat(3, '1v1').ok, false);
  assert.equal(validateFormat(5, '2v2').ok, false);
  assert.equal(validateFormat(10, '3v3').ok, false);
  assert.equal(validateFormat(12, '4v4').ok, false); // 12 participants => 3 teams
});

test('validateFormat reports helpful reasons', () => {
  assert.equal(validateFormat(-1, '1v1').reasonKey, 'invalidPositiveInteger');
  assert.equal(validateFormat(4, '5v5').reasonKey, 'unknownFormat');
  assert.equal(validateFormat(6, '2v2').reasonKey, 'teamsEven');
  const divisible = validateFormat(8, '3v3');
  assert.equal(divisible.reasonKey, 'participantsDivisible');
  assert.equal(divisible.context.teamSize, 3);
  assert.equal(validateFormat(2, '2v2').reasonKey, 'minTeams');
});