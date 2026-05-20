import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import ToggleButtonGroup, { ToggleButtonGroupPropsType } from './ToggleButtonGroup';

describe('ToggleButtonGroup', () => {
  const mockedProps: ToggleButtonGroupPropsType<string> = {
    options: [
      {
        value: '1',
        label: 'one',
      },
    ],
    value: 'foo',
    onChange: jest.fn(),
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<ToggleButtonGroup {...mockedProps} />);
    expect(getByTestId('toggle_button_group_1676551568116')).toBeInTheDocument();
  });
});
