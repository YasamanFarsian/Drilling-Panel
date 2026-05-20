import { act, renderHook, waitFor } from '@testing-library/react';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useJsonPatch } from './useJsonPatch';

describe('useJsonPatch', () => {
  const defaultValue = { currentTime: 'foo' };
  const mockedPatch = [
    {
      op: 'add',
      path: '/currentTime',
      value: '2023-01-04T08:47:39.5289985Z',
    },
  ] as any;
  it('should return correct values if it is fullframe', () => {
    const { result } = renderHook(() => useJsonPatch(mockedPatch, defaultValue, true));
    expect(result.current).toMatchObject({
      currentTime: '2023-01-04T08:47:39.5289985Z',
    });
    const resultSettings = renderHook(() => useSettingsStore((x) => x.updateSettings));
    act(() => {
      resultSettings.result.current('operationId', '222');
    });
    waitFor(() => expect(result.current).toBe(null));
  });

  it('should return null if data is null and is fullframe (invalid scenario)', () => {
    const { result } = renderHook(() => useJsonPatch(null, defaultValue, true));
    expect(result.current).toEqual(null);
  });
  it('should return null and if not fullframe', () => {
    const { result } = renderHook(() => useJsonPatch(mockedPatch, defaultValue, false));
    expect(result.current).toEqual(null);
  });

  it('should handle arrays', async () => {
    let defaultValue2 = { foo: [] };
    const mockedPatchArr = [
      {
        op: 'add',
        path: '/foo',
        value: [],
      },
    ] as any;
    const { result } = renderHook(() => useJsonPatch(mockedPatchArr, defaultValue2, true));
    await waitFor(() => expect(result.current).toMatchObject({ foo: [] }));
    defaultValue2 = result.current;
    const mockerPatchArr2 = [
      {
        op: 'add',
        path: '/foo/0',
        value: '1',
      },
      {
        op: 'add',
        path: '/foo/1',
        value: '2',
      },
    ] as any;
    const { result: result2 } = renderHook(() =>
      useJsonPatch(mockerPatchArr2, defaultValue2, true),
    );
    await waitFor(() => expect(result2.current).toMatchObject({ foo: ['1', '2'] }));
    defaultValue2 = result2.current;
  });
});
