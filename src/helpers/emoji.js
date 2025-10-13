function materializeGuildEmojiShortcodes(text, guild) {
  if (!text) {
    return text;
  }

  const cache = guild?.emojis?.cache;
  if (!cache?.size) {
    return text;
  }

  const byLowerCaseName = new Map();
  for (const emoji of cache.values()) {
    if (!emoji?.name) continue;
    byLowerCaseName.set(emoji.name.toLowerCase(), emoji.toString());
  }

  return text.replace(/:([a-z0-9_]+):/gi, (match, name) => {
    return byLowerCaseName.get(name.toLowerCase()) ?? match;
  });
}

module.exports = {
  materializeGuildEmojiShortcodes,
};