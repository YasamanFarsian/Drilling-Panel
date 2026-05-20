/* eslint-disable max-lines-per-function, @typescript-eslint/no-explicit-any */
import produce from 'immer';
import create, { StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { useUserConfigurationStore } from '../UserConfiguration/UserConfiguration';
import { settingsPersistDataMigration } from './settingsPersistDataMigration';

// Local storage key
export const SETTINGS_KEY = 'SETTINGS';

export type ChartStatusType = 'active' | 'inactive';

export enum WarningsActivation {
  ON = 'On',
  OFF = 'Off',
}

export type ThresholdBase = 'absolute' | 'percentage';
export type ThresholdValueType = string | number;

type SmartAutoRopSettingsType = {
  thresholdLimit: number;
};

export type RoadmapModelType = 'Steadystate' | 'TransientKinetic' | 'TransientStatic';
export type RoadmapStateType = 'Automatic' | 'Drilling' | 'Tripping';

type RoadmapType = { model: RoadmapModelType; state: RoadmapStateType };
type RoadmapSettingType = {
  [id: string]: RoadmapType;
};

export type SettingsStoreType = {
  // header
  isHeaderVisible: boolean;
  // generalSettingsConf
  operationId: string;
  mpd: string;
  warningsAnimation: WarningsActivation;
  warningTimeout: number;
  muteWarningTimeout: number;
  appearance?: string;

  // UnitsSettingsConf
  timezone: string;
  timezoneValue: string;
  clockdisplay: string;
  temperature: string;
  distance: string;
  weight: string;

  // SmartAutoRopSetting
  smartAutoRop: SmartAutoRopSettingsType;

  // RoadmapDrag and RoadmapTorque setting
  roadmap: RoadmapSettingType;

  // SafeGuidingSettingsConf
  // tripspeed
  tripspeedTreshold: ThresholdBase;
  tripspeedTresholdValue: ThresholdValueType;
  tripspeedTresholdValueAbsolute: ThresholdValueType;
  tripspeedTresholdValuePercentage: ThresholdValueType;

  // flow
  flowTreshold: ThresholdBase;
  flowTresholdValue: ThresholdValueType;
  flowTresholdValueAbsolute: ThresholdValueType;
  flowTresholdValuePercentage: ThresholdValueType;

  // spp
  sppTreshold: ThresholdBase;
  sppTresholdValue: ThresholdValueType;
  sppTresholdValueAbsolute: ThresholdValueType;
  sppTresholdValuePercentage: ThresholdValueType;

  // hookload
  hookloadTreshold: ThresholdBase;
  hookloadTresholdValue: ThresholdValueType;
  hookloadTresholdValueAbsolute: ThresholdValueType;
  hookloadTresholdValuePercentage: ThresholdValueType;

  // torque
  torqueTreshold: ThresholdBase;
  torqueTresholdValue: ThresholdValueType;
  torqueTresholdValueAbsolute: ThresholdValueType;
  torqueTresholdValuePercentage: ThresholdValueType;

  // CuttingSettingsConf
  ecdStatus: ChartStatusType;
  eddStatus: ChartStatusType;
};

export type SettingsStoreKeys = keyof SettingsStoreType;

export type SettingStoreType = {
  settings: SettingsStoreType;
  setHeaderVisible: (value: boolean) => void;
  updateSettings: (key: SettingsStoreKeys, value: string | number | WarningsActivation) => void;
  updateSmartAutoRopThresholdLimit: (value: number) => void;
  initialRoadmap: (widgetId: string) => void;
  purgeRoadmap: () => void;
  removeRoadmap: (widgetId: string) => void;
  updateRoadmapModel: (widgetId: string, model: RoadmapModelType) => void;
  updateRoadmapState: (widgetId: string, state: RoadmapStateType) => void;
};

type SettingStorePersistType = (
  config: StateCreator<SettingStoreType>,
  options: PersistOptions<SettingStoreType>,
) => StateCreator<SettingStoreType>;

export const DEFAULT_ROADMAP_SETTING: RoadmapType = { state: 'Automatic', model: 'Steadystate' };
export const useSettingsStore = create<SettingStoreType>(
  (persist as SettingStorePersistType)(
    (set, get) => ({
      settings: {
        // header
        isHeaderVisible: true,
        // generalSettingsConf
        operationId: '',
        mpd: 'off',
        warningsAnimation: WarningsActivation.ON,
        warningTimeout: 2,
        muteWarningTimeout: 1800,

        // UnitsSettingsConf
        timezone: 'auto',
        timezoneValue: 'Bergen, GMT +1',
        clockdisplay: '12',
        temperature: 'celcius',
        distance: 'metric',
        weight: 'metric',

        // SmartAutoRopSetting
        smartAutoRop: { thresholdLimit: 5 },

        // Both RoadmapDrag and RoadmapTorque
        roadmap: {},

        // SafeGuidingSettingsConf

        // tripspeed
        tripspeedTreshold: 'absolute',
        tripspeedTresholdValue: '',
        tripspeedTresholdValueAbsolute: '',
        tripspeedTresholdValuePercentage: '',

        // flow
        flowTreshold: 'absolute',
        flowTresholdValue: '',
        flowTresholdValueAbsolute: '',
        flowTresholdValuePercentage: '',

        // spp
        sppTreshold: 'absolute',
        sppTresholdValue: '',
        sppTresholdValueAbsolute: '',
        sppTresholdValuePercentage: '',

        // hookload
        hookloadTreshold: 'absolute',
        hookloadTresholdValue: '',
        hookloadTresholdValueAbsolute: '',
        hookloadTresholdValuePercentage: '',

        // torque
        torqueTreshold: 'absolute',
        torqueTresholdValue: '',
        torqueTresholdValueAbsolute: '',
        torqueTresholdValuePercentage: '',

        // ECD
        ecdStatus: 'active',

        // Cutting
        eddStatus: 'active',
      },
      setHeaderVisible: (value: boolean) => {
        const settings = get().settings;
        set({ settings: { ...settings, isHeaderVisible: value } });
      },
      updateSettings: (key: SettingsStoreKeys, value: string | number | WarningsActivation) => {
        const settings = get().settings;
        set({ settings: { ...settings, [key]: value } });
      },
      updateSmartAutoRopThresholdLimit: (thresholdLimit) => {
        const settings = get().settings;
        set({
          settings: {
            ...settings,
            smartAutoRop: { ...settings.smartAutoRop, thresholdLimit },
          },
        });
      },
      initialRoadmap: (widgetId) => {
        set(
          produce((state: SettingStoreType) => {
            state.settings.roadmap[widgetId] = DEFAULT_ROADMAP_SETTING;
          }),
        );
      },
      purgeRoadmap: () => {
        const templatesToSave = useUserConfigurationStore.getState().templatesToSave;
        const availableWidgetIds = templatesToSave
          .flatMap((template) =>
            template.widgetConfig.map((widget) => widget.widgetConfig?.widgetId),
          )
          .filter((widgetId) => widgetId !== undefined);
        set(
          produce((state: SettingStoreType) => {
            Object.keys(state.settings.roadmap).forEach((widgetId) => {
              if (!availableWidgetIds.includes(widgetId)) {
                delete state.settings.roadmap[widgetId];
              }
            });
          }),
        );
      },
      removeRoadmap: (widgetId) => {
        set(
          produce((state: SettingStoreType) => {
            delete state.settings.roadmap[widgetId];
          }),
        );
      },
      updateRoadmapModel: (widgetId, model) => {
        set(
          produce((state: SettingStoreType) => {
            state.settings.roadmap[widgetId].model = model;
          }),
        );
      },
      updateRoadmapState: (widgetId, roadmapState) => {
        set(
          produce((state: SettingStoreType) => {
            state.settings.roadmap[widgetId].state = roadmapState;
          }),
        );
      },
    }),
    {
      name: SETTINGS_KEY,
      version: 3,
      migrate: settingsPersistDataMigration,
    },
  ),
);
