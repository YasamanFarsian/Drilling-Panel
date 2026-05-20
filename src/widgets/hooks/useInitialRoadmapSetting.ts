import { useSettingsStore } from '@dt-advisory/store/Settings';

export const useInitialRoadmapSetting = (widgetId: string) => {
  const roadmapSetting = useSettingsStore((state) => state.settings.roadmap[widgetId]);
  const initialRoadmapSetting = useSettingsStore((state) => state.initialRoadmap);

  if (!roadmapSetting) {
    initialRoadmapSetting(widgetId);
  }
};
