export type BaseRoadmapType = {
  operationId?: string;
  lastUpdated?: string;
  currentTime?: string;
  isLive: boolean | null;
};
export type BaseRoadmapReturnType = {
  operationId?: string;
  lastUpdate?: string;
  currentTime?: string;
  data: BaseRoadmapPatchedType;
};
export type BaseRoadmapPatchedType = {
  isDrilling: boolean;
  bitDepth: number;
  md: number;
  td: number;
  casingShoeDepth: number;
  drilling: any;
  tripping: any;
};
