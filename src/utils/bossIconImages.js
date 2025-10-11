const { createCanvas, loadImage } = require('canvas');

function sanitizeSources(sources) {
  return sources
    .map((source, index) => ({
      source: typeof source === 'string' ? source.trim() : '',
      index,
    }))
    .filter(({ source }) => Boolean(source));
}

async function loadImages(entries) {
  const results = [];
  for (const entry of entries) {
    try {
      const image = await loadImage(entry.source);
      if (image) {
        results.push({ ...entry, image });
      }
    } catch (error) {
      console.warn('[bossIconImages] Failed to load image:', entry.source, error);
    }
  }
  return results.sort((a, b) => a.index - b.index);
}

function drawImageWithinBounds(ctx, image, size, x, y) {
  const targetWidth = size;
  const targetHeight = size;

  const widthRatio = targetWidth / image.width;
  const heightRatio = targetHeight / image.height;
  const ratio = Math.min(widthRatio, heightRatio, 1);

  const drawWidth = image.width * ratio;
  const drawHeight = image.height * ratio;
  const offsetX = x + (targetWidth - drawWidth) / 2;
  const offsetY = y + (targetHeight - drawHeight) / 2;

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

async function createStackedBossIconImage(sources, options = {}) {
  const { size = 160, offsetXFactor = 0.35, offsetYFactor = 0.25 } = options;
  const sanitized = sanitizeSources(sources);
  if (sanitized.length < 2) return null;

  const loaded = await loadImages(sanitized);
  if (loaded.length < 2) return null;

  const offsetX = Math.max(8, Math.round(size * offsetXFactor));
  const offsetY = Math.max(8, Math.round(size * offsetYFactor));

  const width = size + offsetX * (loaded.length - 1);
  const height = size + Math.ceil((loaded.length - 1) / 2) * offsetY;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const center = (loaded.length - 1) / 2;
  const placements = loaded.map((entry, index) => {
    const x = offsetX * index;
    const y = Math.abs(index - center) * offsetY;
    return { ...entry, x, y, order: y + index * 0.01 };
  });

  placements.sort((a, b) => a.order - b.order);

  for (const placement of placements) {
    drawImageWithinBounds(ctx, placement.image, size, placement.x, placement.y);
  }

  return {
    buffer: canvas.toBuffer('image/png'),
    fileName: 'boss-icons-stacked.png',
  };
}

async function createColumnBossIconImage(sources, options = {}) {
  const { size = 128, gapFactor = 0.1 } = options;
  const sanitized = sanitizeSources(sources);
  if (!sanitized.length) return null;

  const loaded = await loadImages(sanitized);
  if (!loaded.length) return null;

  const gap = Math.max(4, Math.round(size * gapFactor));
  const width = size;
  const height = loaded.length * size + (loaded.length - 1) * gap;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  loaded.forEach((entry, index) => {
    const y = index * (size + gap);
    drawImageWithinBounds(ctx, entry.image, size, 0, y);
  });

  return {
    buffer: canvas.toBuffer('image/png'),
    fileName: 'boss-icons-column.png',
  };
}

module.exports = {
  createColumnBossIconImage,
  createStackedBossIconImage,
};