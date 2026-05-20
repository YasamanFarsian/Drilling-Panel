import { AppearanceEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVw } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import { css } from '@emotion/react';

export const containerStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const labelContainerStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  height: 100%;
  &:first-of-type {
    div:first-of-type {
      text-align: left;
      padding-left: 0;
    }
  }
`;

export const labelStyle: StyleFunction = (theme) => css`
  width: 100%;
  font-weight: 700;
  font-size: ${scalePxAsVw(22)}px;
  line-height: 2.2rem;
  color: ${theme.palette.text.primary};
  padding-right: ${scalePxAsVw(32)}px;
  padding-left: ${scalePxAsVw(32)}px;
`;

export const dividerStyle: StyleFunction = (theme) => css`
  border-color: ${theme.mode === AppearanceEnum.LIGHT ? '#DCDCDC ' : '#3A3E46'};
`;
// Logo
export const logoStyle = css`
  width: 3rem;
  height: 3rem;
  margin: 0 1.5rem;
`;
