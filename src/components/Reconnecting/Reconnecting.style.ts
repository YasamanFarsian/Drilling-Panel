import { StyleFunction } from '@dt-advisory/styles/theme';
import { css } from '@emotion/react';

const labelContainerBg = {
  light: '#FFFFFF',
  dark: '#171C26',
};

const borderColor = {
  light: '#DADADA',
  dark: '#414141',
};

const labelColor = {
  light: '#1C1C1A',
  dark: '#FFFFFF',
};

export const containerStyle: StyleFunction = (theme) => css`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 25;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;
export const labelContainerStyle: StyleFunction = (theme) => css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${labelContainerBg[theme.mode]};
  border: 1px solid ${borderColor[theme.mode]};
  box-sizing: border-box;
  border-radius: 12px;
  padding: 14px 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const labelStyle: StyleFunction = (theme) => css`
  font-style: normal;
  color: ${labelColor[theme.mode]};
  font-weight: 600;
  font-size: 3rem;
  text-align: center;
`;
export const iconStyle: StyleFunction = (theme) => css`
  margin-left: ${theme.spacing(1)};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${labelColor[theme.mode]};
  & svg {
    font-size: 3.2rem;
  }
  animation: reconnecting-spin infinite 2s linear;
  @keyframes reconnecting-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(-360deg);
    }
  }
`;
