export type SekalUnitType = {
  unit: string;
  conversion: string;
};

export type UnitsConfiguration = {
  [key: string]: SekalUnitType;
};
