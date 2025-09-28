const commands = {
  registrieren: {
    name: 'register',
    description: 'Register for the tournament',
  },
  arena: {
    name: 'arena',
    description: 'Random arena selection',
    options: {
      anzahl: {
        name: 'count',
        description: '1-3 different arenas',
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
  hallOfFame: {
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
  pvpInfo: {
    name: 'pvp_info',
    description: 'Show a compact overview of the current tournament',
  },
  ergebnisSetzen: {
    name: 'set_result',
    description: 'Set or correct the result of a match',
    options: {
      gruppe: {
        name: 'group',
        description: 'Select group (autocomplete)',
      },
      kampf: {
        name: 'match',
        description: 'Match in the selected group (autocomplete)',
      },
      kampfId: {
        name: 'match_id',
        description: 'ID of the match (fallback)',
      },
    },
  },
  ergebnisseWuerfeln: {
    name: 'roll_results',
    description: 'Roll random results for the current phase',
    options: {
      nurOffene: {
        name: 'open_only',
        description: 'Roll only open matches (recommended)',
      },
    },
  },
  fakeAnmeldungen: {
    name: 'fake_registrations',
    description: 'Admin: Add N fictitious participants (for testing)',
    options: {
      anzahl: {
        name: 'amount',
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
    description: 'Admin: Set the bot language for this server',
    options: {
      language: {
        name: 'language',
        description: 'Select the language for the bot',
      },
    },
  },
  guildName: {
    name: 'guild_name',
    description: 'Admin: Set the guild name override used when naming tournaments',
    options: {
      name: {
        name: 'name',
        description: 'Leave empty to remove the override and use the server name again',
      },
    },
  },
  hofLoeschen: {
    name: 'delete_hof',
    description: 'Admin: Delete a hall of fame entry by tournament number or name',
    options: {
      nummer: {
        name: 'number',
        description: 'Tournament number (e.g. 3 for Nemesis Tournament #3)',
      },
      name: {
        name: 'name',
        description: 'Exact tournament name (e.g. "Test")',
      },
    },
  },
  pottSetzen: {
    name: 'set_pot',
    description: 'Admin: Set prize pot and distribution (top 3)',
  },
  teilnehmerErsetzen: {
    name: 'replace_participant',
    description: 'Admin: Reassign a participant (ID/name) to another user and/or change class/name',
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
        description: 'New class (leave empty to keep the current one)',
      },
      name: {
        name: 'name',
        description: 'New display name (optional)',
      },
    },
  },
  pvpStart: {
    name: 'start_tournament',
    description: 'Start the tournament (choose the mode)',
    options: {
      modus: {
        name: 'mode',
        description: 'Tournament mode (1v1, 2v2, 3v3, 4v4)',
      },
      name: {
        name: 'name',
        description: 'Optional tournament name (leave empty for automatic naming)',
      },
    },
  },
  pvpStop: {
    name: 'pvp_stop',
    description: 'Stop the tournament',
  },
  pvpNext: {
    name: 'pvp_next',
    description: 'Advance to the next tournament phase (Qualifiers -> Groups -> KO -> Finals)',
  },
  pvmStart: {
    name: 'pvm_start',
    description: 'Start a PvM event',
  },
  pvmStop: {
    name: 'pvm_stop',
    description: 'End the PvM event',
  },
  addDungeon: {
    name: 'add_dungeon',
    description: 'Add a dungeon to the PvM event',
    options: {
      name: {
        name: 'name',
        description: 'Name of the dungeon',
      },
    },
  },
};

module.exports = commands;