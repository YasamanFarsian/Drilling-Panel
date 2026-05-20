import { useIntl } from 'react-intl';
import { TimerState } from '@dt-advisory/helpers/noStreamingTimer';
import { RoadmapModelType, useSettingsStore } from '@dt-advisory/store/Settings';

type useRoadmapTagTitleReturnType = {
  label: string;
  value: RoadmapModelType;
};

export const useRoadmapTagTitle = (
  widgetId: string,
  timer?: TimerState,
): useRoadmapTagTitleReturnType | undefined => {
  const { formatMessage } = useIntl();
  const roadmapModel = useSettingsStore((state) => state.settings?.roadmap?.[widgetId]?.model);

  if (timer?.state) return undefined;

  switch (roadmapModel) {
    case 'TransientKinetic':
      return {
        label: formatMessage({ id: 'widget.roadmap.model.tag.transientKinetic.label' }),
        value: roadmapModel,
      };
    case 'TransientStatic':
      return {
        label: formatMessage({ id: 'widget.roadmap.model.tag.transientStatic.label' }),
        value: roadmapModel,
      };
    default:
      return {
        label: formatMessage({ id: 'widget.roadmap.model.tag.steadystate.label' }),
        value: 'Steadystate' as RoadmapModelType,
      };
  }
};
