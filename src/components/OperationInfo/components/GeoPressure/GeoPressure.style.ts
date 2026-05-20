/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { css } from '@emotion/react';
import { VictoryTheme, VictoryThemeDefinition } from 'victory';
import { StyleFunction } from '@dt-advisory/styles/theme';
import {
  scalePxAsVh,
  scalePxAsVmin,
  scalePxAsVw,
} from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const geoPressureTogglerContainerStyle = css`
  display: flex;
  justify-content: space-between;
`;
export const containerStyle: StyleFunction = (theme) => css`
  height: 100%;
  background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.bgColor};
  padding-bottom: ${theme.spacing(2)};
`;

export const tableStyle = css`
  & div > table > thead > tr > th {
    font-size: ${scalePxAsVmin(12)}px !important;
  }

  & div > table > tbody > tr > td {
    font-weight: 400 !important;
  }
`;

export const wrapperStyle: StyleFunction = (theme) => css`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: flex-start;
  column-gap: ${theme.spacing(3)};
`;

export const widgetContainerStyle: StyleFunction = (theme) => css`
  width: 100%;
  aspect-ratio: 1.403;
  border-radius: 0.8rem;
  background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.headRowBgColor};
  border: 0.5px solid ${theme.userConfigSetting.summaryOfConfiguration.layout.borderColor};
`;

export const getDefaultTheme = (isDark: boolean): VictoryThemeDefinition => ({
  axis: {
    offsetY: scalePxAsVh(60),
    offsetX: scalePxAsVw(60),
    style: {
      ...VictoryTheme.grayscale.axis!.style,
      axis: { stroke: 'transparent', fontSize: 12 },
      axisLabel: {
        fill: 'currentColor',
        fontFamily: 'inherit',
        fontSize: scalePxAsVmin(12),
        color: isDark ? '#FBFBFB' : '#1C1C1A',
        fontWeight: '700',
      },
      ticks: { stroke: 'currentColor', size: 8 },
      tickLabels: {
        fill: 'currentColor',
        fontFamily: 'inherit',
        fontSize: scalePxAsVmin(12),
        color: isDark ? '#FBFBFB' : '#1C1C1A',
        fontWeight: '700',
        lineHeight: 22,
      },
    },
  },
});

export const skeletonContainerStyle: StyleFunction = (theme) => css`
  padding: ${theme.spacing(1)};
`;

/**
 * Widget
 * */
export const getAxisStyle = (isDark: boolean, tickSize: number) => ({
  ticks: { stroke: isDark ? '#FBFBFB' : '#1C1C1A', size: tickSize },
  tickLabels: { fontWeight: '700' },
});
export const getAreaStyle = (isDark: boolean) => ({
  data: { fill: isDark ? '#324873' : '#D9DFE5' },
});

export const redColor = '#D65340';
export const greenColor = '#1BA120';
