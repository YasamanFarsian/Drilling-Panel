import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const iconStyle: StyleFunction = (theme) => css`
  fill: ${'dark' === theme.mode ? '#000000' : '#A4A4A3'};
`;
