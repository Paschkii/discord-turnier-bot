'use strict';

function normalizeDamageRange(damage = {}) {
  const min = Number(damage.min ?? damage.base ?? 0);
  const max = Number(damage.max ?? damage.base ?? min);
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return { min: 0, max: 0 };
  }
  return { min: Math.min(min, max), max: Math.max(min, max) };
}

function resolveStat(stats, key, fallback = 0) {
  if (!key) return fallback;
  const value = stats[key];
  return Number.isFinite(value) ? value : fallback;
}

function resolveNested(stats, path, fallback = 0) {
  if (!path) return fallback;
  const segments = Array.isArray(path) ? path : String(path).split('.');
  let node = stats;
  for (const seg of segments) {
    if (node && Object.prototype.hasOwnProperty.call(node, seg)) {
      node = node[seg];
    } else {
      return fallback;
    }
  }
  return Number.isFinite(node) ? node : fallback;
}

function applyStatScaling(baseRange, { primaryStat = 0, power = 0 } = {}) {
  const range = normalizeDamageRange(baseRange);
  const factor = (100 + Number(primaryStat) + Number(power)) / 100;
  const scaled = {
    min: range.min * factor,
    max: range.max * factor,
  };
  return { ...scaled, factor };
}

function applyResistances(range, { element, target = {}, type = 'damage' } = {}) {
  const normalizedRange = normalizeDamageRange(range);
  const breakdown = {
    element,
    skipped: false,
    fixed: 0,
    percent: 0,
    percentFactor: 1,
    afterFixed: { ...normalizedRange },
    afterPercent: { ...normalizedRange },
  };

  if (type === 'healing') {
    const min = Math.max(0, Math.floor(normalizedRange.min));
    const max = Math.max(0, Math.floor(normalizedRange.max));
    breakdown.skipped = true;
    breakdown.afterFixed = { ...normalizedRange };
    breakdown.afterPercent = { ...normalizedRange };
    return { min, max, breakdown };
  }

  const fixedResistances = (target && target.resistances && target.resistances.fixed) || {};
  const percentResistances = (target && target.resistances && target.resistances.percent) || {};

  const fixed = Number(fixedResistances[element]) ?? NaN;
  const percent = Number(percentResistances[element]) ?? NaN;

  const fallbackFixed = Number(fixedResistances.all);
  const fallbackPercent = Number(percentResistances.all);

  const appliedFixed = Number.isFinite(fixed) ? fixed : (Number.isFinite(fallbackFixed) ? fallbackFixed : 0);
  const appliedPercent = Number.isFinite(percent) ? percent : (Number.isFinite(fallbackPercent) ? fallbackPercent : 0);

  const afterFixed = {
    min: Math.max(0, normalizedRange.min - appliedFixed),
    max: Math.max(0, normalizedRange.max - appliedFixed),
  };
  const percentFactor = Math.max(0, 1 - appliedPercent / 100);
  const afterPercent = {
    min: Math.max(0, afterFixed.min * percentFactor),
    max: Math.max(0, afterFixed.max * percentFactor),
  };

  const finalRange = {
    min: Math.max(0, Math.floor(afterPercent.min)),
    max: Math.max(0, Math.floor(afterPercent.max)),
  };

  breakdown.fixed = appliedFixed;
  breakdown.percent = appliedPercent;
  breakdown.percentFactor = percentFactor;
  breakdown.afterFixed = afterFixed;
  breakdown.afterPercent = afterPercent;

  return { ...finalRange, breakdown };
}

function buildFlatDamage(stats, element, { flatDamageKeys = [], type }) {
  const keys = new Set(flatDamageKeys);
  const general = Number.isFinite(stats.generalDamage) ? stats.generalDamage : 0;
  const elemental = resolveNested(stats, ['elementalDamage', element], 0);
  const extras = flatDamageKeys.reduce((sum, key) => sum + (Number.isFinite(stats[key]) ? Number(stats[key]) : 0), 0);

  let typeSpecific = 0;
  if (type === 'healing' && !keys.has('healingBonus') && Number.isFinite(stats.healingBonus)) {
    typeSpecific = stats.healingBonus;
  } else if (type === 'pushback' && !keys.has('pushbackDamage') && Number.isFinite(stats.pushbackDamage)) {
    typeSpecific = stats.pushbackDamage;
  }

  const total = general + elemental + extras + typeSpecific;
  return {
    general,
    elemental,
    extras,
    typeSpecific,
    total,
  };
}

function calculateSpellDamage({ spell = {}, stats = {}, target = {}, options = {} }) {
  const type = spell.type || 'damage';
  const element = spell.element || 'neutral';
  const baseRange = normalizeDamageRange(spell.damage || spell.baseDamage);
  const criticalBaseRange = normalizeDamageRange(spell.criticalDamage || spell.criticalBase || baseRange);

  const primaryStat = resolveStat(stats, spell.primaryStat, 0);
  const powerStatKey = spell.powerStat || (type === 'pushback' ? 'pushbackPower' : 'power');
  const powerStat = resolveStat(stats, powerStatKey, 0);

  const scaling = applyStatScaling(baseRange, { primaryStat, power: powerStat });
  const critScaling = applyStatScaling(criticalBaseRange, { primaryStat, power: powerStat });

  const flatDamage = buildFlatDamage(stats, element, {
    flatDamageKeys: spell.flatDamageKeys || [],
    type,
  });

  const preResistNormal = {
    min: scaling.min + flatDamage.total + (Number(spell.flatBonus) || 0),
    max: scaling.max + flatDamage.total + (Number(spell.flatBonus) || 0),
  };

  const criticalBonusPercent = (Number(stats.criticalDamage) || 0) + (Number(stats.criticalDamageBonus) || 0);
  const criticalMultiplier = Math.max(0, 1 + criticalBonusPercent / 100);

  const preResistCriticalBase = {
    min: critScaling.min + flatDamage.total + (Number(spell.flatBonusCritical) || Number(spell.flatBonus) || 0),
    max: critScaling.max + flatDamage.total + (Number(spell.flatBonusCritical) || Number(spell.flatBonus) || 0),
  };
  const preResistCritical = {
    min: preResistCriticalBase.min * criticalMultiplier,
    max: preResistCriticalBase.max * criticalMultiplier,
  };

  const normalRes = applyResistances(preResistNormal, { element, target, type });
  const criticalRes = options.disableCritical
    ? null
    : applyResistances(preResistCritical, { element, target, type });

  const result = {
    type,
    element,
    helpers: {
      primaryStat,
      powerStat,
      scalingFactor: scaling.factor,
      criticalScalingFactor: critScaling.factor,
      criticalMultiplier,
      flatDamage,
    },
    normal: {
      min: normalRes.min,
      max: normalRes.max,
      breakdown: {
        base: baseRange,
        scaling,
        flatDamage,
        beforeResistances: preResistNormal,
        resistances: normalRes.breakdown,
      },
    },
  };

  if (criticalRes) {
    result.critical = {
      min: criticalRes.min,
      max: criticalRes.max,
      breakdown: {
        base: criticalBaseRange,
        scaling: critScaling,
        flatDamage,
        criticalMultiplier,
        beforeResistances: preResistCritical,
        resistances: criticalRes.breakdown,
      },
    };
  }

  return result;
}

module.exports = {
  applyResistances,
  applyStatScaling,
  calculateSpellDamage,
};