/* eslint-disable max-lines-per-function */
import produce from 'immer';
import create from 'zustand';

export type ZoomerValue = number | string | boolean | undefined;

type ZoomerToggle = {
  zoomer: {
    [widgetId: string]: boolean;
  };
  zoomerValue: {
    [widgetId: string]: ZoomerValue;
  };
  disabledZoom: {
    [widgetId: string]: boolean;
  };
  toggleZoom: (type: string) => void;
  setZoomValueForType: (type: string, value: ZoomerValue) => void;
  setEcdZoomDisable: (disable: boolean, widgetId: string) => void;
};

export const useZoomerToggleStore = create<ZoomerToggle>((set) => ({
  zoomer: {
    ecd: false,
    cutting: false,
    wellbore: false,
  },
  zoomerValue: {
    wellbore: 2,
  },
  disabledZoom: {},
  toggleZoom: (widgetId: string) =>
    set((state) => ({
      ...state,
      zoomer: {
        ...state.zoomer,
        [widgetId]: !state.zoomer[widgetId],
      },
    })),
  setEcdZoomDisable: (disable: boolean, widgetId: string) =>
    set(
      produce((state: ZoomerToggle) => {
        state.disabledZoom[widgetId] = disable;
      }),
    ),
  setZoomValueForType: (widgetId: string, value: ZoomerValue) =>
    set((state) => ({
      ...state,
      zoomerValue: {
        ...state.zoomerValue,
        [widgetId]: value,
      },
    })),
}));
