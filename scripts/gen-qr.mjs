/**
 * Genera los QR que se ven en las tarjetas del porta reseñas.
 *
 *   node scripts/gen-qr.mjs
 *
 * QR Code modelo 2, modo byte, corrección de errores L, versiones 2 a 4.
 * Implementación propia (sin dependencias, ~250 líneas) siguiendo la ISO/IEC 18004:
 * Reed-Solomon sobre GF(2^8), zigzag de datos, enmascarado y formato BCH.
 *
 * Los payloads de abajo son los de la demo: si un cliente cambia de destino
 * (su ficha de Google, otro WhatsApp, otro Instagram), se edita acá y se vuelve a correr.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "assets", "img", "qr");

/* Destinos de cada tarjeta. Cambiar acá y volver a correr el script. */
const TARGETS = [
  { file: "barberfort.svg", url: "https://barberfort.com.ar" },
  { file: "automatizahoy.svg", url: "https://automatizahoy.com.ar" },
  { file: "whatsapp.svg", url: "https://wa.me/5491160186481" },
  { file: "instagram.svg", url: "https://www.instagram.com/automatizahoy.ar/" },
];

/* ===================== 1. Aritmética de GF(2^8) ========================= */
/* Polinomio primitivo x^8 + x^4 + x^3 + x^2 + 1 (0x11D), generador 0x02. */
function mul(x, y) {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >> 7) * 0x11d);
    z ^= ((y >> i) & 1) * x;
  }
  return z;
}

/* ===================== 2. Tablas (nivel L, versiones 1-4) =============== */
const ECC_PER_BLOCK = [0, 7, 10, 15, 20]; // versión -> codewords de corrección
const BLOCKS = [0, 1, 1, 1, 1]; // versión -> cantidad de bloques
const FORMAT_ECL = 1; // L = 0b01

const rawDataModules = (ver) => {
  let n = (16 * ver + 128) * ver + 64;
  if (ver >= 2) {
    const align = Math.floor(ver / 7) + 2;
    n -= (25 * align - 10) * align - 55;
  }
  return n;
};

const dataCodewords = (ver) =>
  Math.floor(rawDataModules(ver) / 8) - ECC_PER_BLOCK[ver] * BLOCKS[ver];

/* ===================== 3. Reed-Solomon ================================== */
/* Coeficientes del polinomio generador, de mayor a menor, sin el término x^degree. */
function rsDivisor(degree) {
  const result = new Uint8Array(degree);
  result[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      result[j] = mul(result[j], root);
      if (j + 1 < degree) result[j] ^= result[j + 1];
    }
    root = mul(root, 0x02);
  }
  return result;
}

function rsRemainder(data, divisor) {
  const result = new Uint8Array(divisor.length);
  for (const byte of data) {
    const factor = byte ^ result[0];
    result.copyWithin(0, 1);
    result[result.length - 1] = 0;
    for (let i = 0; i < divisor.length; i++) result[i] ^= mul(divisor[i], factor);
  }
  return result;
}

/* ===================== 4. Codewords (byte mode) ========================= */
function buildCodewords(text, ver) {
  const bytes = Buffer.from(text, "utf8");
  const capacity = dataCodewords(ver);
  const bits = [];
  const push = (val, len) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };

  push(0b0100, 4); // modo byte
  push(bytes.length, 8); // contador de caracteres (versiones 1-9)
  for (const b of bytes) push(b, 8);

  const capBits = capacity * 8;
  if (bits.length > capBits) throw new Error(`"${text}" no entra en la versión ${ver}`);

  for (let i = 0; i < 4 && bits.length < capBits; i++) bits.push(0); // terminador
  while (bits.length % 8 !== 0) bits.push(0);

  const data = [];
  for (let i = 0; i < bits.length; i += 8) {
    let v = 0;
    for (let j = 0; j < 8; j++) v = (v << 1) | bits[i + j];
    data.push(v);
  }
  const pad = [0xec, 0x11];
  for (let i = 0; data.length < capacity; i++) data.push(pad[i % 2]);

  return { data, all: [...data, ...rsRemainder(data, rsDivisor(ECC_PER_BLOCK[ver]))] };
}

/* ===================== 5. Matriz ======================================== */
const ALIGN = (ver) => {
  if (ver === 1) return [];
  const size = ver * 4 + 17;
  const numalign = Math.floor(ver / 7) + 2;
  const step = Math.floor((ver * 8 + numalign * 3 + 5) / (numalign * 4 - 4)) * 2;
  const out = [];
  for (let i = 0; i < numalign - 1; i++) out.push(size - 7 - i * step);
  out.push(6);
  return out.reverse();
};

const MASKS = [
  (x, y) => (x + y) % 2,
  (x, y) => y % 2,
  (x, y) => x % 3,
  (x, y) => (x + y) % 3,
  (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2,
  (x, y) => ((x * y) % 2) + ((x * y) % 3),
  (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2,
  (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2,
];

function buildMatrix(ver, codewords, mask) {
  const size = ver * 4 + 17;
  const m = Array.from({ length: size }, () => new Array(size).fill(false));
  const fn = Array.from({ length: size }, () => new Array(size).fill(false));
  const setFn = (x, y, dark) => {
    m[y][x] = dark;
    fn[y][x] = true;
  };

  // Patrones de sincronización (fila y columna 6)
  for (let i = 0; i < size; i++) {
    setFn(6, i, i % 2 === 0);
    setFn(i, 6, i % 2 === 0);
  }

  // Localizadores + separadores (centro de cada uno)
  const finder = (cx, cy) => {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx;
        const y = cy + dy;
        if (x < 0 || y < 0 || x >= size || y >= size) continue;
        const ring = Math.max(Math.abs(dx), Math.abs(dy));
        setFn(x, y, ring !== 2 && ring !== 4);
      }
    }
  };
  finder(3, 3);
  finder(size - 4, 3);
  finder(3, size - 4);

  // Patrones de alineación
  const pos = ALIGN(ver);
  const last = pos.length - 1;
  for (let i = 0; i < pos.length; i++) {
    for (let j = 0; j < pos.length; j++) {
      if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) continue;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          setFn(pos[i] + dx, pos[j] + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
        }
      }
    }
  }

  // Enmascarado + formato (dos copias con BCH)
  const applyMask = (id) => {
    const f = MASKS[id];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (!fn[y][x] && f(x, y) === 0) m[y][x] = !m[y][x];
      }
    }
  };

  const drawFormat = (id) => {
    const data = (FORMAT_ECL << 3) | id;
    let rem = data;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >> 9) * 0x537);
    const bitsXor = ((data << 10) | rem) ^ 0x5412;
    const bitAt = (i) => ((bitsXor >> i) & 1) !== 0;

    for (let i = 0; i <= 5; i++) setFn(8, i, bitAt(i));
    setFn(8, 7, bitAt(6));
    setFn(8, 8, bitAt(7));
    setFn(7, 8, bitAt(8));
    for (let i = 9; i < 15; i++) setFn(14 - i, 8, bitAt(i));

    for (let i = 0; i < 8; i++) setFn(size - 1 - i, 8, bitAt(i));
    for (let i = 8; i < 15; i++) setFn(8, size - 15 + i, bitAt(i));
    setFn(8, size - 8, true); // módulo oscuro, siempre
  };

  // Reserva los módulos de formato antes de ubicar los datos (si no, se pisan)
  drawFormat(0);

  // Datos: zigzag de dos columnas, de abajo hacia arriba y viceversa
  let bit = 0;
  const total = codewords.length * 8;
  for (let col = size - 1; col > 0; col -= 2) {
    const right = col <= 6 ? col - 1 : col;
    const upward = ((right + 1) & 2) === 0;
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        const y = upward ? size - 1 - vert : vert;
        if (!fn[y][x] && bit < total) {
          m[y][x] = ((codewords[bit >> 3] >> (7 - (bit & 7))) & 1) !== 0;
          bit++;
        }
      }
    }
  }
  if (bit !== total) throw new Error(`faltan módulos: ${bit}/${total}`);

  applyMask(mask);
  drawFormat(mask);

  return { size, modules: m };
}

/* ===================== 6. Elección de versión y máscara ================= */
function penalty(modules, size) {
  let score = 0;
  // N1: rachas de 5 o más del mismo color + N2: bloques de 2x2
  for (let y = 0; y < size; y++) {
    let run = 1;
    for (let x = 1; x < size; x++) {
      if (modules[y][x] === modules[y][x - 1]) {
        run++;
      } else {
        if (run >= 5) score += 3 + (run - 5);
        run = 1;
      }
    }
    if (run >= 5) score += 3 + (run - 5);
  }
  for (let x = 0; x < size; x++) {
    let run = 1;
    for (let y = 1; y < size; y++) {
      if (modules[y][x] === modules[y - 1][x]) {
        run++;
      } else {
        if (run >= 5) score += 3 + (run - 5);
        run = 1;
      }
    }
    if (run >= 5) score += 3 + (run - 5);
  }
  for (let y = 0; y < size - 1; y++) {
    for (let x = 0; x < size - 1; x++) {
      const c = modules[y][x];
      if (c === modules[y][x + 1] && c === modules[y + 1][x] && c === modules[y + 1][x + 1]) {
        score += 3;
      }
    }
  }
  // N4: proporción de módulos oscuros
  let dark = 0;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (modules[y][x]) dark++;
  const total = size * size;
  const k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
  return score + Math.max(0, k) * 10;
}

export function encode(text, opts = {}) {
  const bytes = Buffer.from(text, "utf8").length;
  let ver = 0;
  for (let v = 1; v <= 4; v++) {
    // 4 bits de modo + 8 de contador + los bytes + 4 de terminador
    if (bytes * 8 + 12 + 4 <= dataCodewords(v) * 8) {
      ver = v;
      break;
    }
  }
  if (!ver) throw new Error(`"${text}" es muy largo para este generador`);

  const { all } = buildCodewords(text, ver);

  if (opts.mask != null) return { ...buildMatrix(ver, all, opts.mask), mask: opts.mask, ver };

  let best = null;
  for (let mask = 0; mask < 8; mask++) {
    const qr = buildMatrix(ver, all, mask);
    const score = penalty(qr.modules, qr.size);
    if (!best || score < best.score) best = { ...qr, mask, score };
  }
  return { ...best, ver };
}

/* ===================== 7. Salida SVG =================================== */
/* Zona de silencio de 4 módulos: sin ella el QR pierde legibilidad cuando lo
   imprime el cliente o cuando queda pegado al borde de la tarjeta. */
const QUIET = 4;

function toSvg({ size, modules }) {
  let d = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (modules[y][x]) d += `M${x},${y}h1v1h-1z`;
    }
  }
  const box = size + QUIET * 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-QUIET} ${-QUIET} ${box} ${box}" ` +
    `shape-rendering="crispEdges" aria-hidden="true" focusable="false">` +
    `<path fill="#0B0D10" d="${d}"/></svg>\n`
  );
}

/* ===================== 8. CLI ========================================== */
const isMain =
  process.argv[1] && process.argv[1].replace(/\\/g, "/").endsWith("scripts/gen-qr.mjs");

if (isMain) {
  mkdirSync(OUT_DIR, { recursive: true });
  for (const { file, url } of TARGETS) {
    const qr = encode(url);
    const svg = toSvg(qr);
    writeFileSync(join(OUT_DIR, file), svg, "utf8");
    console.log(
      `  ${file.padEnd(20)} ${qr.size}×${qr.size}  máscara ${qr.mask}  ${Buffer.byteLength(svg)} B  → ${url}`,
    );
  }
  console.log(`\n${TARGETS.length} QR generados en assets/img/qr/`);
}
