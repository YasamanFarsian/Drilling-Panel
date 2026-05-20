import configurationLoader from '@dt-advisory/config/configurationLoader';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useFetchOperationInfo } from './useFetchOperationInfo';

jest.mock('@dt-advisory/store/Settings', () => ({
  useSettingsStore: jest.fn(() => 'mock-opid-with-dataFound-true'),
}));
jest.mock('@dt-advisory/config/configurationLoader');

jest.mock('@/api/operationInfo/operationInfo.query', () => ({
  getOperationInfo: jest.fn().mockImplementation(({ operationId }) => {
    if (operationId === 'mock-opid-with-dataFound-true') {
      return Promise.resolve({
        dataFound: true,
        general: [{ drillingMethod: 'test-drilling-method' }],
      });
    } else {
      return Promise.resolve({ dataFound: false });
    }
  }),
}));

const wrapper = ({ children }: { children: ReactNode }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  // eslint-disable-next-line react/react-in-jsx-scope
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useFetchOperationInfo', () => {
  beforeAll(() => {
    (configurationLoader.getConfig as jest.Mock).mockImplementation(
      jest.fn(() => ({
        baseApiUrl: 'http://www.jest-test.com',
        disableAuthentication: true,
      })),
    );
  });

  it('should not query', () => {
    const { result } = renderHook(() => useFetchOperationInfo({ enabled: false }), { wrapper });
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toBeUndefined();
  });

  it('should query', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(
      () => useFetchOperationInfo({ enabled: true, intervalMS: 1000 }),
      { wrapper },
    );
    jest.advanceTimersByTime(5000);
    expect(result.current.isLoading).toBeTruthy();
  }, 10000);

  it(
    'should be cleared after receiving a dataFound: false, if it has been more than 30 seconds since receiving a dataFound: true.',
    async () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-09-12T10:00:00.000Z'));
      const { result } = renderHook(
        () => useFetchOperationInfo({ enabled: true, intervalMS: 1000 }),
        { wrapper },
      );

      await waitFor(() => expect(result.current.isLoading).toBeFalsy());
      expect(result.current.data).not.toBeUndefined();
      expect(result.current.data).toHaveProperty('general');

      (useSettingsStore as unknown as jest.Mock).mockImplementation(
        () => 'mock-opid-with-dataFound-false',
      );

      await waitFor(() => expect(result.current.isLoading).toBeFalsy());
      jest.setSystemTime(new Date('2024-09-12T10:00:00.000Z')); // Need to hack time a bit as I don't want to edit the feature code directly. There is an issue with react-query while testing with timer
      expect(result.current.data).toHaveProperty('general');

      jest.advanceTimersByTime(30 * 1000);
      await waitFor(() => expect(result.current.isLoading).toBeFalsy());
      expect(result.current.data).toHaveProperty('general');

      jest.advanceTimersByTime(1000);
      await waitFor(() => expect(result.current.isLoading).toBeFalsy());
      expect(result.current.data).toBeUndefined();

      jest.useRealTimers();
    },
    40 * 1000,
  );
});
