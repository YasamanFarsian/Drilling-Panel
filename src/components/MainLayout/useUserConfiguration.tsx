import { getSettings } from '@dt-advisory/api/settings/settings.query';
import { getUnitsSettings } from '@dt-advisory/api/units/units.query';
import fallbackUserConfiguration from '@dt-advisory/config/fallbackUserConfiguration.json';
import { setConfigResponse } from '@dt-advisory/helpers/units/unitsHelper';
import { useOperationId } from '@dt-advisory/hooks/useOperationInfo';
import { useConfigs } from '@dt-advisory/providers/Configs';
import {
  USER_CONFIGURATION_KEY,
  useUserConfigurationStore,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { DefaultUserConfigurationType } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

const getFirstAvailableUserConfiguration = (
  configurations: Array<DefaultUserConfigurationType | undefined>,
): DefaultUserConfigurationType => {
  return (
    configurations.find((x) => x) ?? (fallbackUserConfiguration as DefaultUserConfigurationType)
  );
};

export function useUserConfiguration() {
  const operationId = useOperationId();

  const { userConfiguration: userConfigFromEnvJson } = useConfigs();
  const { data: APIUserConfiguration, isLoading } = useQuery(USER_CONFIGURATION_KEY, getSettings, {
    retry: false,
  });
  const { data: unitsSettings, isLoading: isLoadingUnitsSettings } = useQuery(
    ['UnitsSettings', operationId],
    () => getUnitsSettings(operationId as string),
    {
      enabled: !!operationId,
      retry: false,
    },
  );
  const getDefaultConfig = useUserConfigurationStore((x) => x.getDefaultConfig);
  const setDefaultConfig = useUserConfigurationStore((x) => x.setDefaultConfig);

  useEffect(() => {
    if (!isLoading && !isLoadingUnitsSettings) {
      const userConfiguration = getFirstAvailableUserConfiguration([
        APIUserConfiguration,
        getDefaultConfig(),
        userConfigFromEnvJson,
      ]);

      setDefaultConfig(userConfiguration);
      setConfigResponse(unitsSettings);
    }
  }, [isLoading, isLoadingUnitsSettings, APIUserConfiguration, userConfigFromEnvJson]);

  return { isLoading, isLoadingUnitsSettings };
}
