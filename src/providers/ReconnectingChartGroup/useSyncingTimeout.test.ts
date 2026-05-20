import { OperationType } from '@dt-advisory/api/operation/operation.types';
import { useFetchOperations } from '@dt-advisory/hooks/useFetchOperations';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { act, renderHook } from '@testing-library/react';
import { useSyncingTimeout } from './useSyncingTimeout';

jest.mock('@dt-advisory/hooks/useFetchOperations');

const mockedFetchOperations = useFetchOperations as jest.Mock;
const mockedUpdateSettings = jest.fn();
const mockedSetState = jest.fn();

const inactiveOperationMock: OperationType = {
  id: 'op-1',
  name: 'Operation 1',
  active: false,
};

const activeOperationMock: OperationType = {
  id: 'op-2',
  name: 'Operation 2',
  active: true,
};

const SECOND = 1000;
const SYNCING_TIMEOUT = 5 * SECOND;
const DEFAULT_OP_ID = '';

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.useRealTimers();
});

describe('useSyncingTimeout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedFetchOperations.mockReturnValue({
      fetchOperations: jest.fn(),
    });
    mockedUpdateSettings.mockClear();
    mockedSetState.mockClear();
    useSettingsStore.getState().updateSettings('operationId', DEFAULT_OP_ID);
  });

  it('should do nothing if not syncing', async () => {
    renderHook(() => useSyncingTimeout(false));

    expect(useSettingsStore.getState().settings.operationId).toEqual(DEFAULT_OP_ID);

    await act(async () => {
      jest.advanceTimersByTime(SYNCING_TIMEOUT + 50 * SECOND);
    });

    expect(mockedFetchOperations().fetchOperations).not.toHaveBeenCalled();
    expect(useSettingsStore.getState().settings.operationId).toEqual(DEFAULT_OP_ID);
  });

  it('should fetch operations after 5 seconds when syncing', async () => {
    mockedFetchOperations().fetchOperations.mockResolvedValue({
      autoNavigateToActiveOpEnabled: false,
      operations: [inactiveOperationMock],
    });

    renderHook(() => useSyncingTimeout(true));

    expect(useSettingsStore.getState().settings.operationId).toEqual(DEFAULT_OP_ID);
    expect(mockedFetchOperations().fetchOperations).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(SYNCING_TIMEOUT);
    });

    expect(mockedFetchOperations().fetchOperations).toHaveBeenCalled();
    expect(useSettingsStore.getState().settings.operationId).toEqual(DEFAULT_OP_ID);
  });

  it('should update settings if autoNavigateToActiveOpEnabled is true and activeOperation id is different from current operationId', async () => {
    mockedFetchOperations().fetchOperations.mockResolvedValue({
      autoNavigateToActiveOpEnabled: true,
      operations: [inactiveOperationMock, activeOperationMock],
    });

    renderHook(() => useSyncingTimeout(true));

    expect(useSettingsStore.getState().settings.operationId).toEqual(DEFAULT_OP_ID);

    await act(async () => {
      jest.advanceTimersByTime(SYNCING_TIMEOUT);
    });

    expect(mockedFetchOperations().fetchOperations).toHaveBeenCalled();
    expect(useSettingsStore.getState().settings.operationId).toEqual(activeOperationMock.id);
  });

  it('should not update settings if autoNavigateToActiveOpEnabled is false', async () => {
    mockedFetchOperations().fetchOperations.mockResolvedValue({
      autoNavigateToActiveOpEnabled: false,
      operations: [activeOperationMock],
    });
    renderHook(() => useSyncingTimeout(true));

    expect(useSettingsStore.getState().settings.operationId).toEqual(DEFAULT_OP_ID);

    await act(async () => {
      jest.advanceTimersByTime(SYNCING_TIMEOUT);
    });

    expect(mockedFetchOperations().fetchOperations).toHaveBeenCalled();
    expect(useSettingsStore.getState().settings.operationId).toEqual(DEFAULT_OP_ID);
  });

  it('should not update settings if there is no active operation', async () => {
    mockedFetchOperations().fetchOperations.mockResolvedValue({
      autoNavigateToActiveOpEnabled: true,
      operations: [inactiveOperationMock],
    });
    renderHook(() => useSyncingTimeout(true));

    expect(useSettingsStore.getState().settings.operationId).toEqual(DEFAULT_OP_ID);

    await act(async () => {
      jest.advanceTimersByTime(SYNCING_TIMEOUT);
    });

    expect(mockedFetchOperations().fetchOperations).toHaveBeenCalled();
    expect(useSettingsStore.getState().settings.operationId).toEqual(DEFAULT_OP_ID);
  });
  it('should not update settings if operationId is the same', async () => {
    useSettingsStore.getState().updateSettings('operationId', activeOperationMock.id);
    const operationMock = [inactiveOperationMock, activeOperationMock];
    mockedFetchOperations().fetchOperations.mockResolvedValue({
      autoNavigateToActiveOpEnabled: true,
      operations: operationMock,
    });
    renderHook(() => useSyncingTimeout(true));

    expect(useSettingsStore.getState().settings.operationId).toEqual(activeOperationMock.id);

    await act(async () => {
      jest.advanceTimersByTime(SYNCING_TIMEOUT);
    });

    expect(mockedFetchOperations().fetchOperations).toHaveBeenCalled();
    expect(useSettingsStore.getState().settings.operationId).toEqual(activeOperationMock.id);
  });

  it('should clear the timeout on unmount', async () => {
    const { rerender } = renderHook((isSyncing: boolean) => useSyncingTimeout(isSyncing), {
      initialProps: true,
    });
    const spyClearTimeout = jest.spyOn(global, 'clearTimeout');
    rerender(false);
    expect(spyClearTimeout).toHaveBeenCalledTimes(1);
    spyClearTimeout.mockRestore();
  });
});
