export type SmartAutoRopType = {
  operationId: string;
  lastUpdated: string;
  ropActual: number | null;
  ropTarget: number | null;
  minRop: number | null;
  maxRop: number | null;
  rpmActual: number | null;
  rpmTarget: number | null;
  minRpm: number | null;
  maxRpm: number | null;
  wobActual: number | null;
  wobTarget: number | null;
  minWob: number | null;
  maxWob: number | null;
  flowRateActual: number | null;
  flowRateTarget: number | null;
  minFlowRate: number | null;
  maxFlowRate: number | null;
  currentTime: string;
  active: boolean;
  isLive: boolean | null;
};

export type ActiveSmartAutoRopType = SmartAutoRopType & {
  active: true;
  ropActual: number;
  ropTarget: number;
  minRop: number;
  maxRop: number;
  rpmActual: number;
  rpmTarget: number;
  minRpm: number;
  maxRpm: number;
  wobActual: number;
  wobTarget: number;
  minWob: number;
  maxWob: number;
  flowRateActual: number;
  flowRateTarget: number;
  minFlowRate: number;
  maxFlowRate: number;
};

export type SmartRopDataKeyType = 'ROP' | 'FlowRate' | 'RPM' | 'WOB';
