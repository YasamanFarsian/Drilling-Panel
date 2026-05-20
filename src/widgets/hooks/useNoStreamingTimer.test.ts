import { act, renderHook } from '@testing-library/react-hooks';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useNoStreamingTimer } from './useNoStreamingTimer';

const mockedProps = {
  type: WidgetsEnum.Ecd,
  data: {
    bedHeightLastUpdate: '2022-06-03T10:46:34.7214125Z',
    proportionMassFractionsLastUpdate: '2022-06-03T10:46:34.7214125Z',
    cuttingInclinationLastUpdate: '2022-06-03T10:46:34.7214125Z',
    currentTime: '2022-06-03T10:46:34.7214125Z',
  },
  keys: [
    'bedHeightLastUpdate',
    'proportionMassFractionsLastUpdate',
    'cuttingInclinationLastUpdate',
  ],
} as any;
describe('NoStreamingTimerHook', () => {
  it('should return undefined with initial data as null and operation id changes', () => {
    const mockedProps1 = {
      ...mockedProps,
      data: null,
    };
    const { result } = renderHook(() => useNoStreamingTimer(mockedProps1));
    expect(result.current).toBeUndefined();
  });
  it('should return false with initial data as null', () => {
    // update settings before invoking hook for operation id
    const { result: updateSettingsResult } = renderHook(() =>
      useSettingsStore((x) => x.updateSettings),
    );
    act(() => {
      updateSettingsResult.current('operationId', '');
    });
    const mockedProps2 = {
      ...mockedProps,
      data: null,
    };
    const { result } = renderHook(() => useNoStreamingTimer(mockedProps2));
    expect(result.current).toBeUndefined();
  });
  it('should return false with initial data not null', () => {
    // update settings before invoking hook for operation id
    const { result: updateSettingsResult } = renderHook(() =>
      useSettingsStore((x) => x.updateSettings),
    );
    act(() => {
      updateSettingsResult.current('operationId', '');
    });
    const { result } = renderHook(() => useNoStreamingTimer(mockedProps));
    act(() => {
      updateSettingsResult.current('operationId', '101');
    });
    expect(result.current).toBeUndefined();
  });
});
