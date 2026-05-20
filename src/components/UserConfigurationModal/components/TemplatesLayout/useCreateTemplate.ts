import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useState } from 'react';

export const useCreateTemplate = () => {
  const [openCreateTemplateDialog, setOpenCreateTemplateDialog] = useState(false);
  const getNewTemplate = useUserConfigurationStore((state) => state.getNewTemplate);
  const appendTemplate = useUserConfigurationStore((state) => state.appendTemplate);

  const handleCreateTemplate = (templateName: string) => {
    const newTemplate = getNewTemplate(templateName);
    appendTemplate(newTemplate);
    setOpenCreateTemplateDialog(false);
  };

  return {
    isCreating: false,
    openCreateTemplateDialog,
    handleOpenCreateTemplateDialog: () => setOpenCreateTemplateDialog(true),
    handleCloseCreateTemplateDialog: () => setOpenCreateTemplateDialog(false),
    handleCreateTemplate,
    createTemplateDialogTitleLabel: 'Create New Template',
    initialValue: 'New Template',
  };
};
