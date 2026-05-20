import { renderHook } from '@testing-library/react';
import { useDataProviderWithJsonPatch } from '@dt-advisory/widgets/providers/DataProviderWithJsonPatch';
import { useRoadmapTorque } from '@dt-advisory/widgets/RoadmapTorque/hooks/useRoadmapTorque';
import Mock = jest.Mock;

jest.mock('@dt-advisory/widgets/providers/DataProviderWithJsonPatch');

const mockedReturnData = {
  data: {
    currentTime: '',
  } as any,
  isConnected: true,
};

const mockedHookParams = {
  widgetId: '123',
  numOfTicks: 6,
  noConnectionTimerLimit: 300,
  ...mockedReturnData,
};

describe('useRoadmapTorque', () => {
  it('should return isShowGraph true', () => {
    (useDataProviderWithJsonPatch as Mock).mockReturnValue({
      ...mockedReturnData,
      isConnected: true,
    });

    const { result } = renderHook(() => useRoadmapTorque(mockedHookParams));

    expect(result.current.isShowGraph).toBeTruthy();
  });

  it('should return isShowGraph false', () => {
    (useDataProviderWithJsonPatch as Mock).mockReturnValue({
      ...mockedReturnData,
      isConnected: false,
    });

    const { result } = renderHook(() =>
      useRoadmapTorque({ ...mockedHookParams, isConnected: false }),
    );
    expect(result.current.isShowGraph).toBeFalsy();
  });
});
