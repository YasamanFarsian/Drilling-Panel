import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import { userConfigurationSettingsKeys } from '@dt-advisory/api/queryKeysFactories/userConfigurationSettingsKeys';
import { createLayout } from '@dt-advisory/api/settings/settings.query';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';

// eslint-disable-next-line max-lines-per-function
export const useDuplicateLayout = (templateId: string) => {
  const { formatMessage } = useIntl();
  const [openDuplicateDialog, setOpenDuplicateDialog] = useState(false);
  const getDuplicateTemplateById = useUserConfigurationStore(
    (state) => state.getDuplicateTemplateById,
  );

  const getTemplateById = useUserConfigurationStore((state) => state.getTemplateById);

  const appendTemplate = useUserConfigurationStore((state) => state.appendTemplate);

  const newLayout = useMutation({
    mutationKey: userConfigurationSettingsKeys.createLayout(),
    mutationFn: createLayout,
  });

  const handleOpenDuplicateDialog = () => setOpenDuplicateDialog(true);
  const handleCloseDuplicateDialog = () => setOpenDuplicateDialog(false);

  const templateById = getTemplateById(templateId);

  const newNameAsDuplicateTemplate = `${templateById?.name} (Copy)`;

  const handleDuplicateLayout = async (templateName: string) => {
    const duplicateTemplate = getDuplicateTemplateById(templateId, templateName);
    if (!duplicateTemplate) return;

    try {
      const apiId = await newLayout.mutateAsync(duplicateTemplate);
      appendTemplate(duplicateTemplate, apiId);
    } catch {
      appendTemplate(duplicateTemplate);
    } finally {
      handleCloseDuplicateDialog();
    }
  };

  return {
    isDuplicating: newLayout.isLoading,
    openDuplicateDialog,
    handleOpenDuplicateDialog,
    handleCloseDuplicateDialog,
    handleDuplicateLayout,
    newNameAsDuplicateTemplate,
    duplicateDialogTitleLabel: formatMessage({
      id: 'userConfiguration.settings.templatesLayout.templateNameFormDialog.title.duplicateTemplate',
    }),
  };
};
