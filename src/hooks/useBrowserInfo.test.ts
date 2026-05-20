import { renderHook } from '@testing-library/react-hooks';
import { useBrowserInfo } from '@dt-advisory/hooks/useBrowserInfo';
import * as HostSettingsStore from '@dt-advisory/store/HostSettingsStore';

describe('useBrowserInfo hooks', () => {
  const getUserAgentResponse = (userAgent: string) => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: userAgent,
      configurable: true,
      enumerable: true,
      writable: false,
    });
    const { result } = renderHook(() => useBrowserInfo());
    return result.current.isDesktop;
  };

  it('should return true when userAgent contains Windows', () => {
    const result = getUserAgentResponse('Windows');
    expect(result).toBe(true);
  });

  it('should return true when userAgent contains Linux', () => {
    const result = getUserAgentResponse('Linux');
    expect(result).toBe(true);
  });

  it('should return true when userAgent contains Macintosh', () => {
    const result = getUserAgentResponse('Macintosh');
    expect(result).toBe(true);
  });

  it('should return false when userAgent contains iPad', () => {
    const result = getUserAgentResponse('iPad');
    expect(result).toBe(false);
  });

  it('should return false when it is embedded mode.', () => {
    jest.spyOn(HostSettingsStore, 'useHostSettingsStore').mockReturnValue({
      isEmbedded: true,
    });
    const result = getUserAgentResponse('Macintosh');
    expect(result).toBe(false);
  });
});
