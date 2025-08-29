// === Konstanten ===
// Erlaubte KO-Runden Größen
const ALLOWED_KO_SIZES = [16, 14, 12, 8, 4, 2];

// Klassen Liste
const KLASSE_LISTE = [
  { emoji: '🏹', name: 'Cra' },
  { emoji: '🎲', name: 'Ecaflip' },
  { emoji: '🩹', name: 'Eniripsa' },
  { emoji: '💰', name: 'Enutrof' },
  { emoji: '🛡️', name: 'Feca' },
  { emoji: '💣', name: 'Halsabschneider' },
  { emoji: '🗡',  name: 'Iop' },
  { emoji: '🎭',  name: 'Maskerador' },
  { emoji: '🐉', name: 'Osamodas' },
  { emoji: '🐼', name: 'Pandawa' },
  { emoji: '🩸', name: 'Sacrieur' },
  { emoji: '🌱', name: 'Sadida' },
  { emoji: '💀', name: 'Sram' },
  { emoji: '🚂', name: 'Steamer' },
  { emoji: '⏳', name: 'Xelor' },
];

// Arena Daten
const arenaData = {
  Nahkampf: ['Iop', 'Sacrieur', 'Ecaflip'],
  Mittlere: ['Eniripsa', 'Sadida'],
  Distanz:  ['Xelor', 'Halsabschneider', 'Steamer', 'Sram'],
};

// Alle Commands (für /hilfe, /regeln etc.)
const HELP_COMMANDS = [
  // User
  { name: 'anmelden',        description: 'Meldet dich für das Turnier an.', admin: false },
  { name: 'arena',           description: 'Zufällige Arena-Auswahl.', admin: false },
  { name: 'bracket',         description: 'Zeigt das Bracket der aktuellen Phase', admin: false },
  { name: 'gruppen',         description: 'Zeigt die Gruppenübersicht der aktuellen Phase', admin: false },
  { name: 'hall_of_fame',    description: 'Zeigt vergangene Turniere (Podium).', admin: false },
  { name: 'kampfinfo',       description: 'Zeigt alle Kämpfe der aktuellen Phase (offen & beendet)', admin: false },
  { name: 'offene_kaempfe',  description: 'Listet offene Kämpfe der aktuellen Phase (optional Filter).', admin: false },
  { name: 'regeln',          description: 'Zeigt die Turnierregeln.', admin: false },
  { name: 'teilnehmer',      description: 'Zeigt alle Teilnehmer und ihre gewählten Klassen an.', admin: false },
  { name: 'turnier_info',    description: 'Komplette Turnier-Übersicht (Pott & Status).', admin: false },

  // Admin
  { name: 'ergebnis_setzen',     description: 'Admin: Ergebnis eines Kampfes setzen/korrigieren.', admin: true },
  { name: 'ergebnisse_wuerfeln', description: 'Admin: Zufalls-Ergebnisse für die aktuelle Phase setzen. (Zum Testen)', admin: true },
  { name: 'fake_anmeldungen',    description: 'Admin: Fügt N fiktive Teilnehmer (zum Testen) hinzu.', admin: true },
  { name: 'hof_loeschen',        description: 'Admin: Löscht einen Hall-of-Fame-Eintrag per Turniernummer. (Zum Testen)', admin: true },
  { name: 'pott_setzen',         description: 'Admin: Pott & Aufteilung (Top 3) setzen.', admin: true },
  { name: 'teilnehmer_ersetzen', description: 'Admin: Teilnehmer (ID/Name) auf anderen User umstellen und/oder Klasse/Name ändern.', admin: true },
  { name: 'turnier_advance',     description: 'Admin: Nächste Phase (Quali → Gruppen → KO → Finale) auslösen.', admin: true },
  { name: 'turnier_start',       description: 'Admin: Startet ein Turnier (immer 1v1).', admin: true },
  { name: 'turnier_stop',        description: 'Admin: Beendet das Turnier & leert Daten.', admin: true },
];

// Phasen Labels
const PHASE_LABEL = { quali: 'Qualifikation', gruppen: 'Gruppenphase', ko: 'K.O.-Phase', finale: 'Finale' };

// Export am Ende
module.exports = {
  ALLOWED_KO_SIZES,
  KLASSE_LISTE,
  arenaData,
  HELP_COMMANDS,
  PHASE_LABEL,
};