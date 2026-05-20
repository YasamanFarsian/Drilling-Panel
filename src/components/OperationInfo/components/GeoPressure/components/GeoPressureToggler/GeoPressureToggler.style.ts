import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

const themeButtonBg = {
  light: '#E8E8E8',
  dark: '#0E1218',
};

export const geoPressureToggleBtnStyle: StyleFunction = (theme) => css`
  border-color: transparent;
  background-color: ${themeButtonBg[theme.mode]};
  font-size: ${scalePxAsVh(14)}px;
  text-transform: none;
  color: ${theme.common.toggleButton.unselectedTextColor};
  border-radius: 6px;
  padding: 6px 24px;
  &:hover {
    background-color: transparent;
  }

  &.Mui-selected {
    background-color: ${themeButtonSelected[theme.mode]};
  }
`;

const themeButtonSelected = {
  light: '#FFFFFF',
  dark: '#1C2430',
};

export const geoPressureTogglerStyle: StyleFunction = (theme) => css`
  background-color: ${themeButtonBg[theme.mode]};
  border-color: transparent;
  border-radius: 8px;
  padding: 3px;
`;
