export type OrchestrianSHLimitParams = {
  orcexternalwobmax?: number; //old=hal
  orcexternalwobmin?: number;
  orcdcswobmax?: number;
  orcdcswobmin?: number; //old=driller
  orcsekalwobmax?: number;
  orcsekalwobmin?: number;
  orcwobmax?: number;
  orcwobmin?: number;
  orcwobmeasured?: number;
  orcexternalropmax?: number;
  orcexternalropmin?: number;
  orcdcsropmax?: number;
  orcdcsropmin?: number;
  orcsekalropmax?: number;
  orcsekalropmin?: number;
  orcropmax?: number;
  orcropmin?: number;
  orcropmeasured?: number;
  orcexternalflowmax?: number;
  orcexternalflowmin?: number;
  orcdcsflowmax?: number;
  orcdcsflowmin?: number;
  orcsekalflowmax?: number;
  orcsekalflowmin?: number;
  orcflowmax?: number;
  orcflowmin?: number;
  orcflowmeasured?: number;
  orcexternalrpmmax?: number;
  orcexternalrpmmin?: number;
  orcdcsrpmmax?: number;
  orcdcsrpmmin?: number;
  orcsekalrpmmax?: number;
  orcsekalrpmmin?: number;
  orcrpmmax?: number;
  orcrpmmin?: number;
  orcrpmmeasured?: number;
  orchestrationType: OrchestrationType;
};
export type SekalHalliburtonLimitType = {
  currentTime: string;
  lastUpdated: string;
  active: boolean;
  isLive: boolean | null;
} & OrchestrianSHLimitParams;

export type CategorylimitParams = {
  combinedLimit?: { min?: number | string; max?: number | string };
  rangeSekal?: { min?: number | string; max?: number | string };
  rangeHalliburton?: { min?: number | string; max?: number | string };
  rangeDriller?: { min?: number | string; max?: number | string };
  measuredValue?: number | string;
  label: string;
};

export type ActiveSekalHalliburtonLimitType = SekalHalliburtonLimitType & {
  active: true;
} & OrchestrianSHLimitParams;

export type OrchestrationType =
  | 'combinedlimit'
  | 'sekallimit'
  | 'halliburtonLimit'
  | 'drillerLimit'
  | 'measuredValue';

export type OrchestrationMessage = {
  currentTime: string;
  lastUpdate: string;
};

export enum OrchestrationEnum {
  Combinedlimit = 'Combinedlimit',
  Sekallimit = 'Sekallimit',
  HalliburtonLimit = 'HalliburtonLimit',
  DrillerLimit = 'DrillerLimit',
  MeasuredValue = 'MeasuredValue',
}
