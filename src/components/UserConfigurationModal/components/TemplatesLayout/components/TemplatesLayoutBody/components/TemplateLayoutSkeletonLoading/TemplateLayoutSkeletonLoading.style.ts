import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: StyleFunction = (theme) => css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing(1)};
  height: 20rem;
  padding-top: ${theme.spacing(2)};
`;
