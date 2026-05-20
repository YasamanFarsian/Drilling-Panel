import { useIntl } from 'react-intl';
import { useSettingsStore } from '@dt-advisory/store/Settings';

type UseRoadmapWidgetTitlePropsType = {
  widgetId: string;
  lokaliseKey: 'roadmapDrag' | 'roadmapTorque';
  isDrilling?: boolean;
};

// eslint-disable-next-line complexity
export const useRoadmapWidgetTitle = ({
  widgetId,
  lokaliseKey,
  isDrilling,
}: UseRoadmapWidgetTitlePropsType) => {
  const { formatMessage } = useIntl();
  const roadmapState = useSettingsStore((state) => state.settings?.roadmap[widgetId]?.state);

  if (roadmapState === 'Tripping' || (roadmapState === 'Automatic' && isDrilling === false)) {
    return formatMessage({ id: `widget.${lokaliseKey}.title.tripping` });
  }

  if (roadmapState === 'Drilling' || (roadmapState === 'Automatic' && isDrilling === true)) {
    return formatMessage({ id: `widget.${lokaliseKey}.title.drilling` });
  }

  return formatMessage({ id: `widget.${lokaliseKey}.title.default` });
};
