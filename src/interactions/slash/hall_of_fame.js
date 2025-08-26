const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
} = require('discord.js');
const { listFinishedTournaments } = require('../../store/turniere');
const { formatMK } = require('../../utils');

module.exports = {
  async execute(interaction) {
    const rows = await listFinishedTournaments();
    if (!rows.length) return interaction.reply({ content: '📭 Noch keine abgeschlossenen Turniere.', flags: MessageFlags.Ephemeral });

    const entries = rows.map(r => {
      const name = r.name || 'Turnier';
      const modus = (r.daten?.modus) || '1v1';
      const podium = r.daten?.podium || null;
      const prize  = r.daten?.prize  || null;
      const first = podium?.first?.name || '—';
      const second = podium?.second?.name || '—';
      const third = podium?.third?.name || '—';
      const potLine = prize ? `\n💰 Pott: ${prize.text?.total ?? formatMK(prize.totalMK)} · 🥇 ${prize.text?.first ?? formatMK(prize.firstMK)} · 🥈 ${prize.text?.second ?? formatMK(prize.secondMK)} · 🥉 ${prize.text?.third ?? formatMK(prize.thirdMK)}` : '';
      return { name, modus, first, second, third, potLine };
    });

    const perPage = 5;
    const pages = Math.ceil(entries.length / perPage);
    const makeEmbed = (pageIdx) => {
      const start = pageIdx * perPage;
      const slice = entries.slice(start, start + perPage);
      const desc = slice
        .map(e => `**${e.name}**\nModus: \`${e.modus}\`\n🥇 ${e.first}\n🥈 ${e.second}\n🥉 ${e.third}${e.potLine || ''}`)
        .join('\n\n');
      return new EmbedBuilder().setColor(0xffd700).setTitle('🏆 Hall of Fame').setDescription(desc).setFooter({ text: `Seite ${pageIdx+1}/${pages}` });
    };

    const firstPage = makeEmbed(0);
    const components = [];
    if (pages > 1) {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`pg_hof_prev_1_${pages}`).setLabel('◀️').setStyle(ButtonStyle.Secondary).setDisabled(true),
        new ButtonBuilder().setCustomId(`pg_hof_next_1_${pages}`).setLabel('▶️').setStyle(ButtonStyle.Secondary).setDisabled(false)
      );
      components.push(row);
    }
    return interaction.reply({ embeds: [firstPage], components });
  }
};