import React from 'react';
import mockedData from '@dt-advisory/helpers/tests/mockedData/ecd/ecd.dump.json';
import renderWithAllProviders from '@dt-advisory/helpers/tests/renderWithContext';
import { ECDStream } from '../../EcdTypes';
import EcdChart from './EcdChart';

describe('ECD EcdChart', () => {
  const mockedProps = {
    data: mockedData as ECDStream,
    widgetId: 'test',
    numOfTicks: 5,
  };

  it('should render EcdChart without crashing', () => {
    const { getByTestId } = renderWithAllProviders(<EcdChart {...mockedProps} inactive={false} />);
    expect(getByTestId('Ecd-cartesian_graph')).toBeInTheDocument();
  });

  it('should render EcdChart without crashing when inactive true', () => {
    const { getByTestId } = renderWithAllProviders(<EcdChart {...mockedProps} inactive={true} />);
    expect(getByTestId('Ecd-cartesian_graph')).toBeInTheDocument();
  });
});
