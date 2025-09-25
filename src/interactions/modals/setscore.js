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

const MESSAGE_BUNDLE = {
  de: {
    invalid: (bestOf) => `❌ Unklares Ergebnis, in dieser Phase gilt Best of ${bestOf}.`,
    groupFinished: (group) => `✅ Alle Kämpfe in ${group} fertig!`,
    phaseFinished: (phase) => `✅ Alle Kämpfe in der ${phase} fertig! Das Turnier kann in die nächste Phase übergeleitet werden.`,
  },
  en: {
    invalid: (bestOf) => `❌ Unclear result, this phase is played as Best of ${bestOf}.`,
    groupFinished: (group) => `✅ All matches in ${group} finished!`,
    phaseFinished: (phase) => `✅ All matches in the ${phase} are finished! The tournament can advance to the next phase.`,
  },
  fr: {
    invalid: (bestOf) => `❌ Résultat incertain, cette phase se joue en Best of ${bestOf}.`,
    groupFinished: (group) => `✅ Tous les matchs de ${group} sont terminés !`,
    phaseFinished: (phase) => `✅ Tous les matchs de la ${phase} sont terminés ! Le tournoi peut passer à la phase suivante.`,
  },
  es: {
    invalid: (bestOf) => `❌ Resultado poco claro, esta fase se juega al mejor de ${bestOf}.`,
    groupFinished: (group) => `✅ ¡Todos los combates en ${group} están terminados!`,
    phaseFinished: (phase) => `✅ ¡Todos los combates de la ${phase} han terminado! El torneo puede pasar a la siguiente fase.`,
  },
  it: {
    invalid: (bestOf) => `❌ Risultato non chiaro, in questa fase si gioca al meglio delle ${bestOf}.`,
    groupFinished: (group) => `✅ Tutti gli incontri in ${group} sono terminati!`,
    phaseFinished: (phase) => `✅ Tutti gli incontri della ${phase} sono terminati! Il torneo può passare alla fase successiva.`,
  },
  pt: {
    invalid: (bestOf) => `❌ Resultado indefinido, esta fase é disputada em Melhor de ${bestOf}.`,
    groupFinished: (group) => `✅ Todas as partidas em ${group} foram concluídas!`,
    phaseFinished: (phase) => `✅ Todas as partidas da ${phase} terminaram! O torneio pode avançar para a próxima fase.`,
  },
};

const getMessages = (locale = 'de') => MESSAGE_BUNDLE[locale] || MESSAGE_BUNDLE.de;

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
  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: '❌ Dieser Befehl kann nur in einem Server verwendet werden.', flags: MessageFlags.Ephemeral });
  }
  const data = await ladeTurnier(guildId);
  const fight = (data?.kämpfe || []).find(f => f.id === kampfId);
  if (!fight) {
    return interaction.reply({ content: `❌ Kampf #${kampfId} nicht gefunden.`, flags: MessageFlags.Ephemeral });
  }

  const locale = await resolveInteractionLocale(interaction);
  const messages = getMessages(locale);
  const phaseLabel = getPhaseLabel(fight.phase, locale) || fight.phase;

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
    return interaction.reply({
      content: messages.invalid(bestOf),
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

  await speichereTurnier(guildId, data);

  const grpInfo = fight.groupName ? ` · Gruppe **${fight.groupName}**` : '';
  const followUps = [];
  const activeFights = Array.isArray(data.kämpfe) ? data.kämpfe : [];

  if (fight.groupName) {
    const groupFights = activeFights.filter(f => f.phase === fight.phase && f.groupName === fight.groupName);
    if (groupFights.length > 0 && groupFights.every(f => f.finished)) {
      followUps.push(messages.groupFinished(fight.groupName));
    }
  }

  const phaseFights = activeFights.filter(f => f.phase === fight.phase);
  if (phaseFights.length > 0 && phaseFights.every(f => f.finished)) {
    followUps.push(messages.phaseFinished(phaseLabel));
  }

  await interaction.reply({
    content: `🛠️ Ergebnis gesetzt: **#${kampfId}**${grpInfo} — ${fight.playerA?.name ?? 'A'} ${a} : ${b} ${fight.playerB?.name ?? 'B'}`
  });

  for (const msg of followUps) {
    await interaction.followUp({ content: msg });
  }
}

// === Exports ===
module.exports = { open, run };