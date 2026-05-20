import { ConfigsType } from '@dt-advisory/providers/Configs';

export enum LocalStorageKeys {
  RigCode = 'rigCode',
  RedirectUri = 'redirectUri',
  AuthInfo = 'authInfo',
  LauncherReload = 'launcherReload',
}

export const handleRedirect = (): void => {
  const rigCode = getLauncherLocalStorage(LocalStorageKeys.RigCode);
  const redirectUri = getLauncherLocalStorage(LocalStorageKeys.RedirectUri);
  const authInfo = getLauncherLocalStorage<{ isCustomer: boolean }>(LocalStorageKeys.AuthInfo);
  if (rigCode && redirectUri) {
    setLauncherLocalStorage(LocalStorageKeys.LauncherReload, true);
    const isCustomer = authInfo?.isCustomer ?? true;
    const relaunchLauncherUrl = `${redirectUri}/launch/adv?rigCode=${rigCode}&isCustomer=${isCustomer}`;
    window.location.href = relaunchLauncherUrl;
  }
};

export const checkAndRedirect = (configs: ConfigsType, mountTime: number): void => {
  const launcherReload = getLauncherLocalStorage(LocalStorageKeys.LauncherReload);
  const reloadTimer = launcherReload
    ? configs.launcher.subsequentReloadTimer
    : configs.launcher.firstReloadTimer;
  const now = new Date();
  const elapsed = (now.getTime() - mountTime) / 1000;
  if (elapsed >= reloadTimer) {
    handleRedirect();
  }
};

export function getLauncherLocalStorage<T>(key: LocalStorageKeys): T | undefined {
  const value = localStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : undefined;
}

export function setLauncherLocalStorage<T>(key: LocalStorageKeys, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const handleRigCodeAndRedirectUrl = (
  rigCode: string | null,
  redirectUri: string | null,
): void => {
  if (redirectUri && rigCode) {
    setLauncherLocalStorage(LocalStorageKeys.RigCode, rigCode);
    setLauncherLocalStorage(LocalStorageKeys.RedirectUri, redirectUri);
  } else {
    localStorage.removeItem(LocalStorageKeys.RigCode);
    localStorage.removeItem(LocalStorageKeys.RedirectUri);
  }
};
