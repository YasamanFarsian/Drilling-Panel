import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const containerStyle: StyleFunction = (theme) => css`
  height: 100%;
  background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.bgColor};
  padding-bottom: ${theme.spacing(2)};
`;

export const wrapperStyle: StyleFunction = (theme) => css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  column-gap: ${theme.spacing(3)};

  & > div > div > table > thead > tr > th {
    font-size: ${scalePxAsVmin(12)}px !important;
  }

  & > div > div > table > tbody > tr > td {
    font-weight: 400 !important;
    color: ${theme.userConfigSetting.summaryOfConfiguration.layout.labelColor};
  }

  /* subtitle */
  & > div > div:first-of-type {
    line-height: 15px;
    padding-bottom: ${scalePxAsVh(16)}px !important;
  }
`;
