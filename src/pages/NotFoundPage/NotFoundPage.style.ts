import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const titleStyleExample: StyleFunction = (theme) => css`
  font-size: 1.8rem;
  color: ${theme.mode === 'dark' ? 'red' : 'inherit'};
`;
