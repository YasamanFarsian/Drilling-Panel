import { css } from '@emotion/react';
import { AppearanceEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const containerStyle = css`
  &:hover {
    cursor: pointer;
  }
`;

export const iconButtonColor: StyleFunction = (theme) => css`
  width: ${scalePxAsVh(48)}px;
  height: ${scalePxAsVh(48)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${theme.mode === AppearanceEnum.LIGHT ? '#FFFFFF' : '#1C2430'};
  }
`;

export const iconStyle: StyleFunction = (theme) => css`
  width: ${scalePxAsVh(28)}px;
  height: ${scalePxAsVh(28)}px;
  flex-shrink: 0;
  path {
    fill: ${theme.mode === AppearanceEnum.LIGHT ? '#0000' : '#FFFFFF'};
  }
`;
