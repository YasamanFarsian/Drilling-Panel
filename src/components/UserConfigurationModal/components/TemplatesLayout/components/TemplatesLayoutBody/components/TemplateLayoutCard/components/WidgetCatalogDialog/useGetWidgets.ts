import ConfigurationLoader from '@dt-advisory/config/configurationLoader';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useEffect } from 'react';

export const useGetWidgets = () => {
  const configWidgets = ConfigurationLoader.getWidgetCatalog();
  const setWidgetCatalog = useUserConfigurationStore((s) => s.setWidgetCatalog);
  const widgets = useUserConfigurationStore((s) => s.currentUserConfig?.widgetCatalog);

  useEffect(() => {
    setWidgetCatalog(undefined, configWidgets, true);
  }, [configWidgets, setWidgetCatalog]);

  return { widgets, isLoadingWidgets: false };
};
