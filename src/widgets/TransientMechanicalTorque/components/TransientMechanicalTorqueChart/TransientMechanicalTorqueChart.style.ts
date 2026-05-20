import { VictoryAxisProps } from 'victory';
import { ThemeMode } from '@dt-advisory/styles/theme';

export const axisStyle: VictoryAxisProps['style'] = {
  axis: { display: 'none' },
  ticks: { display: 'none' },
  tickLabels: { display: 'none' },
};

export const inactiveTorqueLineStyle = (mode: ThemeMode) => ({
  data: {
    stroke: inactiveTorqueStrokes[mode],
    strokeWidth: 2,
  },
});

export const torqueLineStyle = (mode: ThemeMode) => ({
  data: {
    stroke: torqueStrokes[mode],
    strokeWidth: 2,
  },
});

const TORSIONAL_LIMIT_LIGHT_COLOR = '#E5EBF1';
const TORSIONAL_LIMIT_BLACK_COLOR = '#324873';

export const torsionalLimitGradients = {
  light: [
    { offset: '0%', stopColor: TORSIONAL_LIMIT_LIGHT_COLOR, stopOpacity: 1 },
    { offset: '100%', stopColor: TORSIONAL_LIMIT_LIGHT_COLOR, stopOpacity: 1 },
  ],
  dark: [
    { offset: '0%', stopColor: TORSIONAL_LIMIT_BLACK_COLOR, stopOpacity: 1 },
    { offset: '100%', stopColor: TORSIONAL_LIMIT_BLACK_COLOR, stopOpacity: 1 },
  ],
};

export const torsionalLimitInactiveGradients = {
  light: [
    { offset: '0%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
    { offset: '100%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
  ],
  dark: [
    { offset: '0%', stopColor: '#D0D1D2', stopOpacity: 0.15 },
    { offset: '100%', stopColor: '#D0D1D2', stopOpacity: 0.5 },
  ],
};

export const torsionalLimitStrokes = {
  light: '#C3CBD2',
  dark: '#485670',
};

export const torsionalLimitInactiveStrokes = {
  light: '#292929',
  dark: '#D0D1D2',
};

export const inactiveTorqueStrokes = {
  light: '#292929',
  dark: '#D0D1D2',
};

export const torqueStrokes = {
  light: '#1BA120',
  dark: '#1BA120',
};
