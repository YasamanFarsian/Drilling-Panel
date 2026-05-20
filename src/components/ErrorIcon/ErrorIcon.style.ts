import { css } from '@emotion/react';
import { StyleFunction, ThemeMode } from '@dt-advisory/styles/theme';

const variants = {
  light: {
    errorIconBg: '#DF2536',
  },
  dark: {
    errorIconBg: '#DF2536',
  },
} as const;

export const errorIconStyle: (mode: ThemeMode) => StyleFunction =
  (mode: ThemeMode) => (theme) => css`
    color: variants[theme.mode].errorIconBg;
    backgroundcolor: #ffffff;
    width: 3.2rem;
    height: 3.2rem;
    border: 0.4rem solid ${variants[mode].errorIconBg};
    borderradius: 50%;
  `;
