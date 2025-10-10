const { ICON_BASE } = require('./shared');

const MONSTER_LISTE = [
    // === Albuera Archipelago ===
    // ---
    // --- Belladonna Island --- DUNGEON
    // Clobberstone
    { id: 'clobberstone',
        name: {
            de: 'Attackiesel',
            en: 'Clobberstone',
            es: '',
            fr: 'Caillatak',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 11-15,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
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
        imageUrl: `${ICON_BASE}/`,
        level: 11-15,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
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
        imageUrl: `${ICON_BASE}/`,
        level: 11-15,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
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
        imageUrl: `${ICON_BASE}/`,
        level: 11-15,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },

    // === Amakna ===
    // --- Amakna Castle Tunnels --- DUNGEON
        // Rat Bag
        // Rat Basher
        // Rat Pakk
        // Rat Rah
        // Rat Suenami
        // Rat Chet
    // --- Asse Coast ---
        // Crab
        // Mumussel
    // --- Bandit Territory --- DUNGEON
        // Dark Baker
        // Dark Miner
        // Dark Smith
        // Rogue Clan Bandit
    // --- Brouce Boulgoure's Clearing
        // Blue Spimush
        // Brown Spimush
        // Green Spimush
        // Mush Mush
        // Red Spimush
    // --- Bwork Village --- DUNGEON
    // Bwork
    { id: 'bwork',
        name: {
            de: 'Bwork',
            en: 'Bwork',
            es: '',
            fr: 'Bwork',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Bwork Archer
    { id: 'bwork_archer',
        name: {
            de: 'Bwork Bogenschütze',
            en: 'Bwork Archer',
            es: '',
            fr: 'Bwork Archer',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Bwork Magus
    { id: 'bwork_magus',
        name: {
            de: 'Bwork Magus',
            en: 'Bwork Magus',
            es: '',
            fr: 'Bwork Mage',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // --- Crackler Mountain --- DUNGEON DUNGEON DUNGEON
        // Earth Kwak
        // Fire Kwak
        // Ice Kwak
        // Wind Kwak
    // --- Dreggon Tunnels ---
        // Alert Black Dreggon
        // Alert Golden Dreggon
        // Alert Sapphire Dreggon
        // Alert White Dreggon
        // Black Dreggon
        // Golden Dreggon
        // Sapphire Dreggon
        // White Dreggon
        // Immature Black Dreggon
        // Immature Golden Dreggon
        // Immature Sapphire Dreggon
        // Immature White Dreggon
        // Explosive Shell
        // Aeroktor the Warrior
        // Aquabralak the Warrior
        // Ignilicrobur the Warrior
        // Terrakubiack the Warrior
    // --- Dreggon Village ---
        // Alert Black Dreggon
        // Alert Golden Dreggon
        // Alert Sapphire Dreggon
        // Alert White Dreggon
        // Black Dreggon
        // Golden Dreggon
        // Sapphire Dreggon
        // White Dreggon
        // Immature Black Dreggon
        // Immature Golden Dreggon
        // Immature Sapphire Dreggon
        // Immature White Dreggon
        // Explosive Shell
    // --- Edge of the Evil Forest ---
        // Aggressive Arachnee
        // Blue Larva
        // Boar
        // Green Larva
        // Moskito
        // Orange Larva
        // Prespic
        // Treechnid
    // --- Gobball Corner ---
        // Black Gobbly
        // Gobball
        // Gobball War Chief
        // White Gobbly
    // --- Kawaii River ---
        // Crab
    // --- Low Crackler Mountain ---
        // Arachnee
        // Crackler
        // Crackrock
        // Creakrock
        // Plain Crackler
    // --- Madrestam Harbour ---
        // Blue Larva
        // Crab
    // --- Mushd Corner ---
        // Black Gobbly
        // Gobball
        // White Gobbly
        // Mushd
    // --- Mysterious Rift ---
        // Cyclouse
        // Mastifang
        // Sharcut
        // Stapleworm
        // Tremrus
    // --- Passage to Brakmar ---
        // Dark Baker
        // Dark Miner
        // Dark Smith
        // One-Armed Bandit
    // --- Porco Territory --- DUNGEON
        // Dorgan Ation
        // Farle's Pig
        // Pignolia
        // Pignolia
    // --- Scaraleaf Plain --- DUNGEON
    // Black Scaraleaf
    { id: 'black_scaraleaf',
        name: {
            de: 'Schwarzes Scarablatt',
            en: 'Black Scaraleaf',
            es: '',
            fr: 'Scarafeuille Noir',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Blue Scaraleaf
    { id: 'blue_scaraleaf',
        name: {
            de: 'Blaues Scarablatt',
            en: 'Blue Scaraleaf',
            es: '',
            fr: 'Scarafeuille Bleu',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Green Scaraleaf
    { id: 'green_scaraleaf',
        name: {
            de: 'Grünes Scarablatt',
            en: 'Green Scaraleaf',
            es: '',
            fr: 'Scarafeuille Verte',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Red Scaraleaf
    { id: 'red_scaraleaf',
        name: {
            de: 'Rotes Scarablatt',
            en: 'Red Scaraleaf',
            es: '',
            fr: 'Scarafeuille Rouge',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // White Scaraleaf
    { id: 'white_scaraleaf',
        name: {
            de: 'Weißes Scarablatt',
            en: 'White Scaraleaf',
            es: '',
            fr: 'Scarafeuille Blanc',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Immature Scaraleaf
    { id: 'immature_scaraleaf',
        name: {
            de: 'Unreifes Scarablatt',
            en: 'Immature Scaraleaf',
            es: '',
            fr: 'Scarafeuille immature',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
        // Air Spark
        // Earth Spark
        // Fire Spark
        // Water Spark
    // --- Sufokian Gulf Shoreline ---
        // Crab
        // Mumussel
        // Starfish Trooper
    // --- The Amakna Forest ---
        // Aggressive Arachnee
        // Arachnee
        // Black Gobbly
        // Blue Larva
        // Boar
        // Gobball
        // Green Larva
        // Moskito
        // Orange Larva
        // Prespic
        // Snoowolf
        // Treechnid
        // White Gobbly
    // --- The Bwork Camp ---
        // Bwork
        // Bwork Archer
        // Bwork Magus
    // Goblin
    { id: '',
        name: {
            de: '',
            en: '',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
        // Karne Raider
        // Trool
    // --- The Cemetery --- DUNGEON
    // Chafer
    { id: 'chafer',
        name: {
            de: 'Chafer',
            en: 'Chafer',
            es: '',
            fr: 'Chafer',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Chafer Foot Soldier
    { id: 'chafer_foot_soldier',
        name: {
            de: '',
            en: 'chafer_foot_soldier',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Draugur Chafer
    { id: 'draugur_chafer',
        name: {
            de: '',
            en: 'Draugur Chafer',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Evil Tofu
    { id: 'evil_tofu',
        name: {
            de: '',
            en: 'evil_tofu',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Invisible Chafer
    { id: 'invisible_chafer',
        name: {
            de: '',
            en: 'Invisible Chafer',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Kwoan
    { id: 'kwoan',
        name: {
            de: 'Kwoan',
            en: 'Kwoan',
            es: '',
            fr: 'Kwoan',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Primitive Chafer
    { id: 'primitive_chafer',
        name: {
            de: 'Primitiver Chafer',
            en: 'Primitive Chafer',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Rib
    { id: 'rib',
        name: {
            de: 'Ripp',
            en: 'Rib',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // --- The Countryside ---
        // Blue Larva
        // Golden Larva
        // Green Larva
        // Orange Larva
    // --- The Crypts --- 
        // Chafer Archer
        // Chafer Foot Soldier
        // Chafer Lancer
    // Elite Chafer
    { id: 'elite_chafer',
        name: {
            de: 'Elite Chafer',
            en: 'Elite Chafer',
            es: '',
            fr: 'Chafer d\'Élite',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
        // Evil Tofu
        // Grey Mouse
        // Rib
        // Vampire
    // Vampire Master
    { id: 'vampire_master',
        name: {
            de: 'Meister Vampir',
            en: 'Vampire Master',
            es: '',
            fr: 'Maître Vampire',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // --- The Dreggon Peninsula -- 
        // Alert Black Dreggon
        // Alert Golden Dreggon
        // Alert Sapphire Dreggon
        // Alert White Dreggon
        // Black Dreggon
        // Golden Dreggon
        // Sapphire Dreggon
        // White Dreggon
        // Immature Black Dreggon
        // Immature Golden Dreggon
        // Immature Sapphire Dreggon
        // Immature White Dreggon
        // Explosive Shell
    // --- The Dreggons' Sanctuary --- DUNGEON
        // Alert Black Dragoss
        // Alert Golden Dragoss
        // Alert Sapphire Dragoss
        // Alert White Dragoss
        // Dragostess
        // Dreggon Warrior
        // Flying Dreggon
        // Black Dragoss
        // Golden Dragoss
        // Sapphire Dragoss
        // White Dragoss
        // Sauroshell
        // Aerogoburius the Malicious
        // Aqualikros the Merciless
        // Ignirkocropos the Famished
        // Terraburkahl the Perfidious
    // --- The Evil Forest --- DUNGEON
        // Arachmutated
        // Daddy Longlex
        // Gargantula
        // Jumparak
        // Venomica
    // --- Goblin Camp ---
        // Goblin
        // Karne Rider
    // --- The Ingalsses' Fields --- DUNGEON
        // Arachnee
        // Arachnid
        // Blastofu
        // Podgy Tofu
        // Tofubine
        // Tofuzmo
        // Ugly Tofu
    // --- The Jelly Peninsula --- DUNGEON
        // Blue Jelly
        // Lemony Jelly
        // Mint Jelly
        // Strawberry Jelly
    // --- The Milicluster ---
        // Aggressive Arachnee
        // Blue Piwi
        // Boar
        // Green Piwi
        // One-Armed Bandit
        // Pink Piwi
        // Prespic
        // Purple Piwi
        // Red Piwi
        // Snoowolf
        // Yellow Piwi
    // --- The Swamp ---
        // Arachnee
        // Crocodyl
        // Crocodyl Chief
        // Major Arachnee
        // Mushd

    // === Astrub ===
    // --- Astrub Fields ---
    // Dark Rose
    // Demonic Rose
    { id: 'demonic_rose',
        name: {
            de: 'Dämonische Rose',
            en: 'Demonic Rose',
            es: '',
            fr: 'Rose Démoniaque',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 25-33,
        region: 'astrub',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Evil Dandelion
    { id: 'evil_dandelion',
        name: {
            de: 'Teuflischer Löwenzahn',
            en: 'Evil Dandelion',
            es: '',
            fr: 'Pissenlit Diabolique',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 26-34,
        region: 'astrub',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Mush Mush
    { id: 'mush_mush',
        name: {
            de: 'Pilzling',
            en: 'Mush Mush',
            es: '',
            fr: 'Champ Champ',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 24-32,
        region: 'astrub',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Wild Sunflower
    { id: 'wild_sunflower',
        name: {
            de: 'Wilde Sonnenblume',
            en: 'Wild Sunflower',
            es: '',
            fr: 'Tournesol Sauvage',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 27-35,
        region: 'astrub',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // --- Astrub Forest ---
        // Arachnee
        // Astrub Squirrel
        // Grey Mouse
        // Moskito
    // --- Astrub Rocky Inlet --- DUNGEON
        // Blue Snapper - Pichon Bleu
        // Green Snapper - Pichon Verte
        // Orange Snapper - Pichon Orange
        // White Snapper - Pichon Blanc
    // --- Astrub Sewers ---
        // Ratworm Apprentice
        // Sick Arachnee
        // Sick Grossewer Rat
        // Sick Tofu
    // --- Astrub Suburbs ---
        // Blue Piwi
        // Green Piwi
        // Pink Piwi
        // Purple Piwi
        // Red Piwi
        // Yellow Piwi
    // --- Cemetery of Heroes ---
    // Garglyph
    { id: 'garglyph',
        name: {
            de: 'Garglyphe',
            en: 'Garglyph',
            es: '',
            fr: 'Garglyphe',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Gargoyl
    { id: 'gargoyl',
        name: {
            de: 'Gargoyle',
            en: 'Gargoyl',
            es: '',
            fr: 'Gargrouille',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Ouassingal
    { id: '',
        name: {
            de: '',
            en: '',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Ouassingue
    { id: '',
        name: {
            de: '',
            en: '',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: '',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // --- Tainela --- DUNGEON
        // Black Gobbly
        // Gobball
        // Gobball War Chief
        // White Gobbly
    // --- Tofu Corner --- DUNGEON
    // Black Tofu
    { id: 'black_tofu',
        name: {
            de: 'Schwarzer Tofu',
            en: 'Black Tofu',
            es: '',
            fr: 'Tofu Noir',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: 'astrub',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Tofoone
    { id: 'tofoone',
        name: {
            de: 'Tofoone',
            en: 'Tofoone',
            es: '',
            fr: 'Tofoune',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: 'astrub',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Tofu
    { id: 'tofu',
        name: {
            de: 'Tofu',
            en: 'Tofu',
            es: '',
            fr: 'Tofu',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: 'astrub',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Tofukaz
    { id: 'tofukaz',
        name: {
            de: 'Tofukaz',
            en: 'Tofukaz',
            es: '',
            fr: 'Tofukaz',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: 'astrub',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },
    // Tofurby
    { id: 'tofurby',
        name: {
            de: 'Tofurby',
            en: 'Tofurby',
            es: '',
            fr: 'Tofu Ventripotent',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/`,
        level: 0,
        region: 'astrub',
        family: '',
        homeDungeonID: '',
        characteristics: {
            vitality: 0,
            actionPoints: 0,
            movementPoints: 0
        },
        resistances: {
            neutral: 0,
            earth: 0,
            fire: 0,
            water: 0,
            air: 0
        }
    },

    // === Bonta ===
    // --- Bonta Pasture ---
        // Fungi Master
        // Mush Mush
        // Wild Sunflower
    // --- Bonta Sewers --- DUNGEON
        // Grossewer Rat
        // Grossewer Shaman
        // Hyoactive Rat
        // Major Arachnee
        // Sewer Keeper
    
    // === Brakmar ===
    // --- Brakmar City Walls ---
        // Crobak
        // Dark Baker
        // Dark Miner
        // Dark Smith
        // Furious Whitish Fang
    // --- Brakmar Sewers --- DUNGEON
        // Grossewer Rat
        // Grossewer Shaman
        // Hyoactive Rat
        // Major Arachnee
        // Sewer Keeper

    // === Cania Plains ===
    // --- Bonta Cemetery --- DUNGEON
        // Drowhirl
        // Funerbroadsword
        // Micrab
        // Sucgunner
    // --- Bwork Outpost ---
        // Burnabwork
        // Mabwork
        // Megabwork
        // Weirbwork
    // --- Cania Bay ---
        // Blue Snapper
        // Green Snapper
        // Kloon Snapper
        // Orange Snapper
        // White Snapper
        // Crab
        // Raul Mops
        // Starfish Trooper
    // --- Cania Forest ---
        // Bliblimead
        // Bliblitch
        // Blibliternal
        // Bliblycerin
    // --- Cania Massif ---
        // Coco Biblop
        // Indigo Biblop
        // Morello Cherry Biblop
        // Pippin Biblop
        // Coco Blop
        // Indigo Blop
        // Morello Cherry Biblop
        // Pippin Blop
        // Greedoblop
    // --- Coast Road --- DUNGEON DUNGEON
        // Coco Biblop
        // Indigo Biblop
        // Morello Cherry Biblop
        // Pippin Biblop
        // Coco Blop
        // Indigo Blop
        // Morello Cherry Biblop
        // Pippin Blop
    // --- Eltneg Wood ---
        // Boowolf
        // Mature Kaniger
        // Miliboowolf
        // Trool
    // --- Kanig Territory --- DUNGEON
        // Alyeena
        // Felygiene
        // Kannihilator
        // Orfan
    // --- Lousy Pig Plain ---
        // Lousy Pig Knight
        // Lousy Pig Shepherd
        // Piglet
        // Plain Boar
    // --- Minerock Plains --- DUNGEON
        // Crackblade
        // Cracklerge
        // Cracklope
        // Elemearth
    // --- Mount Neselite --- DUNGEON
        // Breakrock Knight
        // Knockarock
        // Leatheraxer
        // Yobbomark Knight
        // Yobreaker
    // --- Road to Brakmar --- DUNGEON
        // Boowolf
        // Mature Kaniger
        // Miliboowolf
        // Trool
    // --- Rocky Road ---
        // Coco Biblop
        // Indigo Biblop
        // Morello Cherry Biblop
        // Pippin Biblop
        // Coco Blop
        // Indigo Blop
        // Morello Cherry Biblop
        // Pippin Blop
        // Trunkiblop
        // Plain Crackler
    // --- Scree ---
        // Blopshroom
        // Coco Blop
        // Indigo Blop
        // Morello Cherry Blop
        // Pippin Blop
        // Plain Crackler
    // --- The Cania Fields ---
        // Beaztinga
        // Fungi Master
        // Kaniger
        // Plains Larva
    // --- The Crow's Domain --- DUNGEON
        // Crovus
        // Crowfox
        // Drinker
        // Tamed Crobak
    
    // === Dopple Territory ===
];

module.exports = { MONSTER_LISTE }