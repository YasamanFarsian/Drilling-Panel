/* eslint-disable prefer-const */
// Chart specific methods
// Andrei Svetlichnyi 2021.12

// find axis step
export function calcStep(range: number, stepsCount: number): number {
  const marks = [1, 2, 5]; // only values allowed on axes for a single step
  // borders calculation: borders = marks.map((v, i, arr) => v * Math.sqrt((arr[i + 1] ?? 10 * arr[0]) / v))
  const borders = [1.41421, 3.16228, 7.07107];
  let step = range / stepsCount; // approximate step, must be rounded to closest mark
  let [mantissa, exponent] = step.toExponential().split('e').map(parseFloat);
  let mark = marks[borders.findIndex((v) => v > mantissa)];
  if (!mark) {
    mark = marks[0];
    exponent++;
  }
  step = mark * Math.pow(10, exponent);
  return step;
}
