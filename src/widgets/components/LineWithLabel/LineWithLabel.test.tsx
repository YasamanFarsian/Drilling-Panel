import { render } from '@testing-library/react';
import React from 'react';
import LineWithLabel, { LineWithLabelPropsType } from './LineWithLabel';

describe('LineWithLabel', () => {
  const mockedLineProps: LineWithLabelPropsType = {
    data: [
      { x: 10, y: 10 },
      { x: 20, y: 20 },
    ],
    lineColor: 'red',
  };

  it('should render without crashing', () => {
    const { container } = render(<LineWithLabel {...mockedLineProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply the correct stroke color', () => {
    const { container } = render(<LineWithLabel {...mockedLineProps} />);
    const lineElement = container.querySelector('path');
    expect(lineElement).toBeInTheDocument();
    expect(lineElement).toHaveStyle({ stroke: 'red' });
  });

  it('should not render anything if data is empty', () => {
    const { container } = render(<LineWithLabel {...mockedLineProps} data={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
