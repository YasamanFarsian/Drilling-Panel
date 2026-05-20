import { StyleFunction, ThemeMode } from '@dt-advisory/styles/theme';
import { css } from '@emotion/react';

const labelContainerBg = {
  light: '#FFFFFF',
  dark: '#292929',
};

const borderColor = {
  light: '#DADADA',
  dark: '#414141',
};

const labelColor = {
  light: '#E28173',
  dark: '#E28173',
};

export const containerStyle: (mode: ThemeMode) => StyleFunction = (mode: ThemeMode) => (theme) =>
  css`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
  `;

export const labelContainerStyle: (mode: ThemeMode) => StyleFunction =
  (mode: ThemeMode) => (_theme) =>
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${labelContainerBg[mode]};
      border: 1px solid ${borderColor[mode]};
      box-sizing: border-box;
      border-radius: 12px;
      padding: 14px 45px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    `;

export const labelStyle: (mode: ThemeMode) => StyleFunction = (mode: ThemeMode) => (_theme) =>
  css`
    fontstyle: normal;
    color: ${labelColor[mode]};
    font-weight: 600;
    font-size: 30;
    text-align: center;
  `;

export const iconStyle: (mode: ThemeMode) => StyleFunction = (_mode: ThemeMode) => (theme) =>
  css`
      margin-left: ${theme.spacing(2)};
      color: ${labelColor[theme.mode]};
      & svg {
        font-size: 32;
      },  
`;
