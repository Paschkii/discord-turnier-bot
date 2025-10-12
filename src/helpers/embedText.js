function chunkIntoEmbedFields(lines, firstFieldName, inline = false) {
  const out = [];
  let buffer = '';
  let name = firstFieldName;
  for (const line of lines) {
    const candidate = buffer ? buffer + '\n' + line : line;
    if (candidate.length > 1024) { // Discord-Limit pro Field.value
      if (buffer) out.push({ name, value: buffer, inline });
      buffer = line;
      name = '\u200b'; // folgende Blöcke ohne sichtbaren Titel
    } else {
      buffer = candidate;
    }
  }
  if (buffer) out.push({ name, value: buffer, inline });
  return out;
}

module.exports = { chunkIntoEmbedFields };