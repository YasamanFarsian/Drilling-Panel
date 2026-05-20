/* eslint-disable max-lines-per-function, complexity, max-lines, @typescript-eslint/no-explicit-any */
import {
  CasingArchitectureType,
  DrillStringsDataType,
  FitDataType,
  GeneralType,
  MudReportType,
  MudWeightDataType,
  OperationInfoType,
  TrajectoryType,
  TrippingLimitsType,
} from '@dt-advisory/api/operationInfo/operationInfo.types';
import { UnitsConfiguration } from '@dt-advisory/api/units/units.types';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { CuttingChartStreamMessage } from '@dt-advisory/widgets/Cutting/CuttingTypes';
import {
  ECDBaseValue,
  EcdHE,
  ECDStream,
  ESDBaseValue,
  MarginValue,
} from '@dt-advisory/widgets/Ecd/EcdTypes';
import { BasicMinMaxValueType, BasicValueType } from '@dt-advisory/widgets/helpers/types';
import {
  RoadmapDragDataType,
  RoadmapDragPatchedType,
} from '@dt-advisory/widgets/RoadmapDrag/RoadmapDragTypes';
import {
  RoadmapTorqueDataType,
  RoadmapTorquePatchedType,
} from '@dt-advisory/widgets/RoadmapTorque/RoadmapTorqueTypes';
import { SekalHalliburtonLimitType } from '@dt-advisory/widgets/SekalHalliburtonLimit/SekalHalliburtonLimitTypes';
import { SmartAutoRopType } from '@dt-advisory/widgets/SmartAutoRop/SmartAutoRopTypes';
import { TransientMechanicalDragType } from '@dt-advisory/widgets/TransientMechanicalDrag/TransientMechanicalDragTypes';
import { TransientMechanicalTorqueType } from '@dt-advisory/widgets/TransientMechanicalTorque/TransientMechanicalTorqueTypes';
import { WellboreStreamMessage } from '@dt-advisory/widgets/Wellbore/WellboreTypes';

let unitConfiguration: UnitsConfiguration | undefined;
const unitPrefixLabelId = 'sekalUnit.';

export enum UnitTypeEnums {
  Acceleration = 'Acceleration',
  Amperage = 'Amperage',
  Angle = 'Angle',
  AngularVelocity = 'AngularVelocity',
  Area = 'Area',
  CableDiameter = 'CableDiameter',
  Capacitance = 'Capacitance',
  CapillaryPressure = 'CapillaryPressure',
  Compressibility = 'Compressibility',
  Concentration = 'Concentration',
  Cost = 'Cost',
  CostLength = 'CostLength',
  CostVolume = 'CostVolume',
  CostTime = 'CostTime',
  Curvature = 'Curvature',
  Date = 'Date',
  DayDuration = 'DayDuration',
  Density = 'Density',
  DensityGradientDepth = 'DensityGradientDepth',
  DensityGradientTemperature = 'DensityGradientTemperature',
  DensityGradientTime = 'DensityGradientTime',
  DensityLowAccuracy = 'DensityLowAccuracy',
  Depth = 'Depth',
  DimensionLess = 'DimensionLess',
  Duration = 'Duration',
  Energy = 'Energy',
  FlowRate = 'FlowRate',
  FlowRateAcceleration = 'FlowRateAcceleration',
  FluidVelocity = 'FluidVelocity',
  Force = 'Force',
  ForcePerLength = 'ForcePerLength',
  FormationStrength = 'FormationStrength',
  Frequency = 'Frequency',
  GainLossGradient = 'GainLossGradient',
  GammaApi = 'GammaAPI',
  GammaRay = 'GammaRay',
  GasFlowRate = 'GasFlowRate',
  GasShow = 'GasShow',
  GasVolume = 'GasVolume',
  HeatTransferCoefficient = 'HeatTransferCoefficient',
  Height = 'Height',
  HookLoad = 'HookLoad',
  HookLoadLowAccuracy = 'HookLoadLowAccuracy',
  HookVelocity = 'HookVelocity',
  HookVelocityLowAccuracy = 'HookVelocityLowAccuracy',
  HydraulicConductivity = 'HydraulicConductivity',
  ImageScale = 'ImageScale',
  Integral = 'Integral',
  InterfacialTension = 'InterfacialTension',
  LargeCost = 'LargeCost',
  LargeFlowRate = 'LargeFlowRate',
  LargeVolume = 'LargeVolume',
  Length = 'Length',
  LinearAngleVariation = 'LinearAngleVariation',
  LinearElongation = 'LinearElongation',
  LinearPi = 'Linear PI',
  LongDuration = 'LongDuration',
  MagneticStrength = 'Magneticstrength',
  Mass = 'Mass',
  MassRate = 'MassRate',
  MediumDuration = 'MediumDuration',
  MemorySize = 'MemorySize',
  NozzleDiameter = 'NozzleDiameter',
  Permeability = 'Permeability',
  PipeDiameter = 'PipeDiameter',
  PoreRadius = 'PoreRadius',
  PoreSurface = 'PoreSurface',
  Position = 'Position',
  PositioningLand = 'PositioningLand',
  PositioningOffshore = 'PositioningOffshore',
  Pressure = 'Pressure',
  PressureGradient = 'PressureGradient',
  PressureLossConstant = 'PressureLossConstant',
  Proportion = 'Proportion',
  ProportionRate = 'ProportionRate',
  PseudoPressure = 'PseudoPressure',
  PumpPressureLowAccuracy = 'PumpPressureLowAccuracy',
  RelativeDensity = 'RelativeDensity',
  RelativeTemperature = 'RelativeTemperature',
  Resistivity = 'Resistivity',
  Rop = 'ROP',
  RotationFrequency = 'RotationFrequency',
  RotationFrequencyAcceleration = 'RotationFrequencyAcceleration',
  RotationToStrokeRatio = 'RotationToStrokeRatio',
  Saturation = 'Saturation',
  ShortDuration = 'ShortDuration',
  SmallArea = 'SmallArea',
  SmallDensity = 'SmallDensity',
  SmallDimensionLess = 'SmallDimensionLess',
  SmallLength = 'SmallLength',
  SmallPermeability = 'SmallPermeability',
  SmallPressure = 'SmallPressure',
  SmallPressureGradient = 'SmallPressureGradient',
  SmallProportionRate = 'SmallProportionRate',
  SmallStaticViscosity = 'SmallStaticViscosity',
  SmallStrength = 'SmallStrength',
  SmallTension = 'SmallTension',
  SmallThickness = 'SmallThickness',
  SmallVoltage = 'SmallVoltage',
  SmallVoltagePerMass = 'SmallVoltagePerMass',
  SmallWeightPerLength = 'SmallWeightPerLength',
  SpecificHeat = 'SpecificHeat',
  SpecificHeatGradient = 'SpecificHeatGradient',
  StrokeFrequency = 'StrokeFrequency',
  StrokeFrequencyAcceleration = 'StrokeFrequencyAcceleration',
  StaticViscosity = 'StaticViscosity',
  StaticViscosityGradient = 'StaticViscosityGradient',
  Temperature = 'Temperature',
  TemperatureGradient = 'TemperatureGradient',
  Tension = 'Tension',
  ThermalConductivity = 'ThermalConductivity',
  ThermalConductivityGradient = 'ThermalConductivityGradient',
  Time = 'Time',
  TimeDuration = 'TimeDuration',
  TinyProportionRate = 'TinyProportionRate',
  Torque = 'Torque',
  TorqueGradientPerAngularVelocity = 'TorqueGradientPerAngularVelocity',
  TorqueGradientPerAxialLoad = 'TorqueGradientPerAxialLoad',
  TorqueGradientPerPressure = 'TorqueGradientPerPressure',
  TorsionalAcceleration = 'TorsionalAcceleration',
  Velocity = 'Velocity',
  VelocityMobilize = 'Velocity_mobilize',
  VelocityMobilizeLand = 'Velocity_mobilizeLand',
  Voltage = 'Voltage',
  Volume = 'Volume',
  VolumeChangeGradient = 'VolumeChangeGradient',
  VolumeConcentration = 'VolumeConcentration',
  Weight = 'Weight',
  WeightPerLength = 'WeightPerLength',
  Wob = 'WOB',
  YearDuration = 'YearDuration',
  YoungModulus = 'YoungModulus',
}

export enum WidgetUnitsMapping {
  Hookload = 'hookload',
  SPP = 'spp',
  Tripspeed = 'tripspeed',
  Torque = 'torque',
  Flow = 'flow',
}

const UnitTypeMapping: { [key in WidgetUnitsMapping]: string } = {
  [WidgetUnitsMapping.Hookload]: UnitTypeEnums.HookLoad,
  [WidgetUnitsMapping.SPP]: UnitTypeEnums.Pressure,
  [WidgetUnitsMapping.Tripspeed]: UnitTypeEnums.Velocity, //No mapping found in Backend, refering to FE
  [WidgetUnitsMapping.Torque]: UnitTypeEnums.Torque,
  [WidgetUnitsMapping.Flow]: UnitTypeEnums.FlowRate,
};

export const getUnitLabelId = (key: WidgetUnitsMapping): string => {
  const defaultUnitLabelId = unitPrefixLabelId + 'Unknown';
  if (!unitConfiguration) return defaultUnitLabelId;

  const unitType = UnitTypeMapping[key];

  if (unitConfiguration[unitType]) {
    return unitPrefixLabelId + unitConfiguration[unitType].unit;
  }
  return defaultUnitLabelId;
};

export const setConfigResponse = (config: UnitsConfiguration | undefined): void => {
  unitConfiguration = config;
};

export const getConfigResponse = (): UnitsConfiguration | undefined => {
  return unitConfiguration;
};

export const getConvertedDataSmartAutoRop = (safeData: SmartAutoRopType) => {
  if (!unitConfiguration) {
    return safeData;
  }

  const flowRateConversion = getConversionFunctionForUnitType(UnitTypeEnums.FlowRate);
  safeData.flowRateActual = flowRateConversion(safeData.flowRateActual);
  safeData.flowRateTarget = flowRateConversion(safeData.flowRateTarget);
  safeData.maxFlowRate = flowRateConversion(safeData.maxFlowRate);

  const ropConversion = getConversionFunctionForUnitType(UnitTypeEnums.Rop);
  safeData.ropActual = ropConversion(safeData.ropActual);
  safeData.ropTarget = ropConversion(safeData.ropTarget);
  safeData.maxRop = ropConversion(safeData.maxRop);

  const rpmConversion = getConversionFunctionForUnitType(UnitTypeEnums.RotationFrequency);
  safeData.rpmActual = rpmConversion(safeData.rpmActual);
  safeData.rpmTarget = rpmConversion(safeData.rpmTarget);
  safeData.maxRpm = rpmConversion(safeData.maxRpm);

  const wobConversion = getConversionFunctionForUnitType(UnitTypeEnums.Wob);
  safeData.wobActual = wobConversion(safeData.wobActual);
  safeData.wobTarget = wobConversion(safeData.wobTarget);
  safeData.maxWob = wobConversion(safeData.maxWob);

  return safeData;
};

export const getConversionFunctionForUnitType = (unitTypeEnum: UnitTypeEnums) => {
  if (!unitConfiguration) {
    return stringToFunction('x');
  }

  const config = unitConfiguration[unitTypeEnum];
  if (config) {
    // TODO: Temporary workaround for backend bug - WOB conversion is "x * 0.00" which always returns 0
    // Should be "x * 0.001" or "x / 1000" to convert kg to metric tons
    if (config.conversion === 'x * 0.00' || config.conversion === 'x * 0,00') {
      console.warn(
        `Invalid conversion detected for ${unitTypeEnum}: "${config.conversion}". Using "x * 0.001" instead.`,
      );
      return stringToFunction('x * 0.001');
    }
    return stringToFunction(config.conversion);
  }

  return stringToFunction('x');
};

function stringToFunction(str: string) {
  return new Function('x', 'return ' + str + ';');
}

const ConvertDataForEcd = (currData: ECDStream) => {
  const ecdConversion = getConversionFunctionForUnitType(UnitTypeEnums.Density);
  const depthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);

  //This maps to DepthValEcdDto on BE
  const convertEcdBaseValueArray = (arr: ECDBaseValue[]): ECDBaseValue[] => {
    return arr.map((item) => ({
      val: ecdConversion(item.val),
      md: depthConversion(item.md),
    }));
  };

  //This maps to DepthValEcdDto on BE
  const convertEsdBaseValueArray = (arr: ESDBaseValue[]): ESDBaseValue[] => {
    return arr.map((item) => ({
      md: depthConversion(item.md),
      val: ecdConversion(item.val),
    }));
  };

  const convertMarginValueArray = (arr: MarginValue[]): MarginValue[] => {
    return arr.map((item) => ({
      Md: depthConversion(item.Md),
      Min: ecdConversion(item.Min),
      Max: ecdConversion(item.Max),
    }));
  };

  const convertEcdHEArray = (arr: EcdHE[]): EcdHE[] => {
    return arr.map((item) => ({
      min: {
        md: depthConversion(item.min.md),
        val: ecdConversion(item.min.val),
      },
      max: {
        md: depthConversion(item.max.md),
        val: ecdConversion(item.max.val),
      },
    }));
  };

  currData.ecd = convertEcdBaseValueArray(currData.ecd);
  currData.alongStringEcd = convertEcdBaseValueArray(currData.alongStringEcd);
  currData.esd = convertEsdBaseValueArray(currData.esd);
  currData.downholeEcd = ecdConversion(currData.downholeEcd);
  currData.downholeEcdMd = depthConversion(currData.downholeEcdMd);
  currData.margins = convertMarginValueArray(currData.margins);

  currData.pressure.MinEcd = ecdConversion(currData.pressure.MinEcd);
  currData.pressure.MaxEcd = ecdConversion(currData.pressure.MaxEcd);
  currData.pressure.Td = depthConversion(currData.pressure.Td);
  currData.pressure.Md = depthConversion(currData.pressure.Md);
  currData.pressure.CasingShoeDepth = depthConversion(currData.pressure.CasingShoeDepth);
  currData.pressure.BitDepth = depthConversion(currData.pressure.BitDepth);

  currData.nearestPressure.frac.ecd = ecdConversion(currData.nearestPressure.frac.ecd);
  currData.nearestPressure.frac.depth = depthConversion(currData.nearestPressure.frac.depth);
  currData.nearestPressure.frac.val = ecdConversion(currData.nearestPressure.frac.val);
  currData.nearestPressure.pore.ecd = ecdConversion(currData.nearestPressure.pore.ecd);
  currData.nearestPressure.pore.depth = depthConversion(currData.nearestPressure.pore.depth);
  currData.nearestPressure.pore.val = ecdConversion(currData.nearestPressure.pore.val);
  currData.ecdHist = convertEcdHEArray(currData.ecdHist);

  return currData;
};

export const getConvertedData = <T>(widgetType: WidgetsEnum, safeData: T) => {
  if (!unitConfiguration) {
    return safeData;
  } else if (widgetType === WidgetsEnum.Ecd) {
    return ConvertDataForEcd(safeData as ECDStream);
  } else if (widgetType === WidgetsEnum.TransientMechanicalDrag) {
    return convertDataForTransientMechanicalDrag(safeData as TransientMechanicalDragType);
  } else if (widgetType === WidgetsEnum.TransientMechanicalTorque) {
    return convertDataForTransientMechanicalTorque(safeData as TransientMechanicalTorqueType);
  } else if (widgetType === WidgetsEnum.SekalHalliburtonLimit) {
    return convertDataForSekalHalliburtonLimit(safeData as SekalHalliburtonLimitType);
  } else if (widgetType === WidgetsEnum.Cutting) {
    return convertDataForCuttings(safeData as CuttingChartStreamMessage);
  } else if (widgetType === WidgetsEnum.Wellbore) {
    return convertDataForWellbore(safeData as WellboreStreamMessage);
  }
  return safeData;
};

export const getConvertedDataForConfiguration = (operationInfoType: OperationInfoType) => {
  if (!unitConfiguration) return operationInfoType;

  operationInfoType.general = convertDataForGeneralInformation(operationInfoType.general);
  operationInfoType.casingArchitecture = convertDataForCasingArchitecture(
    operationInfoType.casingArchitecture,
  );
  operationInfoType.mudReport = convertDataForMudReport(operationInfoType.mudReport);
  operationInfoType.drillString.drillStringData = convertDataForDrillstring(
    operationInfoType.drillString.drillStringData,
  );

  if (typeof operationInfoType.drillString.tfa === 'number') {
    const smallAreaUnitConversion = getConversionFunctionForUnitType(UnitTypeEnums.SmallArea);
    operationInfoType.drillString.tfa = smallAreaUnitConversion(operationInfoType.drillString.tfa);
  }

  operationInfoType.trajectory = convertDataForTrajectory(operationInfoType.trajectory);
  operationInfoType.trippingLimits = convertDataForTrippingLimit(operationInfoType.trippingLimits);

  operationInfoType.geoPressure.fitData = convertDataForGeoPressureFitData(
    operationInfoType.geoPressure.fitData,
  );
  operationInfoType.geoPressure.mudWeightData = convertDataForGeoPressureMudWeightData(
    operationInfoType.geoPressure.mudWeightData,
  );
  return operationInfoType;
};

export const getUnitLabelIdByUnitType = (key: UnitTypeEnums): string => {
  const defaultUnitLabelId = unitPrefixLabelId + 'Unknown';
  if (!unitConfiguration) return defaultUnitLabelId;

  if (unitConfiguration[key]) {
    return unitPrefixLabelId + unitConfiguration[key].unit;
  }

  return defaultUnitLabelId;
};

const convertDataForGeneralInformation = (data: GeneralType) => {
  const lengthDiameterConversion = getConversionFunctionForUnitType(UnitTypeEnums.PipeDiameter);
  data.section = data.section !== null ? lengthDiameterConversion(data.section) : data.section;

  const velocityConversion = getConversionFunctionForUnitType(UnitTypeEnums.HookVelocity);
  data.maxHookVelocity =
    data.maxHookVelocity !== null ? velocityConversion(data.maxHookVelocity) : data.maxHookVelocity;

  const accelerationConversion = getConversionFunctionForUnitType(UnitTypeEnums.Acceleration);
  data.maxHookAcceleration =
    data.maxHookAcceleration !== null
      ? accelerationConversion(data.maxHookAcceleration)
      : data.maxHookAcceleration;
  data.maxHookDeceleration =
    data.maxHookDeceleration !== null
      ? accelerationConversion(data.maxHookDeceleration)
      : data.maxHookDeceleration;

  const flowRateAccelerationConversion = getConversionFunctionForUnitType(
    UnitTypeEnums.FlowRateAcceleration,
  );
  data.maxPumpRateAcceleration =
    data.maxPumpRateAcceleration !== null
      ? flowRateAccelerationConversion(data.maxPumpRateAcceleration)
      : data.maxPumpRateAcceleration;
  data.maxPumpRateDeceleration =
    data.maxPumpRateDeceleration !== null
      ? flowRateAccelerationConversion(data.maxPumpRateDeceleration)
      : data.maxPumpRateDeceleration;

  const flowRateConversion = getConversionFunctionForUnitType(UnitTypeEnums.FlowRate);
  data.maxFlowRate =
    data.maxFlowRate !== null ? flowRateConversion(data.maxFlowRate) : data.maxFlowRate;
  data.maxSectionFlowRate =
    data.maxSectionFlowRate !== null
      ? flowRateConversion(data.maxSectionFlowRate)
      : data.maxSectionFlowRate;

  const pressureConversion = getConversionFunctionForUnitType(UnitTypeEnums.Pressure);
  data.maxSPP = data.maxSPP !== null ? pressureConversion(data.maxSPP) : data.maxSPP;

  return data;
};

const convertDataForCasingArchitecture = (data: CasingArchitectureType[]) => {
  const lengthDiameterConversion = getConversionFunctionForUnitType(UnitTypeEnums.PipeDiameter);
  const lengthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);

  if (data == undefined) return data;
  return data.map((item) => ({
    ...item,
    fromDepth: item.fromDepth !== null ? lengthConversion(item.fromDepth) : item.fromDepth,
    toDepth: item.toDepth !== null ? lengthConversion(item.toDepth) : item.toDepth,
    od: item.od !== null ? lengthDiameterConversion(item.od) : item.od,
    id: item.id !== null ? lengthDiameterConversion(item.id) : item.id,
  }));
};

const convertDataForMudReport = (data: MudReportType) => {
  if (data === undefined) return data;

  const specificGravityConversion = getConversionFunctionForUnitType(UnitTypeEnums.Density);
  const temperatureConversion = getConversionFunctionForUnitType(UnitTypeEnums.Temperature);
  const pressureConversion = getConversionFunctionForUnitType(UnitTypeEnums.Pressure);
  const gelStrengthConversion = getConversionFunctionForUnitType(UnitTypeEnums.SmallStrength);
  const stressPressureConversion = getConversionFunctionForUnitType(UnitTypeEnums.SmallPressure);

  data.mudSampleDensity =
    data.mudSampleDensity !== null
      ? specificGravityConversion(data.mudSampleDensity)
      : data.mudSampleDensity;
  data.mudSampleTemperature =
    data.mudSampleTemperature !== null
      ? temperatureConversion(data.mudSampleTemperature)
      : data.mudSampleTemperature;
  data.temperature =
    data.temperature !== null ? temperatureConversion(data.temperature) : data.temperature;
  data.pressure = data.pressure !== null ? pressureConversion(data.pressure) : data.pressure;
  data.gelStrength10s =
    data.gelStrength10s !== null ? gelStrengthConversion(data.gelStrength10s) : data.gelStrength10s;
  data.gelStrength10min =
    data.gelStrength10min !== null
      ? gelStrengthConversion(data.gelStrength10min)
      : data.gelStrength10min;
  data.stress3RPM =
    data.stress3RPM !== null ? stressPressureConversion(data.stress3RPM) : data.stress3RPM;
  data.stress6RPM =
    data.stress6RPM !== null ? stressPressureConversion(data.stress6RPM) : data.stress6RPM;
  data.stress30RPM =
    data.stress30RPM !== null ? stressPressureConversion(data.stress30RPM) : data.stress30RPM;
  data.stress60RPM =
    data.stress60RPM !== null ? stressPressureConversion(data.stress60RPM) : data.stress60RPM;
  data.stress100RPM =
    data.stress100RPM !== null ? stressPressureConversion(data.stress100RPM) : data.stress100RPM;
  data.stress200RPM =
    data.stress200RPM !== null ? stressPressureConversion(data.stress200RPM) : data.stress200RPM;
  data.stress300RPM =
    data.stress300RPM !== null ? stressPressureConversion(data.stress300RPM) : data.stress300RPM;
  data.stress600RPM =
    data.stress600RPM !== null ? stressPressureConversion(data.stress600RPM) : data.stress600RPM;

  return data;
};

const convertDataForDrillstring = (data: DrillStringsDataType[]) => {
  if (data === undefined) return data;

  const lengthDiameterConversion = getConversionFunctionForUnitType(UnitTypeEnums.PipeDiameter);
  const linearMassDensityConversion = getConversionFunctionForUnitType(
    UnitTypeEnums.WeightPerLength,
  );
  const lengthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);
  // TODO: API is not returning FluidDisplacementUnit for now
  // const fluidDisplacementConversion = getConversionFunctionForUnitType(
  //   UnitTypeEnums.FluidDisplacementUnit,
  // );

  return data.map((item) => ({
    ...item,
    id: item.id !== null ? lengthDiameterConversion(item.id) : item.id,
    od: item.od !== null ? lengthDiameterConversion(item.od) : item.od,
    maxOd: item.maxOd !== null ? lengthDiameterConversion(item.maxOd) : item.maxOd,
    linWeight:
      item.linWeight !== null ? linearMassDensityConversion(item.linWeight) : item.linWeight,
    length: item.length !== null ? lengthConversion(item.length) : item.length,
    // TODO: API is not returning FluidDisplacementUnit for now
    // displacement:
    //   item.displacement !== null
    //     ? fluidDisplacementConversion(item.displacement)
    //     : item.displacement,
  }));
};

const convertDataForTrajectory = (data: TrajectoryType) => {
  if (data === undefined) return data;

  const lengthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);
  const angleConversion = getConversionFunctionForUnitType(UnitTypeEnums.Angle);

  data.plannedMD = data.plannedMD !== null ? lengthConversion(data.plannedMD) : data.plannedMD;
  data.plannedIncl =
    data.plannedIncl !== null ? angleConversion(data.plannedIncl) : data.plannedIncl;
  data.plannedAz = data.plannedAz !== null ? angleConversion(data.plannedAz) : data.plannedAz;
  data.plannedTVD = data.plannedTVD !== null ? lengthConversion(data.plannedTVD) : data.plannedTVD;

  data.actualMD = data.actualMD !== null ? lengthConversion(data.actualMD) : data.actualMD;
  data.actualIncl = data.actualIncl !== null ? angleConversion(data.actualIncl) : data.actualIncl;
  data.actualAz = data.actualAz !== null ? angleConversion(data.actualAz) : data.actualAz;
  data.actualTVD = data.actualTVD !== null ? lengthConversion(data.actualTVD) : data.actualTVD;

  return data;
};

const convertDataForTrippingLimit = (data: TrippingLimitsType) => {
  if (data === undefined) return data;

  const lengthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);
  const velocityConversion = getConversionFunctionForUnitType(UnitTypeEnums.HookVelocity);

  data.withCirculations = data.withCirculations.map((item) => ({
    ...item,
    fromDepth: item.fromDepth !== null ? lengthConversion(item.fromDepth) : item.fromDepth,
    toDepth: item.toDepth !== null ? lengthConversion(item.toDepth) : item.toDepth,
    maxVelUpwards:
      item.maxVelUpwards !== null ? velocityConversion(item.maxVelUpwards) : item.maxVelUpwards,
    maxVelDownwards:
      item.maxVelDownwards !== null
        ? velocityConversion(item.maxVelDownwards)
        : item.maxVelDownwards,
  }));

  data.withoutCirculations = data.withoutCirculations.map((item) => ({
    ...item,
    fromDepth: item.fromDepth !== null ? lengthConversion(item.fromDepth) : item.fromDepth,
    toDepth: item.toDepth !== null ? lengthConversion(item.toDepth) : item.toDepth,
    maxVelUpwards:
      item.maxVelUpwards !== null ? velocityConversion(item.maxVelUpwards) : item.maxVelUpwards,
    maxVelDownwards:
      item.maxVelDownwards !== null
        ? velocityConversion(item.maxVelDownwards)
        : item.maxVelDownwards,
  }));

  return data;
};

const convertDataForGeoPressureFitData = (data: FitDataType[]) => {
  const specificGravityConversion = getConversionFunctionForUnitType(UnitTypeEnums.Density);
  const lengthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);

  if (data == undefined) return data;
  return data.map((item) => ({
    ...item,
    md: item.md !== null ? lengthConversion(item.md) : item.md,
    val: item.val !== null ? specificGravityConversion(item.val) : item.val,
  }));
};

const convertDataForGeoPressureMudWeightData = (data: MudWeightDataType[]) => {
  const specificGravityConversion = getConversionFunctionForUnitType(UnitTypeEnums.Density);
  const lengthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);

  if (data == undefined) return data;
  return data.map((item) => ({
    ...item,
    md: item.md !== null ? lengthConversion(item.md) : item.md,
    tvd: item.tvd !== null ? lengthConversion(item.tvd) : item.tvd,
    fractionPressureEmw:
      item.fractionPressureEmw !== null
        ? specificGravityConversion(item.fractionPressureEmw)
        : item.fractionPressureEmw,
    porePressureEmw:
      item.porePressureEmw !== null
        ? specificGravityConversion(item.porePressureEmw)
        : item.porePressureEmw,
  }));
};

const convertDataForTransientMechanicalDrag = (data: TransientMechanicalDragType) => {
  const dragConversion = getConversionFunctionForUnitType(UnitTypeEnums.Force);
  const depthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);

  data.bitDepth =
    data.bitDepth || data.bitDepth === 0 ? depthConversion(data.bitDepth) : data.bitDepth;
  data.lastCasingDepth =
    data.lastCasingDepth || data.lastCasingDepth === 0
      ? depthConversion(data.lastCasingDepth)
      : data.lastCasingDepth;
  data.minYdomain =
    data.minYdomain || data.minYdomain === 0 ? dragConversion(data.minYdomain) : data.minYdomain;
  data.maxYdomain =
    data.maxYdomain || data.maxYdomain === 0 ? dragConversion(data.maxYdomain) : data.maxYdomain;

  if (data.mechanicalProfiles !== null) {
    data.mechanicalProfiles = data.mechanicalProfiles.map((item) => ({
      ...item,
      tension: item.tension || item.tension === 0 ? dragConversion(item.tension) : item.tension,
      bucklingLimit:
        item.bucklingLimit || item.bucklingLimit === 0
          ? dragConversion(item.bucklingLimit)
          : item.bucklingLimit,
      tensileLimit:
        item.tensileLimit || item.tensileLimit === 0
          ? dragConversion(item.tensileLimit)
          : item.tensileLimit,
      MD: item.MD || item.MD === 0 ? depthConversion(item.MD) : item.MD,
    }));
  }

  return data;
};

const convertDataForTransientMechanicalTorque = (data: TransientMechanicalTorqueType) => {
  const torqueConversion = getConversionFunctionForUnitType(UnitTypeEnums.Torque);
  const depthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);

  data.bitDepth =
    data.bitDepth || data.bitDepth === 0 ? depthConversion(data.bitDepth) : data.bitDepth;
  data.lastCasingDepth =
    data.lastCasingDepth || data.lastCasingDepth === 0
      ? depthConversion(data.lastCasingDepth)
      : data.lastCasingDepth;
  data.minYdomain =
    data.minYdomain || data.minYdomain === 0 ? torqueConversion(data.minYdomain) : data.minYdomain;
  data.maxYdomain =
    data.maxYdomain || data.maxYdomain === 0 ? torqueConversion(data.maxYdomain) : data.maxYdomain;

  if (data.mechanicalProfiles !== null) {
    data.mechanicalProfiles = data.mechanicalProfiles.map((item) => ({
      ...item,
      torque: item.torque || item.torque === 0 ? torqueConversion(item.torque) : item.torque,
      torsionalLimit:
        item.torsionalLimit || item.torsionalLimit === 0
          ? torqueConversion(item.torsionalLimit)
          : item.torsionalLimit,
      MD: item.MD || item.MD === 0 ? depthConversion(item.MD) : item.MD,
    }));
  }

  return data;
};

export const convertDataForSekalHalliburtonLimit = (data: SekalHalliburtonLimitType) => {
  const weightData = convertWeightSectionForSekalHaliburtonLimit(data);
  const addSlowVeloData = convertSlowVelocitySectionForSekalHaliburtonLimit(weightData);
  const addVolumeFlowData = convertVolumeFlowRateSectionForSekalHaliburtonLimit(addSlowVeloData);
  return convertRotationalSpeedSectionForSekalHaliburtonLimit(addVolumeFlowData);
};

const convertWeightSectionForSekalHaliburtonLimit = (data: SekalHalliburtonLimitType) => {
  const weightConversion = getConversionFunctionForUnitType(UnitTypeEnums.Wob);

  data.orcexternalwobmax =
    data.orcexternalwobmax !== null
      ? weightConversion(data.orcexternalwobmax)
      : data.orcexternalwobmax;
  data.orcexternalwobmin =
    data.orcexternalwobmin !== null
      ? weightConversion(data.orcexternalwobmin)
      : data.orcexternalwobmin;
  data.orcsekalwobmax =
    data.orcsekalwobmax !== null ? weightConversion(data.orcsekalwobmax) : data.orcsekalwobmax;
  data.orcsekalwobmin =
    data.orcsekalwobmin !== null ? weightConversion(data.orcsekalwobmin) : data.orcsekalwobmin;
  data.orcwobmax = data.orcwobmax !== null ? weightConversion(data.orcwobmax) : data.orcwobmax;
  data.orcwobmin = data.orcwobmin !== null ? weightConversion(data.orcwobmin) : data.orcwobmin;
  data.orcdcswobmax =
    data.orcdcswobmax !== null ? weightConversion(data.orcdcswobmax) : data.orcdcswobmax;
  data.orcdcswobmin =
    data.orcdcswobmin !== null ? weightConversion(data.orcdcswobmin) : data.orcdcswobmin;
  data.orcwobmeasured =
    data.orcwobmeasured !== null ? weightConversion(data.orcwobmeasured) : data.orcwobmeasured;

  return data;
};

const convertSlowVelocitySectionForSekalHaliburtonLimit = (data: SekalHalliburtonLimitType) => {
  const slowVelocityConversion = getConversionFunctionForUnitType(UnitTypeEnums.Rop);

  data.orcexternalropmax =
    data.orcexternalropmax !== null
      ? slowVelocityConversion(data.orcexternalropmax)
      : data.orcexternalropmax;
  data.orcexternalropmin =
    data.orcexternalropmin !== null
      ? slowVelocityConversion(data.orcexternalropmin)
      : data.orcexternalropmin;
  data.orcsekalropmax =
    data.orcsekalropmax !== null
      ? slowVelocityConversion(data.orcsekalropmax)
      : data.orcsekalropmax;
  data.orcsekalropmin =
    data.orcsekalropmin !== null
      ? slowVelocityConversion(data.orcsekalropmin)
      : data.orcsekalropmin;
  data.orcropmax =
    data.orcropmax !== null ? slowVelocityConversion(data.orcropmax) : data.orcropmax;
  data.orcropmin =
    data.orcropmin !== null ? slowVelocityConversion(data.orcropmin) : data.orcropmin;
  data.orcdcsropmax =
    data.orcdcsropmax !== null ? slowVelocityConversion(data.orcdcsropmax) : data.orcdcsropmax;
  data.orcdcsropmin =
    data.orcdcsropmin !== null ? slowVelocityConversion(data.orcdcsropmin) : data.orcdcsropmin;
  data.orcropmeasured =
    data.orcropmeasured !== null
      ? slowVelocityConversion(data.orcropmeasured)
      : data.orcropmeasured;

  return data;
};

const convertVolumeFlowRateSectionForSekalHaliburtonLimit = (data: SekalHalliburtonLimitType) => {
  const volumeFlowRateConversion = getConversionFunctionForUnitType(UnitTypeEnums.FlowRate);

  data.orcexternalflowmax =
    data.orcexternalflowmax !== null
      ? volumeFlowRateConversion(data.orcexternalflowmax)
      : data.orcexternalflowmax;
  data.orcexternalflowmin =
    data.orcexternalflowmin !== null
      ? volumeFlowRateConversion(data.orcexternalflowmin)
      : data.orcexternalflowmin;
  data.orcsekalflowmax =
    data.orcsekalflowmax !== null
      ? volumeFlowRateConversion(data.orcsekalflowmax)
      : data.orcsekalflowmax;
  data.orcsekalflowmin =
    data.orcsekalflowmin !== null
      ? volumeFlowRateConversion(data.orcsekalflowmin)
      : data.orcsekalflowmin;
  data.orcflowmax =
    data.orcflowmax !== null ? volumeFlowRateConversion(data.orcflowmax) : data.orcflowmax;
  data.orcflowmin =
    data.orcflowmin !== null ? volumeFlowRateConversion(data.orcflowmin) : data.orcflowmin;
  data.orcdcsflowmax =
    data.orcdcsflowmax !== null ? volumeFlowRateConversion(data.orcdcsflowmax) : data.orcdcsflowmax;
  data.orcdcsflowmin =
    data.orcdcsflowmin !== null ? volumeFlowRateConversion(data.orcdcsflowmin) : data.orcdcsflowmin;
  data.orcflowmeasured =
    data.orcflowmeasured !== null
      ? volumeFlowRateConversion(data.orcflowmeasured)
      : data.orcflowmeasured;

  return data;
};

const convertRotationalSpeedSectionForSekalHaliburtonLimit = (data: SekalHalliburtonLimitType) => {
  const rotationalSpeedConversion = getConversionFunctionForUnitType(
    UnitTypeEnums.RotationFrequency,
  );

  data.orcexternalrpmmax =
    data.orcexternalrpmmax !== null
      ? rotationalSpeedConversion(data.orcexternalrpmmax)
      : data.orcexternalrpmmax;
  data.orcexternalrpmmin =
    data.orcexternalrpmmin !== null
      ? rotationalSpeedConversion(data.orcexternalrpmmin)
      : data.orcexternalrpmmin;
  data.orcsekalrpmmax =
    data.orcsekalrpmmax !== null
      ? rotationalSpeedConversion(data.orcsekalrpmmax)
      : data.orcsekalrpmmax;
  data.orcsekalrpmmin =
    data.orcsekalrpmmin !== null
      ? rotationalSpeedConversion(data.orcsekalrpmmin)
      : data.orcsekalrpmmin;
  data.orcrpmmax =
    data.orcrpmmax !== null ? rotationalSpeedConversion(data.orcrpmmax) : data.orcrpmmax;
  data.orcrpmmin =
    data.orcrpmmin !== null ? rotationalSpeedConversion(data.orcrpmmin) : data.orcrpmmin;
  data.orcdcsrpmmax =
    data.orcdcsrpmmax !== null ? rotationalSpeedConversion(data.orcdcsrpmmax) : data.orcdcsrpmmax;
  data.orcdcsrpmmin =
    data.orcdcsrpmmin !== null ? rotationalSpeedConversion(data.orcdcsrpmmin) : data.orcdcsrpmmin;
  data.orcrpmmeasured =
    data.orcrpmmeasured !== null
      ? rotationalSpeedConversion(data.orcrpmmeasured)
      : data.orcrpmmeasured;

  return data;
};

export const convertDataForRoadMap = (widgetsEnum: WidgetsEnum, data: any) => {
  if (widgetsEnum === WidgetsEnum.RoadmapDrag) {
    return processDragCurrentData(data as RoadmapDragPatchedType);
  } else if (widgetsEnum === WidgetsEnum.RoadmapTorque) {
    return processTorqueCurrentData(data as RoadmapTorquePatchedType);
  }
  return data;
};

export const processBasicValueType = (arr: BasicValueType[]): BasicValueType[] => {
  if (arr === undefined) return arr;

  const depthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);
  const weightConversion = getConversionFunctionForUnitType(UnitTypeEnums.Weight);
  return arr.map((item) => ({
    md: depthConversion(item.md),
    val: weightConversion(item.val),
  }));
};

export const processBasicMinMaxValueType = (
  arr: BasicMinMaxValueType[],
): BasicMinMaxValueType[] => {
  if (arr === undefined) return arr;

  const depthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);
  const weightConversion = getConversionFunctionForUnitType(UnitTypeEnums.Weight);
  return arr.map((item) => ({
    md: depthConversion(item.md),
    min: weightConversion(item.min),
    max: weightConversion(item.max),
  }));
};

export const processTorqueCurrentData = (
  torqueData: RoadmapTorquePatchedType,
): RoadmapTorquePatchedType => {
  const depthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);
  const processTorqueData = (data: RoadmapTorqueDataType): RoadmapTorqueDataType => {
    if (!data) return data;
    return {
      line0: processBasicValueType(data.line0),
      line12: processBasicValueType(data.line12),
      line22: processBasicValueType(data.line22),
      line32: processBasicValueType(data.line32),
      line42: processBasicValueType(data.line42),
      ref: data.ref ? processBasicValueType(data.ref) : data.ref,
      min: data.min ? processBasicValueType(data.min) : data.min,
      refZone: data.refZone ? processBasicMinMaxValueType(data.refZone) : data.refZone,
      measured: processBasicValueType(data.measured),
      measuredDown: processBasicValueType(data.measuredDown),
      measuredUp: processBasicValueType(data.measuredUp),
      kinMeasured: processBasicValueType(data.kinMeasured),
      kinMeasuredDown: processBasicValueType(data.kinMeasuredDown),
      kinMeasuredUp: processBasicValueType(data.kinMeasuredUp),
      statMeasured: processBasicValueType(data.statMeasured),
      statMeasuredDown: processBasicValueType(data.statMeasuredDown),
      statMeasuredUp: processBasicValueType(data.statMeasuredUp),
    };
  };

  return {
    isDrilling: torqueData.isDrilling,
    bitDepth: depthConversion(torqueData.bitDepth),
    casingShoeDepth: depthConversion(torqueData.casingShoeDepth),
    md: depthConversion(torqueData.md),
    td: depthConversion(torqueData.td),
    drilling: processTorqueData(torqueData.drilling),
    tripping: processTorqueData(torqueData.tripping),
  };
};

export const processDragCurrentData = (
  dragData: RoadmapDragPatchedType,
): RoadmapDragPatchedType => {
  const depthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);
  const processDragData = (data: RoadmapDragDataType): RoadmapDragDataType => {
    if (!data) return data;
    return {
      line0: processBasicValueType(data.line0),
      line12Left: processBasicValueType(data.line12Left),
      line22Left: processBasicValueType(data.line22Left),
      line32Left: processBasicValueType(data.line32Left),
      line42Left: processBasicValueType(data.line42Left),
      line12Right: processBasicValueType(data.line12Right),
      line22Right: processBasicValueType(data.line22Right),
      line32Right: processBasicValueType(data.line32Right),
      line42Right: processBasicValueType(data.line42Right),
      leftRef: data.leftRef ? processBasicValueType(data.leftRef) : data.leftRef,
      centerRef: data.centerRef ? processBasicValueType(data.centerRef) : data.centerRef,
      rightRef: data.rightRef ? processBasicValueType(data.rightRef) : data.rightRef,
      leftMin: data.leftMin ? processBasicValueType(data.leftMin) : data.leftMin,
      centerMin: data.centerMin ? processBasicValueType(data.centerMin) : data.centerMin,
      rightMin: data.rightMin ? processBasicValueType(data.rightMin) : data.rightMin,
      leftRefZone: data.leftRefZone
        ? processBasicMinMaxValueType(data.leftRefZone)
        : data.leftRefZone,
      centerRefZone: data.centerRefZone
        ? processBasicMinMaxValueType(data.centerRefZone)
        : data.centerRefZone,
      rightRefZone: data.rightRefZone
        ? processBasicMinMaxValueType(data.rightRefZone)
        : data.rightRefZone,
      leftMeasured: processBasicValueType(data.leftMeasured),
      centerMeasured: processBasicValueType(data.centerMeasured),
      rightMeasured: processBasicValueType(data.rightMeasured),
      kinLeftMeasured: processBasicValueType(data.kinLeftMeasured),
      kinCenterMeasured: processBasicValueType(data.kinCenterMeasured),
      kinRightMeasured: processBasicValueType(data.kinRightMeasured),
      statLeftMeasured: processBasicValueType(data.statLeftMeasured),
      statCenterMeasured: processBasicValueType(data.statCenterMeasured),
      statRightMeasured: processBasicValueType(data.statRightMeasured),
    };
  };

  return {
    isDrilling: dragData.isDrilling,
    bitDepth: depthConversion(dragData.bitDepth),
    casingShoeDepth: depthConversion(dragData.casingShoeDepth),
    md: depthConversion(dragData.md),
    td: depthConversion(dragData.td),
    drilling: processDragData(dragData.drilling),
    tripping: processDragData(dragData.tripping),
  };
};

export const convertDataForCuttings = (cuttingsData: CuttingChartStreamMessage) => {
  if (!cuttingsData) return cuttingsData;

  const depthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);
  const smallLengthConversion = getConversionFunctionForUnitType(UnitTypeEnums.SmallLength);
  cuttingsData.tdBottom = depthConversion(cuttingsData.tdBottom);
  cuttingsData.bitDepth = depthConversion(cuttingsData.bitDepth);
  cuttingsData.md = depthConversion(cuttingsData.md);
  cuttingsData.casingShoeDepth = depthConversion(cuttingsData.casingShoeDepth);

  cuttingsData.bedHeight =
    cuttingsData.bedHeight !== null
      ? cuttingsData.bedHeight.map((item) => ({
          md: depthConversion(item.md),
          val: smallLengthConversion(item.val),
        }))
      : cuttingsData.bedHeight;

  const percentageConversion = getConversionFunctionForUnitType(UnitTypeEnums.Proportion);
  cuttingsData.proportionMassFractions =
    cuttingsData.proportionMassFractions !== null
      ? cuttingsData.proportionMassFractions.map((item) => ({
          md: depthConversion(item.md),
          val: percentageConversion(item.val),
        }))
      : cuttingsData.proportionMassFractions;

  const angleConversion = getConversionFunctionForUnitType(UnitTypeEnums.Angle);
  cuttingsData.cuttingInclination =
    cuttingsData.cuttingInclination !== null
      ? cuttingsData.cuttingInclination.map((item) => ({
          md: depthConversion(item.md),
          val: angleConversion(item.val),
        }))
      : cuttingsData.cuttingInclination;

  return cuttingsData;
};

export const convertDataForWellbore = (wellboreData: WellboreStreamMessage) => {
  if (!wellboreData) return wellboreData;

  const angleConversion = getConversionFunctionForUnitType(UnitTypeEnums.Angle);
  const depthConversion = getConversionFunctionForUnitType(UnitTypeEnums.Length);
  const percentageConversion = getConversionFunctionForUnitType(UnitTypeEnums.Proportion);
  const smallLengthConversion = getConversionFunctionForUnitType(UnitTypeEnums.SmallLength);

  if (wellboreData.config) {
    wellboreData.config.bitDepth = depthConversion(wellboreData.config.bitDepth);
    wellboreData.config.casingDepth = depthConversion(wellboreData.config.casingDepth);
    wellboreData.config.holeDepth = depthConversion(wellboreData.config.holeDepth);
    wellboreData.config.targetDepth = depthConversion(wellboreData.config.targetDepth);
  }

  wellboreData.val.inclinationVal =
    wellboreData.val.inclinationVal !== null && wellboreData.val.inclinationVal !== undefined
      ? wellboreData.val.inclinationVal.map((val) => angleConversion(val))
      : wellboreData.val.inclinationVal;

  wellboreData.val.inclinationMD =
    wellboreData.val.inclinationMD !== null && wellboreData.val.inclinationMD !== undefined
      ? wellboreData.val.inclinationMD.map((val) => depthConversion(val))
      : wellboreData.val.inclinationMD;

  wellboreData.val.cuttingsMassFractionsVal =
    wellboreData.val.cuttingsMassFractionsVal !== null &&
    wellboreData.val.cuttingsMassFractionsVal !== undefined
      ? wellboreData.val.cuttingsMassFractionsVal.map((val) => percentageConversion(val))
      : wellboreData.val.cuttingsMassFractionsVal;

  wellboreData.val.cuttingsMassFractionsMD =
    wellboreData.val.cuttingsMassFractionsMD !== null &&
    wellboreData.val.cuttingsMassFractionsMD !== undefined
      ? wellboreData.val.cuttingsMassFractionsMD.map((val) => depthConversion(val))
      : wellboreData.val.cuttingsMassFractionsMD;

  wellboreData.val.cuttingsBedHeightVal =
    wellboreData.val.cuttingsBedHeightVal !== null &&
    wellboreData.val.cuttingsBedHeightVal !== undefined
      ? wellboreData.val.cuttingsBedHeightVal.map((val) => smallLengthConversion(val))
      : wellboreData.val.cuttingsBedHeightVal;

  wellboreData.val.cuttingsBedHeightMD =
    wellboreData.val.cuttingsBedHeightMD !== null &&
    wellboreData.val.cuttingsBedHeightMD !== undefined
      ? wellboreData.val.cuttingsBedHeightMD.map((val) => depthConversion(val))
      : wellboreData.val.cuttingsBedHeightMD;

  return wellboreData;
};
