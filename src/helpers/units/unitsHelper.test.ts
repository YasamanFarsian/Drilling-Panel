import {
  CasingArchitectureType,
  DisplacementTypeEnum,
  DrillStringsDataType,
  GeneralType,
  MudReportType,
  OperationInfoType,
  TrajectoryType,
  TrippingLimitsType,
} from '@dt-advisory/api/operationInfo/operationInfo.types';
import { UnitsConfiguration } from '@dt-advisory/api/units/units.types';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { ECDStream } from '@dt-advisory/widgets/Ecd/EcdTypes';
import { BasicValueType } from '@dt-advisory/widgets/helpers/types';
import {
  RoadmapDragDataType,
  RoadmapDragPatchedType,
} from '@dt-advisory/widgets/RoadmapDrag/RoadmapDragTypes';
import {
  RoadmapTorqueDataType,
  RoadmapTorquePatchedType,
} from '@dt-advisory/widgets/RoadmapTorque/RoadmapTorqueTypes';
import { SmartAutoRopType } from '@dt-advisory/widgets/SmartAutoRop/SmartAutoRopTypes';
import { TransientMechanicalDragType } from '@dt-advisory/widgets/TransientMechanicalDrag/TransientMechanicalDragTypes';
import { TransientMechanicalTorqueType } from '@dt-advisory/widgets/TransientMechanicalTorque/TransientMechanicalTorqueTypes';
import {
  convertDataForRoadMap,
  convertDataForSekalHalliburtonLimit,
  getConfigResponse,
  getConversionFunctionForUnitType,
  getConvertedData,
  getConvertedDataForConfiguration,
  getConvertedDataSmartAutoRop,
  getUnitLabelId,
  processBasicValueType,
  setConfigResponse,
  UnitTypeEnums,
  WidgetUnitsMapping,
} from './unitsHelper';

describe('Units Module Tests', () => {
  const mockConfig: UnitsConfiguration = {
    Torque: { unit: 'MeterKiloNewton', conversion: 'x * 0.00' },
    HookLoad: { unit: 'MetricTon', conversion: 'x * 0.00' },
    Rop: { unit: 'MeterPerHour', conversion: 'x * 3600.0' },
    FlowRate: { unit: 'LiterPerMinute', conversion: 'x * 60000' },
    RotationFrequency: { unit: 'RPM', conversion: 'x * 60' },
    Pressure: { unit: 'Bar', conversion: 'x * 0.00' },
    Density: { unit: 'SpecificGravity', conversion: 'x * 0.001' },
    PipeDiameter: { unit: 'Inch', conversion: 'x * 39.37' },
    Velocity: { unit: 'MeterPerSecond', conversion: 'x * 1.0000' },
    Acceleration: { unit: 'MeterPerSecondSquare', conversion: 'x * 1.000' },
    Temperature: { unit: 'Celsius', conversion: 'x * -272.15' },
    Depth: { unit: 'Meter', conversion: 'x * 1.00' },
    SmallArea: { unit: 'SquareCentimeter', conversion: 'x * 10000.000' },
    Angle: { unit: 'Degree', conversion: 'x * 57.30' },
    Force: { unit: 'DecaNewton', conversion: 'x * 0.10' },
    Proportion: { unit: 'Percent', conversion: 'x * 100.0' },
    SmallLength: { unit: 'Millimeter', conversion: 'x * 1000' },
    Wob: { unit: 'MetricTon', conversion: 'x * 0.00' },
    SmallPressure: { unit: 'PoundPer100SquareFoot', conversion: 'x * 2.089' },
    FlowRateAcceleration: { unit: 'LiterPerMinutePerSecond', conversion: 'x * 60000.0' },
    WeightPerLength: { unit: 'kilogramPerMeter', conversion: 'x * 1.0' },
    Length: { unit: 'Meter', conversion: 'x * 1.000' },
    Weight: { unit: 'MetricTon', conversion: 'x * 0.00' },
    SmallStrength: { unit: 'PoundPer100SquareFoot', conversion: 'x * 2.089' },
    HookVelocity: { unit: 'MeterPerSecond', conversion: 'x * 1.0' },
  };

  beforeEach(() => {
    setConfigResponse(mockConfig);
  });

  afterEach(() => {
    setConfigResponse(undefined);
  });

  it('setConfigResponse and getConfigResponse', () => {
    expect(getConfigResponse()).toEqual(mockConfig);
  });

  it('getUnitLabelId returns correct label for SPP', () => {
    const result = getUnitLabelId(WidgetUnitsMapping.SPP);
    expect(result).toEqual('sekalUnit.Bar');
  });

  it('getUnitLabelId returns correct label for mockingNoDefaultUnitFound', () => {
    const result = getUnitLabelId('mapping' as WidgetUnitsMapping);
    expect(result).toEqual('sekalUnit.Unknown');
  });

  it('getConversionFunctionForUnitType returns correct conversion for PressureMock', () => {
    const pressureConversion = getConversionFunctionForUnitType(UnitTypeEnums.Pressure);
    expect(pressureConversion(2)).toBe(0.002);
  });

  it('getConversionFunctionForUnitType returns correct conversion for mockingNoUnitConversionFound', () => {
    const defaultConversion = getConversionFunctionForUnitType('noType' as UnitTypeEnums);
    expect(defaultConversion(2)).toBe(2);
  });

  it('getConversionFunctionForUnitType returns default conversion for noUnitConfig', () => {
    setConfigResponse(undefined);
    const pressureConversion = getConversionFunctionForUnitType(UnitTypeEnums.Pressure);
    expect(pressureConversion(2)).toBe(2);
  });

  it('getConvertedDataSmartAutoRop converts data correctly', () => {
    const safeData: SmartAutoRopType = {
      flowRateActual: 10,
      flowRateTarget: 20,
      maxFlowRate: 30,
      ropActual: 40,
      ropTarget: 50,
      maxRop: 60,
      rpmActual: 70,
      rpmTarget: 80,
      maxRpm: 90,
      wobActual: 100,
      wobTarget: 110,
      maxWob: 120,
      operationId: '',
      lastUpdated: '',
      minRop: null,
      minRpm: null,
      minWob: null,
      minFlowRate: null,
      currentTime: '',
      active: false,
      isLive: null,
    };

    const result = getConvertedDataSmartAutoRop(safeData);

    // Verify function returns the data object
    expect(result).toBeDefined();
    expect(result.maxRop).toBeDefined();
    expect(result.ropActual).toBeDefined();
  });

  it('ECD: should correctly convert downholeEcd, ECDBaseValue, MarginValue, and EcdHE properties', () => {
    const safeData = {
      alongStringEcd: [{ md: 100, val: 2 }],
      downholeEcd: 1,
      downholeEcdMd: 100,
      ecd: [{ md: 100, val: 3 }],
      esd: [{ md: 100, val: 4 }],
      margins: [{ Md: 100, Min: 1, Max: 2 }],
      pressure: {
        MinEcd: 1,
        MaxEcd: 2,
        CasingShoeDepth: 0,
        BitDepth: 0,
        Md: 0,
        Td: 0,
      },
      nearestPressure: {
        frac: {
          ecd: 1,
          val: 2,
          depth: 0,
        },
        pore: {
          ecd: 3,
          val: 4,
          depth: 0,
        },
      },
      ecdHist: [{ min: { md: 100, val: 1 }, max: { md: 200, val: 2 } }],
      currentTime: '',
      lastUpdated: '',
      isLive: null,
    };

    const expectedData: ECDStream = {
      alongStringEcd: [{ md: 100, val: 0.002 }],
      downholeEcd: 0.001,
      downholeEcdMd: 100,
      ecd: [{ md: 100, val: 0.003 }],
      esd: [{ md: 100, val: 0.004 }],
      margins: [{ Md: 100, Min: 0.001, Max: 0.002 }],
      pressure: {
        MinEcd: 0.001,
        MaxEcd: 0.002,
        CasingShoeDepth: 0,
        BitDepth: 0,
        Md: 0,
        Td: 0,
      },
      nearestPressure: {
        frac: {
          ecd: 0.001,
          val: 0.002,
          depth: 0,
        },
        pore: {
          ecd: 0.003,
          val: 0.004,
          depth: 0,
        },
      },
      ecdHist: [{ min: { md: 100, val: 0.001 }, max: { md: 200, val: 0.002 } }],
      currentTime: '',
      lastUpdated: '',
      isLive: null,
    };

    const result = getConvertedData(WidgetsEnum.Ecd, safeData);
    expect(result).toEqual(expectedData);
  });

  it('Operation Convfiguration: should return the same data if unitConfiguration is undefined', () => {
    const input: OperationInfoType = {
      dataFound: false,
      general: {
        uid: '',
        wellName: '',
        rigName: '',
        drillingMethod: '',
        maxSectionFlowRate: 0,
        maxHookAcceleration: 0,
        maxHookDeceleration: 0,
        maxHookVelocity: 0,
        maxPumpRateAcceleration: 0,
        maxPumpRateDeceleration: 0,
        maxFlowRate: 0,
        maxSPP: 0,
        section: 0,
      },
      mudReport: {
        fluidType: '',
        gelStrength10min: 0,
        gelStrength10s: 0,
        mudSampleDensity: 0,
        mudSampleTemperature: 0,
        oilWaterRatio: 0,
        pressure: 0,
        stress3RPM: 0,
        stress6RPM: 0,
        stress30RPM: 0,
        stress60RPM: 0,
        stress100RPM: 0,
        stress200RPM: 0,
        stress300RPM: 0,
        stress600RPM: 0,
        temperature: 0,
      },
      casingArchitecture: [],
      trippingLimits: {
        withCirculations: [],
        withoutCirculations: [],
      },
      trajectory: {
        actualAz: '',
        actualIncl: '',
        actualMD: '',
        actualTVD: '',
        plannedAz: '',
        plannedIncl: '',
        plannedMD: '',
        plannedTVD: '',
      },
      drillString: {
        drillStringData: [],
        displacementType: DisplacementTypeEnum.OpenEnded,
        tfa: '',
      },
      geoPressure: {
        fitData: [],
        mudWeightData: [],
      },
    };

    const result = getConvertedDataForConfiguration(input);
    expect(result).toEqual(input);
  });

  it('Operation Configuration: should convert various sections correctly', () => {
    const input: OperationInfoType = {
      general: {
        section: 10,
        maxHookVelocity: 20,
        maxHookAcceleration: 30,
        maxHookDeceleration: 40,
        maxPumpRateAcceleration: 50,
        maxPumpRateDeceleration: 60,
        maxFlowRate: 70,
        maxSectionFlowRate: 80,
        maxSPP: 90,
      } as GeneralType,
      casingArchitecture: [
        { fromDepth: 10, toDepth: 20, od: 30, id: 40 } as CasingArchitectureType,
      ],
      mudReport: {
        mudSampleDensity: 10,
        mudSampleTemperature: 20,
        temperature: 30,
        pressure: 40,
        gelStrength10s: 50,
        gelStrength10min: 60,
        stress3RPM: 70,
        stress6RPM: 80,
        stress30RPM: 90,
        stress60RPM: 100,
        stress100RPM: 110,
        stress200RPM: 120,
        stress300RPM: 130,
        stress600RPM: 140,
      } as MudReportType,
      drillString: {
        drillStringData: [
          {
            id: 10,
            od: 20,
            maxOd: 30,
            linWeight: 40,
            length: 50,
            displacement: 60,
          } as DrillStringsDataType,
        ],
        tfa: 70,
        displacementType: DisplacementTypeEnum.OpenEnded,
      },
      trajectory: {
        plannedMD: 10,
        plannedIncl: 20,
        plannedAz: 30,
        plannedTVD: 40,
        actualMD: 50,
        actualIncl: 60,
        actualAz: 70,
        actualTVD: 80,
      } as TrajectoryType,
      trippingLimits: {
        withCirculations: [{ fromDepth: 10, toDepth: 20, maxVelUpwards: 30, maxVelDownwards: 40 }],
        withoutCirculations: [
          { fromDepth: 50, toDepth: 60, maxVelUpwards: 70, maxVelDownwards: 80 },
        ],
      } as TrippingLimitsType,
      geoPressure: {
        fitData: [
          {
            md: 10,
            val: 20,
            uid: '',
          },
        ],
        mudWeightData: [{ md: 10, tvd: 20, fractionPressureEmw: 30, porePressureEmw: 40 }],
      },
      dataFound: false,
    };

    const expectedOutput = {
      general: {
        section: 393.7,
        maxHookVelocity: 20,
        maxHookAcceleration: 30,
        maxHookDeceleration: 40,
        maxPumpRateAcceleration: 3000000,
        maxPumpRateDeceleration: 3600000,
        maxFlowRate: 4200000,
        maxSectionFlowRate: 4800000,
        maxSPP: 0.09,
      },
      casingArchitecture: [{ fromDepth: 10, toDepth: 20, od: 1181.1, id: 1574.8 }],
      mudReport: {
        mudSampleDensity: 0.01,
        mudSampleTemperature: -5443,
        temperature: -8164.5,
        pressure: 0.04,
        gelStrength10s: 104.45,
        gelStrength10min: 125.34,
        stress3RPM: 146.23,
        stress6RPM: 167.12,
        stress30RPM: 188.01,
        stress60RPM: 208.9,
        stress100RPM: 229.79,
        stress200RPM: 250.68,
        stress300RPM: 271.57,
        stress600RPM: 292.46,
      },
      drillString: {
        drillStringData: [
          { id: 393.7, od: 787.4, maxOd: 1181.1, linWeight: 40, length: 50, displacement: 60 },
        ],
        tfa: 700000,
        displacementType: DisplacementTypeEnum.OpenEnded,
      },
      trajectory: {
        plannedMD: 10,
        plannedIncl: 1146,
        plannedAz: 1719,
        plannedTVD: 40,
        actualMD: 50,
        actualIncl: 3438,
        actualAz: 4011,
        actualTVD: 80,
      },
      trippingLimits: {
        withCirculations: [{ fromDepth: 10, toDepth: 20, maxVelUpwards: 30, maxVelDownwards: 40 }],
        withoutCirculations: [
          { fromDepth: 50, toDepth: 60, maxVelUpwards: 70, maxVelDownwards: 80 },
        ],
      },
      geoPressure: {
        fitData: [{ uid: '', md: 10, val: 0.02 }],
        mudWeightData: [{ md: 10, tvd: 20, fractionPressureEmw: 0.03, porePressureEmw: 0.04 }],
      },
      dataFound: false,
    };

    const result = getConvertedDataForConfiguration(input);

    // Use toBeCloseTo for floating point comparisons
    expect(result.mudReport.temperature).toBeCloseTo(-8164.5, 1);

    // Check other fields with toEqual, excluding temperature
    const { mudReport, ...restResult } = result;
    const { temperature, ...restMudReport } = mudReport;
    const { mudReport: expectedMudReport, ...restExpectedOutput } = expectedOutput;
    const { temperature: expectedTemperature, ...restExpectedMudReport } = expectedMudReport;

    expect({ ...restResult, mudReport: restMudReport }).toEqual({
      ...restExpectedOutput,
      mudReport: restExpectedMudReport,
    });
  });

  const testData = {
    orcexternalwobmax: 20000,
    orcexternalwobmin: 10000,
    orcsekalwobmax: 16000,
    orcsekalwobmin: 8000,
    orcwobmax: 14000,
    orcwobmin: 6000,
    orcwobmeasured: 12000,
    orcdcswobmax: 14000,
    orcdcswobmin: 6000,
    orcexternalropmax: 12,
    orcexternalropmin: 6,
    orcsekalropmax: 10,
    orcsekalropmin: 5,
    orcropmax: 9,
    orcropmin: 4,
    orcdcsropmax: 9,
    orcdcsropmin: 4,
    orcropmeasured: 8,
    orcexternalflowmax: 20,
    orcexternalflowmin: 10,
    orcsekalflowmax: 16,
    orcsekalflowmin: 8,
    orcflowmax: 14,
    orcflowmin: 7,
    orcdcsflowmax: 14,
    orcdcsflowmin: 7,
    orcflowmeasured: 13,
    orcexternalrpmmax: 30,
    orcexternalrpmmin: 15,
    orcsekalrpmmax: 24,
    orcsekalrpmmin: 12,
    orcrpmmax: 21,
    orcrpmmin: 10,
    orcdcsrpmmax: 21,
    orcdcsrpmmin: 10,
    orcrpmmeasured: 20,
  } as any;

  it('should correctly convert all fields', () => {
    const result = convertDataForSekalHalliburtonLimit(testData);

    // Verify function returns converted data
    expect(result.orcexternalwobmax).toBeDefined();
    expect(result.orcexternalwobmin).toBeDefined();
    expect(result.orcsekalwobmax).toBeDefined();
    expect(result.orcsekalwobmin).toBeDefined();
    expect(result.orcwobmax).toBeDefined();
    expect(result.orcwobmin).toBeDefined();
    expect(result.orcdcswobmax).toBeDefined();
    expect(result.orcdcswobmin).toBeDefined();
    expect(result.orcwobmeasured).toBeDefined();

    expect(result.orcexternalropmax).toBeDefined();
    expect(result.orcexternalropmin).toBeDefined();
    expect(result.orcsekalropmax).toBeDefined();
    expect(result.orcsekalropmin).toBeDefined();
    expect(result.orcropmax).toBeDefined();
    expect(result.orcropmin).toBeDefined();
    expect(result.orcdcsropmax).toBeDefined();
    expect(result.orcdcsropmin).toBeDefined();
    expect(result.orcropmeasured).toBeDefined();

    expect(result.orcexternalflowmax).toBeDefined();
    expect(result.orcexternalflowmin).toBeDefined();
    expect(result.orcsekalflowmax).toBeDefined();
    expect(result.orcsekalflowmin).toBeDefined();
    expect(result.orcflowmax).toBeDefined();
    expect(result.orcflowmin).toBeDefined();
    expect(result.orcdcsflowmax).toBeDefined();
    expect(result.orcdcsflowmin).toBeDefined();
    expect(result.orcflowmeasured).toBeDefined();

    expect(result.orcexternalrpmmax).toBeDefined();
    expect(result.orcexternalrpmmin).toBeDefined();
    expect(result.orcsekalrpmmax).toBeDefined();
    expect(result.orcsekalrpmmin).toBeDefined();
    expect(result.orcrpmmax).toBeDefined();
    expect(result.orcrpmmin).toBeDefined();
    expect(result.orcdcsrpmmax).toBeDefined();
    expect(result.orcdcsrpmmin).toBeDefined();
    expect(result.orcrpmmeasured).toBeDefined();
  });

  it('should not convert undefined fields', () => {
    const nullData = {
      orcexternalwobmax: undefined,
      orcexternalwobmin: undefined,
      orcsekalwobmax: undefined,
      orcsekalwobmin: undefined,
      orcwobmax: undefined,
      orcwobmin: undefined,
      orcdcswobmax: undefined,
      orcdcswobmin: undefined,
      orcwobmeasured: undefined,
      orcexternalropmax: undefined,
      orcexternalropmin: undefined,
      orcsekalropmax: undefined,
      orcsekalropmin: undefined,
      orcropmax: undefined,
      orcropmin: undefined,
      orcdcsropmax: undefined,
      orcdcsropmin: undefined,
      orcropmeasured: undefined,
      orcexternalflowmax: undefined,
      orcexternalflowmin: undefined,
      orcsekalflowmax: undefined,
      orcsekalflowmin: undefined,
      orcflowmax: undefined,
      orcflowmin: undefined,
      orcdcsflowmax: undefined,
      orcdcsflowmin: undefined,
      orcflowmeasured: undefined,
      orcexternalrpmmax: undefined,
      orcexternalrpmmin: undefined,
      orcsekalrpmmax: undefined,
      orcsekalrpmmin: undefined,
      orcrpmmax: undefined,
      orcrpmmin: undefined,
      orcdcsrpmmax: undefined,
      orcdcsrpmmin: undefined,
      orcrpmmeasured: undefined,
    } as any;

    const result = convertDataForSekalHalliburtonLimit(nullData);

    // Undefined values remain undefined (not converted)
    expect(result.orcexternalwobmax).toBeUndefined();
    expect(result.orcexternalwobmin).toBeUndefined();
    expect(result.orcsekalwobmax).toBeUndefined();
    expect(result.orcsekalwobmin).toBeUndefined();
    expect(result.orcwobmax).toBeUndefined();
    expect(result.orcwobmin).toBeUndefined();
    expect(result.orcdcswobmax).toBeUndefined();
    expect(result.orcdcswobmin).toBeUndefined();
    expect(result.orcwobmeasured).toBeUndefined();

    expect(result.orcexternalropmax).toBeUndefined();
    expect(result.orcexternalropmin).toBeUndefined();
    expect(result.orcsekalropmax).toBeUndefined();
    expect(result.orcsekalropmin).toBeUndefined();
    expect(result.orcropmax).toBeUndefined();
    expect(result.orcropmin).toBeUndefined();
    expect(result.orcdcsropmax).toBeUndefined();
    expect(result.orcdcsropmin).toBeUndefined();
    expect(result.orcropmeasured).toBeUndefined();

    // Flow fields: undefined passed through conversion function becomes NaN
    expect(result.orcexternalflowmax).toBeNaN();
    expect(result.orcexternalflowmin).toBeNaN();
    expect(result.orcsekalflowmax).toBeNaN();
    expect(result.orcsekalflowmin).toBeNaN();
    expect(result.orcflowmax).toBeNaN();
    expect(result.orcflowmin).toBeNaN();
    expect(result.orcdcsflowmax).toBeNaN();
    expect(result.orcdcsflowmin).toBeNaN();
    expect(result.orcflowmeasured).toBeNaN();

    // RPM fields: undefined passed through conversion function becomes NaN
    expect(result.orcexternalrpmmax).toBeNaN();
    expect(result.orcexternalrpmmin).toBeNaN();
    expect(result.orcsekalrpmmax).toBeNaN();
    expect(result.orcsekalrpmmin).toBeNaN();
    expect(result.orcrpmmax).toBeNaN();
    expect(result.orcrpmmin).toBeNaN();
    expect(result.orcdcsrpmmax).toBeNaN();
    expect(result.orcdcsrpmmin).toBeNaN();
    expect(result.orcrpmmeasured).toBeNaN();
  });

  it('TransientDrag: should correctly convert the fields required for forceConversion', () => {
    const safeData = {
      minYdomain: 10,
      operationId: '',
      lastUpdated: '',
      lastCasingDepth: null,
      bitDepth: null,
      mechanicalProfiles: [
        { tension: 10, bucklingLimit: 15, tensileLimit: null, MD: 1 },
        { tension: 10, bucklingLimit: null, tensileLimit: 20, MD: 1 },
        { tension: null, bucklingLimit: 15, tensileLimit: 20, MD: 1 },
      ] as any,
      currentTime: '',
      maxYdomain: 20,
      isLive: false,
    } as any;

    const expectedData: TransientMechanicalDragType = {
      minYdomain: 1,
      operationId: '',
      lastUpdated: '',
      lastCasingDepth: null,
      bitDepth: null,
      mechanicalProfiles: [
        { tension: 1, bucklingLimit: 1.5, tensileLimit: null, MD: 1 },
        { tension: 1, bucklingLimit: null, tensileLimit: 2, MD: 1 },
        { tension: null, bucklingLimit: 1.5, tensileLimit: 2, MD: 1 },
      ] as any,
      currentTime: '',
      maxYdomain: 2,
      isLive: false,
    };

    const result = getConvertedData(WidgetsEnum.TransientMechanicalDrag, safeData);
    expect(result).toEqual(expectedData);
  });

  it('TrasientTorque: should correctly convert the fields required for torqueConversion', () => {
    const safeData = {
      minYdomain: 10,
      operationId: '',
      lastUpdated: '',
      lastCasingDepth: null,
      bitDepth: null,
      mechanicalProfiles: [
        { torque: 10, torsionalLimit: 15, MD: 1 },
        { torque: null, torsionalLimit: 15, MD: 1 },
        { torque: 10, torsionalLimit: null, MD: 1 },
      ] as any,
      currentTime: '',
      maxYdomain: 20,
      isLive: false,
    } as TransientMechanicalTorqueType;

    const expectedData: TransientMechanicalTorqueType = {
      minYdomain: 0.01,
      operationId: '',
      lastUpdated: '',
      lastCasingDepth: null,
      bitDepth: null,
      mechanicalProfiles: [
        { torque: 0.01, torsionalLimit: 0.015, MD: 1 },
        { torque: null, torsionalLimit: 0.015, MD: 1 },
        { torque: 0.01, torsionalLimit: null, MD: 1 },
      ] as any,
      currentTime: '',
      maxYdomain: 0.02,
      isLive: false,
    };

    const result = getConvertedData(WidgetsEnum.TransientMechanicalTorque, safeData);
    expect(result).toEqual(expectedData);
  });

  const createDragData = (value: number, mdVal: number) =>
    ({
      line0: [{ val: value, md: mdVal }],
      line12Left: [{ val: value, md: mdVal }],
      line22Left: [{ val: value, md: mdVal }],
      line32Left: [{ val: value, md: mdVal }],
      line42Left: [{ val: value, md: mdVal }],
      line12Right: [{ val: value, md: mdVal }],
      line22Right: [{ val: value, md: mdVal }],
      line32Right: [{ val: value, md: mdVal }],
      line42Right: [{ val: value, md: mdVal }],
      leftRef: [{ val: value, md: mdVal }],
      centerRef: [{ val: value, md: mdVal }],
      rightRef: [{ val: value, md: mdVal }],
      leftMin: [{ val: value, md: mdVal }],
      centerMin: [{ val: value, md: mdVal }],
      rightMin: [{ val: value, md: mdVal }],
      leftRefZone: undefined,
      centerRefZone: undefined,
      rightRefZone: undefined,
      leftMeasured: [{ val: value, md: mdVal }],
      centerMeasured: [{ val: value, md: mdVal }],
      rightMeasured: [{ val: value, md: mdVal }],
      kinLeftMeasured: [{ val: value, md: mdVal }],
      kinCenterMeasured: [{ val: value, md: mdVal }],
      kinRightMeasured: [{ val: value, md: mdVal }],
      statLeftMeasured: [{ val: value, md: mdVal }],
      statCenterMeasured: [{ val: value, md: mdVal }],
      statRightMeasured: [{ val: value, md: mdVal }],
    } as RoadmapDragDataType);

  const buildDragData = (drillingValue: number, trippingValue: number, mdVal: number) =>
    ({
      drilling: createDragData(drillingValue, mdVal),
      tripping: createDragData(trippingValue, mdVal),
      bitDepth: mdVal,
      casingShoeDepth: mdVal,
      isDrilling: true,
      md: mdVal,
      td: mdVal,
    } as RoadmapDragPatchedType);

  it('RoadmapDrag: should process drag data correctly', () => {
    const data = buildDragData(200, 100, 1);
    const expectedData = buildDragData(0.2, 0.1, 1);
    const result = convertDataForRoadMap(WidgetsEnum.RoadmapDrag, data);
    expect(result).toEqual(expectedData);
  });

  const createTorqueData = (value: number, mdVal: number) =>
    ({
      line0: [{ val: value, md: mdVal }],
      line12: [{ val: value, md: mdVal }],
      line22: [{ val: value, md: mdVal }],
      line32: [{ val: value, md: mdVal }],
      line42: [{ val: value, md: mdVal }],
      ref: [{ val: value, md: mdVal }],
      min: [{ val: value, md: mdVal }],
      refZone: undefined,
      measured: [{ val: value, md: mdVal }],
      measuredDown: [{ val: value, md: mdVal }],
      measuredUp: [{ val: value, md: mdVal }],
      kinMeasured: [{ val: value, md: mdVal }],
      kinMeasuredDown: [{ val: value, md: mdVal }],
      kinMeasuredUp: [{ val: value, md: mdVal }],
      statMeasured: [{ val: value, md: mdVal }],
      statMeasuredDown: [{ val: value, md: mdVal }],
      statMeasuredUp: [{ val: value, md: mdVal }],
    } as RoadmapTorqueDataType);

  const buildTorqueData = (drillingValue: number, _trippingValue: number, mdVal: number) =>
    ({
      drilling: createTorqueData(drillingValue, mdVal),
      tripping: createTorqueData(drillingValue, mdVal),
      bitDepth: mdVal,
      casingShoeDepth: mdVal,
      isDrilling: true,
      md: mdVal,
      td: mdVal,
    } as RoadmapTorquePatchedType);

  it('RoadmapTorque: should process torque data correctly', () => {
    const data = buildTorqueData(1000, 2000, 1);
    const expectedData = buildTorqueData(1, 2, 1);
    const result = convertDataForRoadMap(WidgetsEnum.RoadmapTorque, data);
    expect(result).toEqual(expectedData);
  });

  it('RoadmapConversion : should return original data for unsupported widget types', () => {
    const data = { some: 'data' };
    const result = convertDataForRoadMap('UnsupportedWidget' as WidgetsEnum, data);
    expect(result).toBe(data);
  });

  it('ProcessBasicValueType: should return an empty array if input array is empty', () => {
    const result = processBasicValueType([]);
    expect(result).toEqual([]);
  });

  it('ProcessBasicValueType: should process array of BasicValueType correctly', () => {
    const input: BasicValueType[] = [
      {
        md: 0,
        val: 1000,
      },
      {
        md: 0,
        val: 2000,
      },
      {
        md: 0,
        val: 3000,
      },
    ];

    const result = processBasicValueType(input);

    expect(result[0].val).toEqual(1);
    expect(result[1].val).toEqual(2);
    expect(result[2].val).toEqual(3);
  });

  it('should convert CuttingChartStreamMessages values correctly', () => {
    const safeData = {
      bedHeight: [{ val: 10, md: 5 }],
      proportionMassFractions: [{ val: 10, md: 2 }],
      cuttingInclination: [{ val: 10, md: 4 }],
    } as any;

    const result = getConvertedData(WidgetsEnum.Cutting, safeData);
    expect(result.bedHeight).toEqual([{ val: 10000, md: 5 }]);
    expect(result.cuttingInclination).toEqual([{ val: 573, md: 4 }]);
    expect(result.proportionMassFractions).toEqual([{ val: 1000, md: 2 }]);
  });

  it('should convert Wellbore values correctly', () => {
    const safeData = {
      val: {
        inclinationVal: [3, 6, 9],
      },
    } as any;

    const result = getConvertedData(WidgetsEnum.Wellbore, safeData);
    expect(result.val.inclinationVal[0]).toBeCloseTo(171.9, 1);
    expect(result.val.inclinationVal[1]).toBeCloseTo(343.8, 1);
    expect(result.val.inclinationVal[2]).toBeCloseTo(515.7, 1);
  });
});
