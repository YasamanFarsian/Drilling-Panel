/* eslint-disable */
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import {
  ConfigurationStoreType,
  useUserConfigurationStore,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import HeaderConfigValues from './HeaderConfigValues';

jest.mock('@dt-advisory/store/UserConfiguration/UserConfiguration');

const mockUserConfigurationStore = () => {
  const mockState: Partial<ConfigurationStoreType> = {
    configIsLoaded: true,
  };
  (useUserConfigurationStore as unknown as jest.Mock).mockImplementation((callback) =>
    callback(mockState),
  );
};

jest.mock('./useQueryHeaderConfigValues', () => {
  return jest.fn().mockReturnValue({
    isLoading: false,
    headerConfigValues: [
      { key: '1', value: 'foo' },
      { key: '2', value: 'bar' },
    ],
  });
});

describe('HeaderConfigValues', () => {
  const mockedProps = {};

  it('should not render headerConfigValues', () => {
    const { queryByTestId } = renderWithThemeAndLocaleProviders(
      <HeaderConfigValues {...mockedProps} />,
    );
    expect(queryByTestId('header-config-values')).not.toBeInTheDocument();
  });
  it('should render headerConfigValues', () => {
    mockUserConfigurationStore();
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <HeaderConfigValues {...mockedProps} />,
    );
    expect(getByTestId('header-config-values')).toBeInTheDocument();
  });
});
