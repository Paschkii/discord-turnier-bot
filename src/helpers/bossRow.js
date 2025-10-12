const { AttachmentBuilder } = require('discord.js');
const sharp = require('sharp');
const { fetchBuffer } = require('./collage');

async function bossRowAttachment(imageUrls, opts = {}) {
  const tile = opts.tile ?? 48;
  const gap = opts.gap ?? 6;
  const maxPerRow = opts.maxPerRow ?? 8;
  const format = opts.format ?? 'png';
  const quality = opts.quality ?? 90;

  const buffers = [];
  for (const url of imageUrls) {
    try {
      const buffer = await fetchBuffer(url, 10000);
      buffers.push(buffer);
    } catch (error) {
      console.warn('[bossRow] fetch failed:', url, error);
    }
  }

  if (buffers.length === 0) {
    throw new Error('Keine Boss-Bilder ladbar.');
  }

  const tiles = await Promise.all(
    buffers.map((buffer) =>
      sharp(buffer)
        .resize(tile, tile, { fit: 'cover', position: 'center', withoutEnlargement: true })
        .toBuffer()
    )
  );

  const rows = [];
  for (let i = 0; i < tiles.length; i += maxPerRow) {
    rows.push(tiles.slice(i, i + maxPerRow));
  }

  const rowWidth = (rowLength) => rowLength * tile + Math.max(0, rowLength - 1) * gap;
  const width = Math.max(...rows.map((row) => rowWidth(row.length)));
  const height = rows.length * tile + Math.max(0, rows.length - 1) * gap;

  const layers = [];
  rows.forEach((row, rowIndex) => {
    const top = rowIndex * (tile + gap);
    const widthForRow = rowWidth(row.length);
    const leftStart = Math.floor((width - widthForRow) / 2);
    row.forEach((image, imageIndex) => {
      layers.push({ input: image, left: leftStart + imageIndex * (tile + gap), top });
    });
  });

  let image = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite(layers);

  const fileName = `boss_row.${format}`;
  const buffer =
    format === 'png'
      ? await image.png().toBuffer()
      : await image.webp({ quality, effort: 4 }).toBuffer();

  return new AttachmentBuilder(buffer, { name: fileName });
}

module.exports = { bossRowAttachment };