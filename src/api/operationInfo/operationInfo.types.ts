export type GetOperationInfoType = {
  operationId: string;
  controller?: AbortController;
};

export enum AvailableDrillingMethodsEnum {
  NONE = 'NONE',
  BACK_PRESSURE = 'BACK_PRESSURE',
  DUAL_GRADIENT = 'DUAL_GRADIENT',
  LOW_ANNULUS_LEVEL = 'LOW_ANNULUS_LEVEL',
  RISERLESS_DRILLING = 'RISERLESS_DRILLING',
}

export type GeneralType = {
  uid: string;
  wellName: string;
  rigName: string;
  drillingMethod: AvailableDrillingMethodsEnum | string;
  maxSectionFlowRate: number;
  maxHookAcceleration: number;
  maxHookDeceleration: number;
  maxHookVelocity: number;
  maxPumpRateAcceleration: number;
  maxPumpRateDeceleration: number;
  maxFlowRate: number;
  maxSPP: number;
  section: number;
};

export type MudReportType = {
  fluidType: string;
  gelStrength10min: number;
  gelStrength10s: number;
  mudSampleDensity: number;
  mudSampleTemperature: number;
  oilWaterRatio: number;
  pressure: number;
  stress3RPM: number;
  stress6RPM: number;
  stress30RPM: number;
  stress60RPM: number;
  stress100RPM: number;
  stress200RPM: number;
  stress300RPM: number;
  stress600RPM: number;
  temperature: number;
};

export type CasingArchitectureType = {
  uid: string;
  fromDepth: number | string;
  toDepth: number | string;
  od: number | string;
  id: number | string;
};

export type CirculationType = {
  uid: string;
  fromDepth: number | string;
  toDepth: number | string;
  maxVelDownwards: number | string;
  maxVelUpwards: number | string;
};
export type TrippingLimitsType = {
  withCirculations: CirculationType[];
  withoutCirculations: CirculationType[];
};

export type TrajectoryType = {
  actualAz: number | string;
  actualIncl: number | string;
  actualMD: number | string;
  actualTVD: number | string;
  plannedAz: number | string;
  plannedIncl: number | string;
  plannedMD: number | string;
  plannedTVD: number | string;
};

export type DrillStringElementType =
  | 'Unknown'
  | 'AfterBurnerTool'
  | 'AlongStringMeasureMent'
  | 'AntiStickSlipTool'
  | 'BendSub'
  | 'Bit'
  | 'BullNose'
  | 'BootBasket'
  | 'CasingJoint'
  | 'CirculationSub'
  | 'CoreBarrel'
  | 'CrossOver'
  | 'DrillCollar'
  | 'DrillPipe'
  | 'HoleOpener'
  | 'HWDP'
  | 'LWD'
  | 'Motor'
  | 'MWD'
  | 'FloatSub'
  | 'Jar'
  | 'JunkMill'
  | 'PWD'
  | 'ReverseCirculatingJunkBasket'
  | 'ShockAbsorberSub'
  | 'Stablizer'
  | 'SteerableRotaryTool'
  | 'Turbine';

export type DrillStringsDataType = {
  uid: string;
  id: number | string;
  od: number | string;
  element: DrillStringElementType;
  maxOd: number | string;
  linWeight: number | string;
  length: number | string;
  displacement: number | string;
};

export enum DisplacementTypeEnum {
  OpenEnded = 'Open Ended',
  ClosedEnded = 'Closed Ended',
}

export type FitDataType = {
  uid: string;
  md: number | string;
  val: number | string;
};

export type MudWeightDataType = {
  fractionPressureEmw: number;
  tvd?: number;
  md?: number;
  porePressureEmw: number;
};
export type OperationInfoType = {
  dataFound: boolean;
  general: GeneralType;
  mudReport: MudReportType;
  casingArchitecture: CasingArchitectureType[];
  trippingLimits: TrippingLimitsType;
  trajectory: TrajectoryType;
  drillString: {
    drillStringData: DrillStringsDataType[];
    displacementType: DisplacementTypeEnum;
    tfa: number | string;
  };
  geoPressure: {
    fitData: FitDataType[];
    mudWeightData: MudWeightDataType[];
  };
};
