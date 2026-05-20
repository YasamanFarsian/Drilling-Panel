/* eslint-disable complexity */
import { VictoryChartProps } from 'victory';
import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';
import { getTickValues } from '@dt-advisory/widgets/components/CartesianXAxis/helper/tickValues.helper';
import { TransientChartUtilities } from '@dt-advisory/widgets/helpers/TransientChartUtilities';
import { toFix } from '@dt-advisory/widgets/helpers/transientHelpers';
import { AreaType, LineType } from '@dt-advisory/widgets/helpers/types';
import { TransientMechanicalTorqueType } from '../TransientMechanicalTorqueTypes';

type TransientMechanicalDragChartRerturnType = {
  maxDomain: VictoryChartProps['maxDomain'];
  minDomain: VictoryChartProps['maxDomain'];
  bitDepth: number;
  lastCasingDepth: number;
  torque: LineType[];
  torsionalLimit: AreaType[];
  hideAxisLabel: boolean;
  tickValues: number[];
};

// eslint-disable-next-line max-lines-per-function
export const useTransientMechanicalTorqueChart = (
  data: TransientMechanicalTorqueType | null,
  numOfTicks: number,
): TransientMechanicalDragChartRerturnType => {
  const hideAxisLabel = useAxisLabelToggleStore((x) => x.hideAxisLabel.transientMechanicalTorque);
  const mechanicalProfiles = data?.mechanicalProfiles ?? [];
  const bitDepth = toFix(data?.bitDepth ?? 0);
  const lastCasingDepth = data?.lastCasingDepth ?? 0;
  const maxYdomain = data?.maxYdomain ?? 0;
  const minYdomain = data?.minYdomain ?? 0;
  const {
    minDomain: newMinDomain,
    maxDomain: newMaxDomain,
    tickValues,
  } = getTickValues({
    min: minYdomain,
    max: maxYdomain,
    numOfTicks,
  });
  const maxDomain = { x: bitDepth, y: newMaxDomain };
  const minDomain = { x: 0, y: newMinDomain };
  const chart = new TransientChartUtilities(minDomain, maxDomain);
  const filteredMechanicalProfiles = chart.filterTorqueMechanicalProfiles(mechanicalProfiles);
  const torsionalLimit = filteredMechanicalProfiles.slice(1).map((mechanicalProfile) => ({
    x: mechanicalProfile.MD,
    y: mechanicalProfile.torsionalLimit,
  }));
  const torque = filteredMechanicalProfiles.slice(1).map((mechanicalProfile) => ({
    x: mechanicalProfile.MD,
    y: mechanicalProfile.torque,
  }));
  return {
    maxDomain,
    minDomain,
    bitDepth,
    lastCasingDepth, // same as casingShoeDepth
    torque,
    torsionalLimit,
    hideAxisLabel,
    tickValues,
  };
};
