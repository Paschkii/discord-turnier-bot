const { arenaData } = require('../../config/constants');

module.exports = {
  async execute(interaction) {
    const instanz = Math.random() < 0.5 ? 'A' : 'B';
    const keys = Object.keys(arenaData);
    const kategorie = keys[Math.floor(Math.random() * keys.length)];
    const arena = arenaData[kategorie][Math.floor(Math.random() * arenaData[kategorie].length)];
    return interaction.reply({ content: `🎲 **Instanz**: ${instanz} | **Kategorie**: ${kategorie} | **Arena**: ${arena}`, ephemeral: false });
  }
};
