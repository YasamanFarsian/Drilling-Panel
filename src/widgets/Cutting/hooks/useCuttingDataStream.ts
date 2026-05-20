/* eslint-disable max-lines-per-function, complexity */
import { math } from '@dt-advisory/helpers/mathjs';
import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';
import { useZoomerToggleStore } from '@dt-advisory/store/ZoomerToggle';
import { getMdToUseWithPerc } from '@dt-advisory/widgets/helpers/mdHelper';
import { CuttingChartStreamMessage } from '../CuttingTypes';

const maxY = 20;
const CUTTING_LINE_PADSTART = 5;
const CUTTING_LINE_RATIO = 9;
const MD_PERC_VALUE = 0.05;

export const useCuttingDataStream = ({ data }: { data: CuttingChartStreamMessage }) => {
  const zoomerCutting = useZoomerToggleStore((x) => x.zoomer.cutting);
  const hideAxisLabel = useAxisLabelToggleStore((x) => x.hideAxisLabel.cutting);

  const {
    proportionMassFractions,
    cuttingInclination,
    bedHeight,
    md: holeDepth,
    bitDepth,
    tdBottom,
    casingShoeDepth,
  } = data;

  const MD = holeDepth;
  const TD = tdBottom; // SK-1290 maxDomain.x;

  const minDomain = {
    x: zoomerCutting ? casingShoeDepth : 0,
    y: 0,
  };

  const mdToUseWithPerc = getMdToUseWithPerc({ MD, TD, options: { increase: MD_PERC_VALUE } });
  const maxDomain = {
    x: zoomerCutting ? bitDepth : mdToUseWithPerc,
    y: maxY,
  };
  const proportionData = proportionMassFractions.map((y) => ({
    x: y.md,
    y: y.val,
  }));

  const bedData = bedHeight
    .map((y) => ({
      x: y.md,
      y: y.val / 20,
      tooltipInclinationValue: y.val,
    }))
    .filter((cuttingRawData) => cuttingRawData?.x <= maxDomain.x);

  const cuttingData = cuttingInclination
    .filter((x) => x.md <= maxDomain.x)
    .map((y) => ({
      x: y.md,
      y: math.number(
        math
          .bignumber(y.val)
          .dividedBy(math.bignumber(CUTTING_LINE_RATIO))
          .add(CUTTING_LINE_PADSTART),
      ),
      tooltipInclinationValue: y.val,
    }))
    .filter((cuttingRawData) => cuttingRawData?.x <= maxDomain.x);
  const hideAxis = tdBottom === 0 && bitDepth === 0;

  return {
    minDomain,
    maxDomain,
    proportionData,
    bedData,
    bitDepth,
    holeDepth,
    cuttingData,
    casingShoeDepth,
    MD,
    TD,
    hideAxis,
    hideAxisLabel,
  };
};

function getMaxMD(md: number, td: number) {
  if (md < td) return md;
  return td;
}
