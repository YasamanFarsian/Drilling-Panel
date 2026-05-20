import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const topGroupStyle: StyleFunction = (theme) => css`
  flex-basis: 29%;
  display: flex;
  padding-top: 1rem;
  border-bottom: 1px solid ${theme.drillability.charts.containerBorderColor};
  @media (max-width: 1440px) {
    flex-basis: 27%;
    padding-top: 0.6em;
  }
`;

export const thermsStyle: StyleFunction = (theme) => css`
  flex-grow: 1;
  display: flex;
  /*  @media (max-width: 1367px) {
  height:59vh;
  } */
  & .wrapperLine {
    border-right: 1px solid ${theme.drillability.charts.containerBorderColor};
  }
  & .wrapperLine:last-of-type {
    border-right: transparent;
  }
`;

export const wrapperStyle = css`
  flex-grow: 1;
  position: relative;
`;

export const wrapperDivStyle = css`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
