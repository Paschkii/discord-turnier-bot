const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_SNAPSHOT_FILENAME = '.emoji-snapshot.json';
const DEFAULT_ROOT_PATH = path.resolve(__dirname, '../../..');

const SNAPSHOT_PATH_ENV = 'EMOJI_SNAPSHOT_PATH';

function getSnapshotPath() {
  const overridePath = process.env[SNAPSHOT_PATH_ENV];
  if (overridePath) {
    return path.resolve(overridePath);
  }
  return path.resolve(DEFAULT_ROOT_PATH, DEFAULT_SNAPSHOT_FILENAME);
}

function safeReadFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return typeof raw === 'string' ? raw : '';
  } catch (error) {
    if (error && error.code !== 'ENOENT') {
      console.warn(`[emoji-snapshot] Failed to read "${filePath}": ${error.message}`);
    }
    return '';
  }
}

function parseMention(value) {
  if (typeof value !== 'string') return null;
  const match = value.trim().match(/^<(?:(a):)?([^:>]+):(\d+)>$/);
  if (!match) return null;
  return {
    animated: Boolean(match[1]),
    name: match[2],
    id: match[3],
  };
}

function normalizeEntry(entry, fallbackKey = '') {
  if (!entry || typeof entry !== 'object') return null;

  const normalized = { ...entry };

  const rawKey = typeof normalized.key === 'string' ? normalized.key.trim() : '';
  const rawName = typeof normalized.name === 'string' ? normalized.name.trim() : '';
  const rawId = normalized.id != null ? String(normalized.id).trim() : '';
  const rawMention = typeof normalized.mention === 'string' ? normalized.mention.trim() : '';
  const animated = Boolean(normalized.animated);
  const unicode = typeof normalized.unicode === 'string' ? normalized.unicode.trim() : '';

  let key = rawKey || fallbackKey || '';
  let name = rawName;
  let id = rawId;
  let mention = rawMention;
  let isAnimated = animated;

  const parsedMention = parseMention(mention);
  if (parsedMention) {
    if (!name) name = parsedMention.name;
    if (!id) id = parsedMention.id;
    if (!key) key = parsedMention.name;
    isAnimated = Boolean(parsedMention.animated);
  }

  if (!mention) {
    if (id && (name || key)) {
      const mentionName = name || key;
      mention = `<${isAnimated ? 'a' : ''}:${mentionName}:${id}>`;
    } else if (unicode) {
      mention = unicode;
    }
  }

  if (!name && key) {
    name = key;
  }

  if (!key && name) {
    key = name;
  }

  return {
    animated: isAnimated,
    id,
    key,
    mention,
    name,
  };
}

function hasEntryData(entry) {
  if (!entry || typeof entry !== 'object') return false;
  return Boolean(
    (typeof entry.key === 'string' && entry.key.trim())
      || (typeof entry.name === 'string' && entry.name.trim())
      || (typeof entry.id === 'string' && entry.id.trim())
      || (typeof entry.mention === 'string' && entry.mention.trim())
      || (typeof entry.unicode === 'string' && entry.unicode.trim()),
  );
}

function collectEntries(source, fallbackKey) {
  if (!source) return [];

  if (Array.isArray(source)) {
    return source
      .map((entry) => normalizeEntry(entry))
      .filter(Boolean);
  }

  if (typeof source === 'object') {
    const entries = [];
    for (const [key, value] of Object.entries(source)) {
      if (!value) continue;
      if (Array.isArray(value)) {
        entries.push(...collectEntries(value, key));
      } else if (typeof value === 'object') {
        if (hasEntryData(value)) {
          const normalized = normalizeEntry(value, key);
          if (normalized) entries.push(normalized);
        } else {
          entries.push(...collectEntries(value, key));
        }
      } else if (typeof value === 'string') {
        const parsed = parseMention(value);
        entries.push(
          normalizeEntry(
            {
              key,
              mention: value.trim(),
              name: parsed?.name,
              id: parsed?.id,
              animated: parsed?.animated,
            },
            key,
          ),
        );
      }
    }
    return entries;
  }

  return [];
}

function normalizeSnapshot(raw) {
  const sources = [];
  if (raw && typeof raw === 'object') {
    if (raw.emojis) sources.push(raw.emojis);
    if (raw.entries) sources.push(raw.entries);
    if (!sources.length) sources.push(raw);
  }

  if (!sources.length) sources.push(raw);

  const entries = [];
  for (const source of sources) {
    const chunk = collectEntries(source);
    if (chunk && chunk.length) {
      entries.push(...chunk);
    }
  }

  const uniqueByIdentity = new Map();
  const byKey = new Map();
  const byName = new Map();
  const byId = new Map();

  const ensureEntry = (entry) => {
    if (!entry) return null;
    const identity = entry.key || entry.name || entry.id || entry.mention;
    if (!identity) return null;
    if (uniqueByIdentity.has(identity)) {
      return uniqueByIdentity.get(identity);
    }
    const canonical = {
      animated: Boolean(entry.animated),
      id: entry.id || '',
      key: entry.key || '',
      mention: entry.mention || '',
      name: entry.name || '',
    };
    uniqueByIdentity.set(identity, canonical);
    return canonical;
  };

  for (const entry of entries) {
    const canonical = ensureEntry(entry);
    if (!canonical) continue;
    if (canonical.key && !byKey.has(canonical.key)) byKey.set(canonical.key, canonical);
    if (canonical.name && !byName.has(canonical.name)) byName.set(canonical.name, canonical);
    if (canonical.id && !byId.has(canonical.id)) byId.set(canonical.id, canonical);
  }

  const values = Array.from(new Set([...byKey.values(), ...byName.values(), ...byId.values()]));

  return {
    byId,
    byKey,
    byName,
    entries: values,
  };
}

function cloneEntry(entry) {
  if (!entry) return null;
  return {
    animated: Boolean(entry.animated),
    id: entry.id || '',
    key: entry.key || '',
    mention: entry.mention || '',
    name: entry.name || '',
  };
}

let cachedSnapshot = null;
let cachedSnapshotPath = null;
let overrideStack = [];

function loadSnapshot() {
  if (overrideStack.length) {
    const top = overrideStack[overrideStack.length - 1];
    return top.snapshot;
  }

  const snapshotPath = getSnapshotPath();
  if (cachedSnapshot && cachedSnapshotPath === snapshotPath) {
    return cachedSnapshot;
  }

  const fileContent = safeReadFile(snapshotPath);
  if (!fileContent.trim()) {
    cachedSnapshot = normalizeSnapshot({});
    cachedSnapshotPath = snapshotPath;
    return cachedSnapshot;
  }

  try {
    const parsed = JSON.parse(fileContent);
    cachedSnapshot = normalizeSnapshot(parsed);
    cachedSnapshotPath = snapshotPath;
    return cachedSnapshot;
  } catch (error) {
    console.warn(`[emoji-snapshot] Failed to parse "${snapshotPath}": ${error.message}`);
    cachedSnapshot = normalizeSnapshot({});
    cachedSnapshotPath = snapshotPath;
    return cachedSnapshot;
  }
}

function getEmojiByKey(key) {
  const normalizedKey = typeof key === 'string' ? key.trim() : '';
  if (!normalizedKey) return null;
  const snapshot = loadSnapshot();
  const entry = snapshot.byKey.get(normalizedKey);
  return cloneEntry(entry);
}

function getEmojiByName(name) {
  const normalizedName = typeof name === 'string' ? name.trim() : '';
  if (!normalizedName) return null;
  const snapshot = loadSnapshot();
  const entry = snapshot.byName.get(normalizedName);
  return cloneEntry(entry);
}

function getEmojiById(id) {
  const normalizedId = typeof id === 'string' ? id.trim() : '';
  if (!normalizedId) return null;
  const snapshot = loadSnapshot();
  const entry = snapshot.byId.get(normalizedId);
  return cloneEntry(entry);
}

function getAllEmojis() {
  const snapshot = loadSnapshot();
  return snapshot.entries.map(cloneEntry);
}

function pushSnapshotOverride(data) {
  const snapshot = normalizeSnapshot(data || {});
  const token = Symbol('emojiSnapshotOverride');
  overrideStack = [...overrideStack, { snapshot, token }];
  return token;
}

function popSnapshotOverride(token) {
  if (!token) {
    overrideStack = [];
  } else {
    overrideStack = overrideStack.filter((entry) => entry.token !== token);
  }
  cachedSnapshot = null;
  cachedSnapshotPath = null;
}

module.exports = {
  DEFAULT_SNAPSHOT_FILENAME,
  DEFAULT_ROOT_PATH,
  getAllEmojis,
  getEmojiById,
  getEmojiByKey,
  getEmojiByName,
  getSnapshotPath,
  __pushEmojiSnapshotOverride: pushSnapshotOverride,
  __popEmojiSnapshotOverride: popSnapshotOverride,
};