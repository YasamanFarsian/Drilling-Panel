import { VictoryAxisProps } from 'victory';
import { ThemeMode } from '@dt-advisory/styles/theme';

export const axisStyle: VictoryAxisProps['style'] = {
  axis: { display: 'none' },
  ticks: { display: 'none' },
  tickLabels: { display: 'none' },
};

const CUTTING_PROPORTION_AREA_LIGHT_COLOR = '#E5EBF1';
const CUTTING_PROPORTION_AREA_DARK_COLOR = '#324873';

export const cuttingProportionColors = {
  light: CUTTING_PROPORTION_AREA_LIGHT_COLOR,
  dark: CUTTING_PROPORTION_AREA_DARK_COLOR,
};

export const cuttingProportionGradients = {
  light: [{ offset: '100%', stopColor: CUTTING_PROPORTION_AREA_LIGHT_COLOR, stopOpacity: 1 }],

  dark: [{ offset: '100%', stopColor: CUTTING_PROPORTION_AREA_DARK_COLOR, stopOpacity: 1 }],
};

export const cuttingProportionInactiveGradients = {
  light: [
    { offset: '0%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
    { offset: '100%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
  ],
  dark: [
    { offset: '0%', stopColor: '#D0D1D2', stopOpacity: 0.15 },
    { offset: '100%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
  ],
};

export const cuttingProportionStrokes = {
  light: '#C3CBD2',
  dark: '#485670',
};

export const cuttingProportionInactiveStrokes = {
  light: '#292929',
  dark: '#D0D1D2',
};

const BED_HEIGHT_LIGHT_COLOR = '#D7DDD7';
const BED_HEIGHT_DARK_COLOR = '#3E443D';

export const bedHeightColors = {
  light: BED_HEIGHT_LIGHT_COLOR,
  dark: BED_HEIGHT_DARK_COLOR,
};

export const bedHeightGradients = {
  light: [{ offset: '100%', stopColor: BED_HEIGHT_LIGHT_COLOR, stopOpacity: 1 }],

  dark: [{ offset: '100%', stopColor: BED_HEIGHT_DARK_COLOR, stopOpacity: 1 }],
};

export const bedHeightStrokes = {
  light: '#B7C1CA',
  dark: '#7B8379',
};

export const cuttingLineInactiveStrokes = {
  light: '#292929',
  dark: '#D0D1D2',
};

export const cuttingLineStrokes = {
  light: '#458DB5',
  dark: '#458DB5',
};

export const cuttingInclinationStyle = (mode: ThemeMode) => ({
  data: {
    stroke: cuttingLineStrokes[mode],
    strokeWidth: '2px',
  },
});
