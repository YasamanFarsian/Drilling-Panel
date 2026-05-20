import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const addBtnStyle: StyleFunction = (theme) => css`
  padding: ${theme.spacing(0, 4)};
  color: ${theme.userConfigSetting.layout.templateLayouts.widgetCatalog.buttonTextColor};
`;

export const dialogStyle: StyleFunction = (theme) => css`
  .MuiDialog-paper {
    min-width: 31rem;
    max-width: 86.6rem;
    background: ${theme.userConfigSetting.layout.templateLayouts.widgetCatalog.bg};
    border: ${theme.userConfigSetting.layout.templateLayouts.widgetCatalog.containerBorder};
  }

  .MuiDialogTitle-root {
    display: flex;
    align-items: center;
    padding: ${theme.spacing(4, 4, 3)};
    gap: ${theme.spacing(2)};

    svg {
      width: 4rem;
      height: 4rem;
    }
  }
  .MuiDialogContent-root {
    display: flex;
    flex-direction: column;
    padding: ${theme.spacing(0, 4)};
  }

  .MuiDialogActions-root {
    padding: ${theme.spacing(2, 3)};
    box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.08);
    border-top: 0px !important;
  }
`;

export const widgetCatalogDescriptionStyle: StyleFunction = (theme) => css`
  color: ${theme.userConfigSetting.layout.templateLayouts.widgetCatalog.descriptionColor};
`;

export const widgetCatalogDividerStyle: StyleFunction = (theme) => css`
  border-top: 1px solid ${theme.userConfigSetting.layout.templateLayouts.widgetCatalog.dividerLine};
  margin-top: ${theme.spacing(3)};
`;
