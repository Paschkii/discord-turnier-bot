require('dotenv').config();
const { Client } = require('discord.js');

async function main() {
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    console.error('[emoji:dump] DISCORD_TOKEN ist nicht gesetzt.');
    process.exitCode = 1;
    return;
  }

  const client = new Client({ intents: [] });

  try {
    await client.login(token);
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Login Timeout')), 15_000);
      client.once('ready', () => {
        clearTimeout(timeout);
        resolve();
      });
      client.once('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });

    await client.application?.fetch();
    const emojiManager = client.application?.emojis;
    if (!emojiManager) {
      console.log('[emoji:dump] Keine App-Emojis gefunden.');
      return;
    }

    const emojis = await emojiManager.fetch();
    if (!emojis.size) {
      console.log('[emoji:dump] Keine App-Emojis vorhanden.');
      return;
    }

    const sorted = [...emojis.values()].sort((a, b) => a.name.localeCompare(b.name));
    console.log('# App-Emojis');
    for (const emoji of sorted) {
      const display = `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>`;
      console.log(`${emoji.name.padEnd(25)} ${display}  (ID: ${emoji.id})`);
    }
  } catch (error) {
    console.error('[emoji:dump] Fehler:', error.message || error);
    process.exitCode = 1;
  } finally {
    if (client && client.destroy) client.destroy();
  }
}

main();