/* eslint-disable max-lines-per-function */
import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const wellboreStyle: (isLoading: boolean) => StyleFunction = (isLoading) => (theme) => css`
  height: 100%;
  padding: 0px !important;
  & header {
    padding: ${theme.spacing(3, 3, 2, 3)};
  }
  & g#inclination text {
    font-family: ${theme.typography.fontFamily};
    fill: ${theme.palette.text.primary};
  }
  & g#inclination line {
    stroke: ${theme.palette.text.primary};
  }
  & g#axis-x line {
    stroke: ${theme.palette.text.primary};
  }
  & g#axis-x text {
    font-family: ${theme.typography.fontFamily};
    fill: ${theme.palette.text.primary};
    font-size: 1.4rem; // 14px
    font-weight: 500;
  }
  & g#axis-y line {
    stroke: ${theme.palette.text.primary};
  }
  & g#axis-y text {
    font-family: ${theme.typography.fontFamily};
    fill: ${theme.palette.text.primary};
    font-size: 1.4rem;
    font-weight: 500;
  }
  ${isLoading
    ? `
      display: grid;
      place-items: center;
    `
    : undefined}
`;
