import axios from 'axios';
import { TelemetryConfig } from '@dt-advisory/services/Telemetry';
import {
  DefaultUserConfigurationType,
  WidgetConfigType,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';

export type AppEnvType = 'development' | 'production' | 'test';
export type MsalConfiguration = {
  clientId: string;
  redirectUri: string;
  authority: string;
  knownAuthorities: string;
  scopes: string;
};

export type EnvConfigs = {
  baseApiUrl: string;
  anaApiUrl: string;
  disableAuthentication: boolean;
  operationSelectEnabled: boolean;
  enableTooltips: boolean;
  launcher: { firstReloadTimer: number; subsequentReloadTimer: number };
  msal: { customer: MsalConfiguration; sekal: MsalConfiguration };
  telemetry: TelemetryConfig;
  userConfiguration: DefaultUserConfigurationType;
  zoomEcdX?: number;
  zoomEcdY?: number;
};

export type EnvConfigsWithAppEnv = {
  appEnv: AppEnvType;
} & EnvConfigs;

export default class ConfigurationLoader {
  private config: EnvConfigsWithAppEnv | null = null;

  private resolveConfigs(data: EnvConfigs): EnvConfigsWithAppEnv {
    const appEnv = process.env.NODE_ENV ?? 'development';
    return {
      ...data,
      appEnv: appEnv as AppEnvType,
    };
  }

  private async loadConfiguration(): Promise<EnvConfigsWithAppEnv> {
    const isEnvTest = 'test' === process.env.NODE_ENV;
    const VERSION = isEnvTest ? 'test' : process.env.VITE_BUILD_NUMBER;
    let URL = '/envConfigs.json';
    if (!isEnvTest) {
      URL += `?version=${VERSION ?? ''}`;
    }
    const { data } = await axios.create({ baseURL: window.location.origin }).get<EnvConfigs>(URL);

    return this.resolveConfigs(data);
  }

  async getConfig(): Promise<EnvConfigsWithAppEnv> {
    if (!this.config) {
      this.config = await this.loadConfiguration();
    }
    return this.config;
  }

  getWidgetCatalog(): WidgetConfigType[] | undefined {
    return this.config?.userConfiguration.widgetCatalog;
  }
}
