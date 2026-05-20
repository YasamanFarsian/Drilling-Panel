import { AppInsightsContext } from '@microsoft/applicationinsights-react-js';
import React from 'react';
import { useConfigs } from '@dt-advisory/providers/Configs';
import TelemetryService from '@dt-advisory/services/Telemetry';

type TelemetryType = {
  children: JSX.Element;
}; // provider value shape

const TelemetryContext = React.createContext<TelemetryType | undefined>(undefined);

type TelemetryProviderPropsType = {
  children: JSX.Element;
};

const TelemetryProvider = ({ children }: TelemetryProviderPropsType): JSX.Element => {
  const configs = useConfigs();
  const configTelemetry = configs.telemetry;
  TelemetryService.initialize(configTelemetry);

  if (!TelemetryService?.appInsights || !TelemetryService?.reactPlugin) {
    return children;
  }

  return (
    <AppInsightsContext.Provider value={TelemetryService.reactPlugin}>
      {children}
    </AppInsightsContext.Provider>
  );
};

export default TelemetryProvider;
