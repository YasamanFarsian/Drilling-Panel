import { Box, Typography } from '@mui/material';
import React from 'react';
import { titleStyleExample } from './NotFoundPage.style';

const NotFoundPage = (): JSX.Element => (
  <Box
    p={4}
    height={300}
    display="flex"
    justifyContent="center"
    alignItems="center"
    bgcolor="paper"
  >
    <Typography variant="h5" color="textSecondary" css={titleStyleExample}>
      Page Not Found
    </Typography>
  </Box>
);

export default NotFoundPage;
