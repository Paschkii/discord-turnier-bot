// === Imports ===
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
  PermissionsBitField
} = require('discord.js');

const { themedGroupNames, formatMK } = require('../../utils');
const { ladeTurnier, speichereTurnier } = require('../../store/turniere');
const { buildDashboard, defaultStateFromData } = require('../../views/dashboard');
const {
  createQualificationFromTeilnehmerMap,
  createGroupsPhaseTopLow,
  createTopLowQuarterfinals,
  computeGroupStandings,
  determineQualifiedTopLow,
  GROUP_EMOJI,
  prepareParticipantsForMode
} = require('../../services/tournament');
const { validateFormat } = require('../../services/planner/validation');
const { getLocalizedString } = require('../../config/messages');
const { resolveInteractionLocale } = require('../../utils/interactionLocale');

// === Alte Kämpfe vor dem Überschreiben archivieren ===
function archiveFights(d) {
  d.kämpfeArchiv = [ ...(d.kämpfeArchiv || []), ...((d.kämpfe || [])) ];
}

function nextFightId(d) {
  const fights = [ ...(d.kämpfeArchiv || []), ...(d.kämpfe || []) ];
  return fights.reduce((max, f) => Math.max(max, Number(f?.id) || 0), 0) + 1;
}

// Nächste Phase starten
async function execute(interaction) {
  const locale = await resolveInteractionLocale(interaction);
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    const message = getLocalizedString('messages.tournament.advance.adminOnly', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  const guildId = interaction.guildId;
  if (!guildId) {
    const message = getLocalizedString('messages.tournament.general.guildOnlyCommand', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  const daten = await ladeTurnier(guildId);
  if (!daten) {
    const message = getLocalizedString('messages.tournament.general.noActiveTournament', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }

  try {
    // Start/Offen → QUALI
    if (!daten.status || daten.status === 'offen' || daten.status === 'idle') {
      const format = typeof daten.modus === 'string' ? daten.modus : '1v1';
      const teilnehmerArr = Object.entries(daten.teilnehmer || {})
        .map(([id, p]) => ({ id, name: p.name, klasse: p.klasse }));
      if (teilnehmerArr.length < 2) {
        const message = getLocalizedString('messages.tournament.advance.needsParticipants', locale);
        return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
      }
      const validation = validateFormat(teilnehmerArr.length, format);
      if (!validation.ok) {
        const context = validation.context || {};
        const reasonKey = validation.reasonKey
          ? `messages.tournament.advance.validation.${validation.reasonKey}`
          : null;
        const reasonMessage = reasonKey
          ? getLocalizedString(reasonKey, locale, context)
          : '';
        const fallback = getLocalizedString('messages.tournament.advance.invalidConfiguration', locale);
        const message = reasonMessage || fallback;
        return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
      }

      const { map: participantMap, teams } = prepareParticipantsForMode(daten.teilnehmer, format);
      daten.teams = teams || [];
      daten.teilnehmer = participantMap;

      const preparedArr = Object.entries(participantMap || {})
        .map(([id, p]) => ({ id, name: p.name, klasse: p.klasse, members: p.members, memberIds: p.memberIds }));

      let fights = createQualificationFromTeilnehmerMap(participantMap);
      // Quali-Phase & sichtbare Gruppe setzen
      const qualificationLabel = getLocalizedString('messages.tournament.advance.qualificationLabel', locale, {}, 'Qualifikation');
      const qualiName = `${themedGroupNames(1)[0]} ${qualificationLabel}`.trim();
      fights = fights.map((f, i) => ({
        ...f,
        phase: 'quali',
        groupName: qualiName,
        localId: i + 1
      }));

      daten.kämpfe = fights;
      daten.groups = [{
        name: qualiName,
        members: preparedArr,
        matches: fights.map((f) => ({ ...f }))
      }];
      daten.status = 'quali';

      await speichereTurnier(guildId, daten);
      const view = await buildDashboard(interaction, daten, defaultStateFromData(daten, 'g'));
      const startMessage = getLocalizedString('messages.tournament.advance.qualificationStarted', locale, { count: fights.length });
      return interaction.reply({
        content: startMessage || `🔰 Qualification round started (${fights.length} matches).`,
        embeds: view.embeds,
        components: view.components
      });
    }

    // Quali → Gruppen (Top/Low + Matches)
    if (daten.status === 'quali') {
      const unfinished = (daten.kämpfe || []).filter(f => f.phase === 'quali' && !f.finished);
      if (unfinished.length > 0) {
        const message = getLocalizedString('messages.tournament.advance.unfinishedQualification', locale, { count: unfinished.length });
        return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
      }

      // Gewinner/Verlierer markieren → tag 'Top' / 'Low'
      for (const q of (daten.kämpfe || [])) {
        const winId = q.winnerId ?? (q.scoreA > q.scoreB ? q.playerA.id : q.playerB.id);
        const loseId = winId === q.playerA.id ? q.playerB.id : q.playerA.id;
        if (daten.teilnehmer[winId])  daten.teilnehmer[winId].tag  = 'Top';
        if (daten.teilnehmer[loseId]) daten.teilnehmer[loseId].tag = 'Low';
      }

      // 4 Gruppen erzeugen (2×Top, 2×Low) – mit Matches!
      const { groups, fights } = createGroupsPhaseTopLow(daten.teilnehmer);
      daten.groups = groups;        // groups[i].matches bereits gefüllt
      daten.kämpfe = fights;        // ALLE Gruppen-Matches
      daten.status = 'gruppen';

      await speichereTurnier(guildId, daten);
      const view = await buildDashboard(interaction, daten, defaultStateFromData(daten, 'g'));
      const message = getLocalizedString('messages.tournament.advance.groupsStarted', locale, { count: daten.kämpfe.length });
      return interaction.reply({ content: message || `🟦 Group phase started (${daten.kämpfe.length} matches).`, embeds: view.embeds, components: view.components });
    }

    // Gruppen → KO (Top/Low Viertelfinale)
    if (daten.status === 'gruppen') {
      const unfinished = (daten.kämpfe || []).filter(f => f.phase === 'gruppen' && !f.finished);
      if (unfinished.length > 0) {
        const message = getLocalizedString('messages.tournament.advance.unfinishedGroups', locale, { count: unfinished.length });
        return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
      }

      const allFights   = [ ...(daten.kämpfeArchiv || []), ...(daten.kämpfe || []) ];
      const groupFights = allFights.filter(f => f.phase === 'gruppen');
      
      const standings = computeGroupStandings(groupFights, daten.groups);
      const { topSeeds, lowSeeds, tieBreakers } = determineQualifiedTopLow(standings, daten.groups, 2);

      if (tieBreakers.length > 0) {
        daten.pendingTieBreakers = tieBreakers;
        await speichereTurnier(guildId, daten);
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('start_tiebreakers')
            .setLabel(getLocalizedString('messages.tournament.advance.tieBreakerButton', locale, {}, 'Tie-Breaker starten'))
            .setStyle(ButtonStyle.Danger)
        );

        const groupList = tieBreakers.map(tb => tb.groupName).join(', ');
        const tieBreakerMessage = getLocalizedString('messages.tournament.advance.tieBreakerNeeded', locale, { groups: groupList || '—' });
        return interaction.reply({
          content: tieBreakerMessage || `⚠️ Tie-breakers (Bo1) required: ${groupList || '—'}.`,
          components: [row]
        });
      }

      // Erwartung: 4 Top-Seeds & 4 Low-Seeds → Viertelfinale
      const countSeeds = (obj) => Object.values(obj).reduce((n, a) => n + (a?.length || 0), 0);
      const topCount = countSeeds(topSeeds), lowCount = countSeeds(lowSeeds);
      if (!(topCount === 4 && lowCount === 4)) {
        const message = getLocalizedString('messages.tournament.advance.unexpectedSeedCount', locale, { top: topCount, low: lowCount });
        return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
      }

      // QF je Bucket erzeugen
      const startId = nextFightId(daten);
      const qfRaw = createTopLowQuarterfinals(topSeeds, lowSeeds, startId); // mit bucket + groupName

      // ✅ Archivieren der Gruppen-Kämpfe, bevor wir überschreiben
      archiveFights(daten);

      daten.status = 'ko';

      // Anzeigegruppen (2) mit neuen Namen
      const names = themedGroupNames(2);
      const baseTop = names[0];
      const baseLow = names[1];

      const koTop = qfRaw.filter(f => f.bucket === 'top').map((m, i) => ({ ...m, groupName: baseTop, localId: i + 1 }));
      const koLow = qfRaw.filter(f => f.bucket === 'low').map((m, i) => ({ ...m, groupName: baseLow, localId: i + 1 }));

      const qf = [...koTop, ...koLow];
      daten.kämpfe = qf;

      const memTop = Array.from(new Map(koTop.flatMap(f => [f.playerA, f.playerB]).map(p => [p.id, p])).values());
      const memLow = Array.from(new Map(koLow.flatMap(f => [f.playerA, f.playerB]).map(p => [p.id, p])).values());

      daten.groups = [
        { name: baseTop, bucket: 'top', displayName: `${baseTop} ${GROUP_EMOJI.top}`, members: memTop, matches: koTop },
        { name: baseLow, bucket: 'low', displayName: `${baseLow} ${GROUP_EMOJI.low}`, members: memLow, matches: koLow },
      ];

      await speichereTurnier(guildId, daten);
      const view = await buildDashboard(interaction, daten, defaultStateFromData(daten, 'g'));
      const message = getLocalizedString('messages.tournament.advance.quarterfinalsStarted', locale, { count: qf.length });
      return interaction.reply({ content: message || `⚔️ KO quarterfinals started (${qf.length} matches).`, embeds: view.embeds, components: view.components });
    }

    // KO (Viertelfinale) → KO (Halbfinale)
    if (daten.status === 'ko' && (daten.kämpfe?.length || 0) === 4) {
      const unfinished = (daten.kämpfe || []).filter(f => f.phase === 'ko' && !f.finished);
      if (unfinished.length > 0) {
        const message = getLocalizedString('messages.tournament.advance.unfinishedKo', locale, { count: unfinished.length });
        return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
      }

      const winnersTop = [], winnersLow = [];
      for (const f of (daten.kämpfe || [])) {
        const winId = f.winnerId ?? (f.scoreA > f.scoreB ? f.playerA.id : f.playerB.id);
        const win = (winId === f.playerA.id) ? f.playerA : f.playerB;
        if (f.bucket === 'top') winnersTop.push(win);
        else                   winnersLow.push(win);
      }

      // Guard: je Bucket genau 2 Sieger erwartet
      if (winnersTop.length !== 2 || winnersLow.length !== 2) {
        const message = getLocalizedString('messages.tournament.advance.semifinalRequirement', locale, { top: winnersTop.length, low: winnersLow.length });
        return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
      }

      const baseTop = daten.groups.find(g => g.bucket === 'top')?.name || themedGroupNames(2)[0];
      const baseLow = daten.groups.find(g => g.bucket === 'low')?.name || themedGroupNames(2)[1];

      const startId = nextFightId(daten);
      const sf = [
        {
          id: startId, phase: 'ko', groupName: baseTop, localId: 1,
          playerA: winnersTop[0], playerB: winnersTop[1], scoreA: 0, scoreB: 0,
          bestOf: 3, finished: false, timestamp: null, winnerId: null, bucket: 'top'
        },
        {
          id: startId + 1, phase: 'ko', groupName: baseLow, localId: 1,
          playerA: winnersLow[0], playerB: winnersLow[1], scoreA: 0, scoreB: 0,
          bestOf: 3, finished: false, timestamp: null, winnerId: null, bucket: 'low'
        },
      ];

      // ✅ Archivieren der Viertelfinale vor dem Überschreiben
      archiveFights(daten);

      daten.kämpfe = sf;

      const membersTop = Array.from(new Map([sf[0].playerA, sf[0].playerB].map(p => [p.id, p])).values());
      const membersLow = Array.from(new Map([sf[1].playerA, sf[1].playerB].map(p => [p.id, p])).values());

      daten.groups = [
        { name: baseTop, bucket: 'top', displayName: `${baseTop} ${GROUP_EMOJI.top}`, members: membersTop, matches: [sf[0]] },
        { name: baseLow, bucket: 'low', displayName: `${baseLow} ${GROUP_EMOJI.low}`, members: membersLow, matches: [sf[1]] },
      ];

      await speichereTurnier(guildId, daten);
      const view = await buildDashboard(interaction, daten, defaultStateFromData(daten, 'g'));
      const message = getLocalizedString('messages.tournament.advance.semifinalsStarted', locale);
      return interaction.reply({ content: message || '🔁 KO semifinals started (2 matches).', embeds: view.embeds, components: view.components });
    }

    // KO (Halbfinale) → Finale (+ Bronze)
    if (daten.status === 'ko' && (daten.kämpfe?.length || 0) === 2) {
      const unfinished = daten.kämpfe.filter(f => f.phase === 'ko' && !f.finished);
      if (unfinished.length > 0) {
        const message = getLocalizedString('messages.tournament.advance.unfinishedSemifinals', locale);
        return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
      }

      let topWinner, topLoser, lowWinner, lowLoser;
      for (const f of daten.kämpfe) {
        const winId = f.winnerId ?? (f.scoreA > f.scoreB ? f.playerA.id : f.playerB.id);
        const win = (winId === f.playerA.id) ? f.playerA : f.playerB;
        const lose = (winId === f.playerA.id) ? f.playerB : f.playerA;
        if (f.bucket === 'top') { topWinner = win; topLoser = lose; }
        else { lowWinner = win; lowLoser = lose; }
      }

      const finalGroupName = getLocalizedString('messages.tournament.finals.finalGroupName', locale, {}, 'Kampf um Platz 1 und 2');
      const bronzeGroupName = getLocalizedString('messages.tournament.finals.bronzeGroupName', locale, {}, 'Kampf um Platz 3 und 4');

      const startId = nextFightId(daten);
      const finalFight = {
        id: startId, phase: 'finale', groupName: finalGroupName, localId: 1,
        playerA: topWinner, playerB: lowWinner,
        scoreA: 0, scoreB: 0, bestOf: 3, finished: false, timestamp: null, winnerId: null,
      };
      const bronzeFight = {
        id: startId + 1, phase: 'finale', groupName: bronzeGroupName, localId: 2,
        playerA: topLoser, playerB: lowLoser,
        scoreA: 0, scoreB: 0, bestOf: 3, finished: false, timestamp: null, winnerId: null,
      };

      // ✅ Archivieren der Halbfinale vor dem Überschreiben
      archiveFights(daten);

      daten.kämpfe = [finalFight, bronzeFight];

      const finalMembers = Array.from(new Map([finalFight.playerA, finalFight.playerB].map(p => [p.id, p])).values());
      const bronzeMembers = Array.from(new Map([bronzeFight.playerA, bronzeFight.playerB].map(p => [p.id, p])).values());

      daten.groups = [
        { name: finalGroupName, displayName: finalGroupName, order: 1, members: finalMembers, matches: [finalFight] },
        { name: bronzeGroupName, displayName: bronzeGroupName, order: 2, members: bronzeMembers, matches: [bronzeFight] },
      ];

      daten.status = 'finale';
      await speichereTurnier(guildId, daten);
      const view = await buildDashboard(interaction, daten, defaultStateFromData(daten, 'g'));
      const message = getLocalizedString('messages.tournament.advance.finalsStarted', locale);
      return interaction.reply({ content: message || '🏁 Finals and bronze match created.', embeds: view.embeds, components: view.components });
    }

    // FINALE → Abschluss (+ HoF)
    if (daten.status === 'finale') {
      const unfinished = (daten.kämpfe || []).filter((f) => f.phase === 'finale' && !f.finished);
      if (unfinished.length > 0) {
        const message = getLocalizedString('messages.tournament.advance.unfinishedFinals', locale);
        return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
      }

      const finalFight  = daten.kämpfe.find(f => f.localId === 1) || daten.kämpfe[0];
      const bronzeFight = daten.kämpfe.find(f => f.localId === 2) || null;

      const gold   = finalFight.winnerId === finalFight.playerA.id ? finalFight.playerA : finalFight.playerB;
      const silver = finalFight.winnerId === finalFight.playerA.id ? finalFight.playerB : finalFight.playerA;
      let bronze = null, fourth = null;
      if (bronzeFight) {
        bronze = bronzeFight.winnerId === bronzeFight.playerA.id ? bronzeFight.playerA : bronzeFight.playerB;
        fourth = bronzeFight.winnerId === bronzeFight.playerA.id ? bronzeFight.playerB : bronzeFight.playerA;
      }

      daten.podium = {
        first:  { id: gold.id,   name: gold.name },
        second: { id: silver.id, name: silver.name },
        third:  bronze ? { id: bronze.id, name: bronze.name } : null,
        fourth: fourth ? { id: fourth.id, name: fourth.name } : null,
        finishedAt: new Date().toISOString(),
        modus: daten.modus || '1v1',
      };
      daten.status = 'abgeschlossen';

      await speichereTurnier(guildId, daten);

      const prize = daten.prize || null;
      const defaultName = getLocalizedString('messages.tournament.finals.embedDefaultName', locale, {}, 'Turnier');
      const tournamentName = daten.name || defaultName;
      const embedTitle = getLocalizedString('messages.tournament.finals.embedTitle', locale, { name: tournamentName }, `🏆 Endergebnis — ${tournamentName}`);
      const firstLabel = getLocalizedString('messages.tournament.finals.podium.first', locale, {}, '🥇 Platz 1');
      const secondLabel = getLocalizedString('messages.tournament.finals.podium.second', locale, {}, '🥈 Platz 2');
      const thirdLabel = getLocalizedString('messages.tournament.finals.podium.third', locale, {}, '🥉 Platz 3');
      const fourthLabel = getLocalizedString('messages.tournament.finals.podium.fourth', locale, {}, '🎖️ Platz 4');
      const prizeLabel = getLocalizedString('messages.tournament.finals.podium.prize', locale, {}, '💰 Pott & Preise');
      const embed = new EmbedBuilder()
        .setColor(0xffd700)
        .setTitle(embedTitle)
        .addFields(
          { name: firstLabel, value: `**${gold.name}**` },
          { name: secondLabel, value: `**${silver.name}**` },
          ...(bronze ? [{ name: thirdLabel, value: `**${bronze.name}**` }] : []),
          ...(fourth ? [{ name: fourthLabel, value: `**${fourth.name}**` }] : []),
          ...(prize ? [{
            name: prizeLabel,
            value: `${prize.text?.total ?? formatMK(prize.totalMK)} · 🥇 ${prize.text?.first ?? formatMK(prize.firstMK)} · 🥈 ${prize.text?.second ?? formatMK(prize.secondMK)} · 🥉 ${prize.text?.third ?? formatMK(prize.thirdMK)}`
          }] : []),
        )
        .setTimestamp();

      const completeMessage = getLocalizedString('messages.tournament.advance.tournamentCompleted', locale, {}, '🏆 Turnier abgeschlossen!');
      return interaction.reply({ content: completeMessage, embeds: [embed] });
    }

    const message = getLocalizedString('messages.tournament.advance.unknownStatus', locale);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });

  } catch (err) {
    console.error('[turnier_advance] error:', err);
    const message = getLocalizedString('messages.tournament.advance.error', locale, { message: err.message }, `❌ Fehler: ${err.message}`);
    return interaction.reply({ content: message, flags: MessageFlags.Ephemeral });
  }
}

// === Exports ===
module.exports = { execute };