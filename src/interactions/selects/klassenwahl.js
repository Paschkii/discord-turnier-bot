// === Imports ===
const { KLASSE_LISTE } = require('../../config/constants');
const { ladeTurnier, speichereTurnier } = require('../../store/turniere');
const { MessageFlags } = require('discord.js');
const { getLocalizedString } = require('../../config/messages');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

// === Functions ===
// deine Klassenwahl
async function run(interaction) {
  const locale = await resolveInteractionLocale(interaction);
  const userId = interaction.customId.split('_').pop();
  if (interaction.user.id !== userId) {
    const message = getLocalizedString('messages.tournament.general.notYourSelection', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }
  const guildId = interaction.guildId;
  if (!guildId) {
    const message = getLocalizedString('messages.tournament.general.guildOnlyAction', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }
  await interaction.deferUpdate();
  const selectedClass = interaction.values?.[0];

  const db2 = await ladeTurnier(guildId);
  if (!db2) {
    const message = getLocalizedString('messages.tournament.general.noActiveTournament', locale);
    return interaction.followUp({ content: message, flags: MessageFlags.Ephemeral });
  }
  if (db2.status !== 'offen') {
    const message = getLocalizedString('messages.tournament.general.tournamentClosed', locale);
    return interaction.followUp({ content: message, flags: MessageFlags.Ephemeral });
  }
  if (db2.teilnehmer?.[interaction.user.id]) {
    const message = getLocalizedString('messages.tournament.general.alreadyRegistered', locale);
    return interaction.followUp({ content: message, flags: MessageFlags.Ephemeral });
  }
  const valid = KLASSE_LISTE.some((k) => k.name === selectedClass);
  if (!valid) {
    const message = getLocalizedString('messages.tournament.general.invalidClass', locale);
    return interaction.followUp({ content: message, flags: MessageFlags.Ephemeral });
  }

  const member = await interaction.guild.members.fetch(interaction.user.id).catch(() => null);
  const nickname = member?.nickname || interaction.user.globalName || interaction.user.username;

  db2.teilnehmer = db2.teilnehmer || {};
  db2.teilnehmer[interaction.user.id] = { name: nickname, klasse: selectedClass };
  await speichereTurnier(guildId, db2);

  const message = getLocalizedString('messages.tournament.registration.success', locale, {
    name: nickname,
    class: selectedClass,
  });
  return interaction.followUp({ content: message || `✅ ${nickname} has been registered successfully as **${selectedClass}**!` });
}

// === Exports ===
module.exports = { run };