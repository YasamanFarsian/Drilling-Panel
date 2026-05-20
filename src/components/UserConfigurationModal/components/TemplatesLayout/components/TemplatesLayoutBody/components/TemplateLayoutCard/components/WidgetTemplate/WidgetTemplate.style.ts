import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const widgetTemplateContainerStyle: (isEditable: boolean) => StyleFunction =
  (isEditable) => (theme) => css`
    position: relative;
    height: 100%;
    border: 1px solid ${theme.userConfigSetting.layout.templateLayouts.templateCard.widget.border};
    border-radius: 4px;
    overflow: hidden;

    ${isEditable && 'cursor: pointer;'}
  `;

export const widgetOverlayStyle: StyleFunction = (theme) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.userConfigSetting.layout.templateLayouts.templateCard.widget.overlayBg};
  opacity: 0.5;
`;

export const imgStyle = css`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const widgetLabelStyle: StyleFunction = (theme) => css`
  --left: 1.2rem;
  --right: 1.2rem;
  position: absolute;
  left: var(--left);
  bottom: var(--right);
  max-width: calc(100% - var(--left) - var(--right));

  padding: 0.4rem 0.8rem;
  background: #ffffff;
  border: 1px solid
    ${theme.userConfigSetting.layout.templateLayouts.templateCard.widget.labelBorder};
  border-radius: 4px;

  text-transform: uppercase;
  font-weight: 700;
  font-size: ${scalePxAsVmin(10)}px;
  line-height: 1.5rem;
  letter-spacing: 0.005em;
  color: ${theme.userConfigSetting.layout.templateLayouts.templateCard.widget.labelFont};
  word-wrap: break-word;
`;

export const widgetDeleteIcon: StyleFunction = (theme) => css`
  position: absolute;
  right: 1rem;
  top: 1rem;
  padding: ${theme.spacing(0.5)};
  background: ${theme.userConfigSetting.layout.templateLayouts.templateCard.widget.deleteBtn.bg};
  color: ${theme.userConfigSetting.layout.templateLayouts.templateCard.widget.deleteBtn.icon};

  &:hover {
    background: ${theme.userConfigSetting.layout.templateLayouts.templateCard.widget.deleteBtn
      .bgHover};
  }

  svg {
    width: 1.6rem !important;
    height: 1.6rem !important;
  }
`;
