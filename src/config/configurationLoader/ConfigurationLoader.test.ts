import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import ConfigurationLoader from './ConfigurationLoader';

describe('ConfigurationLoader', () => {
  let axiosMock: AxiosMockAdapter;

  beforeEach(() => {
    axiosMock = new AxiosMockAdapter(axios);
    axiosMock.onGet('/envConfigs.json').reply(200, {
      baseApiUrl: 'test-api-url-mocked',
    });
  });
  afterEach(() => {
    axiosMock.restore();
  });
  it('should load correct config on first request', async () => {
    const loader = new ConfigurationLoader();
    const config = await loader.getConfig();
    expect(axiosMock.history.get.length).toBe(1);
    expect(config).toEqual({
      appEnv: 'test',
      baseApiUrl: 'test-api-url-mocked',
    });
  });

  it('should not reload config on second request', async () => {
    const loader = new ConfigurationLoader();
    await loader.getConfig();
    await loader.getConfig();

    expect(axiosMock.history.get.length).toBe(1);
  });
});
