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
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useWidgetCatalog = (templateId: string) => {
  const [widgetCatalogConfig, setWidgetCatalogConfig] = useState({
    open: false,
    selectingWidgetIdx: 0,
  });

  const openSnackbar = useSnackbarStore((s) => s.actions.openSnackbar);
  const updateTemplateById = useUserConfigurationStore((s) => s.updateTemplateById);
  const removeRoadmapSetting = useSettingsStore((s) => s.removeRoadmap);

  const handleUpdateWidget = (
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

    const newTemplateBody = {
      ...templateBody,
      gridConfig: newGridConfig,
      widgetConfig: newWidgetConfig,
    };

    updateTemplateById(templateId, newTemplateBody);

    if (
      (oldWidgetKey === WidgetsLoaderEnum.RoadmapDrag ||
        oldWidgetKey === WidgetsLoaderEnum.RoadmapTorque) &&
      oldWidgetId
    ) {
      removeRoadmapSetting(oldWidgetId);
    }

    openSnackbar(`Widget "${selectedWidgetKey}" was added to ${newTemplateBody.name}`);
    setWidgetCatalogConfig({ open: false, selectingWidgetIdx: 0 });
  };

  return {
    widgetCatalogConfig,
    handleOpenWidgetCatalogDialog: (idx: number) =>
      setWidgetCatalogConfig({ open: true, selectingWidgetIdx: idx }),
    handleCloseWidgetCatalogDialog: () =>
      setWidgetCatalogConfig({ open: false, selectingWidgetIdx: 0 }),
    handleUpdateWidget,
    isUpdatingTemplateWidget: false,
  };
};
