import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVw } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const wrapperStyle = css`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-right: ${scalePxAsVw(12)}px;
`;

export const containerStyle: StyleFunction = (theme) => css`
  height: ${scalePxAsVh(24)}px;
  white-space: nowrap;
  ${theme.breakpoints.down('lg')} {
    top: ${theme.spacing(0.1)};
    right: ${theme.spacing(0.1)};
    height: 2rem;
  }
  padding: ${scalePxAsVh(5)}px ${scalePxAsVw(12)}px;
  background: ${theme.widget.status.backgroundColor};
  box-sizing: border-box;
  border-radius: ${scalePxAsVh(5)}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const textStyle: StyleFunction = (theme) => css`
  font-weight: 700;
  font-style: normal;
  font-size: ${scalePxAsVh(8)}px;
  ${theme.breakpoints.up('lg')} {
    font-size: ${scalePxAsVh(10)}px;
  }
  ${theme.breakpoints.up('xl')} {
    font-size: ${scalePxAsVh(12)}px;
  }
  color: ${theme.widget.status.textColor};
  letter-spacing: 0.5;
  text-align: center;
  text-transform: uppercase;
`;
