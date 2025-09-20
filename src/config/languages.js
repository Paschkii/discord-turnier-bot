const SLASH_COMMAND_LANGUAGE_CONFIG = [
  {
    localeCodes: ['en-US', 'en-GB'],
    commands: {
      anmelden: {
        name: 'register',
        description: 'Sign up for the tournament',
      },
      arena: {
        name: 'arena',
        description: 'Random arena selection',
        options: {
          anzahl: {
            name: 'count',
            description: '1–3 different arenas',
          },
        },
      },
      boss: {
        name: 'boss',
        description: 'Show information about a boss monster',
        options: {
          name: {
            name: 'name',
            description: 'Select a boss monster',
          },
        },
      },
      bracket: {
        name: 'bracket',
        description: 'Show the bracket of the current phase',
      },
      hall_of_fame: {
        name: 'hall_of_fame',
        description: 'Show past tournaments (podium)',
      },
      hilfe: {
        name: 'help',
        description: 'Show the help page with all commands',
      },
      regeln: {
        name: 'rules',
        description: 'Show the tournament rules',
      },
      turnier_info: {
        name: 'tournament_info',
        description: 'Show a compact overview of the ongoing tournament',
      },
      ergebnis_setzen: {
        name: 'set_result',
        description: 'Set or correct the result of a match',
        options: {
          gruppe: {
            name: 'group',
            description: 'Select a group (autocomplete)',
          },
          kampf: {
            name: 'match',
            description: 'Match in the selected group (autocomplete)',
          },
          kampf_id: {
            name: 'match_id',
            description: 'ID of the match (fallback)',
          },
        },
      },
      ergebnisse_wuerfeln: {
        name: 'roll_results',
        description: 'Set random results for the current phase',
        options: {
          nur_offene: {
            name: 'open_only',
            description: 'Roll only open matches (recommended)',
          },
        },
      },
      fake_anmeldungen: {
        name: 'fake_registrations',
        description: 'Add N fake participants (for testing)',
        options: {
          anzahl: {
            name: 'count',
            description: 'How many fake participants to add (may adjust to an even total)',
          },
          reset: {
            name: 'reset',
            description: 'Delete previous registrations and keep only fake participants?',
          },
        },
      },
       language: {
        name: 'language',
        description: 'Set the bot language for this server',
        options: {
          language: {
            name: 'language',
            description: 'Select the language for the bot',
          },
        },
      },
      hof_loeschen: {
        name: 'delete_hof',
        description: 'Delete a hall of fame entry by tournament number',
        options: {
          nummer: {
            name: 'number',
            description: 'Tournament number (e.g. 3 for Nemesis Tournament #3)',
          },
        },
      },
      pott_setzen: {
        name: 'set_pot',
        description: 'Set the prize pot and distribution (top 3)',
      },
      teilnehmer_ersetzen: {
        name: 'replace_participant',
        description: 'Switch a participant to another user and/or change class/name',
        options: {
          teilnehmer: {
            name: 'participant',
            description: 'ID or exact name of the existing participant',
          },
          user: {
            name: 'user',
            description: 'Target Discord user (leave empty to only change class/name)',
          },
          klasse: {
            name: 'class',
            description: 'New class (leave empty to keep current class)',
          },
          name: {
            name: 'name',
            description: 'New display name (optional)',
          },
        },
      },
      turnier_start: {
        name: 'start_tournament',
        description: 'Start the tournament',
      },
      turnier_stop: {
        name: 'stop_tournament',
        description: 'End the tournament',
      },
      turnier_advance: {
        name: 'advance_tournament',
        description: 'Advance to the next tournament phase (Qualification → Groups → KO → Finals)',
      },
      pvm_start: {
        name: 'start_pvm',
        description: 'Start a PvM event',
      },
      pvm_stop: {
        name: 'stop_pvm',
        description: 'End the PvM event',
      },
      dungeon_setzen: {
        name: 'add_dungeon',
        description: 'Add a dungeon to the PvM event',
        options: {
          name: {
            name: 'name',
            description: 'Name of the dungeon',
          },
        },
      },
    },
  },
];

module.exports = { SLASH_COMMAND_LANGUAGE_CONFIG };