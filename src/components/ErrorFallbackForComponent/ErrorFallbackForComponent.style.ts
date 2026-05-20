import { StyleFunction, ThemeMode } from '@dt-advisory/styles/theme';
import { css } from '@emotion/react';

const containerBg = {
  light: 'rgba(255, 255, 255, 0.5)',
  dark: 'rgba(13, 13, 13, 0.5)',
};

export const containerStyle: (mode: ThemeMode) => StyleFunction = (mode: ThemeMode) => (theme) =>
  css`
    width: 100%;
    height: 100%;
    background: ${containerBg[mode]};
  `;
