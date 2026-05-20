import { UnitsConfiguration } from '@dt-advisory/api/units/units.types';
import { setConfigResponse } from '@dt-advisory/helpers/units/unitsHelper';
import { convertSectionValue, formatValue, PLACEHOLDER } from './headerConfigValuesHelper';

describe('headerConfigValuesHelper', () => {
  const mockedProps = {};
  const mockConfig: UnitsConfiguration = {
    PipeDiameter: { unit: 'Inch', conversion: 'x*2' },
  };

  it('formatValue return proper values', () => {
    const result = formatValue(14.08989);
    expect(result).toEqual(14.09);
  });

  it('formatValue return proper values', () => {
    const result = formatValue(0);
    expect(result).toEqual(0);
  });

  it('formatValue return proper values if undefined', () => {
    const result = formatValue(undefined);
    expect(result).toEqual('-');
  });

  it('formatValue return proper values', () => {
    const result = formatValue('foo');
    expect(result).toEqual('foo');
  });

  it('formatValue return proper values if empty string', () => {
    const result = formatValue('');
    expect(result).toEqual('-');
  });

  it('formatValue return proper values if null', () => {
    const result = formatValue(null);
    expect(result).toEqual('-');
  });

  it('convertSectionValue: should return PLACEHOLDER for undefined, null, or empty string values', () => {
    expect(convertSectionValue(undefined)).toBe(PLACEHOLDER);
    expect(convertSectionValue(null)).toBe(PLACEHOLDER);
    expect(convertSectionValue('')).toBe(PLACEHOLDER);
  });

  it('convertSectionValue : should return the converted value for numeric inputs', () => {
    setConfigResponse(mockConfig);
    expect(convertSectionValue(10)).toBe('20.000');
  });

  it('convertSectionValue : should return the original value for non-numeric string inputs', () => {
    expect(convertSectionValue('some string')).toBe('some string');
  });

  it('convertSectionValue : should handle edge cases for numeric inputs correctly', () => {
    setConfigResponse(mockConfig);
    expect(convertSectionValue(0)).toBe('0.000');
    expect(convertSectionValue(-5)).toBe('-10.000');
    expect(convertSectionValue(1.2345)).toBe('2.469');
  });
});
