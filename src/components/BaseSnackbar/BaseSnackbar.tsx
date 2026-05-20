import { Snackbar } from '@mui/material';
import React from 'react';
import ShortId from 'shortid';
import { useSnackbarStore } from '@dt-advisory/store/SnackbarStore';
import { calculationDuration } from './baseSnackbarHelpers';

const BaseSnackbar = (): JSX.Element => {
  const open = useSnackbarStore((state) => state.open);
  const message = useSnackbarStore((state) => state.message);
  const closeSnackbar = useSnackbarStore((state) => state.actions.closeSnackbar);

  return (
    <Snackbar
      data-testid="base_snackbar_1677723933877"
      key={ShortId.generate()}
      open={open}
      autoHideDuration={calculationDuration(message)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      onClose={closeSnackbar}
      message={message}
    />
  );
};

export default BaseSnackbar;
