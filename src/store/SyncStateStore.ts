/* eslint-disable */
import create from 'zustand';
import { useUserConfigurationStore } from './UserConfiguration/UserConfiguration';
import { WidgetsLoaderEnum } from './UserConfiguration/UserConfiguration.types';
import { LocalStorageKeys, setLauncherLocalStorage } from '@dt-advisory/helpers/launcherHelper';

type WidgetStatesData = {
  [key: string]: boolean | null;
};

type SyncStateData = {
  widgetToSync: number;
  syncStateData: WidgetStatesData;
  isAllLive: boolean;
  isAtLeastOneWidgetConnected: boolean;
  isSyncIconVisible: boolean;
  isNoConnectionLabelEnabled: boolean;
  setWidgetToSync: (data: number) => void;
  updateWidgetToSync: () => void;
  setSyncStates: (data: WidgetStatesData) => void;
  removeSyncState: (key: string) => void;
  resetWidgetSyncStates: () => void;
  isAllWidgetsLive: () => void;
  setIsNoConnectionLabelEnabled: (value: boolean) => void;
};

export const useSyncStateStore = create<SyncStateData>((set, get) => {
  return {
    syncStateData: {},
    widgetToSync: -1,
    isAllLive: false,
    isAtLeastOneWidgetConnected: false,
    isSyncIconVisible: false,
    isNoConnectionLabelEnabled: false,
    setWidgetToSync: (data) => {
      set((state) => ({
        ...state,
        widgetToSync: data,
      }));
    },
    setIsNoConnectionLabelEnabled: (value: boolean) => {
      set((state) => ({
        ...state,
        isNoConnectionLabelEnabled: value,
      }));
    },
    updateWidgetToSync: () => {
      const widgetsToLoad = useUserConfigurationStore.getState().widgetsToLoad;
      const widgetToSync = widgetsToLoad.filter(
        (config) => config !== WidgetsLoaderEnum.Unsettled,
      ).length;
      set((state) => ({
        ...state,
        widgetToSync,
      }));
    },
    setSyncStates: (data) => {
      const { widgetToSync } = get();

      if (widgetToSync === -1) {
        get().updateWidgetToSync();
      }
      set((state) => ({
        ...state,
        syncStateData: { ...state.syncStateData, ...data },
        isSyncIconVisible: true,
      }));
      get().isAllWidgetsLive();
    },
    removeSyncState: (key) => {
      set((state) => {
        const newSyncStateData = { ...state.syncStateData };
        delete newSyncStateData[key];
        return {
          ...state,
          syncStateData: newSyncStateData,
        };
      });
    },
    resetWidgetSyncStates: () => {
      const { widgetToSync } = get();
      if (widgetToSync === -1) {
        return;
      }
      set((state) => ({
        ...state,
        widgetToSync: -1,
        isSyncIconVisible: false,
        syncStateData: {},
      }));
    },
    isAllWidgetsLive: () => {
      const { syncStateData, widgetToSync } = get();
      const values = Object.values(syncStateData);
      const totalWidgetsSync = values.filter((value) => value === true || value === null);
      const isAllLive = totalWidgetsSync.length === widgetToSync;
      const isAtLeastOneWidgetConnected = totalWidgetsSync.length > 0;
      const widgetHasData = values.filter((value) => value === true);
      if (widgetHasData.length > 0) {
        setLauncherLocalStorage(LocalStorageKeys.LauncherReload, false);
      }
      set((state) => ({
        ...state,
        isAllLive,
        isAtLeastOneWidgetConnected,
      }));
    },
  };
});
