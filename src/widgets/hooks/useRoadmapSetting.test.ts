import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useSettingsStore } from '@dt-advisory/store/Settings/Settings';
import { useRoadmapSetting } from './useRoadmapSetting';

const widgetId = '123';

const getroadmapValueByWidgetId = () => {
  const { result: currentRoadmap } = renderHook(() => useSettingsStore((x) => x.settings));
  return currentRoadmap.current.roadmap[widgetId];
};

describe('useRoadmapDragSetting', () => {
  beforeAll(() => {
    const { result: initialRoadmap } = renderHook(() => useSettingsStore((x) => x.initialRoadmap));

    act(() => {
      initialRoadmap.current(widgetId);
    });
  });

  it('should return default value when call initailRoadmapDrag', () => {
    const result = getroadmapValueByWidgetId();

    expect(result.model).toEqual('Steadystate');
    expect(result.state).toEqual('Automatic');
  });

  it('should call handleModelChange when pass the correct value', () => {
    const { result } = renderHook(() => useRoadmapSetting(widgetId));

    act(() => {
      result.current.handleModelChange('TransientKinetic');
    });

    const resultAfterUpdateModel = getroadmapValueByWidgetId();
    expect(resultAfterUpdateModel.model).toEqual('TransientKinetic');
  });

  it('should call handleStateChange when pass the correct value', () => {
    const { result } = renderHook(() => useRoadmapSetting(widgetId));

    act(() => {
      result.current.handleStateChange('Tripping');
    });

    const resultAfterUpdateModel = getroadmapValueByWidgetId();
    expect(resultAfterUpdateModel.state).toEqual('Tripping');
  });
});
