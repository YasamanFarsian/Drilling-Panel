import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const containerStyle: StyleFunction = (theme) => css`
  height: 100%;
  background-color: ${theme.userConfigSetting.summaryOfConfiguration.layout.bgColor};

  & > div > div > table > thead > tr > th {
    font-size: ${scalePxAsVmin(12)}px !important;
  }

  & > div > div > table > tbody > tr > td {
    font-weight: 400 !important;
  }
`;

export const legendStyle: StyleFunction = (theme) => css`
  margin-top: ${theme.spacing(1)};
  margin-left: ${theme.spacing(1)};
  display: flex;
  align-items: center;
  font-size: ${scalePxAsVmin(13)}px;
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${theme.spacing(1)};
    > span {
      font-weight: 700;
    }
  }
`;
