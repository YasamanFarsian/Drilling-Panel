import { DrillabilityType } from '../Drillability/DrillabilityTypes';

const areAllNumbers = (nums: any[]) => {
  return nums.every((x) => 'number' === typeof x);
};

const isNotSafeData = (data: DrillabilityType) => {
  return !areAllNumbers([
    data.wobDrillingControlSystem,
    data.downholeWOB,
    data.downholeMSE,
    data.effLoss,
    data.doc,
    data.bitHyd,
  ]);
};

const getDefaultDrillabilityData = () => ({
  wobDrillingControlSystem: 0,
  downholeWOB: 0,
  downholeMSE: 0,
  effLoss: 0,
  doc: 0,
  bitHyd: 0,
});

export const getDrillabilitySafeData = (data: DrillabilityType): DrillabilityType => {
  if (isNotSafeData(data)) {
    return {
      ...data,
      ...getDefaultDrillabilityData(),
    };
  }
  return data;
};
