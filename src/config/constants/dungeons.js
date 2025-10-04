// === Imports ===


const DUNGEON_LISTE = [
  // === Stufe 1 - 50 ===
  // Belladonna's Castle
  { dungeonid: 'belladonna_castle',
    dungeonname: {
      de: 'Belladonnas Schloss',
      en: 'Belladonna\'s Castle',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['no_rush', 'last', 'duo(20)'],
    bossid: 'belladonna',
    dungeonLevel: 12
  },
  // Field Dungeon
  { dungeonid: 'field_dungeon',
    dungeonname: {
      de: 'Felder Dungeon',
      en: 'Field Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['tight', 'first', 'duo(20)'],
    bossid: 'famished_sunflower',
    dungeonLevel: 30
  },
  // Sand Dungeon
  { dungeonid: 'sand_dungeon',
    dungeonname: {
      de: 'Versandeter Dungeon',
      en: 'Sand Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['hermit', 'versatile', 'duo(20)'],
    bossid: 'spongemob',
    dungeonLevel: 40
  },
  // Scaraleaf Dungeon
  { dungeonid: 'scaraleaf_dungeon',
    dungeonname: {
      de: 'Scarablatt Dungeon',
      en: 'Scaraleaf Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['zombie', 'clean_hands', 'duo(20)'],
    bossid: 'scarabugly',
    dungeonLevel: 40
  },
  // Tofu House
  { dungeonid: 'tofu_house',
    dungeonname: {
      de: 'Tofu Dungeon',
      en: 'Tofu House',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['no_rush', 'versatile', 'duo(20)'],
    bossid: 'batofu',
    dungeonLevel: 40
  },
  // Haunted House
  { dungeonid: 'haunted_house',
    dungeonname: {
      de: 'Geisterhaus',
      en: 'Haunted House',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['hermit', 'last', 'duo(20)'],
    bossid: 'boostache',
    dungeonLevel: 40
  },
  // Skeleton Dungeon
  { dungeonid: 'skeleton_dungeon',
    dungeonname: {
      de: 'Dungeon der Skelette',
      en: 'Skeleton Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['nomad', 'first', 'duo(20)'],
    bossid: 'ronin_chafer',
    dungeonLevel: 40
  },
  // Gobball Dungeon
  { dungeonid: 'gobball_dungeon',
    dungeonname: {
      de: 'Fresssack Dungeon',
      en: 'Gobball Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['fainthearted', 'blitzkrieg', 'duo(20)'],
    bossid: 'royal_gobball',
    dungeonLevel: 50
  },
  // Bwork Dungeon
  { dungeonid: 'bwork_dungeon',
    dungeonname: {
      de: 'Bwork Dungeon',
      en: 'Bwork Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['hermit', 'first', 'duo(20)'],
    bossid: 'bworkette',
    dungeonLevel: 50
  },
  // Blacksmith Dungeon
  { dungeonid: 'blacksmith_dungeon',
    dungeonname: {
      de: 'Dungeon der Schattenschmiede',
      en: 'Blacksmith Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['nomad', 'first', 'duo(20)'],
    bossid: 'smiths_chest',
    dungeonLevel: 50
  },
  // Larva Dungeon
  { dungeonid: 'larva_dungeon',
    dungeonname: {
      de: 'Larven Dungeon',
      en: 'Larva Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['fainthearted', 'versatile', 'duo(20)'],
    bossid: 'shin_larva',
    dungeonLevel: 50
  },
  // Grotto Hesque
  { dungeonid: 'grotto_hesque',
    dungeonname: {
      de: 'Aggrotte',
      en: 'Grotto Hesque',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['impertinence', 'blitzkrieg', 'duo(20)'],
    bossid: 'great_coralator',
    dungeonLevel: 50
  },
  // Kwakwa's Nest
  { dungeonid: 'kwakwas_nest',
    dungeonname: {
      de: 'Nest des Kwackataus',
      en: 'Kwakwa\'s Nest',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['zombie', 'clean hands', 'duo(20)'],
    bossid: 'kwakwa',
    dungeonLevel: 50
  },
  // Stufe 51 - 100
  // Wa Wabbit's Castle
  { dungeonid: 'wa_wabbits_castle',
    dungeonname: {
      de: 'Schloss des Wa Wabbits',
      en: 'Wa Wabbit\'s Castle',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['impertinence', 'blitzkrieg', 'duo(20)'],
    bossid: 'wa_wabbit',
    dungeonLevel: 60
  },
  // Kanniball Dungeon
  { dungeonid: 'kanniball_dungeon',
    dungeonname: {
      de: 'Kanniball Dungeon',
      en: 'Kanniball Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['zombie', 'first', 'duo(20)'],
    bossid: 'kanniball_',
    dungeonLevel: 60
  },
  // Blop Dungeon
  { dungeonid: 'blop_dungeon',
    dungeonname: {
      de: 'Blob Dungeon',
      en: 'Blop Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['duel', 'fainthearted', 'duo(20)'],
    bossid: {
      cherry: 'royal_morello_cherry_blop',
      pippin: 'royal_pippin_blop',
      coco: 'royal_coco_blop',
      indigo: 'royal_indigo_blop',
    },
    dungeonLevel: 60
  },
  // The Jellith Dimension
  { dungeonid: 'jellith_dimension',
    dungeonname: {
      de: 'Königliche Gelee Dimension',
      en: 'The Jellith Dimension',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['duel', 'tight', 'duo(20)'],
    bossid: {
      blue: 'royal_blue_jelly',
      mint: 'royal_mint_jelly',
      lemon: 'royal_lemon_jelly',
      strawberry: 'royal_strawberry_jelly',
    },
    dungeonLevel: 60
  },
  // Brumen Tinctoria's LaboRATory
  { dungeonid: 'brumen_tinctorias_laboratory',
    dungeonname: {
      de: 'Brumen Tinctorias Laboratorium',
      en: 'Brumen Tinctoria\'s LaboRATory',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['last', 'hermit', 'duo(20)'],
    bossid: 'nelween',
    dungeonLevel: 60
  },
  // Hold of Otomai's Ark
  { dungeonid: 'otomais_ark',
    dungeonname: {
      de: 'Bilge von Otomaïs Arche',
      en: 'Hold of Otomai\'s Ark',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['first', 'scanty', 'duo(20)'],
    bossid: 'gourlo_the_terrible',
    dungeonLevel: 70
  },
  // Crackler Dungeon
  { dungeonid: 'crackler_dungeon',
    dungeonname: {
      de: 'Krachler Dungeon',
      en: 'Crackler Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['fainthearted', 'first', 'duo(20)'],
    bossid: 'legendary_crackler',
    dungeonLevel: 70
  },
  // Wa Wabbit's Warren
  { dungeonid: 'wa_wabbits_warren',
    dungeonname: {
      de: 'Wa Wabbit Bau',
      en: 'Wa Wabbit\'s Warren',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['clean hands', 'blitzkrieg', 'duo(20)'],
    bossid: 'wa_wobot',
    dungeonLevel: 80
  },
  // Treechnid Dungeon
  { dungeonid: 'treechnid_dungeon',
    dungeonname: {
      de: 'Astaknyden Dungeon',
      en: 'Treechnid Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['nomad', 'first', 'Duo(20)'],
    bossid: 'ancestral_treechnid',
    dungeonLevel: 90
  },
  // Hard-Head Dam
  { dungeonid: 'hard_head_dam',
    dungeonname: {
      de: 'Dickschädel-Staudamm',
      en: 'Hard-Head Dam',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['versatile', 'clean hands', 'duo(20)'],
    bossid: 'selim_quartz',
    dungeonLevel: 90
  },
  // Dragon Pig's Den
  { dungeonid: 'dragonpigs_den',
    dungeonname: {
      de: 'Unterschlupf des Schweinedrachens',
      en: 'Dragon Pig\'s Den',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['impertinence', 'versatile', 'duo(20)'],
    bossid: 'dragonpig',
    dungeonLevel: 100
  },
  // Koolich Cavern
  { dungeonid: 'koolich_cavern',
    dungeonname: {
      de: 'Höhle des Kuhlosses',
      en: 'Koolich Cavern',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['zombie', 'clean_hands', 'duo(20)'],
    bossid: 'koolich',
    dungeonLevel: 100
  },
  // Moon Dungeon
  { dungeonid: 'moon_dungeon',
    dungeonname: {
      de: 'Dungeon von Moon',
      en: 'Moon Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['versatile', 'statue', 'duo(20)'],
    bossid: 'moon',
    dungeonLevel: 100
  },
  // Canidae Dungeon
  { dungeonid: 'canidae_dungeon',
    dungeonname: {
      de: 'Canidae Dungeon',
      en: 'Canidae Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['first', 'impertinence', 'duo(20)'],
    bossid: 'moowolf',
    dungeonLevel: 100
  },
  // Stufe 101 - 150
  // Bherb's Gully
  { dungeonid: 'bherbs_gully',
    dungeonname: {
      de: 'Shilf-Engpass',
      en: 'Bherb\'s Gully',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['first', 'time_flies', 'duo(20)'],
    bossid: 'silf',
    dungeonLevel: 110
  },
  // Lord Crow's Library
  { dungeonid: 'lord_crows_library',
    dungeonname: {
      de: 'Meister Rabs Bibliothek',
      en: 'Lord Crow\'s Library',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['tight', 'first', 'duo(20)'],
    bossid: 'lord_crow',
    dungeonLevel: 110
  },
  // Bonta Rat Dungeon
  { dungeonid: 'bonta_rat_dungeon',
    dungeonname: {
      de: 'Rattendungeon von Bonta',
      en: 'Bonta Rat Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['first', 'impertinence', 'duo(20)'],
    bossid: 'white_rat',
    dungeonLevel: 110
  },
  // Brakmar Rat Dungeon
  { dungeonid: 'brakmar_rat_dungeon',
    dungeonname: {
      de: 'Rattendungeon von Brakmar',
      en: 'Brakmar Rat Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['impertinence', 'blitzkrieg', 'Duo(20)'],
    bossid: 'black_rat',
    dungeonLevel: 110
  },

  { dungeonid: 'rainbow_blop_lair',
    dungeonname: {
      de: 'Unterschlupf des königlichen Multiblobs',
      en: 'Rainbow Blop Lair',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['impertinence', 'duel', 'duo(20)'],
    bossid: 'royal_rainbow_blop',
    dungeonLevel: 120
  },
  // Inner Labyrinth of the Minotoror
  { dungeonid: 'labyrinth_minotoror',
    dungeonname: {
      de: 'Herz des Labyrinths des Minotorors',
      en: 'Inner Labyrinth of the Minotoror',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['hermit', 'clean_hands', 'duo(20)'],
    bossid: 'minotoror',
    dungeonLevel: 120
  },
  // Royal Mastogob's Greenhouse
  { dungeonid: 'royal_mastogobs_greenhouse',
    dungeonname: {
      de: 'Gewächshaus des Königlichen Fressmuts',
      en: 'Royal Mastogob\'s Greenhouse',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['clean_hands', 'first', 'duo(20)'],
    bossid: 'royal_mastogob',
    dungeonLevel: 120
  },
  // Royal Tofu House
  { dungeonid: 'royal_tofu_house',
    dungeonname: {
      de: 'Königlicher Tofustall',
      en: 'Royal Tofu House',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['last', 'statue', 'duo(20)'],
    bossid: 'royal_tofu',
    dungeonLevel: 120
  },
  // Dreggon Dungeon
  { dungeonid: 'dreggon_dungeon',
    dungeonname: {
      de: 'Drachei-Dungeon',
      en: 'Dreggon Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['tight', 'blitzkrieg', 'duo(20)'],
    bossid: 'crocabulia',
    dungeonLevel: 120
  },
  // Skeunk's Hideout
  { dungeonid: 'skeunks_hideout',
    dungeonname: {
      de: 'Unterschlupf des Skeunks',
      en: 'Skeunk\'s Hideout',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['statue', 'blitzkrieg', 'duo(26)'],
    bossid: 'skeunk',
    dungeonLevel: 120
  },
  // Minerock Sanctuary
  { dungeonid: 'minerock_sanctuary',
    dungeonname: {
      de: 'Erzfelser Heiligtum',
      en: 'Minerock Sanctuary',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['last', 'zombie', 'duo(20)'],
    bossid: 'crakillian_guardian',
    dungeonLevel: 130
  },
  // Kanigrula's Hideout
  { dungeonid: 'kanigrulas_hideout',
    dungeonname: {
      de: 'Kanigroulas Unterschlupf',
      en: 'Kanigrula\'s Hideout',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['first', 'clean_hands', 'duo(20)'],
    bossid: 'kanigrula',
    dungeonLevel: 140
  },
  // Soft Oak Dungeon
  { dungeonid: 'soft_oak_dungeon',
    dungeonname: {
      de: 'Weich Eich Dungeon',
      en: 'Soft Oak Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['freedom', 'first', 'duo(20)'],
    bossid: '',
    dungeonLevel: 140
  },
  // The Tynril Lab
  { dungeonid: 'the_tynril_lab',
    dungeonname: {
      de: 'Tynrils Laboratorium',
      en: 'The Tynril Lab',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['untouchable', 'zombie', 'duo(20)'],
    bossid: {
      disconcerted: 'disconcerted_tynril',
      dismayed: 'dismayed_tynril',
      perfidious: 'perfidious_tynril',
      stunned: 'stunned_tynril',
    },
    dungeonLevel: 140
  },
  // Royal Pingwin's Excavation
  { dungeonid: 'royal_pingwins_excavation',
    dungeonname: {
      de: 'King Ping Grotte',
      en: 'Royal Pingwin\'s Excavation',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['last', 'tight', 'duo(20)'],
    bossid: 'royal_pingwin',
    dungeonLevel: 140
  },
  // Long Slumber's Barrow
  { dungeonid: 'long_slumbers_barrow',
    dungeonname: {
      de: 'Grabhügel des langen Schlafs',
      en: 'Long Slumber\'s Barrow',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['first', 'survivor', 'duo(20)'],
    bossid: 'hell_mina',
    dungeonLevel: 140
  },
  // The Wreck of the Hesperus
  { dungeonid: 'the_wreck_of_the_hesperus',
    dungeonname: {
      de: 'Wrack der Black Rogg',
      en: 'The Wreck of the Hesperus',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['keep_moving', 'statue', 'duo(20)'],
    bossid: 'buck_anear',
    dungeonLevel: 150
  },
  // Amakna Castle Rat Dungeon
  { dungeonid: 'amakna_castle_rat_dungeon',
    dungeonname: {
      de: 'Rattendungeon des Schlosses von Amakna',
      en: 'Amakna Castle Rat Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['impertinence', 'last', 'duo(20)'],
    bossid: {
      sphincter: 'sphincter_cell',
      white_rat: 'white_rat,',
      black_rat: 'black_rat'
    },
    dungeonLevel: 150
  },
  // Stufe 151 - 190
  // Kimbo's Canopy
  { dungeonid: 'kimbos_canopy',
    dungeonname: {
      de: 'Kimbo Blätterdach',
      en: 'Kimbo\'s Canopy',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['statue', 'first', 'duo(20)'],
    bossid: 'kimbo',
    dungeonLevel: 160
  },
  // Minotot Room
  { dungeonid: 'minotot_room',
    dungeonname: {
      de: 'Minotot Raum',
      en: 'Minotot Room',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['keep_moving', 'first', 'duo(20)'],
    bossid: 'minotot',
    dungeonLevel: 160
  },
  // The Obsidemon's Hypogeum
  { dungeonid: 'the_obsidemons_hypogeum',
    dungeonname: {
      de: 'Grabgewölbe der Obsidianter',
      en: 'The Obsidemon\'s Hypogeum',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['first', 'statue', 'duo(20)'],
    bossid: 'obsidemon',
    dungeonLevel: 160
  },
  // The Flooded Chapel
  { dungeonid: 'the_flooded_chapel',
    dungeonname: {
      de: 'Die überflutete Kapelle',
      en: 'The Flooded Chapel',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['fainthearted', 'versatile', 'duo(20)'],
    bossid: 'zombrute',
    dungeonLevel: 160
  },
  // Snowfoux Caverns
  { dungeonid: 'snowfoux_caverns',
    dungeonname: {
      de: 'Eisfux Höhlen',
      en: 'Snowfoux Caverns',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['first', 'statue', 'duo(15)'],
    bossid: 'tengu_snowfoux',
    dungeonLevel: 170
  },
  // Valley of the Lady of the Water
  { dungeonid: 'valley_of_the_lady_of_the_water',
    dungeonname: {
      de: 'Tal der Herrin über die Gewässer',
      en: 'Valley of the Lady of the water',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['last', 'impertinence', 'duo(20)'],
    bossid: 'nagate',
    dungeonLevel: 170
  },
  // Scale King's Pyramid
  { dungeonid: 'scale_kings_pyramid',
    dungeonname: {
      de: 'Pyramide von König Skai',
      en: 'Scale King\'s Pyramid',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['last', 'statue', 'duo(20)'],
    bossid: 'scale_king',
    dungeonLevel: 170
  },
  // Korriander's Lair
  { dungeonid: 'korrianders_lair',
    dungeonname: {
      de: 'Unterschlupf des Korrianders',
      en: 'Korriander\'s Lair',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['mystique', 'zombie', 'duo(20)'],
    bossid: 'Korriander',
    dungeonLevel: 180
  },
  // Lair of the Giant Kralove
  { dungeonid: 'lair_of_the_giant_kralove',
    dungeonname: {
      de: 'Höhle des Riesenkrakamors',
      en: 'Lair of the Giant Kralove',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['nomad', 'blitzkrieg', 'Duo(20)'],
    bossid: 'giant_kralove',
    dungeonLevel: 180
  },
  // Bworker Dungeon
  { dungeonid: 'bworker_dungeon',
    dungeonname: {
      de: 'Bworker Dungeon',
      en: 'Bworker Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['impertinence', 'quick_and_furious', 'duo(20)'],
    bossid: 'bworker',
    dungeonLevel: 180
  },
  // Fungus Dungeon
  { dungeonid: 'fungus_dungeon',
    dungeonname: {
      de: 'Pilz-Dungeon',
      en: 'Fungus Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['tight', 'last', 'Duo(15)'],
    bossid: 'ougaa',
    dungeonLevel: 180
  },
  // Tanukoui San's Workshop
  { dungeonid: 'tanukoui_sans_workshop',
    dungeonname: {
      de: 'Tanukouï Sans Werkstatt',
      en: 'Tanukoui San\'s Workshop',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['nomad', 'blitzkrieg', 'duo(20)'],
    bossid: 'tanukoui_san',
    dungeonLevel: 180
  },
  // Kolosso's Cavern
  { dungeonid: 'kolossos_cavern',
    dungeonname: {
      de: 'Höhlen des Daxolossus',
      en: 'Kolosso\'s Cavern',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['last', 'first', 'duo(19)'],
    bossid: {
      kolosso: 'kolosso',
      professorXa: 'professor_xa'
    },
    dungeonLevel: 190
  },
  // Fouxwork Factory
  { dungeonid: 'fouxwork_factory',
    dungeonname: {
      de: 'Feuerwirrk-Fabrik',
      en: 'Fouxwork Factory',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['last', 'hermit', 'duo(20)'],
    bossid: 'founoroshi',
    dungeonLevel: 190
  },
  // Foster Caverns
  { dungeonid: 'foster_caverns',
    dungeonname: {
      de: 'Fujis Höhle',
      en: 'Foster Caverns',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['last', 'statue', 'duo(21)'],
    bossid: 'fuji_snowfoux',
    dungeonLevel: 190
  },
  // Sakai Mine
  { dungeonid: 'sakai_mine',
    dungeonname: {
      de: 'Mine von Arkal',
      en: 'Sakai Mine',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['versatile', 'blitzkrieg', 'duo(28)'],
    bossid: 'grohlum',
    dungeonLevel: 190
  },
  // Bearbarian Antichamber
  { dungeonid: 'bearbarian_antichamber',
    dungeonname: {
      de: 'Vorraum des Barbärenstockes',
      en: 'Bearbarian Antichamber',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['first', 'tight', 'duo(17)'],
    bossid: 'celestial_bearbarian',
    dungeonLevel: 190
  },
  // Wind Dojo
  { dungeonid: 'wind_dojo',
    dungeonname: {
      de: 'Dojo des Windes',
      en: 'Wind Dojo',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['first', 'fainthearted', 'Duo(20)'],
    bossid: {
      shihan: 'shihan',
      hanshi: 'hanshi'
    },
    dungeonLevel: 190
  },
  // Stufe 191 - 200
  // Missiz Freezz's Frostforge
  { dungeonid: 'missiz_freezzs_frostforge',
    dungeonname: {
      de: 'Missiz Frizz Kaltschmiede',
      en: 'Missiz Frizz\'s Frostforge',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['nomad', 'tight', 'duo(40)'],
    bossid: 'missiz_freezz',
    dungeonLevel: 190
  },
  // Sylargh's Carrier
  { dungeonid: 'sylarghs_carrier',
    dungeonname: {
      de: 'Sylarghs Transport',
      en: 'Sylargh\'s Carrier',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['hermit', 'barbaric', 'duo(40)'],
    bossid: 'sylargh',
    dungeonLevel: 190
  },
  // Klime's Private Suite
  { dungeonid: 'klimes_private_suite',
    dungeonname: {
      de: 'Die privaten Gesellschaftszimmer R.Klimms',
      en: 'Klime\'s Private Suite',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['fainthearted', 'nomad', 'duo(40)'],
    bossid: 'klime',
    dungeonLevel: 190
  },
  // Nileza's Laboratory
  { dungeonid: 'nilezas_laboratory',
    dungeonname: {
      de: 'Nilezas Laboratorium',
      en: 'Nileza\'s Laboratory',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['fainthearted', 'last', 'duo(40)'],
    bossid: 'nileza',
    dungeonLevel: 190
  },
  // The Count's Dungeon
  { dungeonid: 'the_counts_dungeon',
    dungeonname: {
      de: 'Graf Primzahls Dungeon',
      en: 'The Count\'s Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['versatile', 'statue', 'duo(40)'],
    bossid: 'count_harebourg',
    dungeonLevel: 190
  },
  // Damadrya's Bamboo Grove
  { dungeonid: 'damadryas_bamboo_grove',
    dungeonname: {
      de: 'Damadryas Bambushain',
      en: 'Damadrya\'s Bamboo Grove',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['hermit', 'first', 'duo(20)'],
    bossid: 'damadrya',
    dungeonLevel: 190
  },
  // Lost Soul's Sanctuary
  { dungeonid: 'lost_souls_sanctuary',
    dungeonname: {
      de: 'Heiligtum der verirrten Seelen',
      en: 'Lost Soul\'s Sanctuary',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['clean_hands', 'impertinence', 'duo(20)'],
    bossid: 'katamashii',
    dungeonLevel: 190
  },
  // === Saisonale Dungeons
  // -- Ascension --
  { dungeonid: 'ascension_25',
    dungeonname: {
      de: 'Insel der Ersteigung(25)',
      en: 'Ascension Island (25)',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: [''],
    bossid: 'mucane',
    dungeonLevel: 0
  },
  { dungeonid: 'ascension_50',
    dungeonname: {
      de: 'Insel der Ersteigung(50)',
      en: 'Ascension Island (50)',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: [''],
    bossid: 'ul_khan',
    dungeonLevel: 0
  },
  { dungeonid: 'ascension_75',
    dungeonname: {
      de: 'Insel der Ersteigung(75)',
      en: 'Ascension Island (75)',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: [''],
    bossid: 'mucane',
    dungeonLevel: 0
  },
  { dungeonid: 'ascension_100',
    dungeonname: {
      de: 'Insel der Ersteigung(100)',
      en: 'Ascension Island (100)',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: [''],
    bossid: 'ul_khan',
    dungeonLevel: 0
  },
  // -- Vulkania --
  // Sleepwalking
  { dungeonid: 'sleepwalking_pinki_crater',
    dungeonname: {
      de: 'Schlafwandeln im Krater Minus',
      en: 'Sleepwalking Pinki Crater',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['chrono(9)', 'statue', 'clean_hands', 'duo(20)'],
    bossid: ['sleepwalking_grozilla', 'sleepwalking_grasmera'],
    dungeonLevel: 40
  },
  // Exhausted
  { dungeonid: 'exhausted_pinki_crater',
    dungeonname: {
      de: 'Erschöpft im Krater Minus',
      en: 'Exhausted Pinki Crater',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['chrono(9)', 'first', 'tight', 'duo(20)'],
    bossid: ['exhausted_grozilla', 'exhausted_grasmera'],
    dungeonLevel: 90
  },
  // Tired
  { dungeonid: 'tired_pinki_crater',
    dungeonname: {
      de: 'Müde im Krater Minus',
      en: 'Tired Pinki Crater',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['chrono(9)', 'nomad', 'blitzkrieg', 'duo(20)'],
    bossid: ['tired_grozilla', 'tired_grasmera'],
    dungeonLevel: 140
  },
  { dungeonid: 'pinki_crater',
    dungeonname: {
      de: 'Krater Minus',
      en: 'Pinki Crater',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['chrono(9)', 'zombie', 'impertinence', 'duo(20)'],
    bossid: ['grozilla', 'grasmera'],
    dungeonLevel: 190
  },
  // -- Horrob Isle --
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'duo()'],
    bossid: 'bone_shot',
    dungeonLevel: 0
  },
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'duo()'],
    bossid: 'al_howing',
    dungeonLevel: 0
  },
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'duo()'],
    bossid: 'staff_deleghoul',
    dungeonLevel: 0
  },
  // -- Kwismas --
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'duo()'],
    bossid: 'itzing',
    dungeonLevel: 0
  },
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'duo()'],
    bossid: 'father_kwismas',
    dungeonLevel: 0
  },
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'duo()'],
    bossid: 'father_whupper',
    dungeonLevel: 0
  },
];

const DUNGEON_KATEGORIEN = {
  'Level 1-50'    : d => d.level >= 1   && d.level <= 50,
  'Level 51-100'  : d => d.level >= 51  && d.level <= 100,
  'Level 101-150' : d => d.level >= 101 && d.level <= 150,
  'Level 151-190' : d => d.level >= 151 && d.level <= 190,
  'Level 191-200' : d => d.level >= 191 && d.level <= 200,
};

module.exports = { DUNGEON_LISTE, DUNGEON_KATEGORIEN };