// === Imports ===
const challenges = require('../../config/constants/challenges');
const { createListCommand } = require('./listCommandFactory');

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

const createEntry = (id, fallback) => {
  if (typeof challenges.create === 'function') {
    const entry = challenges.create(id);
    if (entry) {
      return entry;
    }
  }
  return fallback;
};

module.exports = {
  execute: createListCommand({
    list: challenges,
    copy: COPY,
    createEntry,
  }),
};