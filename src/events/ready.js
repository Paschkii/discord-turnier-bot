const { ensureBotRole } = require('./guildCreate');

// === Client Ready ===
async function onReady(client) {
  console.log(`✅ Bot eingeloggt als ${client.user.tag}`);

  const guilds = [...client.guilds.cache.values()];
  for (const guild of guilds) {
    try {
      await ensureBotRole(guild);
    } catch (error) {
      console.error(`⚠️ Konnte Standardrolle für ${guild.name} nicht setzen:`, error);
    }
  }
}

// === Exports ===
module.exports = { onReady };