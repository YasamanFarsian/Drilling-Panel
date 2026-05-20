/* eslint-disable max-lines-per-function */
import {
  DEFAULT_LABEL_STYLE,
  DEFAULT_ROOT_FONT_SIZE,
  SAFEGUIDES_CUSTOM_PADDING,
  SPACE_BETWEEN_TICK_AND_TICK_LABEL,
  WIDGET_CUSTOM_PADDING,
  X_AXIS_OFFSET,
  Y_AXIS_PADDING,
} from '@dt-advisory/styles/constants';
import create from 'zustand';

export type WidgetPaddingType = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};
export type WidgetStyleType = {
  labelStyle: {
    fontWeight: string | number;
    fontSize: number;
    fontFamily: string;
  };
  customPadding: WidgetPaddingType;
  safeguidesCustomPadding: WidgetPaddingType;
  yAxisPadding: number;
  xAxisOffset: number;
  xSpaceBetweenTickAndLabel: number;
};
/**
 * The purpose of this store is to have a global state for the chart settings
 * */
type WidgetSettingsStore = {
  isWindowResizing: boolean;
  maxHeight?: number;
  maxWidth?: number;
  rootFontSize: number;
  widgetStyle: WidgetStyleType;
  setRootFontSize: (rootFontSize: number) => void;
  setWidgetFontSize: (fontSize: number) => void;
  setWidgetYAxisPadding: (yAxisPadding: number) => void;
  setWidgetXAxisOffset: (xAxisOffset: number) => void;
  setWidgetXSpacingTickValues: (xSpaceBetweenTickAndLabel: number) => void;
  setWidgetCustomPadding: (customPadding: WidgetStyleType['customPadding']) => void;
  setSafeguidesCustomPadding: (
    safeguidesCustomPadding: WidgetStyleType['safeguidesCustomPadding'],
  ) => void;
  setIsWindowResizing: (value: boolean) => void;
  setMaxHeight: (value?: number) => void;
  setMaxWidth: (value?: number) => void;
};

export const useWidgetSettingsStore = create<WidgetSettingsStore>((set, _get) => ({
  isWindowResizing: false,
  widgetStyle: {
    labelStyle: DEFAULT_LABEL_STYLE,
    yAxisPadding: Y_AXIS_PADDING,
    xAxisOffset: X_AXIS_OFFSET,
    xSpaceBetweenTickAndLabel: SPACE_BETWEEN_TICK_AND_TICK_LABEL,
    customPadding: WIDGET_CUSTOM_PADDING,
    safeguidesCustomPadding: SAFEGUIDES_CUSTOM_PADDING,
  },
  rootFontSize: DEFAULT_ROOT_FONT_SIZE,

  setRootFontSize: (rootFontSize: number) =>
    set((state) => ({
      ...state,
      rootFontSize,
    })),
  setWidgetFontSize: (fontSize: number) =>
    set((state) => ({
      ...state,
      widgetStyle: {
        ...state.widgetStyle,
        labelStyle: { ...state.widgetStyle.labelStyle, fontSize },
      },
    })),
  setWidgetXSpacingTickValues: (xSpaceBetweenTickAndLabel: number) =>
    set((state) => ({
      ...state,
      widgetStyle: {
        ...state.widgetStyle,
        xSpaceBetweenTickAndLabel,
      },
    })),
  setWidgetYAxisPadding: (yAxisPadding: number) =>
    set((state) => ({
      ...state,
      widgetStyle: {
        ...state.widgetStyle,
        yAxisPadding,
      },
    })),
  setWidgetXAxisOffset: (xAxisOffset: number) =>
    set((state) => ({
      ...state,
      widgetStyle: {
        ...state.widgetStyle,
        xAxisOffset,
      },
    })),
  setWidgetCustomPadding: (customPadding: WidgetStyleType['customPadding']) =>
    set((state) => ({
      ...state,
      widgetStyle: {
        ...state.widgetStyle,
        customPadding,
      },
    })),
  setSafeguidesCustomPadding: (
    safeguidesCustomPadding: WidgetStyleType['safeguidesCustomPadding'],
  ) =>
    set((state) => ({
      ...state,
      widgetStyle: {
        ...state.widgetStyle,
        safeguidesCustomPadding,
      },
    })),
  setIsWindowResizing: (value: boolean) =>
    set((state) => ({
      ...state,
      isWindowResizing: value,
    })),
  setMaxHeight: (value?: number) =>
    set((state) => ({
      ...state,
      maxHeight: value ? value : 0,
    })),
  setMaxWidth: (value?: number) =>
    set((state) => ({
      ...state,
      maxWidth: value,
    })),
}));
