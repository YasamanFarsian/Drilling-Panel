import { css } from '@emotion/react';
import { Theme } from '@mui/material';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

const inputStyle = (theme: Theme, viewportUnit: boolean) => ({
  fontWeight: 500,
  height: `${!viewportUnit ? '' : scalePxAsVmin(22)}px`,
  fontSize: `${!viewportUnit ? '1.4rem' : scalePxAsVh(12) + 'px'}`,
  lineHeight: `${!viewportUnit ? '2rem' : scalePxAsVh(20) + 'px'}`,
  color: theme.palette.text.secondary,
});

export const textFieldStyle: (viewportUnit: boolean, isSmallVersion: boolean) => StyleFunction =
  (viewportUnit, isSmallVersion) => (theme) => css`
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &.MuiTextField-root:hover fieldset {
      border-color: #dcdcdc;
    }
    &.MuiTextField-root .MuiInputBase-root {
      border-radius: ${!isSmallVersion ? theme.spacing(1) : theme.spacing(0.5)};
    }

    input {
      ${inputStyle(theme, viewportUnit)}
    }
    justify-content: center;
  `;

export const inputAdornmentStyle: StyleFunction = (theme) => css`
  ${inputStyle(theme, false)}
`;
