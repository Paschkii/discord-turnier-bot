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
    challenges: ['statue', 'blitzkrieg', 'duo(20)'],
    bossid: 'skeunk',
    dungeonLevel: 120
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
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Minerock Sanctuary', es: '', fr: '', pt: ''
  // de: / en: Last, Zombie, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Kanigrula\'s Hideout', es: '', fr: '', pt: ''
  // de: / en: First, Clean Hands, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Soft Oak Dungeon', es: '', fr: '', pt: ''
  // de: / en: Freedom, First, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'The Tynril Lab', es: '', fr: '', pt: ''
  // de: / en: Untouchable, Zombie, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Royal Pingwin\'s Excavation', es: '', fr: '', pt: ''
  // de: / en: Last, Tight, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Long Slumber\'s Barrow', es: '', fr: '', pt: ''
  // de: / en: First, Survivor, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'The Wreck of The Hesperus', es: '', fr: '', pt: ''
  // de: / en: Keep Moving, Statue, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Amakna Castle Rat Dungeon', es: '', fr: '', pt: ''
  // de: / en: Impertinence, Last, Duo(20) / es: / fr: / pt: 
  // Stufe 151 - 190
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Kimbo\'s Canopy', es: '', fr: '', pt: ''
  // de: / en: Statue, First, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Minotot Room', es: '', fr: '', pt: ''
  // de: / en: Keep Moving, First, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'The Obsidemon\'s Hypogeum', es: '', fr: '', pt: ''
  // de: / en: First, Statue, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'The Flooded Chapel', es: '', fr: '', pt: ''
  // de: / en: Fainthearted, Versatile, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: Snowfoux Caverns '', es: '', fr: '', pt: ''
  // de: / en: First, Statue, Duo / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Valley of the Lady of the Water', es: '', fr: '', pt: ''
  // de: / en: Last, Impertinence, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Scale King\'s Pyramid', es: '', fr: '', pt: ''
  // de: / en: Last, Statue, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Korriander\'s Lair', es: '', fr: '', pt: ''
  // de: / en: Mystique, Zombie, Duo(15) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Lair of the Giant Kralove', es: '', fr: '', pt: ''
  // de: / en: Nomad, Blitzkrieg, Duo(41) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Bworker Dungeon', es: '', fr: '', pt: ''
  // de: / en: Impertinence, Quick and Furious, Duo(15) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Fungus Dungeon', es: '', fr: '', pt: ''
  // de: / en: Tight, Last, Duo(15) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Tanukouï San\'s Workshop', es: '', fr: '', pt: ''
  // de: / en: Nomad, Blitzkrieg, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Kolosso≥\'s Cavern', es: '', fr: '', pt: ''
  // de: / en: Last, First, Duo(19) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Fouxwork Factory', es: '', fr: '', pt: ''
  // de: / en: Last, Hermit, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Foster Caverns', es: '', fr: '', pt: ''
  // de: / en: Last, Statue, Duo(21) / es: / fr: / pt:
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Sakai Mine', es: '', fr: '', pt: ''
  // de: / en: Versatile, Blitzkrieg, Duo(28) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Bearbarian Antichamber', es: '', fr: '', pt: ''
  // de: / en: First, Tight, Duo(17) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Wind Dojo', es: '', fr: '', pt: ''
  // de: / en: First, Fainthearted, Duo(20) / es: / fr: / pt: 
  // Stufe 191 - 200
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Missiz Freezz\'s Frostforge', es: '', fr: '', pt: ''
  // de: / en: Nomad, Tight, Duo(40) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Sylargh\'s Carrier', es: '', fr: '', pt: ''
  // de: / en: Hermit, Barbaric, Duo(40) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Klime\'s Private Suite', es: '', fr: '', pt: ''
  // de: / en: Fainthearted, Nomad, Duo(40) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Nileza\'s Laboratory', es: '', fr: '', pt: ''
  // de: / en: Fainthearted, Last, Duo(40) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'The Count\'s Dungeon', es: '', fr: '', pt: ''
  // de: / en: Versatile, Statue, Duo(40) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Damadrya\'s Bamboo Grove', es: '', fr: '', pt: ''
  // de: / en: Hermit, First, Duo(20) / es: / fr: / pt: 
  { dungeonid: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    sidemobs: ['', '', ''],
    challenges: ['', '', 'Duo(20)'],
    bossid: '',
    dungeonLevel: 0
  },
  // de: '', en: 'Lost Soul\'s Sanctuary', es: '', fr: '', pt: ''
  // de: / en: Clean Hands, Impertinence, Duo(20) / es: / fr: / pt: 
];

const DUNGEON_KATEGORIEN = {
  'Level 1-50'    : d => d.level >= 1   && d.level <= 50,
  'Level 51-100'  : d => d.level >= 51  && d.level <= 100,
  'Level 101-150' : d => d.level >= 101 && d.level <= 150,
  'Level 151-190' : d => d.level >= 151 && d.level <= 190,
  'Level 191-200' : d => d.level >= 191 && d.level <= 200,
};

module.exports = { DUNGEON_LISTE, DUNGEON_KATEGORIEN };