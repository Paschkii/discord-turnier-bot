const test = require('node:test');
const assert = require('node:assert/strict');
const { startEvent, stopEvent, addDungeon, getEvent } = require('../src/store/pvm');

test('addDungeon fails when inactive', () => {
  stopEvent();
  const ok = addDungeon('Boss1');
  assert.equal(ok, false);
  assert.deepEqual(getEvent().dungeons, []);
});

test('startEvent and addDungeon adds dungeon', () => {
  stopEvent();
  startEvent();
  addDungeon('Boss2');
  const ev = getEvent();
  assert.deepEqual(ev.dungeons, ['Boss2']);
  stopEvent();
});

test('stopEvent resets the PvM event', () => {
  stopEvent();
  startEvent();
  addDungeon('Boss3');
  let ev = getEvent();
  assert.equal(ev.active, true);
  assert.deepEqual(ev.dungeons, ['Boss3']);

  const stopped = stopEvent();
  assert.equal(stopped.active, false);
  assert.deepEqual(stopped.dungeons, []);

  ev = getEvent();
  assert.equal(ev.active, false);
  assert.deepEqual(ev.dungeons, []);
});