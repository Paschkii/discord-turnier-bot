const test = require('node:test');
const assert = require('node:assert/strict');

const { getCharacteristicEntries } = require('../src/utils/bosses');

test('getCharacteristicEntries returns ordered entries without throwing', () => {
  const mockBoss = {
    characteristics: {
      vitality: 2400,
      actionPoints: 12,
      movementPoints: 6,
      range: 4,
      summonLimit: 2,
    },
  };

  let result;
  assert.doesNotThrow(() => {
    result = getCharacteristicEntries(mockBoss);
  });

  assert.ok(Array.isArray(result));
  assert.deepEqual(
    result.map((entry) => entry.type),
    ['vitality', 'actionPoints', 'movementPoints', 'range', 'summonLimit'],
  );

  const vitalityEntry = result[0];
  assert.equal(vitalityEntry.label, 'LP');
  assert.equal(vitalityEntry.value, '2400');

  const customEntry = result[result.length - 1];
  assert.equal(customEntry.label, 'summonLimit');
  assert.equal(customEntry.value, '2');
});