/* eslint-disable max-lines-per-function */
import { AxiosInstance } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import configurationLoader from '@dt-advisory/config/configurationLoader';
import { createAxiosInstance } from './axiosInstance';

jest.mock('@dt-advisory/config/configurationLoader');

jest.mock('@dt-advisory/services/MsalAuthentication', () => ({
  getToken: () => 'test token',
}));

describe('axiosInstance', () => {
  let axiosInstance: AxiosInstance;
  let axiosMock: AxiosMockAdapter;

  beforeEach(() => {
    (configurationLoader.getConfig as jest.Mock).mockImplementation(
      jest.fn(() => ({
        baseApiUrl: 'test-api-url',
      })),
    );
    axiosInstance = createAxiosInstance({ timeout: 1000 });
    axiosMock = new AxiosMockAdapter(axiosInstance);
    axiosMock.onGet('/test').reply(200);
  });
  afterEach(() => {
    axiosMock.restore();
  });
  it('should call getConfig on request intercept', async () => {
    await axiosInstance.get('/test');
    expect(configurationLoader.getConfig).toHaveBeenCalledTimes(1);
  });

  it('should set baseURL according publicApiUrl from getConfig', async () => {
    await axiosInstance.get('/test');
    expect(axiosMock.history.get.length).toBe(1);
    expect(axiosMock.history.get[0].baseURL).toBe('test-api-url');
  });

  it('should add Authorization header to request', async () => {
    await axiosInstance.get('/test');
    expect(axiosMock.history['get'].length).toBe(1);
    expect(axiosMock.history.get[0].headers).toEqual(
      expect.objectContaining({
        Authorization: 'Bearer test token',
      }),
    );
  });
});
