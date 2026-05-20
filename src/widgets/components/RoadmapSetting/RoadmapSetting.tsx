import React from 'react';
import { useRoadmapSetting } from '@dt-advisory/widgets/hooks/useRoadmapSetting';
import ModelToggleButton from './components/ModelToggleButton';
import StatesToggleButton from './components/StatesToggleButton';
import { containerStyle } from './RoadmapSetting.style';

type RoadmapSettingPropsType = {
  widgetId: string;
  widgetName?: string;
  isSmallVersion?: boolean;
};

const RoadmapSetting = ({
  widgetId,
  widgetName = 'unassigned',
  isSmallVersion,
}: RoadmapSettingPropsType): JSX.Element => {
  const { model, state, handleModelChange, handleStateChange } = useRoadmapSetting(widgetId);
  return (
    <div data-testid={`${widgetName}-road_map_setting_1688530817019`} css={containerStyle}>
      <ModelToggleButton
        handleModelChange={handleModelChange}
        model={model}
        isSmallVersion={isSmallVersion}
      />
      <StatesToggleButton
        handleStateChange={handleStateChange}
        state={state}
        isSmallVersion={isSmallVersion}
      />
    </div>
  );
};

export default RoadmapSetting;
