/* eslint-disable complexity,max-lines-per-function */

type GenerateTickValuesPropsType = {
  mv: number;
  step: number;
  numOfTicks: number;
  min: number;
};
export const generateTickValues = ({
  mv,
  step,
  numOfTicks,
  min,
}: GenerateTickValuesPropsType): Array<string> => {
  const tickValues = [];
  if (numOfTicks % 2 === 0) {
    for (let i = 0; i < numOfTicks; i++) {
      const r = min + i * step;
      tickValues.push(r.toFixed(2));
    }
  } else {
    const sideValues = Math.floor(numOfTicks / 2);
    for (let i = sideValues; i > 0; i--) {
      const r = mv - i * step;
      tickValues.push(r.toFixed(2));
    }
    for (let i = 0; i <= sideValues; i++) {
      const r = mv + i * step;
      tickValues.push(r.toFixed(2));
    }
  }

  return tickValues;
};

/**
 * Rounding helpers
 * */

type RoundToFriendlyNumPropstType = {
  min: number;
  max: number;
  num: number;
};
export const roundToFriendlyNum = ({ min, max, num }: RoundToFriendlyNumPropstType) => {
  const range = max - min;
  const isNeg = range < 0;
  const isNegDet = isNeg ? -1 : 1;
  const currentRange = range * isNegDet;
  let result = 0;
  switch (true) {
    case currentRange < 1 && num < 0.1:
      result = Math.round(num / 0.05) * 0.05;
      break;
    case currentRange < 2:
      // If Range(Max-Min) is <1: Rounding to happen in 0.1's
      result = Math.round(num * 10) / 10;
      break;
    case currentRange < 10:
      // If Range(Max-Min) is 1 < 10: Rounding to happen in 1’s
      result = Math.round(num);
      break;
    case currentRange < 25:
      // If Range(Max-Min) is 10 < 25: Rounding to happen in 5’s
      result = Math.round(num / 5) * 5;
      break;
    case currentRange >= 25:
      // If Range(Max-Min) is 1>25: Rounding to happen in 10’s
      result = Math.round(num / 10) * 10;
      break;
    default:
      result = Math.round(num);
  }
  return isNeg ? result * -1 : result;
};

export const getMiddleTickValueStep = ({ min, max, numOfTicks }: GetTickValuesPropsType) => {
  const rstep = (max - min) / (numOfTicks - 1);
  const step = roundToFriendlyNum({ min, max, num: rstep });
  return step / 2;
};

export const parseTickValues = (values: string[]) => values.map(Number);

type GetTickValuesPropsType = {
  min: number;
  max: number;
  numOfTicks: number;
};
export const getTickValues = ({ min, max, numOfTicks }: GetTickValuesPropsType) => {
  const rmv = (max + min) / 2;
  const mv = roundToFriendlyNum({ min, max, num: rmv });
  const rstep = (max - min) / (numOfTicks - 1);
  const step = roundToFriendlyNum({ min, max, num: rstep });
  const middleStep = step / 2;
  const tickValues = generateTickValues({ mv, step, numOfTicks, min });
  const parsedTickValues = parseTickValues(tickValues);
  const minDomain = parsedTickValues[0] < min ? parsedTickValues[0] : min;
  const maxDomain = parsedTickValues[numOfTicks - 1] > max ? parsedTickValues[numOfTicks - 1] : max;
  const tickValuesWithMiddleValues = [
    parsedTickValues[0],
    parsedTickValues[0] + middleStep,
    parsedTickValues[1],
    parsedTickValues[1] + middleStep,
    parsedTickValues[2],
    parsedTickValues[2] + middleStep,
    parsedTickValues[3],
    parsedTickValues[3] + middleStep,
    parsedTickValues[4],
  ];

  return {
    tickValuesAsString: tickValues,
    tickValues: tickValuesWithMiddleValues,
    minDomain,
    maxDomain,
  };
};
