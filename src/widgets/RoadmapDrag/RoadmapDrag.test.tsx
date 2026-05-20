import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { mockedSignalR } from '@dt-advisory/helpers/tests/mock/signalR';
import renderWithThemeAndLocaleProviders from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import NoStreamingTimerChartGroupProvider from '@dt-advisory/providers/NoStreamingTimerChartGroup';
import ReconnectingChartGroupProvider from '@dt-advisory/providers/ReconnectingChartGroup';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import DataProviderWithJsonPatchProvider, {
  useDataProviderWithJsonPatch,
} from '@dt-advisory/widgets/providers/DataProviderWithJsonPatch';
import RoadmapDrag from './RoadmapDrag';
import { useRoadmapDrag } from './hooks/useRoadmapDrag';
import * as mockedData from '@dt-advisory/helpers/tests/mockedData/roadmap/patched.mock.json';

jest.mock('./hooks/useRoadmapDrag.ts');
const mockUseRoadmapDrag = (isOpenSetting: boolean, isShowGraph: boolean) => {
  (useRoadmapDrag as jest.Mock).mockReturnValue({
    isOpenSetting,
    isShowGraph,
    data: mockedData,
  });
};
jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }), // Directly test on translation key
}));

jest.mock('@dt-advisory/store/Settings', () => ({
  useSettingsStore: jest.fn().mockReturnValue({
    roadmapDrag: {
      setting: {
        roadmapDragId: {
          open: false,
        },
      },
    },
  }),
}));

mockedSignalR();
describe('RoadmapDrag', () => {
  const mockedProps = {
    isSmallVersion: false,
    widgetId: 'roadmapDragId',
    HostDataProvider: DataProviderWithJsonPatchProvider,
    useHostDataProvider: useDataProviderWithJsonPatch,
  };

  it('should render without crashing', () => {
    mockUseRoadmapDrag(false, false);
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <RoadmapDrag {...mockedProps} />
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );

    expect(getByTestId('baseWidget_RoadmapDrag')).toBeInTheDocument();
    expect(getByTestId(`container_${WidgetsLoaderEnum.RoadmapDrag}`)).toBeInTheDocument();
    expect(getByTestId('loading-dark')).toBeInTheDocument();
  });

  it('should render loader', async () => {
    mockUseRoadmapDrag(false, false);
    const { queryByRole } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <RoadmapDrag {...mockedProps} />
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );
    await waitFor(() => expect(queryByRole('loading-dark')).toBeInTheDocument());
  });

  it('should render settings', async () => {
    mockUseRoadmapDrag(true, true);
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <RoadmapDrag {...mockedProps} />
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );

    await waitFor(() =>
      expect(getByTestId('unassigned-road_map_setting_1688530817019')).toBeInTheDocument(),
    );
  });

  const renderWithState = (value: string, apiIsDrilling?: boolean) => {
    (useSettingsStore as unknown as jest.Mock).mockImplementation((cb) =>
      cb({ settings: { roadmap: { mockId: { state: value } } } }),
    );
    renderWithThemeAndLocaleProviders(<RoadmapDrag {...mockedProps} widgetId="mockId" />);
  };

  describe('widget title', () => {
    it('should use key widget title as widget.roadmapDrag.title.tripping if roadmapDrag state is Tripping', async () => {
      renderWithState('Tripping');
      await waitFor(() =>
        expect(screen.queryByText('widget.roadmapDrag.title.tripping')).toBeInTheDocument(),
      );
    });

    it('should use key widget title as widget.roadmapDrag.title.drilling if roadmapDrag state is Drilling', async () => {
      renderWithState('Drilling');
      await waitFor(() =>
        expect(screen.queryByText('widget.roadmapDrag.title.drilling')).toBeInTheDocument(),
      );
    });

    it.skip('should use key widget title as widget.roadmapDrag.title.default if roadmapDrag state is Automatic and api is undefined', async () => {
      renderWithState('Automatic');

      await waitFor(() =>
        expect(screen.queryByText('widget.roadmapDrag.title.default')).toBeInTheDocument(),
      );
    });
  });
});
