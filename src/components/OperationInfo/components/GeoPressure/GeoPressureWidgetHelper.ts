import { GeoPressureToggleValue } from './components/GeoPressureToggler';

type MudWeightDataPoint = {
  md?: number;
  tvd?: number;
  porePressureEmw?: number;
  fractionPressureEmw?: number;
};

type GeoPressureData = {
  mudWeightData?: MudWeightDataPoint[];
  fitData?: unknown[];
};

export type GeoPressureWidgetHelperPropsType = {
  data?: GeoPressureData;
  mode: GeoPressureToggleValue;
};

export const geoPressureWidgetHelper = ({ mode, data }: GeoPressureWidgetHelperPropsType) => {
  const placeHolder = [
    { x: 9, y: 27, y0: 18 },
    { x: 36, y: 54, y0: 45 },
  ];

  const mudWeightData =
    data?.mudWeightData
      ?.map((x) => ({
        x: (mode === GeoPressureToggleValue.MD ? x.md : x.tvd) ?? 0,
        y0: x.porePressureEmw,
        y: x.fractionPressureEmw,
      }))
      .filter((p) => p.x !== null && p.y !== null && p.y0 !== null) ?? placeHolder;

  const fracturationPressureInEMW = data?.mudWeightData?.map((x) => ({
    x: (mode === GeoPressureToggleValue.MD ? x.md : x.tvd) ?? 0,
    y: x.fractionPressureEmw,
  }));

  const porePressureGradientInEMW = data?.mudWeightData?.map((x) => ({
    x: (mode === GeoPressureToggleValue.MD ? x.md : x.tvd) ?? 0,
    y: x.porePressureEmw,
  }));

  return { mudWeightData, fracturationPressureInEMW, porePressureGradientInEMW };
};
