/* eslint-disable max-lines-per-function, max-params */
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { userConfigurationSettingsKeys } from '@dt-advisory/api/queryKeysFactories/userConfigurationSettingsKeys';
import { updateLayout } from '@dt-advisory/api/settings/settings.query';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useSnackbarStore } from '@dt-advisory/store/SnackbarStore';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import {
  TemplateBodyType,
  WidgetConfigType,
  WidgetLayoutEnum,
  WidgetsLoaderEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { getGridConfigFromConvertedIndexConfig } from '@dt-advisory/store/UserConfiguration/userConfigurationHelper';

export const useWidgetCatalog = (templateId: string) => {
  const [widgetCatalogConfig, setWidgetCatalogConfig] = useState({
    open: false,
    selectingWidgetIdx: 0,
  });

  const { formatMessage } = useIntl();
  const openSnackbar = useSnackbarStore((state) => state.actions.openSnackbar);
  const updateTemplateById = useUserConfigurationStore((x) => x.updateTemplateById);
  const removeRoadmapSetting = useSettingsStore((state) => state.removeRoadmap);

  const editTemplate = useMutation({
    mutationKey: userConfigurationSettingsKeys.updateLayout(templateId),
    mutationFn: updateLayout,
  });

  const handleUpdateWidget = async (
    selectedWidgetKey: WidgetsLoaderEnum,
    templateBody: TemplateBodyType,
    currentSelectedLayout: WidgetLayoutEnum,
  ) => {
    const newGridConfig = getGridConfigFromConvertedIndexConfig(
      widgetCatalogConfig.selectingWidgetIdx,
      templateBody.gridConfig,
      currentSelectedLayout,
    );

    const newWidgetConfig: WidgetConfigType[] = JSON.parse(
      JSON.stringify(templateBody.widgetConfig),
    );
    const newWidgetId = uuidv4();
    const oldWidgetKey = newWidgetConfig[widgetCatalogConfig.selectingWidgetIdx].key;
    const oldWidgetId =
      newWidgetConfig[widgetCatalogConfig.selectingWidgetIdx].widgetConfig?.widgetId;

    newWidgetConfig[widgetCatalogConfig.selectingWidgetIdx] = {
      key: selectedWidgetKey,
      widgetConfig: {
        ...newWidgetConfig[widgetCatalogConfig.selectingWidgetIdx].widgetConfig,
        widgetId: newWidgetId,
      },
    };

    const selectedWidgetName = formatMessage({
      id: `userConfiguration.settings.templatesLayout.widgetLabel.${selectedWidgetKey}`,
      defaultMessage: selectedWidgetKey,
    });

    const newTemplateBody = {
      ...templateBody,
      gridConfig: newGridConfig,
      widgetConfig: newWidgetConfig,
    };

    try {
      await editTemplate.mutateAsync({
        id: templateId,
        payload: newTemplateBody,
      });
    } catch {
    } finally {
      updateTemplateById(templateId, newTemplateBody);
      if (
        (oldWidgetKey === WidgetsLoaderEnum.RoadmapDrag ||
          oldWidgetKey === WidgetsLoaderEnum.RoadmapTorque) &&
        oldWidgetId
      ) {
        removeRoadmapSetting(oldWidgetId);
      }
      openSnackbar(
        formatMessage(
          {
            id: 'userConfiguration.settings.templatesLayout.snackbarMessage.updateWidgetSuccess',
          },
          { widgetName: selectedWidgetName, templateName: newTemplateBody.name },
        ),
      );
      handleCloseWidgetCatalogDialog();
    }
  };

  const handleOpenWidgetCatalogDialog = (selectingWidgetIdx: number) =>
    setWidgetCatalogConfig({ open: true, selectingWidgetIdx });
  const handleCloseWidgetCatalogDialog = () =>
    setWidgetCatalogConfig({ open: false, selectingWidgetIdx: 0 });

  return {
    widgetCatalogConfig,
    handleOpenWidgetCatalogDialog,
    handleCloseWidgetCatalogDialog,
    handleUpdateWidget,
    isUpdatingTemplateWidget: editTemplate.isLoading,
  };
};
