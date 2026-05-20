import React, { useEffect, useState } from 'react';
import ErrorScreen from '@dt-advisory/components/ErrorScreen';
import FullPageLoading from '@dt-advisory/components/FullPageLoading';
import ConfigurationLoader, {
  EnvConfigs,
  EnvConfigsWithAppEnv,
  MsalConfiguration,
} from '@dt-advisory/config/configurationLoader';
import { TelemetryConfig } from '@dt-advisory/services/Telemetry';

export enum Status {
  Initializing = 'Initializing',
  Loading = 'Loading',
  Idle = 'Idle',
  Error = 'Error',
}

export type ConfigsType = Pick<
  EnvConfigsWithAppEnv,
  | 'msal'
  | 'telemetry'
  | 'appEnv'
  | 'userConfiguration'
  | 'zoomEcdX'
  | 'zoomEcdY'
  | 'baseApiUrl'
  | 'anaApiUrl'
  | 'operationSelectEnabled'
  | 'enableTooltips'
  | 'launcher'
> & {
  websocketUrl: string;
  enableAuthentication: boolean;
}; // provider value shape

type FetchConfigsResult = {
  configs: ConfigsType | undefined;
  status: Status;
};

export function useFetchConfigs(): FetchConfigsResult {
  const [status, setStatus] = useState(Status.Initializing);
  const [configs, setConfigs] = useState<ConfigsType>();

  useEffect(() => {
    setStatus(Status.Loading);

    const loadConfig = async () => {
      try {
        const config = await ConfigurationLoader.getConfig();
        setConfigs({
          ...config,
          websocketUrl: config.baseApiUrl,
          enableAuthentication: !config.disableAuthentication,
        });

        setStatus(Status.Idle);
      } catch (e) {
        setStatus(Status.Error);
      }
    };
    loadConfig();
  }, []);

  return { configs, status };
}

const ConfigsContext = React.createContext<ConfigsType | undefined>(undefined);

export const useConfigs = (): ConfigsType => {
  const context = React.useContext(ConfigsContext);
  if (context === undefined) {
    throw new Error('useConfigs can not be used outside ConfigsProvider');
  }
  return context;
};

type ConfigsProviderPropsType = {
  children: React.ReactNode;
};

// eslint-disable-next-line complexity
const ConfigsProvider = ({ children }: ConfigsProviderPropsType): JSX.Element => {
  const { configs, status } = useFetchConfigs();

  if (process.env.NODE_ENV === 'test') {
    return (
      <ConfigsContext.Provider
        value={{
          baseApiUrl: '',
          anaApiUrl: '',
          launcher: { firstReloadTimer: 30, subsequentReloadTimer: 300 },
          msal: { sekal: {} as MsalConfiguration, customer: {} as MsalConfiguration },
          telemetry: {} as TelemetryConfig,
          websocketUrl: 'https://sekal-api-dev.azurewebsites.net',
          appEnv: 'test',
          enableAuthentication: false,
          operationSelectEnabled: false,
          enableTooltips: false,
          userConfiguration: {} as EnvConfigs['userConfiguration'],
        }}
      >
        {children}
      </ConfigsContext.Provider>
    );
  }

  if (status === Status.Initializing || status === Status.Loading) {
    return <FullPageLoading />;
  }

  if (status === Status.Error || !configs) {
    return <ErrorScreen />;
  }
  return <ConfigsContext.Provider value={configs}>{children}</ConfigsContext.Provider>;
};

export default ConfigsProvider;
