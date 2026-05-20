import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVw } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const firstMenuItemStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 100%;
`;

export const fillStyle = css`
  width: 100%;
  flex: 1;
`;

export const menuItemStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  min-height: 100%;
  width: 100%;
  font-size: ${scalePxAsVh(12)}px;
  font-weight: 700;
`;

export const svgIconStyle = css`
  height: 100%;
  margin-right: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const dropDownMenuStyle: StyleFunction = (theme) => css`
  & .MuiMenu-paper {
    border-radius: 1.1rem;
    border: ${theme.widget.dropdown.borderColor};
  }
`;

export const dropDownMenuItemStyle: StyleFunction = (theme) => css`
  & .MuiMenuItem-root {
    margin: ${theme.spacing(2)} 0;
    font-weight: 500;
    font-size: ${scalePxAsVh(12)}px;
  }
`;
