// === Utilities ===
// Gruppennamen für Turniergruppen
const DOFUS_GROUP_NAMES = [
  'Astrub', 'Amakna', 'Bonta', 'Brakmar', 'Sufokia',
  'Pandala', 'Frigost', 'Otomai', 'Albuera', 'Incarnam',
];
// Gruppennamen generieren
function themedGroupNames(count) {
  const base = DOFUS_GROUP_NAMES.length ? DOFUS_GROUP_NAMES : ['Astrub'];
  const out = [];
  for (let i = 0; i < count; i++) out.push(base[i % base.length] + (i >= base.length ? ` ${Math.floor(i / base.length) + 2}` : ''));
  return out;
}
// Array mischen (Fisher-Yates)
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Prüft, ob ein Ergebnis für Best-of-x gültig ist
function validReportExact(bestOf, a, b) {
  return Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0 && a + b === bestOf;
}

// Prüft, ob ein Ergebnis für Best-of-x KO gültig ist
function validReportKO(bestOf, a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0) return false;
  const winsToWin = Math.floor(bestOf / 2) + 1;  // Bo3 -> 2, Bo5 -> 3
  const played = a + b;
  if (played > bestOf) return false;

  const maxW = Math.max(a, b);
  const minW = Math.min(a, b);

  // Gewinner hat GENAU die nötigen Siege; Verlierer weniger
  // -> erlaubt 2:0 oder 2:1 bei Bo3; verhindert 3:0 bei Bo3
  return maxW === winsToWin && minW < winsToWin;
}

// === Kamas-Parsing ===
// Kamas-Parsing/Format + Sainte-Laguë-Splitter (0,5 mk Schritte)
// Akzeptiert Eingaben wie "1.5m", "1500k", "1500000", "1,5 mk", "2mk", "0.5m", "500k", "0.5"
// Gibt Zahl in Millionen Kamas (mk) zurück, oder null bei ungültiger Eingabe
function parseMK(input) {
  if (input === undefined || input === null) return null;
  let s = String(input).trim().toLowerCase().replace(/\s+/g, '').replace(',', '.');
  if (!s) return null;

  const mk = s.match(/^(\d+(\.\d+)?)(m|mk)$/i);
  if (mk) return parseFloat(mk[1]);

  const k = s.match(/^(\d+(\.\d+)?)(k)$/i);
  if (k) return parseFloat(k[1]) / 1000; // 1000k = 1mk

  if (/^\d+(\.\d+)?$/.test(s)) {
    const n = parseFloat(s);
    if (n >= 1_000_000) return n / 1_000_000; // kamas → mk
    return n; // schon mk
  }
  return null;
}
// Formatiert eine mk-Zahl als String (z.B. 1.5 → "1.5mk", 2 → "2mk", 0.5 → "0.5mk")
function formatMK(mk) {
  const r = Math.round(mk * 2) / 2; // auf 0,5 mk runden
  return Number.isInteger(r) ? `${r}mk` : `${r.toFixed(1)}mk`;
}
// 1 Token = 0,5 mk
function mkToTokens(mk) { return Math.max(0, Math.round(mk * 2)); }
function tokensToMK(tok) { return Math.max(0, tok) / 2; }
// Sainte-Laguë (Divisoren 1,3,5,...) auf diskrete Tokens mit optionalen Seeds
function sainteLagueAllocate(remainingTokens, weights, seed) {
  const alloc = { first: seed.first, second: seed.second, third: seed.third };
  for (let t = 0; t < remainingTokens; t++) {
    const pri = {
      first:  weights.first  / (2 * alloc.first  + 1),
      second: weights.second / (2 * alloc.second + 1),
      third:  weights.third  / (2 * alloc.third  + 1),
    };
    const pick =
      (pri.first >= pri.second && pri.first >= pri.third) ? 'first' :
      (pri.second >= pri.third) ? 'second' : 'third';
    alloc[pick]++;
  }
  return alloc;
}
// Neuer Splitter: akzeptiert optionale Vorgaben (mk) für 🥇/🥈/🥉.
// Fehlende Plätze werden fair (0,5 mk) nach 60/27/13 mit Sainte-Laguë aufgefüllt.
function splitPrize(totalMK, firstMK, secondMK, thirdMK) {
  const totalTok = mkToTokens(totalMK);
  const givenTok = {
    first:  (firstMK  != null) ? mkToTokens(firstMK)  : 0,
    second: (secondMK != null) ? mkToTokens(secondMK) : 0,
    third:  (thirdMK  != null) ? mkToTokens(thirdMK)  : 0,
  };
  const providedAll = (firstMK != null) && (secondMK != null) && (thirdMK != null);

  let sumGiven = givenTok.first + givenTok.second + givenTok.third;
  if (sumGiven > totalTok) {
    // Falls Überhang: von hinten kürzen (🥉 → 🥈 → 🥇)
    let over = sumGiven - totalTok;
    for (const k of ['third', 'second', 'first']) {
      const take = Math.min(over, givenTok[k]);
      givenTok[k] -= take;
      over -= take;
      if (over === 0) break;
    }
    sumGiven = givenTok.first + givenTok.second + givenTok.third;
  }

  // Alle drei vorgegeben → Rest (falls vorhanden) auf 🥉 ausgleichen
  if (providedAll) {
    const diff = totalTok - sumGiven;
    givenTok.third = Math.max(0, givenTok.third + diff);
    return {
      first:  tokensToMK(givenTok.first),
      second: tokensToMK(givenTok.second),
      third:  tokensToMK(givenTok.third),
    };
  }

  // Verbleibende Tokens proportional verteilen
  const remaining = Math.max(0, totalTok - sumGiven);
  const weights = { first: 60, second: 27, third: 13 };
  const allocTok = sainteLagueAllocate(remaining, weights, givenTok);

  return {
    first:  tokensToMK(allocTok.first),
    second: tokensToMK(allocTok.second),
    third:  tokensToMK(allocTok.third),
  };
}
// (Behalten für evtl. spätere Nutzung, aber keine Doppel-Posts mehr)
let LAST_TRIGGER_CHANNEL = null;
function logToModerator(ctx, text) {
  try {
    const ch =
      (LAST_TRIGGER_CHANNEL && LAST_TRIGGER_CHANNEL.send ? LAST_TRIGGER_CHANNEL : null) ||
      (ctx && ctx.channel && ctx.channel.send ? ctx.channel : null);
    if (ch && ch.send) ch.send(text).catch(() => {});
    else console.log('[INFO]', text);
  } catch (e) {
    console.log('[INFO]', text);
  }
}

// === Exports ===
module.exports = {
  formatMK,
  mkToTokens,
  logToModerator,
  parseMK,
  sainteLagueAllocate,
  shuffleArray,
  splitPrize,
  themedGroupNames,
  tokensToMK,
  validReportExact,
  validReportKO,
};
