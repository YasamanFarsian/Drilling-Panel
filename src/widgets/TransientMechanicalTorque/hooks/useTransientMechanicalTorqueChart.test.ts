import { renderHook } from '@testing-library/react-hooks';
import * as MOCKED_DATA from '@dt-advisory/helpers/tests/mockedData/transientMechanicalTorque/mockedData.json';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import { TransientMechanicalTorqueType } from '../TransientMechanicalTorqueTypes';
import { useTransientMechanicalTorqueChart } from './useTransientMechanicalTorqueChart';

const mockedHookprops = MOCKED_DATA as unknown as TransientMechanicalTorqueType;

describe('useTransientMechanicalDragChart', () => {
  it('should return correct values and min shoud not less than zero', () => {
    const { result } = renderHook(() => useTransientMechanicalTorqueChart(mockedHookprops, 5), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.maxDomain).toMatchObject({
      x: MOCKED_DATA.bitDepth,
      y: MOCKED_DATA.maxYdomain,
    });
    expect(result.current.minDomain).toMatchObject({ x: 0, y: MOCKED_DATA.minYdomain });
    expect(result.current.bitDepth).toEqual(mockedHookprops.bitDepth);
    expect(result.current.lastCasingDepth).toEqual(mockedHookprops.lastCasingDepth);
    expect(result.current.torsionalLimit[0]).toMatchObject({
      x: 1,
      y: 3,
    });
    expect(result.current.torque[0]).toMatchObject({
      x: 1,
      y: 2,
    });
    expect(result.current.hideAxisLabel).toEqual(false);
  });
  it('should return correct values', () => {
    const mockedHookprops2 = {
      ...mockedHookprops,
      bitDepth: null,
      lastCasingDepth: null,
      mechanicalProfiles: null,
    } as unknown as TransientMechanicalTorqueType;
    const { result } = renderHook(() => useTransientMechanicalTorqueChart(mockedHookprops2, 5), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.torsionalLimit).toMatchObject([]);
    expect(result.current.torque).toMatchObject([]);
    expect(result.current.bitDepth).toEqual(0);
    expect(result.current.lastCasingDepth).toEqual(0);
  });

  it('should return min value is zero if minValue is undefined', () => {
    const mockedHookprops2 = {
      operationId: MOCKED_DATA.operationId,
      lastUpdate: MOCKED_DATA.lastUpdated,
      maxYdomain: MOCKED_DATA.maxYdomain,
      currentTime: MOCKED_DATA.currentTime,
      bitDepth: MOCKED_DATA.bitDepth,
      lastCasingDepth: MOCKED_DATA.lastCasingDepth,
      mechanicalProfiles: MOCKED_DATA.mechanicalProfiles,
    } as unknown as TransientMechanicalTorqueType;
    const { result } = renderHook(() => useTransientMechanicalTorqueChart(mockedHookprops2, 5), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.minDomain).toMatchObject({ x: 0, y: 0 });
  });

  it('should return max value is zero if maxValue is undefined', () => {
    const mockedHookprops2 = {
      operationId: MOCKED_DATA.operationId,
      lastUpdate: MOCKED_DATA.lastUpdated,
      minYdomain: MOCKED_DATA.minYdomain,
      currentTime: MOCKED_DATA.currentTime,
      bitDepth: MOCKED_DATA.bitDepth,
      lastCasingDepth: MOCKED_DATA.lastCasingDepth,
      mechanicalProfiles: MOCKED_DATA.mechanicalProfiles,
    } as unknown as TransientMechanicalTorqueType;
    const { result } = renderHook(() => useTransientMechanicalTorqueChart(mockedHookprops2, 5), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.maxDomain).toMatchObject({
      x: MOCKED_DATA.bitDepth,
      y: 0,
    });
  });
});
