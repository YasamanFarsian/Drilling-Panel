import { Box } from '@mui/material';
import React from 'react';
import { containerStyle } from './AppearanceAndNotifications.style';
import Notifications from './components/Notifications';
import OperationIdSelection from './components/OperationIdSelection';

const AppearanceAndNotifications = ({
  operationSelectEnabled,
}: {
  operationSelectEnabled: boolean;
}): JSX.Element => {
  return (
    <Box data-testid="appearance_and_notifications_1676544175517" css={containerStyle}>
      {operationSelectEnabled && <OperationIdSelection />}
      <Notifications />
    </Box>
  );
};

export default AppearanceAndNotifications;
