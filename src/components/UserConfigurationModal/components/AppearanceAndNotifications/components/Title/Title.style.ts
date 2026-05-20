import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
type TitleStyleProps = {
  uppercase?: boolean;
};

export const titleStyle: (props: TitleStyleProps) => StyleFunction =
  (props: TitleStyleProps) => (theme) => css`
    font-weight: 700;
    font-size: ${scalePxAsVh(16)}px;
    color: ${theme.palette.text.primary};
    line-height: ${scalePxAsVh(24)}px;
    padding: ${scalePxAsVh(16)}px 0;
    ${props.uppercase ? 'text-transform: uppercase' : undefined}
  `;
