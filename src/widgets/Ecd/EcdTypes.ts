export type BaseDataValue = {
  x: number;
  y: number;
};

// TODO: same as ESDBaseValue, why separate?
export type ECDBaseValue = {
  md: number;
  val: number;
};

export type ESDBaseValue = {
  md: number;
  val: number;
};

export type MarginValue = {
  Md: number;
  Min: number;
  Max: number;
};

export type Pressure = {
  CasingShoeDepth: number;
  BitDepth: number;
  Md: number; // hole depth
  Td: number;
  MinEcd: number;
  MaxEcd: number;
};

export type NearestPressure = {
  frac: Frac;
  pore: Pore;
};

// TODO: frac and pore is the same, why separate?
export type Frac = {
  depth: number;
  ecd: number;
  val: number;
};

export type Pore = {
  depth: number;
  ecd: number;
  val: number;
};

export type BaseValue = {
  md: number;
  val: number;
};

export type EcdHE = {
  min: ECDBaseValue;
  max: ECDBaseValue;
};

export type ECDStream = {
  currentTime: string;
  lastUpdated: string;
  alongStringEcd: ECDBaseValue[];
  downholeEcd: number;
  downholeEcdMd: number;
  ecd: ECDBaseValue[];
  esd: ESDBaseValue[];
  margins: MarginValue[];
  pressure: Pressure;
  nearestPressure: NearestPressure;
  ecdHist: EcdHE[];
  isLive: boolean | null;
};
