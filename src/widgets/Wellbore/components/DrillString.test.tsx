import { render } from '@testing-library/react';
import React from 'react';
import { DrillString } from './DrillString';

describe('Wellbore DrillString', () => {
  const mockedProps = {
    drillString: 'drillString',
    drillStringStroke: '#000000',
    drillStringFill: '#000000',
    drillStringColoring: '#000000',
    drillStringColoringFill: '#000000',
  };

  it('should render BottomHoleAssembly without crashing', () => {
    render(<DrillString {...mockedProps} />);
  });
});
