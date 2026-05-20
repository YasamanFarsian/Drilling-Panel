import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const warningAnimationContainerStyle = css`
  .MuiToggleButton-root {
    width: 17.8rem !important;
  }
`;

export const inputContainerStyle: StyleFunction = (theme) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  > .MuiBox-root:first-of-type {
    margin-right: ${theme.spacing(1)};
  }
`;

export const unitValueStyle: StyleFunction = (theme) => css`
  font-weight: 500;
  font-size: ${scalePxAsVmin(14)}px;
  line-height: ${scalePxAsVh(20)}px;
  color: ${theme.palette.text.primary};
`;
