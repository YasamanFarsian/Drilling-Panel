import { renderHook } from '@testing-library/react-hooks';
import LocaleProvider from '@dt-advisory/providers/Locale';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useRoadmapWidgetTitle } from './useRoadmapWidgetTitle';

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }), // Directly test on translation key
}));
jest.mock('@dt-advisory/store/Settings');

describe.each(['roadmapDrag' as const, 'roadmapTorque' as const])(
  'useRoadmapWidgetTitle with lokaliseKey=%s',
  (lokaliseKey) => {
    it('should return correct value when state is Drilling', () => {
      (useSettingsStore as unknown as jest.Mock).mockReturnValue('Drilling');
      const { result } = renderHook(
        () =>
          useRoadmapWidgetTitle({
            widgetId: '123',
            lokaliseKey,
          }),
        {
          wrapper: LocaleProvider,
        },
      );

      expect(result.current).toEqual(`widget.${lokaliseKey}.title.drilling`);
    });

    it('should return correct value when state is Tripping', () => {
      (useSettingsStore as unknown as jest.Mock).mockReturnValue('Tripping');
      const { result } = renderHook(
        () =>
          useRoadmapWidgetTitle({
            widgetId: '123',
            lokaliseKey,
          }),
        {
          wrapper: LocaleProvider,
        },
      );

      expect(result.current).toEqual(`widget.${lokaliseKey}.title.tripping`);
    });

    describe('state: Automatic', () => {
      it('should return drilling title when isDrilling is true', () => {
        (useSettingsStore as unknown as jest.Mock).mockReturnValue('Automatic');
        const { result } = renderHook(
          () =>
            useRoadmapWidgetTitle({
              widgetId: '123',
              lokaliseKey,
              isDrilling: true,
            }),
          {
            wrapper: LocaleProvider,
          },
        );

        expect(result.current).toEqual(`widget.${lokaliseKey}.title.drilling`);
      });

      it('should return tripping title when isDrilling is false', () => {
        (useSettingsStore as unknown as jest.Mock).mockReturnValue('Automatic');
        const { result } = renderHook(
          () =>
            useRoadmapWidgetTitle({
              widgetId: '123',
              lokaliseKey,
              isDrilling: false,
            }),
          {
            wrapper: LocaleProvider,
          },
        );

        expect(result.current).toEqual(`widget.${lokaliseKey}.title.tripping`);
      });

      it('should return default title when isDrilling is undefined', () => {
        (useSettingsStore as unknown as jest.Mock).mockReturnValue('Automatic');
        const { result } = renderHook(
          () =>
            useRoadmapWidgetTitle({
              widgetId: '123',
              lokaliseKey,
            }),
          {
            wrapper: LocaleProvider,
          },
        );

        expect(result.current).toEqual(`widget.${lokaliseKey}.title.default`);
      });
    });
  },
);
