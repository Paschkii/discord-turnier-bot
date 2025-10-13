async function safeDeferReply(interaction, options = {}) {
  try {
    if (!interaction.deferred && !interaction.replied) {
      await interaction.deferReply(options);
    }
    return true;
  } catch (error) {
    console.warn('[slash] deferReply failed (likely cold start):', error);
    return false;
  }
}

module.exports = {
  safeDeferReply,
};