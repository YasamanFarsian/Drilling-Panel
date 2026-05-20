import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const widgetCatalogContainerStyle: StyleFunction = (theme) => css`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing(4)};
  padding: ${theme.spacing(2, 0)};
  margin-right: ${theme.spacing(-2.5)}; // for fixed scrollbar issue on linux and windows
`;

export const widgetCaptionStyle: StyleFunction = (theme) => css`
  text-align: center;
  font-weight: 700;
  padding-top: ${theme.spacing(2)};
`;

export const widgetItemStyle: StyleFunction = (theme) => css`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  &.disabledItem {
    opacity: 0.3;
    pointer-events: none;
  }

  .imgContainer {
    position: relative;
    width: 24.6rem;
    height: 40.6rem;

    border: ${theme.userConfigSetting.layout.templateLayouts.widgetCatalog.imageContainerBorder};
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
    }

    &.smallImg {
      height: 18.6rem;
    }

    .selectingItem {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: 4px solid #34a9cc;
      border-radius: 5px;
    }
  }
`;
