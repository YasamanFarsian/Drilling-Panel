import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import CartesianGraph from '../CartesianGraph';
import RoadmapCommonAxis, { RoadmapCommonAxisPropsType } from './RoadmapCommonAxis';

describe('RoadmapCommonAxis', () => {
  const mockedProps: RoadmapCommonAxisPropsType = {
    depthAxisLabel: 'depthmocklabel',
    depthAxisUnit: 'depthmockUnit',
    isSmallVersion: false,
    hideAxisLabel: false,
    maxDomain: { x: 100, y: 10 },
    xAxisLabel: 'xaxismocklabel',
    xAxisUnit: 'testUnit',
    tickOffsetY: 4,
    tickValues: [1, 2, 3],
  };

  it('should render without crashing', () => {
    renderWithThemeAndLocaleProviders(
      <CartesianGraph maxDomain={mockedProps.maxDomain}>
        <RoadmapCommonAxis {...mockedProps} />
      </CartesianGraph>,
    );
  });
});
