const test = require('node:test');
const assert = require('node:assert/strict');
const { parseMK, formatMK } = require('../src/utils');

test('parseMK handles various formats', () => {
  assert.equal(parseMK('1.5m'), 1.5);
  assert.equal(parseMK('1500k'), 1.5);
  assert.equal(parseMK('1500000'), 1.5);
  assert.equal(parseMK('1,5 mk'), 1.5);
  assert.equal(parseMK('2mk'), 2);
  assert.equal(parseMK('0.5m'), 0.5);
  assert.equal(parseMK('500k'), 0.5);
  assert.equal(parseMK('0.5'), 0.5);
  assert.equal(parseMK('abc'), null);
});

test('formatMK rounds to nearest 0.5mk', () => {
  assert.equal(formatMK(1.5), '1.5mk');
  assert.equal(formatMK(2), '2mk');
  assert.equal(formatMK(0.5), '0.5mk');
  assert.equal(formatMK(1.24), '1mk');
  assert.equal(formatMK(1.26), '1.5mk');
});