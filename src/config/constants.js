// === Konstanten ===
// Erlaubte KO-Runden Größen
const ALLOWED_KO_SIZES = [32, 16, 14, 12, 8, 4, 2];

// Klassen Liste
const KLASSE_LISTE = [
  { emoji: '🏹', name: 'Cra' },
  { emoji: '🎲', name: 'Ecaflip' },
  { emoji: '🩹', name: 'Eniripsa' },
  { emoji: '💰', name: 'Enutrof' },
  { emoji: '🛡️', name: 'Feca' },
  { emoji: '💣', name: 'Halsabschneider' },
  { emoji: '🗡', name: 'Iop' },
  { emoji: '🎭', name: 'Maskerador' },
  { emoji: '🐉', name: 'Osamodas' },
  { emoji: '🐼', name: 'Pandawa' },
  { emoji: '🩸', name: 'Sacrieur' },
  { emoji: '🌱', name: 'Sadida' },
  { emoji: '💀', name: 'Sram' },
  { emoji: '🚂', name: 'Steamer' },
  { emoji: '⏳', name: 'Xelor' },
];

// Regionen Liste
const REGION_LISTE = [
  { id: 'albuera',        name: { de: 'Albuera-Archipel', en: 'Albuera Archipelago', fr: 'Archipel d\'Albuera', es: 'Archipélago de Albuera' } },
  { id: 'amakna',         name: { de: 'Amakna', en: 'Amakna', fr: 'Amakna', es: 'Amakna' } },
  { id: 'astrub',         name: { de: 'Astrub', en: 'Astrub', fr: 'Astrub', es: 'Astrub' } },
  { id: 'bonta',          name: { de: 'Bonta', en: 'Bonta', fr: 'Bonta', es: 'Bonta' } },
  { id: 'brakmar',        name: { de: 'Brâkmar', en: 'Brakmar', fr: 'Brâkmar', es: 'Brakmar' } },
  { id: 'cania',          name: { de: 'Cania-Ebene', en: 'Cania Plains', fr: 'Plaine de Cania', es: 'Llanura de Cania' } },
  { id: 'dopple',         name: { de: 'Doppel-Territorium', en: 'Dopple Territory', fr: 'Territoire des Dopeuls', es: 'Territorio de los dopeuls' } },
  { id: 'dragonpigmaze',  name: { de: 'Labyrinth des Schweinedrachens', en: 'The Dragon Pig\'s Maze', fr: 'Le labyrinthe du Dragon Cochon', es: 'El laberinto del Dragocerdo' } },
  { id: 'dungeons',       name: { de: 'Dungeons', en: 'Dungeons', fr: 'Donjons', es: 'Mazmorras' } },
  { id: 'frigost',        name: { de: 'Die Insel Frigost', en: 'Frigost Island', fr: 'Île de Frigost', es: 'Isla de Frigost' } },
  { id: 'horrib',         name: { de: 'Horrorinsel', en: 'Horrib Isle', fr: 'Îlot Rifique', es: 'Islote Rorífico' } },
  { id: 'koalak',         name: { de: 'Koalak-Gebirge', en: 'Koalak Mountain', fr: 'Montagne des Koalaks', es: 'Montaña de los koalaks' } },
  { id: 'kwismas',        name: { de: 'Weißnachtsinsel', en: 'Kwismas Island', fr: 'Île de Nowel', es: 'Isla de Nawidad' } },
  { id: 'minotoror',      name: { de: 'Minotoror-Insel', en: 'Minotoror Island', fr: 'Île du Minotoror', es: 'Isla del Minotauroro' } },
  { id: 'moon',           name: { de: 'Moon-Insel', en: 'Moon Island', fr: 'Île de Moon', es: 'Isla de Moon' } },
  { id: 'orado',          name: { de: 'Insel Orado', en: 'Orado Island', fr: 'Île d\'Orado', es: 'Isla de Eldoroda' } },
  { id: 'otomai',         name: { de: 'Otomaïs Insel', en: 'Otomai Island', fr: 'Île d\'Otomaï', es: 'Isla de Otomai' } },
  { id: 'pandala',        name: { de: 'Insel Pandala', en: 'Pandala Island', fr: 'Île de Pandala', es: 'Isla de Pandala' } },
  { id: 'sakai',          name: { de: 'Die Insel Arkal', en: 'Sakai Island', fr: 'Île de Sakaï', es: 'Isla Kéfriho' } },
  { id: 'sidimote',       name: { de: 'Sidimote-Gebiet', en: 'Sidimote Moors', fr: 'Landes de Sidimote', es: 'Landas de Sidimote' } },
  { id: 'treechnid',      name: { de: 'Wald der Astaknyden', en: 'Treechnid Forest', fr: 'Forêt des Abraknydes', es: 'Bosque de los abráknidos' } },
  { id: 'vulkania',       name: { de: 'Vulkania-Archipel', en: 'Archipelago of Vulkania', fr: 'Archipel de Vulkania', es: 'Archipiélago de Vulkania' } },
  { id: 'wabbit',         name: { de: 'Wabbit-Insel', en: 'Wabbit Island', fr: 'Île des Wabbits', es: 'Isla de los Wabbits' } },
  { id: 'zoth',           name: { de: 'Zothiges Dorf', en: 'The Zoth Village', fr: 'Village des Zoths', es: 'Pueblo de los zoths' } },
];

const FAMILY_LISTE = [
  { id: 'albuera',        name: { de: 'Albuera-Kreaturen', en: 'Albuera Creatures', fr: 'Créatures d\'Albuera', es: 'Criaturas de Albuera' } },
];

const ICON_BASE = 'https://paschkii.github.io/dofus-touch-icons/';

const RESISTANCE_TYPES = {
    neutral: {
      icon: `${ICON_BASE}/status-icons/Dofus_Neutral.png`,
      name: {
        de: 'Neutral', en: 'Neutral', fr: 'Neutre', es: 'Neutral',
      }
    },
    earth: {
      icon: `${ICON_BASE}/status-icons/Dofus_Strength.png`,
      name: {
        de: 'Erde', en: 'Earth', fr: 'Terre', es: 'Tierra',
      }
    },
    fire: {
      icon: `${ICON_BASE}/status-icons/Dofus_Intelligence.png`,
      name: {
        de: 'Feuer', en: 'Fire', fr: 'Feu', es: 'Fuego',
      }
    },
    water: {
      icon: `${ICON_BASE}/status-icons/Dofus_Chance.png`,
      name: {
        de: 'Wasser', en: 'Water', fr: 'Eau', es: 'Agua',
      }
    },
    air: {
      icon: `${ICON_BASE}/status-icons/Dofus_Agility.png`,
      name: {
        de: 'Luft', en: 'Air', fr: 'Air', es: 'Aire',
      }
    },
}

// Boss Liste
const BOSSE_LISTE = [
  // Level 1 - 50 Dungeons
  { id: 'belladonna',
    name: {
      de: 'Belladonna', en: 'Belladonna', fr: 'Belladone', es: 'Belladona',
    },
    imageUrl: `${ICON_BASE}/boss-icons/belladonna.png`,
    defaultLevel: 12,
    region: 'albuera',
    family: 'albuera',
    resistances: {
      neutral: 0,
      earth: 0,
      fire: 0,
      water: 0,
      air: 0,
    }
  },
  { id: 'famished_sunflower',
    name: {
      de: 'Ausgehungertes Sonnenblümchen',
      en: 'Famished Sunflower',
      fr: 'Tournesol Affamé',
      es: 'Girasol Hambriento',
    },
    imageUrl: `${ICON_BASE}/boss-icons/famished_sunflower.png`,
    defaultLevel: 35,
    resistances: {
    }
  },
  { id: 'spongemob', name: 'Spongemob Schwammtopf', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/928.w200h.png', defaultLevel: 40 },
  { id: 'golden_scarabugly', name: 'Goldenes Scarabiest', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/797.w200h.png', defaultLevel: 40 },
  { id: 'batofu', name: 'Batofu', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/800.w200h.png', defaultLevel: 40 },
  { id: 'bartaboo', name: 'Bartaboo', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3651.w200h.png', defaultLevel: 40 },
  { id: 'ronin_chafer', name: 'Ronin Chafer', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3238.w200h.png', defaultLevel: 40 },
  { id: 'kingfresssack', name: 'Königlicher Fresssack', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/147.w200h.png', defaultLevel: 50 },
  { id: 'bworkette', name: 'Bworkette', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/792.w200h.png', defaultLevel: 50 },
  { id: 'schattenschmiede', name: 'Schatztruhe der Schattenschmiede', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/252.w200h.png', defaultLevel: 50 },
  { id: 'shin_larve', name: 'Shin Larve', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/457.w200h.png', defaultLevel: 50 },
  { id: 'korallator', name: 'Mächtiger Korallator', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1027.w200h.png', defaultLevel: 50 },
  { id: 'kwackatau', name: 'Kwackatau', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/2995.w200h.png', defaultLevel: 50 },
  // Level 51 - 100 Dungeons
  { id: 'wa_wabbit', name: 'Wa Wabbit', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/180.w200h.png', defaultLevel: 60 },
  { id: 'ahde', name: 'Kanniball Ahde', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/2960.w200h.png', defaultLevel: 60 },
  { id: 'apfel_blob', name: 'Königlicher Apfel Blob', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1187.w200h.png', defaultLevel: 60 },
  { id: 'indigo_blob', name: 'Königlicher Indigo Blob', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1186.w200h.png', defaultLevel: 60 },
  { id: 'kirsch_blob', name: 'Königlicher Kirsch Blob', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1185.w200h.png', defaultLevel: 60 },
  { id: 'kokos_blob', name: 'Königlicher Kokos Blob', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1184.w200h.png', defaultLevel: 60 },
  { id: 'minzgelee', name: 'Königliches Minzgelee', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/85.w200h.png', defaultLevel: 60 },
  { id: 'erdbeergelee', name: 'Königliches Erdbeergelee', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/86.w200h.png', defaultLevel: 60 },
  { id: 'zitronengelee', name: 'Königliches Zitronengelee', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/430.w200h.png', defaultLevel: 60 },
  { id: 'blaubeergelee', name: 'Königliches Blaubeergelee', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/58.w200h.png', defaultLevel: 60 },
  { id: 'nelwynn', name: 'Nelwynn', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3100.w200h.png', defaultLevel: 70 },
  { id: 'gurrlo', name: 'Gurrlo, der Fürchterliche', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1051.w200h.png', defaultLevel: 70 },
  { id: 'mega_krachler', name: 'Legendärer Mega Krachler', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/669.w200h.png', defaultLevel: 70 },
  { id: 'wa_wobot', name: 'Wa Wobot', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3460.w200h.png', defaultLevel: 80 },
  { id: 'urasta', name: 'Ur-Astaknyde', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/173.w200h.png', defaultLevel: 90 },
  { id: 'oberstnimb', name: 'Oberstnimb Selim Quarz', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/3585.w200h.png', defaultLevel: 90 },
  { id: 'schweinedrachen', name: 'Schweinedrachen', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/113.w200h.png', efaultLevel: 100 },
  { id: 'kuhloss', name: 'Kuhloss', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/670.w200h.png', defaultLevel: 100 },
  { id: 'moon', name: 'Moon', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/226.w200h.png', defaultLevel: 400 },
  { id: 'muwulf', name: 'MuWulf', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/232.w200h.png', defaultLevel: 100 },
  // Level 101 - 150 Dungeons
  { id: 'gross_shilf', name: 'Groß-Shilf', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1071.w200h.png', defaultLevel: 440 },
  { id: 'meister_rab', name: 'Meister Rab', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/289.w200h.png', defaultLevel: 110 },
  { id: 'weisse_ratte', name: 'Weiße Ratte', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/940.w200h.png', defaultLevel: 110 },
  { id: 'schwarze_ratte', name: 'Schwarze Ratte', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/939.w200h.png', defaultLevel: 110 },
  { id: 'kingmultiblob', name: 'Königlicher Multiblob', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/1188.w200h.png', defaultLevel: 120 },
  { id: 'minotoror', name: 'Minotoror', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/121.w200h.png', defaultLevel: 120 },
  { id: 'kingfressmut', name: 'Königliches Fressmut', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/2854.w200h.png', defaultLevel: 120 },
  { id: 'kingtofu', name: 'Königlicher Tofu', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/382.w200h.png', defaultLevel: 120 },
  { id: 'crocabulia', name: 'Crocabulia', imageUrl: 'https://static.ankama.com/dofus-touch/www/game/monsters/200/854.w200h.png', defaultLevel: 120 },
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

// Dungeon Liste
const DUNGEON_LISTE = [
  // Stufe 1 - 50
  { dungeonname: 'Belladonnas Schloss', bossname: 'Belladonna', level: 12 },
  { dungeonname: 'Felder Dungeon', bossname: 'Ausgehungertes Sonnenblümchen', level: 30 },
  { dungeonname: 'Versandeter Dungeon', bossname: 'Spongemob Schwammtopf', level: 40 },
  { dungeonname: 'Scarablatt Dungeon', bossname: 'Goldenes Scarabiest', level: 40 },
  { dungeonname: 'Tofu Dungeon', bossname: 'Batofu', level: 40 },
  { dungeonname: 'Geisterhaus', bossname: 'Bartaboo', level: 40 },
  { dungeonname: 'Dungeon der Skelette', bossname: 'Ronin Chafer', level: 40 },
  { dungeonname: 'Fresssack Dungeon', bossname: 'Königlicher Fresssack', level: 50 },
  { dungeonname: 'Bwork Dungeon', bossname: 'Bworkette', level: 50 },
  { dungeonname: 'Dungeon der Schattenschmiede', bossname: 'Schatztruhe der Schattenschmiede', level: 50 },
  { dungeonname: 'Larven Dungeon', bossname: 'Shin Larve', level: 50 },
  { dungeonname: 'Aggrotte', bossname: 'Mächtiger Korallator', level: 50 },
  { dungeonname: 'Nest des Kwackataus', bossname: 'Kwackatau', level: 50 },
  // Stufe 51 - 100
  { dungeonname: 'Schloss des Wa Wabbits', bossname: 'Wa Wabbit', level: 60 },
  { dungeonname: 'Kanniball Dungeon', bossname: 'Kanniball Ahde', level: 60 },
  { dungeonname: 'Blob Dungeon',
    bosses: [
      { bossname: 'Königlicher Apfel Blob', level: 60 },
      { bossname: 'Königlicher Indigo Blob', level: 60 },
      { bossname: 'Königlicher Kirsch Blob', level: 60 },
      { bossname: 'Königlicher Kokos Blob', level: 60 },
    ],
  },
  { dungeonname: 'Königliche Gelee Dimension',
    bosses: [
      { bossname: 'Königliches Minzgelee', level: 60 },
      { bossname: 'Königliches Erdbeergelee', level: 60 },
      { bossname: 'Königliches Zitronengelee', level: 60 },
      { bossname: 'Königliches Blaubeergelee', level: 60 },
    ],
  },
  { dungeonname: 'Brumen Tinctorias Laboratorium', bossname: 'Nelwynn', level: 70 },
  { dungeonname: 'Bilge von Otomais Arche', bossname: 'Gurrlo, der Fürchterliche', level: 70 },
  { dungeonname: 'Krachler Dungeon', bossname: 'Legendärer Mega Krachler', level: 70 },
  { dungeonname: 'Wa Wabbit Bau', bossname: 'Wa Wobot', level: 80 },
  { dungeonname: 'Astaknyden Dungeon', bossname: 'Ur-Astaknyde', level: 90 },
  { dungeonname: 'Dickschädel Staudamm', bossname: 'Oberstnimb Selim Quarz', level: 90 },
  { dungeonname: 'Unterschlupf des Schweinedrachens', bossname: 'Schweinedrachen', level: 100 },
  { dungeonname: 'Höhle des Kuhlosses', bossname: 'Kuhloss', level: 100 },
  { dungeonname: 'Dungeon von Moon', bossname: 'Moon', level: 100 },
  { dungeonname: 'Canidae Dungeon', bossname: 'MuWulf', level: 100 },
  // Stufe 101 - 150
  { dungeonname: 'Shilf Engpass', bossname: 'Groß-Shilf', level: 110 },
  { dungeonname: 'Meister Rabs Bibliothek', bossname: 'Meister Rab', level: 110 },
  { dungeonname: 'Rattendungeon von Bonta', bossname: 'Weiße Ratte', level: 110 },
  { dungeonname: 'Rattendungeon von Brakmar', bossname: 'Schwarze Ratte', level: 110 },
  { dungeonname: 'Unterschlupf des Königlichen Multiblobs', bossname: 'Königlicher Multiblob', level: 120 },
  { dungeonname: 'Herz des Labyrinths des Minotorors', bossname: 'Minotoror', level: 120 },
  { dungeonname: 'Gewächshaus des Königlichen Fressmuts', bossname: 'Königliches Fressmut', level: 120 },
  { dungeonname: 'Königlicher Tofustall', bossname: 'Königlicher Tofu', level: 120 },
  { dungeonname: 'Drachei Dungeon', bossname: 'Crocabulia', level: 120 },
  { dungeonname: 'Unterschlupf des Skeunks', bossname: 'Skeunk', level: 120 },
  { dungeonname: 'Erzfelser Heiligtum', bossname: 'Krakillian Wächter', level: 130 },
  { dungeonname: 'Kanigroulas Unterschlupf', bossname: 'Kanigroula', level: 140 },
  { dungeonname: 'Weich Eich Dungeon', bossname: 'Weich Eich', level: 140 },
  { dungeonname: 'Tynril Dungeon',
    bosses: [
      { bossname: 'Bestürzter Tynril', level: 140 },
      { bossname: 'Perfider Tynril', level: 140 },
      { bossname: 'Verblüffter Tynril', level: 140 },
      { bossname: 'Verdutzter Tynril', level: 140 },
    ],
  },
  { dungeonname: 'King Ping Grotte', bossname: 'King Ping', level: 140 },
  { dungeonname: 'Grabhügel des langen Schlafs', bossname: 'Hell Mina', level: 140 },
  { dungeonname: 'Wrack der Black Rogg', bossname: 'Ben der Ripat', level: 150 },
  { dungeonname: 'Rattendungeon des Schlosses von Amakna', bossname: 'Sphincter Cell', level: 150 },
  // Stufe 151 - 190
  { dungeonname: 'Kimbo Blätterdach', bossname: 'Kimbo', level: 160 },
  { dungeonname: 'Minotot Raum', bossname: 'Minotot', level: 160 },
  { dungeonname: 'Grabgewölbe des Obsidianter', bossname: 'Obsidianter', level: 160 },
  { dungeonname: 'Überflutete Kapelle', bossname: 'Zombrutalist', level: 160 },
  { dungeonname: 'Eisfux Höhlen',
    bosses: [
      { bossname: 'Tengu Eisfux', level: 170 },
      { bossname: 'Fuji Eisfux', level: 190 },
    ],
  },
  { dungeonname: 'Tal der Herrin über die Gewässer', bossname: 'Nagate', level: 170 },
  { dungeonname: 'Pyramide von König Skai', bossname: 'König Skai', level: 170 },
  { dungeonname: 'Unterschlupf des Korrianders', bossname: 'Korriander', level: 180 },
  { dungeonname: 'Höhle des Riesenkrakamors', bossname: 'Riesenkrakamor', level: 180 },
  { dungeonname: 'Bworker Dungeon', bossname: 'Bworker', level: 180 },
  { dungeonname: 'Pilz Dungeon', bossname: 'Stinkeling', level: 180 },
  { dungeonname: 'Tanukouï Sans Werkstatt', bossname: 'Tanukouï San', level: 180 },
  { dungeonname: 'Höhlen des Daxolossus', bossname: 'Daxolossus', level: 190 },
  { dungeonname: 'Feuerwirrk-Fabrik', bossname: 'Fuxoroshi', level: 190 },
  { dungeonname: 'Mine von Arkal', bossname: 'Grollum', level: 190 },
  { dungeonname: 'Vorraum des Barbärenstockes', bossname: 'Himmlischer Barbär', level: 190 },
  { dungeonname: 'Dojo des Windes',
    bosses: [
      { bossname: 'Shihan', level: 190 },
      { bossname: 'Hanshi', level: 190 },
    ],
  },
  // Stufe 191 - 200
  { dungeonname: 'Missiz Frizz Kaltschmiede', bossname: 'Missiz Frizz', level: 190 },
  { dungeonname: 'Sylarghs Transport', bossname: 'Sylargh', level: 190 },
  { dungeonname: 'Die privaten Gesellschaftszimmer R.Klimms', bossname: 'R.Klimm', level: 190 },
  { dungeonname: 'Nilezas Laboratorium', bossname: 'Nileza', level: 190 },
  { dungeonname: 'Graf Primzahls Dungeon', bossname: 'Graf Primzahl', level: 190 },
  { dungeonname: 'Damadryas Bambushain', bossname: 'Damadrya', level: 190 },
  { dungeonname: 'Heiligtum der verirrten Seelen', bossname: 'Katamashii', level: 190 },
];

// Dungeon Kategorien (für Filter)
const DUNGEON_KATEGORIEN = {
  'Level 1-50'    : d => d.level >= 1   && d.level <= 50,
  'Level 51-100'  : d => d.level >= 51  && d.level <= 100,
  'Level 101-150' : d => d.level >= 101 && d.level <= 150,
  'Level 151-190' : d => d.level >= 151 && d.level <= 190,
  'Level 191-200' : d => d.level >= 191 && d.level <= 200,
};

// Arena Daten
const arenaData = {
  Nahkampf: ['Iop', 'Sacrieur', 'Ecaflip'],
  Mittlere: ['Eniripsa', 'Sadida'],
  Distanz:  ['Xelor', 'Halsabschneider', 'Steamer', 'Sram'],
};

// Alle Commands (für /hilfe, /regeln etc.)
const HELP_COMMANDS = [
  // User
  { name: 'anmelden',            description: 'Meldet dich für das Turnier an.', admin: false },
  { name: 'arena',               description: 'Zufällige Arena-Auswahl.', admin: false },
  { name: 'bracket',             description: 'Zeigt Gruppen, Kämpfe und Übersicht der aktuellen Phase an', admin: false },
  { name: 'hall_of_fame',        description: 'Zeigt vergangene Turniere (Podium).', admin: false },
  { name: 'regeln',              description: 'Zeigt die Turnierregeln.', admin: false },
  { name: 'turnier_info',        description: 'Komplette Turnier-Übersicht (Pott & Status).', admin: false },

  // Admin
  { name: 'ergebnis_setzen',     description: 'Admin: Ergebnis eines Kampfes setzen/korrigieren.', admin: true },
  { name: 'ergebnisse_wuerfeln', description: 'Admin: Zufalls-Ergebnisse für die aktuelle Phase setzen. (Zum Testen)', admin: true },
  { name: 'fake_anmeldungen',    description: 'Admin: Fügt N fiktive Teilnehmer (zum Testen) hinzu.', admin: true },
  { name: 'hof_loeschen',        description: 'Admin: Löscht einen Hall-of-Fame-Eintrag per Turniernummer. (Zum Testen)', admin: true },
  { name: 'pott_setzen',         description: 'Admin: Pott & Aufteilung (Top 3) setzen.', admin: true },
  { name: 'teilnehmer_ersetzen', description: 'Admin: Teilnehmer (ID/Name) auf anderen User umstellen und/oder Klasse/Name ändern.', admin: true },
  { name: 'turnier_advance',     description: 'Admin: Nächste Phase (Quali → Gruppen → KO → Finale) auslösen.', admin: true },
  { name: 'turnier_start',       description: 'Admin: Startet ein Turnier (immer 1v1).', admin: true },
  { name: 'turnier_stop',        description: 'Admin: Beendet das Turnier & leert Daten.', admin: true },
];

// Phasen Labels
const PHASE_LABEL = {
  quali: 'Qualifikation',
  gruppen: 'Gruppenphase',
  ko: 'K.O.-Phase',
  finale: 'Finale'
};

// === Exports ===
module.exports = {
  ALLOWED_KO_SIZES,
  arenaData,
  BOSSE_LISTE,
  DUNGEON_KATEGORIEN,
  DUNGEON_LISTE,
  HELP_COMMANDS,
  KLASSE_LISTE,
  REGION_LISTE,
  PHASE_LABEL,
};