// Formatiert Challenges
function formatChallengeEntity(value, locale) {
    if (Array.isArray(value)) {
        return value
            .map(item => formatChallengeEntity(item, locale))
            .filter(Boolean)
            .join(', ');
    }
    if (value && typeof value === 'object') {
        if (typeof value.label === 'string') return value.label;
        if (typeof value.name === 'string') return value.name;
        if (value.name && typeof value.name === 'object') {
            if (locale && value.name[locale]) return value.name[locale];
            const anyLocale = Object.values(value.name).find(Boolean);
            if (anyLocale) return anyLocale;
        }
        if (value.id) return formatChallengeEntity(value.id, locale);
        const parts = Object.values(value)
            .map(item => formatChallengeEntity(item, locale))
            .filter(Boolean);
        return parts.join(', ');
    }
    return value || '';
}

// Alle Challenges
const CHALLENGES = [
    {   id: 'barbaric',
        name: {
            de: 'Barbar',
            en: 'Barbaric',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Besiege Monster nur mit Waffen.',
            en: 'Allied characters must finish off enemies with a weapon.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'blitzkrieg',
        name: {
            de: 'Blitzangriff',
            en: 'Blitzkrieg',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Sobald ein Gegner angegriffen wird, muss dieser besiegt werden, bevor er dran ist.',
            en: 'When an enemy is attacked, they must be finished off before they start their turn.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'chrono',
        name: {
            de: 'Die Zeit läuft',
            en: 'Chrono',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: ({ turns }) => `Beende den Kampf in weniger als ${turns} Runden.`,
            en: ({ turns }) => `Finish the fight in under ${turns} turns.`,
            es: '',
            fr: '',
            pt: ''
        },
        defaults: { turns: 10 }
    },
    {   id: 'clean_hands',
        name: {
            de: 'Weiße Weste',
            en: 'Clean Hands',
            es: '',
            fr: 'Mains Propres',
            pt: ''
        },
        description: {
            de: 'Die Gegner müssen während des Kampfes erledigt werden, ohne ihnen direkten Schaden zuzufügen. Glyphen, Gift, Fallen, Stoßschaden, das Zurückwerfen von Schaden und Zaubern und Angriffe durch beschworene Wesen können demnach dazu verwendet werden.',
            en: 'Allied characters must finish off enemies without inflicting direct damage on them. Traps, glyphs, poisons, pushback damage, reflected damage and damage inflicted by summons may all be used.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'contract_killer',
        name: {
            de: 'Auftragskiller',
            en: 'Contract Killer',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Die Gegner müssen in bestimmter Reihenfolge besiegt werden. Sobald ein Ziel besiegt wurde, wird ein neues Ziel angezeigt.',
            en: 'Enemies must be killed in the designated order. A new enemy is designated each time the previous enemy is killed.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'duel',
        name: {
            de: 'Duell',
            en: 'Duel',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Wenn ein Charakter einen Gegner angreift, darf während des ganzen Kampfes kein anderer Charakter diesen Gegner angreifen.',
            en: 'When an allied fighter attacks an enemy, no other allied fighter must attack that enemy for the duration of the fight.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'duo',
        name: {
            de: 'Duo',
            en: 'Duo',
            es: 'Duo',
            fr: 'Duo',
            pt: 'Duo'
        },
        description: {
            de: ({ bossName, bossID, dungeonName, dungeonID, turns }) => {
                const boss = formatChallengeEntity(bossName, 'de') || formatChallengeEntity(bossID, 'de') || 'den Boss';
                const dungeon = formatChallengeEntity(dungeonName, 'de') || formatChallengeEntity(dungeonID, 'de') || 'dem Dungeon';
                return `Besiege ${boss} mit maximal 2 Charakteren und in weniger als ${turns} Runden im ${dungeon}.`;
            },
            en: ({ bossName, bossID, dungeonName, dungeonID, turns }) => {
                const boss = formatChallengeEntity(bossName, 'en') || formatChallengeEntity(bossID, 'en') || 'the boss';
                const dungeon = formatChallengeEntity(dungeonName, 'en') || formatChallengeEntity(dungeonID, 'en') || 'the dungeon';
                return `Defeat ${boss} with at most 2 characters and in fewer than ${turns} turns in ${dungeon}.`;
            },
            es: ({ bossName, bossID, dungeonName, dungeonID, turns }) => {
                const boss = formatChallengeEntity(bossName, 'en') || formatChallengeEntity(bossID, 'en') || 'the boss';
                const dungeon = formatChallengeEntity(dungeonName, 'en') || formatChallengeEntity(dungeonID, 'en') || 'the dungeon';
                return `Defeat ${boss} with at most 2 characters and in fewer than ${turns} turns in ${dungeon}.`;
            },
            fr: ({ bossName, bossID, dungeonName, dungeonID, turns }) => {
                const boss = formatChallengeEntity(bossName, 'en') || formatChallengeEntity(bossID, 'en') || 'the boss';
                const dungeon = formatChallengeEntity(dungeonName, 'en') || formatChallengeEntity(dungeonID, 'en') || 'the dungeon';
                return `Defeat ${boss} with at most 2 characters and in fewer than ${turns} turns in ${dungeon}.`;
            },
            pt: ({ bossName, bossID, dungeonName, dungeonID, turns }) => {
                const boss = formatChallengeEntity(bossName, 'en') || formatChallengeEntity(bossID, 'en') || 'the boss';
                const dungeon = formatChallengeEntity(dungeonName, 'en') || formatChallengeEntity(dungeonID, 'en') || 'the dungeon';
                return `Defeat ${boss} with at most 2 characters and in fewer than ${turns} turns in ${dungeon}.`;
            }
        },
        defaults: { turns: 20 }
    },
    {   id: 'elemental',
        name: {
            de: 'Elementar',
            en: 'Elemental',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Während des Kampfes darf bei Angriffen immer nur das gleiche Element benutzt werden.',
            en: 'When an allied fighter inflicts damage in a certain element, they must only use that attack element for the duration of the fight.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'elitist',
        name: {
            de: 'Elitär',
            en: 'Elitist',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Alle Angriffe müssen auf das ausgewählte Ziel konzentriert werden, bis es besiegt wurde.',
            en: 'All attacks must be focused on the designated target until it dies.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'exuberant',
        name: {
            de: '',
            en: 'Exuberant',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: '',
            en: 'Use all of your AP before the end of your turn.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'fainthearted',
        name: {
            de: 'Zaghaft',
            en: 'Fainthearted',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Seine Runde niemals auf dem benachbarten Feld eines Gegners beenden.',
            en: 'Allied fighters must never finish their turn on a cell adjacent to an enemy.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'first',
        name: {
            de: 'Als Erstes', // Zielstrebigkeit
            en: 'First',
            es: '',
            fr: 'Premier',
            pt: ''
        },
        description: {
            de: ({ targetName }) => formatChallengeEntity(targetName, 'de')
                ? `Besiege ${formatChallengeEntity(targetName, 'de')} als Erstes.`
                : 'Besiege das ausgewählte Monster als Erstes.',
            en: ({ targetName }) => formatChallengeEntity(targetName, 'en')
                ? `Defeat ${formatChallengeEntity(targetName, 'en')} first.`
                : 'Defeat the designated monster first.',
            es: ({ targetName }) => formatChallengeEntity(targetName, 'es')
                ? `Derrota primero a ${formatChallengeEntity(targetName, 'es')}.`
                : '',
            fr: ({ targetName }) => formatChallengeEntity(targetName, 'fr')
                ? `Vaincre ${formatChallengeEntity(targetName, 'fr')} en premier.`
                : '',
            pt: ({ targetName }) => formatChallengeEntity(targetName, 'pt')
                ? `Derrote ${formatChallengeEntity(targetName, 'pt')} primeiro.`
                : ''
        }
    },
    {   id: 'freedom',
        name: {
            de: 'Freiheit',
            en: 'Freedom',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Reduziere weder die BP noch die Reichweite von Monstern.',
            en: 'Don\'t reduce monsters\' MP or range.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'focus',
        name: {
            de: 'Fokus',
            en: 'Focus',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Wird ein Gegner angegriffen, muss er besiegt werden, bevor ein anderer Gegner angegriffen werden kann.',
            en: 'Once an enemy has been attacked by an ally, it must be finished off before any other enemy is attacked.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'hermit',
        name: {
            de: 'Einsiedler',
            en: 'Hermit',
            es: '',
            fr: 'Anachorète',
            pt: ''
        },
        description: {
            de: 'Die eigene Runde darf nie auf dem benachbarten Feld eines Verbündeten beendet werden.',
            en: '',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'impertinence',
        name: {
            de: 'Gewagt',
            en: 'Impertinence',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Die eigene Runde muss auf dem benachbarten Feld eines Gegners beendet werden.',
            en: 'Allied fighters must end their turn on a cell adjacent to an enemy.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'incurable',
        name: {
            de: 'Unheilbarkeit',
            en: 'Incurable',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Keine direkte Heilung erlaubt',
            en: '',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'keep_moving',
        name: {
            de: 'Bewegung, Bewegung',
            en: 'Keep Moving',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Während des Kampfes dürfen Gegnern keine BP entzogen werden.',
            en: '',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'last',
        name: {
            de: 'Als Letztes', // Aufschub
            en: 'Last',
            es: '',
            fr: 'Dernier',
            pt: ''
        },
        description: {
            de: ({ targetName }) => formatChallengeEntity(targetName, 'de')
                ? `Besiege ${formatChallengeEntity(targetName, 'de')} als Letztes.`
                : 'Besiege das ausgewählte Monster als Letztes.',
            en: ({ targetName }) => formatChallengeEntity(targetName, 'en')
                ? `Defeat ${formatChallengeEntity(targetName, 'en')} last.`
                : 'Defeat the designated monster last.',
            es: ({ targetName }) => formatChallengeEntity(targetName, 'es')
                ? `Derrota a ${formatChallengeEntity(targetName, 'es')} al final.`
                : '',
            fr: ({ targetName }) => formatChallengeEntity(targetName, 'fr')
                ? `Vaincre ${formatChallengeEntity(targetName, 'fr')} en dernier.`
                : '',
            pt: ({ targetName }) => formatChallengeEntity(targetName, 'pt')
                ? `Derrote ${formatChallengeEntity(targetName, 'pt')} por último.`
                : ''
        }
    },
    {   id: 'low_levels_first',
        name: {
            de: '',
            en: 'Low Levels First',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: '',
            en: 'The fighter(s) with the lowest level must finish off all enemies.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'mystique',
        name: {
            de: 'Mystiker',
            en: 'Mystique',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Im gesamten Kampf dürfen nur Zaubersprüche verwendet werden.',
            en: '',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'nomad',
        name: {
            de: 'Nomade',
            en: 'Nomad',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Pro Runde müssen alle BP eingesetzt werden.',
            en: 'Allied fighters must use all of their Movement Points every turn for the duration of the fight.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'no_rush',
        name: {
            de: 'Ohne Eile',
            en: 'No Rush',
            es: '',
            fr: 'Sans se presser',
            pt: ''
        },
        description: {
            de: 'Verwende nicht all deine BP.',
            en: 'Don\'t use all of your MP.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'quick_and_furious',
        name: {
            de: 'Schnell und Wütend',
            en: 'Quick and Furious',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Sobald ein Monster angegriffen wird, muss es innerhalb von drei Zügen besiegt werden.',
            en: 'As soon as a monster is attacked, it must be finished in three turns or less.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'scanty',
        name: {
            de: 'Wirtschaftlichkeit',
            en: 'Scanty',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Alle Charaktere dürfen im Verlauf des Kampfes jede Aktion nur insgesamt 1x durchführen.',
            en: 'Allied fighters must not use the same action more than once for the duration of the fight.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'sharing',
        name: {
            de: 'Teilen',
            en: 'Sharing',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: '',
            en: 'Each allied fighter must have finished off at least one enemy fighter during the fight.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'statue',
        name: {
            de: 'Statue',
            en: 'Statue',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Jede Runde muss auf dem Anfangsfeld beendet werden und das während der gesamten Kampfzeit.',
            en: 'Allied fighters must finish every turn on the same cell that they started on, for the duration of the fight.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'survivor',
        name: {
            de: 'Überlebender',
            en: 'Survivor',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Kein Verbündeter darf sterben.',
            en: 'No ally must die.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'tight',
        name: {
            de: 'Anhängsel',
            en: 'Tight',
            es: '',
            fr: 'Collant',
            pt: ''
        },
        description: {
            de: 'Die eigene Runde muss auf dem benachbarten Feld eines Verbündeten beendet werden.',
            en: 'Allied fighters must end their turn on a cell adjacent to another allied fighter.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'time_flies',
        name: {
            de: 'Die Zeit rennt',
            en: 'Time Flies',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Während des Kampfes darf nicht versucht werden, Gegnern AP zu entziehen.',
            en: '',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'two_for_the_price_of_one',
        name: {
            de: 'Zwei zum Preis von einem',
            en: 'Two for the price of one',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Wenn ein Charakter einen Gegner besiegt, muss er unbedingt einen (und nur einen) zweiten Gegner während seiner Runde besiegen.',
            en: 'When an allied fighter finishes off an enemy, they must also finish off one (and only one) additional enemy during their turn.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'uncurable',
        name: {
            de: 'Unheilbarkeit',
            en: 'Uncurable',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Charaktere dürfen keine Lebens- oder Schildpunkte verlieren.',
            en: 'Characters must not lose any health or shield points.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'unpredictable',
        name: {
            de: 'Unvorsehbar',
            en: 'Unpredictable',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: '',
            en: 'All attacks by allies must be focused on the designated enemy at the start of each round or when the previous enemy is killed.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'untouchable',
        name: {
            de: 'Unberührbarkeit',
            en: 'Untouchable',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Charaktere dürfen keine Lebens- oder Schildpunkte verlieren.',
            en: 'Characters must not lose any health or shield points.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'versatile',
        name: {
            de: 'Vielseitigkeit',
            en: 'Versatile',
            es: '',
            fr: 'Versatile',
            pt: ''
        },
        description: {
            de: 'Alle Charaktere dürfen jede Aktion nur 1x pro Runde durchführen.',
            en: 'Allied fighters must not use the same action more than once on each of their turns.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'zombie',
        name: {
            de: 'Zombie',
            en: 'Zombie',
            es: '',
            fr: 'Zombie',
            pt: ''
        },
        description: {
            de: 'Verwende pro Zug genau 1 BP. Der Verlust von Bewegungspunkten durch ausweichen lässt die Challenge nicht fehlschlagen.',
            en: 'Allied fighters must use exactly one Movement Point per turn. Losing Movement Points by unlocking [dodging] will not cause you to fail the challenge.',
            es: '',
            fr: '',
            pt: ''
        }
    },
];

function normalizeChallengeId(id) {
    return String(id || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_');
}

const CHALLENGE_MAP = new Map();
for (const challenge of CHALLENGES) {
    CHALLENGE_MAP.set(challenge.id, challenge);
    CHALLENGE_MAP.set(normalizeChallengeId(challenge.id), challenge);
}

function getChallengeDefinition(id) {
    if (!id) return undefined;
    return CHALLENGE_MAP.get(normalizeChallengeId(id));
}

function cloneLocalizedMap(map) {
    if (!map) return undefined;
    const clone = {};
    for (const [locale, value] of Object.entries(map)) {
        clone[locale] = value;
    }
    return clone;
}

function createChallenge(id, overrides = {}, context = {}) {
    const definition = getChallengeDefinition(id);
    if (!definition) return null;

    const params = { ...(definition.defaults || {}), ...(overrides || {}) };

    return {
        id: definition.id,
        name: cloneLocalizedMap(definition.name),
        description: cloneLocalizedMap(definition.description),
        defaults: definition.defaults ? { ...definition.defaults } : undefined,
        params,
        context,
    };
}

CHALLENGES.normalizeId = normalizeChallengeId;
CHALLENGES.get = getChallengeDefinition;
CHALLENGES.create = createChallenge;
CHALLENGES.challenge = createChallenge;
CHALLENGES.map = CHALLENGE_MAP;

module.exports = CHALLENGES;
module.exports.normalizeChallengeId = normalizeChallengeId;
module.exports.getChallengeDefinition = getChallengeDefinition;
module.exports.createChallenge = createChallenge;