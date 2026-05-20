import { useTheme } from '@emotion/react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  dialogActionStyle,
  dialogContainerStyle,
  submitBtnStyle,
} from './DeleteTemplateLayoutConfirmDialog.style';

export type DeleteTemplateLayoutConfirmDialogPropsType = {
  name: string;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
};

// eslint-disable-next-line max-lines-per-function
const DeleteTemplateLayoutConfirmDialog = ({
  name,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteTemplateLayoutConfirmDialogPropsType): JSX.Element => {
  const theme = useTheme();
  return (
    <Dialog
      data-testid="delete_template_layout_confirm_dialog_1677568422248"
      open
      sx={dialogContainerStyle(theme)}
    >
      <DialogTitle>
        <FormattedMessage id="userConfiguration.settings.templatesLayout.deleteTemplateDialog.title" />
      </DialogTitle>
      <DialogContent>
        <FormattedMessage
          id="userConfiguration.settings.templatesLayout.deleteTemplateDialog.description"
          values={{
            bold: ((chunks: React.ReactNode) => (
              <strong>{chunks}</strong>
            )) as unknown as React.ReactNode,
            name,
          }}
        />
      </DialogContent>
      <DialogActions css={dialogActionStyle}>
        <Button
          data-testid="delete_template_layout_confirm_dialog--cancelBtn"
          variant="text"
          color="secondary"
          onClick={onClose}
        >
          <FormattedMessage id="common.button.cancel" />
        </Button>
        <Button
          data-testid="delete_template_layout_confirm_dialog--confirmBtn"
          css={submitBtnStyle}
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          <FormattedMessage id="userConfiguration.settings.templatesLayout.deleteTemplateDialog.confirmBtn" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTemplateLayoutConfirmDialog;
