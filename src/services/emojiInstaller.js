const { PermissionsBitField } = require('discord.js');

const logger = console;

const RAW_BASE_URL = 'https://raw.githubusercontent.com/Paschkii/dofus-touch-icons/main';

const { getChallengeEmojiInstallerDefinitions } = require('../config/constants/challengeEmojiConfig');

const BASE_EMOJI_DEFINITIONS = [
  { name: 'ap', path: 'status-icons/ap.png' },
  { name: 'mp', path: 'status-icons/mp.png' },
  { name: 'vitality', path: 'status-icons/vitality.png' },
  { name: 'strength', path: 'status-icons/strength.png' },
  { name: 'chance', path: 'status-icons/chance.png' },
  { name: 'intelligence', path: 'status-icons/intelligence.png' },
  { name: 'agility', path: 'status-icons/agility.png' },
  { name: 'neutral', path: 'status-icons/neutral.png' },
  { name: 'cra', path: 'class-icons/cra.png' },
  { name: 'ecaflip', path: 'class-icons/ecaflip.png' },
  { name: 'eniripsa', path: 'class-icons/eniripsa.png' },
  { name: 'enutrof', path: 'class-icons/enutrof.png' },
  { name: 'feca', path: 'class-icons/feca.png' },
  { name: 'rogue', path: 'class-icons/rogue.png' },
  { name: 'iop', path: 'class-icons/iop.png' },
  { name: 'masqueraider', path: 'class-icons/masqueraider.png' },
  { name: 'osamodas', path: 'class-icons/osamodas.png' },
  { name: 'pandawa', path: 'class-icons/pandawa.png' },
  { name: 'sacrieur', path: 'class-icons/sacrieur.png' },
  { name: 'sadida', path: 'class-icons/sadida.png' },
  { name: 'sram', path: 'class-icons/sram.png' },
  { name: 'foggernaut', path: 'class-icons/foggernaut.png' },
  { name: 'xelor', path: 'class-icons/xelor.png' },
];

const EMOJI_DEFINITIONS = (() => {
  const combined = [...BASE_EMOJI_DEFINITIONS];
  for (const entry of getChallengeEmojiInstallerDefinitions()) {
    if (!entry?.name || !entry?.path) continue;
    if (combined.some((emoji) => emoji.name === entry.name)) continue;
    combined.push({ name: entry.name, path: entry.path });
  }
  return combined;
})();

const PREMIUM_EMOJI_LIMITS = {
  0: 50,
  1: 100,
  2: 150,
  3: 250,
};

let fetchImpl;
if (typeof globalThis.fetch === 'function') {
  fetchImpl = (...args) => globalThis.fetch(...args);
} else {
  // npm i undici
  fetchImpl = (...args) => import('undici').then(({ fetch }) => fetch(...args));
}

function buildUrl(path) {
  return `${RAW_BASE_URL}/${path}`;
}

function getEmojiLimit(guild) {
  return guild.maximumEmojis ?? (PREMIUM_EMOJI_LIMITS[Number(guild.premiumTier) || 0] ?? 50);
}

async function downloadEmoji(url) {
  const response = await fetchImpl(url);
  if (!response.ok) {
    throw new Error(`Fehler beim Laden der Emoji-Datei ${url}: ${response.status} ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function installGuildEmojis(guild) {
  if (!guild.members?.me?.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) {
    logger.warn(`[EmojiInstaller] Mir fehlt die Berechtigung "Manage Guild Expressions" in ${guild.id} (${guild.name}).`);
    return;
  }
  try {
    await guild.emojis.fetch();
    const existingNames = new Set(guild.emojis.cache.map((emoji) => emoji.name));
    const missingEmojis = EMOJI_DEFINITIONS.filter((emoji) => !existingNames.has(emoji.name));

    if (missingEmojis.length === 0) {
      return;
    }

    const limit = getEmojiLimit(guild);
    const availableSlots = Math.max(0, limit - guild.emojis.cache.size);

    if (availableSlots <= 0) {
      logger.warn(
        `[EmojiInstaller] Nicht genug freie Emoji-Slots in Guild ${guild.id} (${guild.name}). Benötigt: ${missingEmojis.length}, verfügbar: ${availableSlots}.`,
      );
      return;
    }

    const emojisToInstall = missingEmojis.slice(0, availableSlots);

    for (const emoji of emojisToInstall) {
      const url = buildUrl(emoji.path);
      try {
        const file = await downloadEmoji(url);
        await guild.emojis.create({ name: emoji.name, attachment: file });
        logger.info(`[EmojiInstaller] Emoji "${emoji.name}" in Guild ${guild.id} installiert.`);
      } catch (error) {
        logger.error(`[EmojiInstaller] Konnte Emoji "${emoji.name}" nicht installieren:`, error);
      }
    }

    if (emojisToInstall.length < missingEmojis.length) {
      logger.warn(
        `[EmojiInstaller] Nicht alle Emojis konnten installiert werden. Fehlten ${missingEmojis.length}, installiert ${emojisToInstall.length}.`,
      );
    }
  } catch (error) {
    logger.error(`[EmojiInstaller] Allgemeiner Fehler beim Installieren der Emojis in Guild ${guild.id}:`, error);
  }
}

module.exports = { installGuildEmojis };