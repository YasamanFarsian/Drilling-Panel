import { useTheme } from '@emotion/react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { iconStyle, labelContainerStyle, labelStyle } from '../ErrorFallback/ErrorFallback.style';
import { containerStyle } from './ErrorFallbackForComponent.style';

const ErrorFallbackForComponent = (): JSX.Element => {
  const theme = useTheme();
  return (
    <div data-testid="error_fallback_for_component_1676987859521" css={containerStyle(theme.mode)}>
      <div css={labelContainerStyle(theme.mode)}>
        <div css={labelStyle(theme.mode)}>
          <FormattedMessage id={'common.error.fallback'} />
        </div>
        <div css={iconStyle(theme.mode)}>
          <ErrorOutlineIcon />
        </div>
      </div>
    </div>
  );
};

export default ErrorFallbackForComponent;
