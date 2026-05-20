import { createContext, useContext } from 'react';

export type ConfigsType = {
  baseApiUrl: string;
  websocketUrl: string;
  enableAuthentication: boolean;
  operationSelectEnabled: boolean;
  enableTooltips: boolean;
};

export const MOCK_CONFIG: ConfigsType = {
  baseApiUrl: '',
  websocketUrl: '',
  enableAuthentication: false,
  operationSelectEnabled: true,
  enableTooltips: true,
};

export const ConfigsContext = createContext<ConfigsType>(MOCK_CONFIG);

export const useConfigs = (): ConfigsType => useContext(ConfigsContext);
