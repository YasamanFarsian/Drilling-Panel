const ONE_MILLION = 1000000;
const TEN_MILLION = 10000000;
const HUNDRED_MILLION = 100000000;
const ONE_BILLION = 1000000000;
const TEN_BILLION = 10000000000;
const HUNDRED_BILLION = 100000000000;
export const ONE_TRILLION = 1000000000000;

export const ALLOWED_STEPS = [
  0.05,
  0.1,
  1,
  5,
  10,
  50,
  100,
  250,
  500,
  1000,
  5000,
  10000,
  100000,
  ONE_MILLION,
  TEN_MILLION,
  HUNDRED_MILLION,
  ONE_BILLION,
  TEN_BILLION,
  HUNDRED_BILLION,
  ONE_TRILLION,
];

const MAX_TICK_COUNTS = {
  bigVersion: 20,
  smallVersion: 10,
};

export const getSteps = (isSmallVersion: boolean, range: number) => {
  const maxTickCounts = isSmallVersion ? MAX_TICK_COUNTS.smallVersion : MAX_TICK_COUNTS.bigVersion;
  for (const step of ALLOWED_STEPS) {
    const check = Math.floor(range / step);
    if (check < maxTickCounts) {
      return step;
    }
  }

  return ALLOWED_STEPS[ALLOWED_STEPS.length - 1];
};

export const findNextMultiple = (inputNumber: number, multipleBase: number) => {
  const multiple = Math.ceil(inputNumber / multipleBase) * multipleBase;
  return multiple === inputNumber ? multiple + multipleBase : multiple;
};

const generateTickValues = ({ steps, min, max }: { steps: number; min: number; max: number }) => {
  const tickValues: number[] = [min];

  while (findNextMultiple(tickValues[tickValues.length - 1], steps) < max) {
    const tickValue = findNextMultiple(tickValues[tickValues.length - 1], steps);
    tickValues.push(tickValue);
  }
  tickValues.push(max);
  return tickValues.reverse();
};

export const getTickValues = (isSmallVersion: boolean, max?: number, min?: number) => {
  if ('number' !== typeof max) return;
  if (max <= 0) return;
  const _min = min ?? 0;
  const steps = getSteps(isSmallVersion, max - _min);
  const tickValues = generateTickValues({ steps, min: _min, max });
  return { tickValues, steps };
};

export const tickToShow = (tick: number, steps?: number) => {
  if (steps === undefined) {
    return tick;
  }
  if (steps < 1) return tick.toFixed(2);

  return tick % steps === 0 ? tick : '';
};
