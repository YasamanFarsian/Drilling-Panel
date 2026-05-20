import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useState } from 'react';

export const useDuplicateLayout = (templateId: string) => {
  const [openDuplicateDialog, setOpenDuplicateDialog] = useState(false);
  const getDuplicateTemplateById = useUserConfigurationStore((s) => s.getDuplicateTemplateById);
  const getTemplateById = useUserConfigurationStore((s) => s.getTemplateById);
  const appendTemplate = useUserConfigurationStore((s) => s.appendTemplate);

  const templateById = getTemplateById(templateId);
  const newNameAsDuplicateTemplate = `${templateById?.name} (Copy)`;

  const handleDuplicateLayout = (templateName: string) => {
    const duplicateTemplate = getDuplicateTemplateById(templateId, templateName);
    if (!duplicateTemplate) return;
    appendTemplate(duplicateTemplate);
    setOpenDuplicateDialog(false);
  };

  return {
    isDuplicating: false,
    openDuplicateDialog,
    handleOpenDuplicateDialog: () => setOpenDuplicateDialog(true),
    handleCloseDuplicateDialog: () => setOpenDuplicateDialog(false),
    handleDuplicateLayout,
    newNameAsDuplicateTemplate,
    duplicateDialogTitleLabel: 'Duplicate Template',
  };
};
