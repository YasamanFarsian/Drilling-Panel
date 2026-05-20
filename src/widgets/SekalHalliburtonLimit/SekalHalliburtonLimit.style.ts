import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: (isLoading: boolean) => StyleFunction = (isLoading) => (theme) => css`
  position: relative;
  height: 100%;
  display: flex;
  padding: 1rem 1rem 2.3rem;
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
