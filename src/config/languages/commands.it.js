const commands = {
  registrieren: {
    name: 'iscrizione',
    description: 'Iscriviti al torneo',
  },
  arena: {
    name: 'arena',
    description: "Selezione casuale dell'arena",
    options: {
      anzahl: {
        name: 'quantita',
        description: '1-3 arene diverse',
      },
    },
  },
  boss: {
    name: 'boss',
    description: 'Mostra informazioni su un boss',
    options: {
      name: {
        name: 'nome',
        description: 'Seleziona un boss',
      },
    },
  },
  bracket: {
    name: 'tabellone',
    description: 'Mostra il tabellone della fase attuale',
  },
  hallOfFame: {
    name: 'albo_doro',
    description: 'Mostra i tornei passati (podio)',
  },
  hilfe: {
    name: 'aiuto',
    description: 'Mostra la pagina di aiuto con tutti i comandi',
  },
  regeln: {
    name: 'regole',
    description: 'Mostra le regole del torneo',
  },
  pvpInfo: {
    name: 'pvp_info',
    description: 'Mostra una panoramica del torneo in corso',
  },
  ergebnisSetzen: {
    name: 'imposta_risultato',
    description: "Imposta o correggi il risultato di un incontro",
    options: {
      gruppe: {
        name: 'gruppo',
        description: 'Seleziona un gruppo (autocomplete)',
      },
      kampf: {
        name: 'incontro',
        description: 'Incontro del gruppo selezionato (autocomplete)',
      },
      kampfId: {
        name: 'id_incontro',
        description: "ID dell'incontro (fallback)",
      },
    },
  },
  ergebnisseWuerfeln: {
    name: 'lancia_risultati',
    description: 'Lancia risultati casuali per la fase attuale',
    options: {
      nurOffene: {
        name: 'solo_aperti',
        description: 'Lancia solo gli incontri aperti (consigliato)',
      },
    },
  },
  fakeAnmeldungen: {
    name: 'iscrizioni_fittizie',
    description: 'Admin: aggiunge N partecipanti fittizi (per test)',
    options: {
      anzahl: {
        name: 'quantita',
        description: 'Quanti partecipanti fittizi aggiungere (può adeguarsi a un totale pari)',
      },
      reset: {
        name: 'reset',
        description: 'Cancellare le iscrizioni precedenti e mantenere solo i partecipanti fittizi?',
      },
    },
  },
  language: {
    name: 'language',
    description: 'Admin: imposta la lingua del bot per questo server',
    options: {
      language: {
        name: 'language',
        description: 'Seleziona la lingua del bot',
      },
    },
  },
  hofLoeschen: {
    name: 'elimina_albo',
    description: "Admin: elimina una voce dell'albo d'oro per numero di torneo",
    options: {
      nummer: {
        name: 'numero',
        description: "Numero del torneo (es. 3 per Nemesis Torneo #3)",
      },
    },
  },
  pottSetzen: {
    name: 'imposta_montepremi',
    description: 'Admin: imposta il montepremi e la distribuzione (top 3)',
  },
  teilnehmerErsetzen: {
    name: 'sostituisci_partecipante',
    description: 'Admin: riassegna un partecipante (ID/nome) a un altro utente e/o cambia classe/nome',
    options: {
      teilnehmer: {
        name: 'partecipante',
        description: 'ID o nome esatto del partecipante esistente',
      },
      user: {
        name: 'utente',
        description: 'Utente Discord di destinazione (lascia vuoto per cambiare solo classe/nome)',
      },
      klasse: {
        name: 'classe',
        description: 'Nuova classe (lascia vuoto per mantenere quella attuale)',
      },
      name: {
        name: 'nome',
        description: 'Nuovo nome visualizzato (opzionale)',
      },
    },
  },
  pvpStart: {
    name: 'pvp_start',
    description: 'Avvia il torneo',
    options: {
      name: {
        name: 'nome',
        description: 'Nome del torneo (opzionale, lascia vuoto per la denominazione automatica)',
      },
    },
  },
  pvpStop: {
    name: 'pvp_stop',
    description: 'Ferma il torneo',
  },
  pvpNext: {
    name: 'pvp_next',
    description: 'Passa alla fase successiva del torneo (Qualificazioni -> Gironi -> KO -> Finale)',
  },
  pvmStart: {
    name: 'pvm_start',
    description: 'Avvia un evento PvM',
  },
  pvmStop: {
    name: 'pvm_stop',
    description: "Termina l'evento PvM",
  },
  addDungeon: {
    name: 'add_dungeon',
    description: "Aggiungi un dungeon all'evento PvM",
    options: {
      name: {
        name: 'nome',
        description: 'Nome del dungeon',
      },
    },
  },
};

module.exports = commands;