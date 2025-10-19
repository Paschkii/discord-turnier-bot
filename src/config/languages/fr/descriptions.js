const descriptions = {
    // === Achievements ===
    achievements: {
        blitzkrieg: {
            name: 'Blitzkrieg',
            description: 'When an opponent is attacked, they must be finished off before the start their turn.'
        },
        chrono: {
            name: 'Chrono',
            description: ({ turns = '{number}' } = {}) => `Finish the fight in ${turns} turns or less.`
        },
        cleanHands: {
            name: 'Clean Hands',
            description: 'Allied characters must finish off opponents without inflicting direct damage to them.Traps, glyphs, poisons, pushback damage, reflected damage and damage inflicted by summons may all be used.'
        },
        duel: {
            name: 'Duel',
            description: 'When an ally attacks an enemy, no other ally must attack that enemy for the duration of the fight.'
        },
        duo: {
            name: 'Duo',
            description: ({ turns = '{number}' } = {}) => `Finish the fight with two players or less in no more than ${turns} turns.`
        },
        fainthearted: {
            name: 'Fainthearted',
            description: 'Allies must never finish their turn adjacent to an enemy.'
        },
        first: {
            name: 'First',
            description: ({ bossID = 'the designated boss' } = {}) => `Kill ${bossID} first.`
        },
        freedom: {
            name: 'Freedom',
            description: 'Characters must not reduce their opponents\' MP or Range.'
        },
        hermit: {
            name: 'Hermit',
            description: 'Allies must never finish their turn adjacent to an ally.'
        },
        impertinence: {
            name: 'Impertinence',
            description: 'Allies must finish their turn adjacent to an enemy.'
        },
        keepMoving: {
            name: 'Keep Moving',
            description: 'Do not attempt to reduce opponents\' MP for the entire fight. Summons may cause the challenge to fail'
        },
        last: {
            name: 'Last',
            description: ({ bossID = 'the designated boss' } = {}) => `Kill ${bossID} last.`
        },
        mystique: {
            name: 'Mystique',
            description: 'Use only spells for the duration of the fight.'
        },
        nomad: {
            name: 'Nomad',
            description: 'Allies must use all of their MP every turn for the duration of the fight.'
        },
        quickAndFurious: {
            name: 'Quick and Furious',
            description: 'As soon as an opponent is attacked, they must be finished off in 3 turns or less. Summons may cause the challenge to fail.'
        },
        scanty: {
            name: 'Scanty',
            description: 'Allies must not use the same action more than once for the duration of the fight.'
        },
        statue: {
            name: 'Statue',
            description: 'Allies must finish every turn on the same cell that they started on, for the duration of the fight.'
        },
        tight: {
            name: 'Tight',
            description: 'Finish your turn on a cell adjacent to an ally.'
        },
        timeFlies: {
            name: 'Time Flies',
            description: 'Do not attempt to reduce opponents\' AP for the entire fight. Summons may cause the challenge to fail'
        },
        untouchable: {
            name: 'Untouchable',
            description: 'Characters must not be attacked in close combat.'
        },
        versatile: {
            name: 'Versatile',
            description: 'Allies must not use the same action more than once on each of their turns.'
        },
        zombie: {
            name: 'Zombie',
            description: 'Use exactly 1 MP per turn.'
        },
    },
    // === Challenges ===
    challenges: {
        barbaric: {
            name: 'Barbaric',
            description: 'Allied characters must finish off enemies with a weapon.'
        },
        battleRoyal: {
            name: 'Battle Royal',
            description: 'Only one ally must be alive at the end of the fight.'
        },
        blitzkrieg: {
            name: 'Blitzkrieg',
            description: 'When an opponent is attacked, they must be finished off before the start their turn.'
        },
        chrono: {
            name: 'Chrono',
            description: ({ turns = '{number}' } = {}) => `Finish the fight in ${turns} turns or less.`
        },
        cleanHands: {
            name: 'Clean Hands',
            description: 'Allied characters must finish off opponents without inflicting direct damage to them.Traps, glyphs, poisons, pushback damage, reflected damage and damage inflicted by summons may all be used.'
        },
        contamination: {
            name: 'Contamination',
            description: 'As soon as an ally looses HP or SP, you have 5 turns to kill that ally.'
        },
        contractKiller: {
            name: 'Contract Killer',
            description: 'Enemies must be killed in the designated order. A new enemy is designated each time the previous enemy is killed.'
        },
        cruel: {
            name: 'Cruel',
            description: 'Enemies must be killed according to the ascending order of their levels.'
        },
        duel: {
            name: 'Duel',
            description: 'When an ally attacks an enemy, no other ally must attack that enemy for the duration of the fight.'
        },
        elementaryMyDear: {
            name: 'Elementary, My Dear',
            description: 'Use the same element to attack for the duration of the combat.'
        },
        elitist: {
            name: 'Elitist',
            description: 'All attacks must be focused on the designated target until it dies.'
        },
        evasive: {
            name: 'Evasive',
            description: 'Avoid being locked throughout the entire fight.'
        },
        exhuberant: {
            name: 'Exhuberant',
            description: 'Use all of your AP before the end of your turn.'
        },
        fainthearted: {
            name: 'Fainthearted',
            description: 'Allies must never finish their turn adjacent to an enemy.'
        },
        focus: {
            name: 'Focus',
            description: 'When an opponent is attacked, they must be finished off before any other enemy is attacked. Summons may caue the challenge to fail.'
        },
        foresighted: {
            name: 'Foresighted',
            description: 'Never use all available AP during your turn.'
        },
        gangster: {
            name: 'Gangster',
            description: 'Cast the Dirty Trick spell every time the spell is available throughout the entire fight.'
        },
        hermit: {
            name: 'Hermit',
            description: 'Allies must never finish their turn adjacent to an ally.'
        },
        impertinence: {
            name: 'Impertinence',
            description: 'Allies must finish their turn adjacent to an enemy.'
        },
        keepMoving: {
            name: 'Keep Moving',
            description: 'Do not attempt to reduce opponents\' MP for the entire fight. Summons may cause the challenge to fail'
        },
        lowLevelsFirst: {
            name: 'Low Levels First',
            description: 'The ally with the lowest level must finish off all enemies.'
        },
        loyalFriend: {
            name: 'Loyal Friend',
            description: 'Cast the Summoning of Coney spell every time the spell is available throughout the entire fight.'
        },
        maniac: {
            name: 'Maniac',
            description: 'Enemies must be killed according to the descending order of their levels.'
        },
        mystique: {
            name: 'Mystique',
            description: 'Use only spells for the duration of the fight.'
        },
        noRush: {
            name: 'No Rush',
            description: 'Allies must never use all of their MP every turn for the duration of the fight.'
        },
        nomad: {
            name: 'Nomad',
            description: 'Allies must use all of their MP every turn for the duration of the fight.'
        },
        quickAndFurious: {
            name: 'Quick and Furious',
            description: 'As soon as an opponent is attacked, they must be finished off in 3 turns or less. Summons may cause the challenge to fail.'
        },
        reprieve: {
            name: 'Reprieve',
            description: ({ monsterID = 'the designated monster' } = {}) => `Kill ${monsterID} last.`
        },
        rootedToTheSpot: {
            name: 'Rooted to the Spot',
            description: 'Never attempt to teleport or switch places for the entire fight. Summons may cause the challenge to fail.'
        },
        scanty: {
            name: 'Scanty',
            description: 'Allies must not use the same action more than once for the duration of the fight.'
        },
        scapegoat: {
            name: 'Scapegoat',
            description: 'The designated ally must be finished off by an ally before the end of the fight.'
        },
        selfSacrifice: {
            name: 'Self Sacrifice',
            description: 'Characters must not be healed during their turn.'
        },
        sharing: {
            name: 'Sharing',
            description: 'Each character must finish off at least one enemy (enemy summons dount count) during the fight.'
        },
        sightseeing: {
            name: 'Sightseeing',
            description: 'Do not attempt to reduce opponents\' Range for the entire fight. Summons may cause the challenge to fail.'
        },
        static: {
            name: 'Static',
            description: 'Never attempt to push or pull an opponent for the entire fight. Summons may cause the challenge to fail.'
        },
        statue: {
            name: 'Statue',
            description: 'Allies must finish every turn on the same cell that they started on, for the duration of the fight.'
        },
        survivor: {
            name: 'Survivor',
            description: 'No ally must die.'
        },
        tight: {
            name: 'Tight',
            description: 'Finish your turn on a cell adjacent to an ally.'
        },
        timeFlies: {
            name: 'Time Flies',
            description: 'Do not attempt to reduce opponents\' AP for the entire fight. Summons may cause the challenge to fail.'
        },
        toEachHisPwn: {
            name: 'To each his pwn',
            description: 'Each character must kill at least one opponent (summons do not count) during the fight. Once a character attacks a particular opponent, no other character must attack that opponent for the entire fight. Summons may cause the challenge to fail.'
        },
        twoForThePriceOfOne: {
            name: 'Two for the price of one',
            description: 'When an ally finishes off an enemy, they must also finish off one (and only one) additional enemy during their turn.'
        },
        uncurable: {
            name: 'Uncurable',
            description: 'For the duration of the fight, allies must not be healed. Summons may cause the challenge to fail.'
        },
        unpredictable: {
            name: 'Unpredictable',
            description: 'All attacks by allies must be focused on the designated target at the start of each turn or when the enemy is killed.'
        },
        untouchable: {
            name: 'Untouchable',
            description: 'Characters must not be attacked in close combat.'
        },
        unwillingVolunteer: {
            name: 'Unwilling Volunteer',
            description: ({ monsterID = 'the designated monster' } = {}) => `Kill ${monsterID} first.`
        },
        versatile: {
            name: 'Versatile',
            description: 'Allies must not use the same action more than once on each of their turns.'
        },
        zombie: {
            name: 'Zombie',
            description: 'Use exactly 1 MP per turn.'
        },
    }
};

module.exports = descriptions;