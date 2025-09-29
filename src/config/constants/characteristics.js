const { ICON_BASE, resolveDiscordEmoji } = require('./shared');

const CHARACTERISTIC_TYPES = {
  vitality: {
    icon: `${ICON_BASE}/status-icons/Dofus_Vitality.png`,
    emoji: resolveDiscordEmoji('vitality'),
    name: {
      de: 'LP', en: 'HP', fr: 'PV', es: 'PdV', // Discord-Emoji :vitality:
    },
  },
  actionPoints: {
    icon: `${ICON_BASE}/status-icons/Dofus_AP.png`,
    emoji: resolveDiscordEmoji('ap'),
    name: {
      de: 'AP', en: 'AP', fr: 'PA', es: 'PA', // Discord-Emoji :ap:
    },
  },
  movementPoints: {
    icon: `${ICON_BASE}/status-icons/Dofus_BP.png`,
    emoji: resolveDiscordEmoji('mp'),
    name: {
      de: 'BP', en: 'MP', fr: 'PM', es: 'PM', // Discord-Emoji :mp:
    },
  },
  range: {
    icon: `${ICON_BASE}/status-icons/Dofus_RW.png`,
    emoji: resolveDiscordEmoji('range'),
    name: {
      de: 'RW', en: 'RG', fr: 'PO', es: 'AL', // Discord-Emoji :range:
    },
  },
  summons: {
    icon: `${ICON_BASE}/status-icons/Dofus_Summ.png`,
    emoji: resolveDiscordEmoji('summons'),
    name: {
      de: 'Beschwörungen', en: 'Summons', fr: 'Invocations', es: 'Invocaciones', // Discord-Emoji :summon:
    },
  },
  initiative: {
    icon: `${ICON_BASE}/status-icons/Dofus_Initiative.png`,
    emoji: resolveDiscordEmoji('initiative'),
    name: {
      de: 'Initiative', en: 'Initiative', fr: 'Initiative', es: 'Iniciativa', // Discord-Emoji :initiative:
    },
  },
  criticalHit: {
    icon: `${ICON_BASE}/status-icons/Dofus_Krit.png`,
    emoji: resolveDiscordEmoji('krit'),
    name: {
      de: 'Kritisch', en: 'Critical', fr: 'Critique', es: 'Crítico', // Discord-Emoji :krit:
    },
  },
  strength: {
    icon: `${ICON_BASE}/status-icons/Dofus_Strength.png`,
    emoji: resolveDiscordEmoji('strength'),
    name: {
      de: 'Stärke', en: 'Strength', fr: 'Force', es: 'Fuerza', // Discord-Emoji :strength:
    },
  },
  intelligence: {
    icon: `${ICON_BASE}/status-icons/Dofus_Intelligence.png`,
    emoji: resolveDiscordEmoji('intelligence'),
    name: {
      de: 'Intelligenz', en: 'Intelligence', fr: 'Intelligence', es: 'Inteligencia', // Discord-Emoji :intelligence:
    },
  },
  chance: {
    icon: `${ICON_BASE}/status-icons/Dofus_Chance.png`,
    emoji: resolveDiscordEmoji('chance'),
    name: {
      de: 'Glück', en: 'Chance', fr: 'Chance', es: 'Suerte', // Discord-Emoji :chance:
    },
  },
  agility: {
    icon: `${ICON_BASE}/status-icons/Dofus_Agility.png`,
    emoji: resolveDiscordEmoji('agility'),
    name: {
      de: 'Flinkheit', en: 'Agility', fr: 'Agilité', es: 'Agilidad', // Discord-Emoji :agility:
    },
  },
};

module.exports = { CHARACTERISTIC_TYPES };