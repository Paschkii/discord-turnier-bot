const { ICON_BASE } = require('./shared');

const MONSTER_LISTE = [
    // === Albuera Creatures ===
    // --- Beach Creatures ---
        // Aggressive Merkaptan
    // --- Belladonna Creatures --- DUNGEON
    // Clobberstone
    { id: 'clobberstone',
        name: {
            de: 'Attackiesel',
            en: 'Clobberstone',
            es: '',
            fr: 'Caillatak',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/albuera-creatures/belladonnas-creatures/clobberstone.png`,
    },
    // Dolomanus
    { id: 'dolomanus',
        name: {
            de: 'Handlomit',
            en: 'Dolomanus',
            es: '',
            fr: 'Dolomain',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/albuera-creatures/belladonnas-creatures/dolomanus.png`,
    },
    // Marbmour
    { id: 'marbmour',
        name: {
            de: 'Rüstarmor',
            en: 'Marbmour',
            es: '',
            fr: 'Marbmure',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/albuera-creatures/belladonnas-creatures/marbmour.png`,
    },
    // Ragnarock
    { id: 'ragnarock',
        name: {
            de: 'Ragnarocken',
            en: 'Ragnarock',
            es: '',
            fr: 'Ragnaroche',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/albuera-creatures/belladonnas-creatures/ragnarock.png`,
    },

    // === Ascension Island ===
    // --- Dodus ---
    // Dokachu
    { id: 'dokachu',
        name: {
            de: 'Dokachu',
            en: 'Dokachu',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/dodus/dokachu.png`,
    },
    // Dolbinos
    { id: 'dolbinos',
        name: {
            de: '',
            en: 'Dolbinos',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/dodus/dolbinos.png`,
    },
    // Dolivar
    { id: 'dolivar',
        name: {
            de: '',
            en: 'Dolivar',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/dodus/dolivar.png`,
    },
    // Dostrogo
    { id: 'dostrogo',
        name: {
            de: '',
            en: 'Dostrogo',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/dodus/dostrogo.png`,
    },
    // --- Riftworms ---
    // Cyclouse
    { id: 'cyclouse',
        name: {
            de: '',
            en: 'Cyclouse',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/riftworms/cyclouse.png`,
    },
    // Mastifang
    { id: 'mastifang',
        name: {
            de: '',
            en: 'Mastifang',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/riftworms/mastifang.png`,
    },
    // Sharcut
    { id: 'sharcut',
        name: {
            de: '',
            en: 'Sharcut',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/riftworms/sharcut.png`,
    },
    // Stapleworm
    { id: 'stapleworm',
        name: {
            de: '',
            en: 'Stapleworm',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/riftworms/stapleworm.png`,
    },
    // Tremrus
    { id: 'tremrus',
        name: {
            de: '',
            en: 'Tremrus',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/riftworms/tremrus.png`,
    },
    // --- Scaly ---
    // Anchodyl
    { id: 'anchodyl',
        name: {
            de: '',
            en: 'Anchodyl',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/scaly/anchodyl.png`,
    },
    // Crocelmet
    { id: 'crocelmet',
        name: {
            de: '',
            en: 'Crocelmet',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/scaly/crocelmet.png`,
    },
    // Croclingy
    { id: 'croclingy',
        name: {
            de: '',
            en: 'Croclingy',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/scaly/croclingy.png`,
    },
    // Crocopike
    { id: 'crocopike',
        name: {
            de: '',
            en: 'Crocopike',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/scaly/crocopike.png`,
    },
    // Crokveeno
    { id: 'crokveeno',
        name: {
            de: '',
            en: 'Crokveeno',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/scaly/crokveeno.png`,
    },
    // Feathodyl
    { id: 'feathodyl',
        name: {
            de: '',
            en: 'Feathodyl',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/scaly/feathodyl.png`,
    },
    // --- Shushus ---
    // Shuchu
    { id: 'shuchu',
        name: {
            de: '',
            en: 'Shuchu',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/shushus/shuchu.png`,
    },
    // Shushkebab
    { id: 'shushkebab',
        name: {
            de: '',
            en: 'Shushkebab',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/shushus/shushkebab.png`,
    },
    // Shushuaia
    { id: 'shushuaia',
        name: {
            de: '',
            en: 'Shushuaia',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/shushus/shushuaia.png`,
    },
    // Shushlicker - Air
    { id: 'shushlicker_air',
        name: {
            de: '',
            en: 'Shushlicker (Air)',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/shushus/shushlicker_air.png`,
    },
    // Shushlicker - Fire
    { id: 'shushlicker_fire',
        name: {
            de: '',
            en: 'Shushlicker (Fire)',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/shushus/shushlicker_fire.png`,
    },
    // Shushlicker - Water
    { id: 'shushlicker_water',
        name: {
            de: '',
            en: 'Shushlicker (Water)',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/ascension-island/shushus/shushlicker_water.png`,
    },

    // === Beach Creatures ===
    // --- Beach Monsters ---
    // Blue Snapper
    { id: 'blue_snapper',
        name: {
            de: '',
            en: 'Blue Snapper',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/beach-creatures/beach-monsters/blue_snapper.png`,
    },
    // Green Snapper
    { id: 'green_snapper',
        name: {
            de: '',
            en: 'Green Snapper',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/beach-creatures/beach-monsters/green_snapper.png`,
    },
    // Kloon Snapper
    { id: 'kloon_snapper',
        name: {
            de: '',
            en: 'Kloon Snapper',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/beach-creatures/beach-monsters/kloon_snapper.png`,
    },
    // Orange Snapper
    { id: 'orange_snapper',
        name: {
            de: '',
            en: 'Orange Snapper',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/beach-creatures/beach-monsters/orange_snapper.png`,
    },
    // White Snapper
    { id: 'white_snapper',
        name: {
            de: '',
            en: 'White Snapper',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/beach-creatures/beach-monsters/white_snapper.png`,
    },
    // Crab
    { id: 'crab',
        name: {
            de: '',
            en: 'Crab',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/beach-creatures/beach-monsters/crab.png`,
    },
    // Mumussel
    { id: 'mumussel',
        name: {
            de: '',
            en: 'Mumussel',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/beach-creatures/beach-monsters/mumussel.png`,
    },
    // Raul Mops
    { id: 'raul_mops',
        name: {
            de: '',
            en: 'Raul Mops',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/beach-creatures/beach-monsters/raul_mops.png`,
    },
    // Starfish Trooper
    { id: 'starfish_trooper',
        name: {
            de: '',
            en: 'Starfish Trooper',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/beach-creatures/beach-monsters/starfish_trooper.png`,
    },

    // === Breeder Village Creatures ===
    // --- Cave Minsters ---
    // Cave Gobball
    { id: 'cave_gobball',
        name: {
            de: '',
            en: 'Cave Gobball',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/cave-monsters/cave_gobball.png`,
    },
    // Gobkool
    { id: 'gobkool',
        name: {
            de: '',
            en: 'Gobkool',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/cave-monsters/gobkool.png`,
    },
    // Diamondine
    { id: 'diamondine',
        name: {
            de: '',
            en: 'Diamondine',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/cave-monsters/diamondine.png`,
    },
    // Emeralda
    { id: 'emeralda',
        name: {
            de: '',
            en: 'Emeralda',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/cave-monsters/emeralda.png`,
    },
    // Ruby
    { id: 'ruby',
        name: {
            de: '',
            en: 'Ruby',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/cave-monsters/ruby.png`,
    },
    // Sapphira
    { id: 'sapphira',
        name: {
            de: '',
            en: 'Sapphira',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/cave-monsters/sapphira.png`,
    },
    // Emerald Doll
    { id: 'emerald_doll',
        name: {
            de: '',
            en: 'Emerald Doll',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/cave-monsters/emerald_doll.png`,
    },
    // Lethal Doll
    { id: 'lethal_doll',
        name: {
            de: '',
            en: 'Lethal Doll',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/cave-monsters/lethal_doll.png`,
    },
    // Starving Doll
    { id: 'starving_doll',
        name: {
            de: '',
            en: 'Starving Doll',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/cave-monsters/starving_doll.png`,
    },
    // Explosive Totem
    { id: 'explosive_totem',
        name: {
            de: '',
            en: 'Explosive Totem',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/cave-monsters/explosive_totem.png`,
    },
    // Healing Totem
    { id: 'healing_totem',
        name: {
            de: '',
            en: 'Healing Totem',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/cave-monsters/healing_totem.png`,
    },
    // Motivating Totem
    { id: 'motivating_totem',
        name: {
            de: '',
            en: 'Motivating Totem',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/cave-monsters/motivating_totem.png`,
    },

    // --- Koalaks ---
    // Bloody Koalak
    { id: 'bloody_koalak',
        name: {
            de: '',
            en: 'Bloody Koalak',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/koalaks/bloody_koalak.png`,
    },
    // Brown Warko
    { id: 'brown_warko',
        name: {
            de: '',
            en: 'Brown Warko',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/koalaks/brown_warko.png`,
    },
    // Coco Koalak
    { id: 'coco_koalak',
        name: {
            de: '',
            en: 'Coco Koalak',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/koalaks/coco_koalak.png`,
    },
    // Dok Alako
    { id: 'dok_alako',
        name: {
            de: '',
            en: 'Dok Alako',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/koalaks/dok_alako.png`,
    },
    // Drakoalak
    { id: 'drakoalak',
        name: {
            de: '',
            en: 'Drakoalak',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/koalaks/drakoalak.png`,
    },
    // Fisheralak
    { id: 'fisheralak',
        name: {
            de: '',
            en: 'Fisheralak',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/koalaks/fisheralak.png`,
    },
    // Immature Koalak
    { id: 'immature_koalak',
        name: {
            de: '',
            en: 'Immature Koalak',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/koalaks/immature_koalak.png`,
    },
    // Indigo Koalak
    { id: 'indigo_koalak',
        name: {
            de: '',
            en: 'Indigo Koalak',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/koalaks/indigo_koalak.png`,
    },
    // Koalak Forester
    { id: '',
        name: {
            de: '',
            en: '',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/breeder-village-creatures/koalaks/.png`,
    },
    // Koalak Gravedigger
    // Koalak Master
    // Koalak Mummy
    // Koalak Rider
    // Koalak Warrior
    // Mama Koalak
    // Morello Cherry Koalak
    // Pippin Koalak
    // Piralak
    // Purple Warko
    // Reapalak
    // Wild Koalak
    // Workette

    // === Cania Plains Creatures ===
    // --- Bliblis ---
    // --- Blops ---
    // --- Boowolves ---
    // --- Bworkventurers ---
    // --- Crobaks ---
    // --- Hard Head Stubbyobs ---
    // --- Kanigs ---
    // --- Lousy Pigs ---
    // --- Minerocks ---
    // --- Pilfielderers ---
    // --- Undried ---

    // === City Creatures ===
    // --- Piwis ---
    // --- Sewer Monsters ---

    // === Field Creatures ===
    // --- Field Plants ---
    // --- Fields ---
    // --- Fungi ---
    // --- Gobballs ---
    // --- Larvae ---
    // --- Moskitos ---
    // --- Tofus ---

    // === Forest Creatures ===
    // --- Arachnees ---
    // --- Arak-Hai ---
    // --- Dreggons ---
    // --- Forest Animals ---
    // --- Jellies ---
    // --- Scaraleaves ---
    // --- Treechnidians ---

    // === Frigost Creatures ===
    // --- Alchimeras ---
    // --- Almas Cradle Monsters ---
    // --- Armarines ---
    // --- Bearbarians ---
    // --- Fangs of Glass Monsters ---
    // --- Frigost Village Monsters ---
    // --- Leatherbods ---
    // --- Lonesome Pinetrails Monsters ---
    // --- Mastogobs ---
    // --- Mechaniacs ---
    // --- Petrified Forest Monsters ---
    // --- Pingwins ---
    // --- Sakai Monsters ---
    // --- Sinistros ---
    // --- Snowfoux ---
    // --- Tears of Ouronigride Monsters ---

    // === Humanoid Creatures ===
    // --- Bandits ---
    // --- Guards ---
    // --- Imps ---
    // --- NPCS ---

    // === Kwismas Island Creatures ===
    // --- Kwismas Monsters ---

    // === Lair Guardians ===

    // === Minotoror Island Creatures ===
    // --- Minos ---

    // === Moon Island Creatures ===
    // --- Moon Island Kanniballs ---
    // --- Moon Monsters ---
    // --- Moon Pirates ---
    // --- Moon Plants ---
    // --- Moon Turtles ---

    // === Moor Creatures ===
    // --- Moor Monsters ---

    // === Mountain Creatures ===
    // --- Bworks ---
    // --- Ctacklers ---
    // --- Dragoturkeys ---
    // --- Goblins ---
    // --- Kwaks ---
    // --- Pigs ---

    // === Night Creatures ===
    // --- Al Howins Monsters ---
    // --- Chafers ---
    // --- Ghosts ---
    // --- Ghouls ---
    // --- Night Monsters ---
    // --- Pet Ghosts ---

    // === Otomai Island Creatures ===
    // --- Coral Beach Monsters ---
    // --- Dark Jungle Monsters ---
    // --- Grassy Plains Monsters ---
    // --- Otomais Ark Monsters ---
    // --- Peat Bog Monsters ---
    // --- Tree Keeholo Monsters ---
    // --- Zoth Village Monsters ---

    // === Pandala Creatures ===
    // --- Firefoux ---
    // --- Khorundrums ---
    // --- Kozaru ---
    // --- Kwapa ---
    // --- Lost Souls ---
    // --- Plantalas ---
    // --- Tanukis ---

    // === Swamp Creatures ===
    // --- Crocodylls ---
    // --- Swamp Monsters ---

    // === Wabbit Island Creatures ===
    // --- Wabbits ---
];

module.exports = { MONSTER_LISTE };