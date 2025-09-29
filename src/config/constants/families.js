const FAMILY_LISTE = [
  { id: 'albuera', name: { de: 'Albuera-Kreaturen', en: 'Albuera Creatures', fr: "Créatures d'Albuera", es: 'Criaturas de Albuera' } },
  // Belladonna Kreaturen, Kreaturen der Wälder, Kreaturen des Strandes
  { id: 'archmonsters', name: { de: 'Namensmonster', en: 'Archmonsters', fr: 'Archi-monstres', es: 'archi-monstruo' } },
  // Namensmonster
  { id: 'ascension', name: { de: 'Insel der Ersteigung', en: 'Ascension Island', fr: "Île de l'Ascension", es: 'Isla de la Ascensión' } },
  // Breschenwürmer, Dodu, Shushus, Shushutierte Fresssäcke, Verschuppung
  { id: 'beach', name: { de: 'Strandkreaturen', en: '', fr: '', es: '' } },
  // Strandmonster
  { id: 'breeder', name: { de: 'Kreaturen des Dorfes der Züchter', en: 'Breeder Village', fr: '', es: '' } },
  // Höhlenmonster, Koalaks
  { id: 'cania', name: { de: 'Kreaturen der Ebenen von Cania', en: 'Cania Plains', fr: 'plaines de Cania', es: '' } },
  // Blobs, Dickschädel Nimbos, Erzfelser, Gliglis, Haubworks, Kanigs, Landfinger, Rablinge, Schweinepriester, Wuwülfe, Zombiebesessene
  { id: 'city', name: { de: 'Kreaturen der Städte', en: 'City', fr: '', es: '' } },
  // Monster der Kanalisation, Piepmätze
  { id: 'field', name: { de: 'Kreaturen der Felder', en: 'Field', fr: '', es: '' } },
  // Felder, Fresssäcke, Larven, Moskitos, Pflanzen der Wiesen und Felder, Pilz, Tofus
  { id: 'forest', name: { de: 'Kreaturen der Wälder', en: '', fr: '', es: '' } },
  // Arach-Hai, Arachneen, Astaknyden, Dracheier, Gelees, Scarablätter, Tiere der Wälder
  { id: 'frigost', name: { de: 'Kreaturen von Frigost', en: 'Frigost', fr: 'Frigost', es: 'Frigost' } },
  // Alchillusionisten, Barbären, Bastjährzörner, Eisfüxe, Fressmuts, Gelederte, Monster aus Almas Wiege,
  // Monster aus dem Wald der verlorenen Kiefern, Monster aus Ouronigrids Tränen, Monster der Arkal Insel, Monster der gläsernen Fangzähne,
  // Monster des stillen Örtchens, Monster des  versteinerten Waldes, Pings, Rüstebellen, Sinistros
  { id: 'humanoid', name: { de: 'Humanoide Kreaturen', en: '', fr: '', es: '' } },
  // Banditen
  { id: 'kwismas', name: { de: 'Monster der Weißnachtsinsel', en: '', fr: '', es: '' } },
  // Weißnachtsmonster
  { id: 'lair', name: { de: 'Wächter der Unterschlüpfe', en: '', fr: '', es: '' } },
  // Wächter der Unterschlüpfe
  { id: 'minotoror', name: { de: 'Kreaturen der Minotoror Insel', en: '', fr: '', es: '' } },
  // Minos
  { id: 'moon', name: { de: 'Kreaturen der Moon Insel', en: '', fr: '', es: '' } },
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
  { id: 'vulkania', name: { de: 'Kreaturen des Vulkania Archipels', en: '', fr: '', es: '' } },
  // Monster von Vulkania
];

module.exports = { FAMILY_LISTE };