import Decimal from 'decimal.js';
import { math } from '@dt-advisory/helpers/mathjs';
import { Domain } from './types';
type getCatesianXAxisDomainPropsType = {
  maxDomain: Domain;
  minDomain: Domain;
  roundNumber: number;
};
export const getCatesianXAxisDomain = ({
  maxDomain,
  minDomain,
  roundNumber,
}: getCatesianXAxisDomainPropsType) => {
  const minXValue = new Decimal(
    math.floor(new Decimal(minDomain.y).dividedBy(new Decimal(roundNumber))),
  )
    .mul(roundNumber)
    .toString();

  const maxXValue = new Decimal(
    math.ceil(new Decimal(maxDomain.y).dividedBy(new Decimal(roundNumber))),
  )
    .mul(roundNumber)
    .toString();
  const min = {
    x: minDomain.x,
    y: Number(minXValue),
  };
  const max = {
    x: maxDomain.x,
    y: Number(maxXValue),
  };
  return { maxDomain: max, minDomain: min };
};
