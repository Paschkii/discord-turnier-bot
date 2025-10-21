require('dotenv').config();
const fs = require('node:fs/promises');
const path = require('node:path');
const { Client } = require('discord.js');

const SNAPSHOT_FILE = path.resolve(__dirname, '../../.emoji-snapshot.json');
const MODE = process.argv.includes('--changes') ? 'changes' : 'all';

function sortObject(obj, comparator) {
  return Object.fromEntries(
    Object.entries(obj || {})
      .filter(([, value]) => value !== undefined && value !== null)
      .sort(comparator || (([a], [b]) => a.localeCompare(b, 'de', { sensitivity: 'base' })))
  );
}

function ensureObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

async function readSnapshot() {
  try {
    const raw = await fs.readFile(SNAPSHOT_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { byKey: {}, byId: {}, byName: {} };
    }
    return {
      version: parsed.version || 1,
      updatedAt: parsed.updatedAt || null,
      total: parsed.total || 0,
      byKey: ensureObject(parsed.byKey),
      byId: ensureObject(parsed.byId),
      byName: ensureObject(parsed.byName),
    };
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn('[emoji:dump] Konnte vorherigen Snapshot nicht lesen:', error.message || error);
    }
    return { byKey: {}, byId: {}, byName: {}, version: 1, total: 0, updatedAt: null };
  }
}

async function writeSnapshot(snapshot) {
  try {
    await fs.writeFile(SNAPSHOT_FILE, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  } catch (error) {
    console.warn('[emoji:dump] Konnte Snapshot nicht speichern:', error.message || error);
  }
}

function normalizeKeyBase(name) {
  if (!name) return null;
  const stripped = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
  return stripped || null;
}

function formatEmoji(emoji) {
  const animatedPrefix = emoji.animated ? 'a' : '';
  const name = emoji.name || 'emoji';
  const id = emoji.id || 'unknown';
  return `<${animatedPrefix}:${name}:${id}>`;
}

function buildEntryFromEmoji(emoji) {
  return {
    id: emoji.id,
    name: emoji.name,
    animated: Boolean(emoji.animated),
    mention: formatEmoji(emoji),
    createdTimestamp: emoji.createdTimestamp ?? null,
  };
}

function hasEntryChanged(previous, next) {
  if (!previous) return true;
  return (
    previous.id !== next.id ||
    previous.name !== next.name ||
    previous.animated !== next.animated ||
    previous.mention !== next.mention ||
    previous.createdTimestamp !== next.createdTimestamp
  );
}

function selectKeyForEmoji(emoji, { previousKeyById, usedKeys, reservedKeys }) {
  const existing = previousKeyById.get(emoji.id);
  if (existing) {
    reservedKeys.delete(existing);
    return existing;
  }

  const base = normalizeKeyBase(emoji.name) || `emoji_${emoji.id}`;
  let candidate = base;
  let suffix = 2;
  while (usedKeys.has(candidate) || reservedKeys.has(candidate)) {
    candidate = `${base}_${suffix}`;
    suffix += 1;
  }
  return candidate;
}

function buildSnapshot(emojis, previousSnapshot) {
  const previousByKey = ensureObject(previousSnapshot.byKey);
  const nextByKey = { ...previousByKey };

  const emojiIds = new Set(emojis.map((emoji) => emoji.id));
  const previousKeyById = new Map();
  const reservedKeys = new Set();
  for (const [key, data] of Object.entries(previousByKey)) {
    if (!data || !data.id) continue;
    if (emojiIds.has(data.id)) {
      previousKeyById.set(data.id, key);
      reservedKeys.add(key);
    }
  }

  const usedKeys = new Set();
  const added = [];
  const updated = [];

  for (const emoji of emojis) {
    const key = selectKeyForEmoji(emoji, { previousKeyById, usedKeys, reservedKeys });
    usedKeys.add(key);

    const entry = buildEntryFromEmoji(emoji);
    const previous = nextByKey[key];
    if (!previous) {
      nextByKey[key] = entry;
      added.push({ key, data: entry });
      continue;
    }

    if (hasEntryChanged(previous, entry)) {
      nextByKey[key] = entry;
      updated.push({ key, previous, data: entry });
    } else {
      nextByKey[key] = previous;
    }
  }

  const removed = [];
  for (const key of Object.keys(nextByKey)) {
    if (!usedKeys.has(key)) {
      const data = nextByKey[key];
      if (data) {
        removed.push({ key, data });
      }
      delete nextByKey[key];
    }
  }

  const sortedByKey = sortObject(nextByKey);
  const byId = {};
  const byName = {};
  for (const [key, data] of Object.entries(sortedByKey)) {
    if (!data || !data.id) continue;
    byId[data.id] = {
      key,
      name: data.name,
      animated: data.animated,
      mention: data.mention,
      createdTimestamp: data.createdTimestamp,
    };
    if (data.name && !byName[data.name]) {
      byName[data.name] = {
        key,
        id: data.id,
        animated: data.animated,
        mention: data.mention,
        createdTimestamp: data.createdTimestamp,
      };
    }
  }

  const snapshot = {
    version: 1,
    updatedAt: new Date().toISOString(),
    total: Object.keys(sortedByKey).length,
    byKey: sortedByKey,
    byId: sortObject(byId),
    byName: sortObject(byName),
  };

  return {
    snapshot,
    diff: {
      added,
      updated,
      removed,
    },
  };
}

function formatStoredEmoji(data) {
  if (!data) return 'unbekannt';
  if (data.mention) return data.mention;
  return formatEmoji({ id: data.id, name: data.name, animated: data.animated });
}

function logAllEmojiKeys(snapshot) {
  const entries = Object.entries(snapshot.byKey || {});
  if (!entries.length) {
    console.log('[emoji:dump] Keine App-Emojis vorhanden.');
    return;
  }

  console.log('# App-Emoji Keys');
  for (const [key, data] of entries) {
    const keyLabel = key.padEnd(32);
    console.log(`${keyLabel} ${formatStoredEmoji(data)}  (Name: ${data.name}, ID: ${data.id})`);
  }
  console.log(`\nGesamt: ${entries.length}`);
}

function logEmojiChanges(diff) {
  const { added, updated, removed } = diff;
  if (!added.length && !updated.length && !removed.length) {
    console.log('[emoji:dump] Keine neuen oder geänderten App-Emojis gefunden.');
    return;
  }

  if (added.length) {
    console.log('# Neue App-Emojis');
    for (const entry of added) {
      const message = [
        `[NEU] ${entry.key.padEnd(28)} ${formatStoredEmoji(entry.data)}`,
        `(Name: ${entry.data.name ?? 'unbenannt'}, ID: ${entry.data.id})`,
      ].join('  ');
      console.log(message);
    }
  }

  if (updated.length) {
    console.log('# Aktualisierte App-Emojis');
    for (const entry of updated) {
      const changes = [];
      if (entry.previous.id !== entry.data.id) {
        changes.push(`ID: ${entry.previous.id} -> ${entry.data.id}`);
      }
      if (entry.previous.name !== entry.data.name) {
        changes.push(`Name: "${entry.previous.name}" -> "${entry.data.name}"`);
      }
      if (entry.previous.animated !== entry.data.animated) {
        changes.push(`Animiert: ${entry.previous.animated ? 'ja' : 'nein'} -> ${entry.data.animated ? 'ja' : 'nein'}`);
      }
      const detailSuffix = changes.length ? ` [${changes.join(', ')}]` : '';
      const baseMessage = `[ÄNDERUNG] ${entry.key.padEnd(24)} ${formatStoredEmoji(entry.data)}  (ID: ${entry.data.id})`;
      console.log(`${baseMessage}${detailSuffix}`);
    }
  }

    if (removed.length) {
    console.log('# Entfernte App-Emojis');
    for (const entry of removed) {
      const message = [
        `[ENTFERNT] ${entry.key.padEnd(24)} ${formatStoredEmoji(entry.data)}`,
        `(Name: ${entry.data.name ?? 'unbenannt'}, ID: ${entry.data.id})`,
      ].join('  ');
      console.log(message);
    }
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
    const { snapshot, diff } = buildSnapshot(sorted, previousSnapshot);

    if (MODE === 'changes') {
      const changes = findEmojiChanges(sorted, previousSnapshot);
      logEmojiChanges(diff);
    } else {
      logAllEmojiKeys(snapshot);
    }

    await writeSnapshot(snapshot);
    
  } catch (error) {
    console.error('[emoji:dump] Fehler:', error.message || error);
    process.exitCode = 1;
  } finally {
    if (client && client.destroy) client.destroy();
  }
}

main();