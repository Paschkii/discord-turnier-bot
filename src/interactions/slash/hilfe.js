const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { HELP_COMMANDS } = require('../../config/constants');

module.exports = {
  async execute(interaction) {
    const isAdmin = interaction.member?.permissions?.has(PermissionsBitField.Flags.Administrator);
    const userCmds  = HELP_COMMANDS.filter(c => !c.admin).sort((a,b)=>a.name.localeCompare(b.name));
    const adminCmds = isAdmin ? HELP_COMMANDS.filter(c => c.admin).sort((a,b)=>a.name.localeCompare(b.name)) : [];
    const fields = [
      ...userCmds.map(c => ({ name: `/${c.name}`, value: c.description })),
      ...(adminCmds.length ? adminCmds.map(c => ({ name: `/${c.name}`, value: c.description })) : []),
    ];
    const helpEmbed = new EmbedBuilder().setColor(0x00AEFF).setTitle('🤖 Befehlsübersicht')
      .setDescription(isAdmin ? 'Hier sind alle verfügbaren Slash-Befehle (inkl. Admin-Befehle unten):' : 'Hier sind alle verfügbaren Slash-Befehle:')
      .addFields(fields).setFooter({ text: 'Nemesis Turnierbot' }).setTimestamp();
    return interaction.reply({ embeds: [helpEmbed], ephemeral: true });
  }
};
