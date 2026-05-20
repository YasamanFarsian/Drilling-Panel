import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import {
  scalePxAsVh,
  scalePxAsVmin,
  scalePxAsVw,
} from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const containerStyle: StyleFunction = (theme) => css`
  height: 100%;
  background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.bgColor};
  padding-bottom: ${theme.spacing(2)};
`;

export const tableContainerStyle: StyleFunction = (theme) => css`
  display: grid;
  grid-template-columns: 65% 1fr;
  align-items: center;

  div.MuiTableContainer-root:first-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    > table > tbody > tr:nth-of-type(7) > td {
      color: ${theme.userConfigSetting.summaryOfConfiguration.layout.labelHeaderColor};
      font-size: ${scalePxAsVmin(12)}px !important;
      line-height: ${scalePxAsVh(16)}px !important;
      padding: ${scalePxAsVh(10)}px ${scalePxAsVw(20)}px !important;
    }
  }

  div.MuiTableContainer-root:last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    tr:first-of-type {
      td:first-of-type {
        font-weight: 700;
        color: ${theme.userConfigSetting.summaryOfConfiguration.layout.labelHeaderColor};
        font-size: ${scalePxAsVmin(12)}px !important;
        line-height: ${scalePxAsVh(16)}px !important;
      }
      td {
        padding: ${scalePxAsVh(10)}px ${scalePxAsVw(20)}px !important;
      }
    }
    tr > td {
      font-weight: 400;
      padding: ${scalePxAsVh(8)}px ${scalePxAsVw(20)}px !important;
    }

    > tr,
    td:last-of-type {
      font-weight: 700;
      padding: ${scalePxAsVh(8)}px ${scalePxAsVw(20)}px !important;
    }
  }
`;

export const sevenLabelBold = css`
  > .MuiTableRow-root {
    > td:first-of-type {
      font-weight: 400;
    }
    td {
      padding: ${scalePxAsVh(8)}px ${scalePxAsVw(20)}px !important;
    }
  }
  > .MuiTableRow-root:nth-of-type(7) {
    > td:first-of-type {
      font-weight: bold;
    }
  }
`;
