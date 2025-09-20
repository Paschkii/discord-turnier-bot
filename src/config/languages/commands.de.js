const commands = {
  anmelden: {
    name: 'anmelden',
    description: 'Melde dich für das Turnier an',
  },
  arena: {
    name: 'arena',
    description: 'Zufällige Arena-Auswahl',
    options: {
      anzahl: {
        name: 'anzahl',
        description: '1–3 unterschiedliche Arenen',
      },
    },
  },
  boss: {
    name: 'boss',
    description: 'Zeigt Infos zu einem Bossmonster',
    options: {
      name: {
        name: 'name',
        description: 'Bossmonster auswählen',
      },
    },
  },
  bracket: {
    name: 'bracket',
    description: 'Zeigt das Bracket der aktuellen Phase',
  },
  hallOfFame: {
    name: 'hall_of_fame',
    description: 'Zeigt vergangene Turniere (Podium)',
  },
  hilfe: {
    name: 'hilfe',
    description: 'Zeigt die Hilfeseite mit allen Befehlen',
  },
  regeln: {
    name: 'regeln',
    description: 'Zeigt die Turnierregeln',
  },
  turnierInfo: {
    name: 'turnier_info',
    description: 'Zeigt eine kompakte Übersicht zum laufenden Turnier',
  },
  ergebnisSetzen: {
    name: 'ergebnis_setzen',
    description: 'Setzt/Korrigiert das Ergebnis eines Kampfes',
    options: {
      gruppe: {
        name: 'gruppe',
        description: 'Gruppe auswählen (Autocomplete)',
      },
      kampf: {
        name: 'kampf',
        description: 'Kampf in der gewählten Gruppe (Autocomplete)',
      },
      kampfId: {
        name: 'kampf_id',
        description: 'ID des Kampfes (Fallback)',
      },
    },
  },
  ergebnisseWuerfeln: {
    name: 'ergebnisse_wuerfeln',
    description: 'Setzt zufällige Ergebnisse für die aktuelle Phase',
    options: {
      nurOffene: {
        name: 'nur_offene',
        description: 'Nur offene Kämpfe würfeln (empfohlen)',
      },
    },
  },
  fakeAnmeldungen: {
    name: 'fake_anmeldungen',
    description: 'Admin: Fügt N fiktive Teilnehmer (zum Testen) hinzu',
    options: {
      anzahl: {
        name: 'anzahl',
        description:
          'Wie viele Fake-Teilnehmer hinzufügen (wird ggf. auf gerade Gesamtzahl korrigiert)',
      },
      reset: {
        name: 'reset',
        description: 'Vorherige Anmeldungen löschen und nur Fake-Teilnehmer behalten?',
      },
    },
  },
  hofLoeschen: {
    name: 'hof_loeschen',
    description: 'Admin: Löscht einen Hall-of-Fame-Eintrag per Turniernummer',
    options: {
      nummer: {
        name: 'nummer',
        description: 'Turniernummer (z. B. 3 für Nemesis Turnier #3)',
      },
    },
  },
  pottSetzen: {
    name: 'pott_setzen',
    description: 'Admin: Pott & Aufteilung (Top 3) setzen',
  },
  teilnehmerErsetzen: {
    name: 'teilnehmer_ersetzen',
    description:
      'Admin: Teilnehmer (ID/Name) auf anderen User umstellen und/oder Klasse/Name ändern',
    options: {
      teilnehmer: {
        name: 'teilnehmer',
        description: 'ID oder exakter Name des vorhandenen Teilnehmers',
      },
      user: {
        name: 'user',
        description: 'Ziel-Discord-User (wenn leer: nur Klasse/Name ändern)',
      },
      klasse: {
        name: 'klasse',
        description: 'Neue Klasse (wenn leer: alte Klasse bleibt)',
      },
      name: {
        name: 'name',
        description: 'Neuer Anzeigename (optional)',
      },
    },
  },
  turnierStart: {
    name: 'turnier_start',
    description: 'Startet das Turnier',
  },
  turnierStop: {
    name: 'turnier_stop',
    description: 'Beendet das Turnier',
  },
  turnierAdvance: {
    name: 'turnier_advance',
    description: 'Schaltet in die nächste Turnierphase (Quali → Gruppen → KO → Finale)',
  },
  pvmStart: {
    name: 'pvm_start',
    description: 'Startet ein PvM Event',
  },
  pvmStop: {
    name: 'pvm_stop',
    description: 'Beendet das PvM Event',
  },
  dungeonSetzen: {
    name: 'dungeon_setzen',
    description: 'Fügt einen Dungeon zum PvM Event hinzu',
    options: {
      name: {
        name: 'name',
        description: 'Name des Dungeons',
      },
    },
  },
};

module.exports = commands;