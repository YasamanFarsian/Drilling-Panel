import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import { css } from '@emotion/react';

export const containerStyle = css`
  min-width: 18rem;
  max-width: 27rem;
  max-height: 4.8rem;
  width: 100%;
`;

export const selectStyle: (viewportUnit: boolean) => StyleFunction =
  (viewportUnit) => (theme) => css`
    color: ${theme.palette.text.secondary};
    .MuiSelect-outlined {
      font-size: ${viewportUnit ? scalePxAsVh(14) + 'px' : '1.4rem'};
      line-height: 2rem;
      font-weight: 700;
      padding: ${scalePxAsVh(14)}px ${scalePxAsVh(20)}px;
      span {
        color: ${theme.userConfigSetting.layout.headerLayout.dropdownDefaultFontColor};
      }
    }
  `;

export const iconStyle: StyleFunction = (theme) => css`
  margin-right: ${theme.spacing(2)};
`;
const getColor = (isSelected?: boolean) => {
  if ('boolean' === typeof isSelected) {
    return isSelected ? 'background-color: #95b8d114' : 'background-color: transparent';
  }
  return undefined;
};
export const menuStyle: (isSelected?: boolean) => StyleFunction = (isSelected) => (theme) => css`
  color: ${theme.userConfigSetting.layout.headerLayout.dropdownFontColor};
  font-size: ${scalePxAsVmin(14)}px;
  line-height: 2rem;
  font-weight: 500;
  &.Mui-selected {
    ${getColor(isSelected)}
  }
  padding: ${scalePxAsVh(16)}px ${scalePxAsVh(20)}px;
`;

export const placeHolderStyle: StyleFunction = (theme) => css`
  font-size: ${scalePxAsVmin(14)}px;
  line-height: 2rem;
  font-weight: 500;
  color: ${theme.palette.text.secondary};
`;
