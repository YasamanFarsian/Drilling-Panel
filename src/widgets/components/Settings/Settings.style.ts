import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const iconButtonStyle: StyleFunction = (theme) => css`
  z-index: 10;
  padding: 0;
  color: ${theme.palette.text.primary};
  font-size: ${scalePxAsVh(theme.widget.settings.dimension)}px;
`;
