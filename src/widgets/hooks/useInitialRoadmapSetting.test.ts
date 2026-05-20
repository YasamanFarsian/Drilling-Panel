import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { DEFAULT_ROADMAP_SETTING, useSettingsStore } from '@dt-advisory/store/Settings';
import { useInitialRoadmapSetting } from './useInitialRoadmapSetting';

describe('useInitialRoadmapSetting', () => {
  it('should init roadmap with default setting if the roadmapSetting for the widgetId is not existed yet', () => {
    renderHook(() => useInitialRoadmapSetting('testRoadmapId'));
    const { result } = renderHook(() => useSettingsStore());

    expect(result.current.settings.roadmap['testRoadmapId']).toStrictEqual(DEFAULT_ROADMAP_SETTING);
  });

  it('should not change any thing if roadmap setting for the widgetId already have value', () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.initialRoadmap('testRoadmapDragId');
      result.current.updateRoadmapModel('testRoadmapDragId', 'TransientStatic');
      result.current.updateRoadmapState('testRoadmapDragId', 'Tripping');
    });

    expect(result.current.settings.roadmap['testRoadmapDragId']).toStrictEqual({
      model: 'TransientStatic',
      state: 'Tripping',
    });

    renderHook(() => useInitialRoadmapSetting('testRoadmapDragId'));

    expect(result.current.settings.roadmap['testRoadmapDragId']).toStrictEqual({
      model: 'TransientStatic',
      state: 'Tripping',
    });
  });
});
