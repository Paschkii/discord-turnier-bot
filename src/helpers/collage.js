const { AttachmentBuilder } = require('discord.js');
const sharp = require('sharp');

async function bossCollageAttachment(
  imageUrls,
  opts = {}
) {
  const size = opts.size ?? 512;
  const maxCols = opts.maxCols ?? 3;
  const format = opts.format ?? 'png';
  const quality = opts.quality ?? 90;

  const buffers = [];
  for (const url of imageUrls) {
    try {
      const buf = await fetchBuffer(url, 10000);
      buffers.push(buf);
    } catch (error) {
      console.warn('[collage] fetch failed:', url, error);
    }
  }

  if (buffers.length === 0) {
    throw new Error('Keine Boss-Bilder ladbar.');
  }

  const n = buffers.length;
  const cols = Math.min(maxCols, Math.ceil(Math.sqrt(n)));
  const rows = Math.ceil(n / cols);
  const tile = Math.floor(size / cols);

  const tiles = await Promise.all(
    buffers.map((buffer) =>
      sharp(buffer)
        .resize(tile, tile, { fit: 'cover', position: 'center', withoutEnlargement: true })
        .toBuffer()
    )
  );

  const composites = [];
  for (let i = 0; i < tiles.length; i += 1) {
    const x = (i % cols) * tile;
    const y = Math.floor(i / cols) * tile;
    composites.push({ input: tiles[i], left: x, top: y });
  }

  let img = sharp({
    create: {
      width: tile * cols,
      height: tile * rows,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite(composites);

  const fileName = `bosses.${format}`;
  const buffer =
    format === 'png'
      ? await img.png().toBuffer()
      : await img.webp({ quality, effort: 4 }).toBuffer();

  return new AttachmentBuilder(buffer, { name: fileName });
}

async function fetchBuffer(url, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } finally {
    clearTimeout(timeoutId);
  }
}

module.exports = { bossCollageAttachment, fetchBuffer };