import { RoadmapModelType, RoadmapStateType, useSettingsStore } from '@dt-advisory/store/Settings';

export const useRoadmapSetting = (widgetId: string) => {
  const model = useSettingsStore((x) => x.settings.roadmap[widgetId]?.model);
  const updateRoadmapModel = useSettingsStore((x) => x.updateRoadmapModel);
  const state = useSettingsStore((x) => x.settings.roadmap[widgetId]?.state);
  const updateRoadmapState = useSettingsStore((x) => x.updateRoadmapState);

  const handleModelChange = (value: RoadmapModelType) => {
    if (value) {
      updateRoadmapModel(widgetId, value);
    }
  };

  const handleStateChange = (value: RoadmapStateType) => {
    if (value) {
      updateRoadmapState(widgetId, value);
    }
  };

  return {
    model,
    state,
    handleModelChange,
    handleStateChange,
  };
};
