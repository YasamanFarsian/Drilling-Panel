import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVmin } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import { MODAL_LAYOUT_PADDING_X } from '../../UserConfigurationModal.style';

export const templateLayoutContainerStyle: StyleFunction = (theme) => css`
  padding: ${scalePxAsVh(32)}px ${MODAL_LAYOUT_PADDING_X}px ${scalePxAsVh(14)}px;
  overflow: hidden;
  align-self: start;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const templateLayoutHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const templateLayoutHeaderLabelStyle: StyleFunction = (theme) => css`
  font-weight: 700;
  font-size: ${scalePxAsVmin(16)}px;
  line-height: 2.4rem;
  color: ${theme.palette.text.primary};
`;

export const newTemplateButton: StyleFunction = (theme) => css`
  padding: 0 ${scalePxAsVh(24)}px;
  height: ${scalePxAsVh(48)}px;
  font-size: ${scalePxAsVmin(16)}px;
  line-height: ${scalePxAsVh(24)}px;

  & > span > svg {
    font-size: ${scalePxAsVmin(22)}px !important;
  }
`;
