import { StyleFunction, ThemeMode } from '@dt-advisory/styles/theme';
import { css } from '@emotion/react';
import { VictoryAxisProps } from 'victory';

export const containerStyle: StyleFunction = (_theme) => css``;

export const axisStyle: VictoryAxisProps['style'] = {
  axis: { display: 'none' },
  ticks: { display: 'none' },
  tickLabels: { display: 'none' },
};

const TENSILE_LIMIT_LIGHT_COLOR = '#E5EBF1';
const TENSILE_LIMIT_DARK_COLOR = '#324873';
const BUCKLING_LIMIT_LIGHT_COLOR = '#D7DDD9';
const BUCKLING_LIMIT_DARK_COLOR = '#7B8379';

export const inactiveTensionLineStyle = (mode: ThemeMode) => ({
  data: {
    stroke: inactiveTensionStrokes[mode],
    strokeWidth: 2,
  },
});

export const tensionLineStyle = (mode: ThemeMode) => ({
  data: {
    stroke: tensionStrokes[mode],
    strokeWidth: 2,
  },
});

export const tensileLimitColors = {
  light: TENSILE_LIMIT_LIGHT_COLOR,
  dark: TENSILE_LIMIT_DARK_COLOR,
};

export const bucklingLimitColors = {
  light: BUCKLING_LIMIT_LIGHT_COLOR,
  dark: BUCKLING_LIMIT_DARK_COLOR,
};

export const tensileLimitGradients = {
  light: [
    { offset: '0%', stopColor: TENSILE_LIMIT_LIGHT_COLOR, stopOpacity: 1 },
    { offset: '100%', stopColor: TENSILE_LIMIT_LIGHT_COLOR, stopOpacity: 1 },
  ],

  dark: [
    { offset: '0%', stopColor: TENSILE_LIMIT_DARK_COLOR, stopOpacity: 1 },
    { offset: '100%', stopColor: TENSILE_LIMIT_DARK_COLOR, stopOpacity: 1 },
  ],
};

export const bucklingLimitGradients = {
  light: [
    { offset: '0%', stopColor: BUCKLING_LIMIT_LIGHT_COLOR, stopOpacity: 1 },
    { offset: '100%', stopColor: BUCKLING_LIMIT_LIGHT_COLOR, stopOpacity: 1 },
  ],
  dark: [
    { offset: '0%', stopColor: BUCKLING_LIMIT_DARK_COLOR, stopOpacity: 1 },
    { offset: '100%', stopColor: BUCKLING_LIMIT_DARK_COLOR, stopOpacity: 1 },
  ],
};

export const tensileLimitInactiveGradients = {
  light: [
    { offset: '0%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
    { offset: '100%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
  ],
  dark: [
    { offset: '0%', stopColor: '#D0D1D2', stopOpacity: 0.15 },
    { offset: '100%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
  ],
};

export const bucklingLimitInactiveGradients = {
  light: [
    { offset: '0%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
    { offset: '100%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
  ],
  dark: [
    { offset: '0%', stopColor: '#D0D1D2', stopOpacity: 0.15 },
    { offset: '100%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
  ],
};

export const tensileLimitStrokes = {
  light: '#C3CBD2',
  dark: '#485670',
};

export const bucklingLimitStrokes = {
  light: '#B7C1CA',
  dark: '#9EA39D',
};

export const bucklingLimitInactiveStrokes = {
  light: '#292929',
  dark: '#D0D1D2',
};

export const tensileLimitInactiveStrokes = {
  light: '#292929',
  dark: '#D0D1D2',
};

export const tensionStrokes = {
  light: '#1BA120',
  dark: '#1BA120',
};

export const inactiveTensionStrokes = {
  light: '#292929',
  dark: '#D0D1D2',
};
