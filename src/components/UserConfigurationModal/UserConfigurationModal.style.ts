import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import {
  scalePxAsVh,
  scalePxAsVmin,
  scalePxAsVw,
} from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

const iconBg = {
  light: '#F6F6F6',
  dark: '#1C2430',
};

const iconColor = {
  light: '#3D3D3D',
  dark: '#FFFFFF',
};

export const MODAL_LAYOUT_PADDING_X = scalePxAsVw(32);

export const modalStyle: StyleFunction = (theme) => css`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 96%;
  height: 96%;
  background-color: ${theme.palette.background.paper};
  border-radius: 1rem;
  box-shadow: ${theme.shadows[5]};
  padding: ${scalePxAsVh(32)}px 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999991;
  outline: none;
  border: ${theme.userConfigSetting.layout.containerBorder};
`;

export const headerStyle: StyleFunction = (theme) => css`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 ${MODAL_LAYOUT_PADDING_X}px;
`;

export const titleStyle: StyleFunction = (theme) => css`
  font-size: ${scalePxAsVmin(26)}px;
  font-weight: 700;
  color: ${theme.palette.text.primary};
  width: 100%;
  line-height: 32px;
`;

export const iconContainerStyle: StyleFunction = (theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: ${scalePxAsVh(48)}px;
  height: ${scalePxAsVh(48)}px;
  background-color: ${iconBg[theme.mode]};
  & .MuiSvgIcon-root {
    color: ${iconColor[theme.mode]};
    font-size: ${scalePxAsVmin(24)}px !important;
  }
  border-radius: 50%;
`;
