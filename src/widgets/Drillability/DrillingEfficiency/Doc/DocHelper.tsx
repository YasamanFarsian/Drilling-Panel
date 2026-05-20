export function calculateStartAngle(value: number, minValue: number, maxValue: number) {
  const normalizedValue = (value - minValue) / (maxValue - minValue);
  return normalizedValue * 180;
}
