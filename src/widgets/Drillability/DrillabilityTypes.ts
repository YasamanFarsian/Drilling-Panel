export type DrillabilityType = {
  currentTime: string;
  lastUpdated: string;
  active: boolean;
  downholeMSE: number | null;
  doc: number | null;
  effLoss: number | null;
  bitHyd: number | null;
  downholeWOB: number | null;
  wobDrillingControlSystem: number | null;
  isLive: boolean | null;
};

export type ActiveDrillabilityType = DrillabilityType & {
  active: true;
  downholeMSE: number;
  doc: number;
  effLoss: number;
  bitHyd: number;
  downholeWOB: number;
  wobDrillingControlSystem: number;
};
