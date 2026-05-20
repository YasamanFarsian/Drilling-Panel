import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import AppearanceAndNotifications from './AppearanceAndNotifications';

describe('AppearanceAndNotifications', () => {
  it('should render when operationSelectEnabled is true', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <AppearanceAndNotifications operationSelectEnabled />,
    );
    expect(getByTestId('appearance_and_notifications_1676544175517')).toBeInTheDocument();
    expect(getByTestId('operation_id_selection_1676545036542')).toBeInTheDocument();
  });
  it('should render when operationSelectEnabled is false', () => {
    const { getByTestId, queryByTestId } = renderWithThemeAndLocaleProviders(
      <AppearanceAndNotifications operationSelectEnabled={false} />,
    );
    expect(getByTestId('appearance_and_notifications_1676544175517')).toBeInTheDocument();
    expect(queryByTestId('operation_id_selection_1676545036542')).not.toBeInTheDocument();
  });
});
