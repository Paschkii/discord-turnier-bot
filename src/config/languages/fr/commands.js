const commands = {
  registrieren: {
    name: 'registre',
    description: 'Inscris-toi au tournoi',
  },
  arena: {
    name: 'arene',
    description: 'Sélection d\'arène aléatoire',
    options: {
      anzahl: {
        name: 'quantite',
        description: '1 à 3 arènes différentes',
      },
    },
  },
  boss: {
    name: 'boss',
    description: 'Affiche les informations d\'un boss',
    options: {
      name: {
        name: 'nom',
        description: 'Choisis un boss',
      },
    },
  },
  bracket: {
    name: 'tableau',
    description: 'Affiche le tableau de la phase actuelle',
  },
  hallOfFame: {
    name: 'pantheon',
    description: 'Affiche les anciens tournois (podium)',
  },
  hilfe: {
    name: 'aide',
    description: 'Affiche la page d\'aide avec toutes les commandes',
  },
  regeln: {
    name: 'regles',
    description: 'Affiche les règles du tournoi',
  },
  pvpInfo: {
    name: 'pvp_info',
    description: 'Affiche un aperçu du tournoi en cours',
  },
  ergebnisSetzen: {
    name: 'definir_resultat',
    description: 'Définir ou corriger le résultat d\'un match',
    options: {
      gruppe: {
        name: 'groupe',
        description: 'Choisis un groupe (saisie semi-automatique)',
      },
      kampf: {
        name: 'combat',
        description: 'Combat du groupe sélectionné (saisie semi-automatique)',
      },
      kampfId: {
        name: 'id_combat',
        description: 'ID du combat (secours)',
      },
    },
  },
  ergebnisseWuerfeln: {
    name: 'tirer_resultats',
    description: 'Tirer des résultats aléatoires pour la phase actuelle',
    options: {
      nurOffene: {
        name: 'uniquement_ouverts',
        description: 'Ne tirer que les combats ouverts (recommandé)',
      },
    },
  },
  fakeAnmeldungen: {
    name: 'inscriptions_factices',
    description: 'Admin : ajoute N participants fictifs (pour les tests)',
    options: {
      anzahl: {
        name: 'quantite',
        description: 'Nombre de participants fictifs à ajouter (ajuste à un total pair si nécessaire)',
      },
      reset: {
        name: 'reinitialiser',
        description: 'Supprimer les inscriptions précédentes et garder seulement les participants fictifs ?',
      },
    },
  },
  language: {
    name: 'language',
    description: 'Admin : définir la langue du bot pour ce serveur',
    options: {
      language: {
        name: 'language',
        description: 'Choisir la langue du bot',
      },
    },
  },
  guildName: {
    name: 'guild_name',
    description: 'Admin : définir un nom de guilde personnalisé pour nommer les tournois',
    options: {
      name: {
        name: 'nom',
        description: 'Laisser vide pour supprimer et réutiliser le nom du serveur',
      },
    },
  },
  hofLoeschen: {
    name: 'supprimer_pantheon',
    description: 'Admin : supprime une entrée du panthéon par numéro ou nom de tournoi',
    options: {
      nummer: {
        name: 'numero',
        description: 'Numéro du tournoi (ex. 3 pour Nemesis Tournoi #3)',
      },
      name: {
        name: 'nom',
        description: 'Nom exact du tournoi (ex. "Test")',
      },
    },
  },
  pottSetzen: {
    name: 'definir_cagnotte',
    description: 'Admin : définir la cagnotte et la répartition (top 3)',
  },
  teilnehmerErsetzen: {
    name: 'remplacer_participant',
    description: 'Admin : réaffecter un participant (ID/nom) à un autre utilisateur et/ou changer classe/nom',
    options: {
      teilnehmer: {
        name: 'participant',
        description: 'ID ou nom exact du participant existant',
      },
      user: {
        name: 'utilisateur',
        description: 'Utilisateur Discord cible (laisser vide pour seulement changer classe/nom)',
      },
      klasse: {
        name: 'classe',
        description: 'Nouvelle classe (laisser vide pour garder l\'ancienne)',
      },
      name: {
        name: 'nom',
        description: 'Nouveau nom d\'affichage (optionnel)',
      },
    },
  },
  pvpStart: {
    name: 'pvp_start',
    description: 'Démarrer le tournoi (choisir le mode)',
    options: {
      modus: {
        name: 'mode',
        description: 'Mode de tournoi (1v1, 2v2, 3v3, 4v4)',
      },
      name: {
        name: 'nom',
        description: 'Nom du tournoi (optionnel, laissez vide pour la génération automatique)',
      },
    },
  },
  pvpStop: {
    name: 'pvp_stop',
    description: 'Arrêter le tournoi',
  },
  pvpNext: {
    name: 'pvp_next',
    description: 'Passer à la phase suivante (Qualifs -> Groupes -> KO -> Finale)',
  },
  pvmStart: {
    name: 'pvm_start',
    description: 'Démarrer un événement PvM',
  },
  pvmStop: {
    name: 'pvm_stop',
    description: 'Arrêter l\'événement PvM',
  },
  addDungeon: {
    name: 'add_dungeon',
    description: 'Ajouter un donjon à l\'événement PvM',
    options: {
      name: {
        name: 'nom',
        description: 'Nom du donjon',
      },
    },
  },
};

module.exports = commands;