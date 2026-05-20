import { waitFor } from '@testing-library/react';
import React from 'react';
import { mockedSignalR } from '@dt-advisory/helpers/tests/mock/signalR';
import renderWithThemeAndLocaleProviders from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import DataProvider, { useDataProvider } from '@dt-advisory/widgets/providers/DataProvider';
import Wellbore from './Wellbore';

mockedSignalR();

describe('Wellbore', () => {
  const mockedProps = {
    widgetId: 'mocked-wellbore',
    HostDataProvider: DataProvider,
    useHostDataProvider: useDataProvider,
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <Wellbore {...mockedProps} />
      </ConfigsProvider>,
    );
    expect(getByTestId('baseWidget_Wellbore')).toBeInTheDocument();
    expect(getByTestId('loading-dark')).toBeInTheDocument();
  });
  it('shoudl not render loader', async () => {
    const { queryByRole } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <Wellbore {...mockedProps} />
      </ConfigsProvider>,
    );
    await waitFor(() => expect(queryByRole('loading-dark')).not.toBeInTheDocument());
  });
});
