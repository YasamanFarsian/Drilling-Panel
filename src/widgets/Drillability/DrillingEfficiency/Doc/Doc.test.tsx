import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import DocGraph from './Doc';

describe('DocGraph Component', () => {
  it('should render without crashing', () => {
    renderWithThemeProviders(<DocGraph val={0} label="DOC" />);
  });

  it('should render without crashing with val=10', () => {
    renderWithThemeProviders(<DocGraph widgetName="widgetName" val={10} label="DOC" />);
    const arcCircle = screen.getByTestId('widgetName-docGraph-arc-circle');
    expect(arcCircle).toBeInTheDocument();

    const arcPath = screen.getByTestId('widgetName-docGraph-arc-path');
    expect(arcPath).toBeInTheDocument();

    const valText = screen.getByTestId('widgetName-docGraph-val-text');
    expect(valText).toBeInTheDocument();

    const labelText = screen.getByTestId('widgetName-docGraph-label-text');
    expect(labelText).toBeInTheDocument();
  });

  it('should render with label text', () => {
    renderWithThemeProviders(<DocGraph val={5} label="Bit hyd(HSI)" />);
    expect(screen.getByText('Bit hyd(HSI)')).toBeInTheDocument();
  });
});
