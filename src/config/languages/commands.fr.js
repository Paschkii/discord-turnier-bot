const commands = {
  anmelden: {
    name: 'inscription',
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
  turnierInfo: {
    name: 'infos_tournoi',
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
  hofLoeschen: {
    name: 'supprimer_pantheon',
    description: 'Admin : supprime une entrée du panthéon par numéro de tournoi',
    options: {
      nummer: {
        name: 'numero',
        description: 'Numéro du tournoi (ex. 3 pour Nemesis Tournoi #3)',
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
  turnierStart: {
    name: 'demarrer_tournoi',
    description: 'Démarrer le tournoi',
  },
  turnierStop: {
    name: 'arreter_tournoi',
    description: 'Arrêter le tournoi',
  },
  turnierAdvance: {
    name: 'avancer_tournoi',
    description: 'Passer à la phase suivante (Qualifs -> Groupes -> KO -> Finale)',
  },
  pvmStart: {
    name: 'demarrer_pvm',
    description: 'Démarrer un événement PvM',
  },
  pvmStop: {
    name: 'arreter_pvm',
    description: 'Arrêter l\'événement PvM',
  },
  dungeonSetzen: {
    name: 'ajouter_donjon',
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