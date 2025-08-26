const {
  MessageFlags,
  PermissionsBitField
} = require('discord.js');
const { ladeTurnier, speichereTurnier } = require('../../store/turniere');
const { validReportExact, validReportKO } = require('../../utils');

module.exports = {
  async run(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '⛔ Nur Admins dürfen Ergebnisse setzen.', flags: MessageFlags.Ephemeral });
    }
    const kampfId = parseInt(interaction.customId.split('_')[1], 10);
    const data = await ladeTurnier();
    const fight = (data?.kämpfe || []).find(f => f.id === kampfId);
    if (!fight) return interaction.reply({ content: `❌ Kampf #${kampfId} nicht gefunden.`, flags: MessageFlags.Ephemeral });

    const a = parseInt((interaction.fields.getTextInputValue('score_a') || '').trim(), 10);
    const b = parseInt((interaction.fields.getTextInputValue('score_b') || '').trim(), 10);
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
      return interaction.reply({ content: '❌ Bitte nur ganze Zahlen eingeben.', flags: MessageFlags.Ephemeral });
    }

    const isKO = ['ko', 'halbfinale', 'finale', 'bronze'].includes((fight.phase || '').toLowerCase());
    const ok = isKO ? validReportKO(fight.bestOf, a, b) : validReportExact(fight.bestOf, a, b);
    if (!ok) {
      const need = Math.floor(fight.bestOf / 2) + 1;
      return interaction.reply({
        content: isKO
          ? `❌ Für K.O. gilt echtes Best-of-${fight.bestOf}: Der Kampf endet, sobald jemand **${need}** Siege hat (z. B. 2:0 oder 2:1).`
          : `❌ Für diese Phase müssen **alle ${fight.bestOf} Spiele** erfasst werden (Summe = ${fight.bestOf}).`,
        flags: MessageFlags.Ephemeral
      });
    }

    fight.scoreA = a; fight.scoreB = b; fight.finished = true;
    if (a !== b) fight.winnerId = (a > b) ? fight.playerA.id : fight.playerB.id;

    await speichereTurnier(data);
    const grpInfo = fight.groupName ? ` · Gruppe **${fight.groupName}**` : '';
    return interaction.reply({ content: `🛠️ Ergebnis gesetzt: **#${kampfId}**${grpInfo} — ${fight.playerA.name} ${a} : ${b} ${fight.playerB.name}` });
  }
};
