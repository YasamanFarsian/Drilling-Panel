import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const settingHeaderContainerStyle: (isRemoveBorderBottom: boolean) => StyleFunction =
  (isRemoveBorderBottom: boolean) => (theme) => css`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${0};
    border-bottom: ${isRemoveBorderBottom
      ? '0px'
      : `1px solid ${theme.safeguide.header.borderBottomColor}`};

    .MuiIconButton-root {
      padding: 0;
    }
  `;

export const iconButtonStyle = (isSmartRop: boolean) => css`
  margin-left: ${isSmartRop ? '0.8rem' : '1.2rem'};
`;

export const titleStyle: () => StyleFunction = () => (theme) => css`
  color: ${theme.safeguide.setting.labelColor};
  font-weight: 700;
  line-height: '0';
  font-size: ${scalePxAsVh(12)}px;
  text-transform: uppercase;
  margin-left: ${theme.spacing(2)};
`;

export const iconStyle: () => StyleFunction = () => (theme) => css`
  &.MuiSvgIcon-root {
    display: grid;
    place-items: center;
    fill: ${theme.safeguide.setting.iconColor};
    margin-top: '4px';
    width: '16px';
    height: '24px';
  }
`;
