import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useState } from 'react';

export const useEditTemplateName = (templateId: string) => {
  const [openEditTemplateNameDialog, setOpenEditTemplateNameDialog] = useState(false);
  const getTemplateById = useUserConfigurationStore((s) => s.getTemplateById);
  const updateTemplateById = useUserConfigurationStore((s) => s.updateTemplateById);

  const handleEditTemplateName = (templateName: string) => {
    const template = getTemplateById(templateId);
    if (!template) return;
    const { id, ...templateBody } = template;
    updateTemplateById(id, { ...templateBody, name: templateName });
    setOpenEditTemplateNameDialog(false);
  };

  return {
    isEditingTemplateName: false,
    openEditTemplateNameDialog,
    handleOpenEditTemplateNameDialog: () => setOpenEditTemplateNameDialog(true),
    handleCloseEditTemplateNameDialog: () => setOpenEditTemplateNameDialog(false),
    handleEditTemplateName,
    editTemplateNameDialogTitleLabel: 'Edit Template',
  };
};
