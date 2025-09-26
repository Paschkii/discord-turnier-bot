// src/embeds/rules.js
const { EmbedBuilder } = require('discord.js');
const { HELP_COMMANDS, getLocalizedText } = require('../config/constants');

// Eine Zeile pro Command, z. B. "• /anmelden — Meldet dich ..."
const lineOf = (c, locale = 'de') => `• \`/${c.name}\` — ${getLocalizedText(c.descriptionLocalized, locale) || c.description}`;

function buildRulesEmbeds(daten = {}, locale = 'de') {
  const name  = daten?.name  || 'Nemesis Turnier';
  const modus = daten?.modus || '1v1';

  // 1) Regeln & Ablauf
  const rules = new EmbedBuilder()
    .setColor(0xffd700)
    .setTitle(`🏆 ${name} — Regeln & Ablauf`)
    .addFields(
      {
        name: 'Teilnahme',
        value: [
          '• Anmeldung mit **`/registrieren`** (Klasse wählen).',
          '• Gerade Teilnehmerzahl erforderlich, um das Turnier zu starten.',
          '• Nach Start der Qualifikation ist keine Anmeldung mehr möglich.',
        ].join('\n'),
      },
      {
        name: 'Ablauf',
        value: [
          '• **Quali**: Bo1, Paarungen zufällig. Markiert Spieler als **Top**/**Low**.',
          '• **Gruppenphase** (4 Gruppen, 2x Top / 2x Low): Round-Robin, **Best-of-3**, alle 3 Spiele werden erfasst.',
          '• **K.O.-Phase**: getrennte Brackets **Top** und **Low** (Viertelfinale → Halbfinale, Bo3).',
          '• **Finale**: Sieger Top vs Sieger Low (Bo3) + **Spiel um Platz 3** (Bo3).',
        ].join('\n'),
      },
      {
        name: 'Ergebnisse',
        value: '• Ergebnisse werden per **/ergebnis_setzen** eingetragen.',
      },
      {
        name: 'Wertung in Gruppen',
        value: [
          '• Punkte = Summe der **gewonnenen Spiele**.',
          '• Bei Punktgleichheit am Cut → **Tie-Breaker (Best-of-1)**.',
        ].join('\n'),
      },
      {
        name: 'Übersichten',
        value: [
          '• **`/bracket`** → Gruppen, Kämpfe und Bracket-Übersicht.',
          '• **`/pvp_info`** → Laufendes Turnier, Pott, Spieler mit Status und Klassen.',
        ].join('\n'),
      },
      {
        name: 'Fairplay',
        value: [
          '• Klassenwechsel nach Turnierstart nicht mehr möglich.',
          '• Sets dürft ihr beliebig tauschen.',
        ].join('\n'),
      },
      {
        name: 'Hall of Fame',
        value: '• Nach Abschluss: Podium in **/hall_of_fame** (🥇🥈🥉).',
      },
    )
    .setFooter({ text: `Modus: ${modus}` })
    .setTimestamp();

  // 2) Alle Befehle dynamisch aus HELP_COMMANDS
  const userCmds  = HELP_COMMANDS.filter(c => !c.admin).map((c) => lineOf(c, locale));
  const adminCmds = HELP_COMMANDS.filter(c =>  c.admin).map((c) => lineOf(c, locale));

  const commands = new EmbedBuilder()
    .setColor(0x00aeff)
    .setTitle('⚙️ Alle Befehle')
    .addFields(
      { name: 'User-Befehle',  value: userCmds.join('\n')  || '—' },
      { name: 'Admin-Befehle', value: adminCmds.join('\n') || '—' },
    )
    .setTimestamp();

  return [rules, commands];
}

// === Exports ===
module.exports = { buildRulesEmbeds };