/* eslint-disable max-lines-per-function, complexity */
import { RoadmapModelType } from '@dt-advisory/store/Settings/Settings';
import { DotsType } from '@dt-advisory/widgets/helpers/types';
import {
  BaseRoadmapPatchedType,
  BaseRoadmapType,
} from '@dt-advisory/widgets/providers/DataProviderWithJsonPatch/DataProviderWithJsonPatch.types';
import { defaultRoadmapDragValues } from '../RoadmapDragConstants';
import { RoadmapDragDataType, RoadmapDragType } from '../RoadmapDragTypes';

export const getRoadmapDragSafeData = (data: RoadmapDragType) => {
  return data;
};

export const getDotsFromModel = (currentModel: RoadmapModelType, data?: RoadmapDragDataType) => {
  const dots: DotsType = {
    dotsLeft: [],
    dotsCenter: [],
    dotsRight: [],
  };
  switch (currentModel) {
    case 'TransientKinetic':
      dots.dotsLeft = data?.kinLeftMeasured ?? [];
      dots.dotsCenter = data?.kinCenterMeasured ?? [];
      dots.dotsRight = data?.kinRightMeasured ?? [];
      break;
    case 'TransientStatic':
      dots.dotsLeft = data?.statLeftMeasured ?? [];
      dots.dotsCenter = data?.statCenterMeasured ?? [];
      dots.dotsRight = data?.statRightMeasured ?? [];
      break;
    // 'SteadyState'
    default:
      dots.dotsLeft = data?.leftMeasured ?? [];
      dots.dotsCenter = data?.centerMeasured ?? [];
      dots.dotsRight = data?.rightMeasured ?? [];
      break;
  }
  return dots;
};

export const mappingWsToChartData = (
  webSocketData: BaseRoadmapType | null,
  patchedData: BaseRoadmapPatchedType,
) => ({
  operationId: webSocketData?.operationId ?? defaultRoadmapDragValues.operationId,
  lastUpdated: webSocketData?.lastUpdated ?? defaultRoadmapDragValues.lastUpdated,
  currentTime: webSocketData?.currentTime ?? defaultRoadmapDragValues.currentTime,
  data: patchedData,
});
