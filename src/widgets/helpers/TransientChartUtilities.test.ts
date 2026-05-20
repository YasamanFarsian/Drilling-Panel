import * as transientDragMockedData from '@dt-advisory/helpers/tests/mockedData/transientMechanicalDrag/mockedData.json';
import * as transientTorqueMockedData from '@dt-advisory/helpers/tests/mockedData/transientMechanicalTorque/mockedData.json';
import { TransientChartUtilities } from './TransientChartUtilities';

const mockDomain = {
  minDomain: { x: 0, y: 0 },
  maxDomain: { x: 600, y: 200 },
};

function initialTransientChartUtilities() {
  return new TransientChartUtilities(mockDomain.minDomain, mockDomain.maxDomain);
}

function initialTransientChartUtilitiesWithMockData(source: 'torque' | 'drag') {
  const mockedData = source === 'drag' ? transientDragMockedData : transientTorqueMockedData;
  const minDomain = {
    x: 0,
    y: mockedData.minYdomain,
  };
  const maxDomain = {
    x: mockedData.bitDepth,
    y: mockedData.maxYdomain,
  };
  return new TransientChartUtilities(minDomain, maxDomain);
}

console.error = jest.fn();

describe('TransientChartUtilities', () => {
  it('the domain value should change after new value was assigned', () => {
    const chart = initialTransientChartUtilities();

    const setNewDomainValue = {
      minDomain: { x: 10, y: 10 },
      maxDomain: { x: 700, y: 500 },
    };

    chart.setDomain(setNewDomainValue.minDomain, setNewDomainValue.maxDomain);
    expect(chart.getActiveDomain()).toEqual(setNewDomainValue);
  });

  it('the chart should calculate correctly.', () => {
    const chart = initialTransientChartUtilities();

    const testLineValue = [
      { x: 5, y: 20 },
      { x: 500, y: 100 },
    ];
    const plotData = chart.fitThePlotOn('x').withValuesOf(testLineValue, 'x', 'y').getPlotData();
    expect(plotData[0]).toEqual({ x: 0, y: testLineValue[0].y });
    expect(plotData[plotData.length - 1]).toEqual({
      x: mockDomain.maxDomain.x,
      y: testLineValue[testLineValue.length - 1].y,
    });
  });

  it('the console.error should have been called when input data has wrong format.', () => {
    const chart = initialTransientChartUtilities();

    const testLineValue = [{ x: 'string', y: 'string' }];
    chart.fitThePlotOn('x').withValuesOf(testLineValue, 'x', 'y').getPlotData();
    expect(console.error).toHaveBeenCalled();
  });

  it('should properly filter mechanical profiles for drag', () => {
    const chart = initialTransientChartUtilitiesWithMockData('drag');
    const filteredMechanicalProfiles = chart.filterDragMechanicalProfiles(
      transientDragMockedData.mechanicalProfiles,
    );
    const len = filteredMechanicalProfiles.length;
    expect(filteredMechanicalProfiles[0].MD).toEqual(0);
    expect(filteredMechanicalProfiles[len - 1].MD).toEqual(transientDragMockedData.bitDepth);
  });

  it('should properly filter mechanical profiles for torque', () => {
    const chart = initialTransientChartUtilitiesWithMockData('torque');
    const filteredMechanicalProfiles = chart.filterTorqueMechanicalProfiles(
      transientTorqueMockedData.mechanicalProfiles,
    );
    const len = filteredMechanicalProfiles.length;
    expect(filteredMechanicalProfiles[0].MD).toEqual(0);
    expect(filteredMechanicalProfiles[len - 1].MD).toEqual(transientTorqueMockedData.bitDepth);
  });
});
