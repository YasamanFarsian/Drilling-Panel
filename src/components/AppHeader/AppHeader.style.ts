import { css } from '@emotion/react';
import { AppearanceEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const wrapperStyle: StyleFunction = () => css`
  width: 100%;
  padding: 2.4rem 2.4rem 0 2.4rem;
  z-index: 101;
`;

export const containerStyle: StyleFunction = (theme) => css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  button.MuiIconButton-root,
  .MuiToggleButtonGroup-root,
  .app-header-button-space {
    margin-right: ${theme.spacing(2)};
  }
  button.MuiIconButton-root:last-of-type {
    margin-right: 0;
  }
`;

export const iconButtonColor: StyleFunction = (theme) => css`
  width: ${scalePxAsVh(48)}px;
  height: ${scalePxAsVh(48)}px;
  &.MuiIconButton-root {
    background-color: ${theme.mode === AppearanceEnum.LIGHT ? '#FFFFFF' : '#1C2430'};
  }
  &:hover {
    background-color: ${theme.mode === AppearanceEnum.LIGHT ? '#FFFFFF' : '#1C2430'};
  }
`;

export const switchStyle = css`
  width: ${scalePxAsVh(108)}px;
  height: ${scalePxAsVh(56)}px;
  padding: 0;
  .MuiSwitch-switchBase {
    padding: 0;
    margin: 5;
  }
  .MuiSwitch-track {
    border-radius: 3.2rem;
  }
  .MuiSwitch-thumb {
    width: 5.2rem;
    height: 4.8rem;
  }
`;

export const iconStyle: StyleFunction = (theme) => css`
  width: ${scalePxAsVh(28)}px;
  height: ${scalePxAsVh(28)}px;
  flex-shrink: 0;

  path {
    fill: ${theme.mode === AppearanceEnum.LIGHT ? '#1C1C1A' : '#FFFFFF'};
  }
`;

export const liveIconStyle = css`
  width: ${scalePxAsVh(51)}px;
  height: ${scalePxAsVh(50)}px;
`;

export const syncingIconStyle = css`
  width: ${scalePxAsVh(85)}px;
  height: ${scalePxAsVh(50)}px;
`;
