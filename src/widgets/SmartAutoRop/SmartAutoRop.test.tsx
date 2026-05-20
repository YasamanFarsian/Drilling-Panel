import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { mockedSignalR } from '@dt-advisory/helpers/tests/mock/signalR';
import renderWithThemeAndLocaleProviders from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import NoStreamingTimerChartGroupProvider from '@dt-advisory/providers/NoStreamingTimerChartGroup';
import ReconnectingChartGroupProvider from '@dt-advisory/providers/ReconnectingChartGroup';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import DataProvider, { useDataProvider } from '@dt-advisory/widgets/providers/DataProvider';
import SmartAutoRop from './SmartAutoRop';

mockedSignalR();
const renderWithAllSmartAutoRopProviders = (renderComponent: React.ReactNode) => {
  return renderWithThemeAndLocaleProviders(
    <ConfigsProvider>
      <ReconnectingChartGroupProvider>
        <NoStreamingTimerChartGroupProvider>{renderComponent}</NoStreamingTimerChartGroupProvider>
      </ReconnectingChartGroupProvider>
    </ConfigsProvider>,
  );
};

const mockedProps = {
  widgetId: 'foo',
  HostDataProvider: DataProvider,
  useHostDataProvider: useDataProvider,
};

describe('SmartAutoRop', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it.each([true, false])(
    'should render smallversion: %p without crashing',
    (isSmallVersion: boolean) => {
      const { getByTestId } = renderWithAllSmartAutoRopProviders(
        <SmartAutoRop {...mockedProps} isSmallVersion={isSmallVersion} />,
      );
      expect(getByTestId('baseWidget_SmartAutoRop')).toBeInTheDocument();
      expect(getByTestId(`container_${WidgetsLoaderEnum.SmartAutoRop}`)).toBeInTheDocument();
      expect(getByTestId('loading-dark')).toBeInTheDocument();
    },
  );
  it.each([true, false])(
    'should not render loader smallversion: %p',
    async (isSmallVersion: boolean) => {
      const { queryByRole } = renderWithAllSmartAutoRopProviders(
        <SmartAutoRop {...mockedProps} isSmallVersion={isSmallVersion} />,
      );
      await waitFor(() => expect(queryByRole('loading-dark')).not.toBeInTheDocument());
    },
  );

  it.each([true, false])('should render with API active status %p', async (active: boolean) => {
    const { getByTestId, queryByRole } = renderWithAllSmartAutoRopProviders(
      <SmartAutoRop {...mockedProps} />,
    );

    expect(getByTestId('baseWidget_SmartAutoRop')).toBeInTheDocument();
    expect(getByTestId(`container_${WidgetsLoaderEnum.SmartAutoRop}`)).toBeInTheDocument();
    await waitFor(() => expect(queryByRole('loading-dark')).not.toBeInTheDocument());
  });

  describe('axis_label_toggle', () => {
    it('should render smart_auto_rop_information_1683620170570 by default', async () => {
      renderWithAllSmartAutoRopProviders(<SmartAutoRop {...mockedProps} />);
      await waitFor(() =>
        expect(
          screen.queryByTestId('smart_auto_rop_information_1683620170570'),
        ).toBeInTheDocument(),
      );
    });

    it('should not render smart_auto_rop_information_1683620170570 when click on axis_label_toggle--button', () => {
      renderWithAllSmartAutoRopProviders(<SmartAutoRop {...mockedProps} />);
      fireEvent.click(screen.getByTestId('axis_label_toggle--button'));
      expect(
        screen.queryByTestId('smart_auto_rop_information_1683620170570'),
      ).not.toBeInTheDocument();
    });
  });
});
