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
            en: 'Finish monsters with weapons only.',
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
            de: 'Wird ein Monster angegriffen, muss es vor seinem Zug besiegt werden.',
            en: 'When a monster is attacked, it must be finished off before its turn.',
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
            de: `Beende den Kampf in weniger als ${turns} Runden.`,
            en: `Finish the fight in under ${turns} turns.`,
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
            fr: '',
            pt: ''
        },
        description: {
            de: 'Besiege Monster nur indirekt.',
            en: 'Kill monsters indirectly.',
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
            de: 'Wird ein Ziel von einem Verbündeten angegriffen, darf es kein anderer mehr attackieren.',
            en: 'Targets attacked by one ally cannot be attacked by another.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'duo',
        name: {
            de: 'Duo',
            en: 'Duo',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: `${bossID} mit maximal 2 Charakteren und in weniger als ${turns} Runden im ${dungeonID} besiegen.`,
            en: `Defeat ${bossID} with at most 2 characters and in fewer than ${turns} turns in ${dungeonID}.`,
            es: '',
            fr: '',
            pt: ''
        },
        defaults: { turns: 20 }
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
            de: 'Beende deinen Zug nicht neben einem Gegner.',
            en: 'Don\'t end your turn next to an enemy.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'first',
        name: {
            de: 'Als Erstes',
            en: 'First',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Besiege das ausgewählte Monster als Erstes.',
            en: 'Defeat the designated monster first.',
            es: '',
            fr: '',
            pt: ''
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
    {   id: 'hermit',
        name: {
            de: 'Einsiedler',
            en: 'Hermit',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Beende deinen Zug nicht neben einem Verbündeten.',
            en: 'Don\'t end your turn next to an ally.',
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
            de: 'Beende deinen Zug neben einem Gegner.',
            en: 'End your turn next to an enemy.',
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
            de: 'Reduziere die BP von Monstern nicht.',
            en: 'Don\'t reduce monsters\' MP.',
            es: '',
            fr: '',
            pt: ''
        }
    },
    {   id: 'last',
        name: {
            de: 'Als Letztes',
            en: 'Last',
            es: '',
            fr: '',
            pt: ''
        },
        description: {
            de: 'Besiege das ausgewählte Monster als Letztes.',
            en: 'Defeat the designated monster last.',
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
            de: 'Verzichte vollständig auf Waffen.',
            en: 'Don\'t use weapons.',
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
            de: 'Verwende in jedem Zug alle BP.',
            en: 'Use all of your MP each turn.',
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
            fr: '',
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
            de: 'Kein Charakter darf im Kampf denselben Zauber zweimal verwenden.',
            en: 'Each character must not use the same spell twice in the whole fight.',
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
            de: 'Beende deinen Zug auf dem Startfeld.',
            en: 'End your turn on your starting cell.',
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
            fr: '',
            pt: ''
        },
        description: {
            de: 'Beende deinen Zug neben einem Verbündeten.',
            en: 'End your turn next to an ally.',
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
            de: 'Reduziere die AP von Monstern nicht.',
            en: 'Don\'t reduce monsters\' AP.',
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
            fr: '',
            pt: ''
        },
        description: {
            de: 'Verwende in einem Zug keinen Zauber doppelt.',
            en: 'Don\'t use the same spell twice in a turn.',
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
            fr: '',
            pt: ''
        },
        description: {
            de: 'Verwende pro Zug genau 1 BP.',
            en: 'Use exactly 1 MP per turn.',
            es: '',
            fr: '',
            pt: ''
        }
    },
];

module.exports = CHALLENGES;