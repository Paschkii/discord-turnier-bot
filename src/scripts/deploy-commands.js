// deploy-commands.js
const {
  REST,
  Routes,
  SlashCommandBuilder,
  PermissionsBitField,
  ApplicationIntegrationType,
  InteractionContextType,
} = require('discord.js');
require('dotenv').config();

// kleine Helper-Funktion: macht den Command "Guild-only"
const guildOnly = (b) =>
  b
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
    .setContexts([InteractionContextType.Guild]);

const commands = [
  // === Public ===
  // /anmelden
  guildOnly(
    new SlashCommandBuilder()
      .setName('anmelden')
      .setDescription('Melde dich für das Turnier an')
  ),
  // /arena
  guildOnly(
    new SlashCommandBuilder()
      .setName('arena')
      .setDescription('Zufällige Arena-Auswahl')
      .addIntegerOption(o=>o
        .setName('anzahl')
        .setDescription('1–3 unterschiedliche Arenen')
        .setMinValue(1)
        .setMaxValue(3))
  ),
  // /gruppen
  guildOnly(
    new SlashCommandBuilder()
      .setName('gruppen')
      .setDescription('Zeigt die Gruppenübersicht der aktuellen Phase')
  ),
  // Hall of Fame
  guildOnly(
    new SlashCommandBuilder()
      .setName('hall_of_fame')
      .setDescription('Zeigt vergangene Turniere (Podium)')
  ),
  // /hilfe
  guildOnly(
    new SlashCommandBuilder()
      .setName('hilfe')
      .setDescription('Zeigt die Hilfeseite mit allen Befehlen')
  ),
  // /kampfinfo
  guildOnly(
    new SlashCommandBuilder()
      .setName('kampfinfo')
      .setDescription('Zeigt alle Kämpfe der aktuellen Phase (offen & beendet)')
  ),
  // /offene_kaempfe (mit optionalem Filter)
  guildOnly(
    new SlashCommandBuilder()
      .setName('offene_kaempfe')
      .setDescription('Listet offene Kämpfe der aktuellen Phase')
      .addStringOption(opt =>
        opt.setName('filter')
          .setDescription('Spieler/Gruppe/ID (optional)')
          .setRequired(false)
      )
  ),
  // /regeln
  guildOnly(
  new SlashCommandBuilder()
    .setName('regeln')
    .setDescription('Zeigt die Turnierregeln')
  ),
  // /teilnehmer
  guildOnly(
    new SlashCommandBuilder()
      .setName('teilnehmer')
      .setDescription('Zeigt alle angemeldeten Teilnehmer')
  ),
  // /turnier_info
  guildOnly(
    new SlashCommandBuilder()
      .setName('turnier_info')
      .setDescription('Zeigt eine kompakte Übersicht zum laufenden Turnier')
  ),

  // === Admin ===
  // /ergebnis_setzen
  guildOnly(
    new SlashCommandBuilder()
      .setName('ergebnis_setzen')
      .setDescription('Setzt/Korrigiert das Ergebnis eines Kampfes')
      .addStringOption(opt =>
        opt.setName('gruppe')
          .setDescription('Gruppe auswählen (Autocomplete)')
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addStringOption(opt =>
        opt.setName('kampf')
          .setDescription('Kampf in der gewählten Gruppe (Autocomplete)')
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addIntegerOption(opt =>
        opt.setName('kampf_id')
          .setDescription('ID des Kampfes (Fallback)')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /ergebnisse_wuerfeln
  guildOnly(
    new SlashCommandBuilder()
      .setName('ergebnisse_wuerfeln')
      .setDescription('Setzt zufällige Ergebnisse für die aktuelle Phase')
      .addBooleanOption(opt =>
        opt.setName('nur_offene')
          .setDescription('Nur offene Kämpfe würfeln (empfohlen)')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /fake_anmeldungen
  guildOnly(
    new SlashCommandBuilder()
      .setName('fake_anmeldungen')
      .setDescription('Admin: Fügt N fiktive Teilnehmer (zum Testen) hinzu')
      .addIntegerOption(opt =>
        opt.setName('anzahl')
          .setDescription('Wie viele Fake-Teilnehmer hinzufügen (wird ggf. auf gerade Gesamtzahl korrigiert)')
          .setRequired(true)
      )
      .addBooleanOption(opt =>
        opt.setName('reset')
          .setDescription('Vorherige Anmeldungen löschen und nur Fake-Teilnehmer behalten?')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // Hall of Fame löschen
  guildOnly(
    new SlashCommandBuilder()
      .setName('hof_loeschen')
      .setDescription('Admin: Löscht einen Hall-of-Fame-Eintrag per Turniernummer')
      .addIntegerOption(opt =>
        opt.setName('nummer')
          .setDescription('Turniernummer (z. B. 3 für Nemesis Turnier #3)')
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /pott_setzen
  guildOnly(
    new SlashCommandBuilder()
      .setName('pott_setzen')
      .setDescription('Admin: Pott & Aufteilung (Top 3) setzen')
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /teilnehmer_ersetzen
  guildOnly(
    new SlashCommandBuilder()
      .setName('teilnehmer_ersetzen')
      .setDescription('Admin: Teilnehmer (ID/Name) auf anderen User umstellen und/oder Klasse/Name ändern')
      .addStringOption(opt =>
        opt.setName('teilnehmer')
          .setDescription('ID oder exakter Name des vorhandenen Teilnehmers')
          .setRequired(true)
      )
      .addUserOption(opt =>
        opt.setName('user')
          .setDescription('Ziel-Discord-User (wenn leer: nur Klasse/Name ändern)')
          .setRequired(false)
      )
      .addStringOption(opt =>
        opt.setName('klasse')
          .setDescription('Neue Klasse (wenn leer: alte Klasse bleibt)')
          .setRequired(false)
      )
      .addStringOption(opt =>
        opt.setName('name')
          .setDescription('Neuer Anzeigename (optional)')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /turnier_start
  guildOnly(
    new SlashCommandBuilder()
      .setName('turnier_start')
      .setDescription('Startet das Turnier')
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /turnier_stop
  guildOnly(
    new SlashCommandBuilder()
      .setName('turnier_stop')
      .setDescription('Beendet das Turnier')
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /turnier_advance
  guildOnly(
    new SlashCommandBuilder()
      .setName('turnier_advance')
      .setDescription('Schaltet in die nächste Turnierphase (Quali → Gruppen → KO → Finale)')
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
].map(c => c.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    const clientId = process.env.CLIENT_ID;
    const guildId = process.env.GUILD_ID;

    if (!clientId) {
      console.error('❌ CLIENT_ID fehlt in der .env');
      process.exit(1);
    }

    console.log('📡 Registriere Slash-Befehle...');
    let route;
    if (guildId) {
      console.log(`🔧 Verwende Guild-Registration für GUILD_ID=${guildId} (sofort sichtbar)`);
      route = Routes.applicationGuildCommands(clientId, guildId);
    } else {
      console.log('🌍 Keine GUILD_ID gesetzt → registriere global (kann etwas dauern, bis sichtbar)');
      route = Routes.applicationCommands(clientId);
    }

    const res = await rest.put(route, { body: commands });
    console.log(`✅ Registriert: ${Array.isArray(res) ? res.length : 'unbekannt'} Befehle`);

    const fetched = await rest.get(route);
    console.log('🔎 Aktive Befehle:', fetched.map(c => c.name).join(', '));
  } catch (error) {
    console.error('❌ Fehler beim Registrieren:', error);
    process.exit(1);
  }
})();