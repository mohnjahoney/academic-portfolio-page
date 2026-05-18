import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { inflateSync } from 'node:zlib';

const root = new URL('..', import.meta.url).pathname;
const imageRoot = join(root, 'assets/images-from-pdfs');
const padding = 24;
const whiteThreshold = 246;
const writeChanges = process.argv.includes('--force-auto');
const skipAutoBackup = process.argv.includes('--no-auto-backup');
const legacyForce = process.argv.includes('--force');
const backupStamp = new Date().toISOString().replace(/[:.]/g, '-');

if (legacyForce) {
  console.error('Use --force-auto instead of --force. Trimming only writes to auto/ fallbacks.');
  process.exit(1);
}

const readChunks = (buffer) => {
  const chunks = [];
  let offset = 8;

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    chunks.push({ type, data });
    offset += 12 + length;
  }

  return chunks;
};

const bytesPerPixelFor = (colorType) => {
  if (colorType === 0) return 1;
  if (colorType === 2) return 3;
  if (colorType === 4) return 2;
  if (colorType === 6) return 4;
  return null;
};

const paeth = (a, b, c) => {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);

  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
};

const decodePng = (path) => {
  const buffer = readFileSync(path);
  const chunks = readChunks(buffer);
  const ihdr = chunks.find((chunk) => chunk.type === 'IHDR')?.data;

  if (!ihdr) return null;

  const width = ihdr.readUInt32BE(0);
  const height = ihdr.readUInt32BE(4);
  const bitDepth = ihdr[8];
  const colorType = ihdr[9];
  const interlace = ihdr[12];
  const bytesPerPixel = bytesPerPixelFor(colorType);

  if (bitDepth !== 8 || interlace !== 0 || !bytesPerPixel) {
    return null;
  }

  const compressed = Buffer.concat(
    chunks.filter((chunk) => chunk.type === 'IDAT').map((chunk) => chunk.data)
  );
  const data = inflateSync(compressed);
  const stride = width * bytesPerPixel;
  const pixels = Buffer.alloc(stride * height);
  let sourceOffset = 0;

  for (let y = 0; y < height; y += 1) {
    const filter = data[sourceOffset];
    sourceOffset += 1;
    const rowStart = y * stride;
    const previousRowStart = rowStart - stride;

    for (let x = 0; x < stride; x += 1) {
      const raw = data[sourceOffset + x];
      const left = x >= bytesPerPixel ? pixels[rowStart + x - bytesPerPixel] : 0;
      const up = y > 0 ? pixels[previousRowStart + x] : 0;
      const upLeft =
        y > 0 && x >= bytesPerPixel
          ? pixels[previousRowStart + x - bytesPerPixel]
          : 0;

      let value = raw;
      if (filter === 1) value = raw + left;
      if (filter === 2) value = raw + up;
      if (filter === 3) value = raw + Math.floor((left + up) / 2);
      if (filter === 4) value = raw + paeth(left, up, upLeft);
      pixels[rowStart + x] = value & 0xff;
    }

    sourceOffset += stride;
  }

  return { width, height, colorType, bytesPerPixel, pixels };
};

const isInk = (image, x, y) => {
  const offset = (y * image.width + x) * image.bytesPerPixel;

  if (image.colorType === 0) {
    return image.pixels[offset] < whiteThreshold;
  }

  const r = image.pixels[offset];
  const g = image.pixels[offset + 1];
  const b = image.pixels[offset + 2];
  const alpha =
    image.colorType === 6
      ? image.pixels[offset + 3]
      : image.colorType === 4
        ? image.pixels[offset + 1]
        : 255;

  return alpha > 8 && (r < whiteThreshold || g < whiteThreshold || b < whiteThreshold);
};

const trimBoxFor = (path) => {
  const image = decodePng(path);
  if (!image) return null;

  let minX = image.width;
  let minY = image.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      if (!isInk(image, x, y)) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX < minX || maxY < minY) return null;

  minX = Math.max(0, minX - padding);
  minY = Math.max(0, minY - padding);
  maxX = Math.min(image.width - 1, maxX + padding);
  maxY = Math.min(image.height - 1, maxY + padding);

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;

  if (width >= image.width * 0.98 && height >= image.height * 0.98) return null;

  return { x: minX, y: minY, width, height, originalWidth: image.width, originalHeight: image.height };
};

const run = (command, args) =>
  execFileSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  });

const backupFigure = (path) => {
  if (!writeChanges || skipAutoBackup) return;

  const paperDir = dirname(dirname(path));
  const backupDir = join(paperDir, 'auto-backups', `trim-${backupStamp}`);

  mkdirSync(backupDir, { recursive: true });
  cpSync(path, join(backupDir, basename(path)));
};

const figurePaths = readdirSync(imageRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((directory) => {
    const autoDir = join(imageRoot, directory.name, 'auto');
    if (!existsSync(autoDir)) return [];

    return readdirSync(autoDir)
      .filter((file) => /^figure-\d+\.png$/.test(file))
      .map((file) => join(autoDir, file));
  });

let trimmed = 0;

for (const path of figurePaths) {
  const box = trimBoxFor(path);
  if (!box) continue;

  if (!writeChanges) {
    trimmed += 1;
    continue;
  }

  backupFigure(path);

  run('sips', [
    '--cropToHeightWidth',
    String(box.height),
    String(box.width),
    '--cropOffset',
    String(box.y),
    String(box.x),
    path,
    '--out',
    path
  ]);

  trimmed += 1;
}

if (!writeChanges) {
  console.log(`would trim ${trimmed} auto figure image(s); rerun with --force-auto to write changes`);
} else {
  console.log(`trimmed ${trimmed} auto figure image(s)`);
}
