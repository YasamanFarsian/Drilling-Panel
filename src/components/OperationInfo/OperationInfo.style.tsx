/* eslint-disable max-lines, max-lines-per-function */
import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import {
  scalePxAsVh,
  scalePxAsVmin,
  scalePxAsVw,
} from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

const PADDING_VALUE = 3.2;

export const gridItemContainerStyle: StyleFunction = (theme) => css`
  background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.gridItemBg};
  border: ${theme.userConfigSetting.summaryOfConfiguration.layout.gridItemBorder};
  border-radius: 1rem;
  padding: ${scalePxAsVh(32)}px ${scalePxAsVw(32)}px !important;
`;
export const titleStyle: StyleFunction = (theme) => css`
  font-size: ${scalePxAsVmin(16)}px;
  color: ${theme.userConfigSetting.summaryOfConfiguration.layout.titleColor};
  font-weight: 700;
  ${theme.breakpoints.up('lg')} {
    padding-bottom: ${scalePxAsVh(16)}px;
  }
  padding-bottom: ${scalePxAsVh(24)}px;
  line-height: 24px;
`;
export const subTitleStyle: StyleFunction = (theme) => css`
  font-size: ${scalePxAsVmin(12)}px;
  color: ${theme.userConfigSetting.summaryOfConfiguration.layout.subtitleColor};
  font-weight: 700;
`;

export const headerWrapperStyle = () => css`
  padding-bottom: ${scalePxAsVh(32)}px;
`;

export const paperStyle: StyleFunction = (theme) => css`
  position: absolute;
  width: 90%;
  height: 95%;
  background-color: ${theme.palette.background.paper};
  border-radius: 1rem;
  box-shadow: ${theme.shadows[5]};
  padding: ${scalePxAsVh(32)}px ${scalePxAsVw(32)}px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999991;
  border: ${theme.userConfigSetting.summaryOfConfiguration.containerBorder};
`;
export const iconContainerStyle: StyleFunction = (theme) => css`
  background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.iconBg};
  position: absolute;
  z-index: 1;
  top: ${theme.spacing(2)};
  right: ${theme.spacing(2)};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: ${scalePxAsVh(48)}px;
  height: ${scalePxAsVh(48)}px;
  & .MuiSvgIcon-root {
    color: ${theme.userConfigSetting.summaryOfConfiguration.layout.iconColor};
    font-size: ${scalePxAsVmin(24)}px !important;
  }
  border-radius: 50%;
`;
export const titleContainerStyle: StyleFunction = (theme) => css`
  font-weight: 700;
  font-size: ${scalePxAsVmin(26)}px;
  color: ${theme.userConfigSetting.summaryOfConfiguration.layout.containerTitleColor};
  text-transform: uppercase;
  line-height: 32px;
`;
export const containerStyle = (height: number) => css`
  position: relative;
  height: ${height - PADDING_VALUE * 10}px;
  display: grid;
`;

export const bodyContainerStyle: StyleFunction = () => css`
  height: 100%;
  th {
    padding: ${scalePxAsVh(10)}px ${scalePxAsVw(16)}px !important;
    line-height: ${scalePxAsVh(16)}px !important;
  }

  td {
    padding: ${scalePxAsVh(8)}px ${scalePxAsVw(16)}px !important;
    line-height: ${scalePxAsVh(20)}px !important;
    height: ${scalePxAsVh(36)}px;
  }
`;
export const gridContainerStyle: StyleFunction = (theme) => css`
  margin-top: ${theme.spacing(2)};
  & .drillstring {
    margin-left: ${theme.spacing(1)};
    padding-left: ${theme.spacing(1)};
  }
`;

export const container1c2r2c1rStyle: StyleFunction = (theme) => css`
  //margin-top: ${theme.spacing(2)};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px ${theme.spacing(2)};
  grid-template-areas: 'Col1 Col2';
  .Col1 {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: ${theme.spacing(2)} 0px;
    grid-template-areas:
      'r1'
      'r2';
    grid-area: Col1;
  }
  .r1 {
    grid-area: r1;
  }
  .r2 {
    grid-area: r2;
  }
  .Col2 {
    grid-area: Col2;
  }
`;

export const container2c1rStyle: StyleFunction = (theme) => css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: ${theme.spacing(2)} ${theme.spacing(2)};
  grid-template-areas: '. .';
`;
export const container1c1rStyle: StyleFunction = (theme) => css`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: ${theme.spacing(2)} ${theme.spacing(2)};
  grid-template-areas: '.';
`;
