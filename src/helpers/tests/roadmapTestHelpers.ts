import { act, renderHook } from '@testing-library/react-hooks';
import {
  RoadmapModelType,
  RoadmapStateType,
  useSettingsStore,
} from '@dt-advisory/store/Settings/Settings';

export const updateState = (widgetId: string, value: RoadmapStateType) => {
  const { result: updateRoadmapState } = renderHook(() =>
    useSettingsStore((x) => x.updateRoadmapState),
  );
  act(() => {
    updateRoadmapState.current(widgetId, value);
  });
};

export const updateModel = (widgetId: string, value: RoadmapModelType) => {
  const { result: updateRoadmapModel } = renderHook(() =>
    useSettingsStore((x) => x.updateRoadmapModel),
  );
  act(() => {
    updateRoadmapModel.current(widgetId, value);
  });
};
