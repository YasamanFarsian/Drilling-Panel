import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';

export enum UnitTypeEnums {
  Acceleration = 'Acceleration',
  Angle = 'Angle',
  Area = 'Area',
  Density = 'Density',
  Depth = 'Depth',
  FlowRate = 'FlowRate',
  FlowRateAcceleration = 'FlowRateAcceleration',
  Force = 'Force',
  HookLoad = 'HookLoad',
  HookVelocity = 'HookVelocity',
  Length = 'Length',
  PipeDiameter = 'PipeDiameter',
  Pressure = 'Pressure',
  Proportion = 'Proportion',
  Rop = 'ROP',
  RotationFrequency = 'RotationFrequency',
  SmallArea = 'SmallArea',
  SmallLength = 'SmallLength',
  SmallPressure = 'SmallPressure',
  SmallStrength = 'SmallStrength',
  Temperature = 'Temperature',
  Torque = 'Torque',
  Velocity = 'Velocity',
  Weight = 'Weight',
  WeightPerLength = 'WeightPerLength',
  Wob = 'WOB',
}

export enum WidgetUnitsMapping {
  Hookload = 'hookload',
  SPP = 'spp',
  Tripspeed = 'tripspeed',
  Torque = 'torque',
  Flow = 'flow',
}

// No-op: mock data is already in display units
export const getConvertedData = <T>(_widgetType: WidgetsEnum, safeData: T): T => safeData;
export const getConversionFunctionForUnitType = (_: UnitTypeEnums) => (x: number) => x;
export const getUnitLabelId = (_: WidgetUnitsMapping): string => 'sekalUnit.Unknown';
export const getUnitLabelIdByUnitType = (_: UnitTypeEnums): string => 'sekalUnit.Unknown';
export const setConfigResponse = (_: unknown): void => {};
export const getConfigResponse = () => undefined;
export const getConvertedDataForConfiguration = <T>(data: T): T => data;
export const convertDataForRoadMap = <T>(_: WidgetsEnum, data: T): T => data;
export const getConvertedDataSmartAutoRop = <T>(data: T): T => data;
