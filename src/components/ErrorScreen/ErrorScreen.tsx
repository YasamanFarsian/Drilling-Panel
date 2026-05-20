import { Box } from '@mui/material';
import React from 'react';

const ErrorScreen = (): JSX.Element => {
  return (
    <Box
      data-testid="error_screen"
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="paper"
    >
      <h1>Error Loading Configurations</h1>
    </Box>
  );
};

export default ErrorScreen;
