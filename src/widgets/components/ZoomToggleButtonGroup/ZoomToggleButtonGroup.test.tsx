import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import ZoomToggleButtonGroup, { ZoomToggleButtonGroupPropsType } from './ZoomToggleButtonGroup';

describe('ZoomToggleButtonGroup', () => {
  const mockedProps: ZoomToggleButtonGroupPropsType<number> = {
    options: [],
    onChange: jest.fn(),
    value: 1,
    widgetName: 'test',
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<ZoomToggleButtonGroup {...mockedProps} />);
    expect(getByTestId('test-zoom_toggle_button_group_1677587604920')).toBeInTheDocument();
  });
});
