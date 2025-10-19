// === Imports ===
const { EmbedBuilder, MessageFlags } = require('discord.js');
const { getLocalizedText, resolveLocaleKey } = require('../../config/constants');
const { resolveChallengeText } = require('../../utils/dungeons');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

const DEFAULT_COLOR = 0x00AEFF;
const MAX_FIELD_VALUE_LENGTH = 1024;

function humanizeIdentifier(id) {
  return String(id || '')
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function truncate(text, limit = MAX_FIELD_VALUE_LENGTH) {
  const value = String(text ?? '').trim();
  if (!value) return '—';
  if (value.length <= limit) return value;
  return `${value.slice(0, limit - 1)}…`;
}

function chunkEntries(entries, size = 25) {
  if (!Array.isArray(entries) || entries.length === 0) return [];
  const chunks = [];
  for (let i = 0; i < entries.length; i += size) {
    chunks.push(entries.slice(i, i + size));
  }
  return chunks;
}

function buildEntries(list, locale, { createEntry } = {}) {
  const loc = resolveLocaleKey(locale);
  const seen = new Set();
  const entries = [];

  for (const item of list || []) {
    if (!item || typeof item !== 'object') continue;
    const id = item.id;
    if (!id || seen.has(id)) continue;
    seen.add(id);

    const definition = typeof createEntry === 'function'
      ? createEntry(id, item)
      : item;

    if (!definition) continue;

    const name = getLocalizedText(definition.name, loc) || humanizeIdentifier(id);
    if (!name) continue;

    const params = definition.params || definition.defaults || {};
    const description = truncate(resolveChallengeText(definition.description, loc, params));

    entries.push({
      id,
      name,
      description,
    });
  }

  entries.sort((a, b) => a.name.localeCompare(b.name, loc, { sensitivity: 'base' }));
  return entries;
}

function resolveCopy(copy = {}, locale) {
  const loc = resolveLocaleKey(locale);
  const title = getLocalizedText(copy.title, loc)
    || getLocalizedText(copy.title, 'en')
    || getLocalizedText(copy.title, 'de')
    || 'List';
  const description = getLocalizedText(copy.description, loc)
    || getLocalizedText(copy.description, 'en')
    || getLocalizedText(copy.description, 'de')
    || '';
  const empty = getLocalizedText(copy.empty, loc)
    || getLocalizedText(copy.empty, 'en')
    || getLocalizedText(copy.empty, 'de')
    || '—';

  return { title, description, empty };
}

function createListCommand({
  list = [],
  copy = {},
  createEntry,
  color = DEFAULT_COLOR,
  ephemeral = true,
} = {}) {
  return async function execute(interaction) {
    let locale = 'en';
    try {
      const resolved = await resolveInteractionLocale(interaction);
      if (resolved) locale = resolved;
    } catch (error) {
      // ignore and keep fallback
    }

    const loc = resolveLocaleKey(locale);
    const entries = buildEntries(list, loc, { createEntry });
    const { title, description, empty } = resolveCopy(copy, loc);
    const chunks = chunkEntries(entries, 25);

    const embeds = [];

    if (!chunks.length) {
      const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .addFields({ name: '—', value: empty })
        .setTimestamp();
      embeds.push(embed);
    } else {
      chunks.forEach((chunk, index) => {
        const embed = new EmbedBuilder().setColor(color).setTitle(title);
        if (index === 0 && description) {
          embed.setDescription(description);
        }
        embed.addFields(
          chunk.map((entry) => ({
            name: `• ${entry.name}`,
            value: entry.description,
          })),
        );
        embed.setTimestamp();
        embeds.push(embed);
      });
    }

    const replyOptions = { embeds };
    if (ephemeral) {
      replyOptions.flags = MessageFlags.Ephemeral;
    }

    return interaction.reply(replyOptions);
  };
}

module.exports = { createListCommand };