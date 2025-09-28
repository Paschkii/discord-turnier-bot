const commands = {
  registrieren: {
    name: 'registrar',
    description: 'Inscríbete en el torneo',
  },
  arena: {
    name: 'arena',
    description: 'Selección aleatoria de arena',
    options: {
      anzahl: {
        name: 'cantidad',
        description: '1 a 3 arenas diferentes',
      },
    },
  },
  boss: {
    name: 'boss',
    description: 'Muestra información sobre un jefe',
    options: {
      name: {
        name: 'nombre',
        description: 'Selecciona un jefe',
      },
    },
  },
  bracket: {
    name: 'bracket',
    description: 'Muestra el cuadro de la fase actual',
  },
  hallOfFame: {
    name: 'hall_of_fame',
    description: 'Muestra torneos anteriores (podio)',
  },
  hilfe: {
    name: 'ayuda',
    description: 'Muestra la página de ayuda con todos los comandos',
  },
  regeln: {
    name: 'reglas',
    description: 'Muestra las reglas del torneo',
  },
  pvpInfo: {
    name: 'pvp_info',
    description: 'Muestra un resumen del torneo en curso',
  },
  ergebnisSetzen: {
    name: 'fijar_resultado',
    description: 'Establece o corrige el resultado de un combate',
    options: {
      gruppe: {
        name: 'grupo',
        description: 'Selecciona un grupo (autocompletar)',
      },
      kampf: {
        name: 'combate',
        description: 'Combate del grupo seleccionado (autocompletar)',
      },
      kampfId: {
        name: 'id_combate',
        description: 'ID del combate (respaldo)',
      },
    },
  },
  ergebnisseWuerfeln: {
    name: 'lanzar_resultados',
    description: 'Genera resultados aleatorios para la fase actual',
    options: {
      nurOffene: {
        name: 'solo_abiertos',
        description: 'Solo lanzar combates abiertos (recomendado)',
      },
    },
  },
  fakeAnmeldungen: {
    name: 'registros_falsos',
    description: 'Admin: añade N participantes ficticios (para pruebas)',
    options: {
      anzahl: {
        name: 'cantidad',
        description: 'Cuántos participantes ficticios agregar (puede ajustarse a un total par)',
      },
      reset: {
        name: 'reiniciar',
        description: '¿Eliminar registros anteriores y mantener solo los participantes ficticios?',
      },
    },
  },
  language: {
    name: 'language',
    description: 'Admin: establece el idioma del bot para este servidor',
    options: {
      language: {
        name: 'language',
        description: 'Selecciona el idioma del bot',
      },
    },
  },
  guildName: {
    name: 'guild_name',
    description: 'Admin: establece un nombre de gremio personalizado para nombrar torneos',
    options: {
      name: {
        name: 'nombre',
        description: 'Déjalo vacío para quitarlo y usar nuevamente el nombre del servidor',
      },
    },
  },
  hofLoeschen: {
    name: 'eliminar_salon',
    description: 'Admin: elimina una entrada del salón de la fama por número o nombre del torneo',
    options: {
      nummer: {
        name: 'numero',
        description: 'Número del torneo (p. ej. 3 para Nemesis Torneo #3)',
      },
      name: {
        name: 'nombre',
        description: 'Admin: elimina una entrada del salón de la fama por número o nombre del torneo',
      },
    },
  },
  pottSetzen: {
    name: 'definir_bote',
    description: 'Admin: define el bote y la distribución (top 3)',
  },
  teilnehmerErsetzen: {
    name: 'reemplazar_participante',
    description: 'Admin: reasigna un participante (ID/nombre) a otro usuario y/o cambia clase/nombre',
    options: {
      teilnehmer: {
        name: 'participante',
        description: 'ID o nombre exacto del participante existente',
      },
      user: {
        name: 'usuario',
        description: 'Usuario de Discord destino (déjalo vacío para solo cambiar clase/nombre)',
      },
      klasse: {
        name: 'clase',
        description: 'Nueva clase (déjalo vacío para mantener la actual)',
      },
      name: {
        name: 'nombre',
        description: 'Nuevo nombre visible (opcional)',
      },
    },
  },
  pvpStart: {
    name: 'pvp_start',
    description: 'Inicia el torneo',
    options: {
      name: {
        name: 'nombre',
        description: 'Nombre del torneo (opcional, deja vacío para el nombrado automático)',
      },
    },
  },
  pvpStop: {
    name: 'pvp_stop',
    description: 'Detiene el torneo',
  },
  pvpNext: {
    name: 'pvp_next',
    description: 'Avanza a la siguiente fase del torneo (Clasificatorias -> Grupos -> Eliminación -> Final)',
  },
  pvmStart: {
    name: 'pvm_start',
    description: 'Inicia un evento PvM',
  },
  pvmStop: {
    name: 'pvm_stop',
    description: 'Finaliza el evento PvM',
  },
  addDungeon: {
    name: 'add_dungeon',
    description: 'Agrega un mazmorra al evento PvM',
    options: {
      name: {
        name: 'nombre',
        description: 'Nombre del mazmorra',
      },
    },
  },
};

module.exports = commands;