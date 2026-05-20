import { StyleFunction } from '@dt-advisory/styles/theme';
import { css } from '@emotion/react';

const timerBg = {
  light: '#FFFFFF',
  dark: '#292929',
};

const timerColor = {
  light: '#DF2536',
  dark: '#FF5968',
};

export const containerStyle: StyleFunction = () => css`
  width: 32.8rem;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  z-index: 999;
`;
export const trapezoidStyle: StyleFunction = (theme) => css`
  position: relative;
  height: 4.8rem;
  background: ${timerBg[theme.mode]};
  box-shadow: 0px 0px 3.2rem rgba(0, 0, 0, 0.35);
  transform: perspective(1rem) rotateX(-1deg);
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0.6rem;
  border-bottom-left-radius: 0.6rem;
  border: ${theme.widget.noConnection.containerBorder};
`;
export const labelContainerStyle: StyleFunction = () => css`
  position: absolute;
  width: 100%;
  top: 0;
  padding: 1.4rem 4.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const labelStyle: StyleFunction = (theme) => css`
  font-style: normal;
  color: ${timerColor[theme.mode]};
  font-weight: 600;
  font-size: 1.6rem;
`;
