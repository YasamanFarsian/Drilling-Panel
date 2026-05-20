import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useOpenCloseWidgetSettingStore } from './OpenCloseWidgetSettings';

describe('useOpenCloseWidgetSettingStore', () => {
  it('should return correct default values', () => {
    const { result } = renderHook(() => useOpenCloseWidgetSettingStore());

    expect(result.current.smartAutoRop.isOpen).toBeFalsy();
    expect(result.current.roadmap).toStrictEqual({});
  });

  describe('actions.openSetting', () => {
    it.each([['smartAutoRop' as const, 'smartAutoRop']])(
      'should open %s if call openSetting with type %s',
      (settingType, _) => {
        const { result } = renderHook(() => useOpenCloseWidgetSettingStore());
        act(() => {
          result.current.actions.openSetting({ settingType });
        });
      },
    );

    it.each(['roadmapDrag' as const, 'roadmapTorque' as const])(
      'should open roadmap if call openSetting with type %s',
      (settingType) => {
        const { result } = renderHook(() => useOpenCloseWidgetSettingStore());
        act(() => {
          result.current.actions.closeSetting({ settingType, widgetId: 'newId' });
          result.current.actions.openSetting({ settingType, widgetId: 'newId' });
        });
        expect(result.current.roadmap['newId'].isOpen).toBeTruthy();
      },
    );

    it('should not change the setting if type is roadmapDrag but no widgetId', () => {
      const { result } = renderHook(() => useOpenCloseWidgetSettingStore());
      const refRoadmapSetting = result.current.roadmap;
      act(() => {
        result.current.actions.openSetting({ settingType: 'roadmapDrag' });
      });
      expect(result.current.roadmap).toStrictEqual(refRoadmapSetting);
    });
  });
  describe('actions.closeSetting', () => {
    it.each([
      ['safeguards' as const, 'safeguards'],
      ['smartAutoRop' as const, 'smartAutoRop'],
    ])('should close %s if call closeSetting with type %s', (settingType, _) => {
      const { result } = renderHook(() => useOpenCloseWidgetSettingStore());
      act(() => {
        result.current.actions.openSetting({ settingType });
        result.current.actions.closeSetting({ settingType });
      });
      expect(result.current.safeguards.isOpen).toBeFalsy();
    });

    it.each(['roadmapDrag' as const, 'roadmapTorque' as const])(
      'should close roadmap if call closeSetting with type %s',
      (settingType) => {
        const { result } = renderHook(() => useOpenCloseWidgetSettingStore());
        act(() => {
          result.current.actions.openSetting({ settingType, widgetId: 'newId' });
          result.current.actions.closeSetting({ settingType, widgetId: 'newId' });
        });
        expect(result.current.roadmap['newId'].isOpen).toBeFalsy();
      },
    );

    it('should not change the setting if type is roadmapDrag but no widgetId', () => {
      const { result } = renderHook(() => useOpenCloseWidgetSettingStore());
      const refRoadmapSetting = result.current.roadmap;
      act(() => {
        result.current.actions.closeSetting({ settingType: 'roadmapDrag' });
      });
      expect(result.current.roadmap).toStrictEqual(refRoadmapSetting);
    });
  });
});
