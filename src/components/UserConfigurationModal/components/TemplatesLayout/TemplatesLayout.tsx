import { Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import TemplateNameFormDialog from './components/TemplateNameFormDialog';
import TemplatesLayoutBody from './components/TemplatesLayoutBody';
import {
  templateLayoutContainerStyle,
  templateLayoutHeaderLabelStyle,
  templateLayoutHeaderStyle,
} from './TemplatesLayout.style';
import { useCreateTemplate } from './useCreateTemplate';

// eslint-disable-next-line max-lines-per-function
const TemplatesLayout = (): JSX.Element => {
  const {
    isCreating,
    openCreateTemplateDialog,
    handleOpenCreateTemplateDialog,
    handleCloseCreateTemplateDialog,
    handleCreateTemplate,
    createTemplateDialogTitleLabel,
    initialValue,
  } = useCreateTemplate();

  return (
    <Box css={templateLayoutContainerStyle}>
      <div css={templateLayoutHeaderStyle}>
        <div css={templateLayoutHeaderLabelStyle}>
          <FormattedMessage id="userConfiguration.settings.templatesLayout.title" />
        </div>
      </div>
      <TemplatesLayoutBody />
      {openCreateTemplateDialog && (
        <TemplateNameFormDialog
          titleLabel={createTemplateDialogTitleLabel}
          onClose={handleCloseCreateTemplateDialog}
          onSave={handleCreateTemplate}
          isSubmitting={isCreating}
          initialValue={initialValue}
        />
      )}
    </Box>
  );
};

export default TemplatesLayout;
