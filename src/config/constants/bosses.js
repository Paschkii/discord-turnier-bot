const { ICON_BASE } = require('./shared');

const BOSSE_LISTE = [
  // === Level 1 - 50 Dungeons ===
  // Belladonna
  { bossID: 'belladonna',
    name: {
      de: 'Belladonna',
      en: 'Belladonna',
      es: 'Belladona',
      fr: 'Belladone',
      pt: 'Beladona',
    },
    imageUrl: `${ICON_BASE}/boss-icons/belladonna.png`,
    level: 12,
    region: 'albuera',
    family: 'albuera',
    homeDungeonBossID: 'belladonna_dungeon',
    characteristics: {
      healthPoints: 120,
      actionPoints: 7,
      movementPoints: 3
    },
    resistances: {
      neutral_percent: 0,
      earth_percent: 0,
      fire_percent: 0,
      water_percent: 0,
      air_percent: 0,
    }
  },
  // Famished Sunflower
  { bossID: 'famished_sunflower',
    name: {
      de: 'Ausgehungertes Sonnenblümchen',
      en: 'Famished Sunflower',
      es: 'Girasol Hambriento',
      fr: 'Tournesol Affamé',
      pt: 'Girassol Faminto',
    },
    imageUrl: `${ICON_BASE}/boss-icons/famished_sunflower.png`,
    level: 35,
    region: '',
    family: '',
    homeDungeonBossID: 'field_dungeon',
    characteristics: {
      healthPoints: 920,
      actionPoints: 8,
      movementPoints: 3,
      apParry: 8,
      mpParry: 8,
      lock: 10,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 25,
      earth_percent: 25,
      fire_percent: 15,
      water_percent: -10,
      air_percent: -15,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Sponge Mob
  { bossID: 'spongemob',
    name: {
      de: 'Spongemob Schwammtopf',
      en: 'Sponge Mob',
      es: 'Mob Lasponja',
      fr: 'Mob l\'Éponge',
      pt: 'Mob Esponja',
    },
    imageUrl: `${ICON_BASE}/boss-icons/spongemob.png`,
    level: 40,
    region: '',
    family: '',
    homeDungeonBossID: 'sand_dungeon',
    characteristics: {
      healthPoints: 1200,
      actionPoints: 7,
      movementPoints: 4,
      apParry: 15,
      mpParry: 15,
      lock: 15,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 22,
      earth_percent: 14,
      fire_percent: -5,
      water_percent: 14,
      air_percent: -5,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Golden Scarabugly
  { bossID: 'golden_scarabugly',
    name: {
      de: 'Goldenes Scarabiest',
      en: 'Golden Scarabugly',
      es: 'Escarajefe Dorado',
      fr: 'Scarabosse Doré',
      pt: 'Scarachefe Dourado',
    },
    imageUrl: `${ICON_BASE}/boss-icons/golden_scarabugly.png`,
    level: 40,
    region: '',
    family: '',
    homeDungeonBossID: 'scaraleaf_dungeon',
    characteristics: {
      healthPoints: 1600,
      actionPoints: 8,
      movementPoints: 3,
      apParry: 30,
      mpParry: 30,
      lock: 28,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 24,
      earth_percent: 24,
      fire_percent: 24,
      water_percent: 24,
      air_percent: 24,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Batofu
  { bossID: 'batofu',
    name: {
      de: 'Batofu',
      en: 'Batofu',
      es: 'Batofu',
      fr: 'Batofu',
      pt: 'Batofu',
    },
    imageUrl: `${ICON_BASE}/boss-icons/batofu.png`,
    level: 40,
    region: '',
    family: '',
    homeDungeonBossID: 'tofu_house',
    characteristics: {
      healthPoints: 1000,
      actionPoints: 5,
      movementPoints: 10,
      apParry: 20,
      mpParry: 12,
      lock: 15,
      criticalResistance: 0,
      pushbackResistanceResistance: 0
    },
    resistances: {
      neutral_percent: 14,
      earth_percent: 9,
      fire_percent: -25,
      water_percent: -15,
      air_percent: 37,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Boostache
  { bossID: 'boostache',
    name: {
      de: 'Bartaboo',
      en: 'Boostache',
      fr: 'Boostache',
      es: 'Boostacho',
      pt: 'Boostache',
    },
    imageUrl: `${ICON_BASE}/boss-icons/boostache.png`,
    level: 40,
    region: '',
    family: '',
    homeDungeonBossID: 'haunted_house',
    characteristics: {
      healthPoints: 890,
      actionPoints: 10,
      movementPoints: 6,
      apParry: 35,
      mpParry: 55,
      lock: 35,
      criticalResistance: 15,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 55,
      earth_percent: 0,
      fire_percent: 0,
      water_percent: 15,
      air_percent: 85,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Ronin Chafer
  { bossID: 'ronin_chafer',
    name: {
      de: 'Ronin Chafer',
      en: 'Ronin Chafer',
      es: 'Chafer Ronin',
      fr: 'Chafer Ronin',
      pt: 'Chafer Ronin',
    },
    imageUrl: `${ICON_BASE}/boss-icons/ronin_chafer.png`,
    level: 40,
    region: '',
    family: '',
    homeDungeonBossID: 'skeleton_dungeon',
    characteristics: {
      healthPoints: 680,
      actionPoints: 10,
      movementPoints: 4,
      apParry: 16,
      mpParry: 24,
      lock: 30,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 0,
      earth_percent: 0,
      fire_percent: 0,
      water_percent: 0,
      air_percent: 0,
      neutral_fixed: 7,
      earth_fixed: 9,
      fire_fixed: 15,
      water_fixed: 12,
      air_fixed: 9
    }
  },
  // Royal Gobball
  { bossID: 'royal_gobball',
    name: {
      de: 'Königlicher Fresssack',
      en: 'Royal Gobball',
      es: 'Jalató Real',
      fr: 'Bouftou Royal',
      pt: 'Papatoudo Real',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_gobball.png`,
    level: 60,
    region: '',
    family: '',
    homeDungeonBossID: 'gobball_dungeon',
    characteristics: {
      healthPoints: 1700,
      actionPoints: 9,
      movementPoints: 5,
      apParry: 10,
      mpParry: 10,
      lock: 15,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: -5,
      earth_percent: 13,
      fire_percent: 10,
      water_percent: 22,
      air_percent: 0,
      neutral_fixed: 7,
      earth_fixed: 9,
      fire_fixed: 15,
      water_fixed: 12,
      air_fixed: 9
    }
  },
  // Bworkette
  { bossID: 'bworkette',
    name: {
      de: 'Bworkette',
      en: 'Bworkette',
      es: 'Bworka',
      fr: 'Bworkette',
      pt: 'Bworka',
    },
    imageUrl: `${ICON_BASE}/boss-icons/bworkette.png`,
    level: 50,
    region: '',
    family: '',
    homeDungeonBossID: 'bwork_dungeon',
    characteristics: {
      healthPoints: 1600,
      actionPoints: 9,
      movementPoints: 5,
      apParry: 10,
      mpParry: 10,
      lock: 14,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 33,
      earth_percent: 33,
      fire_percent: 48,
      water_percent: 18,
      air_percent: 28,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Smith's Chest
  { bossID: 'smiths_chest',
    name: {
      de: 'Schatztruhe der Schattenschmiede',
      en: 'Smith\'s Chest',
      es: 'Cofrerrero',
      fr: 'Coffre des Forgerons',
      pt: 'Baú des Ferreiros',
    },
    imageUrl: `${ICON_BASE}/boss-icons/smiths_chest.png`,
    level: 50,
    region: '',
    family: '',
    homeDungeonBossID: 'blacksmith_dungeon',
    characteristics: {
      healthPoints: 820,
      actionPoints: 8,
      movementPoints: 3,
      apParry: 20,
      mpParry: 20,
      lock: 20,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 0,
      earth_percent: 0,
      fire_percent: 0,
      water_percent: 0,
      air_percent: 0,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Shin Larva
  { bossID: 'shin_larva',
    name: {
      de: 'Shin Larve',
      en: 'Shin Larva',
      es: 'Shin Larva',
      fr: 'Shin Larve',
      pt: 'Shin Larva',
    },
    imageUrl: `${ICON_BASE}/boss-icons/shin_larva.png`,
    level: 50,
    region: '',
    family: '',
    homeDungeonBossID: 'larva_dungeon',
    characteristics: {
      healthPoints: 1200,
      actionPoints: 9,
      movementPoints: 2,
      apParry: 28,
      mpParry: 28,
      lock: 28,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 54,
      earth_percent: 34,
      fire_percent: 34,
      water_percent: -26,
      air_percent: -26,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Great Coralator
  { bossID: 'great_coralator',
    name: {
      de: 'Mächtiger Korallator',
      en: 'Great Coralator',
      es: 'Coralador Magistral',
      fr: 'Corailleur Magistral',
      pt: 'Mestre Coralador'
    },
    imageUrl: `${ICON_BASE}/boss-icons/great_coralator.png`,
    level: 50,
    region: '',
    family: '',
    homeDungeonBossID: 'grotto_hesque',
    characteristics: {
      healthPoints: 2000,
      actionPoints: 8,
      movementPoints: 3,
      apParry: 14,
      mpParry: 14,
      lock: 14,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 23,
      earth_percent: -6,
      fire_percent: 13,
      water_percent: 18,
      air_percent: -7,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Kwakwa
  { bossID: 'kwakwa',
    name: {
      de: 'Kwackatau',
      en: 'Kwakwa',
      es: 'Kwoknan',
      fr: 'Kwakwa',
      pt: 'Kwakwa',
    },
    imageUrl: `${ICON_BASE}/boss-icons/.png`,
    level: 50,
    region: '',
    family: '',
    homeDungeonBossID: 'kwakwas_nest',
    characteristics: {
      healthPoints: 1100,
      actionPoints: 9,
      movementPoints: 7,
      apParry: 30,
      mpParry: 30,
      lock: 80,
      criticalResistance: 0,
      pushbackResistance: 50
    },
    resistances: {
      neutral_percent: 40,
      earth_percent: 40,
      fire_percent: 40,
      water_percent: 40,
      air_percent: 40,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // === Level 51 - 100 Dungeons ===
  // Wa Wabbit
  { bossID: 'wa_wabbit',
    name: {
      de: 'Wa Wabbit',
      en: 'Wa Wabbit',
      es: 'Wey Wabbit',
      fr: 'Wa Wabbit',
      pt: 'Wei Wabbit',
    },
    imageUrl: `${ICON_BASE}/boss-icons/wa_wabbit.png`,
    level: 60,
    region: '',
    family: '',
    homeDungeonBossID: 'wa_wabbits_castle',
    characteristics: {
      healthPoints: 3000,
      actionPoints: 10,
      movementPoints: 4,
      apParry: 20,
      mpParry: 20,
      lock: 13,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 29,
      earth_percent: 29,
      fire_percent: 19,
      water_percent: -6,
      air_percent: -11,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Kanniball Andchain
  { bossID: 'kanniball_andchain',
    name: {
      de: 'Kanniball Ahde',
      en: 'Kanniball Andchain',
      es: 'Kanibola Daldrrak',
      fr: 'Kanniboul Ebil',
      pt: 'Kanibola Fora',
    },
    imageUrl: `${ICON_BASE}/boss-icons/kanniball_andchain.png`,
    level: 60,
    region: '',
    family: '',
    homeDungeonBossID: 'kanniball_dungeon',
    characteristics: {
      healthPoints: 1400,
      actionPoints: 10,
      movementPoints: 3,
      apParry: 25,
      mpParry: 25,
      lock: 6,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 58,
      earth_percent: 23,
      fire_percent: 23,
      water_percent: 23,
      air_percent: 23,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // -- Blops --
  // Royal Coco Blop
  { bossID: 'royal_coco_blop',
    name: {
      de: 'Königlicher Kokos Blob',
      en: 'Royal Coco Blop',
      es: 'Blop Coco Real',
      fr: 'Blop Coco Royal',
      pt: 'Blop Coco Real',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_coco_blop.png`,
    level: 60,
    region: '',
    family: '',
    homeDungeonBossID: 'blop_dungeon',
    characteristics: {
      healthPoints: 2400,
      actionPoints: 10,
      movementPoints: 5,
      apParry: 28,
      mpParry: 28,
      lock: 28,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: -12,
      earth_percent: -12,
      fire_percent: -12,
      water_percent: -12,
      air_percent: 94,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    },
    alsoIn: [
      { dungeonbossID: 'rainbow_blop_lair_percent',
        overrides: { healthPoints: 3500 }
      }
    ],
  },
  // Royal Indigo Blop
  { bossID: 'royal_indigo_blop',
    name: {
      de: 'Königlicher Indigo Blob',
      en: 'Royal Indigo Blop',
      es: 'Blop Indigo Real',
      fr: 'Blop Indigo Royal',
      pt: 'Blop Indigo Real',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_indigo_blop.png`,
    level: 60,
    region: '',
    family: '',
    homeDungeonBossID: 'blop_dungeon',
    characteristics: {
      healthPoints: 2400,
      actionPoints: 10,
      movementPoints: 5,
      apParry: 28,
      mpParry: 28,
      lock: 28,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: -12,
      earth_percent: -12,
      fire_percent: -12,
      water_percent: 94,
      air_percent: -12,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    },
    alsoIn: [
      { dungeonbossID: 'rainbow_blop_lair_percent',
        overrides: { healthPoints: 3500 }
      }
    ],
  },
  // Royal Morello Cherry Blop
  { bossID: 'royal_morello_cherry_blop',
    name: {
      de: 'Königlicher Kirsch Blob',
      en: 'Royal Morello Cherry Blop',
      es: 'Blop Guinda Real',
      fr: 'Blop Griotte Royal',
      pt: 'Blop Cereja Real',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_morello_cherry_blop.png`,
    level: 60,
    region: '',
    family: '',
    homeDungeonBossID: 'blop_dungeon',
    characteristics: {
      healthPoints: 2400,
      actionPoints: 10,
      movementPoints: 5,
      apParry: 28,
      mpParry: 28,
      lock: 28,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: -12,
      earth_percent: -12,
      fire_percent: 94,
      water_percent: -12,
      air_percent: -12,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    },
    alsoIn: [
      { dungeonbossID: 'rainbow_blop_lair_percent',
        overrides: { healthPoints: 3500 }
      }
    ],
  },
  // Royal Pippin Blop
  { bossID: 'royal_pippin_blop',
    name: {
      de: 'Königlicher Apfel Blob',
      en: 'Royal Pippin Blop',
      es: 'Blop Reineta Real',
      fr: 'Blop Reinette Royal',
      pt: 'Blop Maçã Real',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_pippin_blop.png`,
    level: 60,
    region: '',
    family: '',
    homeDungeonBossID: 'blop_dungeon',
    characteristics: {
      healthPoints: 2400,
      actionPoints: 10,
      movementPoints: 5,
      apParry: 28,
      mpParry: 28,
      lock: 28,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: -12,
      earth_percent: 94,
      fire_percent: -12,
      water_percent: -12,
      air_percent: -12,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    },
    alsoIn: [
      { dungeonbossID: 'rainbow_blop_lair_percent',
        overrides: { healthPoints: 3500 }
      }
    ],
  },
  // -- Jellys --
  // Royal Blue Jelly
  { bossID: 'royal_blue_jelly',
    name: {
      de: 'Königliches Blaubeergelee',
      en: 'Royal Blue Jelly',
      es: 'Gelatina Real Azul',
      fr: 'Gelée Royale Bleue',
      pt: 'Gelatina Real Azul',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_blue_jelly.png`,
    level: 60,
    region: '',
    family: '',
    homeDungeonBossID: 'jellith_dimension',
    characteristics: {
      healthPoints: 1400,
      actionPoints: 10,
      movementPoints: 5,
      apParry: 32,
      mpParry: 32,
      lock: 18,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 50,
      earth_percent: 50,
      fire_percent: 50,
      water_percent: -10,
      air_percent: 50,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Royal Lemon Jelly
  { bossID: 'royal_lemon_jelly',
    name: {
      de: 'Königliches Zitronengelee',
      en: 'Royal Lemon Jelly',
      es: 'Gelatina Real de Limón',
      fr: 'Gelée Royale Citron',
      pt: 'Gelatina Real de Limão',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_lemon_jelly.png`,
    level: 60,
    region: '',
    family: '',
    homeDungeonBossID: 'jellith_dimension',
    characteristics: {
      healthPoints: 1300,
      actionPoints: 10,
      movementPoints: 5,
      apParry: 19,
      mpParry: 14,
      lock: 25,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 50,
      earth_percent: 50,
      fire_percent: 50,
      water_percent: 50,
      air_percent: -10,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Royal Mint Jelly
  { bossID: 'royal_mint_jelly',
    name: {
      de: 'Königliches Minzgelee',
      en: 'Royal Mint Jelly',
      es: 'Gelatina Real de Menta',
      fr: 'Gelée Royale Menthe',
      pt: 'Gelatina Real de Menta',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_mint_jelly.png`,
    level: 60,
    region: '',
    family: '',
    homeDungeonBossID: 'jellith_dimension',
    characteristics: {
      healthPoints: 1400,
      actionPoints: 10,
      movementPoints: 4,
      apParry: 32,
      mpParry: 41,
      lock: 10,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 50,
      earth_percent: -10,
      fire_percent: 50,
      water_percent: 50,
      air_percent: 50,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Royal Strawberry Jelly
  { bossID: 'royal_strawberry_jelly',
    name: {
      de: 'Königliches Erdbeergelee',
      en: 'Royal Strawberry Jelly',
      es: 'Gelatina Real de Fresa',
      fr: 'Gelée Royale Fraise',
      pt: 'Gelatina Real de Morango',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_strawberry_jelly.png`,
    level: 60,
    region: '',
    family: '',
    homeDungeonBossID: 'jellith_dimension',
    characteristics: {
      healthPoints: 1400,
      actionPoints: 10,
      movementPoints: 5,
      apParry: 10,
      mpParry: 10,
      lock: 5,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 50,
      earth_percent: 50,
      fire_percent: -10,
      water_percent: 50,
      air_percent: 50,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Nelween
  { bossID: 'nelween',
    name: {
      de: 'Nelwynn',
      en: 'Nelween',
      es: 'Nelwynn',
      fr: 'Nelween',
      pt: 'Nelween',
    },
    imageUrl: `${ICON_BASE}/boss-icons/nelween.png`,
    level: 70,
    region: '',
    family: '',
    homeDungeonBossID: 'brumen_tinctorias_laboratory',
    characteristics: {
      healthPoints: 1900,
      actionPoints: 8,
      movementPoints: 5,
      apParry: 40,
      mpParry: 40,
      lock: 20,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 30,
      earth_percent: 0,
      fire_percent: 0,
      water_percent: 0,
      air_percent: 0,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Gourlo the Terrible
  { bossID: 'gourlo_the_terrible',
    name: {
      de: 'Gurrlo der Fürchterliche',
      en: 'Gourlo the Terrible',
      es: 'Gurlo el Terrible',
      fr: 'Gourlo le Terrible',
      pt: 'Gurlo o Terrível',
    },
    imageUrl: `${ICON_BASE}/boss-icons/gourlo_the_terrible.png`,
    level: 70,
    region: '',
    family: '',
    homeDungeonBossID: 'hold_of_otomais_ark',
    characteristics: {
      healthPoints: 1900,
      actionPoints: 10,
      movementPoints: 5,
      apParry: 14,
      mpParry: 14,
      lock: 14,
      criticalResistance: 0,
      pushbackResistance: 9999
    },
    resistances: {
      neutral_percent: 200,
      earth_percent: 200,
      fire_percent: 200,
      water_percent: 200,
      air_percent: 200,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Legendary Crackler
  { bossID: 'legendary_crackler',
    name: {
      de: 'Legendärer Mega Krachler',
      en: 'Legendary Crackler',
      es: 'Crujidor Legendario',
      fr: 'Craqueleur Légendaire',
      pt: 'Smagador Lendário',
    },
    imageUrl: `${ICON_BASE}/boss-icons/legendary_crackler.png`,
    level: 70,
    region: '',
    family: '',
    homeDungeonBossID: 'crackler_dungeon',
    characteristics: {
      healthPoints: 3100,
      actionPoints: 8,
      movementPoints: 3,
      apParry: 30,
      mpParry: 29,
      lock: 14,
      criticalResistance: 30,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 58,
      earth_percent: -12,
      fire_percent: 28,
      water_percent: 36,
      air_percent: -17,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Wa Wobot
  { bossID: 'wa_wobot',
    name: {
      de: 'Wa Wobot',
      en: 'Wa Wobot',
      es: 'Wey Wobot',
      fr: 'Wa Wobot',
      pt: 'Wei Wobot',
    },
    imageUrl: `${ICON_BASE}/boss-icons/wa_wobot.png`,
    level: 80,
    region: '',
    family: '',
    homeDungeonBossID: 'wa_wabbits_castle',
    characteristics: {
      healthPoints: 3500,
      actionPoints: 14,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: -10,
      earth_percent: 16,
      fire_percent: 8,
      water_percent: 25,
      air_percent: 21,
    }
  },
  // Ancestral Treechnid
  { bossID: 'ancestral_treechnid',
    name: {
      de: 'Ur-Astaknyde',
      en: 'Ancestral Treechnid',
      es: 'Abráknido Ancestral',
      fr: 'Abraknyde Ancestral',
      pt: 'Arvraknideo Ancestral',
    },
    imageUrl: `${ICON_BASE}/boss-icons/ancestral_treechnid.png`,
    level: 90,
    region: '',
    family: '',
    homeDungeonBossID: 'treechnid_dungeon',
    characteristics: {
      healthPoints: 3600,
      actionPoints: 12,
      movementPoints: 5,
      apParry: 44,
      mpParry: 44,
      lock: 32,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 30,
      earth_percent: 30,
      fire_percent: -5,
      water_percent: 30,
      air_percent: -5,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Selim Quartz
  { bossID: 'selim_quartz',
    name: {
      de: 'Oberstnimb Selim Quartz',
      en: 'Major-Yoberal Selim Quartz',
      es: 'Coronano Selim Quartz',
      fr: 'Colonimb Selim Quartz',
      pt: 'Anão Bicioso',
    },
    imageUrl: `${ICON_BASE}/boss-icons/selim_quartz.png`,
    level: 90,
    region: '',
    family: '',
    homeDungeonBossID: 'hard_head_dam',
    characteristics: {
      healthPoints: 4500,
      actionPoints: 14,
      movementPoints: 4,
      apParry: 35,
      mpParry: 35,
      lock: 50,
      criticalResistance: 10,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 15,
      earth_percent: 26,
      fire_percent: 30,
      water_percent: 8,
      air_percent: 13,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Dragon Pig
  { bossID: 'dragonpig',
    name: {
      de: 'Schweinedrachen',
      en: 'Dragonpig',
      es: 'Dragocerdo',
      fr: 'Dragon Cochon',
      pt: 'Dragão Porco',
    },
    imageUrl: `${ICON_BASE}/boss-icons/dragonpig.png`,
    level: 100,
    region: '',
    family: '',
    homeDungeonBossID: 'dragonpigs_den',
    characteristics: {
      healthPoints: 3100,
      actionPoints: 10,
      movementPoints: 5,
      apParry: 72,
      mpParry: 72,
      lock: 110,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 38,
      earth_percent: 38,
      fire_percent: 38,
      water_percent: -5,
      air_percent: -5,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Koolich
  { bossID: 'koolich',
    name: {
      de: 'Kuhloss',
      en: 'Koolich',
      es: 'Trankitronko',
      fr: 'Koulosse',
      pt: 'Tronkoso',
    },
    imageUrl: `${ICON_BASE}/boss-icons/dragonpig.png`,
    level: 100,
    region: '',
    family: '',
    homeDungeonBossID: 'koolich_cavern',
    characteristics: {
      healthPoints: 5800,
      actionPoints: 10,
      movementPoints: 3
    },
    resistances: {
      neutral_percent: 78,
      earth_percent: 28,
      fire_percent: -12,
      water_percent: -12,
      air_percent: 33,
    }
  },
  // Moon
  { bossID: 'moon',
    name: {
      de: 'Moon',
      en: 'Moon',
      es: 'Moon',
      fr: 'Moon',
      pt: 'Moon',
    },
    imageUrl: `${ICON_BASE}/boss-icons/moon.png`,
    level: 400,
    region: '',
    family: '',
    homeDungeonBossID: 'moon_dungeon',
    characteristics: {
      healthPoints: 6600,
      actionPoints: 10,
      movementPoints: 6,
      apParry: 20,
      mpParry: 20,
      lock: 30,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 10,
      earth_percent: 20,
      fire_percent: 0,
      water_percent: -10,
      air_percent: 20,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Moowolf
  { bossID: 'moowolf',
    name: {
      de: 'MuWulf',
      en: 'Moowolf',
      es: 'Maxilubo',
      fr: 'Meulou',
      pt: 'Mulobu',
    },
    imageUrl: `${ICON_BASE}/boss-icons/moowolf.png`,
    level: 100,
    region: '',
    family: '',
    homeDungeonBossID: 'canbossIDae_dungeon',
    characteristics: {
      healthPoints: 5700,
      actionPoints: 8,
      movementPoints: 7,
      apParry: 46,
      mpParry: 50,
      lock: 52,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 22,
      earth_percent: 32,
      fire_percent: -5,
      water_percent: 42,
      air_percent: 42,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // === Level 101 - 150 Dungeons ===
  // Silf the Greater Berb
  { bossID: 'silf',
    name: {
      de: 'Groß-Shilf',
      en: 'Silf The Greater Berb',
      es: 'Silf el Rasgabola Mayor',
      fr: 'Silf le Rasboul Majeur',
      pt: 'Silf o Rasgabola Major',
    },
    imageUrl: `${ICON_BASE}/boss-icons/silf.png`,
    level: 440,
    region: '',
    family: '',
    homeDungeonBossID: 'bherbs_gully',
    characteristics: {
      healthPoints: 7000,
      actionPoints: 8,
      movementPoints: 5,
      apParry: 64,
      mpParry: 64,
      lock: 44,
      criticalResistance: 0,
      pushbackResistance: 9999
    },
    resistances: {
      neutral_percent: 200,
      earth_percent: 200,
      fire_percent: 200,
      water_percent: 200,
      air_percent: 200,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Lord Crow
  { bossID: 'lord_crow',
    name: {
      de: 'Meister Rab',
      en: 'Lord Crow',
      es: 'Maestro Cuerbok',
      fr: 'Maître Corbac',
      pt: 'Mestre Corvoc',
    },
    imageUrl: `${ICON_BASE}/boss-icons/lord_crow.png`,
    level: 110,
    region: '',
    family: '',
    homeDungeonBossID: 'lord_crows_library',
    characteristics: {
      healthPoints: 4500,
      actionPoints: 12,
      movementPoints: 6,
      apParry: 54,
      mpParry: 54,
      lock: 44,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 26,
      earth_percent: 26,
      fire_percent: 46,
      water_percent: 56,
      air_percent: 56,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // White Rat
  { bossID: 'white_rat',
    name: {
      de: 'Weiße Ratte',
      en: 'White Rat',
      es: 'Rata Blanca',
      fr: 'Rat Blanc',
      pt: 'Rato Branco',
    },
    imageUrl: `${ICON_BASE}/boss-icons/white_rat.png`,
    level: 110,
    region: '',
    family: '',
    homeDungeonBossID: 'bonta_rat_dungeon',
    characteristics: {
      healthPoints: 3500,
      actionPoints: 7,
      movementPoints: 4,
      apParry: 28,
      mpParry: 28,
      lock: 13,
      criticalResistance: 0,
      pushbackResistance: 50
    },
    resistances: {
      neutral_percent: 0,
      earth_percent: 0,
      fire_percent: 0,
      water_percent: 0,
      air_percent: 0,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Schwarze Ratte
  { bossID: 'black_rat',
    name: {
      de: 'Schwarze Ratte',
      en: 'Black Rat',
      es: 'Rata Negra',
      fr: 'Rat Noir',
      pt: 'Rato Negro',
    },
    imageUrl: `${ICON_BASE}/boss-icons/black_rat.png`,
    level: 110,
    region: '',
    family: '',
    homeDungeonBossID: 'brakmar_rat_dungeon',
    characteristics: {
      healthPoints: 3500,
      actionPoints: 7,
      movementPoints: 4
    },
    resistances: {
      neutral_percent: 5,
      earth_percent: 50,
      fire_percent: -20,
      water_percent: 20,
      air_percent: -20,
    }
  },
  // Royal Rainbow Blop
  { bossID: 'royal_rainbow_blop',
    name: {
      de: 'Königlicher Multiblob',
      en: 'Royal Rainbow Blob',
      es: 'Blop Multicolor Real',
      fr: 'Blop Multicolore Royal',
      pt: 'Blop Arco-iris Real',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_rainbow_blop.png`,
    level: 120,
    region: '',
    family: '',
    homeDungeonBossID: 'rainbow_blop_lair_percent',
    characteristics: {
      healthPoints: 3400,
      actionPoints: 10,
      movementPoints: 3,
      apParry: 40,
      mpParry: 40,
      lock: 35,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: -15,
      earth_percent: 15,
      fire_percent: 15,
      water_percent: 15,
      air_percent: 15,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Minotoror
  { bossID: 'minotoror',
    name: {
      de: 'Minotoror',
      en: 'Minotoror',
      es: 'Minotauroro',
      fr: 'Minotoror',
      pt: 'Minotoror',
    },
    imageUrl: `${ICON_BASE}/boss-icons/minotoror.png`,
    level: 120,
    region: '',
    family: '',
    homeDungeonBossID: 'labyrinth_minotoror',
    characteristics: {
      healthPoints: 4100,
      actionPoints: 14,
      movementPoints: 6,
      apParry: 40,
      mpParry: 40,
      lock: 40,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 35,
      earth_percent: -20,
      fire_percent: -20,
      water_percent: 45,
      air_percent: 35,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    },
    alsoIn: [
      { dungeonbossID: 'minotot_room',
        overrides: { healthPoints: 6000 }
      }
    ],
  },
  // Royal Mastogob
  { bossID: 'royal_mastogob',
    name: {
      de: 'Königliches Fressmut',
      en: 'Royal Mastogob',
      es: 'Jalamut Real',
      fr: 'Royalmouth',
      pt: 'Papamute Real',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_mastogob.png`,
    level: 128,
    region: '',
    family: '',
    homeDungeonBossID: 'royal_mastogobs_greenhouse',
    characteristics: {
      healthPoints: 4000,
      actionPoints: 15,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 23,
      earth_percent: 33,
      fire_percent: 26,
      water_percent: -11,
      air_percent: 48,
    }
  },
  // Royal Tofu
  { bossID: 'royal_tofu',
    name: {
      de: 'Königlicher Tofu',
      en: 'Royal Tofu',
      es: 'Tofu Real',
      fr: 'Tofu Royal',
      pt: 'Tofu Real',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_tofu.png`,
    level: 120,
    region: '',
    family: '',
    homeDungeonBossID: 'royal_tofu_house',
    characteristics: {
      healthPoints: 3400,
      actionPoints: 12,
      movementPoints: 30,
      apParry: 60,
      mpParry: 60,
      lock: 70,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 38,
      earth_percent: 23,
      fire_percent: 18,
      water_percent: 23,
      air_percent: 58,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Crocabulia
  { bossID: 'crocabulia',
    name: {
      de: 'Crocabulia',
      en: 'Crocabulia',
      es: 'Cocabulia',
      fr: 'Crocabulia',
      pt: 'Crocabulia',
    },
    imageUrl: `${ICON_BASE}/boss-icons/crocabulia.png`,
    level: 120,
    region: '',
    family: '',
    homeDungeonBossID: 'dreggon_dungeon',
    characteristics: {
      healthPoints: 7000,
      actionPoints: 9,
      movementPoints: 3,
      apParry: 29,
      mpParry: 41,
      lock: 34,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 58,
      earth_percent: -12,
      fire_percent: 28,
      water_percent: 28,
      air_percent: 28,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Skeunk
  { bossID: 'skeunk',
    name: {
      de: 'Skeunk',
      en: 'Skeunk',
      es: 'Skonk',
      fr: 'Skeunk',
      pt: 'Skonk',
    },
    imageUrl: `${ICON_BASE}/boss-icons/skeunk.png`,
    level: 120,
    region: '',
    family: '',
    homeDungeonBossID: 'skeunks_hideout',
    characteristics: {
      healthPoints: 5800,
      actionPoints: 12,
      movementPoints: 5,
      apParry: 40,
      mpParry: 45,
      lock: 25,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 28,
      earth_percent: 28,
      fire_percent: -5,
      water_percent: -5,
      air_percent: 38,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Crakillian Guardian
  { bossID: 'crakillian_guardian',
    name: {
      de: 'Krakillian Wächter',
      en: 'Crakillian Guardian',
      es: 'Guardián Crujakillian',
      fr: 'Gardien Crakillian',
      pt: 'Guardião Smagakillian',
    },
    imageUrl: `${ICON_BASE}/boss-icons/crakillian_guardian.png`,
    level: 130,
    region: '',
    family: '',
    homeDungeonBossID: 'minerock_sanctuary',
    characteristics: {
      healthPoints: 5700,
      actionPoints: 12,
      movementPoints: 5,
      apParry: 30,
      mpParry: 50,
      lock: 50,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 5,
      earth_percent: 13,
      fire_percent: 7,
      water_percent: -8,
      air_percent: 23,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Kanigrula
  { bossID: 'kanigrula',
    name: {
      de: 'Kanigroula',
      en: 'Kanigrula',
      es: 'Kanigrula',
      fr: 'Kanigroula',
      pt: 'Kanigrula',
    },
    imageUrl: `${ICON_BASE}/boss-icons/kanigrula.png`,
    level: 140,
    region: '',
    family: '',
    homeDungeonBossID: 'kanigrulas_hbossIDeout',
    characteristics: {
      healthPoints: 6500,
      actionPoints: 12,
      movementPoints: 6,
      apParry: 55,
      mpParry: 50,
      lock: 40,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 6,
      earth_percent: 12,
      fire_percent: 8,
      water_percent: -6,
      air_percent: 20,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Soft Oak
  { bossID: 'soft_oak',
    name: {
      de: 'Weich Eich',
      en: 'Soft Oak',
      es: 'Roble Blando',
      fr: 'Chêne Mou',
      pt: 'Carvalho Mole',
    },
    imageUrl: `${ICON_BASE}/boss-icons/soft_oak.png`,
    level: 140,
    region: '',
    family: '',
    homeDungeonBossID: 'soft_oak_dungeon',
    characteristics: {
      healthPoints: 6500,
      actionPoints: 15,
      movementPoints: 2,
      apParry: 40,
      mpParry: 40,
      lock: 80,
      criticalResistance: 0,
      pushbackResistance: 100
    },
    resistances: {
      neutral_percent: 82,
      earth_percent: 52,
      fire_percent: 52,
      water_percent: -5,
      air_percent: -5,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Disconcerted Tynril
  { bossID: 'disconcerted_tynril',
    name: {
      de: 'Verdutzter Tynril',
      en: 'Disconcerted Tynril',
      es: 'Tynril Absorto',
      fr: 'Tynril Déconcerté',
      pt: 'Tynril Desconcertado',
    },
    imageUrl: `${ICON_BASE}/boss-icons/tynril.png`,
    level: 140,
    region: '',
    family: '',
    homeDungeonBossID: 'the_tynril_lab',
    characteristics: {
      healthPoints: 3800,
      actionPoints: 10,
      movementPoints: 2,
      apParry: 23,
      mpParry: 23,
      lock: 35,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 200,
      earth_percent: 200,
      fire_percent: 200,
      water_percent: 0,
      air_percent: 200,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Dismayed Tynril
  { bossID: 'dismayed_tynril',
    name: {
      de: 'Bestürzter Tynril',
      en: 'Dismayed Tynril',
      es: 'Tynril Estupefacto',
      fr: 'Tynril Consterné',
      pt: 'Tynril Consternado',
    },
    imageUrl: `${ICON_BASE}/boss-icons/tynril.png`,
    level: 140,
    region: '',
    family: '',
    homeDungeonBossID: 'the_tynril_lab',
    characteristics: {
      healthPoints: 3800,
      actionPoints: 10,
      movementPoints: 2,
      apParry: 23,
      mpParry: 23,
      lock: 35,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 200,
      earth_percent: 200,
      fire_percent: 200,
      water_percent: 200,
      air_percent: 0,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Perfidous Tynril
  { bossID: 'perfidious_tynril',
    name: {
      de: 'Perfider Tynril',
      en: 'Perfidious Tynril',
      es: 'Tynril Pérfido',
      fr: 'Tynril Perfide',
      pt: 'Tynril Pérfido',
    },
    imageUrl: `${ICON_BASE}/boss-icons/tynril.png`,
    level: 140,
    region: '',
    family: '',
    homeDungeonBossID: 'the_tynril_lab',
    characteristics: {
      healthPoints: 3800,
      actionPoints: 10,
      movementPoints: 2,
      apParry: 23,
      mpParry: 23,
      lock: 35,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 200,
      earth_percent: 200,
      fire_percent: 0,
      water_percent: 200,
      air_percent: 200,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Stunned Tynril
  { bossID: 'stunned_tynril',
    name: {
      de: 'Verblüffter Tynril',
      en: 'Stunned Tynril',
      es: 'Tynril Atónito',
      fr: 'Tynril Ahuri',
      pt: 'Tynril Chocado',
    },
    imageUrl: `${ICON_BASE}/boss-icons/tynril.png`,
    level: 140,
    region: '',
    family: '',
    homeDungeonBossID: 'the_tynril_lab',
    characteristics: {
      healthPoints: 3800,
      actionPoints: 10,
      movementPoints: 2,
      apParry: 23,
      mpParry: 23,
      lock: 35,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 200,
      earth_percent: 0,
      fire_percent: 200,
      water_percent: 200,
      air_percent: 200,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Royal Pingwin
  { bossID: 'royal_pingwin',
    name: {
      de: 'King Ping',
      en: 'Royal Pingwin',
      es: 'Morsagūino Real',
      fr: 'Mansot Royal',
      pt: 'Pingwin Real',
    },
    imageUrl: `${ICON_BASE}/boss-icons/royal_pingwin.png`,
    level: 162,
    region: '',
    family: '',
    homeDungeonBossID: 'royal_pingwins_excavation',
    characteristics: {
      healthPoints: 4900,
      actionPoints: 15,
      movementPoints: 4
    },
    resistances: {
      neutral_percent: 29,
      earth_percent: 25,
      fire_percent: 24,
      water_percent: 34,
      air_percent: 22,
    }
  },
  // Hell Mina
  { bossID: 'hell_mina',
    name: {
      de: 'Hell Mina',
      en: 'Hell Mina',
      es: 'Hell Mina',
      fr: 'Hell Mina',
      pt: 'Hell Mina',
    },
    imageUrl: `${ICON_BASE}/boss-icons/hell_mina.png`,
    level: 140,
    region: '',
    family: '',
    homeDungeonBossID: 'long_slumbers_barrow',
    characteristics: {
      healthPoints: 6500,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 10,
      earth_percent: -4,
      fire_percent: 20,
      water_percent: 5,
      air_percent: 15,
    }
  },
  // Buck Anear
  { bossID: 'buck_anear',
    name: {
      de: 'Ben der Ripat',
      en: 'Buck Anear',
      es: 'Ben el Ripata',
      fr: 'Ben le Ripate',
      pt: 'Ben o Ripata',
    },
    imageUrl: `${ICON_BASE}/boss-icons/buck_anear.png`,
    level: 150,
    region: '',
    family: '',
    homeDungeonBossID: 'the_wreck_of_the_hesperus',
    characteristics: {
      healthPoints: 6200,
      actionPoints: 16,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 24,
      earth_percent: 16,
      fire_percent: 17,
      water_percent: 20,
      air_percent: 26,
    }
  },
  // Sphincter Cell
  { bossID: 'sphincter_cell',
    name: {
      de: 'Sphincter Cell',
      en: 'Sphincter Cell',
      es: 'Sfincter Cell',
      fr: 'Sphincter Cell',
      pt: 'Sphincter Cell',
    },
    imageUrl: `${ICON_BASE}/boss-icons/sphincter_cell.png`,
    level: 150,
    region: '',
    family: '',
    homeDungeonBossID: 'amakna_castle_rat_dungeon',
    characteristics: {
      healthPoints: 6400,
      actionPoints: 8,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 200,
      earth_percent: 200,
      fire_percent: 200,
      water_percent: 200,
      air_percent: 200,
    }
  },
  // === Level 151 - 190 Dungeons ===
  // Kimbo
  { bossID: 'kimbo',
    name: {
      de: 'Kimbo',
      en: 'Kimbo',
      es: 'Kimbo',
      fr: 'Kimbo',
      pt: 'Kimbo',
    },
    imageUrl: `${ICON_BASE}/boss-icons/kimbo.png`,
    level: 160,
    region: '',
    family: '',
    homeDungeonBossID: 'kimbos_canopy',
    characteristics: {
      healthPoints: 6900,
      actionPoints: 10,
      movementPoints: 7
    },
    resistances: {
      neutral_percent: 400,
      earth_percent: 400,
      fire_percent: 400,
      water_percent: 400,
      air_percent: 400,
    }
  },
  // Minotot
  { bossID: 'minotot',
    name: {
      de: 'Minotot',
      en: 'Minotot',
      es: 'Minotot',
      fr: 'Minotot',
      pt: 'Minotot',
    },
    imageUrl: `${ICON_BASE}/boss-icons/minotot.png`,
    level: 160,
    region: '',
    family: '',
    homeDungeonBossID: 'minotot_room',
    characteristics: {
      healthPoints: 10000,
      actionPoints: 10,
      movementPoints: 5,
      apParry: 90,
      mpParry: 90,
      lock: 60,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 35,
      earth_percent: 35,
      fire_percent: 35,
      water_percent: -5,
      air_percent: -5,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Obsidemon
  { bossID: 'obsidemon',
    name: {
      de: 'Obsidianter',
      en: 'Obsidemon',
      es: 'Obsidiantre',
      fr: 'Obsidiantre',
      pt: 'Obsidemõnio',
    },
    imageUrl: `${ICON_BASE}/boss-icons/obsidmon.png`,
    level: 160,
    region: '',
    family: '',
    homeDungeonBossID: 'the_obsidemons_hypogeum',
    characteristics: {
      healthPoints: 7000,
      actionPoints: 16,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 25,
      earth_percent: 23,
      fire_percent: 27,
      water_percent: 21,
      air_percent: 26,
    }
  },
  // Zombrute
  { bossID: 'zombrute',
    name: {
      de: 'Zombrutalist',
      en: 'Zombrute',
      es: 'Zombruto',
      fr: 'Zombrute',
      pt: 'Zombruto',
    },
    imageUrl: `${ICON_BASE}/boss-icons/zombrute.png`,
    level: 160,
    region: '',
    family: '',
    homeDungeonBossID: 'the_flooded_chapel',
    characteristics: {
      healthPoints: 8000,
      actionPoints: 14,
      movementPoints: 4
    },
    resistances: {
      neutral_percent: 8,
      earth_percent: -5,
      fire_percent: 11,
      water_percent: 40,
      air_percent: -12,
    }
  },
  // Tengu Snowfoux
  { bossID: 'tengu_snowfoux',
    name: {
      de: 'Tengu Eisfux',
      en: 'Tengu Snowfoux',
      es: 'Tengu Gélifux',
      fr: 'Tengu Givrefoux',
      pt: 'Tengu Gelifox',
    },
    imageUrl: `${ICON_BASE}/boss-icons/tengu_snowfoux.png`,
    level: 170,
    region: '',
    family: '',
    homeDungeonBossID: 'snowfoux_caverns',
    characteristics: {
      healthPoints: 7900,
      actionPoints: 15,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 33,
      earth_percent: 13,
      fire_percent: 19,
      water_percent: 28,
      air_percent: 21,
    }
  },
  // Foster Fuji Snowfoux
  { bossID: 'fuji_snowfoux',
    name: {
      de: 'Fuji Eisfux Ziehmutter',
      en: 'Foster Fuji Snowfoux',
      es: 'Fuji Gélifux Nodriza',
      fr: 'Fuji Givrefoux Nourricière',
      pt: 'Fuji Gelifox Maternal',
    },
    imageUrl: `${ICON_BASE}/boss-icons/fuji_snowfoux.png`,
    level: 190,
    region: '',
    family: '',
    homeDungeonBossID: 'foster_caverns',
    characteristics: {
      healthPoints: 10000,
      actionPoints: 12,
      movementPoints: 4
    },
    resistances: {
      neutral_percent: -6,
      earth_percent: 6,
      fire_percent: 14,
      water_percent: 12,
      air_percent: -11,
    }
  },
  // Nagate
  { bossID: 'nagate',
    name: {
      de: 'Nagate',
      en: 'Nagate',
      es: 'Nagate',
      fr: 'Nagate',
      pt: 'Nagate',
    },
    imageUrl: `${ICON_BASE}/boss-icons/nagate.png`,
    level: 170,
    region: '',
    family: '',
    homeDungeonBossID: 'valley_of_the_lady_of_the_water_percent',
    characteristics: {
      healthPoints: 8800,
      actionPoints: 14,
      movementPoints: 0
    },
    resistances: {
      neutral_percent: 20,
      earth_percent: 31,
      fire_percent: 20,
      water_percent: 35,
      air_percent: 20,
    }
  },
  // Scale King
  { bossID: 'scale_king',
    name: {
      de: 'König Skai',
      en: 'Scale King',
      es: 'Rey Eskamoso',
      fr: 'Roi Skaille',
      pt: 'Rei Skama',
    },
    imageUrl: `${ICON_BASE}/boss-icons/scale_king.png`,
    level: 170,
    region: '',
    family: '',
    homeDungeonBossID: 'scale_kings_pyrambossID',
    characteristics: {
      healthPoints: 8800,
      actionPoints: 14,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 10,
      earth_percent: 10,
      fire_percent: 7,
      water_percent: 21,
      air_percent: -8,
    }
  },
  // Korriander
  { bossID: 'Korriander',
    name: {
      de: 'Korriander',
      en: 'Korriander',
      es: 'Cil',
      fr: 'Korriandre',
      pt: 'Kwentro',
    },
    imageUrl: `${ICON_BASE}/boss-icons/korriander.png`,
    level: 180,
    region: '',
    family: '',
    homeDungeonBossID: 'korrianders_lair_percent',
    characteristics: {
      healthPoints: 8900,
      actionPoints: 15,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 45,
      earth_percent: 9,
      fire_percent: 15,
      water_percent: 5,
      air_percent: 17,
    }
  },
  // Giant Kralove
  { bossID: 'giant_kralove',
    name: {
      de: 'Riesenkrakamor',
      en: 'Giant Kralove',
      es: 'Kralamar Gigante',
      fr: 'Kralamoure Géant',
      pt: 'Kralamore Gigante',
    },
    imageUrl: `${ICON_BASE}/boss-icons/giant_kralove.png`,
    level: 180,
    region: '',
    family: '',
    homeDungeonBossID: 'lair_percent_of_the_giant_kralove',
    characteristics: {
      healthPoints: 3700,
      actionPoints: 18,
      movementPoints: -1
    },
    resistances: {
      neutral_percent: 900,
      earth_percent: 900,
      fire_percent: 900,
      water_percent: 900,
      air_percent: 900,
    }
  },
  // Bworker
  { bossID: 'bworker',
    name: {
      de: 'Bworker',
      en: 'Bworker',
      es: 'Bworker',
      fr: 'Bworker',
      pt: 'Bworker',
    },
    imageUrl: `${ICON_BASE}/boss-icons/bworker.png`,
    level: 180,
    region: '',
    family: '',
    homeDungeonBossID: 'bworker_dungeon',
    characteristics: {
      healthPoints: 9600,
      actionPoints: 12,
      movementPoints: 9,
      apParry: 80,
      mpParry: 80,
      lock: 100,
      criticalResistance: 0,
      pushbackResistance: 0
    },
    resistances: {
      neutral_percent: 18,
      earth_percent: 28,
      fire_percent: 28,
      water_percent: 18,
      air_percent: -13,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Ougaa
  { bossID: 'ougaa',
    name: {
      de: 'Stinkeling',
      en: 'Ougaa',
      es: 'Ugah',
      fr: 'Ougah',
      pt: 'Ugah',
    },
    imageUrl: `${ICON_BASE}/boss-icons/ougaa.png`,
    level: 180,
    region: '',
    family: '',
    homeDungeonBossID: 'fungus_dungeon',
    characteristics: {
      healthPoints: 8500,
      actionPoints: 18,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 18,
      earth_percent: 13,
      fire_percent: 11,
      water_percent: 35,
      air_percent: 18,
    }
  },
  // Tanukoui San
  { bossID: 'tanukoui_san',
    name: {
      de: 'Tanukouï San',
      en: 'Tanukoui San',
      es: 'Tanukui San',
      fr: 'Tanukouï San',
      pt: 'Tanukui San',
    },
    imageUrl: `${ICON_BASE}/boss-icons/tanukoui_san.png`,
    level: 180,
    region: '',
    family: '',
    homeDungeonBossID: 'tanukoui_sans_workshop',
    characteristics: {
      healthPoints: 8900,
      actionPoints: 16,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 14,
      earth_percent: 28,
      fire_percent: 7,
      water_percent: -8,
      air_percent: 5,
    }
  },
  // Kolosso
  { bossID: 'kolosso',
    name: {
      de: 'Daxolossus',
      en: 'Kolosso',
      es: 'Tejossus',
      fr: 'Kolosso',
      pt: 'Kolosso',
    },
    imageUrl: `${ICON_BASE}/boss-icons/kolosso.png`,
    level: 190,
    region: '',
    family: '',
    homeDungeonBossID: 'kolossos_cavern',
    characteristics: {
      healthPoints: 8000,
      actionPoints: 15,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 25,
      earth_percent: 16,
      fire_percent: 22,
      water_percent: 10,
      air_percent: 29,
    }
  },
  // Professor Xa
  { bossID: 'professor_xa',
    name: {
      de: 'Professor Xa',
      en: 'Professor Xa',
      es: 'Profesor Xa',
      fr: 'Professeur Xa',
      pt: 'Professor Xa',
    },
    imageUrl: `${ICON_BASE}/boss-icons/professor_xa.png`,
    level: 190,
    region: '',
    family: '',
    homeDungeonBossID: 'kolossos_cavern',
    characteristics: {
      healthPoints: 8000,
      actionPoints: 15,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 18,
      earth_percent: 24,
      fire_percent: 29,
      water_percent: 16,
      air_percent: 9,
    }
  },
  // Founoroshi
  { bossID: 'founoroshi',
    name: {
      de: 'Fuxoroshi',
      en: 'Founoroshi',
      es: 'Funoroshi',
      fr: 'Founoroshi',
      pt: 'Foxnoroshi',
    },
    imageUrl: `${ICON_BASE}/boss-icons/founoroshi.png`,
    level: 190,
    region: '',
    family: '',
    homeDungeonBossID: 'fouxwork_factory',
    characteristics: {
      healthPoints: 11000,
      actionPoints: 18,
      movementPoints: 7
    },
    resistances: {
      neutral_percent: 15,
      earth_percent: 23,
      fire_percent: 10,
      water_percent: 17,
      air_percent: 20,
    }
  },
  // Grohlum
  { bossID: 'grohlum',
    name: {
      de: 'Grollum',
      en: 'Grohlum',
      es: 'Esmigol',
      fr: 'Grolloum',
      pt: 'Gordum',
    },
    imageUrl: `${ICON_BASE}/boss-icons/grohlum.png`,
    level: 190,
    region: '',
    family: '',
    homeDungeonBossID: 'sakai_mine',
    characteristics: {
      healthPoints: 11000,
      actionPoints: 20,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 34,
      earth_percent: 21,
      fire_percent: 31,
      water_percent: -5,
      air_percent: 24,
    }
  },
  // Celestial Bearbarian
  { bossID: 'celestial_bearbarian',
    name: {
      de: 'Himmlischer Barbär',
      en: 'Celestial Bearbarian',
      es: 'Golosotrón Real',
      fr: 'Glourséleste',
      pt: 'Glurseleste',
    },
    imageUrl: `${ICON_BASE}/boss-icons/celestial_bearbarian.png`,
    level: 200,
    region: '',
    family: '',
    homeDungeonBossID: 'bearbarian_antichamber',
    characteristics: {
      healthPoints: 11000,
      actionPoints: 20,
      movementPoints: 8
    },
    resistances: {
      neutral_percent: 25,
      earth_percent: 21,
      fire_percent: 16,
      water_percent: 24,
      air_percent: 23,
    }
  },
  // Shihan
  { bossID: 'shihan',
    name: {
      de: 'Shihan',
      en: 'Shihan',
      es: 'Shihan',
      fr: 'Shihan',
      pt: 'Shihan',
    },
    imageUrl: `${ICON_BASE}/boss-icons/shihan.png`,
    level: 200,
    region: '',
    family: '',
    homeDungeonBossID: 'wind_dojo',
    characteristics: {
      healthPoints: 11000,
      actionPoints: 18,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 23,
      earth_percent: 12,
      fire_percent: 24,
      water_percent: 16,
      air_percent: 28,
    }
  },
  // Hanshi
  { bossID: 'hanshi',
    name: {
      de: 'Hanshi',
      en: 'Hanshi',
      es: 'Hanshi',
      fr: 'Hanshi',
      pt: 'Hanshi',
    },
    imageUrl: `${ICON_BASE}/boss-icons/hanshi.png`,
    level: 200,
    region: '',
    family: '',
    homeDungeonBossID: 'wind_dojo',
    characteristics: {
      healthPoints: 9900,
      actionPoints: 18,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 12,
      earth_percent: 23,
      fire_percent: 16,
      water_percent: 28,
      air_percent: 19,
    }
  },
  // === Level 191 - 200 Dungeons ===
  // Missiz Freezz
  { bossID: 'missiz_freezz',
    name: {
      de: 'Missiz Frizz',
      en: 'Missiz Freezz',
      es: 'Mizz Frizz',
      fr: 'Missiz Frizz',
      pt: 'Missiz Frizz',
    },
    imageUrl: `${ICON_BASE}/boss-icons/missiz_freezz.png`,
    level: 220,
    region: '',
    family: '',
    homeDungeonBossID: 'missiz_freezzs_frostforge',
    characteristics: {
      healthPoints: 13000,
      actionPoints: 20,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 14,
      earth_percent: 27,
      fire_percent: 16,
      water_percent: 21,
      air_percent: 25,
    }
  },
  // Sylargh
  { bossID: 'sylargh',
    name: {
      de: 'Sylargh',
      en: 'Sylargh',
      es: 'Sylargh',
      fr: 'Sylargh',
      pt: 'Sylargh',
    },
    imageUrl: `${ICON_BASE}/boss-icons/sylargh.png`,
    level: 220,
    region: '',
    family: '',
    homeDungeonBossID: 'sylarghs_carrier',
    characteristics: {
      healthPoints: 13000,
      actionPoints: 20,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 14,
      earth_percent: 27,
      fire_percent: 16,
      water_percent: 22,
      air_percent: 12,
    }
  },
  // Klime
  { bossID: 'klime',
    name: {
      de: 'R.Klimm',
      en: 'Klime',
      es: 'Klim',
      fr: 'Klime',
      pt: 'Klim',
    },
    imageUrl: `${ICON_BASE}/boss-icons/klime.png`,
    level: 220,
    region: '',
    family: '',
    homeDungeonBossID: 'klimes_private_suite',
    characteristics: {
      healthPoints: 13000,
      actionPoints: 20,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 14,
      earth_percent: 27,
      fire_percent: 16,
      water_percent: 9,
      air_percent: 25,
    }
  },
  // Nileza
  { bossID: 'nileza',
    name: {
      de: 'Nileza',
      en: 'Nileza',
      es: 'Nileza',
      fr: 'Nileza',
      pt: 'Nileza',
    },
    imageUrl: `${ICON_BASE}/boss-icons/nileza.png`,
    level: 220,
    region: '',
    family: '',
    homeDungeonBossID: 'nilezas_laboratory',
    characteristics: {
      healthPoints: 13000,
      actionPoints: 20,
      movementPoints: 7
    },
    resistances: {
      neutral_percent: 14,
      earth_percent: 15,
      fire_percent: 16,
      water_percent: 32,
      air_percent: 25,
    }
  },
  // Count Harebourg
  { bossID: 'count_harebourg',
    name: {
      de: 'Graf Primzahl',
      en: 'Count Harebourg',
      es: 'Conde Kontatrás',
      fr: 'Comte Harebourg',
      pt: 'Conde Traspafrent',
    },
    imageUrl: `${ICON_BASE}/boss-icons/count_harebourg.png`,
    level: 220,
    region: '',
    family: '',
    homeDungeonBossID: 'the_counts_dungeon',
    characteristics: {
      healthPoints: 13000,
      actionPoints: 20,
      movementPoints: 7
    },
    resistances: {
      neutral_percent: 14,
      earth_percent: 17,
      fire_percent: 16,
      water_percent: 29,
      air_percent: 25,
    }
  },
  // Damadrya
  { bossID: 'damadrya',
    name: {
      de: 'Damadrya',
      en: 'Damadrya',
      es: 'Kodámade',
      fr: 'Damadrya',
      pt: 'Damadriade',
    },
    imageUrl: `${ICON_BASE}/boss-icons/damadrya.png`,
    level: 200,
    region: 'pandala',
    family: '',
    homeDungeonBossID: 'damadryas_bamboo_grove',
    characteristics: {
      healthPoints: 12000,
      actionPoints: 20,
      movementPoints: 0
    },
    resistances: {
      neutral_percent: 20,
      earth_percent: 23,
      fire_percent: 17,
      water_percent: 25,
      air_percent: 24,
    }
  },
  // Katamashii
  { bossID: 'katamashii',
    name: {
      de: 'Katamashii',
      en: 'Katamashii',
      es: 'Katamashii',
      fr: 'Katamashii',
      pt: 'Katamashii',
    },
    imageUrl: `${ICON_BASE}/boss-icons/katamashii.png`,
    level: 200,
    region: '',
    family: '',
    homeDungeonBossID: 'lost_souls_sanctuary',
    characteristics: {
      healthPoints: 13000,
      actionPoints: 20,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 25,
      earth_percent: 17,
      fire_percent: 13,
      water_percent: 21,
      air_percent: 26,
    }
  },
  // === Seasonal Bosses ===
  // -- Ascension --
  // Mucane
  { bossID: 'mucane',
    name: {
      de: 'Mucane',
      en: 'Mucane',
      es: 'Mucane',
      fr: 'Mucane',
      pt: 'Mucane',
    },
    imageUrl: `${ICON_BASE}/boss-icons/mucane.png`,
    level: 137,
    region: '',
    family: '',
    homeDungeonBossID: ['ascension_25', 'ascension_75'],
    characteristics: {
      healthPoints: 9318,
      actionPoints: 14,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 10,
      earth_percent: 12,
      fire_percent: 5,
      water_percent: 22,
      air_percent: -9,
    }
  },
  // Ul-Khan
  { bossID: 'ul_khan',
    name: {
      de: 'Ul\'Khan',
      en: 'Ul\'Khan',
      es: 'Ul\'Khan',
      fr: 'Ul\'Khan',
      pt: 'Ul\'Khan',
    },
    imageUrl: `${ICON_BASE}/boss-icons/ul_khan.png`,
    level: 200,
    region: '',
    family: '',
    homeDungeonBossID: ['ascension_50', 'ascension_100'],
    characteristics: {
      healthPoints: 17790,
      actionPoints: 12,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 8,
      earth_percent: 14,
      fire_percent: -13,
      water_percent: 11,
      air_percent: 35,
    }
  },
  // -- Vulkania --
  // Sleepwalking Grozilla
  { bossID: 'sleepwalking_grozilla',
    name: {
      de: 'Schlafwandelnder Grozilla',
      en: 'Sleepwalking Grozilla',
      es: 'Grozilla sonámbulo',
      fr: 'Grozilla Somnambule',
      pt: 'Grozilla Sonâmbulo',
    },
    imageUrl: `${ICON_BASE}/boss-icons/grozilla.png`,
    level: 100,
    region: '',
    family: '',
    homeDungeonBossID: 'sleepwalking_pinki_crater',
    characteristics: {
      healthPoints: 1600,
      actionPoints: 12,
      movementPoints: 4
    },
    resistances: {
      neutral_percent: 20,
      earth_percent: 20,
      fire_percent: 50,
      water_percent: 20,
      air_percent: 20,
    }
  },
  // Sleepwalking Grasmera
  { bossID: 'sleepwalking_grasmera',
    name: {
      de: 'Schlafwandelnde Grasmera',
      en: 'Sleepwalking Grasmera',
      es: 'Grasmera sonámbulo',
      fr: 'Grasmera Somnambule',
      pt: 'Grasmera Sonâmbulo',
    },
    imageUrl: `${ICON_BASE}/boss-icons/grasmera.png`,
    level: 100,
    region: '',
    family: '',
    homeDungeonBossID: 'sleepwalking_pinki_crater',
    characteristics: {
      healthPoints: 1600,
      actionPoints: 12,
      movementPoints: 4
    },
    resistances: {
      neutral_percent: 50,
      earth_percent: 30,
      fire_percent: 30,
      water_percent: 30,
      air_percent: 30,
    }
  },
  // Exhausted Grozilla
  { bossID: 'exhausted_grozilla',
    name: {
      de: 'Erschöpfter Grozilla',
      en: 'Exhausted Grozilla',
      es: 'Grozilla agotado',
      fr: 'Grozilla Épuisé',
      pt: 'Grozilla Exausto',
    },
    imageUrl: `${ICON_BASE}/boss-icons/grozilla.png`,
    level: 200,
    region: '',
    family: '',
    homeDungeonBossID: 'exhausted_pinki_crater',
    characteristics: {
      healthPoints: 4800,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 20,
      earth_percent: 20,
      fire_percent: 50,
      water_percent: 20,
      air_percent: 20,
    }
  },
  // Exhausted Grasmera
  { bossID: 'exhausted_grasmera',
    name: {
      de: 'Erschöpfte Grasmera',
      en: 'Exhausted Grasmera',
      es: 'Grasmera agotado',
      fr: 'Grasmera Épuisé',
      pt: 'Grasmera Exausto',
    },
    imageUrl: `${ICON_BASE}/boss-icons/grasmera.png`,
    level: 200,
    region: '',
    family: '',
    homeDungeonBossID: 'exhausted_pinki_crater',
    characteristics: {
      healthPoints: 4800,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 50,
      earth_percent: 30,
      fire_percent: 30,
      water_percent: 30,
      air_percent: 30,
    }
  },
  // Tired Grozilla
  { bossID: 'tired_grozilla',
    name: {
      de: 'Müder Grozilla',
      en: 'Tired Grozilla',
      es: 'Grozilla cansado',
      fr: 'Grozilla Fatigué',
      pt: 'Grozilla Cansado',
    },
    imageUrl: `${ICON_BASE}/boss-icons/grozilla.png`,
    level: 300,
    region: '',
    family: '',
    homeDungeonBossID: 'tired_pinki_crater',
    characteristics: {
      healthPoints: 10000,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 20,
      earth_percent: 20,
      fire_percent: 50,
      water_percent: 20,
      air_percent: 20,
    }
  },
  // Tired Grasmera
  { bossID: 'tired_grasmera',
    name: {
      de: 'Müde Grasmera',
      en: 'Tired Grasmera',
      es: 'Grasmera cansado',
      fr: 'Grasmera Fatigué',
      pt: 'Grasmera Cansado',
    },
    imageUrl: `${ICON_BASE}/boss-icons/grasmera.png`,
    level: 300,
    region: '',
    family: '',
    homeDungeonBossID: 'tiredpinki_crater',
    characteristics: {
      healthPoints: 10000,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 50,
      earth_percent: 30,
      fire_percent: 30,
      water_percent: 30,
      air_percent: 30,
    }
  },
  // Grozilla
  { bossID: 'grozilla',
    name: {
      de: 'Grozilla',
      en: 'Grozilla',
      es: 'Grozilla',
      fr: 'Grozilla',
      pt: 'Grozilla',
    },
    imageUrl: `${ICON_BASE}/boss-icons/grozilla.png`,
    level: 400,
    region: '',
    family: '',
    homeDungeonBossID: 'pinki_crater',
    characteristics: {
      healthPoints: 16000,
      actionPoints: 12,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 20,
      earth_percent: 20,
      fire_percent: 50,
      water_percent: 20,
      air_percent: 20,
    }
  },
  // Grasmera
  { bossID: 'grasmera',
    name: {
      de: 'Grasmera',
      en: 'Grasmera',
      es: 'Grasmera',
      fr: 'Grasmera',
      pt: 'Grasmera',
    },
    imageUrl: `${ICON_BASE}/boss-icons/grasmera.png`,
    level: 400,
    region: '',
    family: '',
    homeDungeonBossID: 'pinki_crater',
    characteristics: {
      healthPoints: 16000,
      actionPoints: 12,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 50,
      earth_percent: 30,
      fire_percent: 30,
      water_percent: 30,
      air_percent: 30,
    }
  },
  // -- Horrob Isle
  // B'one Shot
  { bossID: 'bone_shot',
    name: {
      de: 'Mark Sauger',
      en: 'B\'one Shot',
      es: 'Hueso Pesado',
      fr: 'Os Andeuk\'Hou',
      pt: 'Osso Sinato',
    },
    imageUrl: `${ICON_BASE}/boss-icons/bone_shot.png`,
    level: 60,
    region: '',
    family: '',
    homeDungeonBossID: '',
    characteristics: {
      healthPoints: 1200,
      actionPoints: 10,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: -10,
      earth_percent: -3,
      fire_percent: 15,
      water_percent: 0,
      air_percent: 12,
    }
  },
  // Al Howin
  { bossID: 'al_howin',
    name: {
      de: 'Höll O\'Feen',
      en: 'Al Howin',
      es: 'Haluin',
      fr: 'Halouine',
      pt: 'Relouin',
    },
    imageUrl: `${ICON_BASE}/boss-icons/al_howin.png`,
    level: 100,
    region: '',
    family: '',
    homeDungeonBossID: '',
    characteristics: {
      healthPoints: 3300,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 13,
      earth_percent: 15,
      fire_percent: 0,
      water_percent: 18,
      air_percent: 5,
    }
  },
  // Staff Deleghoul
  { bossID: 'staff_deleghoul',
    name: {
      de: 'Personal Deleghul',
      en: 'Staff Deleghoul',
      es: 'Deleghuaedo de Personal',
      fr: 'Délégoule du Personnel',
      pt: 'Carniçátiro',
    },
    imageUrl: `${ICON_BASE}/boss-icons/staff_deleghoul.png`,
    level: 220,
    region: '',
    family: '',
    homeDungeonBossID: '',
    characteristics: {
      healthPoints: 18000,
      actionPoints: 20,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 130,
      earth_percent: 130,
      fire_percent: 130,
      water_percent: 130,
      air_percent: 130,
    }
  },
  // -- Kwismas --
  // Itzing
  { bossID: 'itzting',
    name: {
      de: 'Pisack',
      en: 'Itzting',
      es: 'Pikabeto',
      fr: 'Sapik',
      pt: 'Spinho',
    },
    imageUrl: `${ICON_BASE}/boss-icons/itzting.png`,
    level: 50,
    region: '',
    family: '',
    homeDungeonBossID: '',
    characteristics: {
      healthPoints: 1300,
      actionPoints: 10,
      movementPoints: 0
    },
    resistances: {
      neutral_percent: -20,
      earth_percent: 20,
      fire_percent: 20,
      water_percent: 20,
      air_percent: 20,
    }
  },
  // Father Kwismas
  { bossID: 'father_kwismas',
    name: {
      de: 'Weißnachtsmann',
      en: 'Father Kwismas',
      es: 'Chanta Klaus',
      fr: 'Papa Nowel',
      pt: 'Papai Nowel',
    },
    imageUrl: `${ICON_BASE}/boss-icons/father_kwismas.png`,
    level: 110,
    region: '',
    family: '',
    homeDungeonBossID: '',
    characteristics: {
      healthPoints: 3900,
      actionPoints: 10,
      movementPoints: 2
    },
    resistances: {
      neutral_percent: -2,
      earth_percent: -2,
      fire_percent: 40,
      water_percent: 40,
      air_percent: 40,
    }
  },
  // Father Whupper
  { bossID: 'father_whupper',
    name: {
      de: 'Rubrächer der Knechter',
      en: 'Father Whupper',
      es: 'Papa No-es',
      fr: 'Père Fwetar',
      pt: 'Gwinch',
    },
    imageUrl: `${ICON_BASE}/boss-icons/father_whupper.png`,
    level: 180,
    region: '',
    family: '',
    homeDungeonBossID: '',
    characteristics: {
      healthPoints: 9600,
      actionPoints: 10,
      movementPoints: 2
    },
    resistances: {
      neutral_percent: -2,
      earth_percent: -2,
      fire_percent: 30,
      water_percent: 30,
      air_percent: 30,
    }
  },
  // Minotoball
  { bossID: '',
    name: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    imageUrl: `${ICON_BASE}/boss-icons/.png`,
    level: 0,
    region: '',
    family: '',
    homeDungeonBossID: '',
    characteristics: {
      healthPoints: 0,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral_percent: 0,
      earth_percent: 0,
      fire_percent: 0,
      water_percent: 0,
      air_percent: 0,
    }
  },
  // -- Raid --
  // Belladonna (Raid)
  { bossID: 'exalted_belladonna',
    name: {
      de: 'Begeisterte Belladonna',
      en: 'Exalted Belladonna',
      es: 'Belladona Exaltada',
      fr: 'Belladone Exaltée',
      pt: 'Beladona Exaltada',
    },
    imageUrl: `${ICON_BASE}/boss-icons/belladonna.png`,
    level: 300,
    region: '',
    family: '',
    homeDungeonBossID: '',
    characteristics: {
      healthPoints: 32000,
      actionPoints: 20,
      movementPoints: 6
    },
    resistances: {
      neutral_percent: 5,
      earth_percent: 21,
      fire_percent: 12,
      water_percent: 10,
      air_percent: 6,
    }
  },
  // Dark Vlad
  { bossID: 'dark_vlad',
    name: {
      de: 'Dark Vlad',
      en: 'Dark Vlad',
      es: 'Dark Vlad',
      fr: 'Dark Vlad',
      pt: 'Dark Vlad',
    },
    imageUrl: `${ICON_BASE}/boss-icons/dark_vlad.png`,
    level: 300,
    region: '',
    family: '',
    homeDungeonBossID: '',
    characteristics: {
      healthPoints: 35000,
      actionPoints: 20,
      movementPoints: 7
    },
    resistances: {
      neutral_percent: 7,
      earth_percent: 0,
      fire_percent: 26,
      water_percent: -6,
      air_percent: 13,
    }
  },
];

module.exports = { BOSSE_LISTE };