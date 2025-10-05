const CHALLENGES = [
    {
        id: 'barbaric',
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
    {
        id: 'duo',
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
];


// Barbaric - Finish monsters with weapons only
// - de: Barbar
// - en: Barbaric
// - es: 
// - fr: 
// - pt: 
// Blitzkrieg - When a monster is attacked, it must be finished off before its turn.
// - de: Blitzangriff
// - en: Blitzkrieg
// - es: 
// - fr: 
// - pt: 
// Chrono - Finish Fight in under x turns
// - de: Die Zeit läuft
// - en: Chrono
// - es:
// - fr:
// - pt:
// Clean Hands - Kill monsters indirectly
// - de: Weiße Weste
// - en: Clean Hands
// - es: 
// - fr: 
// - pt: 
// Duel - Targets attacked by one ally cant be attacked by another
// - de: Duell
// - en: Duel
// - es: 
// - fr: 
// - pt: 
// Duo - Beat the dungeon with 2 players in X turns or less
// - de: Duo (X)
// - en: Duo (X)
// - es: 
// - fr: 
// - pt: 
// Fainthearted - Dont end turn beside an enemy
// - de: Zaghaft
// - en: Fainthearted
// - es: 
// - fr: 
// - pt: 
// First - Kill specific monster first
// - de: Als Erstes
// - en: First
// - es: 
// - fr: 
// - pt: 
// Freedom - Dont reduce monsters MP or Range
// - de: Freiheit
// - en: Freedom
// - es: 
// - fr: 
// - pt: 
// Hermit - Dont end turn beside ally
// - de: Einsiedler
// - en: Hermit
// - es: 
// - fr: 
// - pt: 
// Impertinence - End turn beside an enemy
// - de: Gewagt
// - en: Impertinence
// - es: 
// - fr: 
// - pt: 
// Keep moving - Dont reduce monsters MP
// - de: Bewegung, Bewegung
// - en: Keep Moving
// - es: 
// - fr: 
// - pt: 
// Last - Kill specific monster last
// - de: Als Letztes
// - en: Last
// - es: 
// - fr: 
// - pt: 
// Mystique - Dont use weapons
// - de: Mystiker
// - en: Mystique
// - es: 
// - fr: 
// - pt: 
// Nomad - Use all MP each turn
// - de: Nomade
// - en: Nomad
// - es: 
// - fr: 
// - pt: 
// No Rush - Dont use all MP
// - de: Ohne Eile
// - en: No Rush
// - es: 
// - fr: 
// - pt: 
// Quick and Furious - As soon as a monster is attacked, it must be finished in 3 turns or less
// - de: Schnell und Wütend
// - en: Quick and Furious
// - es: 
// - fr: 
// - pt: 
// Scanty - Each character must not use the same spell twice in the whole fight
// - de: Wirtschaftlichkeit
// - en: Scanty
// - es: 
// - fr: 
// - pt: 
// Statue - End turn on starting cell
// - de: Statue
// - en: Statue
// - es: 
// - fr: 
// - pt: 
// Survivor - No ally must die
// - de: Überlebender
// - en: Survivor
// - es: 
// - fr: 
// - pt: 
// Tight - End turn beside an ally
// - de: Anhängsel
// - en: Tight
// - es: 
// - fr: 
// - pt: 
// Time Flies - Dont reduce monsters AP
// - de: Die Zeit rennt
// - en: Time Flies
// - es: 
// - fr: 
// - pt: 
// Untouchable - Characters must not lose any health- or shield points
// - de: Unberührbahrkeit
// - en: Untouchable
// - es: 
// - fr: 
// - pt: 
// Versatile - Dont use same spell twice in a turn
// - de: Vielseitigkeit
// - en: Versatile
// - es: 
// - fr: 
// - pt: 
// Zombie - Use exactly 1 MP per turn
// - de: Zombie
// - en: Zombie
// - es: 
// - fr: 
// - pt: 