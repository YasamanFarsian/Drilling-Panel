import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import { MODAL_LAYOUT_PADDING_X } from '../../UserConfigurationModal.style';

export const containerStyle: StyleFunction = (theme) => css`
  display: flex;
  flex-direction: column;
  padding: 0 ${MODAL_LAYOUT_PADDING_X}px ${scalePxAsVh(24)}px;
  > .MuiBox-root {
    padding-bottom: ${theme.spacing(1)};
  }
`;
