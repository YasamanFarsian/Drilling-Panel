type baseValue = {
  val: number;
  md: number;
};

export type CuttingChartStreamMessage = {
  currentTime: string;
  lastUpdated: string;
  operationId?: string;
  tdBottom: number;
  bedHeightLastUpdate: string;
  bedHeight: baseValue[];
  proportionMassFractions: baseValue[];
  cuttingInclination: baseValue[];
  cuttingsMassFractions: baseValue[];
  bitDepth: number;
  md: number; // hole depth
  casingShoeDepth: number;
  isLive: boolean | null;
};
