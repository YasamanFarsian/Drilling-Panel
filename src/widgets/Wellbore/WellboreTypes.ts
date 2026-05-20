export type WellboreStreamMessage = {
  currentTime: string;
  config: {
    bitDepth: number;
    casingDepth: number;
    holeDepth: number;
    neutralPoint: number;
    targetDepth: number;
    bitRotation: boolean;
    mudCirculation: boolean;
  };
  val: {
    inclinationVal: number[];
    inclinationMD: number[];
    cuttingsMassFractionsVal: number[];
    cuttingsMassFractionsMD: number[];
    cuttingsBedHeightVal: number[];
    cuttingsBedHeightMD: number[];
  };
  isLive: boolean | null;
};

export type WellboreBaseValue = {
  md: number;
  val: number;
};

export type NewWellboreDTO = {
  currentTime: string;
  measuredDataLastUpdate: string;
  bitDepth: number;
  casingDepth: number;
  holeDepth: number;
  neutralPoint: number;
  targetDepth: number;
  bitRotation: boolean;
  mudCirculation: boolean;
  cuttingsMassFractions: WellboreBaseValue[];
  cuttingsBedHeight: WellboreBaseValue[];
  inclination: WellboreBaseValue[];
  isLive: boolean | null;
};
