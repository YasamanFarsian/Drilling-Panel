import { deepClone } from 'fast-json-patch';
const defaultLines = {
  line0: [],
  line12Left: [],
  line22Left: [],
  line32Left: [],
  line42Left: [],
  line12Right: [],
  line22Right: [],
  line32Right: [],
  line42Right: [],
  leftRef: [],
  centerRef: [],
  rightRef: [],
  leftMin: [],
  centerMin: [],
  rightMin: [],
  leftRefZone: [],
  centerRefZone: [],
  rightRefZone: [],
  leftMeasured: [],
  centerMeasured: [],
  rightMeasured: [],
  kinLeftMeasured: [],
  kinCenterMeasured: [],
  kinRightMeasured: [],
  statLeftMeasured: [],
  statCenterMeasured: [],
  statRightMeasured: [],
};

export const jsonPatchDefaultRoadmapDragValues = {
  isDrilling: false,
  md: 0,
  bitDepth: 0,
  td: 0,
  casingShoeDepth: 0,
  drilling: deepClone(defaultLines),
  tripping: deepClone(defaultLines),
};

export const defaultRoadmapDragValues = {
  operationId: '',
  lastUpdated: '',
  currentTime: '',
  data: jsonPatchDefaultRoadmapDragValues,
  isLive: false,
};
