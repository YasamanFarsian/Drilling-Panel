import { screen } from '@testing-library/react';
import React from 'react';
import { mockedSignalR } from '@dt-advisory/helpers/tests/mock/signalR';
import renderWithThemeAndLocaleProviders from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import NoStreamingTimerChartGroupProvider from '@dt-advisory/providers/NoStreamingTimerChartGroup';
import ReconnectingChartGroupProvider from '@dt-advisory/providers/ReconnectingChartGroup';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import DataProviderWithJsonPatchProvider, {
  useDataProviderWithJsonPatch,
} from '@dt-advisory/widgets/providers/DataProviderWithJsonPatch';
import { useRoadmapTorque } from './hooks/useRoadmapTorque';
import RoadmapTorque from './RoadmapTorque';

mockedSignalR();
const mockedProps = {
  widgetId: 'mock-roadmao-torque',
  HostDataProvider: DataProviderWithJsonPatchProvider,
  useHostDataProvider: useDataProviderWithJsonPatch,
};

jest.mock('./hooks/useRoadmapTorque');
describe('RoadmapTorque', () => {
  it('should render without crashing', () => {
    (useRoadmapTorque as jest.Mock).mockReturnValue({
      data: {
        operationId: 'test-id',
        data: {},
      },
      isLive: true,
      isShowGraph: false,
      isOpenSetting: true,
    });

    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <RoadmapTorque {...mockedProps} />
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );

    expect(getByTestId('baseWidget_RoadmapTorque')).toBeInTheDocument();
    expect(getByTestId(`container_${WidgetsLoaderEnum.RoadmapTorque}`)).toBeInTheDocument();
    expect(getByTestId('loading-dark')).toBeInTheDocument();
  });

  it('should render RoadmapSetting with correct data-testid', () => {
    (useRoadmapTorque as jest.Mock).mockReturnValue({
      data: {
        operationId: 'test-id',
        data: {},
      },
      isLive: true,
      isShowGraph: true,
      isOpenSetting: true,
    });

    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <RoadmapTorque {...mockedProps} />
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );

    const settingElement = getByTestId('RoadmapTorque-road_map_setting_1688530817019');
    expect(settingElement).toBeInTheDocument();
  });
});
