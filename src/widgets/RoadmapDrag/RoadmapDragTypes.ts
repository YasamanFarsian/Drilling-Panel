import {
  BasicMinMaxValueType,
  BasicValueType,
  CoordinatesType,
  Domain,
} from '@dt-advisory/widgets/helpers/types';

export type CurrentDataType = Omit<
  RoadmapDragDataType,
  | 'leftMeasured'
  | 'centerMeasured'
  | 'rightMeasured'
  | 'kinLeftMeasured'
  | 'kinCenterMeasured'
  | 'kinRightMeasured'
  | 'statLeftMeasured'
  | 'statCenterMeasured'
  | 'statRightMeasured'
>;

export type RoadmapDragDataType = {
  line0: BasicValueType[];
  line12Left: BasicValueType[];
  line22Left: BasicValueType[];
  line32Left: BasicValueType[];
  line42Left: BasicValueType[];
  line12Right: BasicValueType[];
  line22Right: BasicValueType[];
  line32Right: BasicValueType[];
  line42Right: BasicValueType[];
  leftRef?: BasicValueType[];
  centerRef?: BasicValueType[];
  rightRef?: BasicValueType[];
  leftMin?: BasicValueType[];
  centerMin?: BasicValueType[];
  rightMin?: BasicValueType[];
  leftRefZone?: BasicMinMaxValueType[];
  centerRefZone?: BasicMinMaxValueType[];
  rightRefZone?: BasicMinMaxValueType[];
  leftMeasured: BasicValueType[];
  centerMeasured: BasicValueType[];
  rightMeasured: BasicValueType[];
  kinLeftMeasured: BasicValueType[];
  kinCenterMeasured: BasicValueType[];
  kinRightMeasured: BasicValueType[];
  statLeftMeasured: BasicValueType[];
  statCenterMeasured: BasicValueType[];
  statRightMeasured: BasicValueType[];
};

export type RoadmapDragPatchedType = {
  isDrilling: boolean;
  bitDepth: number;
  md: number; // holedepth
  td: number;
  casingShoeDepth: number;
  drilling: RoadmapDragDataType;
  tripping: RoadmapDragDataType;
};
export type RoadmapDragType = {
  operationId: string;
  lastUpdated: string;
  currentTime: string;
  data: RoadmapDragPatchedType;
  isLive: boolean | null;
};

export type RoadmapDragWidgetType = {
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
    line12Left: BasicValueType[];
    line22Left: BasicValueType[];
    line32Left: BasicValueType[];
    line42Left: BasicValueType[];
    line12Right: BasicValueType[];
    line22Right: BasicValueType[];
    line32Right: BasicValueType[];
    line42Right: BasicValueType[];
    dotsLeft: BasicValueType[];
    dotsCenter: BasicValueType[];
    dotsRight: BasicValueType[];
  };
};

export type ConvertedRoadmapDragWidgetType = Omit<RoadmapDragWidgetType, 'currentData'> & {
  currentData: {
    line0: CoordinatesType[];
    line12Left: CoordinatesType[];
    line22Left: CoordinatesType[];
    line32Left: CoordinatesType[];
    line42Left: CoordinatesType[];
    line12Right: CoordinatesType[];
    line22Right: CoordinatesType[];
    line32Right: CoordinatesType[];
    line42Right: CoordinatesType[];
    dotsLeft: CoordinatesType[];
    dotsCenter: CoordinatesType[];
    dotsRight: CoordinatesType[];
  };
  tickValues: number[];
};
