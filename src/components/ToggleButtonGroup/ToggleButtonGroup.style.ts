import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const toggleGroupStyle: (isSmallVersion: boolean) => StyleFunction =
  (_isSmallVersion: boolean) => (theme) => css`
    border-radius: ${theme.spacing(1)};
    box-shadow: none;
    padding: ${theme.spacing(0)};
  `;

export const toggleButtonStyle: (viewportUnit: boolean, isSmallVersion: boolean) => StyleFunction =
  (viewportUnit, isSmallVersion) => (theme) => css`
    &.MuiToggleButton-root {
      width: 100%;
      height: ${!isSmallVersion
        ? scalePxAsVmin(44) + 'px'
        : isSmallVersion
          ? '28px'
          : !viewportUnit
            ? '4.4rem'
            : '44px'};
      border-radius: 0.6rem;
      text-transform: none;
      font-size: ${isSmallVersion ? 12 : scalePxAsVh(16)}px;
      font-weight: 700;
      line-height: ${isSmallVersion ? scalePxAsVh(12) : scalePxAsVh(24)}px;

      color: ${theme.common.toggleButton.unselectedTextColor};

      &:not(:last-child) {
        margin-right: 0.5rem !important;
      }

      border: none;
    }

    &.Mui-selected {
      border-radius: 0.6rem !important;
      box-shadow:
        0px 1px 8px rgba(0, 0, 0, 0.06),
        0px 1px 5px -1px rgba(0, 0, 0, 0.02),
        0px 1px 4px rgba(0, 0, 0, 0.1);
      color: ${theme.common.toggleButton.selectedTextColor};
    }
  `;
