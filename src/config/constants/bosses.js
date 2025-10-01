const { ICON_BASE } = require('./shared');

const BOSSE_LISTE = [
  // Level 1 - 50 Dungeons
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
    dungeon: 'belladonna_dungeon',
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
    dungeon: 'field_dungeon',
    characteristics: {
      vitality: 920,
      actionPoints: 8,
      movementPoints: 3
    },
    resistances: {
      neutral: 25,
      earth: 25,
      fire: 15,
      water: -10,
      air: -15
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
    dungeon: 'sand_dungeon',
    characteristics: {
      vitality: 1200,
      actionPoints: 7,
      movementPoints: 4
    },
    resistances: {
      neutral: 22,
      earth: 14,
      fire: -5,
      water: 14,
      air: -5,
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
    dungeon: 'scaraleaf_dungeon',
    characteristics: {
      vitality: 1600,
      actionPoints: 8,
      movementPoints: 3
    },
    resistances: {
      neutral: 24,
      earth: 24,
      fire: 24,
      water: 24,
      air: 24,
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
    dungeon: 'tofu_house',
    characteristics: {
      vitality: 1000,
      actionPoints: 5,
      movementPoints: 10
    },
    resistances: {
      neutral: 14,
      earth: 9,
      fire: -25,
      water: -15,
      air: 37,
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
    dungeon: 'haunted_house',
    characteristics: {
      vitality: 820,
      actionPoints: 10,
      movementPoints: 6
    },
    resistances: {
      neutral: 55,
      earth: 0,
      fire: 0,
      water: 15,
      air: 85,
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
    dungeon: 'skeleton_dungeon',
    characteristics: {
      vitality: 680,
      actionPoints: 10,
      movementPoints: 4
    },
    resistances: {
      neutral: 0,
      earth: 0,
      fire: 0,
      water: 0,
      air: 0,
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
    dungeon: 'gobball_dungeon',
    characteristics: {
      vitality: 1700,
      actionPoints: 9,
      movementPoints: 5
    },
    resistances: {
      neutral: -5,
      earth: 13,
      fire: 10,
      water: 22,
      air: 0,
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
    dungeon: 'bwork_dungeon',
    characteristics: {
      vitality: 6700,
      actionPoints: 9,
      movementPoints: 5
    },
    resistances: {
      neutral: 33,
      earth: 33,
      fire: 48,
      water: 18,
      air: 28,
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
    dungeon: 'blacksmith_dungeon',
    characteristics: {
      vitality: 820,
      actionPoints: 8,
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
    dungeon: 'larva_dungeon',
    characteristics: {
      vitality: 1200,
      actionPoints: 9,
      movementPoints: 2
    },
    resistances: {
      neutral: 54,
      earth: 34,
      fire: 34,
      water: -26,
      air: -26,
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
    dungeon: 'grotto_hesque',
    characteristics: {
      vitality: 2000,
      actionPoints: 8,
      movementPoints: 3
    },
    resistances: {
      neutral: 23,
      earth: -6,
      fire: 13,
      water: 18,
      air: -7,
    }
  },
  // Kwakwa
  { id: 'kwakwa',
    name: {
      de: 'Kwackatau',
      en: 'Kwakwa',
      es: '',
      fr: '',
      pt: '',
    },
    imageUrl: `${ICON_BASE}/boss-icons/.png`,
    level: 50,
    region: '',
    family: '',
    dungeon: 'kwakwas_nest',
    characteristics: {
      vitality: 1100,
      actionPoints: 9,
      movementPoints: 7
    },
    resistances: {
      neutral: 40,
      earth: 40,
      fire: 40,
      water: 40,
      air: 40,
    }
  },
  // Level 51 - 100 Dungeons
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
    level: 61,
    region: '',
    family: '',
    dungeon: 'wa_wabbits_castle',
    characteristics: {
      vitality: 3000,
      actionPoints: 11,
      movementPoints: 5
    },
    resistances: {
      neutral: 29,
      earth: 29,
      fire: 19,
      water: -6,
      air: -11
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
    dungeon: 'kanniball_dungeon',
    characteristics: {
      vitality: 1400,
      actionPoints: 10,
      movementPoints: 3
    },
    resistances: {
      neutral: 58,
      earth: 23,
      fire: 23,
      water: 23,
      air: 23,
    }
  },
  // Blops
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
    dungeon: 'blop_dungeon',
    characteristics: {
      vitality: 2400,
      actionPoints: 10,
      movementPoints: 5
    },
    resistances: {
      neutral: -12,
      earth: 94,
      fire: -12,
      water: -12,
      air: -12,
    }
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
    dungeon: 'blop_dungeon',
    characteristics: {
      vitality: 2400,
      actionPoints: 10,
      movementPoints: 5
    },
    resistances: {
      neutral: -12,
      earth: -12,
      fire: -12,
      water: 94,
      air: -12,
    }
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
    dungeon: 'blop_dungeon',
    characteristics: {
      vitality: 2400,
      actionPoints: 10,
      movementPoints: 5
    },
    resistances: {
      neutral: -12,
      earth: -12,
      fire: 94,
      water: -12,
      air: -12,
    }
  },
  // Royal Coco Blop
  { id: 'royal_coconut_blop',
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
    dungeon: 'blop_dungeon',
    characteristics: {
      vitality: 2400,
      actionPoints: 10,
      movementPoints: 5
    },
    resistances: {
      neutral: -12,
      earth: -12,
      fire: -12,
      water: -12,
      air: 94,
    }
  },
  // Jellys
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
    dungeon: 'jellith_dimension',
    characteristics: {
      vitality: 1400,
      actionPoints: 10,
      movementPoints: 5
    },
    resistances: {
      neutral: 50,
      earth: 50,
      fire: -10,
      water: 50,
      air: 50,
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
    dungeon: 'jellith_dimension',
    characteristics: {
      vitality: 1400,
      actionPoints: 10,
      movementPoints: 5
    },
    resistances: {
      neutral: 50,
      earth: -10,
      fire: 50,
      water: 50,
      air: 50,
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
    dungeon: 'jellith_dimension',
    characteristics: {
      vitality: 1400,
      actionPoints: 10,
      movementPoints: 5
    },
    resistances: {
      neutral: 50,
      earth: 50,
      fire: 50,
      water: 50,
      air: -10,
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
    dungeon: 'jellith_dimension',
    characteristics: {
      vitality: 1400,
      actionPoints: 10,
      movementPoints: 5
    },
    resistances: {
      neutral: 50,
      earth: 50,
      fire: 50,
      water: -10,
      air: 50,
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
    dungeon: 'brumen_tinctorias_laboratory',
    characteristics: {
      vitality: 1900,
      actionPoints: 8,
      movementPoints: 5
    },
    resistances: {
      neutral: 30,
      earth: 0,
      fire: 0,
      water: 0,
      air: 0,
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
    level: 60,
    region: '',
    family: '',
    dungeon: 'otomais_ark',
    characteristics: {
      vitality: 1900,
      actionPoints: 10,
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
    level: 60,
    region: '',
    family: '',
    dungeon: 'crackler_dungeon',
    characteristics: {
      vitality: 3100,
      actionPoints: 8,
      movementPoints: 3
    },
    resistances: {
      neutral: 58,
      earth: -12,
      fire: 28,
      water: 36,
      air: -17,
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
    dungeon: 'wa_wabbits_castle',
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
    dungeon: 'treechnid_dungeon',
    characteristics: {
      vitality: 3600,
      actionPoints: 12,
      movementPoints: 5
    },
    resistances: {
      neutral: 30,
      earth: 30,
      fire: -5,
      water: 30,
      air: -5,
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
    dungeon: 'hard_head_dam',
    characteristics: {
      vitality: 4500,
      actionPoints: 14,
      movementPoints: 4
    },
    resistances: {
      neutral: 15,
      earth: 26,
      fire: 30,
      water: 8,
      air: 13,
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
    dungeon: 'dragonpigs_den',
    characteristics: {
      vitality: 2100,
      actionPoints: 10,
      movementPoints: 5
    },
    resistances: {
      neutral: 38,
      earth: 38,
      fire: 38,
      water: -5,
      air: -5,
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
    dungeon: 'koolich_cavern',
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
    dungeon: 'moon_dungeon',
    characteristics: {
      vitality: 6600,
      actionPoints: 10,
      movementPoints: 6
    },
    resistances: {
      neutral: 10,
      earth: 20,
      fire: 0,
      water: -10,
      air: 20,
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
    dungeon: 'canidae_dungeon',
    characteristics: {
      vitality: 5700,
      actionPoints: 8,
      movementPoints: 7
    },
    resistances: {
      neutral: 22,
      earth: 32,
      fire: -5,
      water: 42,
      air: 42,
    }
  },
  // Level 101 - 150 Dungeons
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
    dungeon: 'bherbs_gully',
    characteristics: {
      vitality: 7000,
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
    dungeon: 'lord_crows_library',
    characteristics: {
      vitality: 4500,
      actionPoints: 12,
      movementPoints: 6
    },
    resistances: {
      neutral: 26,
      earth: 26,
      fire: 46,
      water: 56,
      air: 56,
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
    dungeon: 'bonta_rat_dungeon',
    characteristics: {
      vitality: 3500,
      actionPoints: 7,
      movementPoints: 4
    },
    resistances: {
      neutral: 0,
      earth: 0,
      fire: 0,
      water: 0,
      air: 0,
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
    dungeon: 'brakmar_rat_dungeon',
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
    dungeon: 'rainbow_blop_lair',
    characteristics: {
      vitality: 3400,
      actionPoints: 10,
      movementPoints: 3
    },
    resistances: {
      neutral: -15,
      earth: 15,
      fire: 15,
      water: 15,
      air: 15,
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
    dungeon: 'labyrinth_minotoror',
    characteristics: {
      vitality: 4100,
      actionPoints: 14,
      movementPoints: 6
    },
    resistances: {
      neutral: 35,
      earth: -20,
      fire: -20,
      water: 45,
      air: 35,
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
    dungeon: 'royal_mastogobs_greenhouse',
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
    dungeon: 'royal_tofu_house',
    characteristics: {
      vitality: 3400,
      actionPoints: 12,
      movementPoints: 30
    },
    resistances: {
      neutral: 38,
      earth: 23,
      fire: 18,
      water: 23,
      air: 58,
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
    dungeon: 'dreggon_dungeon',
    characteristics: {
      vitality: 7000,
      actionPoints: 9,
      movementPoints: 3
    },
    resistances: {
      neutral: 58,
      earth: -12,
      fire: 28,
      water: 28,
      air: 28,
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
    dungeon: 'skeunks_hideoutmoon_dungeon',
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
  { id: 'skeunk', name: 'Skeunk', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/780.w200h.png', defaultLevel: 120 },
  { id: 'krakillian', name: 'Krakillian Wächter', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3794.w200h.png', defaultLevel: 130 },
  { id: 'kanigroula', name: 'Kanigroula', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3774.w200h.png', defaultLevel: 140 },
  { id: 'weicheich', name: 'Weich Eich', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/257.w200h.png', defaultLevel: 140 },
  { id: 'tynril_best', name: 'Bestürzter Tynril', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1072.w200h.png', defaultLevel: 140 },
  { id: 'tynril_perf', name: 'Perfider Tynril', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1086.w200h.png', defaultLevel: 140 },
  { id: 'tynril_verb', name: 'Verblüffter Tynril', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1087.w200h.png', defaultLevel: 140 },
  { id: 'tynril_verd', name: 'Verdutzter Tynril', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1085.w200h.png', defaultLevel: 140 },
  { id: 'ping', name: 'King Ping', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/2848.w200h.png', defaultLevel: 162 },
  { id: 'mina', name: 'Hell Mina', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/4318.w200h.png', defaultLevel: 140 },
  { id: 'ben', name: 'Ben der Ripat', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/2877.w200h.png', defaultLevel: 150 },
  { id: 'sphincter', name: 'Sphincter Cell', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/943.w200h.png', defaultLevel: 150 },
  // Level 151 - 190 Dungeons
  { id: 'kimbo', name: 'Kimbo', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1045.w200h.png', defaultLevel: 160 },
  { id: 'minotot', name: 'Minotot', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/827.w200h.png', defaultLevel: 160 },
  { id: 'obsi', name: 'Obsidianter', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/2924.w200h.png', defaultLevel: 160 },
  { id: 'zombrute', name: 'Zombrutalist', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3772.w200h.png', defaultLevel: 160 },
  { id: 'tengu', name: 'Tengu Eisfux', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/2967.w200h.png', defaultLevel: 170 },
  { id: 'fuji', name: 'Fuji Eisfux', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3234.w200h.png', defaultLevel: 190 },
  { id: 'nagate', name: 'Nagate', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3944.w200h.png', defaultLevel: 170 },
  { id: 'skai', name: 'König Skai', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3671.w200h.png', defaultLevel: 170 },
  { id: 'korri', name: 'Korriander', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/2968.w200h.png', defaultLevel: 180 },
  { id: 'krakamor', name: 'Riesenkrakamor', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/423.w200h.png', defaultLevel: 180 },
  { id: 'bworker', name: 'Bworker', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/478.w200h.png', defaultLevel: 180 },
  { id: 'stinker', name: 'Stinkeling', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1159.w200h.png', defaultLevel: 180 },
  { id: 'tanuki', name: 'Tanukouï San', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3990.w200h.png', defaultLevel: 180 },
  { id: 'daxolossus', name: 'Daxolossus', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/2986.w200h.png', defaultLevel: 190 },
  { id: 'professor', name: 'Professor Xa', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/2992.w200h.png', defaultLevel: 190 },
  { id: 'fuxoroshi', name: 'Fuxoroshi', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3954.w200h.png', defaultLevel: 190 },
  { id: 'grollum', name: 'Grollum', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/2942.w200h.png', defaultLevel: 190 },
  { id: 'barbaer', name: 'Himmlischer Barbär', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/4347.w200h.png', defaultLevel: 200 },
  { id: 'shihan', name: 'Shihan', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3932.w200h.png', defaultLevel: 200 },
  { id: 'hanshi', name: 'Hanshi', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3924.w200h.png', defaultLevel: 200 },
  // Level 191 - 200 Dungeons
  { id: 'frizz', name: 'Missiz Frizz', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3391.w200h.png', defaultLevel: 220 },
  { id: 'sylargh', name: 'Sylargh', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3409.w200h.png', defaultLevel: 220 },
  { id: 'klimm', name: 'R.Klimm', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3384.w200h.png', defaultLevel: 220 },
  { id: 'nileza', name: 'Nileza', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3397.w200h.png', defaultLevel: 220 },
  { id: 'primzahl', name: 'Graf Primzahl', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3416.w200h.png', defaultLevel: 220 },
  { id: 'damadrya', name: 'Damadrya', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3972.w200h.png', defaultLevel: 200 },
  { id: 'katamashii', name: 'Katamashii', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/4411.w200h.png', defaultLevel: 220 },
  // Saisonale Bosse
  { id: 'mucane', name: 'Mucane', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3652.w200h.png', defaultLevel: 150 },
  { id: 'ulkhan', name: 'Ul-Khan', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3647.w200h.png', defaultLevel: 200 },
  { id: 'grasmera_schlaf', name: 'Schlafwandelnder Grasmera', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3298.w200h.png', defaultLevel: 100 },
  { id: 'grozilla_schlaf', name: 'Schlafwandelnder Grozilla', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3295.w200h.png', defaultLevel: 100 },
  { id: 'grasmera_ersch', name: 'Erschöpfter Grasmera', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3297.w200h.png', defaultLevel: 200 },
  { id: 'grozilla_ersch', name: 'Erschöpfter Grozilla', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3294.w200h.png', defaultLevel: 200 },
  { id: 'grasmera_mued', name: 'Müder Grasmera', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3296.w200h.png', defaultLevel: 300 },
  { id: 'grozilla_mued', name: 'Müder Grozilla', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3293.w200h.png', defaultLevel: 300 },
  { id: 'grasmera', name: 'Grasmera', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3143.w200h.png', defaultLevel: 400 },
  { id: 'grozilla', name: 'Grozilla', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3142.w200h.png', defaultLevel: 400 },
  { id: 'sauger', name: 'Mark Sauger', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3650.w200h.png', defaultLevel: 60 },
  { id: 'hoellofeen', name: 'Höll OFeen', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3306.w200h.png', defaultLevel: 100 },
  { id: 'deleghul', name: 'Personal Deleghul', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3557.w200h.png', defaultLevel: 220 },
  { id: 'pisack', name: 'Pi_Sack', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1179.w200h.png', defaultLevel: 50 },
  { id: 'weissnachtsmann', name: 'Weißnachtsmann', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/872.w200h.png', defaultLevel: 110 },
  { id: 'rubraecher', name: 'Rubrächer, der Knechter', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1194.w200h.png', defaultLevel: 180 },
  { id: 'minotoball', name: 'Weißnachts-Minotoball', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/2819.w200h.png', defaultLevel: 1000 },
  { id: 'vlad', name: 'Dark Vlad', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/4631.w200h.png', defaultLevel: 300 },
];

module.exports = { BOSSE_LISTE };