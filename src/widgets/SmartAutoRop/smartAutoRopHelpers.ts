import { isValidNumber } from '@dt-advisory/helpers/isValidNumber';
import { IndicatorDataType } from './components/SmartAutoRopChart';
import { ActiveSmartAutoRopType, SmartAutoRopType, SmartRopDataKeyType } from './SmartAutoRopTypes';

export const validateActiveStatus = (
  apiData: SmartAutoRopType | null,
): apiData is ActiveSmartAutoRopType => {
  const fieldsToCheck = [
    'ropActual' as const,
    'ropTarget' as const,
    'maxRop' as const,
    'rpmActual' as const,
    'rpmTarget' as const,
    'maxRpm' as const,
    'wobActual' as const,
    'wobTarget' as const,
    'maxWob' as const,
    'flowRateActual' as const,
    'flowRateTarget' as const,
    'maxFlowRate' as const,
  ];

  return (
    !!apiData && apiData.active && fieldsToCheck.every((field) => isValidNumber(apiData[field]))
  );
};

const normalizedData = ({ actual, max }: { actual: number; max: number }) => {
  const data = Math.min(actual, max);
  const normalized = data / max;
  return normalized;
};

export const getSmartAutoRopIndicatorData = (apiData: SmartAutoRopType | null) => {
  const indicatorData: IndicatorDataType[] = [];

  if (!validateActiveStatus(apiData)) {
    return indicatorData;
  }

  indicatorData.push({
    x: 0,
    y: normalizedData({ actual: apiData.ropActual, max: apiData.maxRop }),
    dataKey: 'ROP',
  });
  indicatorData.push({
    x: normalizedData({ actual: apiData.rpmActual, max: apiData.maxRpm }),
    y: 0,
    dataKey: 'RPM',
  });
  indicatorData.push({
    x: 0,
    y: -normalizedData({ actual: apiData.wobActual, max: apiData.maxWob }),
    dataKey: 'WOB',
  });
  indicatorData.push({
    x: -normalizedData({ actual: apiData.flowRateActual, max: apiData.maxFlowRate }),
    y: 0,
    dataKey: 'FlowRate',
  });

  return indicatorData;
};

// eslint-disable-next-line max-lines-per-function
export const getActiveDataKeys = (
  apiData: SmartAutoRopType | null,
  thresholdLimit: number,
): SmartRopDataKeyType[] => {
  if (!validateActiveStatus(apiData)) {
    return [];
  }
  const validthresholdLimit = isValidNumber(thresholdLimit) ? thresholdLimit : 0;
  const thresholdFactor = validthresholdLimit / 100;

  const keyToPropMapping: {
    [key in SmartRopDataKeyType]: {
      actual: 'ropActual' | 'flowRateActual' | 'rpmActual' | 'wobActual';
      target: 'ropTarget' | 'flowRateTarget' | 'rpmTarget' | 'wobTarget';
    };
  } = {
    ROP: { actual: 'ropActual', target: 'ropTarget' },
    FlowRate: { actual: 'flowRateActual', target: 'flowRateTarget' },
    RPM: { actual: 'rpmActual', target: 'rpmTarget' },
    WOB: { actual: 'wobActual', target: 'wobTarget' },
  };

  return (Object.keys(keyToPropMapping) as SmartRopDataKeyType[]).filter(
    (key: SmartRopDataKeyType) => {
      const { actual, target } = keyToPropMapping[key];

      const targetRange = apiData[target] * thresholdFactor;
      const lowerBoundTarget = apiData[target] - targetRange;
      const upperBoundTarget = apiData[target] + targetRange;

      return apiData[actual] >= lowerBoundTarget && apiData[actual] <= upperBoundTarget;
    },
  );
};

const getRoundingValue = (decimalPlaces: number, value: number) => {
  return Number(value.toFixed(decimalPlaces));
};

export const getSmartRopInfoData = (data: SmartAutoRopType | null) => {
  if (!validateActiveStatus(data)) {
    return;
  }

  return {
    ropActual: getRoundingValue(0, data.ropActual),
    ropTarget: getRoundingValue(0, data.ropTarget),
    flowRateActual: getRoundingValue(0, data.flowRateActual),
    flowRateTarget: getRoundingValue(0, data.flowRateTarget),
    rpmActual: getRoundingValue(0, data.rpmActual),
    rpmTarget: getRoundingValue(0, data.rpmTarget),
    wobActual: getRoundingValue(1, data.wobActual),
    wobTarget: getRoundingValue(1, data.wobTarget),
  };
};
