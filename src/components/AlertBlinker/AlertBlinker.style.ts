import { css, keyframes } from '@emotion/react';
import { StyleFunction, ThemeMode } from '@dt-advisory/styles/theme';

const alertBg = {
  light: '#0E121833',
  dark: '#FFFFFF1A',
};

const blink = keyframes`
  50% {
    opacity: 0;
  }  
`;

export const alertBlinkerStyle: (mode: ThemeMode) => StyleFunction =
  (mode: ThemeMode) => (_theme) => css`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: ${alertBg[mode]};
    animation: ${blink} 900ms 1s step-start infinite;
  `;
