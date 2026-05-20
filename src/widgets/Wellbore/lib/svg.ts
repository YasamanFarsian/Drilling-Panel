// SVG specific methods
// Andrei Svetlichnyi 2021.08

// convert coordinate array to svg path.d with lines
export function pathLines(points: [x: number, y: number][]): string {
  const precision = 10; // 10^n, n>=0; 1, 10, 100, etc.
  let x = 0;
  let y = 0;
  const dp = points.map((p) => {
    const d = [
      Math.round((p[0] - x + Number.EPSILON) * precision) / precision,
      Math.round((p[1] - y + Number.EPSILON) * precision) / precision,
    ];
    x += d[0];
    y += d[1];
    return d;
  });
  const pp = dp.map((o) => `${o[0]} ${o[1]}`);
  return `M ${pp[0]} l` + pp.slice(1).map((o) => ` ${o}`) + ' Z';
}
