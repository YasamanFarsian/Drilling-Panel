import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import LocaleProvider from '@dt-advisory/providers/Locale';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import {
  WidgetLayoutEnum,
  WidgetsLoaderEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useWidgetCatalog } from './useWidgetCatalog';

jest.mock('@dt-advisory/store/Settings', () => ({
  useSettingsStore: jest.fn(),
}));

jest.mock('react-query', () => ({
  useMutation: jest.fn().mockReturnValue({ mutateAsync: jest.fn(), isLoading: false }),
}));

describe('useWidgetCatalog', () => {
  describe('handleUpdateWidget', () => {
    const mockTemplateBody = {
      gridConfig: [
        [0, 1, 2],
        [0, 1, 2],
      ],
      isEditable: true,
      name: 'm',
      widgetConfig: [
        { key: WidgetsLoaderEnum.Unsettled },
        { key: WidgetsLoaderEnum.Unsettled },
        { key: WidgetsLoaderEnum.Unsettled },
      ],
    };

    const mockRemoveRoadmap = jest.fn();
    (useSettingsStore as unknown as jest.Mock).mockImplementation((cb) =>
      cb({ removeRoadmap: mockRemoveRoadmap }),
    );

    afterEach(() => {
      jest.clearAllMocks();
    });

    it.each([WidgetsLoaderEnum.RoadmapDrag, WidgetsLoaderEnum.RoadmapTorque])(
      'should call removeRoadmap with oldWidgetId if selectedWidgetKey is RoadmapDrag or RoadmapTorque',
      async (testWidgetKey) => {
        const { result } = renderHook(() => useWidgetCatalog('mockTemplateId'), {
          wrapper: LocaleProvider,
        });
        result.current.handleUpdateWidget(
          WidgetsLoaderEnum.Ecd,
          {
            ...mockTemplateBody,
            widgetConfig: [
              { key: testWidgetKey, widgetConfig: { widgetId: 'old widget id' } },
              { key: WidgetsLoaderEnum.Unsettled },
              { key: WidgetsLoaderEnum.Unsettled },
            ],
          },
          WidgetLayoutEnum.OneRowThreeWidgets,
        );

        await waitFor(() => expect(mockRemoveRoadmap).toHaveBeenCalledWith('old widget id'));
      },
    );

    it('should not call removeRoadmap if selectedWidgetKey is not RoadmapDrag or RoadmapTorque', async () => {
      const { result } = renderHook(() => useWidgetCatalog('mockTemplateId'), {
        wrapper: LocaleProvider,
      });
      result.current.handleUpdateWidget(
        WidgetsLoaderEnum.Ecd,
        {
          ...mockTemplateBody,
          widgetConfig: [
            { key: WidgetsLoaderEnum.Ecd, widgetConfig: { widgetId: 'old widget id' } },
            { key: WidgetsLoaderEnum.Unsettled },
            { key: WidgetsLoaderEnum.Unsettled },
          ],
        },
        WidgetLayoutEnum.OneRowThreeWidgets,
      );

      await waitFor(() => expect(mockRemoveRoadmap).not.toHaveBeenCalled());
    });
  });
});
