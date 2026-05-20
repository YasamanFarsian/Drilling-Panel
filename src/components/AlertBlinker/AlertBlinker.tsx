import { useTheme } from '@mui/styles';
import React from 'react';
import { alertBlinkerStyle } from './AlertBlinker.style';

const AlertBlinker = (): JSX.Element => {
  const theme = useTheme();
  return <div data-testid="alert_blinker" css={alertBlinkerStyle(theme.mode)} />;
};

export default AlertBlinker;
