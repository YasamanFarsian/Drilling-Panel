import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import Notifications from './Notifications';

describe('Notifications', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<Notifications />);
    expect(getByTestId('notifications_1676545381536')).toBeInTheDocument();
  });
});
