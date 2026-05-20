import { render } from '@testing-library/react';
import React from 'react';
import { InclinationSVG } from './Inclination';

describe('Wellbore InclinationSVG', () => {
  const mockedProps = {
    inclination: [
      [
        20, 161.66113543229363, 389.16596958737153, 152.52026531362063, 393.1981336569722,
        143.37939519494762, 397.2302977265728,
      ],
    ],
  };

  it('should render BottomHoleAssembly without crashing', () => {
    render(<InclinationSVG {...mockedProps} />);
  });
});
