import { act, renderHook } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import fetchAuthenticationInfo, { AuthInfoResponseType } from './authenticationInfo.query';
import useAthenticationFlow from './useAuthenticationFlow';
import useLocalStorage from './useLocalStorage';

// Mock fetchAuthenticationInfo
jest.mock('./authenticationInfo.query');

// Mock local storage
jest.mock('./useLocalStorage');

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

const mockUseLocation = (value: string) => {
  (useLocation as any).mockImplementation(() => ({ search: value }));
};

const mockLocalStorage = (mockedValue?: AuthInfoResponseType) => {
  (useLocalStorage as any).mockReturnValue([mockedValue, jest.fn()]);
};

const mockFetchAuthenticationInfo = (value: AuthInfoResponseType | undefined) => {
  (fetchAuthenticationInfo as any).mockResolvedValueOnce(value);
};

const defaultCustomerTrueAuthInfoValue = {
  isCustomer: true,
  redirectUrl: 'mock-redirect-uri',
};
const defaultCustomerFalseAuthInfoValue = {
  isCustomer: false,
  redirectUrl: 'mock-another-redirect-uri',
};

describe('useAthenticationFlow', () => {
  describe('logout', () => {
    it('should set local storage to undefined when logout', () => {
      mockUseLocation('');
      mockLocalStorage(defaultCustomerTrueAuthInfoValue);
      const mockSetLocalStorageIsCustomer = jest.fn();
      (useLocalStorage as any).mockReturnValue([undefined, mockSetLocalStorageIsCustomer]);
      const { result } = renderHook(() => useAthenticationFlow());
      act(() => {
        result.current.logout();
        expect(mockSetLocalStorageIsCustomer).toHaveBeenCalledWith(undefined);
      });
    });
  });

  describe('isCustomer: true', () => {
    it('should return authInfo from localstorage when query string param is "isCustomer=true" and localStorage defined', async () => {
      mockUseLocation('?isCustomer=true');
      mockLocalStorage(defaultCustomerTrueAuthInfoValue);
      const { result } = renderHook(() => useAthenticationFlow());
      await act(async () => {
        const resp = await result.current.getIsCustomer('');
        expect(resp).toEqual(defaultCustomerTrueAuthInfoValue);
      });
    });
    it('should return authInfo from API when query string param is "isCustomer=true" and localStorage undefined', async () => {
      mockUseLocation('?isCustomer=true');
      mockLocalStorage(undefined);
      const { result } = renderHook(() => useAthenticationFlow());
      await act(async () => {
        const resp = await result.current.getIsCustomer('');
        expect(resp).toEqual({ isCustomer: true });
      });
    });
    it('should return authInfo from API when query string param is "isCustomer=true" and localstorage is incorrect', async () => {
      mockUseLocation('?isCustomer=true');
      mockLocalStorage({
        isCustomer: false,
        redirectUrl: 'https://foo-redirect',
      });
      const { result } = renderHook(() => useAthenticationFlow());
      await act(async () => {
        const resp = await result.current.getIsCustomer('');
        expect(resp).toEqual({
          isCustomer: true,
          redirectUrl: 'https://foo-redirect',
        });
      });
    });
  });

  describe('isCustomer: false', () => {
    it('should return authInfo from localStorage query string param is "isCustomer=false" and localstorage is defined', async () => {
      mockUseLocation('?isCustomer=false');
      mockLocalStorage(defaultCustomerFalseAuthInfoValue);
      const { result } = renderHook(() => useAthenticationFlow());
      await act(async () => {
        const resp = await result.current.getIsCustomer('');
        expect(resp).toEqual(defaultCustomerFalseAuthInfoValue);
      });
    });
    it('should not call API when query string param is "isCustomer=false"', async () => {
      mockUseLocation('?isCustomer=false');
      mockLocalStorage(defaultCustomerFalseAuthInfoValue);
      const { result } = renderHook(() => useAthenticationFlow());
      await act(async () => {
        const resp = await result.current.getIsCustomer('');
        expect(resp).toEqual(defaultCustomerFalseAuthInfoValue);
      });
    });
  });

  describe('isCustomer: random', () => {
    it('should return authInfo from localStorage query string param is "isCustomer=false" and localstorage is defined', async () => {
      mockUseLocation('?isCustomer=random');
      mockLocalStorage(defaultCustomerFalseAuthInfoValue);
      const { result } = renderHook(() => useAthenticationFlow());
      await act(async () => {
        const resp = await result.current.getIsCustomer('');
        expect(resp).toEqual(defaultCustomerFalseAuthInfoValue);
      });
    });
    it('should not call API when query string param is "isCustomer=false"', async () => {
      mockUseLocation('?isCustomer=false');
      mockLocalStorage(defaultCustomerFalseAuthInfoValue);
      const { result } = renderHook(() => useAthenticationFlow());
      await act(async () => {
        const resp = await result.current.getIsCustomer('');
        expect(resp).toEqual(defaultCustomerFalseAuthInfoValue);
      });
    });
  });

  describe('isCustomer: undefined', () => {
    it('should return authInfo from API whenquery string param is undefined and localstorage is undefined', async () => {
      mockUseLocation('');
      mockLocalStorage(undefined);
      mockFetchAuthenticationInfo(defaultCustomerFalseAuthInfoValue);
      const { result } = renderHook(() => useAthenticationFlow());
      await act(async () => {
        const resp = await result.current.getIsCustomer('');
        expect(resp).toEqual(defaultCustomerFalseAuthInfoValue);
      });
    });
    it('should return authInfo from localStorage when query string param is undefined and localstorage is defined', async () => {
      mockUseLocation('');
      mockLocalStorage(defaultCustomerFalseAuthInfoValue);
      const { result } = renderHook(() => useAthenticationFlow());
      await act(async () => {
        const resp = await result.current.getIsCustomer('');
        expect(resp).toEqual(defaultCustomerFalseAuthInfoValue);
      });
    });
    it('should return authInfo from localStorage localstorage is defined correctly', async () => {
      mockUseLocation('');
      mockLocalStorage(defaultCustomerTrueAuthInfoValue);
      const { result } = renderHook(() => useAthenticationFlow());
      await act(async () => {
        const resp = await result.current.getIsCustomer('');
        expect(resp).toEqual(defaultCustomerTrueAuthInfoValue);
      });
    });
    it('should return default authInfo when query string param is undefined and localstorage is defined and API is undefined', async () => {
      mockUseLocation('');
      mockLocalStorage(undefined);
      mockFetchAuthenticationInfo(undefined);
      const { result } = renderHook(() => useAthenticationFlow());
      await act(async () => {
        const resp = await result.current.getIsCustomer('');
        expect(resp.isCustomer).toBeFalsy();
        expect(resp.redirectUrl).toEqual('');
      });
    });
    it('should return default value (isCustomer: false) when query string param is undefined and local storage is undefined and fetchAuthenticationInfo does not return 200', async () => {
      mockUseLocation('');
      mockLocalStorage(undefined);
      (fetchAuthenticationInfo as any).mockResolvedValueOnce(Promise.reject(new Error('foo err')));
      const { result } = renderHook(() => useAthenticationFlow());
      await act(async () => {
        const resp = await result.current.getIsCustomer('');
        expect(resp).toEqual({ isCustomer: false, redirectUrl: '' });
      });
    });
  });
});
