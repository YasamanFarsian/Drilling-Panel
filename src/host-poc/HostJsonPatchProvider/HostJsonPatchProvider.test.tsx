import { mockedConfigsProviderMock } from '@dt-advisory/helpers/tests/mock/providers';
import { mockedSignalR } from '@dt-advisory/helpers/tests/mock/signalR';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import useReplayStore from '@dt-advisory/utils/replay-store/use-replay-store';
import { defaultRoadmapDragValues } from '@dt-advisory/widgets/RoadmapDrag/RoadmapDragConstants';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React, { act } from 'react';
import HostJsonPatchProviderProvider, { useHostJsonPatchProvider } from './HostJsonPatchProvider';

mockedConfigsProviderMock();

mockedSignalR();

const mockWidgetId = 'mock-widget-id';
const fullFrame = `
{
  "operationId": "1",
  "lastUpdated": "2025-11-10T00:00:17.881095Z",
  "data": [
    {
      "op": "replace",
      "path": "",
      "value": {
        "drilling": {
          "line0": [
            {
              "md": 200,
              "val": 100
            }
          ]
        }
      }
    }
  ],
  "isFullFrame": true,
  "isLive": false
}
`;

const notFullFrame = `
{
  "operationId": "1",
  "lastUpdated": "2025-11-10T00:00:17.881095Z",
  "data": [
    {
      "op": "replace",
      "path": "",
      "value": {
        "drilling": {
          "line0": [
            {
              "md": 200,
              "val": 100
            }
          ]
        }
      }
    }
  ],
  "isFullFrame": false,
  "isLive": true
}
`;

jest.mock('@dt-advisory/widgets/hooks/useWebSocket', () => ({
  useWebSocket: jest.fn().mockReturnValue({
    ws: {
      on: jest.fn().mockImplementation((eventName: string, callback: any) => {
        callback(fullFrame);
        callback(notFullFrame);
      }),
      off: jest.fn(),
    },
    isConnected: true,
  }),
}));

describe('HostJsonPatchProviderProvider Provider', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <HostJsonPatchProviderProvider
        widgetId={mockWidgetId}
        widgetType={WidgetsEnum.RoadmapDrag}
        mappingFn={(wsData, patchedData) => {
          return {
            operationId: wsData?.operationId ?? defaultRoadmapDragValues.operationId,
            lastUpdated: wsData?.lastUpdated ?? defaultRoadmapDragValues.lastUpdated,
            currentTime: wsData?.currentTime ?? defaultRoadmapDragValues.currentTime,
            data: patchedData,
            isLive: wsData?.isLive ?? defaultRoadmapDragValues.isLive,
          };
        }}
      >
        {children}
      </HostJsonPatchProviderProvider>
    );
  };

  it('should startReplays on receive message if current status is triggered', () => {
    act(() => {
      useReplayStore.getState().triggerReplays(0, 100000);
    });

    renderHook(() => useHostJsonPatchProvider(), {
      wrapper,
    });

    expect(useReplayStore.getState().status).toEqual('replaying');
  });

  it('should not startReplays on receive message if current status is idle', () => {
    act(() => {
      useReplayStore.getState().stopReplays();
    });

    expect(useReplayStore.getState().status).toEqual('idle');

    renderHook(() => useHostJsonPatchProvider(), {
      wrapper,
    });

    expect(useReplayStore.getState().status).toEqual('idle');
  });

  it('should return data correctly from web-socket', () => {
    const { result } = renderHook(() => useHostJsonPatchProvider(), {
      wrapper,
    });

    expect(result.current.data).toMatchObject({
      operationId: '1',
      lastUpdated: '2025-11-10T00:00:17.881095Z',
      currentTime: '',
      data: {
        drilling: {
          line0: [
            {
              md: 200,
              val: 100,
            },
          ],
        },
      },
      isLive: true,
    });
  });

  it('should render without crashing', () => {
    const mockMappingFn = jest.fn().mockImplementation((wsData, patchedData) => ({
      operationId: wsData?.operationId ?? defaultRoadmapDragValues.operationId,
      lastUpdated: wsData?.lastUpdated ?? defaultRoadmapDragValues.lastUpdated,
      currentTime: wsData?.currentTime ?? defaultRoadmapDragValues.currentTime,
      data: patchedData,
    }));

    render(
      <HostJsonPatchProviderProvider
        widgetId={mockWidgetId}
        widgetType={WidgetsEnum.RoadmapDrag}
        mappingFn={mockMappingFn}
      >
        <></>
      </HostJsonPatchProviderProvider>,
    );

    expect(mockMappingFn).toHaveBeenCalled();
  });

  it('should throw an error when widgetType is a Roadmap kind', () => {
    expect(() =>
      render(
        <HostJsonPatchProviderProvider
          widgetId={mockWidgetId}
          widgetType={WidgetsEnum.Cutting as any}
          mappingFn={() => null}
        >
          <></>
        </HostJsonPatchProviderProvider>,
      ),
    ).toThrow('This provider only can be used by Roadmap chart series');
  });

  it('should throw an error if context is undefined', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce(undefined);
    const { result } = renderHook(() => useHostJsonPatchProvider<any>());
    expect(result.error).toEqual(
      Error('useHostJsonPatchProvider can not be used outside HostJsonPatchProviderProvider'),
    );
  });
});
