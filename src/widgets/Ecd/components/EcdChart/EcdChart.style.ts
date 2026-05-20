import { VictoryAxisProps } from 'victory';
import { ThemeMode } from '@dt-advisory/styles/theme';

export const axisStyle: VictoryAxisProps['style'] = {
  axis: { display: 'none' },
  ticks: { display: 'none' },
  tickLabels: { display: 'none' },
};

const MIN_BOUND_LIGHT_COLOR = '#E5EBF1';
const MIN_BOUND_DARK_COLOR = '#485670';
const MAX_BOUND_LIGHT_COLOR = '#D9DFE5';
const MAX_BOUND_DARK_COLOR = '#324873';

export const minBoundColors = {
  light: MIN_BOUND_LIGHT_COLOR,
  dark: MIN_BOUND_DARK_COLOR,
};

export const maxBoundColors = {
  light: MAX_BOUND_LIGHT_COLOR,
  dark: MAX_BOUND_DARK_COLOR,
};

export const minBoundGradients = {
  light: [
    { offset: '0%', stopColor: MIN_BOUND_LIGHT_COLOR, stopOpacity: 1 },
    { offset: '100%', stopColor: MIN_BOUND_LIGHT_COLOR, stopOpacity: 1 },
  ],

  dark: [
    { offset: '0%', stopColor: MIN_BOUND_DARK_COLOR, stopOpacity: 1 },
    { offset: '100%', stopColor: MIN_BOUND_DARK_COLOR, stopOpacity: 1 },
  ],
};

export const maxBoundGradients = {
  light: [
    { offset: '0%', stopColor: MAX_BOUND_LIGHT_COLOR, stopOpacity: 1 },
    { offset: '100%', stopColor: MAX_BOUND_LIGHT_COLOR, stopOpacity: 1 },
  ],
  dark: [
    { offset: '0%', stopColor: MAX_BOUND_DARK_COLOR, stopOpacity: 1 },
    { offset: '100%', stopColor: MAX_BOUND_DARK_COLOR, stopOpacity: 1 },
  ],
};

export const minBoundInactiveGradients = {
  light: [
    { offset: '0%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
    { offset: '100%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
  ],
  dark: [
    { offset: '0%', stopColor: '#D0D1D2', stopOpacity: 0.15 },
    { offset: '100%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
  ],
};

export const maxBoundInactiveGradients = {
  light: [
    { offset: '0%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
    { offset: '100%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
  ],
  dark: [
    { offset: '0%', stopColor: '#D0D1D2', stopOpacity: 0.15 },
    { offset: '100%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
  ],
};

export const minBoundStrokes = {
  light: '#C3CBD2',
  dark: '#485670',
};

export const maxBoundStrokes = {
  light: '#B7C1CA',
  dark: '#485670',
};

export const maxBoundInactiveStrokes = {
  light: '#292929',
  dark: '#D0D1D2',
};

export const minBoundInactiveStrokes = {
  light: '#292929',
  dark: '#D0D1D2',
};

export const esdStrokes = {
  light: '#1BA120',
  dark: '#1BA120',
};
export const ecdStrokes = {
  light: '#1BA120',
  dark: '#1BA120',
};
export const downholeMwdEcd = {
  light: '#1671FF',
  dark: '#34A9CC',
};
export const downholeMwdEcdStroke = {
  light: '#ffffff',
  dark: '#171C26',
};
export const inactiveStrokes = {
  light: '#292929',
  dark: '#D0D1D2',
};

export const inactiveEcdLineStyle = (mode: ThemeMode) => ({
  data: {
    stroke: inactiveStrokes[mode],
    strokeWidth: 2,
  },
});

export const ecdLineStyle = (mode: ThemeMode) => ({
  data: {
    stroke: ecdStrokes[mode],
    strokeWidth: 2,
  },
});

export const inactiveEsdLineStyle = (mode: ThemeMode) => ({
  data: {
    stroke: inactiveStrokes[mode],
    strokeWidth: 2,
    strokeDasharray: 6,
  },
});

export const esdLineStyle = (mode: ThemeMode) => ({
  data: {
    stroke: esdStrokes[mode],
    strokeWidth: 2,
    strokeDasharray: 6,
  },
});
