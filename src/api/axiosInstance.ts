import axios, { AxiosInstance } from 'axios';
import configurationLoader from '@dt-advisory/config/configurationLoader';
import getEmbeddedUrlStringParams from '@dt-advisory/helpers/getEmbeddedUrlStringParams';
import MsalAuthentication from '@dt-advisory/services/MsalAuthentication';

const axiosTimeout = 6000;

type CreateAxiosInstanceOptions = {
  timeout: number;
};

export function createAxiosInstance({ timeout }: CreateAxiosInstanceOptions): AxiosInstance {
  const embeddedAccessToken = getEmbeddedUrlStringParams();
  const instance = axios.create({
    timeout,
    baseURL: '',
  });

  instance.interceptors.request.use(async (config) => {
    const { baseApiUrl, disableAuthentication } = await configurationLoader.getConfig();
    config.baseURL = baseApiUrl;

    // Attach the access token
    const accessToken = disableAuthentication
      ? false
      : (embeddedAccessToken ?? (await MsalAuthentication.getToken()));
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  return instance;
}

const axiosInstance = createAxiosInstance({ timeout: axiosTimeout });

export default axiosInstance;
