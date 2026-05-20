import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import { userConfigurationSettingsKeys } from '@dt-advisory/api/queryKeysFactories/userConfigurationSettingsKeys';
import { deleteLayout } from '@dt-advisory/api/settings/settings.query';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useSnackbarStore } from '@dt-advisory/store/SnackbarStore';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';

// eslint-disable-next-line max-lines-per-function
export const useDeleteLayout = (templateLayoutId: string, templateLayoutName: string) => {
  const deleteTemplateLayout = useMutation({
    mutationKey: userConfigurationSettingsKeys.deleteLayout(templateLayoutId),
    mutationFn: deleteLayout,
  });

  const { formatMessage } = useIntl();
  const openSnackbar = useSnackbarStore((state) => state.actions.openSnackbar);
  const deleteTemplateById = useUserConfigurationStore((state) => state.deleteTemplateById);
  const purgeRoadmapSetting = useSettingsStore((state) => state.purgeRoadmap);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const handleConfimDelete = async () => {
    try {
      await deleteTemplateLayout.mutateAsync(templateLayoutId);
    } finally {
      deleteTemplateById(templateLayoutId);
      purgeRoadmapSetting();
      openSnackbar(
        formatMessage(
          {
            id: 'userConfiguration.settings.templatesLayout.snackbarMessage.deletedTemplateLayoutSuccess',
          },
          { name: templateLayoutName },
        ),
      );
      handleCloseDeleteDialog();
    }
  };

  return {
    isDeleting: deleteTemplateLayout.isLoading,
    openDeleteDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfimDelete,
  };
};
