const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { ladeTurnier, speichereTurnier } = require('../../store/turniere');
const { parseMK, formatMK, splitPrize } = require('../../utils');

module.exports = {
  async run(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '⛔ Nur Admins dürfen den Pott setzen.', flags: MessageFlags.Ephemeral });
    }
    const cur = await ladeTurnier();
    if (!cur) return interaction.reply({ content: '❌ Kein aktives Turnier gefunden.', flags: MessageFlags.Ephemeral });

    const totalIn  = (interaction.fields.getTextInputValue('total_pot') || '').trim();
    const firstIn  = (interaction.fields.getTextInputValue('prize_first') || '').trim();
    const secondIn = (interaction.fields.getTextInputValue('prize_second') || '').trim();
    const thirdIn  = (interaction.fields.getTextInputValue('prize_third') || '').trim();

    const totalMK = parseMK(totalIn);
    const firstMK = firstIn  ? parseMK(firstIn)  : null;
    const secondMK= secondIn ? parseMK(secondIn) : null;
    const thirdMK = thirdIn  ? parseMK(thirdIn)  : null;

    if (!totalMK || totalMK <= 0) {
      return interaction.reply({ content: '❌ Bitte gib einen gültigen Gesamtpott an (z. B. 15mk).', flags: MessageFlags.Ephemeral });
    }
    if ((firstIn && firstMK === null) || (secondIn && secondMK === null) || (thirdIn && thirdMK === null)) {
      return interaction.reply({ content: '❌ Ungültiges Format bei den Platzprämien. Beispiele: 9mk, 4mk, 2000k, 15000000', flags: MessageFlags.Ephemeral });
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

    await speichereTurnier(cur);
    const msg = `💰 Pott gesetzt: **${cur.prize.text.total}** · 🥇 ${cur.prize.text.first} · 🥈 ${cur.prize.text.second} · 🥉 ${cur.prize.text.third}`;
    return interaction.reply({ content: msg });
  }
};