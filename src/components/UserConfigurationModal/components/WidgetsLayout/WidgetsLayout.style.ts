import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';

import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import { MODAL_LAYOUT_PADDING_X } from '../../UserConfigurationModal.style';

export const containerStyle: StyleFunction = (theme) => css`
  background-color: ${theme.userConfigSetting.layout.widgetsLayout.containerBgColor};
  padding: ${scalePxAsVh(24)}px ${MODAL_LAYOUT_PADDING_X}px;
  align-self: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const headerTitleStyle: StyleFunction = (theme) => css`
  font-weight: 700;
  font-size: ${scalePxAsVmin(16)}px;
  line-height: 2.4rem;
  color: ${theme.palette.text.primary};
`;

export const widgetsLayoutContainerStyle: StyleFunction = (theme) => css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding-top: ${scalePxAsVh(24)}px;
  .MuiBox-root {
    margin-right: ${theme.spacing(4)};
  }
`;

const baseWidgetStyle = (theme: Theme, isSelected: boolean) => css`
  box-sizing: border-box;
  cursor: pointer;
  height: ${scalePxAsVh(82)}px;
  width: ${scalePxAsVh(120)}px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: ${isSelected
    ? theme.userConfigSetting.layout.widgetsLayout.selectedWidgetsLayoutsBgColor
    : theme.userConfigSetting.layout.widgetsLayout.widgetsLayoutsBgColor};
  border-radius: 0.6rem;
  ${theme.mode === 'dark' && `border: 1px solid ${isSelected ? '#FFFFFF' : '#636A78'}`}
`;

export const widgetStyle =
  (isSelected: boolean): StyleFunction =>
  (theme) =>
    baseWidgetStyle(theme, isSelected);

export const OneRowThreeWidgetsStyle = widgetStyle;
export const OneRowFourWidgetsStyle = widgetStyle;
export const OneRowFiveWidgetsStyle = widgetStyle;
export const TwoRowsSixWidgetsStyle = widgetStyle;
