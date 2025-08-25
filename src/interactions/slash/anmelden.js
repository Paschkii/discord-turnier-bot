const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { KLASSE_LISTE } = require('../../config/constants');
const { ladeTurnier } = require('../../store/turniere');

module.exports = {
  async execute(interaction) {
    const cur = await ladeTurnier();
    if (!cur) return interaction.reply({ content: '❌ Kein aktives Turnier gefunden.', ephemeral: true });
    if (cur.status !== 'offen') return interaction.reply({ content: '❌ Keine Anmeldung möglich.', ephemeral: true });
    if (cur.teilnehmer && cur.teilnehmer[interaction.user.id]) {
      return interaction.reply({ content: '⚠️ Du bist bereits angemeldet.', ephemeral: true });
    }
    const select = new StringSelectMenuBuilder()
      .setCustomId(`klasse_auswahl_${interaction.user.id}`)
      .setPlaceholder('Wähle deine Klasse...')
      .addOptions(KLASSE_LISTE.slice(0, 25).map((k) => ({ label: k.name, value: k.name, emoji: k.emoji })));
    const row = new ActionRowBuilder().addComponents(select);
    return interaction.reply({ content: 'Bitte wähle deine Klasse:', components: [row], ephemeral: true });
  }
};