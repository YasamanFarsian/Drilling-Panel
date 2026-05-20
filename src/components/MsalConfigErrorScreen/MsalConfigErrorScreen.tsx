import { Box } from '@mui/material';
import React from 'react';

const MsalConfigErrorScreen = (): JSX.Element => {
  return (
    <Box data-testid="msal_config_error_screen">
      <h1>Error Initializing Authentication Method</h1>
    </Box>
  );
};

export default MsalConfigErrorScreen;
