import { css } from '@emotion/react';
import { SxProps } from '@mui/material';
import { DefaultTheme } from '@mui/styles';
import {
  scalePxAsVh,
  scalePxAsVmin,
  scalePxAsVw,
} from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const dialogActionStyle = css`
  border-top: none;
`;

export const submitBtnStyle = css`
  padding: 0 1.6rem;
`;

export const dialogContainerStyle = (theme: DefaultTheme): SxProps => ({
  '& .MuiDialog-paper': {
    [theme.breakpoints.up('4k')]: {
      maxWidth: 1000,
      width: scalePxAsVw(700),
    },
    [theme.breakpoints.up('2k')]: {
      maxWidth: 600,
      height: scalePxAsVh(200),
      width: scalePxAsVw(500),
    },
    width: scalePxAsVw(419),
    height: scalePxAsVh(221),
    border: theme.userConfigSetting.layout.containerBorder,
  },

  '.MuiPaper-root': {
    '& > .MuiTypography-root': {
      fontSize: `${scalePxAsVmin(18)}px`,
      fontWeight: 700,
      paddingTop: `${scalePxAsVh(24)}px`,
      paddingLeft: `${scalePxAsVw(24)}px`,
      paddingRight: `${scalePxAsVw(24)}px`,
      color: theme.userConfigSetting.layout.dialog.headerFontColor,
    },
    '& > .MuiDialogContent-root': {
      fontSize: `${scalePxAsVmin(14)}px`,
      fontWeight: 400,
      color: theme.userConfigSetting.layout.dialog.descriptonFontColor,
      paddingLeft: `${scalePxAsVw(24)}px`,
      paddingRight: `${scalePxAsVw(24)}px`,
      paddingBottom: `${scalePxAsVh(32)}px`,
    },
    '.MuiDialogActions-root': {
      padding: `${scalePxAsVh(24)}px ${scalePxAsVw(24)}px`,
    },
  },

  'button:first-of-type': {
    padding: `0 ${scalePxAsVw(14)}px`,
  },

  'button:last-of-type': {
    padding: `${scalePxAsVh(10)}px ${scalePxAsVw(14)}px`,
  },

  button: {
    height: `${scalePxAsVh(40)}px`,
    fontSize: `${scalePxAsVmin(14)}px`,
  },
});
