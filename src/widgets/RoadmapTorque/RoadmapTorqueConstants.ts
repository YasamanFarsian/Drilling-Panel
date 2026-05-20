import { deepClone } from 'fast-json-patch';
const defaultLines = {
  line0: [],
  line12: [],
  line22: [],
  line32: [],
  line42: [],
  ref: [],
  min: [],
  measured: [],
  measuredDown: [],
  measuredUp: [],
  kinMeasured: [],
  kinMeasuredDown: [],
  kinMeasuredUp: [],
  statMeasured: [],
  statMeasuredDown: [],
  statMeasuredUp: [],
};

export const jsonpatchDefaultRoadmapTorqueValues = {
  isDrilling: false,
  md: 0,
  bitDepth: 0,
  td: 0,
  casingShoeDepth: 0,
  drilling: deepClone(defaultLines),
  tripping: deepClone(defaultLines),
};

export const defaultRoadmapTorqueValues = {
  operationId: '',
  lastUpdated: '',
  currentTime: '',
  data: jsonpatchDefaultRoadmapTorqueValues,
};
