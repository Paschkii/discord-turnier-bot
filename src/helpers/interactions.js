async function sendFallbackMessage(interaction, options = {}) {
  const channel = interaction?.channel;
  if (!channel || typeof channel.send !== 'function') {
    return;
  }

  const fallbackContent = options.fallbackContent
    || '⚠️ Ich war zu langsam beim Antworten. Bitte versuche den Befehl erneut.';

  const mention = interaction?.user?.id ? `<@${interaction.user.id}>` : '';
  const content = mention ? `${mention} ${fallbackContent}` : fallbackContent;

  try {
    await channel.send({
      content,
      allowedMentions: mention ? { users: [interaction.user.id] } : undefined,
    });
  } catch (sendError) {
    console.warn('[slash] fallback channel send failed:', sendError);
  }
}

async function safeDeferReply(interaction, options = {}) {
  const { fallbackContent, ...deferOptions } = options || {};
  try {
    if (!interaction.deferred && !interaction.replied) {
      await interaction.deferReply(deferOptions);
    }
    return true;
  } catch (error) {
    console.warn('[slash] deferReply failed (likely cold start):', error);
    
    const errorCode = error?.code ?? error?.rawError?.code;
    if (errorCode === 10062 || errorCode === 40060) {
      await sendFallbackMessage(interaction, { fallbackContent });
    }

    return false;
  }
}

module.exports = {
  safeDeferReply,
};