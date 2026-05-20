/* eslint-disable max-lines-per-function */
import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const tableContainerStyle: StyleFunction = (theme) => css`
  border: 1px solid ${theme.userConfigSetting.summaryOfConfiguration.layout.borderColor};
  border-radius: ${theme.spacing(1)};
`;

export const tableRowStyle: (isAlternated: boolean) => StyleFunction =
  (isAlternated: boolean) => (theme) => css`
    background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.rowBgColor};
    ${isAlternated
      ? `&:nth-of-type(odd) {
        background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.alternatedRowsBgColor};
      }`
      : `
      &:nth-of-type(even) {
        background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.alternatedRowsBgColor};
      }
      `}
  `;

export const tableCellStyle: (isTransposed: boolean) => StyleFunction =
  (isTransposed: boolean) => (theme) => css`
    &.MuiTableCell-head {
      background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.headRowBgColor};
      font-size: ${scalePxAsVmin(14)}px;
      font-weight: 700;
      color: ${theme.userConfigSetting.summaryOfConfiguration.layout.headerColor};
      padding: ${theme.spacing(1)};
    }
    &.MuiTableCell-body {
      font-size: ${scalePxAsVmin(14)}px;
      font-weight: 500;
      color: ${theme.userConfigSetting.summaryOfConfiguration.layout.labelColor};
      padding: ${theme.spacing(1)};
      border: none;
      &:last-of-type {
        font-weight: ${isTransposed ? 700 : 500};
      }
    }
  `;
