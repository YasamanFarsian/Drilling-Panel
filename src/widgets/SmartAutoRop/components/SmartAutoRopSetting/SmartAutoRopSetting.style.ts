import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: StyleFunction = (theme) => css`
  padding: ${theme.spacing(2)};
  width: 100%;
`;

export const subHeaderStyle: StyleFunction = (theme) => css`
  margin-bottom: ${theme.spacing(3)};
`;

export const fieldContainerStyle: StyleFunction = (theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`;

export const inputLabelStyle: StyleFunction = (theme) => css`
  color: ${theme.smartAutoRop.setting.inputLabel};
`;
