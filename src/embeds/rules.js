// === Regeln Embeds ===
function buildRulesEmbeds(daten) {
  const name = daten?.name || 'Nemesis Turnier';
  const modus = daten?.modus || '1v1';

  const rules = new EmbedBuilder()
    .setColor(0xffd700)
    .setTitle(`🏆 ${name} — Regeln & Ablauf`)
    .addFields(
      {
        name: 'Teilnahme',
        value: [
          '• Anmeldung mit **/anmelden** (Klasse wählen).',
          '• Gerade Teilnehmerzahl erforderlich, um das Turnier zu starten.',
          '• Nach Start der Qualifikation ist keine Anmeldung mehr möglich.',
        ].join('\n'),
      },
      {
        name: 'Ablauf',
        value: [
          '• **Quali**: Best-of-1, Paarungen zufällig.',
          '• **Gruppenphase** (4 Gruppen): Round-Robin, Best-of-3, Alle 3 Kämpfe müssen gespielt werden.',
          '• **K.O.-Phase** Best-of-3, Eindeutige Ergebnisse reichen (2:0 = 2:1):',
          '  ‣ 8–10 TN → Top 1 je Gruppe → **Halbfinale**',
          '  ‣ 12–22 TN → Top 2 je Gruppe → **Viertelfinale**',
          '  ‣ 24 TN → Top 4 je Gruppe → **Achtelfinale**',
          '• **Finale** inkl. **Spiel um Platz 3**.',
        ].join('\n'),
      },
      {
        name: 'Ergebnisse',
        value: [
          '• Ergebnisse werden von Schuh-fa mit **/ergebnis_setzen** eingetragen.',
        ].join('\n'),
      },
      {
        name: 'Wertung in Gruppen',
        value: [
          '• Punkte = Summe der **gewonnenen Kämpfe**.',
          '• Bei Punktgleichheit am Cut → **Tie-Breaker (Best-of-1)**.',
        ].join('\n'),
      },
      {
        name: 'Übersichten',
        value: [
          '• **/gruppen** → Mitglieder + Kämpfe je Gruppe (Pagination).',
          '• **/kampfinfo** → alle Kämpfe der aktuellen Phase.',
          '• **/offene_kaempfe** → noch ausstehende Matches.',
          '• **/turnier_info** → Zeigt die Turnierinfos (Laufendes Turnier, Pott, Spieler mit Status).',
        ].join('\n'),
      },
      {
        name: 'Fairplay',
        value: [
          '• Höflicher Umgang, kein Ghosting/Cheating.',
          '• Wechsel der Klasse nach Beginn des Turniers nicht mehr möglich',
          '• Eure Sets könnt ihr natürlich tauschen wie ihr wollt.',
        ].join('\n'),
      },
      {
        name: 'Hall of Fame',
        value: [
          '• Nach Abschluss: Podium in **/hall_of_fame** (🥇🥈🥉).',
        ].join('\n'),
      },
    )
    .setFooter({ text: `Modus: ${modus}` })
    .setTimestamp();

  const commands = new EmbedBuilder()
    .setColor(0x00aeff)
    .setTitle('⚙️ Wichtige Befehle')
    .addFields(
      { name: 'anmelden', description: 'Meldet dich für das Turnier an.', admin: false },
      { name: 'arena', description: 'Zufällige Arena-Auswahl.', admin: false },
      { name: 'gruppen', description: 'Zeigt Gruppen + Kämpfe (Pagination).', admin: false },
      { name: 'kampfinfo', description: 'Übersicht: Kämpfe der aktuellen Phase (Pagination).', admin: false },
      { name: 'teilnehmer', description: 'Zeigt alle Teilnehmer an.', admin: false },
      { name: 'offene_kaempfe', description: 'Listet offene Kämpfe der aktuellen Phase (optional Filter).', admin: false },
      { name: 'hall_of_fame', description: 'Zeigt vergangene Turniere (Podium).', admin: false },
      { name: 'turnier_info', description: 'Komplette Turnier-Übersicht (Pott & Status).', admin: false },
    )
    .setTimestamp();

  return [rules, commands];
}