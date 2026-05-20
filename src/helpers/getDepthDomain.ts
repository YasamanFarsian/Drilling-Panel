const minPadding = 250;

export const getDepthDomain = {
  out: (max: number) => [0, max] as [number, number],
  in: (max: number, center: number) => {
    const roundedCenter = roundToNearestHundred(center);
    const maxPadding = max / 4;

    return [Math.max(0, roundedCenter - minPadding), Math.min(roundedCenter + maxPadding, max)] as [
      number,
      number,
    ];
  },
} as const;

function roundToNearestHundred(value: number): number {
  return Math.round(value / 100) * 100;
}
