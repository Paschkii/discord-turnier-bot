const {
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require('discord.js');

const { ALLOWED_KO_SIZES } = require('../../config/constants');
const { themedGroupNames, formatMK } = require('../../utils');
const { ladeTurnier, speichereTurnier } = require('../../store/turniere');
const { buildPagedGroupReply } = require('../../embeds/groups');

const {
  createQualificationFromTeilnehmerMap,
  createGroupsPhase,
  computeGroupStandings,
  determineQualifiedAdvanced,
  createKOSeeded,
  createKOFightsFromParticipants,
} = require('../../services/tournament');

module.exports = {
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '⛔ Nur Admins dürfen die nächste Phase starten.', ephemeral: true });
    }

    const daten = await ladeTurnier();
    if (!daten) return interaction.reply({ content: '❌ Kein aktives Turnier.', ephemeral: true });

    try {
      // Start/Offen → QUALI
      if (!daten.status || daten.status === 'offen' || daten.status === 'idle') {
        const teilnehmerArr = Object.entries(daten.teilnehmer || {})
          .map(([id, p]) => ({ id, name: p.name, klasse: p.klasse }));
        if (teilnehmerArr.length < 2) return interaction.reply({ content: '❌ Mindestens 2 Teilnehmer erforderlich.', ephemeral: true });
        if (teilnehmerArr.length % 2 !== 0) return interaction.reply({ content: '❌ Teilnehmerzahl muss gerade sein!', ephemeral: true });

        let fights = createQualificationFromTeilnehmerMap(daten.teilnehmer);
        // Quali-Phase & sichtbare Gruppe setzen
        const qualiname = `${themedGroupNames(1)[0]} Qualifikation`;
        fights = fights.map((f, i) => ({
          ...f,
          phase: 'quali',
          groupName: qualiname,
          localId: i + 1
        }));

        daten.kämpfe = fights;
        daten.groups = [{
          name: qualiname,
          members: teilnehmerArr,
          matches: fights.map((f) => ({ ...f }))
        }];
        daten.status = 'quali';

        await speichereTurnier(daten);
        const { embeds, components } = buildPagedGroupReply(daten, 1, 10);
        return interaction.reply({
          content: `🔰 Qualifikationsrunde gestartet (${fights.length} Kämpfe).`,
          embeds, components, ephemeral: false
        });
      }

      // QUALI → GRUPPEN
      if (daten.status === 'quali') {
        const unfinished = (daten.kämpfe || []).filter((f) => f.phase === 'quali' && !f.finished);
        if (unfinished.length > 0) {
          return interaction.reply({ content: `⚠️ Es gibt noch ${unfinished.length} offene Quali-Kämpfe.`, ephemeral: true });
        }

        // Gewinner/Verlierer taggen
        for (const q of daten.kämpfe || []) {
          const winnerId = q.winnerId ?? (q.scoreA > q.scoreB ? q.playerA.id : q.playerB.id);
          if (!winnerId) continue;
          const loserId = winnerId === q.playerA.id ? q.playerB.id : q.playerA.id;
          if (daten.teilnehmer[winnerId]) daten.teilnehmer[winnerId].tag = 'Top';
          if (daten.teilnehmer[loserId]) daten.teilnehmer[loserId].tag = 'Low';
        }

        const { groups, fights } = createGroupsPhase(daten.teilnehmer);
        daten.groups = groups;
        daten.kämpfe = fights.map((f, i) => ({ ...f, localId: i + 1 })); // falls nicht gesetzt
        daten.status = 'gruppen';

        await speichereTurnier(daten);
        const { embeds, components } = buildPagedGroupReply(daten, 1, 10);
        return interaction.reply({
          content: `🟦 Gruppenphase gestartet (${daten.kämpfe.length} Kämpfe).`,
          embeds, components, ephemeral: false
        });
      }

      // GRUPPEN → KO (Tie-Breaker oder Seeding)
      if (daten.status === 'gruppen') {
        const unfinished = (daten.kämpfe || []).filter((f) => f.phase === 'gruppen' && !f.finished);
        if (unfinished.length > 0) {
          return interaction.reply({ content: `⚠️ Es gibt noch ${unfinished.length} offene Gruppen-Kämpfe.`, ephemeral: true });
        }

        const totalParticipants = Object.keys(daten.teilnehmer || {}).length;
        const groupFights = (daten.kämpfe || []).filter((f) => f.phase === 'gruppen');
        const standings = computeGroupStandings(groupFights, daten.groups);
        const { qualified, tieBreakers, takePerGroup } = determineQualifiedAdvanced(
          standings, daten.groups, totalParticipants
        );

        if (tieBreakers.length > 0) {
          daten.pendingTieBreakers = tieBreakers;
          await speichereTurnier(daten);
          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('start_tiebreakers').setLabel('Tie-Breaker starten').setStyle(ButtonStyle.Danger)
          );
          return interaction.reply({
            content: `⚠️ Tie-Breaker nötig in ${tieBreakers.length} Gruppe(n) (Cut = Top${takePerGroup}).`,
            components: [row], ephemeral: false
          });
        }

        // Seeded KO erzeugen
        let seeded = createKOSeeded(qualified, daten.groups, takePerGroup);
        seeded = seeded.map((m, i) => ({ ...m, phase: 'ko', groupName: 'Kolossium', localId: i + 1 }));

        // Kolossium-Gruppe anlegen
        const koMembers = [];
        const seen = new Set();
        for (const f of seeded) [f.playerA, f.playerB].forEach(p => { if (p && !seen.has(p.id)) { seen.add(p.id); koMembers.push(p); } });

        daten.kämpfe = seeded;
        daten.groups = [{
          name: 'Kolossium',
          members: koMembers,
          matches: seeded.map((m) => ({ ...m }))
        }];
        daten.status = 'ko';

        await speichereTurnier(daten);
        const { embeds, components } = buildPagedGroupReply(daten, 1, 10);
        return interaction.reply({
          content: `⚔️ K.O.-Phase gestartet (${daten.kämpfe.length} Kämpfe).`,
          embeds, components, ephemeral: false
        });
      }

      // KO → nächste KO oder FINALE (inkl. Bronze)
      if (daten.status === 'ko') {
        const unfinished = (daten.kämpfe || []).filter((f) => f.phase === 'ko' && !f.finished);
        if (unfinished.length > 0) {
          return interaction.reply({ content: `⚠️ Es gibt noch ${unfinished.length} offene KO-Kämpfe.`, ephemeral: true });
        }

        const winners = [];
        const losers = [];
        for (const f of daten.kämpfe || []) {
          const winnerId = f.winnerId ?? (f.scoreA > f.scoreB ? f.playerA.id : f.playerB.id);
          const loserId  = winnerId === f.playerA.id ? f.playerB.id : f.playerA.id;
          const winner = winnerId === f.playerA.id ? f.playerA : f.playerB;
          const loser  = loserId  === f.playerA.id ? f.playerA : f.playerB;
          winners.push({ id: winner.id, name: winner.name });
          losers.push({ id: loser.id,  name: loser.name  });
        }

        // Halbfinale → Finale + Bronze
        if (winners.length === 2 && (daten.kämpfe || []).length === 2) {
          const [finalFight] = createKOFightsFromParticipants(winners).map(f => ({ ...f, phase: 'finale' }));
          const bronzeFight = {
            id: 2,
            phase: 'finale',
            playerA: losers[0],
            playerB: losers[1],
            scoreA: 0, scoreB: 0,
            bestOf: 3,
            finished: false,
            timestamp: null,
            winnerId: null,
            groupName: 'Turnierfinale',
            localId: 2,
          };

          daten.kämpfe = [{ ...finalFight, id: 1, groupName: 'Turnierfinale', localId: 1 }, bronzeFight];
          daten.groups = [{
            name: 'Turnierfinale',
            members: [...new Set(winners.concat(losers).map(p => p.id))].map(id => winners.concat(losers).find(p => p.id === id)),
            matches: daten.kämpfe.map((m) => ({ ...m })),
          }];
          daten.status = 'finale';

          await speichereTurnier(daten);
          const { embeds, components } = buildPagedGroupReply(daten, 1, 10);
          return interaction.reply({ content: '🏁 Finale & 🥉-Match erstellt.', embeds, components, ephemeral: false });
        }

        if (!ALLOWED_KO_SIZES.includes(winners.length)) {
          return interaction.reply({ content: `❌ Ungültige Anzahl an Gewinnern (${winners.length}) für nächste KO-Runde.`, ephemeral: true });
        }

        // nächste KO-Runde
        let next = createKOFightsFromParticipants(winners);
        next = next.map((m, i) => ({ ...m, phase: 'ko', groupName: 'Kolossium', localId: i + 1 }));

        const koMembers2 = [];
        const seen2 = new Set();
        for (const f of next) [f.playerA, f.playerB].forEach(p => { if (p && !seen2.has(p.id)) { seen2.add(p.id); koMembers2.push(p); } });

        daten.kämpfe = next;
        daten.groups = [{
          name: 'Kolossium',
          members: koMembers2,
          matches: next.map((m) => ({ ...m })),
        }];

        await speichereTurnier(daten);
        const { embeds, components } = buildPagedGroupReply(daten, 1, 10);
        return interaction.reply({ content: `🔁 Nächste KO-Runde gestartet (${daten.kämpfe.length} Kämpfe).`, embeds, components, ephemeral: false });
      }

      // FINALE → Abschluss (+ HoF)
      if (daten.status === 'finale') {
        const unfinished = (daten.kämpfe || []).filter((f) => f.phase === 'finale' && !f.finished);
        if (unfinished.length > 0) return interaction.reply({ content: '⚠️ Finale/Bronze nicht beendet.', ephemeral: true });

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

        await speichereTurnier(daten);

        const prize = daten.prize || null;
        const embed = new EmbedBuilder()
          .setColor(0xffd700)
          .setTitle(`🏆 Endergebnis — ${daten.name || 'Turnier'}`)
          .addFields(
            { name: '🥇 Platz 1', value: `**${gold.name}**` },
            { name: '🥈 Platz 2', value: `**${silver.name}**` },
            ...(bronze ? [{ name: '🥉 Platz 3', value: `**${bronze.name}**` }] : []),
            ...(fourth ? [{ name: '🎖️ Platz 4', value: `**${fourth.name}**` }] : []),
            ...(prize ? [{
              name: '💰 Pott & Preise',
              value: `${prize.text?.total ?? formatMK(prize.totalMK)} · 🥇 ${prize.text?.first ?? formatMK(prize.firstMK)} · 🥈 ${prize.text?.second ?? formatMK(prize.secondMK)} · 🥉 ${prize.text?.third ?? formatMK(prize.thirdMK)}`
            }] : []),
          )
          .setTimestamp();

        return interaction.reply({ content: '🏆 Turnier abgeschlossen!', embeds: [embed], ephemeral: false });
      }

      return interaction.reply({ content: '⚠️ Unbekannter Status.', ephemeral: true });

    } catch (err) {
      console.error('[turnier_advance] error:', err);
      return interaction.reply({ content: `❌ Fehler: ${err.message}`, ephemeral: true });
    }
  }
};
