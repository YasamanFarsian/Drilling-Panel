export function calculateStartAngle(value: number, minValue: number, maxValue: number) {
  const normalizedValue = Math.max(minValue, Math.min(value, maxValue));
  const range = maxValue - minValue;
  const normalizedPosition = (normalizedValue - minValue) / range;

  return normalizedPosition * 180 - 90;
}
