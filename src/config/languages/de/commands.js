const commands = {
  registrieren: {
    name: 'registrieren',
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
  achievements: {
    name: 'achievements',
    description: 'Zeigt eine Liste aller Erfolge mit Beschreibung',
  },
  boss: {
    name: 'boss',
    description: 'Zeigt Infos zu einem Bossmonster',
    options: {
      name: {
        name: 'name',
        description: 'Bossmonster auswählen',
      },
      location: {
        name: 'location',
        description: 'Wähle den Dungeon (Heimat oder alternative Fundorte)',
        choices: {
          home: {
            name: 'Heimat-Dungeon',
            value: 'home',
          },
          alternate: {
            name: 'Alternative Dungeons',
            value: 'alternate',
          },
        },
      },
    },
  },
  challenges: {
    name: 'challenges',
    description: 'Zeigt eine Liste aller Herausforderungen mit Beschreibung',
  },
  dungeon: {
    name: 'dungeon',
    description: 'Zeigt Infos zu einem Dungeon',
    options: {
      name: {
        name: 'name',
        description: 'Dungeon auswählen',
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
  job: {
    name: 'job',
    description: 'Verwalte Berufe und Level',
    subcommands: {
      list: {
        name: 'list',
        description: 'Zeigt alle verfügbaren Berufe',
      },
      set: {
        name: 'set',
        description: 'Trage deinen Beruf und dein Level ein',
        options: {
          profession: {
            name: 'profession',
            description: 'Beruf auswählen (Autocomplete)',
          },
          level: {
            name: 'level',
            description: 'Level zwischen 1 und 100 (optional)',
          },
        },
      },
      user: {
        name: 'user',
        description: 'Zeigt die eingetragenen Berufe eines Mitglieds',
        options: {
          target: {
            name: 'user',
            description: 'Mitglied auswählen',
          },
        },
      },
      profession: {
        name: 'profession',
        description: 'Listet alle Mitglieder für einen Beruf auf',
        options: {
          profession: {
            name: 'profession',
            description: 'Beruf auswählen (Autocomplete)',
          },
        },
      },
      help: {
        name: 'help',
        description: 'Zeigt Infos zum Job-Befehl',
      },
    },
  },
  regeln: {
    name: 'regeln',
    description: 'Zeigt die Turnierregeln',
  },
  pvpInfo: {
    name: 'pvp_info',
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
  language: {
    name: 'language',
    description: 'Admin: Stelle die Bot-Sprache für diesen Server ein',
    options: {
      language: {
        name: 'language',
        description: 'Wähle die Sprache für den Bot',
      },
    },
  },
  guildName: {
    name: 'guild_name',
    description: 'Admin: Setzt einen benutzerdefinierten Gildennamen für die Turnier-Benennung',
    options: {
      name: {
        name: 'name',
        description: 'Leer lassen, um den Eintrag zu löschen und wieder den Servernamen zu verwenden',
      },
    },
  },
  hofLoeschen: {
    name: 'hof_loeschen',
    description: 'Admin: Löscht einen Hall-of-Fame-Eintrag per Turniernummer oder Namen',
    options: {
      nummer: {
        name: 'nummer',
        description: 'Turniernummer (z. B. 3 für Nemesis Turnier #3)',
      },
      name: {
        name: 'name',
        description: 'Exakter Turniername (z. B. „Test“)',
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
  pvpStart: {
    name: 'pvp_start',
    description: 'Startet das Turnier (Modus auswählen)',
    options: {
      modus: {
        name: 'modus',
        description: 'Turniermodus (1v1, 2v2, 3v3, 4v4)',
      },
      name: {
        name: 'name',
        description: 'Optionaler Turniername (leer = automatische Benennung)',
      },
    },
  },
  pvpStop: {
    name: 'pvp_stop',
    description: 'Beendet das Turnier',
  },
  pvpNext: {
    name: 'pvp_next',
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
  addDungeon: {
    name: 'add_dungeon',
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