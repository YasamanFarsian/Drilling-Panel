import {
  checkDateState,
  getActiveState,
  getNewestDate,
} from '@dt-advisory/helpers/noStreamingTimer';
import { getNextActiveOperationId } from './NoStreamingTimerChartGroupProviderHelper';

const mockedOperationList = {
  operations: [
    {
      id: 'foo',
      name: '1',
      active: true,
    },
    {
      id: 'foo',
      name: '1',
      active: true,
    },
  ],
  autoNavigateToActiveOpEnabled: false,
};

describe('getNextActiveOperationId', () => {
  it('should return null if data is undefined', () => {
    const result = getNextActiveOperationId();
    expect(result).toEqual(null);
  });
  it('should return non null', () => {
    const result = getNextActiveOperationId({
      operations: [{ ...mockedOperationList.operations[0] }],
      autoNavigateToActiveOpEnabled: true,
    });
    expect(result).not.toEqual(null);
  });

  it('should return null if autoNavigateToActiveOpEnabled is false', () => {
    const result = getNextActiveOperationId(mockedOperationList);
    expect(result).toEqual(null);
  });
  it('should return null if operations has more than one active operation', () => {
    const result = getNextActiveOperationId({
      ...mockedOperationList,
      autoNavigateToActiveOpEnabled: true,
    });
    expect(result).toEqual(null);
  });

  it('should return correct id ', () => {
    const result = getNextActiveOperationId({
      operations: [
        {
          id: 'foo1',
          name: '1',
          active: false,
        },
        {
          id: 'foo2',
          name: '2',
          active: false,
        },
        {
          id: 'foo3',
          name: '3',
          active: true,
        },
        {
          id: 'foo4',
          name: '4',
          active: false,
        },
      ],
      autoNavigateToActiveOpEnabled: true,
    });
    expect(result).toEqual('foo3');
  });
});

describe('Help NoStreamingTimerChartGroupProviderHelper', () => {
  it('checkDateState should return proper values', () => {
    const data = checkDateState({ lastUpdate: 'foo', currentTime: 'bar' });
    expect(data.state).toBeFalsy();
    expect('function' === typeof data.timestamp.getMonth).toBeTruthy();
  });
  it('getNewestDate should return proper values', () => {
    const today = new Date('2023-01-09T08:21:19.001Z');
    const ago = new Date('2022-12-09T08:20:19.001Z');
    const mockedGetNewestData = [
      {
        state: true,
        timestamp: today,
      },
      {
        state: true,
        timestamp: ago,
      },
    ];
    const data = getNewestDate(mockedGetNewestData);
    expect(data.timestamp.getMonth()).toEqual(today.getMonth());
  });
  it('getActiveState should return proper values', () => {
    const data = getActiveState([]);
    expect(data.state).toBeFalsy();
    expect('function' === typeof data.timestamp.getMonth).toBeTruthy();
  });
});
