import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useSnackbarStore } from '@dt-advisory/store/SnackbarStore';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useState } from 'react';

export const useDeleteLayout = (templateLayoutId: string, templateLayoutName: string) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const deleteTemplateById = useUserConfigurationStore((s) => s.deleteTemplateById);
  const purgeRoadmapSetting = useSettingsStore((s) => s.purgeRoadmap);
  const openSnackbar = useSnackbarStore((s) => s.actions.openSnackbar);

  const handleConfimDelete = () => {
    deleteTemplateById(templateLayoutId);
    purgeRoadmapSetting();
    openSnackbar(`${templateLayoutName} has been deleted`);
    setOpenDeleteDialog(false);
  };

  return {
    isDeleting: false,
    openDeleteDialog,
    handleOpenDeleteDialog: () => setOpenDeleteDialog(true),
    handleCloseDeleteDialog: () => setOpenDeleteDialog(false),
    handleConfimDelete,
  };
};
