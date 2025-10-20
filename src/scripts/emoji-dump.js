require('dotenv').config();
const fs = require('node:fs/promises');
const path = require('node:path');
const { Client } = require('discord.js');

const SNAPSHOT_FILE = path.resolve(__dirname, '../../.emoji-snapshot.json');
const MODE = process.argv.includes('--changes') ? 'changes' : 'all';

async function readSnapshot() {
  try {
    const raw = await fs.readFile(SNAPSHOT_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { byId: {}, byName: {} };
    }
    return {
      byId: typeof parsed.byId === 'object' && parsed.byId !== null ? parsed.byId : {},
      byName: typeof parsed.byName === 'object' && parsed.byName !== null ? parsed.byName : {},
    };
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn('[emoji:dump] Konnte vorherigen Snapshot nicht lesen:', error.message || error);
    }
    return { byId: {}, byName: {} };
  }
}

async function writeSnapshot(snapshot) {
  try {
    await fs.writeFile(SNAPSHOT_FILE, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  } catch (error) {
    console.warn('[emoji:dump] Konnte Snapshot nicht speichern:', error.message || error);
  }
}

function createSnapshot(emojis) {
  const byId = {};
  const byName = {};
  for (const emoji of emojis) {
    const data = {
      id: emoji.id,
      name: emoji.name,
      animated: emoji.animated,
      createdTimestamp: emoji.createdTimestamp ?? null,
    };
    byId[emoji.id] = data;
    byName[emoji.name] = emoji.id;
  }
  return {
    byId,
    byName,
    updatedAt: new Date().toISOString(),
  };
}

function findEmojiChanges(emojis, previousSnapshot) {
  const { byId: previousById, byName: previousByName } = previousSnapshot;
  const changes = [];

  for (const emoji of emojis) {
    const previous = previousById[emoji.id];
    if (!previous) {
      const previousIdByName = previousByName[emoji.name];
      if (previousIdByName) {
        const previousEntry = previousById[previousIdByName] || { id: previousIdByName, name: emoji.name };
        changes.push({ type: 'changed', emoji, previous: previousEntry });
      } else {
        changes.push({ type: 'new', emoji });
      }
      continue;
    }

    const nameChanged = previous.name !== emoji.name;
    const animatedChanged = previous.animated !== emoji.animated;
    if (nameChanged || animatedChanged) {
      changes.push({ type: 'changed', emoji, previous });
    }
  }

  return changes;
}

function formatEmoji(emoji) {
  return `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>`;
}

function logAllEmojis(emojis) {
  console.log('# App-Emojis');
  for (const emoji of emojis) {
    console.log(`${emoji.name.padEnd(25)} ${formatEmoji(emoji)}  (ID: ${emoji.id})`);
  }
}

function logEmojiChanges(changes) {
  if (!changes.length) {
    console.log('[emoji:dump] Keine neuen oder geänderten App-Emojis gefunden.');
    return;
  }

  console.log('# Neue oder geänderte App-Emojis');
  for (const change of changes) {
    const { emoji } = change;
    const prefix = change.type === 'new' ? '[NEU]' : '[ÄNDERUNG]';
    let suffix = '';
    if (change.type === 'changed') {
      const parts = [];
      if (change.previous.id && change.previous.id !== emoji.id) {
        parts.push(`ID: ${change.previous.id} -> ${emoji.id}`);
      }
      if (change.previous.name && change.previous.name !== emoji.name) {
        parts.push(`Name: "${change.previous.name}" -> "${emoji.name}"`);
      }
      if (typeof change.previous.animated === 'boolean' && change.previous.animated !== emoji.animated) {
        parts.push(`Animiert: ${change.previous.animated ? 'ja' : 'nein'} -> ${emoji.animated ? 'ja' : 'nein'}`);
      }
      if (parts.length) {
        suffix = ` [${parts.join(', ')}]`;
      }
    }

    console.log(`${prefix} ${emoji.name.padEnd(22)} ${formatEmoji(emoji)}  (ID: ${emoji.id})${suffix}`);
  }
}

async function waitForReady(client) {
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
}

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
    await waitForReady(client);

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
    const previousSnapshot = await readSnapshot();

    if (MODE === 'changes') {
      const changes = findEmojiChanges(sorted, previousSnapshot);
      logEmojiChanges(changes);
    } else {
      logAllEmojis(sorted);
    }

    const snapshot = createSnapshot(sorted);
    await writeSnapshot(snapshot);
    
  } catch (error) {
    console.error('[emoji:dump] Fehler:', error.message || error);
    process.exitCode = 1;
  } finally {
    if (client && client.destroy) client.destroy();
  }
}

main();