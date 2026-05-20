import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights, IConfig, IConfiguration } from '@microsoft/applicationinsights-web';

export type TelemetryConfig = Pick<
  IConfiguration & IConfig,
  'connectionString' | 'disableFetchTracking' | 'loggingLevelTelemetry' | 'enableAutoRouteTracking'
>;

class TelemetryService {
  static reactPlugin: ReactPlugin;
  static appInsights: ApplicationInsights;

  static initialize = (config?: TelemetryConfig) => {
    if (config?.connectionString) {
      this.reactPlugin = new ReactPlugin();

      this.appInsights = new ApplicationInsights({
        config: {
          ...config,
          extensions: [this.reactPlugin],
        },
      });

      this.appInsights.loadAppInsights();
    }
  };
}

export default TelemetryService;
