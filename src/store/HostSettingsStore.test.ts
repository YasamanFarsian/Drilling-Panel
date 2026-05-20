import { act, renderHook } from '@testing-library/react-hooks';
import { useHostSettingsStore } from './HostSettingsStore';

describe('useHostSettingsStore', () => {
  it('should have empty state on init', () => {
    const { result } = renderHook(() => useHostSettingsStore((x) => x));
    expect(result.current).toMatchObject({ isEmbedded: false, accessToken: null });
  });
  it('should have empty state on init', () => {
    const { result } = renderHook(() => useHostSettingsStore((x) => x));
    const expectedResultIsEmbedded = true;
    const expectedResultAccessToken = 'mock-token';
    act(() => {
      result.current.updateHostIsEmbedded(expectedResultIsEmbedded);
      result.current.updateHostAccessToken(expectedResultAccessToken);
    });
    expect(result.current.isEmbedded).toEqual(expectedResultIsEmbedded);
    expect(result.current.accessToken).toEqual(expectedResultAccessToken);
  });
});
