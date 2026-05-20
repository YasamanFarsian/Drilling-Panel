import { act, renderHook } from '@testing-library/react-hooks';
import { useSyncStateStore } from './SyncStateStore';

describe('useSyncStateStore', () => {
  it('should set widgetToSync correctly', () => {
    const { result } = renderHook(() => useSyncStateStore());

    act(() => {
      result.current.setWidgetToSync(3);
    });

    expect(result.current.widgetToSync).toBe(3);
  });

  it('should set and get sync state data correctly', () => {
    const { result } = renderHook(() => useSyncStateStore());

    act(() => {
      result.current.setSyncStates({ widget1: true, widget2: false });
    });

    expect(result.current.syncStateData).toEqual({ widget1: true, widget2: false });
  });

  it('should remove sync state correctly', () => {
    const { result } = renderHook(() => useSyncStateStore());

    act(() => {
      result.current.setSyncStates({ widget1: true, widget2: false });
      result.current.removeSyncState('widget1');
    });

    expect(result.current.syncStateData).toEqual({ widget2: false });
  });

  it('should reset widgetSyncStates correctly', () => {
    const { result } = renderHook(() => useSyncStateStore());

    act(() => {
      result.current.setSyncStates({ widget1: true, widget2: false });
      result.current.resetWidgetSyncStates();
    });

    expect(result.current.syncStateData).toEqual({});
    expect(result.current.widgetToSync).toBe(-1);
    expect(result.current.isSyncIconVisible).toBe(false);
  });

  it('should determine if all widgets are live correctly', () => {
    const { result } = renderHook(() => useSyncStateStore());

    act(() => {
      result.current.setWidgetToSync(3);
      result.current.setSyncStates({ widget1: true, widget2: true, widget3: null });
      result.current.isAllWidgetsLive();
    });

    expect(result.current.isAllLive).toBe(true);

    act(() => {
      result.current.setSyncStates({ widget1: true, widget2: false });
      result.current.isAllWidgetsLive();
    });

    expect(result.current.isAllLive).toBe(false);
  });

  it('should set and get isNoConnectionLabelEnabled to be true', () => {
    const { result } = renderHook(() => useSyncStateStore());

    act(() => {
      result.current.setIsNoConnectionLabelEnabled(true);
    });

    expect(result.current.isNoConnectionLabelEnabled).toBe(true);
  });

  it('should set and get isNoConnectionLabelEnabled to be false', () => {
    const { result } = renderHook(() => useSyncStateStore());

    act(() => {
      result.current.setIsNoConnectionLabelEnabled(false);
    });

    expect(result.current.isNoConnectionLabelEnabled).toBe(false);
  });
  it('should determine at least one widget is live', () => {
    const { result } = renderHook(() => useSyncStateStore());

    act(() => {
      result.current.setWidgetToSync(3);
      result.current.setSyncStates({ widget1: true, widget2: false, widget3: null });
      result.current.isAllWidgetsLive();
    });

    expect(result.current.isAtLeastOneWidgetConnected).toBe(true);
  });
  it('should determine at least one widget is not live', () => {
    const { result } = renderHook(() => useSyncStateStore());

    act(() => {
      result.current.setWidgetToSync(3);
      result.current.setSyncStates({ widget1: false, widget2: false, widget3: false });
      result.current.isAllWidgetsLive();
    });

    expect(result.current.isAtLeastOneWidgetConnected).toBe(false);
  });
});
