import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const containerStyle = css`
  width: 100%;
  position: relative;
  padding: 0px !important;
  height: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  margin-top: 0.8rem;

  & .MuiToggleButtonGroup-root {
    margin-top: 1.6rem;
    margin-bottom: 1.6rem;
    width: 100%;
  }
`;

export const toggleContainerStyle = css`
  margin-top: 0rem;
`;

export const headerLabelStyle: StyleFunction = (theme) => css`
  font-size: ${scalePxAsVh(12)}px;
  font-weight: 700;
  color: ${theme.roadmap.setting.toggleButton.titleHeaderColor};
`;
