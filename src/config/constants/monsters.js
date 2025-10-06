const { ICON_BASE } = require('./shared');

const MONSTER_LISTE = [
    // === Astrub ===
    // Demonic Rose
    { id: 'demonic_rose',
        name: {
            de: 'Dämonische Rose',
            en: 'Demonic Rose',
            es: '',
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/astrub/fields-of-astrub/demonic_rose.png`,
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
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/astrub/fields-of-astrub/evil_dandelion.png`,
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
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/astrub/fields-of-astrub/mush_mush.png`,
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
            fr: '',
            pt: '',
        },
        imageUrl: `${ICON_BASE}/monster-icons/astrub/fields-of-astrub/wild_sunflower.png`,
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
];

module.exports = { MONSTER_LISTE }