// === Imports ===
const challengeDefinitions = require('./challenges');
const achievements = require('./achievements');
const { resolveDiscordEmoji } = require('./shared');
const { BOSSE_LISTE } = require('./bosses');
const { MONSTER_LISTE } = require('./monsters');

const SUPPORTED_LOCALES = ['de', 'en', 'es', 'fr', 'pt'];
const BOSS_NAME_BY_ID = new Map(BOSSE_LISTE.map((boss) => [boss.id, boss.name]));
const MONSTER_NAME_BY_ID = new Map(MONSTER_LISTE.map((monster) => [monster.id, monster.name]));

const DUNGEON_ROHDATEN = [
  // === Stufe 1 - 50 ===
  // Belladonna's Castle
  { dungeonID: 'belladonna_castle',
    dungeonname: {
      de: 'Belladonnas Schloss',
      en: 'Belladonna\'s Castle',
      es: '',
      fr: 'Chateau de Belladone',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['ragnarock', 'dolomanus', 'clobberstone']},
      { id: 'room2', monsterID: ['marbmour', 'dolomanus', 'clobberstone']},
      { id: 'room3', monsterID: ['belladonna', 'dolomanus', 'marbmour']},
    ],
    challenges: ['no_rush', 'last', 'duo(20)'],
    bossid: 'belladonna',
    dungeonLevel: 12
  },
  // Field Dungeon
  { dungeonID: 'field_dungeon',
    dungeonname: {
      de: 'Felder Dungeon',
      en: 'Field Dungeon',
      es: '',
      fr: 'Donjon des Champs',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['demonic_rose(2)', 'mush_mush(2)']},
      { id: 'room2', monsterID: ['demonic_rose(2)', 'evil_dandelion', 'wild_sunflower']},
      { id: 'room3', monsterID: ['famished_sunflower', 'demonic_rose', 'evil_dandelion', 'wild_sunflower']},
    ],
    challenges: ['tight', 'first', 'duo(20)'],
    bossid: 'famished_sunflower',
    dungeonLevel: 30
  },
  // Sand Dungeon
  { dungeonID: 'sand_dungeon',
    dungeonname: {
      de: 'Versandeter Dungeon',
      en: 'Sand Dungeon',
      es: '',
      fr: 'Donjon Ensablé',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['white_snapper(2)', 'blue_snapper', 'green_snapper']},
      { id: 'room2', monsterID: ['red_snapper(2)', 'green_snapper(2)']},
      { id: 'room3', monsterID: ['spongemob', 'white_snapper', 'red_snapper', 'green_snapper']},
    ],
    challenges: ['hermit', 'versatile', 'duo(20)'],
    bossid: 'spongemob',
    dungeonLevel: 40
  },
  // Scaraleaf Dungeon
  { dungeonID: 'scaraleaf_dungeon',
    dungeonname: {
      de: 'Scarablatt Dungeon',
      en: 'Scaraleaf Dungeon',
      es: '',
      fr: 'Donjon des Scarafeuilles',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['immature_scaraleaf', 'black_scaraleaf', 'green_scaraleaf', 'blue_scaraleaf']},
      { id: 'room2', monsterID: ['immature_scaraleaf', 'black_scaraleaf', 'red_scaraleaf']},
      { id: 'room3', monsterID: ['golden_scarabugly', 'black_scaraleaf', 'white_scaraleaf', 'blue_scaraleaf']},
    ],
    challenges: ['zombie', 'clean_hands', 'duo(20)'],
    bossid: 'scarabugly',
    dungeonLevel: 40
  },
  // Tofu House
  { dungeonID: 'tofu_house',
    dungeonname: {
      de: 'Tofu Dungeon',
      en: 'Tofu House',
      es: '',
      fr: 'Donjon des Tofus',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['tofu', 'black_tofu', 'tofurby', 'tofukaz']},
      { id: 'room2', monsterID: ['tofukaz', 'tofoone', 'tofurby', 'black_tofu']},
      { id: 'room3', monsterID: ['batofu', 'tofoone', 'tofurby', 'tofukaz']},
    ],
    challenges: ['no_rush', 'versatile', 'duo(20)'],
    bossid: 'batofu',
    dungeonLevel: 40
  },
  // Haunted House
  { dungeonID: 'haunted_house',
    dungeonname: {
      de: 'Geisterhaus',
      en: 'Haunted House',
      es: '',
      fr: 'Maison Fantôme',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['garglyph', 'gargoyle', 'kwoan', 'prepubescent_boostache']},
      { id: 'room2', monsterID: ['vampire_master', 'elite_chafer', 'prepubescent_boostache', 'kwoan']},
      { id: 'room3', monsterID: ['boostache', 'vampire_master', 'elite_chafer', 'kwoan']},
    ],
    challenges: ['hermit', 'last', 'duo(20)'],
    bossid: 'boostache',
    dungeonLevel: 40
  },
  // Skeleton Dungeon
  { dungeonID: 'skeleton_dungeon',
    dungeonname: {
      de: 'Dungeon der Skelette',
      en: 'Skeleton Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['nomad', 'first', 'duo(20)'],
    bossid: 'ronin_chafer',
    dungeonLevel: 40
  },
  // Gobball Dungeon
  { dungeonID: 'gobball_dungeon',
    dungeonname: {
      de: 'Fresssack Dungeon',
      en: 'Gobball Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['fainthearted', 'blitzkrieg', 'duo(20)'],
    bossid: 'royal_gobball',
    dungeonLevel: 50
  },
  // Bwork Dungeon
  { dungeonID: 'bwork_dungeon',
    dungeonname: {
      de: 'Bwork Dungeon',
      en: 'Bwork Dungeon',
      es: '',
      fr: 'Donjon des Bworks',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['bwork_magus', 'bwork_archer(3)']},
      { id: 'room2', monsterID: ['bwork_magus', 'bwork(3)']},
      { id: 'room3', monsterID: ['bworkette', 'bwork_magus', 'bwork_archer', 'bwork']},
    ],
    challenges: ['hermit', 'first', 'duo(20)'],
    bossid: 'bworkette',
    dungeonLevel: 50
  },
  // Blacksmith Dungeon
  { dungeonID: 'blacksmith_dungeon',
    dungeonname: {
      de: 'Dungeon der Schattenschmiede',
      en: 'Blacksmith Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['nomad', 'first', 'duo(20)'],
    bossid: 'smiths_chest',
    dungeonLevel: 50
  },
  // Larva Dungeon
  { dungeonID: 'larva_dungeon',
    dungeonname: {
      de: 'Larven Dungeon',
      en: 'Larva Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['fainthearted', 'versatile', 'duo(20)'],
    bossid: 'shin_larva',
    dungeonLevel: 50
  },
  // Grotto Hesque
  { dungeonID: 'grotto_hesque',
    dungeonname: {
      de: 'Aggrotte',
      en: 'Grotto Hesque',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['impertinence', 'blitzkrieg', 'duo(20)'],
    bossid: 'great_coralator',
    dungeonLevel: 50
  },
  // Kwakwa's Nest
  { dungeonID: 'kwakwas_nest',
    dungeonname: {
      de: 'Nest des Kwackataus',
      en: 'Kwakwa\'s Nest',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['zombie', 'clean hands', 'duo(20)'],
    bossid: 'kwakwa',
    dungeonLevel: 50
  },
  // Stufe 51 - 100
  // Wa Wabbit's Castle
  { dungeonID: 'wa_wabbits_castle',
    dungeonname: {
      de: 'Schloss des Wa Wabbits',
      en: 'Wa Wabbit\'s Castle',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['impertinence', 'blitzkrieg', 'duo(20)'],
    bossid: 'wa_wabbit',
    dungeonLevel: 60
  },
  // Kanniball Dungeon
  { dungeonID: 'kanniball_dungeon',
    dungeonname: {
      de: 'Kanniball Dungeon',
      en: 'Kanniball Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['zombie', 'first', 'duo(20)'],
    bossid: 'kanniball_',
    dungeonLevel: 60
  },
  // Blop Dungeon
  { dungeonID: 'blop_dungeon',
    dungeonname: {
      de: 'Blob Dungeon',
      en: 'Blop Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['duel', 'fainthearted', 'duo(20)'],
    bossid: ['royal_morello_cherry_blop', 'royal_pippin_blop', 'royal_coco_blop', 'royal_indigo_blop'],
    dungeonLevel: 60
  },
  // The Jellith Dimension
  { dungeonID: 'jellith_dimension',
    dungeonname: {
      de: 'Gelee-Dungeon',
      en: 'The Jellith Dimension',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['duel', 'tight', 'duo(20)'],
    bossid: ['royal_blue_jelly', 'royal_mint_jelly', 'royal_lemon_jelly', 'royal_strawberry_jelly'],
    dungeonLevel: 60
  },
  // Brumen Tinctoria's LaboRATory
  { dungeonID: 'brumen_tinctorias_laboratory',
    dungeonname: {
      de: 'Brumen Tinctorias Laboratorium',
      en: 'Brumen Tinctoria\'s LaboRATory',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['last', 'hermit', 'duo(20)'],
    bossid: 'nelween',
    dungeonLevel: 60
  },
  // Hold of Otomai's Ark
  { dungeonID: 'otomais_ark',
    dungeonname: {
      de: 'Bilge von Otomaïs Arche',
      en: 'Hold of Otomai\'s Ark',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['first', 'scanty', 'duo(20)'],
    bossid: 'gourlo_the_terrible',
    dungeonLevel: 70
  },
  // Crackler Dungeon
  { dungeonID: 'crackler_dungeon',
    dungeonname: {
      de: 'Krachler Dungeon',
      en: 'Crackler Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['fainthearted', 'first', 'duo(20)'],
    bossid: 'legendary_crackler',
    dungeonLevel: 70
  },
  // Wa Wabbit's Warren
  { dungeonID: 'wa_wabbits_warren',
    dungeonname: {
      de: 'Wa Wabbit Bau',
      en: 'Wa Wabbit\'s Warren',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['clean hands', 'blitzkrieg', 'duo(20)'],
    bossid: 'wa_wobot',
    dungeonLevel: 80
  },
  // Treechnid Dungeon
  { dungeonID: 'treechnid_dungeon',
    dungeonname: {
      de: 'Astaknyden Dungeon',
      en: 'Treechnid Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['nomad', 'first', 'Duo(20)'],
    bossid: 'ancestral_treechnid',
    dungeonLevel: 90
  },
  // Hard-Head Dam
  { dungeonID: 'hard_head_dam',
    dungeonname: {
      de: 'Dickschädel-Staudamm',
      en: 'Hard-Head Dam',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['versatile', 'clean hands', 'duo(20)'],
    bossid: 'selim_quartz',
    dungeonLevel: 90
  },
  // Dragon Pig's Den
  { dungeonID: 'dragonpigs_den',
    dungeonname: {
      de: 'Unterschlupf des Schweinedrachens',
      en: 'Dragon Pig\'s Den',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['impertinence', 'versatile', 'duo(20)'],
    bossid: 'dragonpig',
    dungeonLevel: 100
  },
  // Koolich Cavern
  { dungeonID: 'koolich_cavern',
    dungeonname: {
      de: 'Höhle des Kuhlosses',
      en: 'Koolich Cavern',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['zombie', 'clean_hands', 'duo(20)'],
    bossid: 'koolich',
    dungeonLevel: 100
  },
  // Moon Dungeon
  { dungeonID: 'moon_dungeon',
    dungeonname: {
      de: 'Dungeon von Moon',
      en: 'Moon Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['versatile', 'statue', 'duo(20)'],
    bossid: 'moon',
    dungeonLevel: 100
  },
  // Canidae Dungeon
  { dungeonID: 'canidae_dungeon',
    dungeonname: {
      de: 'Canidae Dungeon',
      en: 'Canidae Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['first', 'impertinence', 'duo(20)'],
    bossid: 'moowolf',
    dungeonLevel: 100
  },
  // Stufe 101 - 150
  // Bherb's Gully
  { dungeonID: 'bherbs_gully',
    dungeonname: {
      de: 'Shilf-Engpass',
      en: 'Bherb\'s Gully',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['first', 'time_flies', 'duo(20)'],
    bossid: 'silf',
    dungeonLevel: 110
  },
  // Lord Crow's Library
  { dungeonID: 'lord_crows_library',
    dungeonname: {
      de: 'Meister Rabs Bibliothek',
      en: 'Lord Crow\'s Library',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['tight', 'first', 'duo(20)'],
    bossid: 'lord_crow',
    dungeonLevel: 110
  },
  // Bonta Rat Dungeon
  { dungeonID: 'bonta_rat_dungeon',
    dungeonname: {
      de: 'Rattendungeon von Bonta',
      en: 'Bonta Rat Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['first', 'impertinence', 'duo(20)'],
    bossid: 'white_rat',
    dungeonLevel: 110
  },
  // Brakmar Rat Dungeon
  { dungeonID: 'brakmar_rat_dungeon',
    dungeonname: {
      de: 'Rattendungeon von Brakmar',
      en: 'Brakmar Rat Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['impertinence', 'blitzkrieg', 'Duo(20)'],
    bossid: 'black_rat',
    dungeonLevel: 110
  },

  { dungeonID: 'rainbow_blop_lair',
    dungeonname: {
      de: 'Unterschlupf des königlichen Multiblobs',
      en: 'Rainbow Blop Lair',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['impertinence', 'duel', 'duo(20)'],
    bossid: 'royal_rainbow_blop',
    dungeonLevel: 120
  },
  // Inner Labyrinth of the Minotoror
  { dungeonID: 'labyrinth_minotoror',
    dungeonname: {
      de: 'Herz des Labyrinths des Minotorors',
      en: 'Inner Labyrinth of the Minotoror',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['hermit', 'clean_hands', 'duo(20)'],
    bossid: 'minotoror',
    dungeonLevel: 120
  },
  // Royal Mastogob's Greenhouse
  { dungeonID: 'royal_mastogobs_greenhouse',
    dungeonname: {
      de: 'Gewächshaus des Königlichen Fressmuts',
      en: 'Royal Mastogob\'s Greenhouse',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['clean_hands', 'first', 'duo(20)'],
    bossid: 'royal_mastogob',
    dungeonLevel: 120
  },
  // Royal Tofu House
  { dungeonID: 'royal_tofu_house',
    dungeonname: {
      de: 'Königlicher Tofustall',
      en: 'Royal Tofu House',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['last', 'statue', 'duo(20)'],
    bossid: 'royal_tofu',
    dungeonLevel: 120
  },
  // Dreggon Dungeon
  { dungeonID: 'dreggon_dungeon',
    dungeonname: {
      de: 'Drachei-Dungeon',
      en: 'Dreggon Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['tight', 'blitzkrieg', 'duo(20)'],
    bossid: 'crocabulia',
    dungeonLevel: 120
  },
  // Skeunk's Hideout
  { dungeonID: 'skeunks_hideout',
    dungeonname: {
      de: 'Unterschlupf des Skeunks',
      en: 'Skeunk\'s Hideout',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['statue', 'blitzkrieg', 'duo(26)'],
    bossid: 'skeunk',
    dungeonLevel: 120
  },
  // Minerock Sanctuary
  { dungeonID: 'minerock_sanctuary',
    dungeonname: {
      de: 'Erzfelser Heiligtum',
      en: 'Minerock Sanctuary',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['last', 'zombie', 'duo(20)'],
    bossid: 'crakillian_guardian',
    dungeonLevel: 130
  },
  // Kanigrula's Hideout
  { dungeonID: 'kanigrulas_hideout',
    dungeonname: {
      de: 'Kanigroulas Unterschlupf',
      en: 'Kanigrula\'s Hideout',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['first', 'clean_hands', 'duo(20)'],
    bossid: 'kanigrula',
    dungeonLevel: 140
  },
  // Soft Oak Dungeon
  { dungeonID: 'soft_oak_dungeon',
    dungeonname: {
      de: 'Weich Eich Dungeon',
      en: 'Soft Oak Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['freedom', 'first', 'duo(20)'],
    bossid: '',
    dungeonLevel: 140
  },
  // The Tynril Lab
  { dungeonID: 'the_tynril_lab',
    dungeonname: {
      de: 'Tynrils Laboratorium',
      en: 'The Tynril Lab',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
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
  { dungeonID: 'royal_pingwins_excavation',
    dungeonname: {
      de: 'King Ping Grotte',
      en: 'Royal Pingwin\'s Excavation',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['last', 'tight', 'duo(20)'],
    bossid: 'royal_pingwin',
    dungeonLevel: 140
  },
  // Long Slumber's Barrow
  { dungeonID: 'long_slumbers_barrow',
    dungeonname: {
      de: 'Grabhügel des langen Schlafs',
      en: 'Long Slumber\'s Barrow',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['first', 'survivor', 'duo(20)'],
    bossid: 'hell_mina',
    dungeonLevel: 140
  },
  // The Wreck of the Hesperus
  { dungeonID: 'the_wreck_of_the_hesperus',
    dungeonname: {
      de: 'Wrack der Black Rogg',
      en: 'The Wreck of the Hesperus',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['keep_moving', 'statue', 'duo(20)'],
    bossid: 'buck_anear',
    dungeonLevel: 150
  },
  // Amakna Castle Rat Dungeon
  { dungeonID: 'amakna_castle_rat_dungeon',
    dungeonname: {
      de: 'Rattendungeon des Schlosses von Amakna',
      en: 'Amakna Castle Rat Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
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
  { dungeonID: 'kimbos_canopy',
    dungeonname: {
      de: 'Kimbo Blätterdach',
      en: 'Kimbo\'s Canopy',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['statue', 'first', 'duo(20)'],
    bossid: 'kimbo',
    dungeonLevel: 160
  },
  // Minotot Room
  { dungeonID: 'minotot_room',
    dungeonname: {
      de: 'Minotot Raum',
      en: 'Minotot Room',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['keep_moving', 'first', 'duo(20)'],
    bossid: 'minotot',
    dungeonLevel: 160
  },
  // The Obsidemon's Hypogeum
  { dungeonID: 'the_obsidemons_hypogeum',
    dungeonname: {
      de: 'Grabgewölbe der Obsidianter',
      en: 'The Obsidemon\'s Hypogeum',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['first', 'statue', 'duo(20)'],
    bossid: 'obsidemon',
    dungeonLevel: 160
  },
  // The Flooded Chapel
  { dungeonID: 'the_flooded_chapel',
    dungeonname: {
      de: 'Die überflutete Kapelle',
      en: 'The Flooded Chapel',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['fainthearted', 'versatile', 'duo(20)'],
    bossid: 'zombrute',
    dungeonLevel: 160
  },
  // Snowfoux Caverns
  { dungeonID: 'snowfoux_caverns',
    dungeonname: {
      de: 'Eisfux Höhlen',
      en: 'Snowfoux Caverns',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['first', 'statue', 'duo(15)'],
    bossid: 'tengu_snowfoux',
    dungeonLevel: 170
  },
  // Valley of the Lady of the Water
  { dungeonID: 'valley_of_the_lady_of_the_water',
    dungeonname: {
      de: 'Tal der Herrin über die Gewässer',
      en: 'Valley of the Lady of the water',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['last', 'impertinence', 'duo(20)'],
    bossid: 'nagate',
    dungeonLevel: 170
  },
  // Scale King's Pyramid
  { dungeonID: 'scale_kings_pyramid',
    dungeonname: {
      de: 'Pyramide von König Skai',
      en: 'Scale King\'s Pyramid',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['last', 'statue', 'duo(20)'],
    bossid: 'scale_king',
    dungeonLevel: 170
  },
  // Korriander's Lair
  { dungeonID: 'korrianders_lair',
    dungeonname: {
      de: 'Unterschlupf des Korrianders',
      en: 'Korriander\'s Lair',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['mystique', 'zombie', 'duo(20)'],
    bossid: 'Korriander',
    dungeonLevel: 180
  },
  // Lair of the Giant Kralove
  { dungeonID: 'lair_of_the_giant_kralove',
    dungeonname: {
      de: 'Höhle des Riesenkrakamors',
      en: 'Lair of the Giant Kralove',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['nomad', 'blitzkrieg', 'Duo(20)'],
    bossid: 'giant_kralove',
    dungeonLevel: 180
  },
  // Bworker Dungeon
  { dungeonID: 'bworker_dungeon',
    dungeonname: {
      de: 'Bworker Dungeon',
      en: 'Bworker Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['impertinence', 'quick_and_furious', 'duo(20)'],
    bossid: 'bworker',
    dungeonLevel: 180
  },
  // Fungus Dungeon
  { dungeonID: 'fungus_dungeon',
    dungeonname: {
      de: 'Pilz-Dungeon',
      en: 'Fungus Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['tight', 'last', 'Duo(15)'],
    bossid: 'ougaa',
    dungeonLevel: 180
  },
  // Tanukoui San's Workshop
  { dungeonID: 'tanukoui_sans_workshop',
    dungeonname: {
      de: 'Tanukouï Sans Werkstatt',
      en: 'Tanukoui San\'s Workshop',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['nomad', 'blitzkrieg', 'duo(20)'],
    bossid: 'tanukoui_san',
    dungeonLevel: 180
  },
  // Kolosso's Cavern
  { dungeonID: 'kolossos_cavern',
    dungeonname: {
      de: 'Höhlen des Daxolossus',
      en: 'Kolosso\'s Cavern',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['last', 'first', 'duo(19)'],
    bossid: {
      kolosso: 'kolosso',
      professorXa: 'professor_xa'
    },
    dungeonLevel: 190
  },
  // Fouxwork Factory
  { dungeonID: 'fouxwork_factory',
    dungeonname: {
      de: 'Feuerwirrk-Fabrik',
      en: 'Fouxwork Factory',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['last', 'hermit', 'duo(20)'],
    bossid: 'founoroshi',
    dungeonLevel: 190
  },
  // Foster Caverns
  { dungeonID: 'foster_caverns',
    dungeonname: {
      de: 'Fujis Höhle',
      en: 'Foster Caverns',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['last', 'statue', 'duo(21)'],
    bossid: 'fuji_snowfoux',
    dungeonLevel: 190
  },
  // Sakai Mine
  { dungeonID: 'sakai_mine',
    dungeonname: {
      de: 'Mine von Arkal',
      en: 'Sakai Mine',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['versatile', 'blitzkrieg', 'duo(28)'],
    bossid: 'grohlum',
    dungeonLevel: 190
  },
  // Bearbarian Antichamber
  { dungeonID: 'bearbarian_antichamber',
    dungeonname: {
      de: 'Vorraum des Barbärenstockes',
      en: 'Bearbarian Antichamber',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['first', 'tight', 'duo(17)'],
    bossid: 'celestial_bearbarian',
    dungeonLevel: 190
  },
  // Wind Dojo
  { dungeonID: 'wind_dojo',
    dungeonname: {
      de: 'Dojo des Windes',
      en: 'Wind Dojo',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['first', 'fainthearted', 'Duo(20)'],
    bossid: ['shihan', 'hanshi'],
    dungeonLevel: 190
  },
  // Stufe 191 - 200
  // Missiz Freezz's Frostforge
  { dungeonID: 'missiz_freezzs_frostforge',
    dungeonname: {
      de: 'Missiz Frizz Kaltschmiede',
      en: 'Missiz Frizz\'s Frostforge',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['nomad', 'tight', 'duo(40)'],
    bossid: 'missiz_freezz',
    dungeonLevel: 190
  },
  // Sylargh's Carrier
  { dungeonID: 'sylarghs_carrier',
    dungeonname: {
      de: 'Sylarghs Transport',
      en: 'Sylargh\'s Carrier',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['hermit', 'barbaric', 'duo(40)'],
    bossid: 'sylargh',
    dungeonLevel: 190
  },
  // Klime's Private Suite
  { dungeonID: 'klimes_private_suite',
    dungeonname: {
      de: 'Die privaten Gesellschaftszimmer R.Klimms',
      en: 'Klime\'s Private Suite',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['fainthearted', 'nomad', 'duo(40)'],
    bossid: 'klime',
    dungeonLevel: 190
  },
  // Nileza's Laboratory
  { dungeonID: 'nilezas_laboratory',
    dungeonname: {
      de: 'Nilezas Laboratorium',
      en: 'Nileza\'s Laboratory',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['fainthearted', 'last', 'duo(40)'],
    bossid: 'nileza',
    dungeonLevel: 190
  },
  // The Count's Dungeon
  { dungeonID: 'the_counts_dungeon',
    dungeonname: {
      de: 'Graf Primzahls Dungeon',
      en: 'The Count\'s Dungeon',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['versatile', 'statue', 'duo(40)'],
    bossid: 'count_harebourg',
    dungeonLevel: 190
  },
  // Damadrya's Bamboo Grove
  { dungeonID: 'damadryas_bamboo_grove',
    dungeonname: {
      de: 'Damadryas Bambushain',
      en: 'Damadrya\'s Bamboo Grove',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['hermit', 'first', 'duo(20)'],
    bossid: 'damadrya',
    dungeonLevel: 190
  },
  // Lost Soul's Sanctuary
  { dungeonID: 'lost_souls_sanctuary',
    dungeonname: {
      de: 'Heiligtum der verirrten Seelen',
      en: 'Lost Soul\'s Sanctuary',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['clean_hands', 'impertinence', 'duo(20)'],
    bossid: 'katamashii',
    dungeonLevel: 190
  },
  // === Saisonale Dungeons
  // -- Ascension --
  { dungeonID: 'ascension_25',
    dungeonname: {
      de: 'Insel der Ersteigung(25)',
      en: 'Ascension Island (25)',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: [''],
    bossid: 'mucane',
    dungeonLevel: 0
  },
  { dungeonID: 'ascension_50',
    dungeonname: {
      de: 'Insel der Ersteigung(50)',
      en: 'Ascension Island (50)',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: [''],
    bossid: 'ul_khan',
    dungeonLevel: 0
  },
  { dungeonID: 'ascension_75',
    dungeonname: {
      de: 'Insel der Ersteigung(75)',
      en: 'Ascension Island (75)',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: [''],
    bossid: 'mucane',
    dungeonLevel: 0
  },
  { dungeonID: 'ascension_100',
    dungeonname: {
      de: 'Insel der Ersteigung(100)',
      en: 'Ascension Island (100)',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: [''],
    bossid: 'ul_khan',
    dungeonLevel: 0
  },
  // -- Vulkania --
  // Sleepwalking
  { dungeonID: 'sleepwalking_pinki_crater',
    dungeonname: {
      de: 'Schlafwandeln im Krater Minus',
      en: 'Sleepwalking Pinki Crater',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['chrono(9)', 'statue', 'clean_hands', 'duo(20)'],
    bossid: ['sleepwalking_grozilla', 'sleepwalking_grasmera'],
    dungeonLevel: 40
  },
  // Exhausted
  { dungeonID: 'exhausted_pinki_crater',
    dungeonname: {
      de: 'Erschöpft im Krater Minus',
      en: 'Exhausted Pinki Crater',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['chrono(9)', 'first', 'tight', 'duo(20)'],
    bossid: ['exhausted_grozilla', 'exhausted_grasmera'],
    dungeonLevel: 90
  },
  // Tired
  { dungeonID: 'tired_pinki_crater',
    dungeonname: {
      de: 'Müde im Krater Minus',
      en: 'Tired Pinki Crater',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['chrono(9)', 'nomad', 'blitzkrieg', 'duo(20)'],
    bossid: ['tired_grozilla', 'tired_grasmera'],
    dungeonLevel: 140
  },
  { dungeonID: 'pinki_crater',
    dungeonname: {
      de: 'Krater Minus',
      en: 'Pinki Crater',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['chrono(9)', 'zombie', 'impertinence', 'duo(20)'],
    bossid: ['grozilla', 'grasmera'],
    dungeonLevel: 190
  },
  // -- Horrob Isle --
  { dungeonID: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['', '', 'duo()'],
    bossid: 'bone_shot',
    dungeonLevel: 0
  },
  { dungeonID: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['', '', 'duo()'],
    bossid: 'al_howing',
    dungeonLevel: 0
  },
  { dungeonID: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['', '', 'duo()'],
    bossid: 'staff_deleghoul',
    dungeonLevel: 0
  },
  // -- Kwismas --
  { dungeonID: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['', '', 'duo()'],
    bossid: 'itzing',
    dungeonLevel: 0
  },
  { dungeonID: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['', '', 'duo()'],
    bossid: 'father_kwismas',
    dungeonLevel: 0
  },
  { dungeonID: '',
    dungeonname: {
      de: '',
      en: '',
      es: '',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    challenges: ['', '', 'duo()'],
    bossid: 'father_whupper',
    dungeonLevel: 0
  },
];

function flattenBossIdentifier(value) {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    return value
      .map((item) => flattenBossIdentifier(item))
      .filter(Boolean)
      .join(', ');
  }
  if (typeof value === 'object') {
    if (value.id) return flattenBossIdentifier(value.id);
    return Object.values(value)
      .map((item) => flattenBossIdentifier(item))
      .filter(Boolean)
      .join(', ');
  }
  return String(value);
}

function resolveDungeonLabels(dungeonname) {
  if (!dungeonname || typeof dungeonname !== 'object') return undefined;
  const labels = {};
  for (const locale of SUPPORTED_LOCALES) {
    if (dungeonname[locale]) labels[locale] = dungeonname[locale];
  }
  return Object.keys(labels).length ? labels : undefined;
}

function resolveBossLabels(bossid) {
  if (!bossid) return undefined;
  const labels = {};
  for (const locale of SUPPORTED_LOCALES) {
    const label = flattenBossLabelForLocale(bossid, locale);
    if (label) labels[locale] = label;
  }
  return Object.keys(labels).length ? labels : undefined;
}

function flattenBossLabelForLocale(ref, locale) {
  if (!ref) return '';
  if (Array.isArray(ref)) {
    return ref
      .map((item) => flattenBossLabelForLocale(item, locale))
      .filter(Boolean)
      .join(', ');
  }
  if (typeof ref === 'object') {
    if (ref.name && ref.name[locale]) return ref.name[locale];
    if (ref.id) return flattenBossLabelForLocale(ref.id, locale);
    const parts = Object.values(ref)
      .map((item) => flattenBossLabelForLocale(item, locale))
      .filter(Boolean);
    return parts.join(', ');
  }
  const names = BOSS_NAME_BY_ID.get(ref);
  if (names) return names[locale] || names.de || Object.values(names).find(Boolean) || String(ref);
  return String(ref);
}

const normalizeChallengeId = challengeDefinitions.normalizeId
  || challengeDefinitions.normalizeChallengeId
  || ((id) => String(id || '').trim().toLowerCase().replace(/\s+/g, '_'));

const getChallengeDefinition = challengeDefinitions.get
  || challengeDefinitions.getChallengeDefinition
  || (() => undefined);

const createChallengeInstance = challengeDefinitions.create
  || challengeDefinitions.createChallenge
  || challengeDefinitions.challenge
  || ((id, overrides) => ({ id, params: overrides }));

function instantiateDungeonChallenge(spec, dungeon) {
  if (!spec || typeof spec !== 'string') return null;
  const raw = spec.trim();
  if (!raw) return null;

  const match = raw.match(/^([a-zA-Z_\s]+?)(?:\(([^)]*)\))?$/);
  const idPart = match ? match[1] : raw;
  const argPart = match ? (match[2] || '').trim() : '';

  const id = normalizeChallengeId(idPart);
  const overrides = {};

  if (argPart) {
    const numericArg = Number(argPart);
    if (!Number.isNaN(numericArg) && (id === 'duo' || id === 'chrono')) {
      overrides.turns = numericArg;
    }
  }

  if (id === 'duo') {
    overrides.bossID = dungeon.bossid;
    const bossLabels = resolveBossLabels(dungeon.bossid);
    if (bossLabels) overrides.bossName = { name: bossLabels };
    else {
      const fallback = flattenBossIdentifier(dungeon.bossid);
      if (fallback) overrides.bossName = fallback;
    }
    overrides.dungeonID = dungeon.dungeonID;
    const dungeonLabels = resolveDungeonLabels(dungeon.dungeonname);
    if (dungeonLabels) overrides.dungeonName = { name: dungeonLabels };
    else overrides.dungeonName = dungeon.dungeonID;
  }

  if (id === 'first' || id === 'last') {
    overrides.target = dungeon.bossid;
    const targetLabels = resolveBossLabels(dungeon.bossid);
    if (targetLabels) overrides.targetName = { name: targetLabels };
    else {
      const fallback = flattenBossIdentifier(dungeon.bossid);
      if (fallback) overrides.targetName = fallback;
    }
  }

  const baseDefinition = getChallengeDefinition(id);
  const challenge = createChallengeInstance(id, overrides, {
    dungeonID: dungeon.dungeonID,
    dungeonLevel: dungeon.dungeonLevel,
  });

  if (!challenge) return null;

  if (!challenge.params && baseDefinition) {
    challenge.params = { ...(baseDefinition.defaults || {}), ...overrides };
  } else if (challenge.params) {
    challenge.params = { ...(baseDefinition?.defaults || {}), ...(challenge.params || {}), ...overrides };
  }
  const achievementDefinition =
    (typeof achievements?.get === 'function' && achievements.get(id)) ||
    (typeof achievements?.getAchievementDefinition === 'function'
      ? achievements.getAchievementDefinition(id)
      : undefined);

  if (achievementDefinition) {
    if (!challenge.name && achievementDefinition.name) {
      challenge.name = achievementDefinition.name;
    }
    if (!challenge.description && achievementDefinition.description) {
      challenge.description = achievementDefinition.description;
    }
    if (!challenge.defaults && achievementDefinition.defaults) {
      challenge.defaults = { ...achievementDefinition.defaults };
    }
    if (!challenge.icon && achievementDefinition.icon) {
      challenge.icon = achievementDefinition.icon;
    }
    if (!challenge.assetPath && achievementDefinition.assetPath) {
      challenge.assetPath = achievementDefinition.assetPath;
    }
    if (!challenge.emojiName && achievementDefinition.emojiName) {
      challenge.emojiName = achievementDefinition.emojiName;
    }
  }

  if (!challenge.icon && typeof achievements?.getAchievementIconUrl === 'function') {
    const icon = achievements.getAchievementIconUrl(id);
    if (icon) challenge.icon = icon;
  }

  if (!challenge.assetPath && typeof achievements?.getAchievementAssetPath === 'function') {
    const assetPath = achievements.getAchievementAssetPath(id);
    if (assetPath) challenge.assetPath = assetPath;
  }

  if (!challenge.emojiName && typeof achievements?.getAchievementEmojiName === 'function') {
    const emojiName = achievements.getAchievementEmojiName(id);
    if (emojiName) challenge.emojiName = emojiName;
  }

  if (!challenge.emoji && challenge.emojiName) {
    const resolved = resolveDiscordEmoji(challenge.emojiName);
    if (resolved) challenge.emoji = resolved;
  }

  challenge.raw = raw;
  return challenge;
}

const DUNGEON_LISTE = DUNGEON_ROHDATEN.map((dungeon) => {
  const parsedChallenges = Array.isArray(dungeon.challenges)
    ? dungeon.challenges
        .map((entry) => instantiateDungeonChallenge(entry, dungeon))
        .filter(Boolean)
    : [];

  return {
    ...dungeon,
    challenges: parsedChallenges,
    achievements: parsedChallenges,
  };
});

const DUNGEON_KATEGORIEN = {
  'Level 1-50'    : d => d.level >= 1   && d.level <= 50,
  'Level 51-100'  : d => d.level >= 51  && d.level <= 100,
  'Level 101-150' : d => d.level >= 101 && d.level <= 150,
  'Level 151-190' : d => d.level >= 151 && d.level <= 190,
  'Level 191-200' : d => d.level >= 191 && d.level <= 200,
};

module.exports = { DUNGEON_LISTE, DUNGEON_KATEGORIEN };