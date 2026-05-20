import * as mockedData from '@dt-advisory/helpers/tests/mockedData/roadmap/patch.mock.json';
import { RoadmapDragDataType } from '../RoadmapDragTypes';
import {
  getDotsFromModel,
  getRoadmapDragSafeData,
  mappingWsToChartData,
} from './roadmapDragHelper';

describe('getRoadmapDragSafeData', () => {
  it('should return correct data', () => {
    const result = getRoadmapDragSafeData(mockedData as any);
    expect(result).toEqual(mockedData);
  });
});

describe('getDotsFromModel', () => {
  const dotsMocked = {
    kinLeftMeasured: [{ md: 1, val: 2 }],
    kinCenterMeasured: [{ md: 1, val: 2 }],
    kinRightMeasured: [{ md: 1, val: 2 }],
    statLeftMeasured: [{ md: 10, val: 20 }],
    statCenterMeasured: [{ md: 10, val: 20 }],
    statRightMeasured: [{ md: 10, val: 20 }],
    leftMeasured: [{ md: 100, val: 200 }],
    centerMeasured: [{ md: 100, val: 200 }],
    rightMeasured: [{ md: 100, val: 200 }],
  } as RoadmapDragDataType;
  it('should return correct values for model TransientKinetic', () => {
    const result = getDotsFromModel('TransientKinetic', dotsMocked);
    expect(result).toMatchObject({
      dotsLeft: [{ md: 1, val: 2 }],
      dotsCenter: [{ md: 1, val: 2 }],
      dotsRight: [{ md: 1, val: 2 }],
    });
  });
  it('should return correct values for model TransientStatic', () => {
    const result = getDotsFromModel('TransientStatic', dotsMocked);
    expect(result).toMatchObject({
      dotsLeft: [{ md: 10, val: 20 }],
      dotsCenter: [{ md: 10, val: 20 }],
      dotsRight: [{ md: 10, val: 20 }],
    });
  });
  it('should return correct values for model SteadyState', () => {
    const result = getDotsFromModel('Steadystate', dotsMocked);
    expect(result).toMatchObject({
      dotsLeft: [{ md: 100, val: 200 }],
      dotsCenter: [{ md: 100, val: 200 }],
      dotsRight: [{ md: 100, val: 200 }],
    });
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
      lastUpdated: '',
      currentTime: 'mock-curr-time',
      data: { md: 40 },
    });
  });
});
