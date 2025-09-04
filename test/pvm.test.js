const test = require('node:test');
const assert = require('node:assert/strict');
const { startEvent, addDungeon, getEvent } = require('../src/store/pvm');

test('addDungeon fails when inactive', () => {
  const ev = getEvent();
  ev.active = false; ev.dungeons = [];
  const ok = addDungeon('Boss1');
  assert.equal(ok, false);
  assert.deepEqual(getEvent().dungeons, []);
});

test('startEvent and addDungeon adds dungeon', () => {
  startEvent();
  addDungeon('Boss2');
  const ev = getEvent();
  assert.deepEqual(ev.dungeons, ['Boss2']);
});