/* eslint-disable max-lines-per-function */
// https://grid.layoutit.com/
import { css } from '@emotion/react';
import { WidgetLayoutEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { CustomizedTheme, StyleFunction } from '@dt-advisory/styles/theme';

const containerStyle: StyleFunction = (theme) => css`
  .container {
    display: grid;
    grid-auto-flow: row dense;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: ${theme.spacing(1)} ${theme.spacing(1)};
    grid-template-areas:
      'one two three'
      'one two three';
  }
`;

const containerOneStyle = css`
  .one {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: '.';
    grid-area: one;
  }
`;

const containerThreeStyle: StyleFunction = (theme) => css`
  .three {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: ${theme.spacing(1)} ${theme.spacing(1)};
    grid-template-areas:
      '.'
      '.';
    grid-area: three;
  }
`;

const containerTwoStyle: StyleFunction = (theme) => css`
  .two {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: ${theme.spacing(1)} ${theme.spacing(1)};
    grid-template-areas:
      '.'
      '.';
    grid-area: two;
  }
`;

const oneRowOneWidgetStyle: StyleFunction = (theme) => css`
  grid-template-columns: 1fr;
  grid-template-rows: 100%;
`;

const oneRowThreeWidgetsStyle: StyleFunction = (theme) => css`
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100%,  
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },          
`;

const oneRowFourWidgetsStyle: StyleFunction = (theme) => css`
  ${containerStyle(theme)}
  ${containerOneStyle}
  .two {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: ${theme.spacing(1)} ${theme.spacing(1)};
    grid-template-areas: '.';
    grid-area: two;
  }
  ${containerThreeStyle(theme)};
`;
const oneRowFiveWidgetsStyle: StyleFunction = (theme) => css`
  ${containerStyle(theme)}
  ${containerOneStyle}
  ${containerTwoStyle(theme)}
  ${containerThreeStyle(theme)};
`;

const twoRowsSixWidgetsStyle: StyleFunction = (theme) => css`
  ${containerStyle(theme)}
  ${containerOneStyle}
  .one {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: ${theme.spacing(1)} ${theme.spacing(1)};
    grid-template-areas: '.';
    grid-area: one;
  }
  ${containerTwoStyle(theme)}
  ${containerThreeStyle(theme)};
`;

const getLayoutStyle = (layout: WidgetLayoutEnum, theme: CustomizedTheme) => {
  switch (layout) {
    case WidgetLayoutEnum.OneRowOneWidget:
      return oneRowOneWidgetStyle(theme);
    case WidgetLayoutEnum.OneRowThreeWidgets:
      return oneRowThreeWidgetsStyle(theme);
    case WidgetLayoutEnum.OneRowFourWidgets:
      return oneRowFourWidgetsStyle(theme);
    case WidgetLayoutEnum.OneRowFiveWidgets:
      return oneRowFiveWidgetsStyle(theme);
    case WidgetLayoutEnum.TwoRowsSixWidgets:
      return twoRowsSixWidgetsStyle(theme);
    default:
      return undefined;
  }
};

export const layoutStyle: (layout: WidgetLayoutEnum) => StyleFunction = (layout) => (theme) => css`
  height: 100%;
  display: grid;
  grid-gap: ${theme.spacing(1)};
  ${getLayoutStyle(layout, theme)};
`;
