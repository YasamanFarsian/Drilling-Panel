import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: StyleFunction = (theme) => css`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1, 6rem;
`;
