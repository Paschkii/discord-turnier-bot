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

// All Challenges
const CHALLENGES = [
    {   id: 'barbaric',
        name: {
            de: 'Barbar',
            en: 'Barbaric',
            es: 'Bárbaro',
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
            es: 'Blitzkrieg',
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
            es: 'Crono',
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
            es: 'Manos Limpias',
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
    {   id: 'cruel',
        name: {
            de: '',
            en: 'Cruel',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: '',
            en: 'You must kill your enemies according to their levels in ascending order.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'duel',
        name: {
            de: 'Duell',
            en: 'Duel',
            es: 'Duelo',
            fr: 'Duel',
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
            es: 'Dúo',
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
            es: 'Pusilánime',
            fr: 'Pusillanime',
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
            en: 'First', // Unwilling Volunteer
            es: 'Primera Posición',
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
    {   id: 'foresighted',
        name: {
            de: 'Vorausschauend',
            en: 'Foresighted',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: '',
            en: 'Never use all available action points during your turn.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'freedom',
        name: {
            de: 'Freiheit',
            en: 'Freedom',
            es: 'Libertad',
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
    {   id: 'gangster',
        name: {
            de: 'Gangster',
            en: 'Gangster',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: '',
            en: 'Cast the Dirty Trick spell every time the spell is available throughout the entire fight.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'hermit',
        name: {
            de: 'Einsiedler',
            en: 'Hermit',
            es: 'Anacoreta',
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
            es: 'Audaz',
            fr: 'Hardi',
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
            es: 'Circulen',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Während des Kampfes dürfen Gegnern keine BP entzogen werden.',
            en: '',
            es: '',
            fr: 'Durant un combat, les MP des adversaires ne peuvent pas être déduits.',
            pt: ''
        }
    },
    {   id: 'last',
        name: {
            de: 'Als Letztes', // Aufschub
            en: 'Last', // Reprieve
            es: 'Última Posicón',
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
            fr: 'Le ou les combattants de niveau le plus bas doivent éliminer tous les ennemis.',
            pt: ''
        }
    },
    {   id: 'maniac',
        name: {
            de: '',
            en: 'Maniac',
            es: '',
            fr: 'Maniaque',
            pt: ''
        },
        description: {
            de: 'Gegner müssen entsprechend der absteigenden Reihenfolge ihrer Level besiegt werden.',
            en: 'Enemies must be killed according to the descending order of their levels.',
            es: '',
            fr: 'Les ennemis doivent être tués dans l\'ordre décroissant de leur niveau.',
            pt: ''
        }
    },
    {   id: 'mystique',
        name: {
            de: 'Mystiker',
            en: 'Mystique',
            es: 'Mistico',
            fr: 'Mystique',
            pt: ''
        },
        description: {
            de: 'Im gesamten Kampf dürfen nur Zaubersprüche verwendet werden.',
            en: 'For the duration of the fight you must only use spells.',
            es: '',
            fr: 'Seuls les sorts magiques peuvent être utilisés durant toute la bataille.',
            pt: ''
        }
    },
    {   id: 'nomad',
        name: {
            de: 'Nomade',
            en: 'Nomad',
            es: 'Nómada',
            fr: 'Nomade',
            pt: ''
        },
        description: {
            de: 'Pro Runde müssen alle BP eingesetzt werden.',
            en: 'Allied fighters must use all of their Movement Points every turn for the duration of the fight.',
            es: '',
            fr: 'Allier doit utiliser tous ses Points de Mouvement à chaque tour pendant toute la durée du combat.',
            pt: 'Aliado deve usar todos os seus Pontos de Movimento a cada turno durante toda a luta.'
        }
    },
    {   id: 'no_rush',
        name: {
            de: 'Ohne Eile',
            en: 'No Rush',
            es: 'Sin Prisas',
            fr: 'Sans se presser',
            pt: ''
        },
        description: {
            de: 'Verwende nicht all deine BP.',
            en: 'Don\'t use all of your MP.',
            es: 'Non utilices todos tus PM.',
            fr: 'Ne utilisez pas tous vos PM.',
            pt: 'No utilize todos os seus PM.'
        }
    },
    {   id: 'quick_and_furious',
        name: {
            de: 'Schnell und Wütend',
            en: 'Quick and Furious',
            es: 'Rápido y furioso',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Sobald ein Monster angegriffen wird, muss es innerhalb von drei Zügen besiegt werden.',
            en: 'As soon as a monster is attacked, it must be finished in three turns or less.',
            es: 'Dèspues de que un monstruo sea atacado, debe ser derrotado en tres turnos o menos.',
            fr: 'Dès qu\'un monstre est attaqué, il doit être vaincu en trois tours ou moins.',
            pt: 'Des pois de um monstro ser atacado, deve ser derrotado em três turnos ou menos.'
        }
    },
    {   id: 'scanty',
        name: {
            de: 'Wirtschaftlichkeit',
            en: 'Scanty',
            es: 'Económico',
            fr: 'Économe',
            pt: ''
        },
        description: {
            de: 'Alle Charaktere dürfen im Verlauf des Kampfes jede Aktion nur insgesamt 1x durchführen.',
            en: 'Allied fighters must not use the same action more than once for the duration of the fight.',
            es: 'Todos los aliados no deben usar la misma acción más de una vez durante toda la pelea.',
            fr: 'Tous les alliés ne doivent pas utiliser la même action plus d\'une fois pendant toute la durée du combat.',
            pt: 'Todos os aliados não devem usar a mesma ação mais de uma vez durante toda a luta.'
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
            de: 'Jeder Verbündete muss während des Kampfes mindestens einen Gegner erledigt haben.',
            en: 'Each allied fighter must have finished off at least one enemy fighter during the fight.',
            es: 'Todos los aliados deben haber derrotado al menos a un enemigo durante la pelea.',
            fr: 'Tous les alliés doivent avoir vaincu au moins un ennemi pendant le combat.',
            pt: 'Todos os aliados devem ter derrotado pelo menos um inimigo durante a luta.'
        }
    },
    {   id: 'statue',
        name: {
            de: 'Statue',
            en: 'Statue',
            es: 'Estatua',
            fr: 'Statue',
            pt: ''
        },
        description: {
            de: 'Jede Runde muss auf dem Anfangsfeld beendet werden und das während der gesamten Kampfzeit.',
            en: 'Allied fighters must finish every turn on the same cell that they started on, for the duration of the fight.',
            es: 'Alia de debe terminar cada turno en la misma casilla en la que comenzó, durante toda la pelea.',
            fr: 'Allier doit terminer chaque tour sur la même case que celle où il a commencé, pendant toute la durée du combat.',
            pt: 'Aliado deve terminar cada turno na mesma célula em que começou, durante toda a luta.'
        }
    },
    {   id: 'survivor',
        name: {
            de: 'Überlebender',
            en: 'Survivor',
            es: 'Superviviente',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Kein Verbündeter darf sterben.',
            en: 'No ally must die.',
            es: 'Ningún aliado debe morir.',
            fr: 'Alun allié ne doit mourir.',
            pt: 'Nenhum aliado deve morrer.'
        }
    },
    {   id: 'tight',
        name: {
            de: 'Anhängsel',
            en: 'Tight',
            es: 'Pegajoso',
            fr: 'Collant',
            pt: ''
        },
        description: {
            de: 'Die eigene Runde muss auf dem benachbarten Feld eines Verbündeten beendet werden.',
            en: 'Allied fighters must end their turn on a cell adjacent to another allied fighter.',
            es: 'Finito su turno en una casilla adyacente a otro aliado.',
            fr: 'Finir son tour sur une case adjacente à un autre allié.',
            pt: 'Finir o seu turno numa célula adjacente a outro aliado.'
        }
    },
    {   id: 'time_flies',
        name: {
            de: 'Die Zeit rennt',
            en: 'Time Flies',
            es: 'El Tiempo Pasa',
            fr: 'Temps qui court',
            pt: ''
        },
        description: {
            de: 'Während des Kampfes darf nicht versucht werden, Gegnern AP zu entziehen.',
            en: 'Don\'t try to reduce enemies\' AP during the fight.',
            es: 'Ne intentes reducir los PA de los enemigos durante el combate.',
            fr: 'Ne pas tenter de réduire les PA des ennemis pendant le combat.',
            pt: 'Ne tente reduzir os PA dos inimigos durante a luta.'
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
            es: 'Intocable',
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
            es: 'Versátil',
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
            es: 'Zombi',
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