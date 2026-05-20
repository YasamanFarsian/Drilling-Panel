import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVw } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

const timerColor = {
  light: '#DF2536',
  dark: '#FF5968',
};
const timerBg = {
  light: '#FFFFFF',
  dark: '#292929',
};

export const containerStyle: StyleFunction = (theme) => css`
  margin-left: ${scalePxAsVw(10)}px;
  margin-right: ${scalePxAsVw(10)}px;
  ${theme.breakpoints.down('md')} {
    margin-left: ${scalePxAsVw(5)}px;
    margin-right: 0rem;
  }
  position: relative;
  height: ${scalePxAsVw(24)}px;
  padding: ${scalePxAsVh(5)}px ${scalePxAsVw(12)}px;
  background: ${timerBg[theme.mode]};
  box-sizing: border-box;
  border: 0.1rem solid ${timerColor[theme.mode]};
  border-radius: ${scalePxAsVw(5)}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const iconContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${scalePxAsVw(13)}px;
  height: ${scalePxAsVh(13)}px;
`;

export const textStyle: StyleFunction = (theme) => css`
  font-weight: 500;
  font-style: normal;
  font-size: ${scalePxAsVw(12)}px;
  color: ${timerColor[theme.mode]};
  margin-left: ${scalePxAsVw(4)}px;
`;
