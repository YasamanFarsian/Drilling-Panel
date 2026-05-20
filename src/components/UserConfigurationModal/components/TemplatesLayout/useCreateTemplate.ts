import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import { userConfigurationSettingsKeys } from '@dt-advisory/api/queryKeysFactories/userConfigurationSettingsKeys';
import { createLayout } from '@dt-advisory/api/settings/settings.query';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';

// eslint-disable-next-line max-lines-per-function
export const useCreateTemplate = () => {
  const { formatMessage } = useIntl();
  const [openCreateTemplateDialog, setOpenCreateTemplateDialog] = useState(false);
  const getNewTemplate = useUserConfigurationStore((state) => state.getNewTemplate);
  const appendTemplate = useUserConfigurationStore((state) => state.appendTemplate);

  const handleOpenCreateTemplateDialog = () => setOpenCreateTemplateDialog(true);
  const handleCloseCreateTemplateDialog = () => setOpenCreateTemplateDialog(false);

  const newLayout = useMutation({
    mutationKey: userConfigurationSettingsKeys.createLayout(),
    mutationFn: createLayout,
  });

  const handleCreateTemplate = async (templateName: string) => {
    const newTemplate = getNewTemplate(templateName);

    try {
      const apiId = await newLayout.mutateAsync(newTemplate);
      appendTemplate(newTemplate, apiId);
    } catch {
      appendTemplate(newTemplate);
    } finally {
      handleCloseCreateTemplateDialog();
    }
  };

  return {
    isCreating: newLayout.isLoading,
    openCreateTemplateDialog,
    handleOpenCreateTemplateDialog,
    handleCloseCreateTemplateDialog,
    handleCreateTemplate,
    createTemplateDialogTitleLabel: formatMessage({
      id: 'userConfiguration.settings.templatesLayout.templateNameFormDialog.title.newTemplate',
    }),
    initialValue: formatMessage({
      id: 'userConfiguration.settings.templatesLayout.templateNameFormDialog.initialValue.newTemplate',
      defaultMessage: 'New Template',
    }),
  };
};
