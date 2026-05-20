import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: (isEditable: boolean) => StyleFunction =
  (isEditable) => (theme) => css`
    filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.12));
    border-radius: 4px;
    background: ${theme.userConfigSetting.layout.templateLayouts.templateCard.widget.unsettledBg};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border: 1px solid ${theme.userConfigSetting.layout.templateLayouts.templateCard.widget.border};

    ${isEditable && 'cursor: pointer;'}

    svg {
      height: 3.6rem;
      width: 3.6rem;
    }
  `;
