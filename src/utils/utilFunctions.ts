/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

export function create2DArray(): number[][] {
  const rows = 9;
  const cols = 9;
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

export function copyGrid(from: any, to: any) {
  for (let i = 0; i < from.length; i++) {
    to[i] = [...from[i]];
  }
}
