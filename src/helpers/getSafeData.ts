/* eslint-disable max-lines, max-lines-per-function, complexity, @typescript-eslint/no-explicit-any */
import { CuttingChartStreamMessage } from '@dt-advisory/widgets/Cutting/CuttingTypes';
import {
  ECDBaseValue,
  EcdHE,
  ECDStream,
  ESDBaseValue,
  MarginValue,
  NearestPressure,
  Pressure,
} from '@dt-advisory/widgets/Ecd/EcdTypes';

import { WellboreStreamMessage } from '@dt-advisory/widgets/Wellbore/WellboreTypes';

const _isString = (data: any) => 'string' === typeof data;
const _isNum = (data: any) => 'number' === typeof data;
const _nonEmptyArr = (data: any) => Array.isArray(data) && data.length > 0;
const _isEmptryArr = (data: any) => data.length === 0;

const _getDefaultECDData = (data: ECDStream) => ({
  currentTime: data?.currentTime,
  lastUpdated: data?.lastUpdated,
  alongStringEcd: [{ md: 0, val: 0 }] as ECDBaseValue[],
  downholeEcd: 0,
  downholeEcdMd: 0,
  ecd: [{ md: 0, val: 0 }] as ECDBaseValue[],
  esd: [{ md: 0, val: 0 }] as ESDBaseValue[],
  margins: [{ Md: 0, Min: 0, Max: 0 }] as MarginValue[],
  pressure: {
    BitDepth: 4200,
    CasingShoeDepth: 4200,
    MaxEcd: 1.9,
    Md: 4200,
    MinEcd: 0.9,
    Td: 4200,
  } as Pressure,
  nearestPressure: {
    frac: {
      depth: 0,
      ecd: 0,
      val: 0,
    },
    pore: {
      depth: 0,
      ecd: 0,
      val: 0,
    },
  } as NearestPressure,
  ecdHist: [{ min: { md: 0, val: 0 }, max: { md: 0, val: 0 } }] as EcdHE[],
  isLive: false,
});
export const checkECDData = (data: ECDStream) => {
  const ECDresult =
    data && Array.isArray(data.ecd) && data.ecd.every((x) => _isNum(x.md) && _isNum(x.val));
  const ESDresult =
    data && Array.isArray(data.esd) && data.esd.every((x) => _isNum(x.md) && _isNum(x.val));
  const marginResult = data && Array.isArray(data.margins);
  const pressureResult =
    data?.pressure &&
    _isNum(data.pressure.CasingShoeDepth) &&
    _isNum(data.pressure.BitDepth) &&
    _isNum(data.pressure.Md) &&
    _isNum(data.pressure.Td) &&
    _isNum(data.pressure.MinEcd) &&
    _isNum(data.pressure.MaxEcd);
  const nearestPressureResult =
    data?.nearestPressure &&
    data.nearestPressure?.frac &&
    _isNum(data.nearestPressure.frac.depth) &&
    _isNum(data.nearestPressure.frac.ecd) &&
    _isNum(data.nearestPressure.frac.val) &&
    data.nearestPressure?.pore &&
    _isNum(data.nearestPressure.pore.depth) &&
    _isNum(data.nearestPressure.pore.ecd) &&
    _isNum(data.nearestPressure.pore.val);

  const isDataSafe =
    ECDresult && ESDresult && marginResult && pressureResult && nearestPressureResult;
  return isDataSafe ? data : _getDefaultECDData(data);
};

const _getDefaultCuttingData = (data: CuttingChartStreamMessage) => ({
  currentTime: data?.currentTime,
  lastUpdated: data?.lastUpdated,
  tdBottom: 4200,
  bedHeightLastUpdate: data?.bedHeightLastUpdate,
  bedHeight: [{ md: 0, val: 0 }],
  proportionMassFractions: [{ md: 0, val: 0 }],
  cuttingInclination: [{ md: 0, val: 0 }],
  cuttingInclinationDepth: [{ md: 0, val: 0 }],
  cuttingsMassFractions: [{ md: 0, val: 0 }],
  bitDepth: 4200,
  md: 4200,
  casingShoeDepth: 308,
  isLive: false,
});
export const checkCuttingChartData = (
  data: CuttingChartStreamMessage,
): CuttingChartStreamMessage => {
  return data &&
    _isNum(data.tdBottom) &&
    _isNum(data.bitDepth) &&
    _isNum(data.md) &&
    Array.isArray(data.bedHeight) &&
    data.bedHeight.every((x) => _isNum(x.val) && _isNum(x.md)) &&
    Array.isArray(data.proportionMassFractions) &&
    data.proportionMassFractions.every((x) => _isNum(x.val) && _isNum(x.md)) &&
    Array.isArray(data.cuttingInclination) &&
    data.cuttingInclination.every((x) => _isNum(x.val) && _isNum(x.md))
    ? data
    : _getDefaultCuttingData(data);
};

export const checkWellboreData = (data: WellboreStreamMessage): WellboreStreamMessage | null => {
  const config = {
    ...data.config,
    bitDepth: data.config?.bitDepth || 0,
    casingDepth: data.config?.casingDepth || 0,
    holeDepth: data.config?.holeDepth || 0,
    neutralPoint: data.config?.neutralPoint || 0,
    targetDepth: data.config?.targetDepth || 0,
    bitRotation: !!data.config?.bitRotation,
    mudCirculation: !!data.config?.mudCirculation,
  };

  const {
    inclinationVal,
    inclinationMD,
    cuttingsMassFractionsVal,
    cuttingsMassFractionsMD,
    cuttingsBedHeightVal,
    cuttingsBedHeightMD,
  } = data.val;

  const val = {
    inclinationVal: _nonEmptyArr(inclinationVal) ? inclinationVal : [],
    inclinationMD: _nonEmptyArr(inclinationMD) ? inclinationMD : [],
    cuttingsMassFractionsVal: _nonEmptyArr(cuttingsMassFractionsVal)
      ? cuttingsMassFractionsVal
      : [],
    cuttingsMassFractionsMD: _nonEmptyArr(cuttingsMassFractionsMD) ? cuttingsMassFractionsMD : [],
    cuttingsBedHeightVal: _nonEmptyArr(cuttingsBedHeightVal) ? cuttingsBedHeightVal : [],
    cuttingsBedHeightMD: _nonEmptyArr(cuttingsBedHeightMD) ? cuttingsBedHeightMD : [],
  };

  const isAllEmpty = (Object.keys(val) as Array<keyof typeof val>).every((k) =>
    _isEmptryArr(val[k]),
  );

  return isAllEmpty
    ? null
    : {
        config,
        val,
        isLive: data.isLive,
        currentTime: data.currentTime,
      };
};
