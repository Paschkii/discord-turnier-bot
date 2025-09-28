const commands = {
  registrieren: {
    name: 'registrar',
    description: 'Inscreva-se no torneio',
  },
  arena: {
    name: 'arena',
    description: 'Seleção aleatória de arena',
    options: {
      anzahl: {
        name: 'quantidade',
        description: '1 a 3 arenas diferentes',
      },
    },
  },
  boss: {
    name: 'chefe',
    description: 'Mostra informações sobre um chefe',
    options: {
      name: {
        name: 'nome',
        description: 'Selecione um chefe',
      },
    },
  },
  bracket: {
    name: 'chaveamento',
    description: 'Mostra o chaveamento da fase atual',
  },
  hallOfFame: {
    name: 'hall_da_fama',
    description: 'Mostra torneios anteriores (pódio)',
  },
  hilfe: {
    name: 'ajuda',
    description: 'Mostra a página de ajuda com todos os comandos',
  },
  regeln: {
    name: 'regras',
    description: 'Mostra as regras do torneio',
  },
  pvpInfo: {
    name: 'pvp_info',
    description: 'Mostra um resumo do torneio atual',
  },
  ergebnisSetzen: {
    name: 'definir_resultado',
    description: 'Define ou corrige o resultado de uma partida',
    options: {
      gruppe: {
        name: 'grupo',
        description: 'Selecione um grupo (autocompletar)',
      },
      kampf: {
        name: 'combate',
        description: 'Combate no grupo selecionado (autocompletar)',
      },
      kampfId: {
        name: 'id_combate',
        description: 'ID do combate (alternativo)',
      },
    },
  },
  ergebnisseWuerfeln: {
    name: 'sortear_resultados',
    description: 'Sorteia resultados aleatórios para a fase atual',
    options: {
      nurOffene: {
        name: 'apenas_abertos',
        description: 'Sortear apenas combates abertos (recomendado)',
      },
    },
  },
  fakeAnmeldungen: {
    name: 'inscricoes_falsas',
    description: 'Admin: adiciona N participantes fictícios (para testes)',
    options: {
      anzahl: {
        name: 'quantidade',
        description: 'Quantos participantes fictícios adicionar (pode ajustar para total par)',
      },
      reset: {
        name: 'reiniciar',
        description: 'Remover inscrições anteriores e manter apenas os participantes fictícios?',
      },
    },
  },
  language: {
    name: 'language',
    description: 'Admin: define o idioma do bot para este servidor',
    options: {
      language: {
        name: 'language',
        description: 'Selecione o idioma do bot',
      },
    },
  },
  guildName: {
    name: 'guild_name',
    description: 'Admin: define um nome de guilda personalizado para nomear os torneios',
    options: {
      name: {
        name: 'nome',
        description: 'Deixe vazio para remover e usar novamente o nome do servidor',
      },
    },
  },
  hofLoeschen: {
    name: 'apagar_hall',
    description: 'Admin: remove uma entrada do hall da fama pelo número ou nome do torneio',
    options: {
      nummer: {
        name: 'numero',
        description: 'Número do torneio (ex.: 3 para Nemesis Torneio #3)',
      },
      name: {
        name: 'nome',
        description: 'Nome exato do torneio (ex.: "Test")',
      },
    },
  },
  pottSetzen: {
    name: 'definir_pote',
    description: 'Admin: define o prêmio e a divisão (top 3)',
  },
  teilnehmerErsetzen: {
    name: 'substituir_participante',
    description: 'Admin: reatribui um participante (ID/nome) para outro usuário e/ou altera classe/nome',
    options: {
      teilnehmer: {
        name: 'participante',
        description: 'ID ou nome exato do participante existente',
      },
      user: {
        name: 'usuario',
        description: 'Usuário Discord de destino (deixe vazio para apenas alterar classe/nome)',
      },
      klasse: {
        name: 'classe',
        description: 'Nova classe (deixe vazio para manter a atual)',
      },
      name: {
        name: 'nome',
        description: 'Novo nome exibido (opcional)',
      },
    },
  },
  pvpStart: {
    name: 'pvp_start',
    description: 'Inicia o torneio (escolha o modo)',
    options: {
      modus: {
        name: 'modo',
        description: 'Modo do torneio (1v1, 2v2, 3v3, 4v4)',
      },
      name: {
        name: 'nome',
        description: 'Nome do torneio (opcional, deixe vazio para nome automático)',
      },
    },
  },
  pvpStop: {
    name: 'pvp_stop',
    description: 'Encerra o torneio',
  },
  pvp_next: {
    name: 'pvp_next',
    description: 'Avança para a próxima fase do torneio (Qualificatórias -> Grupos -> KO -> Final)',
  },
  pvmStart: {
    name: 'pvm_start',
    description: 'Inicia um evento PvM',
  },
  pvmStop: {
    name: 'pvm_stop',
    description: 'Encerra o evento PvM',
  },
  addDungeon: {
    name: 'add_dungeon',
    description: 'Adiciona um dungeon ao evento PvM',
    options: {
      name: {
        name: 'nome',
        description: 'Nome do dungeon',
      },
    },
  },
};

module.exports = commands;