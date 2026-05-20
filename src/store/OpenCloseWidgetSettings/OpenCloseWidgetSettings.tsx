import { SettingsType } from '@dt-advisory/widgets/components/BaseWidget';
import produce from 'immer';
import create from 'zustand';

type OpenCloseSettingActionParamsType = {
  settingType: SettingsType;
  widgetId?: string;
};

type OpenCloseWidgetSettingsActionsType = {
  openSetting: (props: OpenCloseSettingActionParamsType) => void;
  closeSetting: (props: OpenCloseSettingActionParamsType) => void;
};

export type OpenCloseWidgetSettingsStoreType = {
  safeguards: { isOpen: boolean };
  smartAutoRop: { isOpen: boolean };
  sekalHalliburtonlimit: { isOpen: boolean };
  roadmap: {
    [widgetId: string]: {
      isOpen: boolean;
    };
  };
  actions: OpenCloseWidgetSettingsActionsType;
};

// eslint-disable-next-line max-lines-per-function
export const useOpenCloseWidgetSettingStore = create<OpenCloseWidgetSettingsStoreType>((set) => ({
  safeguards: { isOpen: false },
  smartAutoRop: { isOpen: false },
  sekalHalliburtonlimit: { isOpen: false },
  roadmap: {},
  actions: {
    openSetting: ({ settingType, widgetId }) => {
      set(
        produce((state: OpenCloseWidgetSettingsStoreType) => {
          if (settingType !== 'roadmapDrag' && settingType !== 'roadmapTorque') {
            state[settingType] = { isOpen: true };
          } else if (!!widgetId) {
            state.roadmap[widgetId] = { isOpen: true };
          }
        }),
      );
    },
    closeSetting: ({ settingType, widgetId }) => {
      set(
        produce((state: OpenCloseWidgetSettingsStoreType) => {
          if (settingType !== 'roadmapDrag' && settingType !== 'roadmapTorque') {
            state[settingType] = { isOpen: false };
          } else if (!!widgetId) {
            state.roadmap[widgetId] = { isOpen: false };
          }
        }),
      );
    },
  },
}));
