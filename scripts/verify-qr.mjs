/* Verificación temporal: compara la matriz propia con la de api.qrserver.com
   para el payload https://automatizahoy.com.ar (25x25, ECC L).
   Las filas de abajo salen del SVG de referencia (path con un M por módulo oscuro). */
import { encode } from "./gen-qr.mjs";

const REF = {
  0: [0, 1, 2, 3, 4, 5, 6, 9, 16, 18, 19, 20, 21, 22, 23, 24],
  6: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 19, 20, 21, 22, 23, 24],
  12: [5, 6, 7, 9, 12, 13, 14, 15, 16, 17, 18, 20, 22, 23, 24],
  13: [0, 7, 8, 10, 11, 13, 14, 16, 17, 19, 21, 23],
  17: [8, 9, 11, 12, 13, 15, 16, 20, 21],
  22: [0, 2, 3, 4, 6, 8, 9, 13, 16, 21, 22, 24],
  24: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 17, 19, 20, 21, 22, 23, 24],
};

const URL = "https://automatizahoy.com.ar";
let ok = false;

for (let mask = 0; mask < 8; mask++) {
  const qr = encode(URL, { mask });
  const diffs = [];
  for (const [row, cols] of Object.entries(REF)) {
    const y = Number(row);
    const expected = new Array(qr.size).fill(false);
    for (const c of cols) expected[c] = true;
    for (let x = 0; x < qr.size; x++) {
      if (qr.modules[y][x] !== expected[x]) diffs.push(`(${x},${y})`);
    }
  }
  if (diffs.length === 0) {
    console.log(`✔ máscara ${mask}: coincide con la referencia en ${Object.keys(REF).length} filas completas`);
    ok = true;
  } else {
    console.log(`✘ máscara ${mask}: ${diffs.length} diferencias  ${diffs.slice(0, 8).join(" ")}`);
  }
}

console.log(ok ? "\nRESULTADO: matriz validada contra un generador externo." : "\nRESULTADO: NO coincide.");
process.exitCode = ok ? 0 : 1;
