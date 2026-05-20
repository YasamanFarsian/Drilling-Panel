import React from 'react';
import { renderWithThemeProviders } from '../../../helpers/tests/renderWithContext';
import { XAxis, YAxis } from './Axis';

describe('Wellbore Axis', () => {
  const XSVGAxisProps = {
    x: [
      {
        label: 1,
        sx: 1,
      },
    ],
    y: [
      {
        label: 2,
        sy: 2,
      },
    ],
  };
  const XAxisProps = {
    x: {
      screenMin: 1,
      screenMax: 1,
      min: 1,
      max: 1,
      stepsCount: 1,
    },
    y: {
      screenMin: 1,
      screenMax: 1,
      min: 1,
      max: 1,
      stepsCount: 1,
    },
  };

  it('should not render XAxis without crashing', () => {
    renderWithThemeProviders(
      <XAxis hideAxisLabel={false} svgAxis={XSVGAxisProps} axis={XAxisProps} />,
    );
  });

  it('should render YAxis without crashing', () => {
    renderWithThemeProviders(
      <YAxis hideAxisLabel={true} svgAxis={XSVGAxisProps} axis={XAxisProps} />,
    );
  });
});
