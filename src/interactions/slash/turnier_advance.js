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
const { buildPagedGroupReply } = require('../../embeds/groups');
const {
  createQualificationFromTeilnehmerMap,
  createGroupsPhaseTopLow,
  computeGroupStandings,
  createTopLowQuarterfinals,
  determineQualifiedTopLow, 
  GROUP_EMOJI
} = require('../../services/tournament');

module.exports = {
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '⛔ Nur Admins dürfen die nächste Phase starten.', flags: MessageFlags.Ephemeral });
    }

    const daten = await ladeTurnier();
    if (!daten) return interaction.reply({ content: '❌ Kein aktives Turnier.', flags: MessageFlags.Ephemeral });

    try {
      // Start/Offen → QUALI
      if (!daten.status || daten.status === 'offen' || daten.status === 'idle') {
        const teilnehmerArr = Object.entries(daten.teilnehmer || {})
          .map(([id, p]) => ({ id, name: p.name, klasse: p.klasse }));
        if (teilnehmerArr.length < 2) return interaction.reply({ content: '❌ Mindestens 2 Teilnehmer erforderlich.', flags: MessageFlags.Ephemeral });
        if (teilnehmerArr.length % 2 !== 0) return interaction.reply({ content: '❌ Teilnehmerzahl muss gerade sein!', flags: MessageFlags.Ephemeral });

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
          embeds, components
        });
      }

      // QUALI → GRUPPEN
      if (daten.status === 'quali') {
        const unfinished = (daten.kämpfe || []).filter((f) => f.phase === 'quali' && !f.finished);
        if (unfinished.length > 0) {
          return interaction.reply({ content: `⚠️ Es gibt noch ${unfinished.length} offene Quali-Kämpfe.`, flags: MessageFlags.Ephemeral });
        }

        // Gewinner/Verlierer taggen
        for (const q of daten.kämpfe || []) {
          const winnerId = q.winnerId ?? (q.scoreA > q.scoreB ? q.playerA.id : q.playerB.id);
          if (!winnerId) continue;
          const loserId = winnerId === q.playerA.id ? q.playerB.id : q.playerA.id;
          if (daten.teilnehmer[winnerId]) daten.teilnehmer[winnerId].tag = 'Top';
          if (daten.teilnehmer[loserId]) daten.teilnehmer[loserId].tag = 'Low';
        }

        const { groups, fights } = createGroupsPhaseTopLow(daten.teilnehmer);
        daten.groups = groups;
        daten.kämpfe = fights;

        await speichereTurnier(daten);
        const { embeds, components } = buildPagedGroupReply(daten, 1, 10);
        return interaction.reply({
          content: `🟦 Gruppenphase gestartet (${daten.kämpfe.length} Kämpfe).`,
          embeds, components
        });
      }

      // Gruppen → KO (Top/Low Viertelfinale)
      if (daten.status === 'gruppen') {
        const unfinished = daten.kämpfe.filter(f => f.phase === 'gruppen' && !f.finished);
        if (unfinished.length > 0) {
          return interaction.reply({ content: `⚠️ Es gibt noch ${unfinished.length} offene Gruppen-Kämpfe.`, flags: MessageFlags.Ephemeral });
        }

        const groupFights = daten.kämpfe.filter(f => f.phase === 'gruppen');
        const standings = computeGroupStandings(groupFights, daten.groups);

        // Top 2 je Gruppe, getrennt nach Buckets (Top/Low)
        const { topSeeds, lowSeeds, tieBreakers } = determineQualifiedTopLow(standings, daten.groups, 2);
        const countSeeds = (seedsObj) => Object.values(seedsObj).reduce((n, arr) => n + (arr?.length || 0), 0);
        const topCount = countSeeds(topSeeds);
        const lowCount = countSeeds(lowSeeds);

        // Erwartungswerte: typischerweise 4 & 4
        if ((topCount === 4 && lowCount === 4)) {
          // alles gut → QF bauen
        } else if (topCount === 2 && lowCount === 2) {
          // Mini-Feld (z. B. sehr wenige TN) → direkt Halbfinale statt QF
          // -> überspringe QF-Erzeugung und baue direkt SF (Top-SF & Low-SF)
          // (alternativ: interaction.reply mit Hinweis)
        } else {
          return interaction.reply({
            content: `❌ Unerwartete Quali-Zahlen: Top=${topCount}, Low=${lowCount}. Erwartet je 4 (oder je 2 für direkten SF).`,
            flags: MessageFlags.Ephemeral
          });
        }

        if (tieBreakers.length > 0) {
          daten.pendingTieBreakers = tieBreakers;
          await speichereTurnier(daten);
          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('start_tiebreakers').setLabel('Tie-Breaker starten').setStyle(ButtonStyle.Danger)
          );
          return interaction.reply({
            content: `⚠️ Tie-Breaker nötig in ${tieBreakers.length} Gruppe(n) (Cut = Top2 je Gruppe).`,
            components: [row]
          });
        }

        // Viertelfinale innerhalb der Buckets
        const qf = createTopLowQuarterfinals(topSeeds, lowSeeds); // liefert fights mit bucket + groupName "KO 🔼 Top — Viertelfinale" / "KO 🔽 Low — Viertelfinale"
        daten.kämpfe = qf;
        // localId je KO-Gruppe neu vergeben
        const byLabel = new Map();
        for (const f of daten.kämpfe) {
          const key = f.groupName;
          const n = (byLabel.get(key) || 0) + 1;
          byLabel.set(key, n);
          f.localId = n;
        }
        daten.status = 'ko';

        // Anzeigegruppen (zwei): KO Top & KO Low
        const koTopMembers = [];
        const koLowMembers = [];
        const seenTop = new Set(), seenLow = new Set();
        for (const f of qf) {
          const both = [f.playerA, f.playerB];
          if (f.bucket === 'top') for (const p of both) if (p && !seenTop.has(p.id)) { seenTop.add(p.id); koTopMembers.push(p); }
          if (f.bucket === 'low') for (const p of both) if (p && !seenLow.has(p.id)) { seenLow.add(p.id); koLowMembers.push(p); }
        }

        const topLabel = `KO ${GROUP_EMOJI.top} Top — Viertelfinale`;
        const lowLabel = `KO ${GROUP_EMOJI.low} Low — Viertelfinale`;

        daten.groups = [
          { name: topLabel, bucket: 'top', displayName: topLabel, members: koTopMembers, matches: qf.filter(f => f.bucket === 'top').map(m => ({ ...m, groupName: topLabel })) },
          { name: lowLabel, bucket: 'low', displayName: lowLabel, members: koLowMembers, matches: qf.filter(f => f.bucket === 'low').map(m => ({ ...m, groupName: lowLabel })) },
        ];

        await speichereTurnier(daten);
        const { embeds, components } = buildPagedGroupReply(daten, 1, 10);
        return interaction.reply({ content: `⚔️ K.O.-Viertelfinale gestartet (${qf.length} Kämpfe).`, embeds, components });
      }

      // KO (Viertelfinale) → KO (Halbfinale)
      if (daten.status === 'ko' && (daten.groups?.[0]?.name || '').includes('Viertelfinale')) {
        const unfinished = daten.kämpfe.filter(f => f.phase === 'ko' && !f.finished);
        if (unfinished.length > 0) {
          return interaction.reply({ content: `⚠️ Es gibt noch ${unfinished.length} offene KO-Kämpfe.`, flags: MessageFlags.Ephemeral });
        }

        // Sieger je Bucket ermitteln
        const winnersTop = [];
        const winnersLow = [];
        for (const f of daten.kämpfe) {
          const winId = f.winnerId ?? (f.scoreA > f.scoreB ? f.playerA.id : f.playerB.id);
          const win = (winId === f.playerA.id) ? f.playerA : f.playerB;
          if (f.bucket === 'top') winnersTop.push(win);
          else winnersLow.push(win);
        }

        // Sicherstellen: je Bucket 2 Sieger (für SF)
        if (!(winnersTop.length === 2 && winnersLow.length === 2)) {
          return interaction.reply({
            content: `❌ Für das Halbfinale werden je 2 Sieger pro Bracket benötigt (Top=${winnersTop.length}, Low=${winnersLow.length}).`,
            flags: MessageFlags.Ephemeral
          });
        }

        // Baue zwei Halbfinals: Top-SF und Low-SF
        const sf = [];
        let id = 1;
        const topLabel = `KO ${GROUP_EMOJI.top} Top — Halbfinale`;
        const lowLabel = `KO ${GROUP_EMOJI.low} Low — Halbfinale`;

        if (winnersTop.length === 4) {
          // klassisch: (Sieger Match1) vs (Sieger Match2)
          sf.push({
            id: id++, phase: 'ko', groupName: topLabel, localId: 1,
            playerA: winnersTop[0], playerB: winnersTop[1],
            scoreA: 0, scoreB: 0, bestOf: 3, finished: false, timestamp: null, winnerId: null, bucket: 'top',
          });
        } else if (winnersTop.length === 2) {
          sf.push({
            id: id++, phase: 'ko', groupName: topLabel, localId: 1,
            playerA: winnersTop[0], playerB: winnersTop[1],
            scoreA: 0, scoreB: 0, bestOf: 3, finished: false, timestamp: null, winnerId: null, bucket: 'top',
          });
        }

        if (winnersLow.length === 4) {
          sf.push({
            id: id++, phase: 'ko', groupName: lowLabel, localId: 1,
            playerA: winnersLow[0], playerB: winnersLow[1],
            scoreA: 0, scoreB: 0, bestOf: 3, finished: false, timestamp: null, winnerId: null, bucket: 'low',
          });
        } else if (winnersLow.length === 2) {
          sf.push({
            id: id++, phase: 'ko', groupName: lowLabel, localId: 1,
            playerA: winnersLow[0], playerB: winnersLow[1],
            scoreA: 0, scoreB: 0, bestOf: 3, finished: false, timestamp: null, winnerId: null, bucket: 'low',
          });
        }

        daten.kämpfe = sf;
        const byLabel = new Map();
        for (const f of daten.kämpfe) {
          const key = f.groupName;
          const n = (byLabel.get(key) || 0) + 1;
          byLabel.set(key, n);
          f.localId = n;
        }

        // Anzeigegruppen wieder zwei (Top/Low – Halbfinale)
        const membersTop = Array.from(new Map((sf.filter(f => f.bucket === 'top').flatMap(f => [f.playerA, f.playerB])).map(p => [p.id, p])).values());
        const membersLow = Array.from(new Map((sf.filter(f => f.bucket === 'low').flatMap(f => [f.playerA, f.playerB])).map(p => [p.id, p])).values());

        daten.groups = [
          { name: topLabel, bucket: 'top', displayName: topLabel, members: membersTop, matches: sf.filter(f => f.bucket === 'top') },
          { name: lowLabel, bucket: 'low', displayName: lowLabel, members: membersLow, matches: sf.filter(f => f.bucket === 'low') },
        ];

        await speichereTurnier(daten);
        const { embeds, components } = buildPagedGroupReply(daten, 1, 10);
        return interaction.reply({ content: `🔁 K.O.-Halbfinale gestartet (${sf.length} Kämpfe).`, embeds, components });
      }

      // KO (Halbfinale) → Finale (+ Bronze)
      if (daten.status === 'ko' && (daten.groups?.[0]?.name || '').includes('Halbfinale')) {
        const unfinished = daten.kämpfe.filter(f => f.phase === 'ko' && !f.finished);
        if (unfinished.length > 0) {
          return interaction.reply({ content: `⚠️ Halbfinals nicht beendet.`, flags: MessageFlags.Ephemeral });
        }

        let topWinner, topLoser, lowWinner, lowLoser;
        for (const f of daten.kämpfe) {
          const winId = f.winnerId ?? (f.scoreA > f.scoreB ? f.playerA.id : f.playerB.id);
          const win = (winId === f.playerA.id) ? f.playerA : f.playerB;
          const lose = (winId === f.playerA.id) ? f.playerB : f.playerA;
          if (f.bucket === 'top') { topWinner = win; topLoser = lose; }
          else { lowWinner = win; lowLoser = lose; }
        }

        const finalFight = {
          id: 1, phase: 'finale', groupName: 'Turnierfinale', localId: 1,
          playerA: topWinner, playerB: lowWinner,
          scoreA: 0, scoreB: 0, bestOf: 3, finished: false, timestamp: null, winnerId: null,
        };
        const bronzeFight = {
          id: 2, phase: 'finale', groupName: 'Turnierfinale', localId: 2,
          playerA: topLoser, playerB: lowLoser,
          scoreA: 0, scoreB: 0, bestOf: 3, finished: false, timestamp: null, winnerId: null,
        };

        daten.kämpfe = [finalFight, bronzeFight];

        const members = [];
        const seen = new Set();
        for (const f of daten.kämpfe) [f.playerA, f.playerB].forEach(p => { if (p && !seen.has(p.id)) { seen.add(p.id); members.push(p); } });
        daten.groups = [{ name: 'Turnierfinale', displayName: 'Turnierfinale', members, matches: daten.kämpfe }];

        daten.status = 'finale';
        await speichereTurnier(daten);
        const { embeds, components } = buildPagedGroupReply(daten, 1, 10);
        return interaction.reply({ content: `🏁 Finale & 🥉-Match erstellt.`, embeds, components });
      }


      // FINALE → Abschluss (+ HoF)
      if (daten.status === 'finale') {
        const unfinished = (daten.kämpfe || []).filter((f) => f.phase === 'finale' && !f.finished);
        if (unfinished.length > 0) return interaction.reply({ content: '⚠️ Finale/Bronze nicht beendet.', flags: MessageFlags.Ephemeral });

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

        return interaction.reply({ content: '🏆 Turnier abgeschlossen!', embeds: [embed] });
      }

      return interaction.reply({ content: '⚠️ Unbekannter Status.', flags: MessageFlags.Ephemeral });

    } catch (err) {
      console.error('[turnier_advance] error:', err);
      return interaction.reply({ content: `❌ Fehler: ${err.message}`, flags: MessageFlags.Ephemeral });
    }
  }
};