import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const baseWidgetStyle: StyleFunction = (theme) => css`
  padding: 0px !important;
  & header {
    padding: ${theme.spacing(2, 3, 1, 3)};
  }
`;

export const containerStyle: (isLoading: boolean) => StyleFunction = (isLoading) => (theme) => css`
  position: relative;
  height: 100%;
  width: 100%;
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
