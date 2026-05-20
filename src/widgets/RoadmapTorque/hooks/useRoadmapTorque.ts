/* eslint-disable max-lines-per-function */
import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';

import { useOpenCloseWidgetSettingStore } from '@dt-advisory/store/OpenCloseWidgetSettings';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useNoStreamingTimer } from '@dt-advisory/widgets/hooks/useNoStreamingTimer';
import { RoadmapTorqueType } from '../RoadmapTorqueTypes';
import { useRoadmapTorqueChart } from './useRoadmapTorqueChart';

type UseRoadmapTorquePropsType = {
  widgetId: string;
  noConnectionTimerLimit?: number;
  numOfTicks: number;
  data: RoadmapTorqueType | null;
  isConnected?: boolean;
};

export const useRoadmapTorque = ({
  widgetId,
  noConnectionTimerLimit,
  numOfTicks,
  data: roadmapTorqueData,
  isConnected,
}: UseRoadmapTorquePropsType) => {
  const chartData = useRoadmapTorqueChart({ roadmapTorqueData, widgetId, numOfTicks });
  useNoStreamingTimer({
    data: roadmapTorqueData,
    type: WidgetsEnum.RoadmapTorque,
    keys: ['lastUpdated'],
    noConnectionTimerLimit,
  });
  const isOpenSetting = useOpenCloseWidgetSettingStore((state) => state.roadmap[widgetId]?.isOpen);
  const isShowGraph = Boolean(isConnected && roadmapTorqueData);
  const hideAxisLabel = useAxisLabelToggleStore((x) => x.hideAxisLabel[widgetId]);

  return {
    data: chartData,
    isConnected,
    isShowGraph,

    isOpenSetting,
    hideAxisLabel,
  };
};
