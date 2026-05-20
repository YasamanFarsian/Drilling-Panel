import { Box } from '@mui/material';
import React from 'react';
import { containerStyle } from './NoWidget.style';

const NoWidget = (): JSX.Element => {
  return <Box data-testid="no_widget" css={containerStyle}></Box>;
};

export default NoWidget;
