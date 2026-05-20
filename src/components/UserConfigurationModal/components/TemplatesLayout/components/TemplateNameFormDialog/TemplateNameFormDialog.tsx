import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { dialogContainerStyle, submitBtnStyle } from './TemplateNameFormDialog.style';
import { useTemplateDialogNameForm } from './useTemplateDialogNameForm';

export type TemplateNameFormDialogPropsType = {
  initialValue?: string;
  titleLabel: string;
  onClose: () => void;
  onSave: (templateName: string) => void;
  isSubmitting: boolean;
  isDuplicate?: boolean;
};
// eslint-disable-next-line max-lines-per-function
const TemplateNameFormDialog = ({
  initialValue,
  titleLabel,
  onClose,
  onSave,
  isSubmitting,
}: TemplateNameFormDialogPropsType): JSX.Element => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { templateName, errorMessage, handleChange, handleSubmit } = useTemplateDialogNameForm({
    onSave,
    initialValue,
  });

  return (
    <Dialog
      disableRestoreFocus
      data-testid="template_name_form_dialog"
      open
      PaperProps={{
        sx: dialogContainerStyle(theme),
      }}
    >
      <DialogTitle>{titleLabel}</DialogTitle>
      <DialogContent>
        <FormattedMessage id="userConfiguration.settings.templatesLayout.templateNameFormDialog.description" />
        <Box mt={4}>
          <InputLabel>
            <FormattedMessage id="userConfiguration.settings.templatesLayout.templateNameFormDialog.inputLabel" />
          </InputLabel>
          <TextField
            inputProps={{ 'data-testid': 'template_name_form_dialog--inputField', autoFocus: true }}
            variant="outlined"
            fullWidth
            autoFocus
            error={!!errorMessage}
            helperText={errorMessage}
            placeholder={formatMessage({
              id: 'userConfiguration.settings.templatesLayout.templateNameFormDialog.inputPlaceholder',
            })}
            value={templateName}
            onChange={(event) => handleChange(event)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          data-testid="template_name_form_dialog--cancelBtn"
          variant="text"
          color="secondary"
          onClick={onClose}
        >
          <FormattedMessage id="common.button.cancel" />
        </Button>
        <Button
          data-testid="template_name_form_dialog--saveBtn"
          css={submitBtnStyle}
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={isSubmitting || templateName.length === 0}
        >
          <FormattedMessage id="userConfiguration.settings.templatesLayout.templateNameFormDialog.save" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TemplateNameFormDialog;
