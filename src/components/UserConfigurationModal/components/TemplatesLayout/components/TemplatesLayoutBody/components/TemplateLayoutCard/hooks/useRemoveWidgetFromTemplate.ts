/* eslint-disable max-lines-per-function */
import { useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import { userConfigurationSettingsKeys } from '@dt-advisory/api/queryKeysFactories/userConfigurationSettingsKeys';
import { updateLayout } from '@dt-advisory/api/settings/settings.query';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useSnackbarStore } from '@dt-advisory/store/SnackbarStore';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import {
  TemplateBodyType,
  WidgetConfigType,
  WidgetsLoaderEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';

export const useRemoveWidgetFromTemplate = (templateId: string) => {
  const { formatMessage } = useIntl();
  const updateTemplateById = useUserConfigurationStore((state) => state.updateTemplateById);
  const openSnackbar = useSnackbarStore((state) => state.actions.openSnackbar);
  const purgeRoadmapSetting = useSettingsStore((state) => state.purgeRoadmap);

  const editTemplate = useMutation({
    mutationKey: userConfigurationSettingsKeys.updateLayout(templateId),
    mutationFn: updateLayout,
  });

  const handleRemoveWidget = async (widgetsToLoadIdx: number, templateBody: TemplateBodyType) => {
    const newWidgetConfig: WidgetConfigType[] = JSON.parse(
      JSON.stringify(templateBody.widgetConfig),
    );

    const oldWidgetKey = newWidgetConfig[widgetsToLoadIdx].key;

    newWidgetConfig[widgetsToLoadIdx] = { key: WidgetsLoaderEnum.Unsettled };

    const selectedWidgetName = formatMessage({
      id: `userConfiguration.settings.templatesLayout.widgetLabel.${oldWidgetKey}`,
      defaultMessage: oldWidgetKey,
    });

    const newTemplateBody = {
      ...templateBody,
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
      purgeRoadmapSetting();
      openSnackbar(
        formatMessage(
          {
            id: 'userConfiguration.settings.templatesLayout.snackbarMessage.removeWidgetSuccess',
          },
          { widgetName: selectedWidgetName, templateName: newTemplateBody.name },
        ),
      );
    }
  };

  return { handleRemoveWidget };
};
