// === PvM Event Store ===
let event = { active: false, dungeons: [] };

// Starte ein neues Event
function startEvent() {
  event = { active: true, dungeons: [] };
  return event;
}

// Füge einen Dungeon zum Event hinzu
function addDungeon(name) {
  if (!event.active) return false;
  event.dungeons.push(name);
  return event;
}

// Hole das aktuelle Event
function getEvent() {
  return event;
}

// === Exports ===
module.exports = {
  addDungeon,
  getEvent,
  startEvent,
};