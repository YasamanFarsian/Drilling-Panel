import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: StyleFunction = (theme) => css`
  display: flex;
  gap: ${theme.spacing(4)};
  padding: ${theme.spacing(3, 0)};
  flex-wrap: wrap;

  > * {
    height: 20rem;
    width: 24.6rem;
  }
`;
