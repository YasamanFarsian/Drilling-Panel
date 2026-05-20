import { isAndroidOrWindowsTablet } from '@dt-advisory/providers/BaseWidget/isAndroidOrWindowsTablet';

describe('isAndroidOrWindowsTablet', () => {
  it('should return true for Android device', () => {
    Object.defineProperty(window, 'navigator', {
      value: { userAgent: 'Mozilla/5.0 (Linux; Android 10; Pixel 3 Build/...)' },
      writable: true,
    });

    const result = isAndroidOrWindowsTablet();

    expect(result).toBe(true);
  });

  it('should return true for Windows tablet', () => {
    Object.defineProperty(window, 'navigator', {
      value: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; Touch; Tablet PC)' },
      writable: true,
    });

    const result = isAndroidOrWindowsTablet();

    expect(result).toBe(true);
  });

  it('should return false for non-Android and non-Windows tablet device', () => {
    Object.defineProperty(window, 'navigator', {
      value: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0)' },
      writable: true,
    });

    const result = isAndroidOrWindowsTablet();

    expect(result).toBe(false);
  });
});
