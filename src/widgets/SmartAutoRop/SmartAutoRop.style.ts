import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: (isLoading: boolean, isSmallVersion?: boolean) => StyleFunction =
  (isLoading, isSmallVersion) => (theme) => css`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: ${isSmallVersion ? 'row' : 'column'};
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
