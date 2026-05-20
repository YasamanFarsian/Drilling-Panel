export function isAndroidOrWindowsTablet() {
  const userAgent = navigator.userAgent.toLowerCase();

  // Check if the device is Android
  const isAndroid = /android/i.test(userAgent);

  // Check if the device is a Windows tablet
  const isWindowsTablet = /windows/i.test(userAgent) && /touch/i.test(userAgent);

  return isAndroid || isWindowsTablet;
}
