import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import { userConfigurationSettingsKeys } from '@dt-advisory/api/queryKeysFactories/userConfigurationSettingsKeys';
import { updateLayout } from '@dt-advisory/api/settings/settings.query';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';

// eslint-disable-next-line max-lines-per-function
export const useEditTemplateName = (templateId: string) => {
  const { formatMessage } = useIntl();
  const [openEditTemplateNameDialog, setOpenEditTemplateNameDialog] = useState(false);

  const getTemplateById = useUserConfigurationStore((state) => state.getTemplateById);
  const updateTemplateById = useUserConfigurationStore((state) => state.updateTemplateById);

  const editName = useMutation({
    mutationKey: userConfigurationSettingsKeys.updateLayout(templateId),
    mutationFn: updateLayout,
  });

  const handleOpenEditTemplateNameDialog = () => setOpenEditTemplateNameDialog(true);
  const handleCloseEditTemplateNameDialog = () => setOpenEditTemplateNameDialog(false);

  const handleEditTemplateName = async (templateName: string) => {
    const template = getTemplateById(templateId);

    if (!template) return;
    const { id, ...templateBody } = template;
    const newTemplateBody = { ...templateBody, name: templateName };

    try {
      await editName.mutateAsync({
        id,
        payload: newTemplateBody,
      });
    } catch {
    } finally {
      updateTemplateById(templateId, newTemplateBody);
      handleCloseEditTemplateNameDialog();
    }
  };

  return {
    isEditingTemplateName: editName.isLoading,
    openEditTemplateNameDialog,
    handleOpenEditTemplateNameDialog,
    handleCloseEditTemplateNameDialog,
    handleEditTemplateName,
    editTemplateNameDialogTitleLabel: formatMessage({
      id: 'userConfiguration.settings.templatesLayout.templateNameFormDialog.title.editTemplate',
    }),
  };
};
