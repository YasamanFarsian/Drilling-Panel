import { act, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { useOpenCloseWidgetSettingStore } from '@dt-advisory/store/OpenCloseWidgetSettings';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import BaseWidget, { SettingsType } from './BaseWidget';

jest.mock('@dt-advisory/store/OpenCloseWidgetSettings');

const mockOpenSetting = jest.fn();
const mockCloseSetting = jest.fn();
const mockRoadmapDragTestId = 'testRoadmapDragId';

function mockUseOpenCloseWidgetSettingStore(isOpen: boolean) {
  (useOpenCloseWidgetSettingStore as unknown as jest.Mock).mockImplementation((cb) =>
    cb({
      safeguards: { isOpen },
      roadmap: {
        [mockRoadmapDragTestId]: { isOpen },
      },
      actions: { openSetting: mockOpenSetting, closeSetting: mockCloseSetting },
    }),
  );
}

describe('Component BaseWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockedProps = {
    name: WidgetsLoaderEnum.Cutting,
    title: <div>hello</div>,
    settings: 'safeguards' as SettingsType,
  };

  it('should display roadmapDrag with steadystate with default when current widget is roadmapDrag', () => {
    mockUseOpenCloseWidgetSettingStore(true);
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <BaseWidget
        {...mockedProps}
        settings={'roadmapDrag'}
        name={WidgetsLoaderEnum.RoadmapDrag}
        titleTag={{
          label: 'STEADYSTATE',
          value: 'Steadystate',
        }}
      />,
    );
    expect(getByTestId('title_tag_1689134109491')).toHaveTextContent(/STEADYSTATE/);
    expect(getByTestId('title_tag_1689134109491')).toHaveStyle('background-color: #F3FCF3');
  });

  it('should render header setting when safeguards.isOpen is true', () => {
    mockUseOpenCloseWidgetSettingStore(true);
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <BaseWidget {...mockedProps} settings="safeguards" />,
    );
    expect(getByTestId('settings_header_1677074473828')).toBeInTheDocument();
  });

  it('should call "Close setting" when click back button in setting header', () => {
    mockUseOpenCloseWidgetSettingStore(true);
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <BaseWidget {...mockedProps} settings="safeguards" />,
    );
    expect(getByTestId('back_button_settings_header_1677074473828')).toBeInTheDocument();

    act(() => {
      fireEvent.click(getByTestId('back_button_settings_header_1677074473828'));
    });

    expect(mockCloseSetting).toHaveBeenCalledWith({ settingType: 'safeguards' });
  });

  it('should call "closeRoadmapSettings" with widgetId when click back button in setting header and setting type is roadmapDrag', () => {
    mockUseOpenCloseWidgetSettingStore(true);
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <BaseWidget {...mockedProps} settings={'roadmapDrag'} widgetId={mockRoadmapDragTestId} />,
    );
    act(() => {
      fireEvent.click(getByTestId('back_button_settings_header_1677074473828'));
    });

    expect(mockCloseSetting).toHaveBeenCalledWith({
      settingType: 'roadmapDrag',
      widgetId: mockRoadmapDragTestId,
    });
  });

  it('should call "closeRoadmapSettings" with widgetId when click back button in setting header and setting type is roadmapTorque', () => {
    mockUseOpenCloseWidgetSettingStore(true);
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <BaseWidget {...mockedProps} settings={'roadmapTorque'} widgetId={mockRoadmapDragTestId} />,
    );
    act(() => {
      fireEvent.click(getByTestId('back_button_settings_header_1677074473828'));
    });

    expect(mockCloseSetting).toHaveBeenCalledWith({
      settingType: 'roadmapTorque',
      widgetId: mockRoadmapDragTestId,
    });
  });

  it('should call openSetting with settingType roadmapDrag and widgetId when click on setting button', async () => {
    mockUseOpenCloseWidgetSettingStore(false);
    renderWithThemeAndLocaleProviders(
      <BaseWidget {...mockedProps} settings="roadmapDrag" widgetId={mockRoadmapDragTestId} />,
    );
    act(() => {
      fireEvent.click(screen.getByTestId('settings_1676907540122'));
    });

    expect(mockOpenSetting).toHaveBeenCalledWith({
      settingType: 'roadmapDrag',
      widgetId: mockRoadmapDragTestId,
    });
  });

  it('should call openSetting with only settingType safeguards when click on setting button', async () => {
    mockUseOpenCloseWidgetSettingStore(false);
    renderWithThemeAndLocaleProviders(<BaseWidget {...mockedProps} settings="safeguards" />);
    act(() => {
      fireEvent.click(screen.getByTestId('settings_1676907540122'));
    });

    expect(mockOpenSetting).toHaveBeenCalledWith({
      settingType: 'safeguards',
    });
  });
});
