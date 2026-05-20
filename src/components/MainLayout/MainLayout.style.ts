import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: StyleFunction = (theme) => css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${theme.palette.background.default};
`;

export const contentStyle: StyleFunction = () => css`
  flex: 1;
  padding: 1.6rem 2.4rem 2.4rem 2.4rem;
`;
