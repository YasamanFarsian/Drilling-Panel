import { getTickValues } from '@dt-advisory/widgets/components/CartesianXAxis/helper/tickValues.helper';
import { TransientMechanicalDragType } from '@dt-advisory/widgets/TransientMechanicalDrag/TransientMechanicalDragTypes';
import { TransientMechanicalTorqueType } from '@dt-advisory/widgets/TransientMechanicalTorque/TransientMechanicalTorqueTypes';

export const toFix = (num: number, fixed = 0) => {
  try {
    return parseInt(num.toFixed(fixed));
  } catch (e) {
    console.error(e);
  }
  return num;
};

const getDefaultTransientCoreData = () => ({
  bitDepth: 600,
  maxYdomain: 10,
  minYdomain: 0,
  mechanicalProfiles: [],
});

const areAllNumbers = (nums: any[]) => {
  return nums.every((x) => 'number' === typeof x);
};

const isNotSafeData = (data: TransientMechanicalDragType | TransientMechanicalTorqueType) => {
  return (
    !areAllNumbers([data.bitDepth, data.maxYdomain, data.minYdomain]) || !data.mechanicalProfiles
  );
};
export const getTransientMechanicalDragSafeData = (
  data: TransientMechanicalDragType,
): TransientMechanicalDragType => {
  if (isNotSafeData(data)) {
    return {
      ...data,
      ...getDefaultTransientCoreData(),
    };
  }
  return data;
};

export const getTransientMechanicalTorqueSafeData = (
  data: TransientMechanicalTorqueType,
): TransientMechanicalTorqueType => {
  if (isNotSafeData(data)) {
    return {
      ...data,
      ...getDefaultTransientCoreData(),
    };
  }
  return data;
};

type GetTickValuesAndNewXDomainPropsType = {
  minYdomain: number;
  maxYdomain: number;
  numOfTicks: number;
};
export const getTickValuesAndNewXDomain = ({
  minYdomain,
  maxYdomain,
  numOfTicks,
}: GetTickValuesAndNewXDomainPropsType) => {
  const {
    minDomain: newMinDomain,
    maxDomain: newMaxDomain,
    tickValues,
  } = getTickValues({
    min: minYdomain,
    max: maxYdomain,
    numOfTicks,
  });

  return {
    newMinDomain,
    newMaxDomain,
    tickValues,
  };
};
