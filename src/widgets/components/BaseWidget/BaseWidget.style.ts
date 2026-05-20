import { StyleFunction } from '@dt-advisory/styles/theme';
import { css } from '@emotion/react';

export const paperStyle: StyleFunction = (theme) => css`
  background-color: ${theme.mode === 'dark' ? 'rgb(23, 28, 38)' : '#FFFFFF'};
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  border-radius: ${theme.common.baseWidget.borderRadius};
  box-shadow: 0px 0.4rem 2.4rem 0px rgba(0, 0, 0, 0.08);
  width: 100%;
  border: ${theme.common.baseWidget.containerBorder};
`;

export const rootStyle = css`
  position: relative;
  display: flex;
  align-items: flex-start;
`;

export const headerWrapperStyle: StyleFunction = (theme) => css`
  flex: 1;
  & header {
    padding: 16px 16px 8px 16px !important;
  }

  & header > div.titleWrapper {
    display: flex;
    align-items: center;
  }

  & header.RoadmapDrag,
  header.RoadmapTorque {
    padding: ${theme.common.baseWidget.headerTop}px ${theme.common.baseWidget.headerRight}px
      ${theme.common.baseWidget.headerBottom}px ${theme.common.baseWidget.headerLeft}px !important;
  }

  & header > div.titleWrapper div.titleLabels {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const statusStyle = css`
  opacity: 0.5;
`;

export const widgetContentStyle: (
  horizontalFluid?: boolean,
  hideLabel?: boolean,
  isSmartRopSetting?: boolean,
) => StyleFunction = (horizontalFluid, hideLabel, isSmartRopSetting) => (_theme) => {
  const paddingForHorizontalFluid = horizontalFluid || isSmartRopSetting ? '0px' : '8px';
  const paddingForHideLabel = hideLabel ? '16px' : '0px';
  return css`
    ${_theme.breakpoints.down('lg')} {
      padding: 0;
    }
    padding: 0px
      ${paddingForHorizontalFluid + ' ' + paddingForHideLabel + ' ' + paddingForHorizontalFluid};
    position: absolute;
    width: 100%;
    height: 100%;
  `;
};

export const contentStyle = css`
  position: relative;
`;

export const widgetValidity: StyleFunction = (theme) => css`
  border-radius: ${theme.common.baseWidget.borderRadius};
  border: #fff;
`;
