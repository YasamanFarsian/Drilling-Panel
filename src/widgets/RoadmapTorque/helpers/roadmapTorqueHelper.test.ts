import * as mockedData from '@dt-advisory/helpers/tests/mockedData/roadmap/patch.mock.json';
import { RoadmapTorqueDataType } from '../RoadmapTorqueTypes';
import {
  getDotsFromModel,
  getRoadmapTorqueSafeData,
  mappingWsToChartData,
} from './roadmapTorqueHelper';

describe('getRoadmapTorqueSafeData', () => {
  it('should return correct data', () => {
    const result = getRoadmapTorqueSafeData(mockedData as any);
    expect(result).toEqual(mockedData);
  });
});

const dotsMocked = {
  measured: [{ md: 1, val: 2 }],
  measuredDown: [{ md: 1, val: 2 }],
  measuredUp: [{ md: 1, val: 2 }],
  kinMeasured: [{ md: 10, val: 20 }],
  kinMeasuredDown: [{ md: 10, val: 20 }],
  kinMeasuredUp: [{ md: 10, val: 20 }],
  statMeasured: [{ md: 100, val: 200 }],
  statMeasuredDown: [{ md: 100, val: 200 }],
  statMeasuredUp: [{ md: 100, val: 200 }],
} as RoadmapTorqueDataType;

const getDotsDataPointsFrom = (model: string) => {
  switch (model) {
    case 'TransientKinetic':
      return {
        dotsLeft: dotsMocked.kinMeasured,
        dotsCenter: dotsMocked.kinMeasuredDown,
        dotsRight: dotsMocked.kinMeasuredUp,
      };
    case 'TransientStatic':
      return {
        dotsLeft: dotsMocked.statMeasured,
        dotsCenter: dotsMocked.statMeasuredDown,
        dotsRight: dotsMocked.statMeasuredUp,
      };
    case 'Steadystate':
    default:
      return {
        dotsLeft: dotsMocked.measured,
        dotsCenter: dotsMocked.measuredDown,
        dotsRight: dotsMocked.measuredUp,
      };
  }
};

describe('getDotsFromModel', () => {
  it('should return correct values for model TransientKinetic', () => {
    const result = getDotsFromModel('TransientKinetic', dotsMocked);
    expect(result).toMatchObject(getDotsDataPointsFrom('TransientKinetic'));
  });
  it('should return correct values for model TransientStatic', () => {
    const result = getDotsFromModel('TransientStatic', dotsMocked);
    expect(result).toMatchObject(getDotsDataPointsFrom('TransientStatic'));
  });
  it('should return correct values for model SteadyState', () => {
    const result = getDotsFromModel('Steadystate', dotsMocked);
    expect(result).toMatchObject(getDotsDataPointsFrom('Steadystate'));
  });
});

describe('mappingWsToChartData', () => {
  it('should return mapped data correctly', () => {
    const result = mappingWsToChartData(
      {
        currentTime: 'mock-curr-time',
        lastUpdated: undefined,
        operationId: 'mock-op-id',
        isLive: false,
      },
      { md: 40 } as any,
    );

    expect(result).toMatchObject({
      operationId: 'mock-op-id',
      currentTime: 'mock-curr-time',
      data: { md: 40 },
    });
  });
});
