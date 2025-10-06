const logger = console;

const RAW_BASE_URL = 'https://raw.githubusercontent.com/Paschkii/dofus-touch-icons/main';

const EMOJI_DEFINITIONS = [
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

const PREMIUM_EMOJI_LIMITS = {
  0: 50,
  1: 100,
  2: 150,
  3: 250,
};

const fetchImpl =
  typeof globalThis.fetch === 'function'
    ? (...args) => globalThis.fetch(...args)
    : (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function buildUrl(path) {
  return `${RAW_BASE_URL}/${path}`;
}

function getEmojiLimit(guild) {
  const premiumTier = typeof guild.premiumTier === 'number' ? guild.premiumTier : 0;
  return PREMIUM_EMOJI_LIMITS[premiumTier] ?? PREMIUM_EMOJI_LIMITS[0];
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

module.exports = {
  installGuildEmojis,
};