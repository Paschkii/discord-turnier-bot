// === Imports ===
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { listFinishedTournaments } = require('../../store/turniere');

// === Module-level Variables ===
// customId: pg_hof_prev_CURR_TOT / pg_hof_next_CURR_TOT
async function run(interaction) {
  const parts = interaction.customId.split('_'); // pg_hof_prev_CURR_TOT / next
  const dir   = parts[2];
  const curr  = parseInt(parts[3], 10) || 1;

  const guildId = interaction.guildId;
  if (!guildId) {
    return interaction.reply({ content: '❌ Aktion nur innerhalb eines Servers möglich.', ephemeral: true });
  }
  const rows = await listFinishedTournaments(guildId);
  const entries = rows.map(r => {
    const name = r.name || 'Turnier';
    const podium = r.daten?.podium || null;
    return {
      name,
      modus: (r.daten?.modus) || '1v1',
      first: podium?.first?.name || '—',
      second: podium?.second?.name || '—',
      third: podium?.third?.name || '—'
    };
  });

  const perPage = 5;
  const pages = Math.ceil(entries.length / perPage);
  const page = Math.min(Math.max(1, dir === 'prev' ? curr - 1 : curr + 1), pages);
  const start = (page - 1) * perPage;
  const slice = entries.slice(start, start + perPage);
  const desc = slice.map(e => `**${e.name}**\nModus: \`${e.modus}\`\n🥇 ${e.first}\n🥈 ${e.second}\n🥉 ${e.third}`).join('\n\n');
  const embed = new EmbedBuilder().setColor(0xffd700).setTitle('🏆 Hall of Fame').setDescription(desc).setFooter({ text: `Seite ${page}/${pages}` });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`pg_hof_prev_${page}_${pages}`).setLabel('◀️').setStyle(ButtonStyle.Secondary).setDisabled(page === 1),
    new ButtonBuilder().setCustomId(`pg_hof_next_${page}_${pages}`).setLabel('▶️').setStyle(ButtonStyle.Secondary).setDisabled(page === pages)
  );

  try { return interaction.update({ embeds: [embed], components: [row] }); }
  catch { return interaction.reply({ embeds: [embed], components: [row] }); }
}

// === Exports ===
module.exports = { run };