import { css } from '@emotion/react';
import { SxProps } from '@mui/material';
import { DefaultTheme } from '@mui/styles';
import {
  scalePxAsVh,
  scalePxAsVmin,
  scalePxAsVw,
} from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const submitBtnStyle = css`
  padding: 0 ${scalePxAsVw(16)}px;
`;

export const dialogContainerStyle = (theme: DefaultTheme): SxProps => ({
  [theme.breakpoints.up('4k')]: {
    maxWidth: 800,
    width: scalePxAsVw(600),
  },
  [theme.breakpoints.down('4k')]: {
    width: scalePxAsVw(420),
  },
  height: scalePxAsVh(303),
  border: theme.userConfigSetting.layout.containerBorder,

  '.MuiDialogActions-root': {
    padding: `${scalePxAsVh(24)}px ${scalePxAsVw(24)}px !important`,
    button: {
      height: `${scalePxAsVh(40)}px`,
      fontSize: `${scalePxAsVmin(14)}px`,
      fontWeight: 700,
    },
    'button:first-of-type': {
      padding: `0 ${scalePxAsVw(14)}px`,
    },

    'button:last-of-type': {
      padding: `${scalePxAsVh(10)}px ${scalePxAsVw(14)}px`,
    },
  },
  '.MuiDialogTitle-root': {
    fontSize: `${scalePxAsVmin(18)}px`,
    fontWeight: 700,
    color: theme.userConfigSetting.layout.dialog.headerFontColor,
    padding: `0 ${scalePxAsVw(24)}px !important`,
    paddingTop: `${scalePxAsVh(24)}px !important`,
    paddingBottom: `${scalePxAsVh(8)}px !important`,
  },
  '.MuiDialogContent-root': {
    padding: `0 ${scalePxAsVw(24)}px !important`,
    fontSize: `${scalePxAsVmin(14)}px`,
    fontWeight: 400,
    color: theme.userConfigSetting.layout.dialog.descriptonFontColor,
    '.MuiBox-root > label': {
      fontSize: `${scalePxAsVmin(12)}px`,
      fontWeight: 700,
      color: theme.userConfigSetting.layout.dialog.inputlabelFontColor,
    },

    '.MuiBox-root': {
      marginTop: `${scalePxAsVh(32)}px`,
    },

    '.MuiBox-root > .MuiFormControl-root > .MuiInputBase-root': {
      marginTop: '8px',
    },

    input: {
      height: `${scalePxAsVh(48)}px`,
      fontSize: `${scalePxAsVmin(14)}px`,
      fontWeight: 500,
    },
  },
});
