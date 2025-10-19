const FAMILY_LISTE = [
  // === Albuera Creatures ===
  { id: 'albuera',
    name: { de: 'Albuera-Kreaturen', en: 'Albuera Creatures', es: 'Criaturas de Albuera', fr: "Créatures d'Albuera", pt: '' }
  },
  // Beach Creatures - Aggressive Merkaptan, Ayin Spyr, Barbakle, Merkaptan Leader
  { id: 'beach_creatures', parentID: 'albuera',
    name: { de: 'Kreaturen des Strandes', en: 'Beach Creatures', es: '', fr: '', pt: '' },
  },
  // Belladonna's Creatures - Belladonna, Clobberstone, Dolomanus, Marbmour, Ragnarock
  { id: 'belladonnas_creatures', parentID: 'albuera',
    name: { de: 'Belladonna Kreaturen', en: 'Belladonna\'s Creatures', es: '', fr: '', pt: '' },
  },
  // Forest Creatures - Boorbear, Harrizarre, Weaselraff
  { id: 'forest_creatures', parentID: 'albuera',
    name: { de: 'Kreaturen der Wälder', en: 'Forest Creatures', es: '', fr: '', pt: '' },
  },

  // === Archipelago of Vulkania Creatures ===
  { id: 'archipelago_of_vulkania_creatures',
    name: { de: 'Kreaturen des Vulkania Archipels', en: '', es: '', fr: '', pt: '' }
  },
  // Vulkania Monsters - 
    // Dry Juvenile/Mature/Novice/Venerable Sauroshell
    // Incandescent Juvenile/Mature/Novice/Venerable Sauroshell
    // Insipid Juvenile/Mature/Novice/Venerable Sauroshell
    // Moist Juvenile/Mature/Novice/Venerable Sauroshell
    // Muddy Juvenile/Mature/Novice/Venerable Sauroshell
    // Raw Juvenile/Mature/Novice/Venerable Sauroshell
    // Sleepwalking/Exhausted/Tired Grozilla
    // Sleepwalking/Exhausted/Tired Grasmera
  { id: 'vulkania_monsters', parentID: 'archipelago_of_vulkania_creatures',
    name: { de: 'Vulkania Monster', en: 'Vulkania Monsters', es: '', fr: '', pt: '' },
  },
  
  // === Archmonsters ===
  { id: 'archmonsters', name: { de: 'Namensmonster', en: 'Archmonsters', fr: 'Archi-monstres', es: 'archi-monstruo' } },
  
  // === Ascension Island
  { id: 'ascension_island',
    name: { de: 'Insel der Ersteigung', en: 'Ascension Island', fr: "Île de l'Ascension", es: 'Isla de la Ascensión' }
  },
  // Dodus - Dokachu, Dolbinos, Dolivar, Dostrogo (Orado Island)
  { id: 'dodus', parentID: 'ascension_island',
    name: { de: 'Dodus', en: 'Dodus', es: '', fr: '', pt: '' },
  },
  // Riftworms - Cyclouse, Mastifang, Sharcut, Stapleworm, Tremrus
  { id: 'riftworms', parentID: 'ascension_island',
    name: { de: 'Breschenwürmer', en: 'Riftworms', es: '', fr: '', pt: '' },
  },
  // Scaly - Scale King Anchodyl, Crocelmet, Croclingy, Crocopike, Crokveeno, Feathodyl
  { id: 'scaly', parentID: 'ascension_island',
    name: { de: 'Verschuppung', en: 'Scaly', es: '', fr: '', pt: '' },
  },
  // Shushued Gobballs - Shushued Royal Gobball, Gobbal War Shuchief, Shushued Black Gobbly, Shushued Gobball, Shushued White Gobbly
  { id: 'shushued_gobballs', parentID: 'ascension_island',
    name: { de: 'Shushuierte Fresssäcke', en: 'Shushued Gobballs', es: '', fr: '', pt: '' },
  },
  // Shushus - Mucane, Ul'Khan, Shuchu, Shushkebab, Shushuaia, Shushlicker(str, int, cha)
  { id: 'shushus', parentID: 'ascension_island',
    name: { de: 'Shushus', en: 'Shushus', es: '', fr: '', pt: '' },
  },

  // === Beach Creatures ===
  { id: 'beach_creatures',
    name: { de: 'Strandkreaturen', en: 'Beach Creatures', es: '', fr: '', pt: '' }
  },
  // Beach Monsters - 
    // Blue, Green, Kloon, Orange, White Snapper
    // Crab, Mumussel, Starfish Trooper, Raul Mops
    // Sponge Mob 
  { id: 'beach_monsters', parentID: 'beach_creatures',
    name: { de: 'Strandmonster', en: 'Beach Monsters', es: '', fr: '', pt: '' },
  },
  
  // === Breeder Village Creatures ===
  { id: 'breeder_village_creatures',
    name: { de: 'Kreaturen des Dorfes der Züchter', en: 'Breeder Village', en: '',  fr: '', pt: '' }
  },
  // Cave monsters -
    // Cave Gobball, Gobkool
    // Emerald Doll, Lethal Doll, Starving Doll
    // Explosive Totem, Healing Totem, Motivating Totem
    // Diamondine, Emeralda, Ruby, Sapphira
    // Koolich, Skeunk
  { id: 'cave_monsters', parentID: 'breeder_village_creatures',
    name: { de: 'Höhlenmonster', en: 'Cave Monsters', es: '', fr: '', pt: '' },
  },
  // Koalaks - 
    // Bloody Koalak, Koalak Warrior, Purple Warko, Reapalak, Wild Koalak
    // Coco Koalak, Morello Cherry Koalak, Pippin Koalak, 
    // Dok Alako, Drakoalak, Fisheralak, Immature Koalak, Koalak Forester, Mama Koalak, Piralak, Brown Warko
    // Koalak Gravedigger, Koalak Master, Koalak Mummy, Koalak Rider, Workette
  { id: 'koalaks', parentID: 'breeder_village_creatures',
    name: { de: 'Koalaks', en: 'Koalaks', es: '', fr: '', pt: '' },
  },
  
  // === Cania Plains Creatures ===
  { id: 'cania_plains_creatures',
    name: { de: 'Kreaturen der Ebenen von Cania', en: 'Cania Plains Creatures', es: '', fr: 'creatures des plaines de Cania', pt: '' }
  },
  // Bliblis
    // Bliblimead, Bliblitch, Blibliternal, Bliblycerin
  { id: 'bliblis', parentID: 'cania_plains_creatures',
    name: { de: 'Gliglis', en: 'Bliblis', es: '', fr: '', pt: '' },
  },
  // Blops
    // Blopshroom, Greedoblop, Trunkiblop
    // Coco/Indigo/Morello Cherry/Pippin Blop
    // Coco/Indigo/Morello Cherry/Pippin Biblop
    // Royal Coco/Indigo/Morello Cherry/Pippin/Rainbow Blop
  { id: 'blops', parentID: 'cania_plains_creatures',
    name: { de: 'Blobs', en: 'Blops', es: '', fr: '', pt: '' },
  },
  // Boowolves
    // Moowolf, Boowolf, Mature Kaniger, Miliboowolf, Snoowolf, Trool
  { id: 'boowolves', parentID: 'cania_plains_creatures',
    name: { de: 'Wuwülfe', en: 'Boowolves', es: '', fr: '', pt: '' },
  },
  // Bworkventurers
    // Burnabwork, Mabwork, Megabwork, Weirbwork
  { id: 'bworkventurers', parentID: 'cania_plains_creatures',
    name: { de: 'Haubworks', en: 'Bworkventurers', es: '', fr: '', pt: '' },
  },
  // Crobaks
    // Crobak, Crovus, Crowfox, Foxo the Crowfox, Drinker, Kapotie the Drinker
    // Tamed Crobak, Horace the Tamed Crobak
    // Lord Crow
  { id: 'crobaks', parentID: 'cania_plains_creatures',
    name: { de: 'Rablinge', en: 'Crobaks', es: '', fr: '', pt: '' },
  },
  // Hard-Head Stubbyobs
    // Breakrock Knight, Knockarock, Leatheraxer, Yobbomark Knight, Yobreaker
    // Major-Yoberal Selim Quartz
  { id: 'hard_head_stubbyobs', parentID: 'cania_plains_creatures',
    name: { de: 'Dickschädel Nimbos', en: 'Hard-Head Stubbyobs', es: '', fr: '', pt: '' },
  },
  // Kanigs
    // Alyeena, Felygiene, Kannihilator, Orfan
    // Kanigrula
  { id: 'kanigs', parentID: 'cania_plains_creatures',
    name: { de: 'Kanigs', en: 'Kanigs', es: '', fr: '', pt: '' },
  },
  // Lousy Pigs
    // Lousy Pig Knight, Lousy Pig Shepherd, Piglet, Plain Boar, Stolen Gobball
  { id: 'lousy_pigs', parentID: 'cania_plains_creatures',
    name: { de: 'Schweinepriester', en: 'Lousy Pigs', es: '', fr: '', pt: '' },
  },
  // Minerocks
    // Crackblade, Cracklerge, Cracklope, Elemearth
    // Crakillian Guardian
  { id: 'minerocks', parentID: 'cania_plains_creatures',
    name: { de: 'Erzfelser', en: 'Minerocks', es: '', fr: '', pt: '' },
  },
  // Pilfielderers
    // Beaztinga, Fungi Master, Kaniger, Plains Larva, Plissken, Summoned Plissken
  { id: 'pilfielderers', parentID: 'cania_plains_creatures',
    name: { de: 'Landfinger', en: 'Pilfielderers', es: '', fr: '', pt: '' },
  },
  // Undried
    // Drowhirl, Funerbroadsword, Micrab, Sucgunner
    // Zombrute
  { id: 'undried', parentID: 'cania_plains_creatures',
    name: { de: 'Zombiebesessene', en: 'Undried', es: '', fr: '', pt: '' },
  },
  
  // === City Creatures ===
  { id: 'city_creatures',
    name: { de: 'Kreaturen der Städte', en: 'City Creatures', es: '', fr: '', pt: '' }
  },
  // Piwis
    // Blue, Green, Pink, Purple, Red, Yellow, Dusty Piwi
  { id: 'piwis', parentID: 'city_creatures',
    name: { de: 'Piepmätze', en: 'Piwis', es: '', fr: '', pt: '' },
  },
  // Sewer Monsters
    // Amakna Castle Rat Dungeon: Brat, Packrat, Prat, Ratfink, Ratter, Ratworm, Riffrat, Rugrat
    // Bonta/brakmar Sewers: Grossewer Rat, Grossewer Shaman, Hyoactive Rat
    // Amakna Castle Tunnels: Rat Bag, Rat Basher, Rat Pakk, Rat Rah, Rat Suenami, Rat Tchet
    // Astrub Sewers: Ratworm Apprentice, Sick Grossewer Rat
    // SC Summons: Donatella, Leonardawa, Michelangela, Raphaela
    // Black Rat, White Rat, Sphincter Cell, Sewer Keeper
  { id: 'sewer_monsters', parentID: 'city_creatures',
    name: { de: 'Monster der Kanalisation', en: 'Sewer Monsters', es: '', fr: '', pt: '' },
  },

  // === Field Creatures ===
  { id: 'field_creatures',
    name: { de: 'Kreaturen der Felder', en: 'Field Creatures', fr: '', es: '' }
  },
  // Field Plants
    // Dark Rose, Demonic Rose, Evil Dandelion, Wild Sunflower
    // Famished Sunflower
  { id: 'field_plants', parentID: 'field_creatures',
    name: { de: 'Pflanzen der Wiesen und Felder', en: 'Field Plants', es: '', fr: '', pt: '' },
  },
  // Fields
    // Aggressive Moumouse, Blue/Brown/Green/Red Spimush, Mush Mush
  { id: 'fields', parentID: 'field_creatures',
    name: { de: 'Piepmätze', en: 'Piwis', es: '', fr: '', pt: '' },
  },
  // Fungi
    // Exploding Spimush, Mush Mish, Mush Rhume, Mush Tup, Mushmunch, Mushnid, Trumperelle
    // Ougaa
  { id: 'fungi', parentID: 'field_creatures',
    name: { de: 'Fungi', en: 'Pilz', es: '', fr: '', pt: '' },
  },
  // Gobballs
    // Royal Gobball, Black Gobbly, Gobball, Gobball War Chief, White Gobbly
  { id: 'gobballs', parentID: 'field_creatures',
    name: { de: 'Fresssäcke', en: 'Gobballs', es: '', fr: '', pt: '' },
  },
  // Larvae
    // Shin Larva, Blue/Golden/Green/Orange Larva
  { id: 'larvae', parentID: 'field_creatures',
    name: { de: 'Larven', en: 'Larvae', es: '', fr: '', pt: '' },
  },
  // Moskitos
    // Moskito
  { id: 'moskitos', parentID: 'field_creatures',
    name: { de: 'Moskitos', en: 'Moskitos', es: '', fr: '', pt: '' },
  },
  // Tofus
    // Sick Tofu
    // Al Howin Tofu, Black Tofu, Bomberfu, Tofoone, Tofu, Tofurby
    // Force-fed Obese Tofu, Obese Tofu Daddy, Obese Tofu Mummy, Transgenic Tofu
    // Blastofu, Podgy Tofu, Tofubine, Tofuzmo, Ugly Tofu
    // Batofu, Royal Tofu
  { id: 'tofus', parentID: 'field_creatures',
    name: { de: 'Tofus', en: 'Tofus', es: '', fr: '', pt: '' },
  },

  // === Forest Creatures ===
  { id: 'forest_creatures',
    name: { de: 'Kreaturen der Wälder', en: 'Forest Creatures', es: '', fr: '', pt: '' }
  },
  // Arachnees
    // Aggressive Arachnee, Arachnee, Arachnid, Major Arachnee, Sick Arachnee
  { id: 'arachnees', parentID: 'forest_creatures',
    name: { de: 'Arachneen', en: 'Arachnees', es: '', fr: '', pt: '' },
  },
  // Arak-hai
    // Arachmutated, Arach-hai egg, Daddy Longlex, Gargantula, Jumparak, Venomica
    // Hell Mina
  { id: 'arak_hai', parentID: 'forest_creatures',
    name: { de: 'Arach-Hai', en: 'Arak-hai', es: '', fr: '', pt: '' },
  },
  // Dreggons
    // Aerogoburius the Malicious, Aqualikros the Merciless, Ignirkocropos the Famished, Terraburkahl the Perfidious
    // Aeroktor the Warrior, Aquabralak the Warrior, Ignilicrobur the Warrior, Terrakubiack the Warrior
    // Alert Black/Golden/Sapphire/White Dragoss
    // Black/Golden/Sapphire/White Dragoss
    // Alert Black/Golden/Sapphire/White Dreggon
    // Immature Black/Golden/Sapphire/White Dragoss
    // Dragostess, Dreggon Warrior, Flying Dreggon
    // Explosive Shell, Healing Shell, Sauroshell
    // Crocabulia
  { id: 'dreggons', parentID: 'forest_creatures',
    name: { de: 'Dracheier', en: 'Dreggons', es: '', fr: '', pt: '' },
  },
  // Forest animals
    // Astrub Squirrel, Boar, Prespic, Bear, Bearman
  { id: 'forest_animals', parentID: 'forest_creatures',
    name: { de: 'Tiere der Wälder', en: 'Forest Animals', es: '', fr: '', pt: '' },
  },
  // Jellies
    // Blue/Lemon/Mint/Strawberry Jelly
    // Royal Blue/Lemon/Mint/Strawberry Jelly
  { id: 'jellies', parentID: 'forest_creatures',
    name: { de: 'Gelees', en: 'Jellies', es: '', fr: '', pt: '' },
  },
  // Scaraleaves
    // Black/Blue/Green/Red/White/Immature Scaraleaf
    // Air/Earth/Fire/Water Spark
    // Golden Scarabugly
  { id: 'scaraleaves', parentID: 'forest_creatures',
    name: { de: 'Scarablätter', en: 'Scaraleaves', es: '', fr: '', pt: '' },
  },
  // Treechnidians
    // Treechnee, Treechnid, Trunknid, Venerable Treechnid
    // Arachnotron, Dark Treechnee, Dark Treechnid, Healing Branch, Summoning Branch
    // Sticky Tree
    // Short-Tempered Arachnotron/Dark Treechnee/Dark Treechnid
    // Ancestral Treechnid, Soft Oak
    // Dark Chest
  { id: 'treechnidians', parentID: 'forest_creatures',
    name: { de: 'Astaknyden', en: 'Treechnidians', es: '', fr: '', pt: '' },
  },

  // === Frigost Creatures ===
  { id: 'frigost_creatures',
    name: { de: 'Kreaturen von Frigost', en: 'Frigost Creatures', es:  '', fr: '', pt: '' }
  },
  // Alchimeras - Frigost 3
    // Dodox, Krackal, Nessil, Snowdew, Thermite
    // Nileza
  { id: 'alchimeras', parentID: 'frigost_creatures',
    name: { de: 'Alchillusionisten', en: 'Alchimeras', es: '', fr: '', pt: '' },
  },
  // Alma's Cradle Monsters - Frigost 1
    // Harpy Pirate, Karrybean Pirate, Retspan Pirate, Talklyka Pirate, Vigi Pirate, Yuara Pirate
    // Ectobomb, Hamrack
    // Buck Anear
  { id: 'almas_cradle_monsters', parentID: 'frigost_creatures',
    name: { de: 'Monster aus Almas Wiege', en: 'Alma\'s Cradle Monsters', es: '', fr: '', pt: '' },
  },
  // Armarines - Frigost 3
    // Karkanik, Potbellion, Revish, Skateman, Stalak
    // Missiz Freezz
    { id: 'armarines', parentID: 'frigost_creatures',
      name: { de: 'Rüstebellen', en: 'Armarines', es: '', fr: '', pt: '' },
  },
  // Bearbarians - Frigost 2
    // Apewicubic/Esurient/Mellifluous/Rampant/Torpid/Vespal Bearbarian
    // Celestial Bearbarian
  { id: 'bearbarians', parentID: 'frigost_creatures',
    name: { de: 'Barbären', en: 'Bearbarians', es: '', fr: '', pt: '' },
  },
  // Fangs of Glass monsters - Frigost 2
    // Bestial/Gluttonous/Icy/Nightcrawling/Pyrotechnic/Venomous Brockhard
    // Kolosso, Professor Xa
  { id: 'fangs_of_glass_monsters', parentID: 'frigost_creatures',
    name: { de: 'Monster der gläsernen Fangzähne', en: 'Fangs of Glasss Monsters', es: '', fr: '', pt: '' },
  },
  // Frigost Village Monsters - Frigost 1
    // Crabeye, Gullipop, Stunted Rat, Woolly Bow Meow
  { id: 'frigost_village_monsters', parentID: 'frigost_creatures',
    name: { de: 'Monster des Stillen Örtchens', en: 'Frigost Village Monsters', es: '', fr: '', pt: '' },
  },
  // Frigost Wanted Monsters
    // Frigost 1: Mastoslob, Katigger, Mister Penguin, Pirate Bhey, Doctor Gobotnegg
    // Frigost 2: The Masked Avenger, YeCh'Ti, Fuji Snowfoux, Dremoan, Flasho, Vinnie the Bearbarian
    // Frigost 3: Bearendizer, Ice Knight, Mekstagob, Psychopump, Erotegg
    // Summons: Cromignon, Dremoan Sprout, Egg of Death, Mefisto, Unstable Gobshell
  { id: 'frigost_wanted_monsters', parentID: 'frigost_creatures',
    name: { de: '', en: 'Frigost Wanted Monsters', es: '', fr: '', pt: '' },
  },
  // Leatherbods - Frigost 3
    // Asteraw, Dumple, Harrogant, Leatherball, Putchup
    // Klime
  { id: 'leatherbods', parentID: 'frigost_creatures',
    name: { de: 'Gelederte', en: 'Leatherbods', es: '', fr: '', pt: '' },
  },
  // Lonesome Pine Trail Monsters - Frigost 1
    // Cromagmunk, Frighog, Kanigloo, Sabredon, Wooly Piggoth
  { id: 'lonesome_pine_trails_monsters', parentID: 'frigost_creatures',
    name: { de: 'Monster aus dem Wald der verlorenen Kiefern', en: 'Lonesome Pine Trails Monsters', es: '', fr: '', pt: '' },
  },
  // Mastogobs - Frigost 1
    // Mastogob, Mastogob Warrior, Mastogobbly, Venerable Mastogob
    // Royal Mastogob
  { id: 'mastogobs', parentID: 'frigost_creatures',
    name: { de: 'Fressmuts', en: 'Mastogobs', es: '', fr: '', pt: '' },
  },
  // Mechaniacs - Frigost 3
    // Kan-O-Mat, Mecanofoux, Pingwinch, Serpulax, Tinkerbear
    // Sylargh
  { id: 'mechaniacs', parentID: 'frigost_creatures',
    name: { de: 'Bastjährzörner', en: 'Mechaniacs', es: '', fr: '', pt: '' },
  },
  // Petrified Forest Monsters - Frigost 2
    // Clump, Sporachnee, Dramanita, Fistulina, Fungora, Serpula, Treecherous
    // Korriander
  { id: 'petrified_forest_monsters', parentID: 'frigost_creatures',
    name: { de: 'Monster des versteinerten Waldes', en: 'Petrified Forest Monsters', es: '', fr: '', pt: '' },
  },
  // Pingwins - Frigost 1
    // Kung-Fu Pingwin, Mama Pingwin, Pinkwinkle, Pingwobble, Shaman Pingwin
    // Royal Pingwin
  { id: 'pingwins', parentID: 'frigost_creatures',
    name: { de: 'Pings', en: 'Pingwins', es: '', fr: '', pt: '' },
  },
  // Sakai Monsters - Frigost 1
    // Asploda, Bomma, Buzta, Drilla, Gobshell, Grabba, Stabba
    // Grohlum
  { id: 'sakai_monsters', parentID: 'frigost_creatures',
    name: { de: 'Monster der Arkal Insel', en: 'Sakai Monsters', es: '', fr: '', pt: '' },
  },
  // Sinistros - Frigost 3
    // Bubotron, Cycloid, Nocturnowl, Sinistrofu, Treadfast
    // Count Harebourg
  { id: 'sinistros', parentID: 'frigost_creatures',
    name: { de: 'Sinistros', en: 'Sinistros', es: '', fr: '', pt: '' },
  },
  // Snowfoux
    // Kami Snowfoux, Maho Snowfoux, Soryo Snowfoux, Yokai Snowfoux, Yomi Snowfoux
    // Foster Fuji Snowfoux, Tengu Snowfoux
  { id: 'snowfoux', parentID: 'frigost_creatures',
    name: { de: 'Eisfüxe', en: 'Snowfoux', es: '', fr: '', pt: '' },
  },
  // Tears of Ouronigride Monsters
    // Atomystique, Fumaroller, Maglob, Mofette, Solfatara, Steam Crackler
    // Obsidemon
  { id: 'tears_of_ouronigride_monsters', parentID: 'frigost_creatures',
    name: { de: 'Monster von Ouronigrids Tränen', en: 'Tears of Ouronigride Monster', es: '', fr: '', pt: '' },
  },

  // === Humanoid Creatures ===
  { id: 'humanoid_creatures',
    name: { de: 'Humanoide Kreaturen', en: 'Humanoid Creatures', es: '', fr: '', pt: '' } },
  // Bandits
    // Dark Baker, Dark Miner, Dark Smith, Krtek, Krtek Dark Miner, One-Armed Bandit, Rogue Clan Bandit
    // Smith's Chest
  { id: 'bandits', parentID: 'humanoid_creatures',
    name: { de: 'Banditen', en: 'Bandits', es: '', fr: '', pt: '' },
  },
  // Guards
    // Bontarian: Commander Kad, Pursuer, Warrior, Elite Commander, Powerful Militiaman
    // Brakmarian: Prism, Pursuer, Warrior
    // Militiaman, Warrior
    // Equipped Militiaman, Knight
    // Newly Tamed Whitish Fang, Satiated Whitish Fang
  { id: 'guards', parentID: 'humanoid_creatures',
    name: { de: 'Wachen', en: 'Guards', es: '', fr: '', pt: '' },
  },
  // Imps
    // Imp
  { id: 'imps', parentID: 'humanoid_creatures',
    name: { de: 'Imps', en: 'Imps', es: '', fr: '', pt: '' },
  },
  // NPC's
    // Allisteria, Artempth Rose, Bondu, Delminss, Dike Tarak, Diver Birel, Elturt, Evil Dopple,
    // Fuu Yie, Gokwa Disciple, Guard, Hunted Gobball, Ikwa Disciple, Innkeeper Bagrutte, Iop in Brakmarian Cape,
    // Kikim Innkeeper, King Allister's Envoy, Lady Meriane, Little Jan, Loofi, Lost Crobak, Louse Degraine,
    // Mean Squirrel, Nara, Oto Mustam(2), Perverse Astachnee, Puja Mustam, Radlu Minite the Dark Miner,
    // Sadida in a Bontarian Cape, Sanka Disciple, Sram Assassin, Tarche, Torche
  { id: 'npcs', parentID: 'humanoid_creatures',
    name: { de: 'NPC\'s', en: 'NPC\'s', es: '', fr: '', pt: '' },
  },

  // === Kwismas Island Creatures ===
  { id: 'kwismas_island_creatures',
    name: { de: 'Monster der Weißnachtsinsel', en: 'Kwismas Island Creatures', fr: '', es: '' }
  },
  // Kwismas Monsters
    // Low: Black Tiwabbitus, Frozen Tofu, Nitsou Nakwatus, Kwakus, Kwismas Whitish Fang, Larvicy, Pokipik, Snowy Tofu, Unruly Goblimp, Pricky Kwismas Dragoturkey
    // Mid: Abominable Snow Yiti, Hibernal Tofu, Larvicily, Minimini Inuit, Snowball, Snowman, Wintry Kaniger, Cranky Goblimp, Wild Kwismas Dragoturkey
    // Top: Abominable Snow Yiti, Ice Crackler, Mini Inuit, Prez' Plozion, Sakai Firefoux, Stuffed Gobball, Stuffed Tofu, Stuffed Wabbit, Nefarious Goblimp, Impetuous Kwismas Dragoturkey
    // Presents: Animated Gift, Baby Prez, Chop'kiddy, Pop'kiddy, Stuk'kiddy, Prez'Boom, Prez'Ent, Prez'Pertize, Small Animated Gift
    //           Icikle, Kwismas Bomberfu, Kwismas Pastry Monster
    // Summons: Boowolf Puppet, Dark Vlad Puppet, Dragon Pig Puppet, Minotoror Puppet, Royal Gobbal Puppet, Putch Ingball
    // Bosses: Itzting, Father Kwismas, Half Father Kwismas, Father Whupper, Kwismas Minotoball
  { id: 'kwismas_monsters', parentID: 'kwismas_island_creatures',
    name: { de: 'Weißnachtsmonster', en: 'Kwismas Monsters', es: '', fr: '', pt: '' },
  },

  // === Lair Guardians === 
  { id: 'lair_guardians',
    name: { de: 'Wächter der Unterschlüpfe', en: 'lair_guardians', fr: '', es: '' }
  },
  // Dark Piwi + Celestial Piwi
  // Azure Plop + Crimson Plop
  // Dark Tofu + Celestial Tofu
  // Dark Gobbal + Celestial Gobball
  // Dark Boar + Celestial Boar
  // Dark Arachnee + Celestial Arachnee
  // Troologram + Troololens + Trooligophren, Troolibrius
  { id: 'lair_guardians', parentID: 'lair_guardians',
    name: { de: 'Wächter der Unterschlüpfe', en: 'Lair Guardians', es: '', fr: '', pt: '' },
  },
  
  // === Minotoror Island Creatures ===
  { id: 'minotoror_island_creatures',
    name: { de: 'Kreaturen der Minotoror Insel', en: '', es: '', fr: '', pt: '' }
  },
  // Minos
    // Deminoball, Khamelerost, Manderisha, Minokid, Minoskito, Mumminotoror, Quetsnakiatl, Scaratos, Jellidice
    // Minotoror, Minotot
  { id: 'minos', parentID: 'minotoror_island_creatures',
    name: { de: 'Minos', en: 'Minos', es: '', fr: '', pt: '' },
  },

  // === Miscellaneous Creatures ===

  // === Moon Island Creatures ===
  { id: 'moon_island_creatures',
    name: { de: 'Kreaturen der Moon Insel', en: 'Moon Island Creatures', es: '', fr: '', pt: '' }
  },
  // Moon Island Kanniballs
    // Haloperi Doll
    // Kanniball Archer, Kanniball Jav, Kanniball Sarbak, Kanniball Thierry
    // Kanniball Andchain
  { id: 'moon_island_kanniballs', parentID: 'moon_island_creatures',
    name: { de: 'Kannibälle der Moon Insel', en: 'Moon Island Creatures', es: '', fr: '', pt: '' },
  },
  // Kannibälle der Moon Insel, Monster von Moon, Pflanzen von Moon, Piraten von Moon, Schildkröten von Moon
  { id: 'moor', name: { de: 'Kreaturen der Heide', en: '', fr: '', es: '' } },
  // Monster des Heidelandes
  { id: 'mountain', name: { de: 'Kreaturen der Berge', en: '', fr: '', es: '' } },
  // Bworks, Dracotruter, Goblins, Krachler, Kwacks, Schweinemonster
  { id: 'night', name: { de: 'Kreaturen der Nacht', en: '', fr: '', es: '' } },
  //Chafer, Geister, Geister der Vertrauten, Ghule, Höllofeen Monster, Monster der Nacht
  { id: 'otomai', name: { de: 'Kreaturen auf Otomaïs Insel', en: 'Otomai Island', fr: "l'île d'Otomaï", es: '' } },
  // Monster der Grasebene, Monster des dichten Dschungels, Monster des Korallenstrandes, Monster des Stammbaumes, Monster des Zoth Dorfes, Monster von Otomais Arche, Moor-Monster
  { id: 'pandala', name: { de: 'Kreaturen von Pandala', en: 'Pandala', fr: 'Pandala', es: 'Pandala' } },
  // Erd-Korunder, Feuer-Korunder, Wasser-Korunder, Luft-Korunder, Feuerfux, Kozaru, Kwappa, Pflanzen von Pandala,
  // Tanuki, Verdorbene Pflanzen von Pandala, Verlorene Seelen
  { id: 'raid', name: { de: 'Überfälle', en: 'Raids', fr: '', es: '' } },
  // Belladonnas Raid, Dark Vlads Raid
  { id: 'resource', name: { de: 'Beschützer der Ressourcen', en: '', fr: '', es: '' } },
  // Beschützer der Bäume, Erze, Fische, Getreide, Nutzpflanzen
  { id: 'swamp', name: { de: 'Kreaturen der Sümpfe', en: '', fr: '', es: '' } },
  // Crocodylls, Monster der Sümpfe
  { id: 'wabbit', name: { de: 'Kreaturen der Wabbit Insel', en: '', fr: '', es: '' } },
  // Wabbits
  
];

module.exports = { FAMILY_LISTE };