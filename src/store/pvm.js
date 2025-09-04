let event = { active: false, dungeons: [] };

function startEvent() {
  event = { active: true, dungeons: [] };
  return event;
}

function addDungeon(name) {
  if (!event.active) return false;
  event.dungeons.push(name);
  return event;
}

function getEvent() {
  return event;
}

module.exports = { startEvent, addDungeon, getEvent };