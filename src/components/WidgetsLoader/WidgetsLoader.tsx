import { Box, Typography } from '@mui/material';
import React from 'react';
import { containerStyle } from './WidgetsLoader.style';

const WidgetsLoader = (): JSX.Element => {
  return (
    <Box data-testid="widgets_loader" css={containerStyle}>
      <Typography>...Importing widgets</Typography>
    </Box>
  );
};

export default WidgetsLoader;
