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
const { resolveInteractionLocale } = require('../../utils/interactionLocale');
const { getPhaseLabel } = require('../../config/constants');
const { getLocalizedString } = require('../../config/messages');

// Modal anzeigen (Labels = Spielernamen)
async function open(interaction, fight) {
  const locale = await resolveInteractionLocale(interaction);
  const title = getLocalizedString('messages.tournament.score.modalTitle', locale, { id: fight.id }, `Set result — #${fight.id}`);
  const labelA = getLocalizedString('messages.tournament.score.playerALabel', locale, {}, 'Player A');
  const labelB = getLocalizedString('messages.tournament.score.playerBLabel', locale, {}, 'Player B');
  const placeholder = getLocalizedString('messages.tournament.score.scorePlaceholder', locale, {}, 'e.g. 2');
  const modal = new ModalBuilder()
    .setCustomId(`setscore_${fight.id}`)
    .setTitle(title);

  const a = new TextInputBuilder()
    .setCustomId('score_a')
    .setLabel(fight.playerA?.name || labelA)
    .setStyle(TextInputStyle.Short)
    .setPlaceholder(placeholder || 'e.g. 2')
    .setRequired(true);

  const b = new TextInputBuilder()
    .setCustomId('score_b')
    .setLabel(fight.playerB?.name || labelB)
    .setStyle(TextInputStyle.Short)
    .setPlaceholder(placeholder || 'e.g. 1')
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
  const locale = await resolveInteractionLocale(interaction);
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
    const message = getLocalizedString('messages.tournament.score.adminOnly', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  // Kampf laden
  const kampfId = parseInt((interaction.customId || '').split('_')[1], 10);
  const guildId = interaction.guildId;
  if (!guildId) {
    const message = getLocalizedString('messages.tournament.general.guildOnlyCommand', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }
  const data = await ladeTurnier(guildId);
  const fight = (data?.kämpfe || []).find(f => f.id === kampfId);
  if (!fight) {
    const message = getLocalizedString('messages.tournament.score.matchNotFound', locale, { id: kampfId }, `❌ Match #${kampfId} not found.`);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  const phaseLabel = getPhaseLabel(fight.phase, locale) || fight.phase;

  // Eingaben parsen
  const a = parseInt((interaction.fields.getTextInputValue('score_a') || '').trim(), 10);
  const b = parseInt((interaction.fields.getTextInputValue('score_b') || '').trim(), 10);
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    const message = getLocalizedString('messages.tournament.score.invalidNumbers', locale, {}, '❌ Please enter whole numbers only.');
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  // Phase & Best-of bestimmen
  const phase = (fight.phase || '').toLowerCase();         // 'quali' | 'gruppen' | 'ko' | 'finale'
  const isKO  = phase === 'ko' || phase === 'finale';
  const bestOf = fight.bestOf || (phase === 'quali' ? 1 : 3);

  // Validierung
  const ok = isKO ? validReportKO(bestOf, a, b) : validReportExact(bestOf, a, b);
  if (!ok) {
    const message = getLocalizedString('messages.tournament.score.followUps.invalid', locale, { bestOf }, `❌ Unclear result, this phase is played as Best of ${bestOf}.`);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  // Speichern
  fight.scoreA  = a;
  fight.scoreB  = b;
  fight.finished = true;
  if (a !== b) {
    fight.winnerId = (a > b) ? fight.playerA.id : fight.playerB.id;
  }
  fight.timestamp = new Date().toISOString();

  await speichereTurnier(guildId, data);

  const grpInfo = fight.groupName
    ? getLocalizedString('messages.tournament.score.groupInfo', locale, { group: fight.groupName }, ` · Group **${fight.groupName}**`)
    : '';
  const followUps = [];
  const activeFights = Array.isArray(data.kämpfe) ? data.kämpfe : [];

  if (fight.groupName) {
    const groupFights = activeFights.filter(f => f.phase === fight.phase && f.groupName === fight.groupName);
    if (groupFights.length > 0 && groupFights.every(f => f.finished)) {
      followUps.push(
        getLocalizedString('messages.tournament.score.followUps.groupFinished', locale, { group: fight.groupName })
      );
    }
  }

  const phaseFights = activeFights.filter(f => f.phase === fight.phase);
  if (phaseFights.length > 0 && phaseFights.every(f => f.finished)) {
    followUps.push(
      getLocalizedString('messages.tournament.score.followUps.phaseFinished', locale, { phase: phaseLabel })
    );
  }

  const resultMessage = getLocalizedString('messages.tournament.score.resultSet', locale, {
    id: kampfId,
    groupInfo: grpInfo,
    playerA: fight.playerA?.name ?? 'A',
    scoreA: a,
    scoreB: b,
    playerB: fight.playerB?.name ?? 'B',
  }, `🛠️ Result saved: **#${kampfId}**${grpInfo} — ${fight.playerA?.name ?? 'A'} ${a} : ${b} ${fight.playerB?.name ?? 'B'}`);

  await interaction.reply({ content: resultMessage });

  for (const msg of followUps) {
    if (msg) {
      await interaction.followUp({ content: msg });
    }
  }
}

// === Exports ===
module.exports = { open, run };