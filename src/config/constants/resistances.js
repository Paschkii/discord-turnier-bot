const { ICON_BASE, resolveDiscordEmoji } = require('./shared');

const RESISTANCE_TYPES = {
  neutral: {
    icon: `${ICON_BASE}/status-icons/Dofus_Neutral.png`, // Discord-Emoji :neutral:
    emoji: resolveDiscordEmoji('neutral'),
    name: {
      de: 'Neutral', en: 'Neutral', fr: 'Neutre', es: 'Neutral',
    },
  },
  earth: {
    icon: `${ICON_BASE}/status-icons/Dofus_Strength.png`, // Discord-Emoji :strength:
    emoji: resolveDiscordEmoji('strength'),
    name: {
      de: 'Erde', en: 'Earth', fr: 'Terre', es: 'Tierra',
    },
  },
  fire: {
    icon: `${ICON_BASE}/status-icons/Dofus_Intelligence.png`, // Discord-Emoji :intelligence:
    emoji: resolveDiscordEmoji('intelligence'),
    name: {
      de: 'Feuer', en: 'Fire', fr: 'Feu', es: 'Fuego',
    },
  },
  water: {
    icon: `${ICON_BASE}/status-icons/Dofus_Chance.png`, // Discord-Emoji :chance:
    emoji: resolveDiscordEmoji('chance'),
    name: {
      de: 'Wasser', en: 'Water', fr: 'Eau', es: 'Agua',
    },
  },
  air: {
    icon: `${ICON_BASE}/status-icons/Dofus_Agility.png`, // Discord-Emoji :agility:
    emoji: resolveDiscordEmoji('agility'),
    name: {
      de: 'Luft', en: 'Air', fr: 'Air', es: 'Aire',
    },
  },
};

module.exports = { RESISTANCE_TYPES };