const { ICON_BASE, resolveDiscordEmoji } = require('./shared');

const RESISTANCE_TYPES = {
  neutral: {
    icon: `${ICON_BASE}/status-icons/Neutral.png`, // Discord-Emoji :neutral:
    emoji: resolveDiscordEmoji('neutral'),
    emojiName: 'neutral',
    name: {
      de: 'Neutral', en: 'Neutral', fr: 'Neutre', es: 'Neutral',
    },
  },
  earth: {
    icon: `${ICON_BASE}/status-icons/Strength.png`, // Discord-Emoji :strength:
    emoji: resolveDiscordEmoji('strength'),
    emojiName: 'strength',
    name: {
      de: 'Erde', en: 'Earth', fr: 'Terre', es: 'Tierra',
    },
  },
  fire: {
    icon: `${ICON_BASE}/status-icons/Intelligence.png`, // Discord-Emoji :intelligence:
    emoji: resolveDiscordEmoji('intelligence'),
    emojiName: 'intelligence',
    name: {
      de: 'Feuer', en: 'Fire', fr: 'Feu', es: 'Fuego',
    },
  },
  water: {
    icon: `${ICON_BASE}/status-icons/Chance.png`, // Discord-Emoji :chance:
    emoji: resolveDiscordEmoji('chance'),
    emojiName: 'chance',
    name: {
      de: 'Wasser', en: 'Water', fr: 'Eau', es: 'Agua',
    },
  },
  air: {
    icon: `${ICON_BASE}/status-icons/Agility.png`, // Discord-Emoji :agility:
    emoji: resolveDiscordEmoji('agility'),
    emojiName: 'agility',
    name: {
      de: 'Luft', en: 'Air', fr: 'Air', es: 'Aire',
    },
  },
};

module.exports = { RESISTANCE_TYPES };