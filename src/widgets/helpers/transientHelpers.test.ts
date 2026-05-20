import * as TransientMechDragMockedData from '@dt-advisory/helpers/tests/mockedData/transientMechanicalDrag/mockedData.json';
import * as TransientMechTorqueMockedData from '@dt-advisory/helpers/tests/mockedData/transientMechanicalTorque/mockedData.json';
import {
  getTickValuesAndNewXDomain,
  getTransientMechanicalDragSafeData,
  getTransientMechanicalTorqueSafeData,
  toFix,
} from './transientHelpers';

describe('getTransientMechanicalDragSafeData', () => {
  it('should return default values', () => {
    const result = getTransientMechanicalDragSafeData(TransientMechDragMockedData);
    expect(result.bitDepth).toEqual(TransientMechDragMockedData.bitDepth);
  });
  it('should return default values', () => {
    const mockedData1 = {
      ...TransientMechDragMockedData,
      bitDepth: null,
    };
    const result = getTransientMechanicalDragSafeData(mockedData1);
    expect(result.bitDepth).toEqual(600);
  });
});

describe('getTransientMechanicalTorqueSafeData', () => {
  it('should return default values', () => {
    const result = getTransientMechanicalTorqueSafeData(TransientMechTorqueMockedData);
    expect(result.bitDepth).toEqual(TransientMechTorqueMockedData.bitDepth);
  });
  it('should return default values', () => {
    const mockedData2 = {
      ...TransientMechTorqueMockedData,
      bitDepth: null,
    };
    const result = getTransientMechanicalTorqueSafeData(mockedData2);
    expect(result.bitDepth).toEqual(600);
  });
});

describe('toFix', () => {
  it('should return typeof number', () => {
    const result = toFix(12.3);
    expect('number' === typeof result).toBeTruthy();
  });
  it('should return 12', () => {
    const result = toFix(12.3);
    expect(result).toEqual(12);
  });
  it('should return 12', () => {
    const result = toFix(12.323423);
    expect(result).toEqual(12);
  });
  it('should return 12.3 as string', () => {
    const result = toFix('12.3' as unknown as number);
    expect(result).toEqual('12.3');
  });
  it('should return 12.3 as string', () => {
    const result = toFix(undefined as unknown as number);
    expect(result).toEqual(undefined);
  });
});

describe('getTickValuesAndNewXDomain', () => {
  const result = getTickValuesAndNewXDomain({ minYdomain: 0, maxYdomain: 10, numOfTicks: 5 });
  expect(result.newMinDomain).toEqual(-5);
  expect(result.newMaxDomain).toEqual(15);
  expect(result.tickValues).toEqual([-5, -2.5, 0, 2.5, 5, 7.5, 10, 12.5, 15]);
});
