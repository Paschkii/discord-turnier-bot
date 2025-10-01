const { ICON_BASE, resolveDiscordEmoji } = require('./shared');
// Definition von Charakteristiken mit Icons, Emojis und mehrsprachigen Namen
const CHARACTERISTIC_TYPES = {
  vitality: {
    icon: `${ICON_BASE}/status-icons/Dofus_Vitality.png`,
    emoji: resolveDiscordEmoji('vitality'),
    name: {
      de: 'LP', en: 'HP', es: 'PV', fr: 'PV', pt: 'PV' // Discord-Emoji :vitality:
    },
  },
  actionPoints: {
    icon: `${ICON_BASE}/status-icons/Dofus_AP.png`,
    emoji: resolveDiscordEmoji('ap'),
    name: {
      de: 'AP', en: 'AP', es: 'PA', fr: 'PA', pt: 'PA' // Discord-Emoji :ap:
    },
  },
  movementPoints: {
    icon: `${ICON_BASE}/status-icons/Dofus_BP.png`,
    emoji: resolveDiscordEmoji('mp'),
    name: {
      de: 'BP', en: 'MP', es: 'PM', fr: 'PM', pt: 'PM' // Discord-Emoji :mp:
    },
  },
  range: {
    icon: `${ICON_BASE}/status-icons/Dofus_RW.png`,
    emoji: resolveDiscordEmoji('range'),
    name: {
      de: 'Reichweite', en: 'Range', es: 'Alcance', fr: 'Portée', pt:'Alcance' // Discord-Emoji :range:
    },
  },
  summons: {
    icon: `${ICON_BASE}/status-icons/Dofus_Summ.png`,
    emoji: resolveDiscordEmoji('summons'),
    name: {
      de: 'Beschwörungen', en: 'Summons', es: 'Invocación', fr: 'Invocation', pt: 'Invocações' // Discord-Emoji :summon:
    },
  },
  initiative: {
    icon: `${ICON_BASE}/status-icons/Dofus_Initiative.png`,
    emoji: resolveDiscordEmoji('initiative'),
    name: {
      de: 'Initiative', en: 'Initiative', es: 'Iniciativa', fr: 'Initiative', pt: 'Iniciativa' // Discord-Emoji :initiative:
    },
  },
  criticalHit: {
    icon: `${ICON_BASE}/status-icons/Dofus_Krit.png`,
    emoji: resolveDiscordEmoji('krit'),
    name: {
      de: 'Kritische Treffer', en: 'Critical Hits', es: 'Golpes Crítico', fr: 'Coups Critiques', pt: 'Acertos Critico' // Discord-Emoji :krit:
    },
  },
  strength: {
    icon: `${ICON_BASE}/status-icons/Dofus_Strength.png`,
    emoji: resolveDiscordEmoji('strength'),
    name: {
      de: 'Stärke', en: 'Strength', es: 'Fuerza', fr: 'Force', pt: 'Força' // Discord-Emoji :strength:
    },
  },
  intelligence: {
    icon: `${ICON_BASE}/status-icons/Dofus_Intelligence.png`,
    emoji: resolveDiscordEmoji('intelligence'),
    name: {
      de: 'Intelligenz', en: 'Intelligence', es: 'Inteligencia', fr: 'Intelligence', pt: 'Inteligência' // Discord-Emoji :intelligence:
    },
  },
  chance: {
    icon: `${ICON_BASE}/status-icons/Dofus_Chance.png`,
    emoji: resolveDiscordEmoji('chance'),
    name: {
      de: 'Glück', en: 'Chance', es: 'Suerte', fr: 'Chance', pt: 'Sorte' // Discord-Emoji :chance:
    },
  },
  agility: {
    icon: `${ICON_BASE}/status-icons/Dofus_Agility.png`,
    emoji: resolveDiscordEmoji('agility'),
    name: {
      de: 'Flinkheit', en: 'Agility', es: 'Agilidad', fr: 'Agilité', pt: 'Agilidade' // Discord-Emoji :agility:
    },
  },
};

module.exports = { CHARACTERISTIC_TYPES };