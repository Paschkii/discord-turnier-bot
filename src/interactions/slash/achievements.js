// === Imports ===
const achievements = require('../../config/constants/achievements');
const { createListCommand } = require('./listCommandFactory');

const COPY = {
  title: {
    de: '🏆 Erfolgsübersicht',
    en: '🏆 Achievement Overview',
    fr: '🏆 Aperçu des succès',
    es: '🏆 Resumen de logros',
    it: '🏆 Panoramica degli obiettivi',
    pt: '🏆 Visão geral das conquistas',
  },
  description: {
    de: 'Alle Erfolge und ihre Beschreibungen.',
    en: 'List of all achievements and their descriptions.',
    fr: 'Liste de tous les succès et leurs descriptions.',
    es: 'Lista de todos los logros y sus descripciones.',
    it: 'Elenco di tutti gli obiettivi con descrizione.',
    pt: 'Lista de todas as conquistas e suas descrições.',
  },
  empty: {
    de: 'Keine Erfolge gefunden.',
    en: 'No achievements available.',
    fr: 'Aucun succès disponible.',
    es: 'No hay logros disponibles.',
    it: 'Nessun obiettivo disponibile.',
    pt: 'Nenhuma conquista disponível.',
  },
};

const createEntry = (id, fallback) => {
  if (typeof achievements.create === 'function') {
    const entry = achievements.create(id);
    if (entry) {
      return entry;
    }
  }
  return fallback;
};

module.exports = {
  execute: createListCommand({
    list: achievements,
    copy: COPY,
    createEntry,
  }),
};