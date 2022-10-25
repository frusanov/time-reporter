export function round(value: number, step = 1) {
  const inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}