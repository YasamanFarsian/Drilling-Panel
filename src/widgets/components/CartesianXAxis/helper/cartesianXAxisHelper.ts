import Decimal from 'decimal.js';
import { math } from '@dt-advisory/helpers/mathjs';
type getDomainPropsType = {
  minValue: number;
  maxValue: number;
  isRound: boolean;
  roundNumber: number;
};

export const getDomainValue = ({
  minValue,
  maxValue,
  isRound,
  roundNumber,
}: getDomainPropsType) => {
  const minRoundValue = new Decimal(
    math.floor(new Decimal(minValue).dividedBy(new Decimal(roundNumber))),
  )
    .mul(roundNumber)
    .toString();

  const maxRoundValue = new Decimal(
    math.ceil(new Decimal(maxValue).dividedBy(new Decimal(roundNumber))),
  )
    .mul(roundNumber)
    .toString();

  const minDomain = isRound ? Number(minRoundValue) : minValue;
  const maxDomain = isRound ? Number(maxRoundValue) : maxValue;

  return { minDomain, maxDomain };
};

export const getX = (index: number, x: number, adjustFisrtTik: boolean) => {
  if (index === 0) return adjustFisrtTik ? x + 1 : x - 0.3;

  // last tick should move more into chart
  return index === 8 ? x - 1 : x;
};

export const getText = (text: string, index: number) => {
  if (index !== 0 && index % 2 !== 0) return '';

  return text;
};
