import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const LoadingPage = (): JSX.Element => {
  return (
    <Box p={4} display="flex" justifyContent="center" alignItems="center" bgcolor="paper">
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;
