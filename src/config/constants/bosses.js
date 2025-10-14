const { ICON_BASE } = require('./shared');

const BOSSE_LISTE = [
  // === Level 1 - 50 Dungeons ===
  // Belladonna
  { id: 'belladonna',
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
    homeDungeonID: 'belladonna_dungeon',
    characteristics: {
      vitality: 120,
      actionPoints: 7,
      movementPoints: 3
    },
    resistances: {
      neutral: 0,
      earth: 0,
      fire: 0,
      water: 0,
      air: 0,
    }
  },
  // Famished Sunflower
  { id: 'famished_sunflower',
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
    homeDungeonID: 'field_dungeon',
    characteristics: {
      vitality: 920,
      actionPoints: 8,
      movementPoints: 3,
      apResist: 8,
      mpResist: 8,
      block: 10,
      krit: 0,
      pushback: 0
    },
    resistances: {
      neutral: 25,
      earth: 25,
      fire: 15,
      water: -10,
      air: -15,
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
    }
  },
  // Sponge Mob
  { id: 'spongemob',
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
    homeDungeonID: 'sand_dungeon',
    characteristics: {
      vitality: 1200,
      actionPoints: 7,
      movementPoints: 4
      /*
      ap_resist: 15,
      mp_resist: 15,
      block: 15,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 22,
      earth: 14,
      fire: -5,
      water: 14,
      air: -5,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Golden Scarabugly
  { id: 'golden_scarabugly',
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
    homeDungeonID: 'scaraleaf_dungeon',
    characteristics: {
      vitality: 1600,
      actionPoints: 8,
      movementPoints: 3
      /*
      ap_resist: 30,
      mp_resist: 30,
      block: 28,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 24,
      earth: 24,
      fire: 24,
      water: 24,
      air: 24,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Batofu
  { id: 'batofu',
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
    homeDungeonID: 'tofu_house',
    characteristics: {
      vitality: 1000,
      actionPoints: 5,
      movementPoints: 10,
      apParry: 20,
      mpParry: 12,
      lock: 15,
      criticalResistance: 0,
      pushbackresistance: 0
    },
    resistances: {
      neutral: 14,
      earth: 9,
      fire: -25,
      water: -15,
      air: 37,
      neutral_fixed: 0,
      earth_fixed: 0,
      fire_fixed: 0,
      water_fixed: 0,
      air_fixed: 0
    }
  },
  // Boostache
  { id: 'boostache',
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
    homeDungeonID: 'haunted_house',
    characteristics: {
      vitality: 890,
      actionPoints: 10,
      movementPoints: 6
      /*
      ap_resist: 35,
      mp_resist: 55,
      block: 35,
      krit: 15,
      pushback: 0
      */
    },
    resistances: {
      neutral: 55,
      earth: 0,
      fire: 0,
      water: 15,
      air: 85,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Ronin Chafer
  { id: 'ronin_chafer',
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
    homeDungeonID: 'skeleton_dungeon',
    characteristics: {
      vitality: 680,
      actionPoints: 10,
      movementPoints: 4
      /*
      ap_resist: 16,
      mp_resist: 24,
      block: 30,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 0,
      earth: 0,
      fire: 0,
      water: 0,
      air: 0,
      /*
      neutral_flat: 7,
      earth_flat: 9,
      fire_flat: 15,
      water_flat: 12,
      air_flat: 9
      */
    }
  },
  // Royal Gobball
  { id: 'royal_gobball',
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
    homeDungeonID: 'gobball_dungeon',
    characteristics: {
      vitality: 1700,
      actionPoints: 9,
      movementPoints: 5
      /*
      ap_resist: 10,
      mp_resist: 10,
      block: 15,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: -5,
      earth: 13,
      fire: 10,
      water: 22,
      air: 0,
      /*
      neutral_flat: 7,
      earth_flat: 9,
      fire_flat: 15,
      water_flat: 12,
      air_flat: 9
      */
    }
  },
  // Bworkette
  { id: 'bworkette',
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
    homeDungeonID: 'bwork_dungeon',
    characteristics: {
      vitality: 1600,
      actionPoints: 9,
      movementPoints: 5
      /*
      ap_resist: 10,
      mp_resist: 10,
      block: 14,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 33,
      earth: 33,
      fire: 48,
      water: 18,
      air: 28,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Smith's Chest
  { id: 'smiths_chest',
    name: {
      de: 'Schatztruhe der Schattenschmiede',
      en: 'Smith\'s Chest',
      es: '',
      fr: '',
      pt: '',
    },
    imageUrl: `${ICON_BASE}/boss-icons/smiths_chest.png`,
    level: 50,
    region: '',
    family: '',
    homeDungeonID: 'blacksmith_dungeon',
    characteristics: {
      vitality: 820,
      actionPoints: 8,
      movementPoints: 3
      /*
      ap_resist: 20,
      mp_resist: 20,
      block: 20,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 0,
      earth: 0,
      fire: 0,
      water: 0,
      air: 0,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Shin Larva
  { id: 'shin_larva',
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
    homeDungeonID: 'larva_dungeon',
    characteristics: {
      vitality: 1200,
      actionPoints: 9,
      movementPoints: 2
      /*
      ap_resist: 28,
      mp_resist: 28,
      block: 28,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 54,
      earth: 34,
      fire: 34,
      water: -26,
      air: -26,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Great Coralator
  { id: 'great_coralator',
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
    homeDungeonID: 'grotto_hesque',
    characteristics: {
      vitality: 2000,
      actionPoints: 8,
      movementPoints: 3
      /*
      ap_resist: 14,
      mp_resist: 14,
      block: 14,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 23,
      earth: -6,
      fire: 13,
      water: 18,
      air: -7,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Kwakwa
  { id: 'kwakwa',
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
    homeDungeonID: 'kwakwas_nest',
    characteristics: {
      vitality: 1100,
      actionPoints: 9,
      movementPoints: 7
      /*
      ap_resist: 30,
      mp_resist: 30,
      block: 80,
      krit: 0,
      pushback: 50
      */
    },
    resistances: {
      neutral: 40,
      earth: 40,
      fire: 40,
      water: 40,
      air: 40,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // === Level 51 - 100 Dungeons ===
  // Wa Wabbit
  { id: 'wa_wabbit',
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
    homeDungeonID: 'wa_wabbits_castle',
    characteristics: {
      vitality: 3000,
      actionPoints: 10,
      movementPoints: 4
      /*
      ap_resist: 20,
      mp_resist: 20,
      block: 13,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 29,
      earth: 29,
      fire: 19,
      water: -6,
      air: -11
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Kanniball Andchain
  { id: 'kanniball_andchain',
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
    homeDungeonID: 'kanniball_dungeon',
    characteristics: {
      vitality: 1400,
      actionPoints: 10,
      movementPoints: 3
      /*
      ap_resist: 25,
      mp_resist: 25,
      block: 6,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 58,
      earth: 23,
      fire: 23,
      water: 23,
      air: 23,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // -- Blops --
  // Royal Pippin Blop
  { id: 'royal_pippin_blop',
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
    homeDungeonID: 'blop_dungeon',
    characteristics: {
      vitality: 2400,
      actionPoints: 10,
      movementPoints: 5
      /*
      ap_resist: 28,
      mp_resist: 28,
      block: 28,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: -12,
      earth: 94,
      fire: -12,
      water: -12,
      air: -12,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    },
    alsoIn: [
      { dungeonID: 'rainbow_blop_lair',
        overrides: { vitality: 3500 }
      }
    ],
  },
  // Royal Indigo Blop
  { id: 'royal_indigo_blop',
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
    homeDungeonID: 'blop_dungeon',
    characteristics: {
      vitality: 2400,
      actionPoints: 10,
      movementPoints: 5
      /*
      ap_resist: 28,
      mp_resist: 28,
      block: 28,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: -12,
      earth: -12,
      fire: -12,
      water: 94,
      air: -12,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    },
    alsoIn: [
      { dungeonID: 'rainbow_blop_lair',
        overrides: { vitality: 3500 }
      }
    ],
  },
  // Royal Morello Cherry Blop
  { id: 'royal_morello_cherry_blop',
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
    homeDungeonID: 'blop_dungeon',
    characteristics: {
      vitality: 2400,
      actionPoints: 10,
      movementPoints: 5
      /*
      ap_resist: 28,
      mp_resist: 28,
      block: 28,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: -12,
      earth: -12,
      fire: 94,
      water: -12,
      air: -12,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    },
    alsoIn: [
      { dungeonID: 'rainbow_blop_lair',
        overrides: { vitality: 3500 }
      }
    ],
  },
  // Royal Coco Blop
  { id: 'royal_coco_blop',
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
    homeDungeonID: 'blop_dungeon',
    characteristics: {
      vitality: 2400,
      actionPoints: 10,
      movementPoints: 5
      /*
      ap_resist: 28,
      mp_resist: 28,
      block: 28,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: -12,
      earth: -12,
      fire: -12,
      water: -12,
      air: 94,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    },
    alsoIn: [
      { dungeonID: 'rainbow_blop_lair',
        overrides: { vitality: 3500 }
      }
    ],
  },
  // -- Jellys --
  // Royal Strawberry Jelly
  { id: 'royal_strawberry_jelly',
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
    homeDungeonID: 'jellith_dimension',
    characteristics: {
      vitality: 1400,
      actionPoints: 10,
      movementPoints: 5
      /*
      ap_resist: 10,
      mp_resist: 10,
      block: 5,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 50,
      earth: 50,
      fire: -10,
      water: 50,
      air: 50,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Royal Mint Jelly
  { id: 'royal_mint_jelly',
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
    homeDungeonID: 'jellith_dimension',
    characteristics: {
      vitality: 1400,
      actionPoints: 10,
      movementPoints: 4
      /*
      ap_resist: 32,
      mp_resist: 41,
      block: 10,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 50,
      earth: -10,
      fire: 50,
      water: 50,
      air: 50,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Royal Lemon Jelly
  { id: 'royal_lemon_jelly',
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
    homeDungeonID: 'jellith_dimension',
    characteristics: {
      vitality: 1300,
      actionPoints: 10,
      movementPoints: 5
      /*
      ap_resist: 19,
      mp_resist: 14,
      block: 25,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 50,
      earth: 50,
      fire: 50,
      water: 50,
      air: -10,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Royal Blue Jelly
  { id: 'royal_blue_jelly',
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
    homeDungeonID: 'jellith_dimension',
    characteristics: {
      vitality: 1400,
      actionPoints: 10,
      movementPoints: 5
      /*
      ap_resist: 32,
      mp_resist: 32,
      block: 18,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 50,
      earth: 50,
      fire: 50,
      water: -10,
      air: 50,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Nelween
  { id: 'nelween',
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
    homeDungeonID: 'brumen_tinctorias_laboratory',
    characteristics: {
      vitality: 1900,
      actionPoints: 8,
      movementPoints: 5
      /*
      ap_resist: 40,
      mp_resist: 40,
      block: 20,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 30,
      earth: 0,
      fire: 0,
      water: 0,
      air: 0,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Gourlo the Terrible
  { id: 'gourlo_the_terrible',
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
    homeDungeonID: 'hold_of_otomais_ark',
    characteristics: {
      vitality: 1900,
      actionPoints: 10,
      movementPoints: 5
      /*
      ap_resist: 14,
      mp_resist: 14,
      block: 14,
      krit: 0,
      pushback: 9999
      */
    },
    resistances: {
      neutral: 200,
      earth: 200,
      fire: 200,
      water: 200,
      air: 200,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Legendary Crackler
  { id: 'legendary_crackler',
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
    homeDungeonID: 'crackler_dungeon',
    characteristics: {
      vitality: 3100,
      actionPoints: 8,
      movementPoints: 3
      /*
      ap_resist: 30,
      mp_resist: 29,
      block: 14,
      krit: 30,
      pushback: 0
      */
    },
    resistances: {
      neutral: 58,
      earth: -12,
      fire: 28,
      water: 36,
      air: -17,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Wa Wobot
  { id: 'wa_wobot',
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
    homeDungeonID: 'wa_wabbits_castle',
    characteristics: {
      vitality: 3500,
      actionPoints: 14,
      movementPoints: 6
    },
    resistances: {
      neutral: -10,
      earth: 16,
      fire: 8,
      water: 25,
      air: 21,
    }
  },
  // Ancestral Treechnid
  { id: 'ancestral_treechnid',
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
    homeDungeonID: 'treechnid_dungeon',
    characteristics: {
      vitality: 3600,
      actionPoints: 12,
      movementPoints: 5
      /*
      ap_resist: 44,
      mp_resist: 44,
      block: 32,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 30,
      earth: 30,
      fire: -5,
      water: 30,
      air: -5,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Selim Quartz
  { id: 'selim_quartz',
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
    homeDungeonID: 'hard_head_dam',
    characteristics: {
      vitality: 4500,
      actionPoints: 14,
      movementPoints: 4
      /*
      ap_resist: 35,
      mp_resist: 35,
      block: 50,
      krit: 10,
      pushback: 0
      */
    },
    resistances: {
      neutral: 15,
      earth: 26,
      fire: 30,
      water: 8,
      air: 13,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Dragon Pig
  { id: 'dragonpig',
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
    homeDungeonID: 'dragonpigs_den',
    characteristics: {
      vitality: 3100,
      actionPoints: 10,
      movementPoints: 5
      /*
      ap_resist: 72,
      mp_resist: 72,
      block: 110,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 38,
      earth: 38,
      fire: 38,
      water: -5,
      air: -5,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Koolich
  { id: 'koolich',
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
    homeDungeonID: 'koolich_cavern',
    characteristics: {
      vitality: 5800,
      actionPoints: 10,
      movementPoints: 3
    },
    resistances: {
      neutral: 78,
      earth: 28,
      fire: -12,
      water: -12,
      air: 33,
    }
  },
  // Moon
  { id: 'moon',
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
    homeDungeonID: 'moon_dungeon',
    characteristics: {
      vitality: 6600,
      actionPoints: 10,
      movementPoints: 6
      /*
      ap_resist: 20,
      mp_resist: 20,
      block: 30,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 10,
      earth: 20,
      fire: 0,
      water: -10,
      air: 20,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Moowolf
  { id: 'moowolf',
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
    homeDungeonID: 'canidae_dungeon',
    characteristics: {
      vitality: 5700,
      actionPoints: 8,
      movementPoints: 7
      /*
      ap_resist: 46,
      mp_resist: 50,
      block: 52,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 22,
      earth: 32,
      fire: -5,
      water: 42,
      air: 42,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // === Level 101 - 150 Dungeons ===
  // Silf the Greater Berb
  { id: 'silf',
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
    homeDungeonID: 'bherbs_gully',
    characteristics: {
      vitality: 7000,
      actionPoints: 8,
      movementPoints: 5
      /*
      ap_resist: 64,
      mp_resist: 64,
      block: 44,
      krit: 0,
      pushback: 9999
      */
    },
    resistances: {
      neutral: 200,
      earth: 200,
      fire: 200,
      water: 200,
      air: 200,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Lord Crow
  { id: 'lord_crow',
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
    homeDungeonID: 'lord_crows_library',
    characteristics: {
      vitality: 4500,
      actionPoints: 12,
      movementPoints: 6
      /*
      ap_resist: 54,
      mp_resist: 54,
      block: 44,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 26,
      earth: 26,
      fire: 46,
      water: 56,
      air: 56,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // White Rat
  { id: 'white_rat',
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
    homeDungeonID: 'bonta_rat_dungeon',
    characteristics: {
      vitality: 3500,
      actionPoints: 7,
      movementPoints: 4
      /*
      ap_resist: 28,
      mp_resist: 28,
      block: 13,
      krit: 0,
      pushback: 50
      */
    },
    resistances: {
      neutral: 0,
      earth: 0,
      fire: 0,
      water: 0,
      air: 0,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Schwarze Ratte
  { id: 'black_rat',
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
    homeDungeonID: 'brakmar_rat_dungeon',
    characteristics: {
      vitality: 3500,
      actionPoints: 7,
      movementPoints: 4
    },
    resistances: {
      neutral: 5,
      earth: 50,
      fire: -20,
      water: 20,
      air: -20,
    }
  },
  // Royal Rainbow Blop
  { id: 'royal_rainbow_blop',
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
    homeDungeonID: 'rainbow_blop_lair',
    characteristics: {
      vitality: 3400,
      actionPoints: 10,
      movementPoints: 3
      /*
      ap_resist: 40,
      mp_resist: 40,
      block: 35,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: -15,
      earth: 15,
      fire: 15,
      water: 15,
      air: 15,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Minotoror
  { id: 'minotoror',
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
    homeDungeonID: 'labyrinth_minotoror',
    characteristics: {
      vitality: 4100,
      actionPoints: 14,
      movementPoints: 6
      /*
      ap_resist: 40,
      mp_resist: 40,
      block: 40,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 35,
      earth: -20,
      fire: -20,
      water: 45,
      air: 35,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Royal Mastogob
  { id: 'royal_mastogob',
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
    homeDungeonID: 'royal_mastogobs_greenhouse',
    characteristics: {
      vitality: 4000,
      actionPoints: 15,
      movementPoints: 5
    },
    resistances: {
      neutral: 23,
      earth: 33,
      fire: 26,
      water: -11,
      air: 48,
    }
  },
  // Royal Tofu
  { id: 'royal_tofu',
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
    homeDungeonID: 'royal_tofu_house',
    characteristics: {
      vitality: 3400,
      actionPoints: 12,
      movementPoints: 30
      /*
      ap_resist: 60,
      mp_resist: 60,
      block: 70,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 38,
      earth: 23,
      fire: 18,
      water: 23,
      air: 58,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Crocabulia
  { id: 'crocabulia',
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
    homeDungeonID: 'dreggon_dungeon',
    characteristics: {
      vitality: 7000,
      actionPoints: 9,
      movementPoints: 3
      /*
      ap_resist: 29,
      mp_resist: 41,
      block: 34,
      krit: 0,
      pushback: 0
      */
    },
    resistances: {
      neutral: 58,
      earth: -12,
      fire: 28,
      water: 28,
      air: 28,
      /*
      neutral_flat: 0,
      earth_flat: 0,
      fire_flat: 0,
      water_flat: 0,
      air_flat: 0
      */
    }
  },
  // Skeunk
  { id: 'skeunk',
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
    homeDungeonID: 'skeunks_hideout',
    characteristics: {
      vitality: 4700,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral: 28,
      earth: 28,
      fire: -5,
      water: -5,
      air: 38,
    }
  },
  // Crakillian Guardian
  { id: 'crakillian_guardian',
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
    homeDungeonID: 'minerock_sanctuary',
    characteristics: {
      vitality: 5700,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral: 5,
      earth: 13,
      fire: 7,
      water: -8,
      air: 23,
    }
  },
  // Kanigrula
  { id: 'kanigrula',
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
    homeDungeonID: 'kanigrulas_hideout',
    characteristics: {
      vitality: 6500,
      actionPoints: 12,
      movementPoints: 6
    },
    resistances: {
      neutral: 6,
      earth: 12,
      fire: 8,
      water: -6,
      air: 20,
    }
  },
  // Soft Oak
  { id: 'soft_oak',
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
    homeDungeonID: 'soft_oak_dungeon',
    characteristics: {
      vitality: 6500,
      actionPoints: 15,
      movementPoints: 2
    },
    resistances: {
      neutral: 82,
      earth: 52,
      fire: 52,
      water: -5,
      air: -5,
    }
  },
  // Disconcerted Tynril
  { id: 'disconcerted_tynril',
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
    homeDungeonID: 'the_tynril_lab',
    characteristics: {
      vitality: 3800,
      actionPoints: 10,
      movementPoints: 2
    },
    resistances: {
      neutral: 200,
      earth: 200,
      fire: 200,
      water: 0,
      air: 200,
    }
  },
  // Dismayed Tynril
  { id: 'dismayed_tynril',
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
    homeDungeonID: 'the_tynril_lab',
    characteristics: {
      vitality: 3800,
      actionPoints: 10,
      movementPoints: 2
    },
    resistances: {
      neutral: 200,
      earth: 200,
      fire: 200,
      water: 200,
      air: 0,
    }
  },
  // Perfidious Tynril
  { id: 'perfidious_tynril',
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
    homeDungeonID: 'the_tynril_lab',
    characteristics: {
      vitality: 3800,
      actionPoints: 10,
      movementPoints: 2
    },
    resistances: {
      neutral: 200,
      earth: 200,
      fire: 0,
      water: 200,
      air: 200,
    }
  },
  // Stunned Tynril
  { id: 'stunned_tynril',
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
    homeDungeonID: 'the_tynril_lab',
    characteristics: {
      vitality: 3800,
      actionPoints: 10,
      movementPoints: 2
    },
    resistances: {
      neutral: 200,
      earth: 0,
      fire: 200,
      water: 200,
      air: 200,
    }
  },
  // Royal Pingwin
  { id: 'royal_pingwin',
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
    homeDungeonID: 'royal_pingwins_excavation',
    characteristics: {
      vitality: 4900,
      actionPoints: 15,
      movementPoints: 4
    },
    resistances: {
      neutral: 29,
      earth: 25,
      fire: 24,
      water: 34,
      air: 22,
    }
  },
  // Hell Mina
  { id: 'hell_mina',
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
    homeDungeonID: 'long_slumbers_barrow',
    characteristics: {
      vitality: 6500,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral: 10,
      earth: -4,
      fire: 20,
      water: 5,
      air: 15,
    }
  },
  // Buck Anear
  { id: 'buck_anear',
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
    homeDungeonID: 'the_wreck_of_the_hesperus',
    characteristics: {
      vitality: 6200,
      actionPoints: 16,
      movementPoints: 5
    },
    resistances: {
      neutral: 24,
      earth: 16,
      fire: 17,
      water: 20,
      air: 26,
    }
  },
  // Sphincter Cell
  { id: 'sphincter_cell',
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
    homeDungeonID: 'amakna_castle_rat_dungeon',
    characteristics: {
      vitality: 6400,
      actionPoints: 8,
      movementPoints: 5
    },
    resistances: {
      neutral: 200,
      earth: 200,
      fire: 200,
      water: 200,
      air: 200,
    }
  },
  // === Level 151 - 190 Dungeons ===
  // Kimbo
  { id: 'kimbo',
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
    homeDungeonID: 'kimbos_canopy',
    characteristics: {
      vitality: 6900,
      actionPoints: 10,
      movementPoints: 7
    },
    resistances: {
      neutral: 400,
      earth: 400,
      fire: 400,
      water: 400,
      air: 400,
    }
  },
  // Minotot
  { id: 'minotot',
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
    homeDungeonID: 'minotot_room',
    characteristics: {
      vitality: 10000,
      actionPoints: 10,
      movementPoints: 5
    },
    resistances: {
      neutral: 35,
      earth: 35,
      fire: 35,
      water: -5,
      air: -5,
    }
  },
  // Obsidemon
  { id: 'obsidemon',
    name: {
      de: 'Obsidianter',
      en: 'Obsidemon',
      es: 'Obsidiantre',
      fr: 'Obsidiantre',
      pt: 'Obsidemõnio',
    },
    imageUrl: `${ICON_BASE}/boss-icons/obsidemon.png`,
    level: 160,
    region: '',
    family: '',
    homeDungeonID: 'the_obsidemons_hypogeum',
    characteristics: {
      vitality: 7000,
      actionPoints: 16,
      movementPoints: 6
    },
    resistances: {
      neutral: 25,
      earth: 23,
      fire: 27,
      water: 21,
      air: 26,
    }
  },
  // Zombrute
  { id: 'zombrute',
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
    homeDungeonID: 'the_flooded_chapel',
    characteristics: {
      vitality: 8000,
      actionPoints: 14,
      movementPoints: 4
    },
    resistances: {
      neutral: 8,
      earth: -5,
      fire: 11,
      water: 40,
      air: -12,
    }
  },
  // Tengu Snowfoux
  { id: 'tengu_snowfoux',
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
    homeDungeonID: 'snowfoux_caverns',
    characteristics: {
      vitality: 7900,
      actionPoints: 15,
      movementPoints: 5
    },
    resistances: {
      neutral: 33,
      earth: 13,
      fire: 19,
      water: 28,
      air: 21,
    }
  },
  // Nagate
  { id: 'nagate',
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
    homeDungeonID: 'valley_of_the_lady_of_the_water',
    characteristics: {
      vitality: 8800,
      actionPoints: 14,
      movementPoints: 0
    },
    resistances: {
      neutral: 20,
      earth: 31,
      fire: 20,
      water: 35,
      air: 20,
    }
  },
  // Scale King
  { id: 'scale_king',
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
    homeDungeonID: 'scale_kings_pyramid',
    characteristics: {
      vitality: 8800,
      actionPoints: 14,
      movementPoints: 6
    },
    resistances: {
      neutral: 10,
      earth: 10,
      fire: 7,
      water: 21,
      air: -8,
    }
  },
  // Korriander
  { id: 'Korriander',
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
    homeDungeonID: 'korrianders_lair',
    characteristics: {
      vitality: 8900,
      actionPoints: 15,
      movementPoints: 6
    },
    resistances: {
      neutral: 45,
      earth: 9,
      fire: 15,
      water: 5,
      air: 17,
    }
  },
  // Giant Kralove
  { id: 'giant_kralove',
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
    homeDungeonID: 'lair_of_the_giant_kralove',
    characteristics: {
      vitality: 3700,
      actionPoints: 18,
      movementPoints: -1
    },
    resistances: {
      neutral: 900,
      earth: 900,
      fire: 900,
      water: 900,
      air: 900,
    }
  },
  // Bworker
  { id: 'bworker',
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
    homeDungeonID: 'bworker_dungeon',
    characteristics: {
      vitality: 9600,
      actionPoints: 12,
      movementPoints: 9
    },
    resistances: {
      neutral: 18,
      earth: 28,
      fire: 28,
      water: 18,
      air: -13,
    }
  },
  // Ougaa
  { id: 'ougaa',
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
    homeDungeonID: 'fungus_dungeon',
    characteristics: {
      vitality: 8500,
      actionPoints: 18,
      movementPoints: 6
    },
    resistances: {
      neutral: 18,
      earth: 13,
      fire: 11,
      water: 35,
      air: 18,
    }
  },
  // Tanukoui San
  { id: 'tanukoui_san',
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
    homeDungeonID: 'tanukoui_sans_workshop',
    characteristics: {
      vitality: 8900,
      actionPoints: 16,
      movementPoints: 6
    },
    resistances: {
      neutral: 14,
      earth: 28,
      fire: 7,
      water: -8,
      air: 5,
    }
  },
  // Kolosso
  { id: 'kolosso',
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
    homeDungeonID: 'kolossos_cavern',
    characteristics: {
      vitality: 8000,
      actionPoints: 15,
      movementPoints: 6
    },
    resistances: {
      neutral: 25,
      earth: 16,
      fire: 22,
      water: 10,
      air: 29,
    }
  },
  // Professor Xa
  { id: 'professor_xa',
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
    homeDungeonID: 'kolossos_cavern',
    characteristics: {
      vitality: 8000,
      actionPoints: 15,
      movementPoints: 6
    },
    resistances: {
      neutral: 18,
      earth: 24,
      fire: 29,
      water: 16,
      air: 9,
    }
  },
  // Founoroshi
  { id: 'founoroshi',
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
    homeDungeonID: 'fouxwork_factory',
    characteristics: {
      vitality: 11000,
      actionPoints: 18,
      movementPoints: 7
    },
    resistances: {
      neutral: 15,
      earth: 23,
      fire: 10,
      water: 17,
      air: 20,
    }
  },
  // Foster Fuji Snowfoux
  { id: 'fuji_snowfoux',
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
    homeDungeonID: 'foster_caverns',
    characteristics: {
      vitality: 10000,
      actionPoints: 12,
      movementPoints: 4
    },
    resistances: {
      neutral: -6,
      earth: 6,
      fire: 14,
      water: 12,
      air: -11,
    }
  },
  // Grohlum
  { id: 'grohlum',
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
    homeDungeonID: 'sakai_mine',
    characteristics: {
      vitality: 11000,
      actionPoints: 20,
      movementPoints: 6
    },
    resistances: {
      neutral: 34,
      earth: 21,
      fire: 31,
      water: -5,
      air: 24,
    }
  },
  // Celestial Bearbarian
  { id: 'celestial_bearbarian',
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
    homeDungeonID: 'bearbarian_antichamber',
    characteristics: {
      vitality: 11000,
      actionPoints: 20,
      movementPoints: 8
    },
    resistances: {
      neutral: 25,
      earth: 21,
      fire: 16,
      water: 24,
      air: 23,
    }
  },
  // Shihan
  { id: 'shihan',
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
    homeDungeonID: 'wind_dojo',
    characteristics: {
      vitality: 11000,
      actionPoints: 18,
      movementPoints: 5
    },
    resistances: {
      neutral: 23,
      earth: 12,
      fire: 24,
      water: 16,
      air: 28,
    }
  },
  // Hanshi
  { id: 'hanshi',
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
    homeDungeonID: 'wind_dojo',
    characteristics: {
      vitality: 9900,
      actionPoints: 18,
      movementPoints: 5
    },
    resistances: {
      neutral: 12,
      earth: 23,
      fire: 16,
      water: 28,
      air: 19,
    }
  },
  // === Level 191 - 200 Dungeons ===
  // Missiz Freezz
  { id: 'missiz_freezz',
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
    homeDungeonID: 'missiz_freezzs_frostforge',
    characteristics: {
      vitality: 13000,
      actionPoints: 20,
      movementPoints: 6
    },
    resistances: {
      neutral: 14,
      earth: 27,
      fire: 16,
      water: 21,
      air: 25,
    }
  },
  // Sylargh
  { id: 'sylargh',
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
    homeDungeonID: 'sylarghs_carrier',
    characteristics: {
      vitality: 13000,
      actionPoints: 20,
      movementPoints: 6
    },
    resistances: {
      neutral: 14,
      earth: 27,
      fire: 16,
      water: 22,
      air: 12,
    }
  },
  // Klime
  { id: 'klime',
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
    homeDungeonID: 'klimes_private_suite',
    characteristics: {
      vitality: 13000,
      actionPoints: 20,
      movementPoints: 6
    },
    resistances: {
      neutral: 14,
      earth: 27,
      fire: 16,
      water: 9,
      air: 25,
    }
  },
  // Nileza
  { id: 'nileza',
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
    homeDungeonID: 'nilezas_laboratory',
    characteristics: {
      vitality: 13000,
      actionPoints: 20,
      movementPoints: 7
    },
    resistances: {
      neutral: 14,
      earth: 15,
      fire: 16,
      water: 32,
      air: 25,
    }
  },
  // Count Harebourg
  { id: 'count_harebourg',
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
    homeDungeonID: 'the_counts_dungeon',
    characteristics: {
      vitality: 13000,
      actionPoints: 20,
      movementPoints: 7
    },
    resistances: {
      neutral: 14,
      earth: 17,
      fire: 16,
      water: 29,
      air: 25,
    }
  },
  // Damadrya
  { id: 'damadrya',
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
    homeDungeonID: 'damadryas_bamboo_grove',
    characteristics: {
      vitality: 12000,
      actionPoints: 20,
      movementPoints: 0
    },
    resistances: {
      neutral: 20,
      earth: 23,
      fire: 17,
      water: 25,
      air: 24,
    }
  },
  // Katamashii
  { id: 'katamashii',
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
    homeDungeonID: 'lost_souls_sanctuary',
    characteristics: {
      vitality: 13000,
      actionPoints: 20,
      movementPoints: 6
    },
    resistances: {
      neutral: 25,
      earth: 17,
      fire: 13,
      water: 21,
      air: 26,
    }
  },
  // === Saisonale Bosse ===
  // -- Ascension --
  // Mucane
  { id: 'mucane',
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
    homeDungeonID: ['ascension_25', 'ascension_75'],
    characteristics: {
      vitality: 9318,
      actionPoints: 14,
      movementPoints: 6
    },
    resistances: {
      neutral: 10,
      earth: 12,
      fire: 5,
      water: 22,
      air: -9,
    }
  },
  // Ul-Khan
  { id: 'ul_khan',
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
    homeDungeonID: ['ascension_50', 'ascension_100'],
    characteristics: {
      vitality: 17790,
      actionPoints: 12,
      movementPoints: 6
    },
    resistances: {
      neutral: 8,
      earth: 14,
      fire: -13,
      water: 11,
      air: 35,
    }
  },
  // -- Vulkania --
  // Sleepwalking Grozilla
  { id: 'sleepwalking_grozilla',
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
    homeDungeonID: 'sleepwalking_pinki_crater',
    characteristics: {
      vitality: 1600,
      actionPoints: 12,
      movementPoints: 4
    },
    resistances: {
      neutral: 20,
      earth: 20,
      fire: 50,
      water: 20,
      air: 20,
    }
  },
  // Sleepwalking Grasmera
  { id: 'sleepwalking_grasmera',
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
    homeDungeonID: 'sleepwalking_pinki_crater',
    characteristics: {
      vitality: 1600,
      actionPoints: 12,
      movementPoints: 4
    },
    resistances: {
      neutral: 50,
      earth: 30,
      fire: 30,
      water: 30,
      air: 30,
    }
  },
  // Exhausted Grozilla
  { id: 'exhausted_grozilla',
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
    homeDungeonID: 'exhausted_pinki_crater',
    characteristics: {
      vitality: 4800,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral: 20,
      earth: 20,
      fire: 50,
      water: 20,
      air: 20,
    }
  },
  // Exhausted Grasmera
  { id: 'exhausted_grasmera',
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
    homeDungeonID: 'exhausted_pinki_crater',
    characteristics: {
      vitality: 4800,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral: 50,
      earth: 30,
      fire: 30,
      water: 30,
      air: 30,
    }
  },
  // Tired Grozilla
  { id: 'tired_grozilla',
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
    homeDungeonID: 'tired_pinki_crater',
    characteristics: {
      vitality: 10000,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral: 20,
      earth: 20,
      fire: 50,
      water: 20,
      air: 20,
    }
  },
  // Tired Grasmera
  { id: 'tired_grasmera',
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
    homeDungeonID: 'tiredpinki_crater',
    characteristics: {
      vitality: 10000,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral: 50,
      earth: 30,
      fire: 30,
      water: 30,
      air: 30,
    }
  },
  // Grozilla
  { id: 'grozilla',
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
    homeDungeonID: 'pinki_crater',
    characteristics: {
      vitality: 16000,
      actionPoints: 12,
      movementPoints: 6
    },
    resistances: {
      neutral: 20,
      earth: 20,
      fire: 50,
      water: 20,
      air: 20,
    }
  },
  // Grasmera
  { id: 'grasmera',
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
    homeDungeonID: 'pinki_crater',
    characteristics: {
      vitality: 16000,
      actionPoints: 12,
      movementPoints: 6
    },
    resistances: {
      neutral: 50,
      earth: 30,
      fire: 30,
      water: 30,
      air: 30,
    }
  },
  // -- Horrob Isle
  // B'one Shot
  { id: 'bone_shot',
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
    homeDungeonID: '',
    characteristics: {
      vitality: 1200,
      actionPoints: 10,
      movementPoints: 5
    },
    resistances: {
      neutral: -10,
      earth: -3,
      fire: 15,
      water: 0,
      air: 12,
    }
  },
  // Al Howin
  { id: 'al_howin',
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
    homeDungeonID: '',
    characteristics: {
      vitality: 3300,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral: 13,
      earth: 15,
      fire: 0,
      water: 18,
      air: 5,
    }
  },
  // Staff Deleghoul
  { id: 'staff_deleghoul',
    name: {
      de: 'Personal Deleghul',
      en: 'Staff Deleghul',
      es: 'Deleghuaedo de Personal',
      fr: 'Délégoule du Personnel',
      pt: 'Carniçátiro',
    },
    imageUrl: `${ICON_BASE}/boss-icons/staff_deleghoul.png`,
    level: 220,
    region: '',
    family: '',
    homeDungeonID: '',
    characteristics: {
      vitality: 18000,
      actionPoints: 20,
      movementPoints: 5
    },
    resistances: {
      neutral: 130,
      earth: 130,
      fire: 130,
      water: 130,
      air: 130,
    }
  },
  // -- Kwismas --
  // Itzing
  { id: 'itzing',
    name: {
      de: 'Pisack',
      en: 'Itzing',
      es: 'Pikabeto',
      fr: 'Sapik',
      pt: 'Spinho',
    },
    imageUrl: `${ICON_BASE}/boss-icons/itzing.png`,
    level: 50,
    region: '',
    family: '',
    homeDungeonID: '',
    characteristics: {
      vitality: 1300,
      actionPoints: 10,
      movementPoints: 0
    },
    resistances: {
      neutral: -20,
      earth: 20,
      fire: 20,
      water: 20,
      air: 20,
    }
  },
  // Father Kwismas
  { id: 'father_kwismas',
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
    homeDungeonID: '',
    characteristics: {
      vitality: 3900,
      actionPoints: 10,
      movementPoints: 2
    },
    resistances: {
      neutral: -2,
      earth: -2,
      fire: 40,
      water: 40,
      air: 40,
    }
  },
  // Father Whupper
  { id: 'father_whupper',
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
    homeDungeonID: '',
    characteristics: {
      vitality: 9600,
      actionPoints: 10,
      movementPoints: 2
    },
    resistances: {
      neutral: -2,
      earth: -2,
      fire: 30,
      water: 30,
      air: 30,
    }
  },
  // Minotoball
  { id: '',
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
    homeDungeonID: '',
    characteristics: {
      vitality: 0,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral: 0,
      earth: 0,
      fire: 0,
      water: 0,
      air: 0,
    }
  },
  // -- Raid --
  // Belladonna (Raid)
  { id: 'exalted_belladonna',
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
    homeDungeonID: '',
    characteristics: {
      vitality: 32000,
      actionPoints: 20,
      movementPoints: 6
    },
    resistances: {
      neutral: 5,
      earth: 21,
      fire: 12,
      water: 10,
      air: 6,
    }
  },
  // Dark Vlad
  { id: 'dark_vlad',
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
    homeDungeonID: '',
    characteristics: {
      vitality: 35000,
      actionPoints: 20,
      movementPoints: 7
    },
    resistances: {
      neutral: 7,
      earth: 0,
      fire: 26,
      water: -6,
      air: 13,
    }
  },
];

module.exports = { BOSSE_LISTE };