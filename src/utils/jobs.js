const { jobList, JOB_ID_SET, JOB_TYPE_ORDER } = require('../config/constants/jobs');
const jobNamesByLocale = require('../config/languages/jobNames');
const { getEmojiByKey } = require('../config/constants/emojiSnapshot');

const DEFAULT_LOCALE = 'en';
const JOB_EMOJI_OVERRIDES = {
  handyman: 'handymen',
};

const collatorCache = new Map();

function getLocale(locale) {
  if (locale && jobNamesByLocale[locale]) {
    return locale;
  }
  return DEFAULT_LOCALE;
}

function getCollator(locale) {
  const normalized = getLocale(locale);
  if (!collatorCache.has(normalized)) {
    collatorCache.set(normalized, new Intl.Collator(normalized, { sensitivity: 'base' }));
  }
  return collatorCache.get(normalized);
}

function normalizeJobId(jobId) {
  if (typeof jobId !== 'string') return '';
  return jobId.trim().toLowerCase();
}

function isValidJobId(jobId) {
  return JOB_ID_SET.has(normalizeJobId(jobId));
}

function getJobName(jobId, locale) {
  const normalizedId = normalizeJobId(jobId);
  if (!normalizedId) return '';
  const names = jobNamesByLocale[getLocale(locale)] || {};
  const fallbackNames = jobNamesByLocale[DEFAULT_LOCALE] || {};
  return (
    names[normalizedId]
    || fallbackNames[normalizedId]
    || normalizedId.charAt(0).toUpperCase() + normalizedId.slice(1)
  );
}

function getJobEmoji(jobId) {
  const normalizedId = normalizeJobId(jobId);
  if (!normalizedId) return '';
  const key = JOB_EMOJI_OVERRIDES[normalizedId] || normalizedId;
  const emoji = getEmojiByKey(key);
  return emoji?.mention || '';
}

function buildJobEntries(locale) {
  return jobList.map(({ id, type, variantGroup }) => ({
    id,
    type,
    variantGroup: variantGroup || '',
    name: getJobName(id, locale),
    emoji: getJobEmoji(id),
  }));
}

function sortJobsAlphabetically(entries, locale) {
  const collator = getCollator(locale);
  return [...entries].sort((a, b) => {
    const nameCompare = collator.compare(a.name, b.name);
    if (nameCompare !== 0) return nameCompare;
    return a.id.localeCompare(b.id);
  });
}

function sortJobsByType(entries, locale) {
  const collator = getCollator(locale);
  const typeRank = (type) => {
    const index = JOB_TYPE_ORDER.indexOf(type);
    return index === -1 ? JOB_TYPE_ORDER.length : index;
  };

  return [...entries].sort((a, b) => {
    const typeCompare = typeRank(a.type) - typeRank(b.type);
    if (typeCompare !== 0) return typeCompare;

    const nameCompare = collator.compare(a.name, b.name);
    if (nameCompare !== 0) return nameCompare;

    return a.id.localeCompare(b.id);
  });
}

function sortJobsByVariantGroup(entries, locale) {
  const collator = getCollator(locale);

  return [...entries].sort((a, b) => {
    const groupCompare = collator.compare(a.variantGroup, b.variantGroup);
    if (groupCompare !== 0) return groupCompare;

    const nameCompare = collator.compare(a.name, b.name);
    if (nameCompare !== 0) return nameCompare;

    return a.id.localeCompare(b.id);
  });
}

function buildJobChoices(locale, query = '', limit = 25) {
  const normalizedQuery = typeof query === 'string' ? query.trim().toLowerCase() : '';
  const entries = sortJobsAlphabetically(buildJobEntries(locale), locale).filter(({ id, name }) => {
    if (!normalizedQuery) return true;
    return (
      name.toLowerCase().includes(normalizedQuery)
      || id.toLowerCase().includes(normalizedQuery)
    );
  });
  return entries.slice(0, limit).map(({ id, name }) => ({ name, value: id }));
}

function getSortedJobs(locale, sortBy = 'alphabet') {
  const entries = buildJobEntries(locale);
  switch (sortBy) {
    case 'type':
      return sortJobsByType(entries, locale);
    case 'group':
      return sortJobsByVariantGroup(entries, locale);
    case 'alphabet':
    default:
      return sortJobsAlphabetically(entries, locale);
  }
}

function formatJobLabel(jobId, locale, { includeEmoji = true } = {}) {
  const name = getJobName(jobId, locale);
  if (!includeEmoji) return name;
  const emoji = getJobEmoji(jobId);
  return emoji ? `${emoji} ${name}` : name;
}

module.exports = {
  DEFAULT_LOCALE,
  buildJobChoices,
  formatJobLabel,
  getJobEmoji,
  getJobName,
  getSortedJobs,
  isValidJobId,
  normalizeJobId,
};