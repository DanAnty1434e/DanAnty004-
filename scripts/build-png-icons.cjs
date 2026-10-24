const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Minimal PNG generator for solid/gradient/badge icons
function createPNG(width, height, pixelFn) {
  // RGBA buffer with filter byte 0 per scanline
  const rowSize = width * 4 + 1;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  // Helper to calculate CRC32
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c >>> 0;
  }

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);

    const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(typeAndData), 0);

    return Buffer.concat([len, typeAndData, crc]);
  }

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 6; // RGBA color
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Badge drawing function
function badgePixel(x, y, w, h, isMaskable = false) {
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Background gradient: Emerald green (#064e3b -> #022c22)
  const normY = y / h;
  let r = Math.round(6 + (2 - 6) * normY);
  let g = Math.round(78 + (44 - 78) * normY);
  let b = Math.round(59 + (34 - 59) * normY);
  let a = 255;

  if (!isMaskable) {
    // Rounded squircle corner mask for standard icon
    const radius = w * 0.22;
    const qx = Math.max(0, Math.abs(dx) - (w / 2 - radius));
    const qy = Math.max(0, Math.abs(dy) - (h / 2 - radius));
    const cornerDist = Math.sqrt(qx * qx + qy * qy);
    if (cornerDist > radius) {
      return [0, 0, 0, 0];
    }
  }

  // Golden Outer Rim (radius ~ 42% of width)
  const rimRadius = w * 0.40;
  if (Math.abs(dist - rimRadius) < w * 0.02) {
    // Gold gradient
    return [245, 158, 11, 255]; // #f59e0b
  }

  // Inner circular emblem fill (radius ~ 36% of width)
  const innerRadius = w * 0.36;
  if (dist < innerRadius) {
    // Dark emerald medallion core (#03261e)
    r = 3;
    g = 38;
    b = 30;

    // Gold inner dashed/dotted ring
    const ringDist = Math.abs(dist - w * 0.33);
    if (ringDist < w * 0.008) {
      const angle = Math.atan2(dy, dx);
      if (Math.sin(angle * 16) > 0) {
        return [254, 240, 138, 255]; // Gold dots
      }
    }

    // Top gold star emblem
    const starDy = dy + innerRadius * 0.55;
    const starDist = Math.sqrt(dx * dx + starDy * starDy);
    if (starDist < w * 0.05) {
      return [251, 191, 36, 255];
    }

    // Central Open Quran Book silhouette
    const bookY = dy - innerRadius * 0.08;
    if (Math.abs(bookY) < w * 0.12 && Math.abs(dx) < w * 0.22) {
      // White/Parchment book pages
      if (Math.abs(dx) > w * 0.012) {
        return [248, 250, 252, 255]; // Pure crisp book page
      } else {
        return [217, 119, 6, 255]; // Amber spine
      }
    }

    // Golden Ribbon Banner across lower half
    const bannerY = dy - innerRadius * 0.45;
    if (Math.abs(bannerY) < w * 0.09 && Math.abs(dx) < w * 0.34) {
      // Golden Ribbon
      return [245, 158, 11, 255];
    }
  }

  return [r, g, b, a];
}

const publicDir = path.join(__dirname, '..', 'public');

console.log('Generating PWA icons with Dan anty004 badge...');

// 192x192
const icon192 = createPNG(192, 192, (x, y, w, h) => badgePixel(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), icon192);

// 512x512 standard
const icon512 = createPNG(512, 512, (x, y, w, h) => badgePixel(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), icon512);

// 512x512 maskable (safe-zone full bleed)
const iconMaskable = createPNG(512, 512, (x, y, w, h) => badgePixel(x, y, w, h, true));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), iconMaskable);

// Apple touch icon 180x180 (no alpha corners for iOS)
const iconApple = createPNG(180, 180, (x, y, w, h) => badgePixel(x, y, w, h, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), iconApple);

console.log('All Dan anty004 icons generated successfully!');
