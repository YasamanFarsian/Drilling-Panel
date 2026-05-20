import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';

export const pieTheme = (themeMode: Theme['mode']) => ({
  data: {
    fill: 'light' === themeMode ? '#DCDCDC' : '#3A3E46',
  },
});

export const arrowPointer = (themeMode: Theme['mode']) => ({
  data: {
    fill: 'light' === themeMode ? '#000' : '#fff',
  },
});

export const valueStyle = (themeMode: Theme['mode']) => ({
  fill: themeMode === 'light' ? '#000' : '#fff',
  fontSize: '1.4vw',
  fontWeight: 500,
});

export const axeStyle = (themeMode: Theme['mode']) => ({
  fill: themeMode === 'light' ? '#000' : '#fff',
  fontSize: '0.7vw',
  fontWeight: 500,
});

export const labelStyle = (themeMode: Theme['mode']) => ({
  fill: themeMode === 'light' ? '#000' : '#fff',
  fontSize: '0.7vw',
  fontWeight: 600,
});

export const chartContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
