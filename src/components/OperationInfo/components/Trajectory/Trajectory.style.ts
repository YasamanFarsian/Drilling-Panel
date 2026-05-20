import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const containerStyle: StyleFunction = (theme) => css`
  height: 100%;
  background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.bgColor};
`;

export const wrapperStyle: StyleFunction = (theme) => css`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  row-gap: ${theme.spacing(3)};
  & > div > div > table > thead > tr > th {
    font-size: ${scalePxAsVmin(12)}px !important;
  }
  & > div > div > table > tbody > tr > td {
    font-weight: 400 !important;
  }

  /* subtitle */

  & > div:first-of-type > div:first-of-type {
    line-height: 15px;
    padding-bottom: ${scalePxAsVh(16)}px !important;
  }

  & > div:last-of-type > div:first-of-type {
    line-height: 15px;
    padding-top: ${scalePxAsVh(8)}px !important;
    padding-bottom: ${scalePxAsVh(16)}px !important;
  }
`;
