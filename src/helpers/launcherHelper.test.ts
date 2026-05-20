import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import {
  checkAndRedirect,
  handleRedirect,
  LocalStorageKeys,
  setLauncherLocalStorage,
} from './launcherHelper';

const setupLocalStorage = (
  rigCode: string,
  redirectUri: string,
  authInfo: any,
  launcherReload: boolean,
) => {
  setLauncherLocalStorage(LocalStorageKeys.AuthInfo, JSON.stringify(authInfo));
  setLauncherLocalStorage(LocalStorageKeys.RigCode, rigCode);
  setLauncherLocalStorage(LocalStorageKeys.RedirectUri, redirectUri);
  setLauncherLocalStorage(LocalStorageKeys.LauncherReload, launcherReload);
};

describe('handleRedirect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    // Mock window.location
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: { href: '' },
    });
  });

  it('should set LauncherReload and redirect if rigCode and redirectUri exist in localStorage', async () => {
    const mockRigCode = 'ABCDEF';
    const mockRedirectUri = 'http://example.com';
    const mockAuthInfo = { isCustomer: true };

    setupLocalStorage(mockRigCode, mockRedirectUri, mockAuthInfo, false);
    handleRedirect();

    await waitFor(() => {
      expect(window.location.href).toBe(
        `${mockRedirectUri}/launch/adv?rigCode=${mockRigCode}&isCustomer=${mockAuthInfo.isCustomer}`,
      );
    });
  });
});

describe('checkAndRedirect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: { href: '' },
    });
  });

  it('should call handleRedirect if elapsed time exceeds the first reload timer on first reload', async () => {
    const mockConfigs = {
      launcher: {
        firstReloadTimer: 5, // 5 seconds for the first reload
        subsequentReloadTimer: 10, // 10 seconds for subsequent reloads
      },
    } as any;

    const mockRigCode = 'ABCDEF';
    const mockRedirectUri = 'http://example.com';
    const mockAuthInfo = { isCustomer: true };

    setupLocalStorage(mockRigCode, mockRedirectUri, mockAuthInfo, false);

    const mockMountTime = new Date().getTime() - 6000; // Simulate 6 seconds ago
    localStorage.setItem(LocalStorageKeys.LauncherReload, 'false');
    checkAndRedirect(mockConfigs, mockMountTime);

    await waitFor(() => {
      expect(window.location.href).toBe(
        `${mockRedirectUri}/launch/adv?rigCode=${mockRigCode}&isCustomer=${mockAuthInfo.isCustomer}`,
      );
    });
  });

  it('should call handleRedirect if elapsed time exceeds the subsequent reload timer on next reload', async () => {
    const mockConfigs = {
      launcher: {
        firstReloadTimer: 5,
        subsequentReloadTimer: 10,
      },
    } as any;

    const mockRigCode = 'ABCDEF';
    const mockRedirectUri = 'http://example.com';
    const mockAuthInfo = { isCustomer: true };

    setupLocalStorage(mockRigCode, mockRedirectUri, mockAuthInfo, false);

    const mockMountTime = new Date().getTime() - 11000; // Simulate 11 seconds ago
    localStorage.setItem(LocalStorageKeys.LauncherReload, 'true');
    checkAndRedirect(mockConfigs, mockMountTime);

    await waitFor(() => {
      expect(window.location.href).toBe(
        `${mockRedirectUri}/launch/adv?rigCode=${mockRigCode}&isCustomer=${mockAuthInfo.isCustomer}`,
      );
    });
  });
});
