/* eslint-disable max-lines-per-function, complexity, @typescript-eslint/no-explicit-any */
import { math } from '@dt-advisory/helpers/mathjs';
import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';
import { useZoomerToggleStore } from '@dt-advisory/store/ZoomerToggle';
import { getTickValues } from '@dt-advisory/widgets/components/CartesianXAxis/helper/tickValues.helper';
import { getMdToUseWithPerc } from '@dt-advisory/widgets/helpers/mdHelper';
import { useEffect } from 'react';
import {
  BaseDataValue,
  ECDBaseValue,
  EcdHE,
  ESDBaseValue,
  MarginValue,
  NearestPressure,
} from '../EcdTypes';
import { EcdChartPropsType } from '../components/EcdChart';

const MD_PERC_VALUE = 0.05;

export function useEcdChart(props: EcdChartPropsType) {
  const hideAxisLabel = useAxisLabelToggleStore((x) => x.hideAxisLabel.ecd);
  const setEcdZoomDisable = useZoomerToggleStore((state) => state.setEcdZoomDisable);

  // zoomer
  const zoomerECD = useZoomerToggleStore((x) => x.zoomer.ecd);

  // config
  const config = props.data!.pressure || {};
  const { CasingShoeDepth, BitDepth, Md, Td, MinEcd, MaxEcd } = config;
  const casingShoeDepth = CasingShoeDepth;
  const bitDepth: number = BitDepth;
  const TD = Td;
  const MD = Md;
  const holeDepth = MD;
  const minEcd: number = MinEcd || 0;
  const maxEcd: number = MaxEcd || 0;
  const zoomerDisable = casingShoeDepth >= holeDepth;

  useEffect(() => {
    setEcdZoomDisable(zoomerDisable, props.widgetId);
  }, [props.widgetId, setEcdZoomDisable, zoomerDisable]);

  // references
  const nearestPressure = props.data?.nearestPressure || ({} as NearestPressure);
  const { frac, pore } = nearestPressure;
  const closestFracDepth = frac?.depth;
  const currentFracEcd = frac?.ecd;
  const targetFracEcd = frac?.val;
  const closestPoreDepth = pore?.depth;
  const currentPoreEcd = pore?.ecd;
  const targetPoreEcd = pore?.val;

  // NOTE: chart is inverted. x are projected in the vertical axis and y in the horizontal one
  const mdToUseWithPerc = getMdToUseWithPerc({ MD, TD, options: { increase: MD_PERC_VALUE } });
  // get x values if zoomer is active
  const zoomerXECDMin = casingShoeDepth - (MD - casingShoeDepth) * MD_PERC_VALUE;
  const zoomerXECDMax = MD + (MD - zoomerXECDMin) * MD_PERC_VALUE;

  // get y values if zoomer is active

  // need to commemt this temporarily
  // const valueToIncrease = zoomerECD ? ZOOMER_ECD_VALUE_Y : DEFAULT_INACTIVE_ZOOMER_ECD_VALUE_Y;
  // const zoomerYECDMin: number = minEcd - (maxEcd - minEcd) * valueToIncrease;
  // const zoomerYECDMax: number = maxEcd + (maxEcd - minEcd) * valueToIncrease;

  const [minDomain, maxDomain] = [
    { x: zoomerECD ? zoomerXECDMin : 0, y: minEcd },
    { x: zoomerECD ? zoomerXECDMax : mdToUseWithPerc, y: maxEcd },
  ];

  // margins
  const _margins = props.data?.margins;
  const margins = _margins?.map((margin: MarginValue) => [margin.Md, margin.Min, margin.Max]);

  // esd and ecd
  const esd = props.data?.esd;
  const ecd = props.data?.ecd;
  const dataEcd = ecd?.map((d: ECDBaseValue) => ({
    x: d.md,
    y: d.val,
  }));

  const dataEsd = esd?.map((d: ESDBaseValue) => ({
    x: d.md,
    y: d.val,
  }));

  const data = {
    ecd: dataEcd,
    esd: dataEsd,
  };

  const closestToPoreLine = {
    from: currentPoreEcd,
    to: targetPoreEcd,
    depth: closestPoreDepth,
    showBackground: bitDepth === closestPoreDepth || casingShoeDepth === closestPoreDepth,
  };
  const closestToFracLine = {
    from: currentFracEcd,
    to: targetFracEcd,
    depth: closestFracDepth,
    showBackground: bitDepth === closestFracDepth || casingShoeDepth === closestFracDepth,
  };

  // Along string ECD
  const alongStringEcdData =
    Array.isArray(props.data?.alongStringEcd) &&
    props.data.alongStringEcd[0]?.md !== 0 &&
    props.data.alongStringEcd[0]?.val !== 0
      ? props.data.alongStringEcd
      : [];

  const alongStringEcd = alongStringEcdData.map((d: ECDBaseValue) => ({ x: d.md, y: d.val }));

  // Downhole Ecd
  const downholeEcdHasData = props.data?.downholeEcdMd && props.data?.downholeEcd;
  const downholeEcd = downholeEcdHasData
    ? [{ x: props.data!.downholeEcdMd, y: props.data!.downholeEcd } as BaseDataValue]
    : [];

  // Historical Envelop
  const ecdHist = props.data?.ecdHist ?? ([] as EcdHE[]);
  const heData = ecdHist?.map((_data: EcdHE) => {
    return {
      Md: _data.min.md,
      Max: _data.min.val,
      Min: _data.max.val,
    };
  });

  const historicalEnvelopeData: {
    domain: { x: [number, number]; y: [number, number] };
    data: MarginValue[];
  } = {
    domain: {
      x: [0, bitDepth],
      y: [minEcd, ceil(maxEcd)],
    },
    data: heData as MarginValue[],
  };

  const {
    minDomain: newMinXDomain,
    maxDomain: newMaxXDomain,
    tickValues,
  } = getTickValues({
    min: minEcd,
    max: maxEcd,
    numOfTicks: props.numOfTicks,
  });

  return {
    minDomain: { ...minDomain, y: newMinXDomain },
    maxDomain: { ...maxDomain, y: newMaxXDomain },
    tickValues,
    data,
    margins,
    casingShoeDepth,
    bitDepth,
    holeDepth,
    MD,
    TD,
    closestToPoreLine,
    closestToFracLine,
    historicalEnvelopeData,
    alongStringEcd,
    downholeEcd,
    hideAxisLabel,
  };
}

function ceil(value: number) {
  return math.bignumber(value).times(10).ceil().dividedBy(10).toDecimalPlaces(1).toNumber();
}
