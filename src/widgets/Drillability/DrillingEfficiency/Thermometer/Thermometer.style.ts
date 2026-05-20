import { StyleFunction } from '@dt-advisory/styles/theme';
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';

export const labelStyle: StyleFunction = (theme) => css`
  white-space: nowrap;
  font-family: ${theme.typography.fontFamily};
  text-align: center;
  font-size: 1.2vw;
  font-weight: 600;
  fill: ${theme.drillability.charts.labelColor};
`;

export const chartContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  padding-top: 1rem;
`;
export const lableTheme = (themeMode: Theme['mode']) => ({
  data: {
    fill: 'light' === themeMode ? '#000' : '#fff',
    fontFamily: 'Helvetica Neue',
    fontWeight: 700,
  },
});
export const barTheme = (themeMode: Theme['mode']) => ({
  data: {
    fill: 'light' === themeMode ? '#DCDCDC' : '#3A3E46',
  },
});
