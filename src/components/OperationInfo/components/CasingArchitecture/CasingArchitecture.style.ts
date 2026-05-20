import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const tableStyle = css`
  & > tr > td {
    font-weight: 400 !important;
  }
`;

export const containerStyle: StyleFunction = (theme) => css`
  height: 100%;
  background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.bgColor};

  & > div > table > thead > tr > th {
    font-size: ${scalePxAsVmin(12)}px !important;
  }
`;
