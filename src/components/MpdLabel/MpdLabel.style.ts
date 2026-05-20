import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: StyleFunction = (theme) => css`
  position: absolute;
  left: 4rem;
  bottom: 0;
  background-color: transparent;
`;

export const mdpStyle: StyleFunction = (theme) => css`
  text-transform: uppercase;
  font-weight: normal;
`;
