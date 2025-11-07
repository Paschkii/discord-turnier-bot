// === Imports ===
const {
  buildLocalizedLabel,
  getAchievementEmoji,
  getAchievementEmojiName,
  normalizeAchievementKey,
} = require('./achievementUtils');
const { BOSSE_LISTE } = require('./bosses');
const { MONSTER_LISTE } = require('./monsters');

const SUPPORTED_LOCALES = ['de', 'en', 'es', 'fr', 'pt'];
const BOSS_NAME_BY_ID = new Map(
  BOSSE_LISTE.map((boss) => [boss.bossID || boss.id, boss.name]).filter(([id]) => id),
);
const MONSTER_NAME_BY_ID = new Map(MONSTER_LISTE.map((monster) => [monster.id, monster.name]));

const DUNGEON_ROHDATEN = [
  // === Stufe 1 - 50 ===
  // Belladonna's Castle
  { dungeonID: 'belladonna_castle',
    dungeonname: {
      de: 'Belladonnas Schloss',
      en: 'Belladonna\'s Castle',
      es: 'Castillo de Belladona',
      fr: 'Chateau de Belladone',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['ragnarock', 'dolomanus', 'clobberstone']},
      { id: 'room2', monsterID: ['marbmour', 'dolomanus', 'clobberstone']},
      { id: 'room3', monsterID: ['belladonna', 'dolomanus', 'marbmour']},
    ],
    achievements: ['no_rush', 'last', 'duo(20)'],
    bossID: 'belladonna',
    dungeonLevel: 12
  },
  // Field Dungeon
  { dungeonID: 'field_dungeon',
    dungeonname: {
      de: 'Felder Dungeon',
      en: 'Field Dungeon',
      es: 'Mazmorra de los Campos',
      fr: 'Donjon des Champs',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['demonic_rose(2)', 'mush_mush(2)']},
      { id: 'room2', monsterID: ['demonic_rose(2)', 'evil_dandelion', 'wild_sunflower']},
      { id: 'room3', monsterID: ['famished_sunflower', 'demonic_rose', 'evil_dandelion', 'wild_sunflower']},
    ],
    achievements: ['tight', 'first', 'duo(20)'],
    bossID: 'famished_sunflower',
    dungeonLevel: 30
  },
  // Sand Dungeon
  { dungeonID: 'sand_dungeon',
    dungeonname: {
      de: 'Versandeter Dungeon',
      en: 'Sand Dungeon',
      es: 'Mazmorra Enarenada',
      fr: 'Donjon Ensablé',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['white_snapper(2)', 'blue_snapper', 'green_snapper']},
      { id: 'room2', monsterID: ['red_snapper(2)', 'green_snapper(2)']},
      { id: 'room3', monsterID: ['spongemob', 'white_snapper', 'red_snapper', 'green_snapper']},
    ],
    achievements: ['hermit', 'versatile', 'duo(20)'],
    bossID: 'spongemob',
    dungeonLevel: 40
  },
  // Scaraleaf Dungeon
  { dungeonID: 'scaraleaf_dungeon',
    dungeonname: {
      de: 'Scarablatt Dungeon',
      en: 'Scaraleaf Dungeon',
      es: 'Mazmorra de los Escarahojas',
      fr: 'Donjon des Scarafeuilles',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['immature_scaraleaf', 'black_scaraleaf', 'green_scaraleaf', 'blue_scaraleaf']},
      { id: 'room2', monsterID: ['immature_scaraleaf', 'black_scaraleaf', 'red_scaraleaf']},
      { id: 'room3', monsterID: ['golden_scarabugly', 'black_scaraleaf', 'white_scaraleaf', 'blue_scaraleaf']},
    ],
    achievements: ['zombie', 'clean_hands', 'duo(20)'],
    bossID: 'scarabugly',
    dungeonLevel: 40
  },
  // Tofu House
  { dungeonID: 'tofu_house',
    dungeonname: {
      de: 'Tofu Dungeon',
      en: 'Tofu House',
      es: 'Mazmorra de los Tofus',
      fr: 'Donjon des Tofus',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['tofu', 'black_tofu', 'tofurby', 'tofukaz']},
      { id: 'room2', monsterID: ['tofukaz', 'tofoone', 'tofurby', 'black_tofu']},
      { id: 'room3', monsterID: ['batofu', 'tofoone', 'tofurby', 'tofukaz']},
    ],
    achievements: ['no_rush', 'versatile', 'duo(20)'],
    bossID: 'batofu',
    dungeonLevel: 40
  },
  // Haunted House
  { dungeonID: 'haunted_house',
    dungeonname: {
      de: 'Geisterhaus',
      en: 'Haunted House',
      es: 'Mansión Encantada',
      fr: 'Maison Fantôme',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['garglyph', 'gargoyle', 'kwoan', 'prepubescent_boostache']},
      { id: 'room2', monsterID: ['vampire_master', 'elite_chafer', 'prepubescent_boostache', 'kwoan']},
      { id: 'room3', monsterID: ['boostache', 'vampire_master', 'elite_chafer', 'kwoan']},
    ],
    achievements: ['hermit', 'last', 'duo(20)'],
    bossID: 'boostache',
    dungeonLevel: 40
  },
  // Skeleton Dungeon
  { dungeonID: 'skeleton_dungeon',
    dungeonname: {
      de: 'Dungeon der Skelette',
      en: 'Skeleton Dungeon',
      es: 'Mazmorra de los Esqueletos',
      fr: 'Donjon des Squelettes',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['primitive_chafer', 'rib(3)']},
      { id: 'room2', monsterID: ['draugur_chafer', 'primitive_chafer', 'chafer_foot_soldier', 'chafer']},
      { id: 'room3', monsterID: ['ronin_chafer', 'draugur_chafer(2)', 'primitive_chafer']},
    ],
    achievements: ['nomad', 'first', 'duo(20)'],
    bossID: 'ronin_chafer',
    dungeonLevel: 40
  },
  // Gobball Dungeon
  { dungeonID: 'gobball_dungeon',
    dungeonname: {
      de: 'Fresssack Dungeon',
      en: 'Gobball Dungeon',
      es: 'Mazmorra de los Jalatós',
      fr: 'Donjon des Bouftous',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['black_gobbly', 'white_gobbly(2)', 'gobball']},
      { id: 'room2', monsterID: ['gobball_war_chief', 'gobball(3)']},
      { id: 'room3', monsterID: ['royal_gobball', 'gobball_war_chief', 'gobball(2)']},
    ],
    achievements: ['fainthearted', 'blitzkrieg', 'duo(20)'],
    bossID: 'royal_gobball',
    dungeonLevel: 50
  },
  // Bwork Dungeon
  { dungeonID: 'bwork_dungeon',
    dungeonname: {
      de: 'Bwork Dungeon',
      en: 'Bwork Dungeon',
      es: 'Mazmorra de los Bworks',
      fr: 'Donjon des Bworks',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['bwork_magus', 'bwork_archer(3)']},
      { id: 'room2', monsterID: ['bwork_magus', 'bwork(3)']},
      { id: 'room3', monsterID: ['bworkette', 'bwork_magus', 'bwork_archer', 'bwork']},
    ],
    achievements: ['hermit', 'first', 'duo(20)'],
    bossID: 'bworkette',
    dungeonLevel: 50
  },
  // Blacksmith Dungeon
  { dungeonID: 'blacksmith_dungeon',
    dungeonname: {
      de: 'Dungeon der Schattenschmiede',
      en: 'Blacksmith Dungeon',
      es: 'Mazmorra de los Herreros',
      fr: 'Donjon des Forgerons',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['dark_baker(2)', 'rogue_clan_bandit(2)']},
      { id: 'room2', monsterID: ['dark_smith', 'dark_miner', 'rogue_clan_bandit', 'dark_baker']},
      { id: 'room3', monsterID: ['smiths_chest', 'dark_smith', 'dark_miner', 'dark_baker']},
    ],
    achievements: ['nomad', 'first', 'duo(20)'],
    bossID: 'smiths_chest',
    dungeonLevel: 50
  },
  // Larva Dungeon
  { dungeonID: 'larva_dungeon',
    dungeonname: {
      de: 'Larven Dungeon',
      en: 'Larva Dungeon',
      es: 'Mazmorra de las Larvas',
      fr: 'Donjon des Larves',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['golden_larva', 'green_larva', 'blue_larva(2)']},
      { id: 'room2', monsterID: ['golden_larva', 'orange_larva(2)', 'green_larva']},
      { id: 'room3', monsterID: ['shin_larva', 'golden_larva', 'orange_larva', 'green_larva']},
    ],
    achievements: ['fainthearted', 'versatile', 'duo(20)'],
    bossID: 'shin_larva',
    dungeonLevel: 50
  },
  // Grotto Hesque
  { dungeonID: 'grotto_hesque',
    dungeonname: {
      de: 'Aggrotte',
      en: 'Grotto Hesque',
      es: 'Gruta Grut\'Hesqua',
      fr: 'La Grotte Hesque',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['mahlibuh_palmflower', 'mojeeto_palmflower', 'passaoh_palmflower', 'kurasso_palmflower']},
      { id: 'room2', monsterID: ['coralator(2)', 'kurasso_palmflower', 'kurasso_craberal']},
      { id: 'room3', monsterID: ['great_coralator', 'coralator', 'mojeeto_palmflower', 'mahlibuh_palmflower']},
    ],
    achievements: ['impertinence', 'blitzkrieg', 'duo(20)'],
    bossID: 'great_coralator',
    dungeonLevel: 50
  },
  // Kwakwa's Nest
  { dungeonID: 'kwakwas_nest',
    dungeonname: {
      de: 'Nest des Kwackataus',
      en: 'Kwakwa\'s Nest',
      es: 'Nido de Kwoknan',
      fr: 'Nid du Kwakwa',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['earth_kwakere', 'ice_kwakere', 'earth_bwak', 'ice_bwak']},
      { id: 'room2', monsterID: ['fire_kwakere', 'wind_kwakere', 'fire_bwak', 'wind_bwak']},
      { id: 'room3', monsterID: ['kwakwa', 'earth_kwak', 'ice_kwak', 'wind_kwak']},
    ],
    achievements: ['zombie', 'clean hands', 'duo(20)'],
    bossID: 'kwakwa',
    dungeonLevel: 50
  },
  // Stufe 51 - 100
  // Wa Wabbit's Castle
  { dungeonID: 'wa_wabbits_castle',
    dungeonname: {
      de: 'Schloss des Wa Wabbits',
      en: 'Wa Wabbit\'s Castle',
      es: 'Castillo del Wey Wabbit',
      fr: 'Chateau du Wa Wabbit',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['black_wabbit', 'wabbit', 'black_tiwabbit', 'tiwabbit']},
      { id: 'room2', monsterID: ['wo_wabbit', 'black_wabbit', 'wabbit', 'tiwabbit_wosungwee']},
      { id: 'room3', monsterID: ['wa_wabbit', 'wo_wabbit', 'grand_pa_wabbit(2)']},
    ],
    achievements: ['impertinence', 'blitzkrieg', 'duo(20)'],
    bossID: 'wa_wabbit',
    dungeonLevel: 60
  },
  // Kanniball Dungeon
  { dungeonID: 'kanniball_dungeon',
    dungeonname: {
      de: 'Kanniball Dungeon',
      en: 'Kanniball Dungeon',
      es: 'Mazmorra Kanibola',
      fr: 'Donjon Kanniboul',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['kanniball_archer(2)', 'kanniball_jav(2)']},
      { id: 'room2', monsterID: ['kanniball_sarbak(2)', 'kanniball_thiery', 'haloperi_doll']},
      { id: 'room3', monsterID: ['kanniball_andchain', 'haloperi_doll', 'kanniball_sarbak', 'kanniball_jav']},
    ],
    achievements: ['zombie', 'first', 'duo(20)'],
    bossID: 'kanniball_andchain',
    dungeonLevel: 60
  },
  // Blop Dungeon
  { dungeonID: 'blop_dungeon',
    dungeonname: {
      de: 'Blob Dungeon',
      en: 'Blop Dungeon',
      es: 'Mazmorra de los Blops',
      fr: 'Donjon des Blops',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['greedoblop', 'blopshroom', 'trunkiblop(2)']},
      { id: 'room2', monsterID: ['greedoblop(2)', 'blopshroom', 'trunkiblop']},
      { id: 'room3(coco)', monsterID: ['royal_coco_blop', 'blopshroom', 'trunkiblop', 'coco_blop']},
      { id: 'room3(indigo)', monsterID: ['royal_indigo_blop', 'blopshroom', 'trunkiblop', 'indigo_blop']},
      { id: 'room3(cherry)', monsterID: ['royal_morello_cherry_blop', 'blopshroom', 'trunkiblop', 'morello_cherry_blop']},
      { id: 'room3(pippin)', monsterID: ['royal_pippin_blop', 'blopshroom', 'trunkiblop', 'pippin_blop']},
    ],
    achievements: ['duel', 'fainthearted', 'duo(20)'],
    bossID: ['royal_coco_blop', 'royal_indigo_blop', 'royal_morello_cherry_blop', 'royal_pippin_blop'],
    dungeonLevel: 60
  },
  // The Jellith Dimension
  { dungeonID: 'jellith_dimension',
    dungeonname: {
      de: 'Gelee-Dungeon',
      en: 'The Jellith Dimension',
      es: 'Gelexta Dimensión',
      fr: 'Gelaxième Dimension',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['lemon_jelly', 'strawberry_jelly', 'blue_jelly', 'mint_jelly']},
      { id: 'room2', monsterID: ['lemon_jelly(2)', 'strawberry_jelly', 'mint_jelly']},
      { id: 'room3', monsterID: ['royal_blue_jelly', 'royal_mint_jelly', 'royal_lemon_jelly', 'royal_strawberry_jelly']},
    ],
    achievements: ['duel', 'tight', 'duo(20)'],
    bossID: ['royal_blue_jelly', 'royal_mint_jelly', 'royal_lemon_jelly', 'royal_strawberry_jelly'],
    dungeonLevel: 60
  },
  // Brumen Tinctoria's LaboRATory
  { dungeonID: 'brumen_tinctorias_laboratory',
    dungeonname: {
      de: 'Brumen Tinctorias Laboratorium',
      en: 'Brumen Tinctoria\'s LaboRATory',
      es: 'Laboratorio de Brumen Tinctorias',
      fr: 'Laboratoire de Brumen Tinctorias',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['reinforced_scurvion', 'rabid_ouginak', 'lab_kolerat', 'terrestrial_crobak']},
      { id: 'room2', monsterID: ['reinforced_scurvion', 'rabid_ouginak(2)', 'lab_kolerat']},
      { id: 'room3', monsterID: ['nelween', 'reinforced_scurvion', 'rabid_ouginak', 'lab_kolerat']},
    ],
    achievements: ['last', 'hermit', 'duo(20)'],
    bossID: 'nelween',
    dungeonLevel: 60
  },
  // Hold of Otomai's Ark
  { dungeonID: 'hold_of_otomais_ark',
    dungeonname: {
      de: 'Bilge von Otomaïs Arche',
      en: 'Hold of Otomai\'s Ark',
      es: 'Cala del Arca de Otomai',
      fr: 'Arche d\'Otomaï',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['ze_flib', 'canon_dorf', 'hazwonarm', 'boomba']},
      { id: 'room2', monsterID: ['ze_flib', 'barbrossa', 'sparo', 'hazwonarm']},
      { id: 'room3', monsterID: ['gourlo_the_terrible', 'sparo(2)', 'barbrossa']},
    ],
    achievements: ['first', 'scanty', 'duo(20)'],
    bossID: 'gourlo_the_terrible',
    dungeonLevel: 70
  },
  // Crackler Dungeon
  { dungeonID: 'crackler_dungeon',
    dungeonname: {
      de: 'Krachler Dungeon',
      en: 'Crackler Dungeon',
      es: 'Mazmorra de los Crujidores',
      fr: 'Donjon des Craqueleurs',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['crackler(2)', 'crackrock']},
      { id: 'room2', monsterID: ['plain_crackler(2)', 'crackler(2)']},
      { id: 'room3', monsterID: ['legendary_crackler', 'plain_crackler', 'crackler', 'crackrock']},
    ],
    achievements: ['fainthearted', 'first', 'duo(20)'],
    bossID: 'legendary_crackler',
    dungeonLevel: 70
  },
  // Wa Wabbit's Warren
  { dungeonID: 'wa_wabbits_warren',
    dungeonname: {
      de: 'Wa Wabbit Bau',
      en: 'Wa Wabbit\'s Warren',
      es: 'Madriguera del Wey Wabbit',
      fr: 'Terrier du Wa Wabbit',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['black_wo_wabbit', 'wobot(2)', 'tiwobot']},
      { id: 'room2', monsterID: ['whitepaw_wabbit(2)', 'wobot', 'black_wo_wabbit']},
      { id: 'room3', monsterID: ['wa_wobot', 'black_wo_wabbit', 'wobot_wosungwee', 'tiwobot']},
    ],
    achievements: ['clean hands', 'blitzkrieg', 'duo(20)'],
    bossID: 'wa_wobot',
    dungeonLevel: 80
  },
  // Treechnid Dungeon
  { dungeonID: 'treechnid_dungeon',
    dungeonname: {
      de: 'Astaknyden Dungeon',
      en: 'Treechnid Dungeon',
      es: 'Mazmorra de los Abráknidos',
      fr: 'Donjon des Abraknydes',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['dark_treechnid(2)', 'arachnotron', 'venerable_treechnid']},
      { id: 'room2', monsterID: ['dark_treechnee', 'arachnotron', 'venerable_treechnid(2)']},
      { id: 'room3', monsterID: ['ancestral_treechnid', 'dark_treechnee', 'dark_treechnid', 'arachnotron']},
    ],
    achievements: ['nomad', 'first', 'Duo(20)'],
    bossID: 'ancestral_treechnid',
    dungeonLevel: 90
  },
  // Hard-Head Dam
  { dungeonID: 'hard_head_dam',
    dungeonname: {
      de: 'Dickschädel-Staudamm',
      en: 'Hard-Head Dam',
      es: 'Presa Cabera Dura',
      fr: 'Barrage Dure-Tête',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['breakrock_knight', 'yobbomark_knight', 'knockarock', 'yobreaker']},
      { id: 'room2', monsterID: ['yobbomark_knight', 'yobreaker', 'knockarock', 'leatheraxer']},
      { id: 'room3', monsterID: ['selim_quartz', 'leatheraxer', 'yobreaker(2)']},
    ],
    achievements: ['versatile', 'clean hands', 'duo(20)'],
    bossID: 'selim_quartz',
    dungeonLevel: 90
  },
  // Dragon Pig's Den
  { dungeonID: 'dragonpigs_den',
    dungeonname: {
      de: 'Unterschlupf des Schweinedrachens',
      en: 'Dragon Pig\'s Den',
      es: 'Antro del Dragocerdo',
      fr: 'Antre du Dragon Cochon',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['dorgan_ation', 'blodz_uker', 'farles_pig', 'pignolia']},
      { id: 'room2', monsterID: ['blodz_uker', 'farles_pig', 'pignolia(2)']},
      { id: 'room3', monsterID: ['dragonpig', 'dorgan_ation', 'blodz_uker', 'farles_pig']},
    ],
    achievements: ['impertinence', 'versatile', 'duo(20)'],
    bossID: 'dragonpig',
    dungeonLevel: 100
  },
  // Koolich Cavern
  { dungeonID: 'koolich_cavern',
    dungeonname: {
      de: 'Höhle des Kuhlosses',
      en: 'Koolich Cavern',
      es: 'Cueva del Trankitronko',
      fr: 'Caverne du Koulosse',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['mama_koalak', 'drakoalak', 'brown_warko', 'dok_alako']},
      { id: 'room2', monsterID: ['cave_gobball(2)', 'gobkool(2)']},
      { id: 'room3', monsterID: ['koolich', 'cave_gobball(3)']},
    ],
    achievements: ['zombie', 'clean_hands', 'duo(20)'],
    bossID: 'koolich',
    dungeonLevel: 100
  },
  // Moon Dungeon
  { dungeonID: 'moon_dungeon',
    dungeonname: {
      de: 'Dungeon von Moon',
      en: 'Moon Dungeon',
      es: 'Mazmorra de Moon',
      fr: 'Donjon de Moon',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['moon']},
    ],
    achievements: ['versatile', 'statue', 'duo(20)'],
    bossID: 'moon',
    dungeonLevel: 100
  },
  // Canidae Dungeon
  { dungeonID: 'canidae_dungeon',
    dungeonname: {
      de: 'Canidae Dungeon',
      en: 'Canidae Dungeon',
      es: 'Mazmorra de los Cánidos',
      fr: 'Donjon des Canidés',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['mature_kaniger(2)', 'ouginak(2)']},
      { id: 'room2', monsterID: ['boowolf', 'miliboowolf', 'mature_kaniger', 'ouginak']},
      { id: 'room3', monsterID: ['moowolf', 'boowolf', 'miliboowolf', 'mature_kaniger']},
    ],
    achievements: ['first', 'impertinence', 'duo(20)'],
    bossID: 'moowolf',
    dungeonLevel: 100
  },
  // Stufe 101 - 150
  // Bherb's Gully
  { dungeonID: 'bherbs_gully',
    dungeonname: {
      de: 'Shilf-Engpass',
      en: 'Bherb\'s Gully',
      es: 'Boca del Rasgabola',
      fr: 'Goulet du Rasboul',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['kilibriss', 'polished_crackler(2)', 'polished_crackrock']},
      { id: 'room2', monsterID: ['kilibriss', 'kido', 'plain_pikoko', 'mufafah']},
      { id: 'room3', monsterID: ['silf', 'plain_pikoko', 'kilibriss', 'kido']},
    ],
    achievements: ['first', 'time_flies', 'duo(20)'],
    bossID: 'silf',
    dungeonLevel: 110
  },
  // Lord Crow's Library
  { dungeonID: 'lord_crows_library',
    dungeonname: {
      de: 'Meister Rabs Bibliothek',
      en: 'Lord Crow\'s Library',
      es: 'Biblioteca del Maestro Cuerbok',
      fr: 'Bibliothèque du Maître Corbac',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['horace_the_tamed_crobak', 'kapotie_the_drinker', 'tamed_crobak', 'drinker']},
      { id: 'room2', monsterID: ['foxo_the_crowfox', 'horace_the_tamed_crobak', 'crowfox', 'tamed_crobak']},
      { id: 'room3', monsterID: ['lord_crow', 'foxo_the_crowfox', 'horace_the_tamed_crobak', 'kapotie_the_drinker']},
    ],
    achievements: ['tight', 'first', 'duo(20)'],
    bossID: 'lord_crow',
    dungeonLevel: 110
  },
  // Bonta Rat Dungeon
  { dungeonID: 'bonta_rat_dungeon',
    dungeonname: {
      de: 'Rattendungeon von Bonta',
      en: 'Bonta Rat Dungeon',
      es: 'Mazmorra de las Ratas de Bonta',
      fr: 'Donjon des Rats de Bonta',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['rat_rah(2)', 'rat_basher(2)']},
      { id: 'room2', monsterID: ['rat_pakk(2)', 'rat_rah', 'rat_basher']},
      { id: 'room3', monsterID: ['white_rat', 'rat_pakk', 'rat_rah', 'rat_basher']},
    ],
    achievements: ['first', 'impertinence', 'duo(20)'],
    bossID: 'white_rat',
    dungeonLevel: 110
  },
  // Brakmar Rat Dungeon
  { dungeonID: 'brakmar_rat_dungeon',
    dungeonname: {
      de: 'Rattendungeon von Brakmar',
      en: 'Brakmar Rat Dungeon',
      es: 'Mazmorra de las Ratas de Brakmar',
      fr: 'Donjon des Rats de Brâkmar',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['rat_suenami(2)', 'rat_bag(2)']},
      { id: 'room2', monsterID: ['rat_tchet(2)', 'rat_suenami', 'rat_bag']},
      { id: 'room3', monsterID: ['black_rat', 'rat_tchet', 'rat_suenami', 'rat_bag']},
    ],
    achievements: ['impertinence', 'blitzkrieg', 'Duo(20)'],
    bossID: 'black_rat',
    dungeonLevel: 110
  },

  { dungeonID: 'rainbow_blop_lair',
    dungeonname: {
      de: 'Unterschlupf des königlichen Multiblobs',
      en: 'Rainbow Blop Lair',
      es: 'Antro del Blop Multicolor Real',
      fr: 'Antre du Blop Multicolore Royal',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['royal_rainbow_blop', 'royal_coco_blop', 'royal_indigo_blop', 'royal_morello_cherry_blop', 'royal_pippin_blop']},
    ],
    achievements: ['impertinence', 'duel', 'duo(20)'],
    bossID: ['royal_rainbow_blop', 'royal_coco_blop', 'royal_indigo_blop', 'royal_morello_cherry_blop', 'royal_pippin_blop'],
    dungeonLevel: 120
  },
  // Inner Labyrinth of the Minotoror
  { dungeonID: 'labyrinth_minotoror',
    dungeonname: {
      de: 'Labyrinth des Minotorors',
      en: 'Labyrinth of the Minotoror',
      es: 'Laberinto del Minotauroro',
      fr: 'Labyrinthe du Minotoror',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['quetsnakiatl', 'minokid', 'scaratos', 'deminoball']},
      { id: 'room2', monsterID: ['manderisha', 'scaratos', 'minoskito', 'mumminotor']},
      { id: 'room3', monsterID: ['minotoror', 'minokid', 'deminoball', 'mumminotor']},
    ],
    achievements: ['hermit', 'clean_hands', 'duo(20)'],
    bossID: 'minotoror',
    dungeonLevel: 120
  },
  // Royal Mastogob's Greenhouse
  { dungeonID: 'royal_mastogobs_greenhouse',
    dungeonname: {
      de: 'Gewächshaus des Königlichen Fressmuts',
      en: 'Royal Mastogob\'s Greenhouse',
      es: 'Invernáculo de Jalamut Real',
      fr: 'Serre du Royalmouth',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['mastogob(2)', 'mastogobbly(2)']},
      { id: 'room2', monsterID: ['venerable_mastogob', 'mastogob_warrior', 'mastogob', 'mastogobbly']},
      { id: 'room3', monsterID: ['royal_mastogob', 'venerable_mastogob', 'mastogob_warrior', 'mastogob']},
    ],
    achievements: ['clean_hands', 'first', 'duo(20)'],
    bossID: 'royal_mastogob',
    dungeonLevel: 120
  },
  // Royal Tofu House
  { dungeonID: 'royal_tofu_house',
    dungeonname: {
      de: 'Königlicher Tofustall',
      en: 'Royal Tofu House',
      es: 'Tofullinero Real',
      fr: 'Tofulailler Royal',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['blastofu(2)', 'ugly_tofu(2)']},
      { id: 'room2', monsterID: ['podgy_tofu(2)', 'tofubine', 'tofuzmo']},
      { id: 'room3', monsterID: ['royal_tofu', 'podgy_tofu', 'tofubine', 'blastofu']},
    ],
    achievements: ['last', 'statue', 'duo(20)'],
    bossID: 'royal_tofu',
    dungeonLevel: 120
  },
  // Dreggon Dungeon
  { dungeonID: 'dreggon_dungeon',
    dungeonname: {
      de: 'Drachei-Dungeon',
      en: 'Dreggon Dungeon',
      es: 'Mazmorra de los Dragohuevos',
      fr: 'Sanctuaire des Dragoeufs',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['dragostess', 'flying_dreggon(2)', 'dreggon_warrior']},
      { id: 'room2', monsterID: ['alert_white_dragoss', 'alert_golden_dragoss', 'alert_sapphire_dragoss', 'dreggon_warrior']},
      { id: 'room3', monsterID: ['crocabulia', 'flying_dreggon', 'dreggon_warrior', 'dragostess']},
    ],
    achievements: ['tight', 'blitzkrieg', 'duo(20)'],
    bossID: 'crocabulia',
    dungeonLevel: 120
  },
  // Skeunk's Hideout
  { dungeonID: 'skeunks_hideout',
    dungeonname: {
      de: 'Unterschlupf des Skeunks',
      en: 'Skeunk\'s Hideout',
      es: 'Guarida de Skonk',
      fr: 'Repaire de Skeunk',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['ruby', 'purple_warko', 'reapalak', 'koalak_warrior']},
      { id: 'room2', monsterID: ['sapphira', 'starving_doll', 'bloody_koalak', 'koalak_warrior']},
      { id: 'room3', monsterID: ['skeunk', 'diamantine', 'emeraude', 'starving_doll']},
    ],
    achievements: ['statue', 'blitzkrieg', 'duo(26)'],
    bossID: 'skeunk',
    dungeonLevel: 120
  },
  // Minerock Sanctuary
  { dungeonID: 'minerock_sanctuary',
    dungeonname: {
      de: 'Erzfelser Heiligtum',
      en: 'Minerock Sanctuary',
      es: 'Santuario Minerroca',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['last', 'zombie', 'duo(20)'],
    bossID: 'crakillian_guardian',
    dungeonLevel: 130
  },
  // Kanigrula's Hideout
  { dungeonID: 'kanigrulas_hideout',
    dungeonname: {
      de: 'Kanigroulas Unterschlupf',
      en: 'Kanigrula\'s Hideout',
      es: 'Guarida de Kanigrula',
      fr: 'Repaire de Kanigroula',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['felygiene', 'orfan(2)', 'alyeena']},
      { id: 'room2', monsterID: ['orfan', 'kannihilator(2)', 'alyeena']},
      { id: 'room3', monsterID: ['kanigrula', 'felygiene', 'kannihilator', 'alyeena']},
    ],
    achievements: ['first', 'clean_hands', 'duo(20)'],
    bossID: 'kanigrula',
    dungeonLevel: 140
  },
  // Soft Oak Dungeon
  { dungeonID: 'soft_oak_dungeon',
    dungeonname: {
      de: 'Weich Eich Dungeon',
      en: 'Soft Oak Dungeon',
      es: 'Mazmorra del Roble Blando',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['freedom', 'first', 'duo(20)'],
    bossID: 'soft_oak',
    dungeonLevel: 140
  },
  // The Tynril Lab
  { dungeonID: 'the_tynril_lab',
    dungeonname: {
      de: 'Tynrils Laboratorium',
      en: 'The Tynril Lab',
      es: 'Laboratorio del Tynril',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['untouchable', 'zombie', 'duo(20)'],
    bossID: {
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
      es: 'Excavación de Morsagūino Real',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['last', 'tight', 'duo(20)'],
    bossID: 'royal_pingwin',
    dungeonLevel: 140
  },
  // Long Slumber's Barrow
  { dungeonID: 'long_slumbers_barrow',
    dungeonname: {
      de: 'Grabhügel des langen Schlafs',
      en: 'Long Slumber\'s Barrow',
      es: 'Túmulo del Largo Sueño',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['first', 'survivor', 'duo(20)'],
    bossID: 'hell_mina',
    dungeonLevel: 140
  },
  // The Wreck of the Hesperus
  { dungeonID: 'the_wreck_of_the_hesperus',
    dungeonname: {
      de: 'Wrack der Black Rogg',
      en: 'The Wreck of the Hesperus',
      es: 'Restos del Roca Negra',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['keep_moving', 'statue', 'duo(20)'],
    bossID: 'buck_anear',
    dungeonLevel: 150
  },
  // Amakna Castle Rat Dungeon
  { dungeonID: 'amakna_castle_rat_dungeon',
    dungeonname: {
      de: 'Rattendungeon des Schlosses von Amakna',
      en: 'Amakna Castle Rat Dungeon',
      es: 'Mazmorra de las Ratas del Castillo de Amakna',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['impertinence', 'last', 'duo(20)'],
    bossID: {
      sphincter: 'sphincter_cell',
      white_rat: 'white_rat',
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
      es: 'Canopea del Kimbo',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['statue', 'first', 'duo(20)'],
    bossID: 'kimbo',
    dungeonLevel: 160
  },
  // Minotot Room
  { dungeonID: 'minotot_room',
    dungeonname: {
      de: 'Minotot Raum',
      en: 'Minotot Room',
      es: 'Sala del Minotot',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['keep_moving', 'first', 'duo(20)'],
    bossID: ['minotot', 'minotoror'],
    dungeonLevel: 160
  },
  // The Obsidemon's Hypogeum
  { dungeonID: 'the_obsidemons_hypogeum',
    dungeonname: {
      de: 'Grabgewölbe der Obsidianter',
      en: 'The Obsidemon\'s Hypogeum',
      es: 'Hipogeo del Obsidiantre',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['first', 'statue', 'duo(20)'],
    bossID: 'obsidemon',
    dungeonLevel: 160
  },
  // The Flooded Chapel
  { dungeonID: 'the_flooded_chapel',
    dungeonname: {
      de: 'Die überflutete Kapelle',
      en: 'The Flooded Chapel',
      es: 'Capilla Inundada',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['fainthearted', 'versatile', 'duo(20)'],
    bossID: 'zombrute',
    dungeonLevel: 160
  },
  // Snowfoux Caverns
  { dungeonID: 'snowfoux_caverns',
    dungeonname: {
      de: 'Eisfux Höhlen',
      en: 'Snowfoux Caverns',
      es: 'Cavernas Gélifux',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['first', 'statue', 'duo(15)'],
    bossID: 'tengu_snowfoux',
    dungeonLevel: 170
  },
  // Valley of the Lady of the Water
  { dungeonID: 'valley_of_the_lady_of_the_water',
    dungeonname: {
      de: 'Tal der Herrin über die Gewässer',
      en: 'Valley of the Lady of the water',
      es: 'Valle de la Dama del Agua',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['last', 'impertinence', 'duo(20)'],
    bossID: 'nagate',
    dungeonLevel: 170
  },
  // Scale King's Pyramid
  { dungeonID: 'scale_kings_pyramid',
    dungeonname: {
      de: 'Pyramide von König Skai',
      en: 'Scale King\'s Pyramid',
      es: 'Pirámide del Rey Eskamoso',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['last', 'statue', 'duo(20)'],
    bossID: 'scale_king',
    dungeonLevel: 170
  },
  // Korriander's Lair
  { dungeonID: 'korrianders_lair',
    dungeonname: {
      de: 'Unterschlupf des Korrianders',
      en: 'Korriander\'s Lair',
      es: 'Antro del Cil',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['mystique', 'zombie', 'duo(20)'],
    bossID: 'Korriander',
    dungeonLevel: 180
  },
  // Lair of the Giant Kralove
  { dungeonID: 'lair_of_the_giant_kralove',
    dungeonname: {
      de: 'Höhle des Riesenkrakamors',
      en: 'Lair of the Giant Kralove',
      es: 'Antro del Kralamar Gigante',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['nomad', 'blitzkrieg', 'Duo(20)'],
    bossID: 'giant_kralove',
    dungeonLevel: 180
  },
  // Bworker Dungeon
  { dungeonID: 'bworker_dungeon',
    dungeonname: {
      de: 'Bworker Dungeon',
      en: 'Bworker Dungeon',
      es: 'Mazmorra del Bworker',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['impertinence', 'quick_and_furious', 'duo(20)'],
    bossID: 'bworker',
    dungeonLevel: 180
  },
  // Fungus Dungeon
  { dungeonID: 'fungus_dungeon',
    dungeonname: {
      de: 'Pilz-Dungeon',
      en: 'Fungus Dungeon',
      es: 'Mazmorra de los Fongos',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['tight', 'last', 'Duo(15)'],
    bossID: 'ougaa',
    dungeonLevel: 180
  },
  // Tanukoui San's Workshop
  { dungeonID: 'tanukoui_sans_workshop',
    dungeonname: {
      de: 'Tanukouï Sans Werkstatt',
      en: 'Tanukoui San\'s Workshop',
      es: 'Taller de Tanukui San',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['nomad', 'blitzkrieg', 'duo(20)'],
    bossID: 'tanukoui_san',
    dungeonLevel: 180
  },
  // Kolosso's Cavern
  { dungeonID: 'kolossos_cavern',
    dungeonname: {
      de: 'Höhlen des Daxolossus',
      en: 'Kolosso\'s Cavern',
      es: 'Cavernas de Tejossus',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['last', 'first', 'duo(19)'],
    bossID: {
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
      es: 'Fábrica de Fux Artificiales',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['last', 'hermit', 'duo(20)'],
    bossID: 'founoroshi',
    dungeonLevel: 190
  },
  // Foster Caverns
  { dungeonID: 'foster_caverns',
    dungeonname: {
      de: 'Fujis Höhle',
      en: 'Foster Caverns',
      es: 'Cavernas Gélifux',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['last', 'statue', 'duo(21)'],
    bossID: 'fuji_snowfoux',
    dungeonLevel: 190
  },
  // Sakai Mine
  { dungeonID: 'sakai_mine',
    dungeonname: {
      de: 'Mine von Arkal',
      en: 'Sakai Mine',
      es: 'Mazmorra de la Mina de Kéfriho',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['versatile', 'blitzkrieg', 'duo(28)'],
    bossID: 'grohlum',
    dungeonLevel: 190
  },
  // Bearbarian Antichamber
  { dungeonID: 'bearbarian_antichamber',
    dungeonname: {
      de: 'Vorraum des Barbärenstockes',
      en: 'Bearbarian Antichamber',
      es: 'Antecámara de los Golosotes',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['first', 'tight', 'duo(17)'],
    bossID: 'celestial_bearbarian',
    dungeonLevel: 190
  },
  // Wind Dojo
  { dungeonID: 'wind_dojo',
    dungeonname: {
      de: 'Dojo des Windes',
      en: 'Wind Dojo',
      es: 'Dojo del Viento',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['first', 'fainthearted', 'Duo(20)'],
    bossID: ['shihan', 'hanshi'],
    dungeonLevel: 190
  },
  // Stufe 191 - 200
  // Missiz Freezz's Frostforge
  { dungeonID: 'missiz_freezzs_frostforge',
    dungeonname: {
      de: 'Missiz Frizz Kaltschmiede',
      en: 'Missiz Frizz\'s Frostforge',
      es: 'Forjafria de Mizz Frizz',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['nomad', 'tight', 'duo(40)'],
    bossID: 'missiz_freezz',
    dungeonLevel: 190
  },
  // Sylargh's Carrier
  { dungeonID: 'sylarghs_carrier',
    dungeonname: {
      de: 'Sylarghs Transport',
      en: 'Sylargh\'s Carrier',
      es: 'Transportador de Sylargh',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['hermit', 'barbaric', 'duo(40)'],
    bossID: 'sylargh',
    dungeonLevel: 190
  },
  // Klime's Private Suite
  { dungeonID: 'klimes_private_suite',
    dungeonname: {
      de: 'Die privaten Gesellschaftszimmer R.Klimms',
      en: 'Klime\'s Private Suite',
      es: 'Sala Privada de Klim',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['fainthearted', 'nomad', 'duo(40)'],
    bossID: 'klime',
    dungeonLevel: 190
  },
  // Nileza's Laboratory
  { dungeonID: 'nilezas_laboratory',
    dungeonname: {
      de: 'Nilezas Laboratorium',
      en: 'Nileza\'s Laboratory',
      es: 'Laboratorio de Nileza',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['fainthearted', 'last', 'duo(40)'],
    bossID: 'nileza',
    dungeonLevel: 190
  },
  // The Count's Dungeon
  { dungeonID: 'the_counts_dungeon',
    dungeonname: {
      de: 'Graf Primzahls Dungeon',
      en: 'The Count\'s Dungeon',
      es: 'Mazmorra del Conde Kontatrás',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['versatile', 'statue', 'duo(40)'],
    bossID: 'count_harebourg',
    dungeonLevel: 190
  },
  // Damadrya's Bamboo Grove
  { dungeonID: 'damadryas_bamboo_grove',
    dungeonname: {
      de: 'Damadryas Bambushain',
      en: 'Damadrya\'s Bamboo Grove',
      es: 'Bambuseria de Kodámade',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['hermit', 'first', 'duo(20)'],
    bossID: 'damadrya',
    dungeonLevel: 190
  },
  // Lost Soul's Sanctuary
  { dungeonID: 'lost_souls_sanctuary',
    dungeonname: {
      de: 'Heiligtum der verirrten Seelen',
      en: 'Lost Soul\'s Sanctuary',
      es: 'Santuario de las almas perdidas',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['clean_hands', 'impertinence', 'duo(20)'],
    bossID: 'katamashii',
    dungeonLevel: 190
  },
  // === Saisonale Dungeons
  // -- Ascension --
  { dungeonID: 'ascension_25',
    dungeonname: {
      de: 'Insel der Ersteigung(25)',
      en: 'Ascension Island (25)',
      es: 'Isla de la Ascension (25)',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
    ],
    achievements: [''],
    bossID: 'mucane',
    dungeonLevel: 0
  },
  { dungeonID: 'ascension_50',
    dungeonname: {
      de: 'Insel der Ersteigung(50)',
      en: 'Ascension Island (50)',
      es: 'Isla de la Ascension (50)',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
    ],
    achievements: [''],
    bossID: 'ul_khan',
    dungeonLevel: 0
  },
  { dungeonID: 'ascension_75',
    dungeonname: {
      de: 'Insel der Ersteigung(75)',
      en: 'Ascension Island (75)',
      es: 'Isla de la Ascension (75)',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
    ],
    achievements: [''],
    bossID: 'mucane',
    dungeonLevel: 0
  },
  { dungeonID: 'ascension_100',
    dungeonname: {
      de: 'Insel der Ersteigung(100)',
      en: 'Ascension Island (100)',
      es: 'Isla de la Ascension (100)',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
    ],
    achievements: [''],
    bossID: 'ul_khan',
    dungeonLevel: 0
  },
  // -- Vulkania --
  // Sleepwalking
  { dungeonID: 'sleepwalking_pinki_crater',
    dungeonname: {
      de: 'Schlafwandeln im Krater Minus',
      en: 'Sleepwalking Pinki Crater',
      es: 'Cráter Mino Sonámbulo',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['chrono(9)', 'statue', 'clean_hands', 'duo(20)'],
    bossID: ['sleepwalking_grozilla', 'sleepwalking_grasmera'],
    dungeonLevel: 40
  },
  // Exhausted
  { dungeonID: 'exhausted_pinki_crater',
    dungeonname: {
      de: 'Erschöpft im Krater Minus',
      en: 'Exhausted Pinki Crater',
      es: 'Cráter Mino Agotado',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['chrono(9)', 'first', 'tight', 'duo(20)'],
    bossID: ['exhausted_grozilla', 'exhausted_grasmera'],
    dungeonLevel: 90
  },
  // Tired
  { dungeonID: 'tired_pinki_crater',
    dungeonname: {
      de: 'Müde im Krater Minus',
      en: 'Tired Pinki Crater',
      es: 'Cráter Mino Cansado',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['chrono(9)', 'nomad', 'blitzkrieg', 'duo(20)'],
    bossID: ['tired_grozilla', 'tired_grasmera'],
    dungeonLevel: 140
  },
  { dungeonID: 'pinki_crater',
    dungeonname: {
      de: 'Krater Minus',
      en: 'Pinki Crater',
      es: 'Cráter Mino',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['chrono(9)', 'zombie', 'impertinence', 'duo(20)'],
    bossID: ['grozilla', 'grasmera'],
    dungeonLevel: 190
  },
  // -- Horrob Isle --
  { dungeonID: 'caustic_rock_cove',
    dungeonname: {
      de: 'Knochenfelsenbucht',
      en: 'Caustic Rock Cove',
      es: 'Cala del Peñón Quemazón',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['bone_shot', 'bone_head', 'bone_boor', 'bone_doctor']},
    ],
    achievements: ['versatile', 'clean_hands', 'chrono(10)', 'duo(20)'],
    bossID: 'bone_shot',
    dungeonLevel: 60
  },
  { dungeonID: 'al_howins_vegetable_patch',
    dungeonname: {
      de: 'Höll O\'Feens Gemüsegarten',
      en: 'Al Howin\'s Vegetable Patch',
      es: 'Huerto de Haluin',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['arachkin', 'borbkin', 'worm_o_lantern(2)']},
      { id: 'room2', monsterID: ['arachkin', 'toadkin', 'worm_o_lantern', 'devhorror']},
      { id: 'room3', monsterID: ['al_howin', 'arachkin', 'toadkin', 'worm_o_lantern']},
    ],
    achievements: ['chrono(9)', 'impertinence', 'last', 'duo(20)'],
    bossID: 'al_howin',
    dungeonLevel: 90
  },
  // Ghoulden Palace
  { dungeonID: 'ghoulden_palace',
    dungeonname: {
      de: 'Ghuldener Palast',
      en: 'Ghoulden Palace',
      es: 'Ghulden Palace',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['staff_deleghoul', 'ghoulton', 'ghoulverness(2)']},
    ],
    achievements: ['survivor', 'fainthearted', 'chrono(19)', 'duo(40)'],
    bossID: 'staff_deleghoul',
    dungeonLevel: 190
  },
  // Kwismas Dungeon
  { dungeonID: 'kwismas_dungeon',
    dungeonname: {
      de: 'Weißnachtsdungeon',
      en: 'Kwismas Dungeon',
      es: 'Mazmorra de Nawidad',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['chrono(9)', 'impertinence', 'blitzkrieg', 'duo(20)'],
    bossID: 'itzting',
    dungeonLevel: 50
  },
  // Kwismas Cavern
  { dungeonID: 'kwismas_cavern',
    dungeonname: {
      de: 'Weißnachtshöhle',
      en: 'Kwismas Cavern',
      es: 'Cueva de Nawidad',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['chrono(9)', 'first', 'statue', 'duo(20)'],
    bossID: 'father_kwismas',
    dungeonLevel: 110
  },
  // Father Kwismas's House
  { dungeonID: 'father_kwismass_house',
    dungeonname: {
      de: 'Haus des Weißnachtsmannes',
      en: 'Father Kwismas\'s House',
      es: 'Casa de Chanta Klaus',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '']},
      { id: 'room2', monsterID: ['', '', '', '']},
      { id: 'room3', monsterID: ['', '', '', '']},
    ],
    achievements: ['chrono(9)', 'nomad', 'impertinence', 'duo(20)'],
    bossID: 'father_whupper',
    dungeonLevel: 180
  },
  // === Raid ===
  // Dark Vlad's Domain
  { dungeonID: 'dark_vlads_domain',
    dungeonname: {
      de: 'Dark Vlads Reich',
      en: 'Dark Vlad\'s Domain',
      es: 'Dominios de Dark Vlad',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '', '']},
    ],
    achievements: [
      'just_in_time', 'blood_for_blood', 'unshakable_sentinel', 'in_full_sight',
      'a_countless_multitude', 'in_the_shadows', 'tribal_madness', 'woody_impediments',
      'horde_and_disorder', 'cards_in_hand', 'on_the_edge', 'experimental_alchemy',
      'infernal_machine', 'dark_locks_dark_thoughts', 'unslakeable_thirst',
    ],
    // Just in Time/Genau rechtzeitg/Justo a tiempo: Xelor
    // Blood for Blood/Blut für Blut/Sangre por sangre: Sacrier
    // Unshakable Sentinel/Unerschütterlicher Wächter/Centinela Inquebrantable: Feca
    // In Full Sight/Vor aller Augen/En tu propia barba: Enutrof
    // A Countless Multitude/Unübersehbare Menge/Multitud incontable: Osamodas
    // In the Shadows/Im Schatten/en las sombras: Sram
    // Tribal Madness/Stammeswahnsinn/Locura Tribal: Masqueraider
    // Woody Impediments/Hözerne Fesseln/Trabas Boscosas: Sadida
    // Horde and Disorder/Hordnung und Unhordnung/Horda y desorden: Iop
    // Cards in Hand/Alle Karten in der Hand/Cartas en mano: Ecaflip
    // On the Edge/Auf Messers Schneide/Por poco: Cra
    // Experimental Alchemy/Experimentelle Alchemie/Alquimia experimental: Eniripsa
    // Infernal Machine/Höllenmaschine/Máquina infernal: Foggernaut
    // Dark Locks, Dark Thoughts/Lunte und finstere Gedanken/Mecha y pensamientos oscuros: Rogue
    // Unslakeable Thirst/Unstillbarer Durst/Sed insaciable: Pandawa
    bossID: 'dark_vlad',
    dungeonLevel: 190
  },
  // Belladonna's Domain
  { dungeonID: 'belladonnas_domain',
    dungeonname: {
      de: 'Belladonnas Domäne',
      en: 'Belladonna\'s Domain',
      es: 'Dominios de Belladona',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['', '', '', '', '']},
    ],
    achievements: [
      'just_in_time', 'blood_for_blood', 'unshakable_sentinel', 'in_full_sight',
      'a_countless_multitude', 'in_the_shadows', 'tribal_madness', 'woody_impediments',
      'horde_and_disorder', 'cards_in_hand', 'on_the_edge', 'experimental_alchemy',
      'infernal_machine', 'dark_locks_dark_thoughts', 'unslakeable_thirst',
    ],
    bossID: 'exalted_belladonna',
    dungeonLevel: 190
  },
  // === Lairs ===
  { dungeonID: 'piwi_lair',
    dungeonname: {
      de: 'Piepmatz Unterschlupf',
      en: 'Piwi Lair',
      es: 'Guarida de los Píos',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['dark_piwi']},
      { id: 'room2', monsterID: ['celestial_piwi']},
    ],
    achievements: ['quick', 'efficient', 'fast'], //es: Veloz, Expeditivo, Fulgurante
    bossID: ['dark_piwi', 'celestial_piwi'],
    dungeonLevel: 20
  },
  { dungeonID: 'plop_lair',
    dungeonname: {
      de: 'Suptoko Unterschlupf',
      en: 'Plop Lair',
      es: 'Guarida de los Pulps',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['azure_plop']},
      { id: 'room2', monsterID: ['crimson_plop']},
    ],
    achievements: ['quick', 'efficient', 'fast'],
    bossID: ['azure_plop', 'crimson_plop'],
    dungeonLevel: 30
  },
  { dungeonID: 'tofu_lair',
    dungeonname: {
      de: 'Tofu Unterschlupf',
      en: 'Tofu lair',
      es: 'Guarida de los Tofus',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['dark_tofu']},
      { id: 'room2', monsterID: ['celestial_tofu']},
    ],
    achievements: ['quick', 'efficient', 'fast'],
    bossID: ['dark_tofu', 'celestial_tofu'],
    dungeonLevel: 40
  },
  { dungeonID: 'gobball_lair',
    dungeonname: {
      de: 'Fresssack Unterschlupf',
      en: 'Gobball lair',
      es: 'Guarida de los Jalatós',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['dark_gobball']},
      { id: 'room2', monsterID: ['celestial_gobball']},
    ],
    achievements: ['quick', 'efficient', 'fast'],
    bossID: ['dark_gobball', 'celestial_gobball'],
    dungeonLevel: 50
  },
  { dungeonID: 'boar_lair',
    dungeonname: {
      de: 'Keiler Unterschlupf',
      en: 'Boar Lair',
      es: 'Guarida de los Jabalies',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['dark_boar']},
      { id: 'room2', monsterID: ['celestial_boar']},
    ],
    achievements: ['quick', 'efficient', 'fast'],
    bossID: ['dark_boar', 'celestial_boar'],
    dungeonLevel: 60
  },
  { dungeonID: 'arachnee_lair',
    dungeonname: {
      de: 'Arachneen Unterschlupf',
      en: 'Arachnee Lair',
      es: 'Guarida de las Araknas',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['dark_arachnee']},
      { id: 'room2', monsterID: ['celestial_arachnee']},
    ],
    achievements: ['quick', 'efficient', 'fast'],
    bossID: ['dark_arachnee', 'celestial_arachnee'],
    dungeonLevel: 70
  },
  { dungeonID: 'eltneg_trools_lair',
    dungeonname: {
      de: 'Unterschlupf der Litneg Trools',
      en: 'Eltneg Trools\'s Lair',
      es: 'Guarida de los Trools de Litneg',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['troologram']},
      { id: 'room2', monsterID: ['troololens']},
    ],
    achievements: ['quick', 'efficient', 'fast'],
    bossID: ['troologram', 'troololens'],
    dungeonLevel: 80
  },
  { dungeonID: 'chapel_trools_lair',
    dungeonname: {
      de: 'Unterschlupf der Kapellen Trools',
      en: 'Chapel Trools\'s Lair',
      es: 'Guarida de los Trools de la Capilla',
      fr: '',
      pt: '',
    },
    rooms: [
      { id: 'room1', monsterID: ['trooligophren']},
      { id: 'room2', monsterID: ['troolibrius']},
    ],
    achievements: ['quick', 'efficient', 'fast'],
    bossID: ['trooligophren', 'troolibrius'],
    dungeonLevel: 90
  },
];

function flattenbossIDentifier(value) {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    return value
      .map((item) => flattenbossIDentifier(item))
      .filter(Boolean)
      .join(', ');
  }
  if (typeof value === 'object') {
    if (value.id) return flattenbossIDentifier(value.id);
    return Object.values(value)
      .map((item) => flattenbossIDentifier(item))
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

function resolveBossLabels(bossID) {
  if (!bossID) return undefined;
  const labels = {};
  for (const locale of SUPPORTED_LOCALES) {
    const label = flattenBossLabelForLocale(bossID, locale);
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
  if (names) {
    return (
      names[locale]
      || names.en
      || names.de
      || Object.values(names).find(Boolean)
      || String(ref)
    );
  }
  return String(ref);
}

const normalizeChallengeId = (id) => normalizeAchievementKey(id);

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
    overrides.bossID = dungeon.bossID;
    const bossLabels = resolveBossLabels(dungeon.bossID);
    if (bossLabels) overrides.bossName = { name: bossLabels };
    else {
      const fallback = flattenbossIDentifier(dungeon.bossID);
      if (fallback) overrides.bossName = fallback;
    }
    overrides.dungeonID = dungeon.dungeonID;
    const dungeonLabels = resolveDungeonLabels(dungeon.dungeonname);
    if (dungeonLabels) overrides.dungeonName = { name: dungeonLabels };
    else overrides.dungeonName = dungeon.dungeonID;
  }

  if (id === 'first' || id === 'last') {
    overrides.target = dungeon.bossID;
    const targetLabels = resolveBossLabels(dungeon.bossID);
    if (targetLabels) overrides.targetName = { name: targetLabels };
    else {
      const fallback = flattenbossIDentifier(dungeon.bossID);
      if (fallback) overrides.targetName = fallback;
    }
  }

  const params = Object.keys(overrides).length ? { ...overrides } : undefined;

  const challenge = {
    id,
    params,
    raw,
  };

  const labels = buildLocalizedLabel(id);
  if (labels) {
    challenge.name = labels;
  }

  const achievementEmojiLookup = { categories: ['achievements'] };

  const emoji = getAchievementEmoji(id, achievementEmojiLookup);
  if (emoji) {
    challenge.emoji = emoji;
  }

  const emojiName = getAchievementEmojiName(id, achievementEmojiLookup);
  if (emojiName) {
    challenge.emojiName = emojiName;
  }

  return challenge;
}

const DUNGEON_LISTE = DUNGEON_ROHDATEN.map((dungeon) => {
  const parsedachievements = Array.isArray(dungeon.achievements)
    ? dungeon.achievements
        .map((entry) => instantiateDungeonChallenge(entry, dungeon))
        .filter(Boolean)
    : [];

  return {
    ...dungeon,
    achievements: parsedachievements,
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