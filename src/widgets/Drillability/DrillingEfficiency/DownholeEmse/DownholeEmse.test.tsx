import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import DownholeEmseGraph from './DownholeEmse';

describe('DownholeEmseGraph Component', () => {
  it('should render without crashing', () => {
    renderWithThemeProviders(<DownholeEmseGraph val={0} label="DownholeEmse" />);
  });

  it('renders with maximum val and Up direction', () => {
    renderWithThemeProviders(<DownholeEmseGraph val={2} label="DownholeEmse" />);
    const maxText = screen.getByText('2');
    expect(maxText).toBeInTheDocument();
  });

  it('renders with minimum val and Down direction', () => {
    renderWithThemeProviders(<DownholeEmseGraph val={-2} label="DownholeEmse" />);
    const minText = screen.getByText('-2');
    expect(minText).toBeInTheDocument();
  });

  it('handles out-of-range val correctly', () => {
    renderWithThemeProviders(<DownholeEmseGraph val={15} label="DownholeEmse" />);
    const outOfRangeText = screen.getByText('15');
    expect(outOfRangeText).toBeInTheDocument();
  });
});
