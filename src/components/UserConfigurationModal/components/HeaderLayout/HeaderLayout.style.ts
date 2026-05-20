import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import { MODAL_LAYOUT_PADDING_X } from '../../UserConfigurationModal.style';

export const headerTitleStyle = css`
  font-weight: 700;
  font-size: ${scalePxAsVmin(16)}px !important;
  line-height: ${scalePxAsVh(24)}px;
`;

export const headerContainer = css`
  align-self: center;
  padding: ${scalePxAsVh(24)}px ${MODAL_LAYOUT_PADDING_X}px;
  height: 100%;
  justify-content: space-evenly;
`;

export const dropDownContainerStyle: StyleFunction = (theme) => css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;

  > div > div > div {
    font-weight: 500 !important;
  }

  > .MuiBox-root {
    margin-right: ${theme.spacing(3)};
  }

  > .MuiBox-root:last-of-type {
    margin-right: 0;
  }

  > .MuiBox-root > .MuiInputBase-root {
    color: ${theme.userConfigSetting.layout.headerLayout.dropdownFontColor};
    font-weight: 500;
  }
`;
