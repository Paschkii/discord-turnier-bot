// === Imports ===
const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { ladeTurnier, speichereTurnier } = require('../../store/turniere');
const { parseMK, formatMK, splitPrize } = require('../../utils');
const { getLocalizedString } = require('../../config/messages');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

// Pott setzen
async function run(interaction) {
  const locale = await resolveInteractionLocale(interaction);
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    const message = getLocalizedString('messages.tournament.prize.adminOnly', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }
  const guildId = interaction.guildId;
  if (!guildId) {
    const message = getLocalizedString('messages.tournament.general.guildOnlyCommand', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }
  const cur = await ladeTurnier(guildId);
  if (!cur) {
    const message = getLocalizedString('messages.tournament.general.noActiveTournament', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  const totalIn  = (interaction.fields.getTextInputValue('total_pot') || '').trim();
  const firstIn  = (interaction.fields.getTextInputValue('prize_first') || '').trim();
  const secondIn = (interaction.fields.getTextInputValue('prize_second') || '').trim();
  const thirdIn  = (interaction.fields.getTextInputValue('prize_third') || '').trim();

  const totalMK = parseMK(totalIn);
  const firstMK = firstIn  ? parseMK(firstIn)  : null;
  const secondMK= secondIn ? parseMK(secondIn) : null;
  const thirdMK = thirdIn  ? parseMK(thirdIn)  : null;

  if (!totalMK || totalMK <= 0) {
    const message = getLocalizedString('messages.tournament.prize.invalidTotal', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }
  if ((firstIn && firstMK === null) || (secondIn && secondMK === null) || (thirdIn && thirdMK === null)) {
    const message = getLocalizedString('messages.tournament.prize.invalidFormat', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  const split = splitPrize(totalMK, firstMK, secondMK, thirdMK);
  const sum = Math.round((split.first + split.second + split.third) * 2) / 2;
  const need = Math.round((totalMK - sum) * 2) / 2;
  if (Math.abs(need) > 0) split.third = Math.max(0, split.third + need);

  cur.prize = {
    totalMK: Math.round(totalMK * 2) / 2,
    firstMK: Math.round(split.first * 2) / 2,
    secondMK: Math.round(split.second * 2) / 2,
    thirdMK: Math.round(split.third * 2) / 2,
    text: {
      total: formatMK(totalMK),
      first: formatMK(split.first),
      second: formatMK(split.second),
      third: formatMK(split.third),
    },
    updatedAt: new Date().toISOString(),
  };

  await speichereTurnier(guildId, cur);
  const message = getLocalizedString('messages.tournament.prize.success', locale, {
    total: cur.prize.text.total,
    first: cur.prize.text.first,
    second: cur.prize.text.second,
    third: cur.prize.text.third,
  });
  return interaction.reply({
    content: message ||
    `💰 Prize pool set: **${cur.prize.text.total}** · 
    🥇 ${cur.prize.text.first} · 
    🥈 ${cur.prize.text.second} · 
    🥉 ${cur.prize.text.third}` });
}

// === Exports ===
module.exports = { run };