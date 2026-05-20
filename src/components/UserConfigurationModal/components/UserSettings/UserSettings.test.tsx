import { fireEvent, within } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import UserSettings from './UserSettings';

jest.mock('@dt-advisory/providers/Configs', () => ({
  useConfigs: jest.fn().mockReturnValue({
    operationSelectEnabled: true,
  }),
}));

describe('UserSettings', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<UserSettings />);
    expect(getByTestId('user_configuration_modal_user_settings')).toBeInTheDocument();
  });
  it('should select second tab', () => {
    const { getByRole } = renderWithThemeAndLocaleProviders(<UserSettings />);
    const tablist = getByRole('tablist');
    const tabs = within(tablist).queryAllByRole('tab');
    fireEvent.click(tabs[1]);
    const currentTab = getByRole('tabpanel');
    expect(currentTab.id).toEqual('tabpanel-1');
  });
});
