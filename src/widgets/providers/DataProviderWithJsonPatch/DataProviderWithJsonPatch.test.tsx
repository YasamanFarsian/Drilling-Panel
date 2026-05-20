import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { mockedConfigsProviderMock } from '@dt-advisory/helpers/tests/mock/providers';
import { mockedSignalR } from '@dt-advisory/helpers/tests/mock/signalR';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { defaultRoadmapDragValues } from '@dt-advisory/widgets/RoadmapDrag/RoadmapDragConstants';
import DataProviderWithJsonPatchProvider, {
  useDataProviderWithJsonPatch,
} from './DataProviderWithJsonPatch';

mockedConfigsProviderMock();

mockedSignalR();

const mockWidgetId = '663cad60-e4ed-46c5-9c80-ce0c648f66a0';
const messageFullFrame = `
{
  "operationId": "9999",
  "lastUpdated": "2023-11-10T09:18:17.881095Z",
  "data": [
    {
      "op": "replace",
      "path": "",
      "value": {
        "drilling": {
          "line0": [
            {
              "md": 100,
              "val": 0
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

const messageNotFullFrame = `
{
  "operationId": "9999",
  "lastUpdated": "2023-11-10T09:18:17.881095Z",
  "data": [
    {
      "op": "replace",
      "path": "/drilling/line0/0/md",
      "value": 200
    },
    {
      "op": "replace",
      "path": "/drilling/line0/0/val",
      "value": 10
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
        callback(messageFullFrame);
        callback(messageNotFullFrame);
      }),
      off: jest.fn(),
    },
    isConnected: true,
  }),
}));

describe('DataProviderWithJsonPatch Provider', () => {
  it('should return data correctly as per web-socket response', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return (
        <DataProviderWithJsonPatchProvider
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
        </DataProviderWithJsonPatchProvider>
      );
    };

    const { result } = renderHook(() => useDataProviderWithJsonPatch(), {
      wrapper,
    });

    expect(result.current.data).toMatchObject({
      operationId: '9999',
      lastUpdated: '2023-11-10T09:18:17.881095Z',
      currentTime: '',
      data: {
        drilling: {
          line0: [
            {
              md: 200,
              val: 10,
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
      <DataProviderWithJsonPatchProvider
        widgetId={mockWidgetId}
        widgetType={WidgetsEnum.RoadmapDrag}
        mappingFn={mockMappingFn}
      >
        <></>
      </DataProviderWithJsonPatchProvider>,
    );

    expect(mockMappingFn).toHaveBeenCalled();
  });

  it('should throw an error when widgetType is not in any kind of Roadmap', () => {
    expect(() =>
      render(
        <DataProviderWithJsonPatchProvider
          widgetId={mockWidgetId}
          widgetType={WidgetsEnum.Cutting as any}
          mappingFn={() => null}
        >
          <></>
        </DataProviderWithJsonPatchProvider>,
      ),
    ).toThrow('This provider only can be used by Roadmap chart series');
  });

  it('should throw an error if context is undefined', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce(undefined);
    const { result } = renderHook(() => useDataProviderWithJsonPatch<any>());
    expect(result.error).toEqual(
      Error(
        'useDataProviderWithJsonPatch can not be used outside DataProviderWithJsonPatchProvider',
      ),
    );
  });
});
