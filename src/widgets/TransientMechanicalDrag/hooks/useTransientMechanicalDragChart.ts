import { VictoryChartProps } from 'victory';
import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';
import { getTickValuesAndNewXDomain, toFix } from '@dt-advisory/widgets/helpers/transientHelpers';
import { AreaType, LineType } from '@dt-advisory/widgets/helpers/types';
import { TransientChartUtilities } from '../../helpers/TransientChartUtilities';
import { TransientMechanicalDragType } from '../TransientMechanicalDragTypes';

type TransientMechanicalDragChartRerturnType = {
  maxDomain: VictoryChartProps['maxDomain'];
  minDomain: VictoryChartProps['maxDomain'];
  bitDepth: number | undefined;
  lastCasingDepth: number | undefined;
  bucklingLimit: AreaType[];
  tensileLimit: AreaType[];
  tension: LineType[];
  hideAxisLabel: boolean;
  tickValues: number[];
};

// chart is inverted Y is X and X is Y in chart
// eslint-disable-next-line max-lines-per-function, complexity
export const useTransientMechanicalDragChart = (
  data: TransientMechanicalDragType | null,
  numOfTicks: number,
): TransientMechanicalDragChartRerturnType => {
  const hideAxisLabel = useAxisLabelToggleStore((x) => x.hideAxisLabel.transientMechanicalDrag);
  const mechanicalProfiles = data?.mechanicalProfiles ?? [];
  const bitDepth = toFix(data?.bitDepth ?? 0);
  const lastCasingDepth = data?.lastCasingDepth ?? 0;
  const maxYdomain = data?.maxYdomain ?? 0;
  const minYdomain = data?.minYdomain ?? 0;

  const { newMinDomain, newMaxDomain, tickValues } = getTickValuesAndNewXDomain({
    minYdomain,
    maxYdomain,
    numOfTicks,
  });

  const maxDomain = { x: bitDepth, y: newMaxDomain };
  const minDomain = { x: 0, y: newMinDomain };
  const chart = new TransientChartUtilities(minDomain, maxDomain);
  const filteredMechanicalProfiles = chart.filterDragMechanicalProfiles(mechanicalProfiles);
  const bucklingLimit = filteredMechanicalProfiles.slice(1).map((mechanicalProfile) => ({
    x: mechanicalProfile.MD,
    y: mechanicalProfile.bucklingLimit,
  }));
  const tensileLimit = filteredMechanicalProfiles.slice(1).map((mechanicalProfile) => ({
    x: mechanicalProfile.MD,
    y: mechanicalProfile.tensileLimit,
  }));

  const tension = filteredMechanicalProfiles.slice(1).map((mechanicalProfile) => ({
    x: mechanicalProfile.MD,
    y: mechanicalProfile.tension,
  }));

  return {
    maxDomain,
    minDomain,
    bitDepth,
    lastCasingDepth, // same as casingShoeDepth
    bucklingLimit,
    tensileLimit,
    hideAxisLabel,
    tension,
    tickValues,
  };
};
