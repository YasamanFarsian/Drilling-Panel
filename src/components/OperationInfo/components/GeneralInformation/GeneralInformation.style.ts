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
  > div > table > tbody > tr:nth-of-type(6) {
    td {
      padding: ${scalePxAsVh(10)}px ${scalePxAsVw(20)}px !important;
    }
    > td:first-of-type {
      color: ${theme.userConfigSetting.summaryOfConfiguration.layout.labelHeaderColor};
      font-size: ${scalePxAsVmin(12)}px !important;
      line-height: 16px !important;
    }
  }
`;

export const sixLabelBold = css`
  > .MuiTableRow-root {
    td {
      padding: ${scalePxAsVh(8)}px ${scalePxAsVw(20)}px !important;
    }
    > td:first-of-type {
      font-weight: 400;
    }
  }
  > .MuiTableRow-root:nth-of-type(6) {
    > td:first-of-type {
      font-weight: bold;
      padding: ${scalePxAsVh(10)}px ${scalePxAsVw(20)}px !important;
    }
  }
`;
