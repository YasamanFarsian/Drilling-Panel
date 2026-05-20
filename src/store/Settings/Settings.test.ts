import { act, renderHook } from '@testing-library/react-hooks';
import { useUserConfigurationStore } from '../UserConfiguration/UserConfiguration';
import { useSettingsStore, WarningsActivation } from './Settings';

describe('store: useSettingsStore', () => {
  it('useSettingsStore should return correct default values', () => {
    const { result } = renderHook(() => useSettingsStore());
    const { settings } = result.current;
    expect(settings).toHaveProperty('warningsAnimation', WarningsActivation.ON);
    expect(settings).toHaveProperty('warningTimeout', 2);
    expect(settings).toHaveProperty('muteWarningTimeout', 1800);
    expect(settings).toHaveProperty('tripspeedTreshold', 'absolute');
    expect(settings).toHaveProperty('flowTreshold', 'absolute');
    expect(settings).toHaveProperty('sppTreshold', 'absolute');
    expect(settings).toHaveProperty('hookloadTreshold', 'absolute');
    expect(settings).toHaveProperty('torqueTreshold', 'absolute');
    expect(settings).toHaveProperty('smartAutoRop.thresholdLimit', 5);
    expect(settings).toHaveProperty('roadmap', {});

    act(() => {
      result.current.updateSettings('warningTimeout', 3);
    });

    expect(result.current.settings).toHaveProperty('warningTimeout', 3);
  });

  describe('updateSmartAutoRopSetting', () => {
    it('should return correct value of smartAutoRop.thresholdLimit after call with thresholdLimit', () => {
      const { result } = renderHook(() => useSettingsStore());
      act(() => {
        result.current.updateSmartAutoRopThresholdLimit(6);
      });

      expect(result.current.settings).toHaveProperty('smartAutoRop.thresholdLimit', 6);
    });

    it('should return NaN for smartAutoRop.thresholdLimit after call with thresholdLimit with NaN', () => {
      const { result } = renderHook(() => useSettingsStore());
      act(() => {
        result.current.updateSmartAutoRopThresholdLimit(NaN);
      });

      expect(result.current.settings).toHaveProperty('smartAutoRop.thresholdLimit', NaN);
    });
  });

  describe('roadmapDrag', () => {
    describe('initialRoadmapDrag', () => {
      it('should return initial value for roadmapDrag', () => {
        const { result } = renderHook(() => useSettingsStore());
        act(() => {
          result.current.initialRoadmap('firstid');
        });

        expect(result.current.settings.roadmap['firstid']).toStrictEqual({
          model: 'Steadystate',
          state: 'Automatic',
        });
      });
    });

    describe('removeRoadmap', () => {
      it('should removed the widget key from roadmapDrag', () => {
        const { result } = renderHook(() => useSettingsStore());
        act(() => {
          result.current.initialRoadmap('firstid');
          result.current.initialRoadmap('secondid');
          result.current.removeRoadmap('firstid');
        });

        expect(result.current.settings.roadmap['firstid']).toBeUndefined();
        expect(result.current.settings.roadmap['secondid']).toBeDefined();
      });
    });

    describe('updateRoadmapModel', () => {
      it('should update roadmapDrag model to TransientKinetic', () => {
        const { result } = renderHook(() => useSettingsStore());
        act(() => {
          result.current.initialRoadmap('firstid');
        });

        expect(result.current.settings.roadmap['firstid']).toStrictEqual({
          model: 'Steadystate',
          state: 'Automatic',
        });

        act(() => {
          result.current.updateRoadmapModel('firstid', 'TransientKinetic');
        });

        expect(result.current.settings.roadmap['firstid']).toStrictEqual({
          model: 'TransientKinetic',
          state: 'Automatic',
        });
      });
    });

    describe('updateRoadmapState', () => {
      it('should update roadmapDrag model to Drilling', () => {
        const { result } = renderHook(() => useSettingsStore());

        act(() => {
          result.current.initialRoadmap('firstid');
        });

        expect(result.current.settings.roadmap['firstid']).toStrictEqual({
          model: 'Steadystate',
          state: 'Automatic',
        });

        act(() => {
          result.current.updateRoadmapState('firstid', 'Drilling');
        });

        expect(result.current.settings.roadmap['firstid']).toStrictEqual({
          model: 'Steadystate',
          state: 'Drilling',
        });
      });
    });

    describe('purgeRoadmap', () => {
      it('should delete all roadmapDrag settings which the widgetId has no longer existed on any template', () => {
        jest.spyOn(useUserConfigurationStore, 'getState').mockReturnValue({
          templatesToSave: [
            {
              widgetConfig: [
                { widgetConfig: { widgetId: 'test1' } },
                { widgetConfig: { widgetId: 'test2' } },
              ],
            },
            {
              widgetConfig: [{ widgetConfig: { widgetId: 'test3' } }],
            },
          ],
        } as any);

        const { result } = renderHook(() => useSettingsStore());
        act(() => {
          result.current.initialRoadmap('test0');
          result.current.initialRoadmap('test1');
          result.current.initialRoadmap('test2');
          result.current.initialRoadmap('test3');
          result.current.initialRoadmap('test4');
          result.current.purgeRoadmap();
        });

        expect(Object.keys(result.current.settings.roadmap)).toStrictEqual([
          'test1',
          'test2',
          'test3',
        ]);
      });
    });
  });
});
