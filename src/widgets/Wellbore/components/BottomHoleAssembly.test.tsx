import { render } from '@testing-library/react';
import React from 'react';
import { BottomHoleAssembly } from './BottomHoleAssembly';

describe('Wellbore Bottom Hole Assembly', () => {
  const mockedProps = {
    bhaTransform: 'foo',
    bitRotation: true,
  };

  it('should render BottomHoleAssembly without crashing', () => {
    render(<BottomHoleAssembly {...mockedProps} />);
  });
});
