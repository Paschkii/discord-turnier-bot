// === Hauptdatei ===
// Lädt Umgebungsvariablen aus .env
require('dotenv').config();

// === Imports ===
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { keepAlive } = require('./server/keepAlive');
const { installGuildEmojis } = require('./services/emojiInstaller');
const { onReady } = require('./events/ready');
const { onInteractionCreate } = require('./events/interactionCreate');
const { onGuildCreate } = require('./events/guildCreate');
const { initDB } = require('../datenbank');

// === Main ===
(async () => {
  try {
    await initDB(); // Datenbank initialisieren
  } catch (err) {
    console.error('DB-Init Fehler:', err);
  }
  // Starte den Webserver (Keep-Alive)
  keepAlive();
  // Discord-Client initialisieren und einloggen
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    partials: [Partials.Channel],
  });
  // Events registrieren
  client.once('ready', () => {
    onReady(client);

    // Emojis beim Start installieren
    for (const [, guild] of client.guilds.cache) {
      installGuildEmojis(guild);
    }
  });

  client.on('interactionCreate', onInteractionCreate);

  client.on('guildCreate', (guild) => {
    onGuildCreate(guild);
    installGuildEmojis(guild);
  });
  // Client einloggen
  await client.login(process.env.DISCORD_TOKEN);

  // Self-Ping (nur Produktion)
  if (process.env.NODE_ENV === 'production') {
    const fetch = (...args) =>
      (typeof globalThis.fetch === 'function'
        ? globalThis.fetch(...args)
        : import('node-fetch').then(({ default: f }) => f(...args)));
    setInterval(() => {
      fetch(process.env.SELF_PING_URL || 'https://discord-turnier-bot.onrender.com/health')
        .then((res) => console.log(`[Self-Ping] ${res.status}`))
        .catch(() => {});
    }, 4 * 60 * 1000);
  }
})();