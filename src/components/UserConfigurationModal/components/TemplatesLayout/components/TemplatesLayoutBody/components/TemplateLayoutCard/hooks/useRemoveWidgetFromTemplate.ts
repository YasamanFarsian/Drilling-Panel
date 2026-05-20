import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useSnackbarStore } from '@dt-advisory/store/SnackbarStore';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import {
  TemplateBodyType,
  WidgetConfigType,
  WidgetsLoaderEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';

export const useRemoveWidgetFromTemplate = (templateId: string) => {
  const updateTemplateById = useUserConfigurationStore((s) => s.updateTemplateById);
  const purgeRoadmapSetting = useSettingsStore((s) => s.purgeRoadmap);
  const openSnackbar = useSnackbarStore((s) => s.actions.openSnackbar);

  const handleRemoveWidget = (widgetsToLoadIdx: number, templateBody: TemplateBodyType) => {
    const newWidgetConfig: WidgetConfigType[] = JSON.parse(
      JSON.stringify(templateBody.widgetConfig),
    );
    const oldWidgetKey = newWidgetConfig[widgetsToLoadIdx].key;
    newWidgetConfig[widgetsToLoadIdx] = { key: WidgetsLoaderEnum.Unsettled };

    const newTemplateBody = { ...templateBody, widgetConfig: newWidgetConfig };
    updateTemplateById(templateId, newTemplateBody);
    purgeRoadmapSetting();
    openSnackbar(`Widget "${oldWidgetKey}" was removed from ${newTemplateBody.name}`);
  };

  return { handleRemoveWidget };
};
