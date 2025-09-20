'use strict';

const FORMAT_TEAM_SIZE = {
  '1v1': 1,
  '2v2': 2,
  '3v3': 3,
  '4v4': 4,
};

/**
 * Validates whether a total participant count is compatible with a given format.
 * @param {number} nTotal
 * @param {'1v1'|'2v2'|'3v3'|'4v4'} format
 * @returns {{ ok: boolean, reason?: string }}
 */
function validateFormat(nTotal, format) {
  if (!Number.isInteger(nTotal) || nTotal <= 0) {
    return { ok: false, reason: 'Teilnehmerzahl muss eine positive ganze Zahl sein.' };
  }

  if (!Object.prototype.hasOwnProperty.call(FORMAT_TEAM_SIZE, format)) {
    return { ok: false, reason: 'Unbekanntes Format.' };
  }

  if (nTotal % 2 !== 0) {
    return { ok: false, reason: 'Teilnehmerzahl muss gerade sein.' };
  }

  const teamSize = FORMAT_TEAM_SIZE[format];
  if (nTotal % teamSize !== 0) {
    return { ok: false, reason: `Teilnehmerzahl muss durch ${teamSize} teilbar sein.` };
  }

  const teamCount = nTotal / teamSize;
  if (teamCount < 2) {
    return { ok: false, reason: 'Mindestens 2 Teams erforderlich.' };
  }

  if (teamCount % 2 !== 0) {
    return { ok: false, reason: 'Teamanzahl muss gerade sein.' };
  }

  return { ok: true };
}

module.exports = {
  FORMAT_TEAM_SIZE,
  validateFormat,
};