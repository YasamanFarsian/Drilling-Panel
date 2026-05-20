import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import RoadmapSetting from './RoadmapSetting';

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }), // Directly test on translation key
}));

const widgetId = 'testWidgetId';

describe('RoadmapSetting', () => {
  it('should change value to TransientStatic when click on Transient Static toggle button', async () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.initialRoadmap(widgetId);
    });

    renderWithThemeAndLocaleProviders(<RoadmapSetting widgetId={widgetId} />);

    fireEvent.click(screen.getByText('widget.roadmap.setting.model.transientStatic.label'));

    await waitFor(() =>
      expect(result.current.settings.roadmap[widgetId].model).toEqual('TransientStatic'),
    );
  });

  it('should change value to Tripping when click on Tripping toggle button', async () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.initialRoadmap(widgetId);
    });

    renderWithThemeAndLocaleProviders(<RoadmapSetting widgetId={widgetId} />);

    fireEvent.click(screen.getByText('widget.roadmap.setting.state.tripping.label'));

    await waitFor(() =>
      expect(result.current.settings.roadmap[widgetId].state).toEqual('Tripping'),
    );
  });
});
