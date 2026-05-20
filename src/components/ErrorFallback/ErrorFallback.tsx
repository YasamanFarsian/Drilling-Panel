/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/styles';
import React from 'react';
import { useIntl } from 'react-intl';
import { containerStyle, iconStyle, labelContainerStyle, labelStyle } from './ErrorFallback.style';

const ErrorFallback = ({ localeKey }: any): JSX.Element => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const message = formatMessage({
    id: localeKey ?? 'common.error.fallback',
    defaultMessage: 'Sorry an error occurred',
  });
  return (
    <div data-testid="error_fallback" css={containerStyle(theme.mode)}>
      <div css={labelContainerStyle(theme.mode)}>
        <div css={labelStyle(theme.mode)}>{message}</div>
        <div css={iconStyle(theme.mode)}>
          <ErrorOutlineIcon />
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
