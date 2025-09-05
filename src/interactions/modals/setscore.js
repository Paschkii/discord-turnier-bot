// === Imports ===
const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  MessageFlags,
  PermissionFlagsBits,
} = require('discord.js');
const { ladeTurnier, speichereTurnier } = require('../../store/turniere');
const { validReportExact, validReportKO } = require('../../utils');

// Modal anzeigen (Labels = Spielernamen)
function open(interaction, fight) {
  const modal = new ModalBuilder()
    .setCustomId(`setscore_${fight.id}`)
    .setTitle(`Ergebnis setzen — #${fight.id}`);

  const a = new TextInputBuilder()
    .setCustomId('score_a')
    .setLabel(fight.playerA?.name || 'Spieler A')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('z. B. 2')
    .setRequired(true);

  const b = new TextInputBuilder()
    .setCustomId('score_b')
    .setLabel(fight.playerB?.name || 'Spieler B')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('z. B. 1')
    .setRequired(true);

  modal.addComponents(
    new ActionRowBuilder().addComponents(a),
    new ActionRowBuilder().addComponents(b),
  );

  return interaction.showModal(modal);
}

// Modal-Submit verarbeiten
async function run(interaction) {
  // Admin-Guard
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
    return interaction.reply({ content: '⛔ Nur Admins dürfen Ergebnisse setzen.', flags: MessageFlags.Ephemeral });
  }

  // Kampf laden
  const kampfId = parseInt((interaction.customId || '').split('_')[1], 10);
  const data = await ladeTurnier();
  const fight = (data?.kämpfe || []).find(f => f.id === kampfId);
  if (!fight) {
    return interaction.reply({ content: `❌ Kampf #${kampfId} nicht gefunden.`, flags: MessageFlags.Ephemeral });
  }

  // Eingaben parsen
  const a = parseInt((interaction.fields.getTextInputValue('score_a') || '').trim(), 10);
  const b = parseInt((interaction.fields.getTextInputValue('score_b') || '').trim(), 10);
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    return interaction.reply({ content: '❌ Bitte nur ganze Zahlen eingeben.', flags: MessageFlags.Ephemeral });
  }

  // Phase & Best-of bestimmen
  const phase = (fight.phase || '').toLowerCase();         // 'quali' | 'gruppen' | 'ko' | 'finale'
  const isKO  = phase === 'ko' || phase === 'finale';
  const bestOf = fight.bestOf || (phase === 'quali' ? 1 : 3);

  // Validierung
  const ok = isKO ? validReportKO(bestOf, a, b) : validReportExact(bestOf, a, b);
  if (!ok) {
    const need = Math.floor(bestOf / 2) + 1;
    return interaction.reply({
      content: isKO
        ? `❌ Für K.O. gilt echtes Best-of-${bestOf}: Der Kampf endet, sobald jemand **${need}** Siege hat (z. B. 2:0 oder 2:1).`
        : `❌ Für diese Phase müssen **alle ${bestOf} Spiele** erfasst werden (Summe = ${bestOf}).`,
      flags: MessageFlags.Ephemeral
    });
  }

  // Speichern
  fight.scoreA  = a;
  fight.scoreB  = b;
  fight.finished = true;
  if (a !== b) {
    fight.winnerId = (a > b) ? fight.playerA.id : fight.playerB.id;
  }
  fight.timestamp = new Date().toISOString();

  await speichereTurnier(data);

  const grpInfo = fight.groupName ? ` · Gruppe **${fight.groupName}**` : '';
  return interaction.reply({
    content: `🛠️ Ergebnis gesetzt: **#${kampfId}**${grpInfo} — ${fight.playerA?.name ?? 'A'} ${a} : ${b} ${fight.playerB?.name ?? 'B'}`
  });
}

// === Exports ===
module.exports = { open, run };