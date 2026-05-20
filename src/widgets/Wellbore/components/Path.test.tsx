import { render } from '@testing-library/react';
import React from 'react';
import { Path } from './Path';

describe('Wellbore Path', () => {
  const mockedProps = {
    d: '',
    stroke: '',
    fill: '',
    filter: '',
  };

  it('should render BottomHoleAssembly without crashing', () => {
    render(<Path {...mockedProps} />);
  });
});
