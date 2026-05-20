import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import {
  scalePxAsVh,
  scalePxAsVmin,
  scalePxAsVw,
} from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const TEMPLATE_LAYOUT_CARD_WIDTH = 775;

export const templateCardContainerStyle: StyleFunction = (theme) => {
  return css`
    background: ${theme.userConfigSetting.layout.templateLayouts.templateCard.unselected.bg};
    border-radius: 0.8rem;
    height: 100%;
    display: flex;
    flex-direction: column;

    &.templateCardContainer--active {
      background: ${theme.userConfigSetting.layout.templateLayouts.templateCard.selected.bg};
      cursor: auto;

      .templateLayoutNameContainer {
        color: #ffffff !important;
      }

      .templateLayoutEditBtn {
        color: ${theme.userConfigSetting.layout.templateLayouts.templateCard.selected
          .editBtn} !important;
      }

      .templateLayoutDuplicateBtn {
        color: ${theme.userConfigSetting.layout.templateLayouts.templateCard.selected
          .duplicateBtn} !important;
      }

      .templateLayoutDeleteBtn {
        color: ${theme.userConfigSetting.layout.templateLayouts.templateCard.selected
          .deleteBtn} !important;
        opacity: 0.5;
      }
    }

    .templateLayoutContent {
      flex-grow: 1;
      padding: ${theme.spacing(2)};
    }

    .templateLayoutFooter {
      display: flex;
      align-items: center;
      padding: ${theme.spacing(0, 1, 1, 2)};
    }

    .templateLayoutNameContainer {
      flex: 1;
      display: flex;
      align-items: center;
      overflow: hidden;
      color: ${theme.palette.text.primary};

      .MuiRadio-root {
        padding: 0;
      }
      .templateLayoutName {
        margin-left: ${theme.spacing(2)};
        font-weight: 700;
        font-size: ${scalePxAsVmin(22)}px;
        white-space: nowrap;
        overflow: hidden;
        line-height: ${scalePxAsVh(28)}px;
        text-overflow: ellipsis;
      }

      .templateLayoutEditBtn {
        color: ${theme.userConfigSetting.layout.templateLayouts.templateCard.unselected.editBtn};
        ${theme.breakpoints.down('lg')} {
          padding: 0 !important;
        }
      }
    }

    .verticalLine {
      height: 2.8rem;
      margin: ${theme.spacing(0, 0.5)};
      border-left: 1px solid
        ${theme.userConfigSetting.layout.templateLayouts.templateCard.unselected.actionDividerLine};

      &--selected {
        border-left: 1px solid
          ${theme.userConfigSetting.layout.templateLayouts.templateCard.selected.actionDividerLine};
      }
    }

    .templateLayoutDeleteBtn {
      color: ${theme.userConfigSetting.layout.templateLayouts.templateCard.unselected.deleteBtn};
      ${theme.breakpoints.down('lg')} {
        padding: 0 !important;
      }
    }

    .templateLayoutDuplicateBtn {
      color: ${theme.userConfigSetting.layout.templateLayouts.templateCard.unselected.duplicateBtn};
      ${theme.breakpoints.down('lg')} {
        padding: 0 !important;
      }
    }

    svg {
      width: ${scalePxAsVw(28)}px;
      height: ${scalePxAsVh(28)}px;
    }
  `;
};
