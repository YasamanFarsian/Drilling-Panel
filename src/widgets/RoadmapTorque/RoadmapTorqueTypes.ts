import {
  BasicMinMaxValueType,
  BasicValueType,
  CoordinatesType,
  Domain,
} from '@dt-advisory/widgets/helpers/types';

export type CurrentDataTorqueType = Omit<
  RoadmapTorqueType,
  | 'measured'
  | 'measuredDown'
  | 'measuredUp'
  | 'kinMeasured'
  | 'kinMeasuredDown'
  | 'kinMeasuredUp'
  | 'statMeasured'
  | 'statMeasuredDown'
  | 'statMeasuredUp'
>;

export type RoadmapTorqueDataType = {
  line0: BasicValueType[];
  line12: BasicValueType[];
  line22: BasicValueType[];
  line32: BasicValueType[];
  line42: BasicValueType[];
  ref?: BasicValueType[];
  min?: BasicValueType[];
  refZone?: BasicMinMaxValueType[];
  measured: BasicValueType[];
  measuredDown: BasicValueType[];
  measuredUp: BasicValueType[];
  kinMeasured: BasicValueType[];
  kinMeasuredDown: BasicValueType[];
  kinMeasuredUp: BasicValueType[];
  statMeasured: BasicValueType[];
  statMeasuredDown: BasicValueType[];
  statMeasuredUp: BasicValueType[];
};

export type RoadmapTorquePatchedType = {
  isDrilling: boolean;
  bitDepth: number;
  md: number; // holedepth
  td: number;
  casingShoeDepth: number;
  drilling: RoadmapTorqueDataType;
  tripping: RoadmapTorqueDataType;
};

export type RoadmapTorqueType = {
  operationId: string;
  lastUpdated: string;
  currentTime: string;
  data: RoadmapTorquePatchedType;
  isLive: boolean | null;
};

export type RoadmapTorqueWidgetType = {
  isDrilling: boolean;
  lastUpdated: string;
  currentTime: string;
  bitDepth: number;
  holeDepth: number;
  casingShoeDepth: number;
  minDomain: Domain;
  maxDomain: Domain;
  currentData: {
    line0: BasicValueType[];
    line12: BasicValueType[];
    line22: BasicValueType[];
    line32: BasicValueType[];
    line42: BasicValueType[];
    dotsLeft: BasicValueType[];
    dotsCenter: BasicValueType[];
    dotsRight: BasicValueType[];
  };
};

export type ConvertedRoadmapTorqueWidgetType = Omit<RoadmapTorqueWidgetType, 'currentData'> & {
  currentData: {
    line0: CoordinatesType[];
    line12: CoordinatesType[];
    line22: CoordinatesType[];
    line32: CoordinatesType[];
    line42: CoordinatesType[];
    dotsLeft: CoordinatesType[];
    dotsCenter: CoordinatesType[];
    dotsRight: CoordinatesType[];
  };
  tickValues: number[];
};
