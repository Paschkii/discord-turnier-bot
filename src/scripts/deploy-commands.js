// === Imports ===
const {
  REST,
  Routes,
  SlashCommandBuilder,
  PermissionsBitField,
  ApplicationIntegrationType,
  InteractionContextType,
} = require('discord.js');
require('dotenv').config();
const languages = require('../config/languages/index');

// === Constants & Variables ===
// Standard-Sprache
const DEFAULT_LANGUAGE = 'de';
// Unterstützte Sprachen und ihre Locale-Codes (in sync mit src/config/languages/*)
const LOCALE_MAP = {
  de: 'de',
  en: ['en-US', 'en-GB'],
  fr: 'fr',
  es: 'es-ES',
  it: 'it',
  pt: 'pt-BR',
};
const commandsDe = languages[DEFAULT_LANGUAGE]?.commands;
// Sicherheits-Check
if (!commandsDe) {
  throw new Error(`Missing command definitions for default language "${DEFAULT_LANGUAGE}"`);
}
// Sprach-Auswahl für /language
const LANGUAGE_CHOICES = [
  { name: 'Deutsch', value: 'de' },
  { name: 'English', value: 'en' },
  { name: 'Français', value: 'fr' },
  { name: 'Español', value: 'es' },
  { name: 'Italiano', value: 'it' },
  { name: 'Português (Brasil)', value: 'pt' },
];
// Helper: sicher auf verschachtelte Objekte zugreifen
const getNestedValue = (obj, path) =>
  path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
// Lokalisierungen für Namen/Beschreibungen bauen
const buildLocalizations = (commandKey, path) => {
  const localizations = {};
  for (const [languageKey, commandSet] of Object.entries(languages)) {
    if (languageKey === DEFAULT_LANGUAGE) continue;
    const locales = LOCALE_MAP[languageKey];
    if (!locales) continue;
    const value = getNestedValue(commandSet?.commands?.[commandKey], path);
    if (value) {
      const localeList = Array.isArray(locales) ? locales : [locales];
      for (const locale of localeList) {
        localizations[locale] = value;
      }
    }
  }
  return localizations;
};
// Helper: Lokalisierungen anwenden
const applyLocalizations = (target, method, data) => {
  if (Object.keys(data).length > 0 && typeof target[method] === 'function') {
    target[method](data);
  }
};
// Command mit Lokalisierungen versehen
const applyCommandLocalization = (builder, commandKey) => {
  const command = commandsDe[commandKey];
  if (!command) {
    throw new Error(`Unknown command key: ${commandKey}`);
  }
  builder
    .setName(command.name)
    .setDescription(command.description);

  applyLocalizations(builder, 'setNameLocalizations', buildLocalizations(commandKey, ['name']));
  applyLocalizations(builder, 'setDescriptionLocalizations', buildLocalizations(commandKey, ['description']));

  return builder;
};
// Option mit Lokalisierungen versehen
const applyOptionLocalization = (option, commandKey, optionKey) => {
  const optionData = commandsDe[commandKey]?.options?.[optionKey];
  if (!optionData) {
    throw new Error(`Unknown option ${optionKey} for command ${commandKey}`);
  }
  option
    .setName(optionData.name)
    .setDescription(optionData.description);

  applyLocalizations(option, 'setNameLocalizations', buildLocalizations(commandKey, ['options', optionKey, 'name']));
  applyLocalizations(option, 'setDescriptionLocalizations', buildLocalizations(commandKey, ['options', optionKey, 'description']));

  return option;
};

// kleine Helper-Funktion: macht den Command "Guild-only"
const guildOnly = (b) =>
  b
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
    .setContexts([InteractionContextType.Guild]);

// === Commands ===
const commands = [
  // === Turnier ===
  // === Public ===
  // /registrieren
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'registrieren')
  ),
  // /arena
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'arena')
      .addIntegerOption(o =>
        applyOptionLocalization(o, 'arena', 'anzahl')
          .setMinValue(1)
          .setMaxValue(3)
      )
  ),
  // /boss
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'boss')
      .addStringOption(opt =>
        applyOptionLocalization(opt, 'boss', 'name')
          .setRequired(true)
          .setAutocomplete(true)
      )
  ),
  // /bracket
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'bracket')
  ),
  // Hall of Fame
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'hallOfFame')
  ),
  // /hilfe
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'hilfe')
  ),
  // /regeln
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'regeln')
  ),
  // /pvp_info
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'pvpInfo')
  ),

  // === Admin ===
  // /ergebnis_setzen
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'ergebnisSetzen')
      .addStringOption(opt =>
        applyOptionLocalization(opt, 'ergebnisSetzen', 'gruppe')
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addStringOption(opt =>
        applyOptionLocalization(opt, 'ergebnisSetzen', 'kampf')
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addIntegerOption(opt =>
        applyOptionLocalization(opt, 'ergebnisSetzen', 'kampfId')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /ergebnisse_wuerfeln
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'ergebnisseWuerfeln')
      .addBooleanOption(opt =>
        applyOptionLocalization(opt, 'ergebnisseWuerfeln', 'nurOffene')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /fake_anmeldungen
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'fakeAnmeldungen')
      .addIntegerOption(opt =>
        applyOptionLocalization(opt, 'fakeAnmeldungen', 'anzahl')
          .setRequired(true)
      )
      .addBooleanOption(opt =>
        applyOptionLocalization(opt, 'fakeAnmeldungen', 'reset')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /language
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'language')
      .addStringOption(opt =>
        applyOptionLocalization(opt, 'language', 'language')
          .setRequired(false)
          .addChoices(...LANGUAGE_CHOICES)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /guild_name
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'guildName')
      .addStringOption(opt =>
        applyOptionLocalization(opt, 'guildName', 'name')
          .setRequired(false)
          .setMaxLength(100)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // Hall of Fame löschen
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'hofLoeschen')
      .addIntegerOption(opt =>
        applyOptionLocalization(opt, 'hofLoeschen', 'nummer')
          .setRequired(false)
      )
      .addStringOption(opt =>
        applyOptionLocalization(opt, 'hofLoeschen', 'name')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /pott_setzen
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'pottSetzen')
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /teilnehmer_ersetzen
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'teilnehmerErsetzen')
      .addStringOption(opt =>
        applyOptionLocalization(opt, 'teilnehmerErsetzen', 'teilnehmer')
          .setRequired(true)
      )
      .addUserOption(opt =>
        applyOptionLocalization(opt, 'teilnehmerErsetzen', 'user')
          .setRequired(false)
      )
      .addStringOption(opt =>
        applyOptionLocalization(opt, 'teilnehmerErsetzen', 'klasse')
          .setRequired(false)
      )
      .addStringOption(opt =>
        applyOptionLocalization(opt, 'teilnehmerErsetzen', 'name')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /pvp_start
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'pvpStart')
      .addStringOption(opt =>
        applyOptionLocalization(opt, 'pvpStart', 'name')
          .setRequired(false)
          .setAutocomplete(true)
      )
      .addStringOption(opt =>
        applyOptionLocalization(opt, 'pvpStart', 'name')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /pvp_stop
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'pvpStop')
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /pvp_next
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'pvpNext')
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),

  // === PvM ===
  // /pvm_start
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'pvmStart')
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /pvm_stop
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'pvmStop')
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /add_dungeon
  guildOnly(
    applyCommandLocalization(new SlashCommandBuilder(), 'addDungeon')
      .addStringOption(opt =>
        applyOptionLocalization(opt, 'addDungeon', 'name')
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  
].map(c => c.toJSON());
// === Deployment ===
// Discord-REST-Client initialisieren
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
// Sofort ausführen
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