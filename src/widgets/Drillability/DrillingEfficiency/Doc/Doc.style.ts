import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';

export const valueStyle = (themeMode: Theme['mode']) => ({
  fill: themeMode === 'light' ? '#000' : '#fff',
  fontSize: '2.6vw',
  fontWeight: 500,
  fontFamily: 'Helvetica Neue',
});
export const labelStyle = (themeMode: Theme['mode']) => ({
  fill: themeMode === 'light' ? '#000' : '#fff',
  fontSize: '1.2vw',
  fontWeight: 600,
  fontFamily: 'Helvetica Neue',
});

export const chartContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
