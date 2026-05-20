import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const baseWidgetStyle: StyleFunction = (theme) => css`
  & header {
    box-shadow: inset 0 -1px 0 ${theme.drillability.header.borderBottomColor};
    background-color: ${theme.drillability.header.backgroundColor};
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
`;

export const containerStyle: (isLoading: boolean) => StyleFunction = (isLoading) => (theme) => css`
  position: relative;
  height: 100%;
  & text {
    font-family: ${theme.typography.fontFamily};
    color: ${theme.palette.text.primary};
  }
  ${isLoading
    ? `
      display: grid;
      place-items: center;
    `
    : undefined}
`;
