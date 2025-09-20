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
const commandsDe = require('../config/languages/commands.de')

// kleine Helper-Funktion: macht den Command "Guild-only"
const guildOnly = (b) =>
  b
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
    .setContexts([InteractionContextType.Guild]);

const commands = [
  // === Turnier ===
  // === Public ===
  // /anmelden
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.anmelden.name)
      .setDescription(commandsDe.anmelden.description)
  ),
  // /arena
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.arena.name)
      .setDescription(commandsDe.arena.description)
      .addIntegerOption(o=>o
        .setName(commandsDe.arena.options.anzahl.name)
        .setDescription(commandsDe.arena.options.anzahl.description)
        .setMinValue(1)
        .setMaxValue(3))
  ),
  // /boss
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.boss.name)
      .setDescription(commandsDe.boss.description)
      .addStringOption(opt =>
        opt.setName(commandsDe.boss.options.name.name)
          .setDescription(commandsDe.boss.options.name.description)
          .setRequired(true)
          .setAutocomplete(true)
      )
  ),
  // /bracket
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.bracket.name)
      .setDescription(commandsDe.bracket.description)
  ),
  // Hall of Fame
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.hallOfFame.name)
      .setDescription(commandsDe.hallOfFame.description)
  ),
  // /hilfe
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.hilfe.name)
      .setDescription(commandsDe.hilfe.description)
  ),
  // /regeln
  guildOnly(
  new SlashCommandBuilder()
    .setName(commandsDe.regeln.name)
    .setDescription(commandsDe.regeln.description)
  ),
  // /turnier_info
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.turnierInfo.name)
      .setDescription(commandsDe.turnierInfo.description)
  ),

  // === Admin ===
  // /ergebnis_setzen
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.ergebnisSetzen.name)
      .setDescription(commandsDe.ergebnisSetzen.description)
      .addStringOption(opt =>
        opt.setName(commandsDe.ergebnisSetzen.options.gruppe.name)
          .setDescription(commandsDe.ergebnisSetzen.options.gruppe.description)
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addStringOption(opt =>
        opt.setName(commandsDe.ergebnisSetzen.options.kampf.name)
          .setDescription(commandsDe.ergebnisSetzen.options.kampf.description)
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addIntegerOption(opt =>
        opt.setName(commandsDe.ergebnisSetzen.options.kampfId.name)
          .setDescription(commandsDe.ergebnisSetzen.options.kampfId.description)
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /ergebnisse_wuerfeln
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.ergebnisseWuerfeln.name)
      .setDescription(commandsDe.ergebnisseWuerfeln.description)
      .addBooleanOption(opt =>
        opt.setName(commandsDe.ergebnisseWuerfeln.options.nurOffene.name)
          .setDescription(commandsDe.ergebnisseWuerfeln.options.nurOffene.description)
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /fake_anmeldungen
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.fakeAnmeldungen.name)
      .setDescription(commandsDe.fakeAnmeldungen.description)
      .addIntegerOption(opt =>
        opt.setName(commandsDe.fakeAnmeldungen.options.anzahl.name)
          .setDescription(commandsDe.fakeAnmeldungen.options.anzahl.description)
          .setRequired(true)
      )
      .addBooleanOption(opt =>
        opt.setName(commandsDe.fakeAnmeldungen.options.reset.name)
          .setDescription(commandsDe.fakeAnmeldungen.options.reset.description)
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // Hall of Fame löschen
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.hofLoeschen.name)
      .setDescription(commandsDe.hofLoeschen.description)
      .addIntegerOption(opt =>
        opt.setName(commandsDe.hofLoeschen.options.nummer.name)
          .setDescription(commandsDe.hofLoeschen.options.nummer.description)
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /pott_setzen
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.pottSetzen.name)
      .setDescription(commandsDe.pottSetzen.description)
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /teilnehmer_ersetzen
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.teilnehmerErsetzen.name)
      .setDescription(commandsDe.teilnehmerErsetzen.description)
      .addStringOption(opt =>
        opt.setName(commandsDe.teilnehmerErsetzen.options.teilnehmer.name)
          .setDescription(commandsDe.teilnehmerErsetzen.options.teilnehmer.description)
          .setRequired(true)
      )
      .addUserOption(opt =>
        opt.setName(commandsDe.teilnehmerErsetzen.options.user.name)
          .setDescription(commandsDe.teilnehmerErsetzen.options.user.description)
          .setRequired(false)
      )
      .addStringOption(opt =>
        opt.setName(commandsDe.teilnehmerErsetzen.options.klasse.name)
          .setDescription(commandsDe.teilnehmerErsetzen.options.klasse.description)
          .setRequired(false)
      )
      .addStringOption(opt =>
        opt.setName(commandsDe.teilnehmerErsetzen.options.name.name)
          .setDescription(commandsDe.teilnehmerErsetzen.options.name.description)
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /turnier_start
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.turnierStart.name)
      .setDescription(commandsDe.turnierStart.description)
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /turnier_stop
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.turnierStop.name)
      .setDescription(commandsDe.turnierStop.description)
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /turnier_advance
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.turnierAdvance.name)
      .setDescription(commandsDe.turnierAdvance.description)
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),

  // === PvM ===
  // /pvm_start
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.pvmStart.name)
      .setDescription(commandsDe.pvmStart.description)
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /pvm_stop
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.pvmStop.name)
      .setDescription(commandsDe.pvmStop.description)
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  ),
  // /dungeon_setzen
  guildOnly(
    new SlashCommandBuilder()
      .setName(commandsDe.dungeonSetzen.name)
      .setDescription(commandsDe.dungeonSetzen.description)
      .addStringOption(opt =>
        opt.setName(commandsDe.dungeonSetzen.options.name.name)
          .setDescription(commandsDe.dungeonSetzen.options.name.description)
          .setRequired(true)
      )
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