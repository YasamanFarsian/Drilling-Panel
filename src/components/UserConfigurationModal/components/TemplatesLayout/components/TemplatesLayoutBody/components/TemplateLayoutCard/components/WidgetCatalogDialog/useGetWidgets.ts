import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { userConfigurationSettingsKeys } from '@dt-advisory/api/queryKeysFactories/userConfigurationSettingsKeys';
import { getWidgetsList } from '@dt-advisory/api/settings/settings.query';
import { SECOND } from '@dt-advisory/helpers/constants';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import ConfigurationLoader from '@dt-advisory/config/configurationLoader';

export const useGetWidgets = () => {
  const configWidgets = ConfigurationLoader.getWidgetCatalog();
  const setWidgetCatalog = useUserConfigurationStore((state) => state.setWidgetCatalog);
  const widgets = useUserConfigurationStore((state) => state.currentUserConfig?.widgetCatalog);

  const {
    data: apiWidgets,
    isSuccess,
    isLoading,
  } = useQuery(userConfigurationSettingsKeys.widgetList(), getWidgetsList, {
    retry: false,
    cacheTime: 60 * SECOND,
    refetchOnMount: false,
  });

  useEffect(() => {
    const isLoaded = isSuccess && !isLoading;

    setWidgetCatalog(apiWidgets, configWidgets, isLoaded);
  }, [apiWidgets, configWidgets, isLoading, isSuccess, setWidgetCatalog]);

  return { widgets, isLoadingWidgets: isLoading };
};
