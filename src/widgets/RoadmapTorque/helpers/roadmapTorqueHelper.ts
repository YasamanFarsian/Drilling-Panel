/* eslint-disable complexity */
import { RoadmapModelType } from '@dt-advisory/store/Settings/Settings';
import { DotsType } from '@dt-advisory/widgets/helpers/types';
import {
  BaseRoadmapPatchedType,
  BaseRoadmapType,
} from '@dt-advisory/widgets/providers/DataProviderWithJsonPatch/DataProviderWithJsonPatch.types';
import { defaultRoadmapTorqueValues } from '@dt-advisory/widgets/RoadmapTorque/RoadmapTorqueConstants';
import { RoadmapTorqueDataType, RoadmapTorqueType } from '../RoadmapTorqueTypes';

export const getRoadmapTorqueSafeData = (data: RoadmapTorqueType) => {
  return data;
};

export const getDotsFromModel = (currentModel: RoadmapModelType, data?: RoadmapTorqueDataType) => {
  const dots: DotsType = {
    dotsLeft: [],
    dotsCenter: [],
    dotsRight: [],
  };
  switch (currentModel) {
    case 'TransientKinetic':
      dots.dotsLeft = data?.kinMeasured ?? [];
      dots.dotsCenter = data?.kinMeasuredDown ?? [];
      dots.dotsRight = data?.kinMeasuredUp ?? [];
      break;
    case 'TransientStatic':
      dots.dotsLeft = data?.statMeasured ?? [];
      dots.dotsCenter = data?.statMeasuredDown ?? [];
      dots.dotsRight = data?.statMeasuredUp ?? [];
      break;
    case 'Steadystate':
    default:
      dots.dotsLeft = data?.measured ?? [];
      dots.dotsCenter = data?.measuredDown ?? [];
      dots.dotsRight = data?.measuredUp ?? [];
      break;
  }
  return dots;
};

export const mappingWsToChartData = (
  webSocketData: BaseRoadmapType | null,
  patchedData: BaseRoadmapPatchedType,
) => ({
  operationId: webSocketData?.operationId ?? defaultRoadmapTorqueValues.operationId,
  lastUpdated: webSocketData?.lastUpdated ?? defaultRoadmapTorqueValues.lastUpdated,
  currentTime: webSocketData?.currentTime ?? defaultRoadmapTorqueValues.currentTime,
  data: patchedData,
});
