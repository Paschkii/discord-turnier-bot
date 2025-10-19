// === Imports ===
const { CHALLENGE_KEYS } = require('../../config/constants/achievementsChallenges');
const { EMOJI_LIST } = require('../../config/constants/emojis');
const { createListCommand } = require('./listCommandFactory');
const { buildEntries } = require('./achievementsChallengesHelper');

const COPY = {
  title: {
    de: '⚔️ Herausforderungen',
    en: '⚔️ Challenges',
    fr: '⚔️ Défis',
    es: '⚔️ Desafíos',
    it: '⚔️ Sfide',
    pt: '⚔️ Desafios',
  },
  description: {
    de: 'Alle Herausforderungen und ihre Beschreibungen.',
    en: 'List of all challenges and their descriptions.',
    fr: 'Liste de tous les défis et leurs descriptions.',
    es: 'Lista de todos los desafíos y sus descripciones.',
    it: 'Elenco di tutte le sfide con descrizione.',
    pt: 'Lista de todos os desafios e suas descrições.',
  },
  empty: {
    de: 'Keine Herausforderungen gefunden.',
    en: 'No challenges available.',
    fr: 'Aucun défi disponible.',
    es: 'No hay desafíos disponibles.',
    it: 'Nessuna sfida disponibile.',
    pt: 'Nenhum desafio disponível.',
  },
};

module.exports = {
  execute: createListCommand({
    list: buildEntries(
      CHALLENGE_KEYS,
      'challenges',
      EMOJI_LIST?.challenges,
    ),
    copy: COPY,
  }),
};