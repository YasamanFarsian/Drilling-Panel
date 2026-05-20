import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import AxisLabelToggle, { AxisLabelTogglePropsType } from './AxisLabelToggle';

describe('AxisLabelToggle', () => {
  const mockedProps: AxisLabelTogglePropsType = { type: 'cutting' };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<AxisLabelToggle {...mockedProps} />);
    expect(getByTestId('axis_label_toggle--button')).toBeInTheDocument();
  });
});
