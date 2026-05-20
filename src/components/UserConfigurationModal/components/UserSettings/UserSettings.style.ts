import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import { css } from '@emotion/react';
import { MODAL_LAYOUT_PADDING_X } from '../../UserConfigurationModal.style';

export const userSettingStyle = css`
  margin-left: ${MODAL_LAYOUT_PADDING_X}px;
  margin-right: ${MODAL_LAYOUT_PADDING_X}px;
`;

const tabColor = {
  light: '#7f7f7f',
  dark: '#7f7f7f',
};

const tabActiveColor = {
  light: '#1C1C1A',
  dark: '#FBFBFB',
};

export const tabRootStyle: StyleFunction = () => css`
  min-height: ${scalePxAsVh(32)}px;
  & .MuiTabs-flexContainer {
    padding-bottom: ${scalePxAsVh(12)}px;
  }
`;

export const tabStyle: StyleFunction = (theme) => css`
  font-size: ${scalePxAsVh(14)}px;
  font-weight: 700;
  line-height: 2rem;
  max-width: 550px !important;
  color: ${tabColor[theme.mode]};
  text-transform: none;
  padding: 0 1.6rem !important;
  &.Mui-selected {
    color: ${tabActiveColor[theme.mode]};
  }
  &.MuiButtonBase-root {
    min-height: 0rem;
  }
`;

export const layoutSettingTabPanelStyle: StyleFunction = (theme) => css`
  flex: 1;
  overflow: auto;
  & > .MuiBox-root {
    padding-bottom: 0;
    padding-top: 0;
  }
  height: 100%;
`;

export const layoutSettingsStyle = css`
  display: grid;
  grid-template-rows: 15% 20% auto;
  height: 100%;
`;
