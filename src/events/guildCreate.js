const { installGuildEmojis } = require('../services/emojiInstaller');

async function onGuildCreate(guild) {
  await installGuildEmojis(guild);
}

module.exports = {
  onGuildCreate,
};