import { render } from '@testing-library/react';
import React from 'react';
import { NeutralPoint } from './NeutralPoint';

describe('Wellbore NeutralPoint', () => {
  const mockedProps = {
    neutralPointX: 1,
    neutralPointY: 2,
    neutralPointFill: '#fefefe',
    neutralPointStroke: 'fill',
  };

  it('should render NeutralPoint without crashing', () => {
    render(<NeutralPoint {...mockedProps} />);
  });
});
