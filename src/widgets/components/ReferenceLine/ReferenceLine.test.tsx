import { within } from '@testing-library/react';
import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import ReferenceLine from './ReferenceLine';

describe('Component ReferenceLine', () => {
  const mockedProps = {
    depth: 0,
    colorStrokeType: 'casingShoeDepth',
    domain: {
      x: [0, 1],
      y: [0, 1],
    },
  };

  const getStrokeColor = (colorStrokeType: string, inactive?: boolean) => {
    const { container } = renderWithThemeProviders(
      <ReferenceLine
        {...mockedProps}
        colorStrokeType={colorStrokeType}
        inactive={inactive ?? false}
      />,
    );
    const el = within(container).queryByRole('presentation');
    const style = el?.style;
    return style?.stroke;
  };

  it('should render ReferenceLine without crashing', () => {
    const { container } = renderWithThemeProviders(<ReferenceLine {...mockedProps} />);
    const el = within(container).queryByRole('reference-line');
    expect(el).toBeInTheDocument();
  });

  it('should render ReferenceLine with colorStrokeType casingShoeDepth', () => {
    expect(getStrokeColor('casingShoeDepth')).toEqual('#C3C2C1');
  });

  it('should render ReferenceLine with colorStrokeType bitDepth', () => {
    expect(getStrokeColor('bitDepth')).toEqual('#DA914D');
  });
  it('should render ReferenceLine with colorStrokeType holeDepth', () => {
    expect(getStrokeColor('holeDepth')).toEqual('#FFFFFFFC');
  });
  it('should render ReferenceLine with colorStrokeType default', () => {
    expect(getStrokeColor('default')).toEqual('#5d5db0');
  });
  it('should render ReferenceLine with colorStrokeType inactive', () => {
    expect(getStrokeColor('default', true)).toEqual('#D0D1D2');
  });
});
