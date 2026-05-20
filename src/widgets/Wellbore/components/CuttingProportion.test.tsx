import { render } from '@testing-library/react';
import React from 'react';
import { CuttingProportion } from './CuttingProportion';

describe('Wellbore CuttingProportion', () => {
  const mockedProps = {
    cuttingProportion: 'cuttingProportion',
    cuttingProportionStroke: 'cuttingProportionStroke',
    cuttingProportionFill: 'cuttingProportionFill',
  };

  it('should render CuttingProportion without crashing', () => {
    render(<CuttingProportion {...mockedProps} />);
  });
});
