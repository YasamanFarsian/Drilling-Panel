/* eslint-disable max-lines-per-function */
import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';

import { useOpenCloseWidgetSettingStore } from '@dt-advisory/store/OpenCloseWidgetSettings';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useNoStreamingTimer } from '@dt-advisory/widgets/hooks/useNoStreamingTimer';
import { RoadmapDragType } from '../RoadmapDragTypes';
import { useRoadmapDragChart } from './useRoadmapDragChart';

type UseRoadmapDragPropsType = {
  widgetId: string;
  noConnectionTimerLimit?: number;
  numOfTicks: number;
  data: RoadmapDragType | null;
  isConnected?: boolean;
};
export const useRoadmapDrag = ({
  widgetId,
  noConnectionTimerLimit,
  numOfTicks,
  data: roadmapDragData,
  isConnected,
}: UseRoadmapDragPropsType) => {
  const chartData = useRoadmapDragChart({
    roadmapDragData: roadmapDragData,
    widgetId,
    numOfTicks,
  });

  useNoStreamingTimer<RoadmapDragType>({
    data: roadmapDragData,
    type: WidgetsEnum.RoadmapDrag,
    keys: ['lastUpdated'],
    noConnectionTimerLimit,
  });
  const isOpenSetting = useOpenCloseWidgetSettingStore((state) => state.roadmap[widgetId]?.isOpen);
  const isShowGraph = Boolean(isConnected && roadmapDragData);
  const hideAxisLabel = useAxisLabelToggleStore((x) => x.hideAxisLabel[widgetId]);

  return {
    data: chartData,
    isConnected,

    isShowGraph,
    isOpenSetting,
    hideAxisLabel,
  };
};
