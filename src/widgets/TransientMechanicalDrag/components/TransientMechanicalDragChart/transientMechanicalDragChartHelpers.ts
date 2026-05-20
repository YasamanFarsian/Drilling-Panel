import { VictoryChartProps } from 'victory';

export const getBucklingLimitY0 = ({
  minDomain,
}: {
  minDomain?: VictoryChartProps['minDomain'];
}) => {
  if (minDomain !== undefined && typeof minDomain !== 'number') {
    return minDomain.y ?? 0;
  } else {
    return 0;
  }
};

export const getTensileLimitY0 = ({
  maxDomain,
}: {
  maxDomain?: VictoryChartProps['maxDomain'];
}) => {
  if (maxDomain !== undefined && typeof maxDomain !== 'number') {
    return maxDomain.y ?? 0;
  } else {
    return 0;
  }
};
