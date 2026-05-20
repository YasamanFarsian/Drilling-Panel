import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: (isLoading: boolean) => StyleFunction = (isLoading) => (theme) => css`
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
