import {
  getConversionFunctionForUnitType,
  UnitTypeEnums,
} from '@dt-advisory/helpers/units/unitsHelper';

const FIX = 3;
export const PLACEHOLDER = '-';

type FormatValueType = string | number | undefined | null;

const getValue = (value: string | number) => {
  if ('number' === typeof value) {
    return parseFloat(Number(value).toFixed(FIX));
  }
  return value;
};

export const formatValue = (value: FormatValueType): string | number => {
  return value === undefined || value === null || value === '' ? PLACEHOLDER : getValue(value);
};

export const convertSectionValue = (value: FormatValueType): string | number => {
  return value === undefined || value === null || value === ''
    ? PLACEHOLDER
    : getSectionValueToConvert(value);
};

const getSectionValueToConvert = (value: string | number) => {
  if ('number' === typeof value) {
    const lengthDiameterConversion = getConversionFunctionForUnitType(UnitTypeEnums.PipeDiameter);
    return lengthDiameterConversion(value).toFixed(FIX);
  }
  return value;
};
