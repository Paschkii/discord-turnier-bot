// === Imports ===
const {
  EmbedBuilder,
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { HELP_COMMANDS, getLocalizedText } = require('../../config/constants');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

// Befehlsübersicht
const HELP_COPY = {
  title: {
    de: '🤖 Befehlsübersicht',
    en: '🤖 Command Overview',
    fr: '🤖 Aperçu des commandes',
    es: '🤖 Resumen de comandos',
    it: '🤖 Panoramica dei comandi',
    pt: '🤖 Visão geral dos comandos',
  },
  descriptionUser: {
    de: 'Hier sind alle verfügbaren Slash-Befehle:',
    en: 'Here are all available slash commands:',
    fr: 'Voici toutes les commandes slash disponibles :',
    es: 'Estos son todos los comandos slash disponibles:',
    it: 'Ecco tutti i comandi slash disponibili:',
    pt: 'Aqui estão todos os comandos slash disponíveis:',
  },
  descriptionAdmin: {
    de: 'Hier sind alle verfügbaren Slash-Befehle (inkl. Admin-Befehle unten):',
    en: 'Here are all available slash commands (including admin commands below):',
    fr: 'Voici toutes les commandes slash disponibles (y compris les commandes admin ci-dessous) :',
    es: 'Estos son todos los comandos slash disponibles (incluidos los comandos de admin a continuación):',
    it: 'Ecco tutti i comandi slash disponibili (inclusi i comandi admin sotto):',
    pt: 'Aqui estão todos os comandos slash disponíveis (incluindo comandos de admin abaixo):',
  },
  footer: {
    de: 'Nemesis Turnierbot',
    en: 'Nemesis Tournament Bot',
    fr: 'Nemesis Bot de Tournoi',
    es: 'Nemesis Bot de Torneos',
    it: 'Nemesis Bot Tornei',
    pt: 'Nemesis Bot de Torneios',
  },
};

// Hilfe / Befehlsübersicht anzeigen
async function execute(interaction) {
  const locale = await resolveInteractionLocale(interaction);
  const isAdmin = interaction.member?.permissions?.has(PermissionsBitField.Flags.Administrator);
  const userCmds  = HELP_COMMANDS.filter(c => !c.admin).sort((a,b)=>a.name.localeCompare(b.name));
  const adminCmds = isAdmin ? HELP_COMMANDS.filter(c => c.admin).sort((a,b)=>a.name.localeCompare(b.name)) : [];
  const formatCommand = (command) => ({
    name: `/${command.name}`,
    value: getLocalizedText(command.descriptionLocalized, locale) || command.description,
  });
  const fields = [
    ...userCmds.map(formatCommand),
    ...(adminCmds.length ? adminCmds.map(formatCommand) : []),
  ];
  const descriptionKey = isAdmin ? 'descriptionAdmin' : 'descriptionUser';
  const helpEmbed = new EmbedBuilder()
    .setColor(0x00AEFF)
    .setTitle(getLocalizedText(HELP_COPY.title, locale) || HELP_COPY.title.de)
    .setDescription(getLocalizedText(HELP_COPY[descriptionKey], locale) || HELP_COPY[descriptionKey].de)
    .addFields(fields)
    .setFooter({ text: getLocalizedText(HELP_COPY.footer, locale) || HELP_COPY.footer.de })
    .setTimestamp();
  return interaction.reply({ embeds: [helpEmbed], flags: MessageFlags.Ephemeral });
}

// === Exports ===
module.exports = { execute };